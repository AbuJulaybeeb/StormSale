import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { ethers, type AbstractProvider } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { walletConnectConfig, CHAINS } from '../config/walletConnect';
import { useNotification } from './NotificationContext';

// Replace inline ABI arrays with imports from ABI JSON files in the same folder.
// Update filenames below if your ABI files are named differently (e.g. './Factory.json', './factoryABI.json', './Campaign.json', etc).
// The wrapper handles either direct ABI array exports or objects containing { abi: [...] }.
import factoryJson from '../context/AffiliateFactory.json';
import campaignJson from '../context/Campaign.json';

const FACTORY_ABI = (factoryJson && (factoryJson as any).abi) ? (factoryJson as any).abi : (factoryJson as any);
const CAMPAIGN_ABI = (campaignJson && (campaignJson as any).abi) ? (campaignJson as any).abi : (campaignJson as any);

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  userAddress: string | null;
  factoryContract: ethers.Contract | null;
  campaignContracts: Map<string, ethers.Contract>;
  connectWallet: (connectorType?: 'metamask' | 'walletconnect') => Promise<void>;
  disconnectWallet: () => void;
  getCampaignContract: (address: string) => ethers.Contract;
  isConnected: boolean;
  connectorType: 'metamask' | 'walletconnect' | null;
}

// Add a ref to ensure WalletConnect init runs only once per component instance
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// TODO: Add your deployed contract address and ABI
const FACTORY_ADDRESS = "0x573B4bf300b4B5244832fc7A40F64344c999c445"; 

// Using CAMPAIGN_ABI imported from '../context/Campaign.json' above; remove the inline ABI array to avoid redeclaration.

// Increaseable timeout for relay WS reachability test (ms)
const RELAY_WS_TEST_TIMEOUT = 10000; // was 3000

// lightweight WS reachability test
const testRelayWebSocket = (url: string, timeout = RELAY_WS_TEST_TIMEOUT): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('WebSocket' in window)) {
      // cannot test; assume reachable so init proceeds (we'll still handle errors later)
      return resolve(true);
    }

    let ws: WebSocket | null = null;
    let timer: any = null;
    let opened = false;
    let settled = false; // ensure cleanup only resolves once

    try {
      ws = new WebSocket(url);
    } catch (err) {
      // Instantiation failure -> unreachable
      (window as any).__STORMSALE_WC_LAST_ERR__ = err;
      return resolve(false);
    }

    const cleanup = (result: boolean, info?: any) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      try { ws?.close(); } catch {}
      ws = null;
      if (!result && info) {
        // store last error for debugging but avoid noisy logs for pre-open failures
        (window as any).__STORMSALE_WC_LAST_ERR__ = info;
      }
      resolve(result);
    };

    // If we don't see onopen within the timeout treat as unreachable
    timer = setTimeout(() => {
      // timeout -> treat as unreachable
      cleanup(false, new Error('WebSocket test timed out'));
    }, timeout);

    ws.onopen = () => {
      opened = true;
      cleanup(true);
    };

    ws.onerror = (e) => {
      // Only log warning if the connection had previously opened.
      if (opened) {
        console.warn('WebSocket test error after open:', e);
      }
      // In all cases treat as unreachable
      cleanup(false, e);
    };

    // Explicitly handle close events. If the socket closes before onopen, treat as failure.
    ws.onclose = (e) => {
      if (!opened) {
        // closed before open: likely server rejected handshake — don't spam console
        cleanup(false, e);
      } else {
        // Closed after open: treat as reachable for the purpose of init check (open succeeded)
        cleanup(true);
      }
    };
  });
};

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [factoryContract, setFactoryContract] = useState<ethers.Contract | null>(null);
  const [campaignContracts, setCampaignContracts] = useState<Map<string, ethers.Contract>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [connectorType, setConnectorType] = useState<'metamask' | 'walletconnect' | null>(null);
  const [walletConnectProvider, setWalletConnectProvider] = useState<InstanceType<typeof EthereumProvider> | null>(null);
  const wcInitRef = useRef(false); // <- added: prevents re-init within same mount
  const wcConnectingRef = useRef(false); // <- added: prevents concurrent connect() calls

  // Notification helper
  const { showNotification } = useNotification?.() || { showNotification: undefined };
  const MAX_WC_RETRIES = 5;

  // Initialize WalletConnect (guarded to avoid double Init() calls)
  useEffect(() => {
    let mounted = true;

    const initializeWalletConnect = async () => {
      // prevent repeated initialization in same instance
      if (wcInitRef.current) return;
      wcInitRef.current = true;

      try {
        // reuse existing provider (HMR / StrictMode)
        if ((window as any).__STORMSALE_WC_PROVIDER__) {
          const existing = (window as any).__STORMSALE_WC_PROVIDER__;
          if (mounted) setWalletConnectProvider(existing);
          return;
        }

        const provider = await EthereumProvider.init({
          projectId: walletConnectConfig.projectId,
          chains: [CHAINS.blockdag.id],
          showQrModal: true,
          qrModalOptions: {
            themeMode: 'dark',
            themeVariables: {
              '--wcm-accent-color': '#10b981',
              '--wcm-accent-fill-color': '#ffffff',
            }
          },
          methods: ["eth_sendTransaction", "personal_sign"],
          events: ["chainChanged", "accountsChanged"],
        });

        // store globally for reuse across mounts / HMR
        (window as any).__STORMSALE_WC_PROVIDER__ = provider;

        if (mounted) setWalletConnectProvider(provider);

        // attach events only once
        if (!(provider as any).__stormsale_events_attached) {
          provider.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
              disconnectWallet();
            } else {
              setUserAddress(accounts[0]);
            }
          });

          provider.on("chainChanged", (chainId: string) => {
            console.log("Chain changed:", chainId);
          });

          provider.on("disconnect", () => {
            disconnectWallet();
          });

          (provider as any).__stormsale_events_attached = true;
        }

      } catch (error) {
        // keep a clear log but avoid re-initializing repeatedly
        console.error('Error initializing WalletConnect:', error);
      }
    };

    initializeWalletConnect();
    return () => { mounted = false; };
  }, [/* intentional: run once */]);

  const connectWallet = async (connectorType: 'metamask' | 'walletconnect' = 'metamask') => {
    try {
      if (connectorType === 'metamask') {
        await connectMetaMask();
      } else if (connectorType === 'walletconnect' && walletConnectProvider) {
        await connectWalletConnect();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const newSigner = await newProvider.getSigner();
      const address = await newSigner.getAddress();

      setProvider(newProvider);
      setSigner(newSigner);
      setUserAddress(address);
      setIsConnected(true);
      setConnectorType('metamask');

      // Load contracts after connection
      await loadContracts(newSigner);
    } else {
      throw new Error('Please install MetaMask!');
    }
  };

  // Guarded WalletConnect connect — prevents concurrent connects and reuses session if available
  const connectWalletConnect = async () => {
    if (!walletConnectProvider) {
      throw new Error('WalletConnect not initialized');
    }

    // prevent concurrent connect attempts
    if (wcConnectingRef.current) {
      console.warn('WalletConnect connect already in progress');
      return;
    }

    // quick session check: if already connected, reuse
    const hasSession = Boolean((walletConnectProvider as any).session?.length || (walletConnectProvider as any).connected);
    if (hasSession) {
      try {
        wcConnectingRef.current = true;
        const accounts = (await walletConnectProvider.request({ method: 'eth_accounts' })) as string[];
        if (accounts && accounts.length > 0) {
          const newProvider = new ethers.BrowserProvider(walletConnectProvider);
          const newSigner = await newProvider.getSigner();
          const address = accounts[0];

          setProvider(newProvider);
          setSigner(newSigner);
          setUserAddress(address);
          setIsConnected(true);
          setConnectorType('walletconnect');

          await loadContracts(newSigner);
        }
        return;
      } catch (err) {
        console.warn('Existing WalletConnect session check failed, will attempt fresh connect', err);
        // fallthrough to fresh connect below
      } finally {
        wcConnectingRef.current = false;
      }
    }

    // perform fresh connect
    (window as any).__STORMSALE_WC_CONNECTING__ = true;
    wcConnectingRef.current = true;
    try {
      await walletConnectProvider.connect();

      const accounts = (await walletConnectProvider.request({ method: "eth_accounts" })) as string[];
      if (accounts && accounts.length > 0) {
        const newProvider = new ethers.BrowserProvider(walletConnectProvider);
        const newSigner = await newProvider.getSigner();
        const address = accounts[0];

        setProvider(newProvider);
        setSigner(newSigner);
        setUserAddress(address);
        setIsConnected(true);
        setConnectorType('walletconnect');

        await loadContracts(newSigner);
      }
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      throw error;
    } finally {
      (window as any).__STORMSALE_WC_CONNECTING__ = false;
      wcConnectingRef.current = false;
    }
  };

  const disconnectWallet = async () => {
    if (connectorType === 'walletconnect' && walletConnectProvider) {
      try {
        await walletConnectProvider.disconnect();
      } catch (error) {
        console.error('Error disconnecting WalletConnect:', error);
      }
    }

    setProvider(null);
    setSigner(null);
    setUserAddress(null);
    setFactoryContract(null);
    setCampaignContracts(new Map());
    setIsConnected(false);
    setConnectorType(null);
  };

  const loadContracts = async (currentSigner: ethers.Signer) => {
    try {
      // Load factory contract
      const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, currentSigner);
      setFactoryContract(factory);
    } catch (error) {
      console.error('Error loading contracts:', error);
    }
  };

  const getCampaignContract = (address: string): ethers.Contract => {
    if (campaignContracts.has(address)) {
      return campaignContracts.get(address)!;
    }

    if (!signer) {
      throw new Error('Signer not available');
    }

    const campaignContract = new ethers.Contract(address, CAMPAIGN_ABI, signer);
    const newCampaignContracts = new Map(campaignContracts);
    newCampaignContracts.set(address, campaignContract);
    setCampaignContracts(newCampaignContracts);
    
    return campaignContract;
  };

  useEffect(() => {
    // Check if wallet is already connected (MetaMask)
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          connectMetaMask();
        }
      }
    };

    checkConnection();

    // Listen for account changes (MetaMask)
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectMetaMask();
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      provider,
      signer,
      userAddress,
      factoryContract,
      campaignContracts,
      connectWallet,
      disconnectWallet,
      getCampaignContract,
      isConnected,
      connectorType
    }}>
      {children}
    </Web3Context.Provider>
  );
}

// HMR-friendly hook export
export function useWeb3(): Web3ContextType {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}