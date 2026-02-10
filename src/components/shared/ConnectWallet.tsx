import { Button } from "../../components/ui/button";
import { useWeb3 } from "../../hooks/useWeb3";
import { Wallet, ExternalLink } from "lucide-react";
import { useState } from "react";

export const ConnectWallet = () => {
  const { connectWallet, isConnected, userAddress } = useWeb3();
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async (connectorType: "metamask" | "walletconnect") => {
    setIsConnecting(true);
    try {
      await connectWallet(connectorType);
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <span className="text-sm font-medium">
          {formatAddress(userAddress!)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <Button
        onClick={() => handleConnect("metamask")}
        disabled={isConnecting}
        className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleConnect("walletconnect")}
        disabled={isConnecting}
        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        WalletConnect
      </Button>
    </div>
  );
};
