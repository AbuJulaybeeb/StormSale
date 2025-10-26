export const walletConnectConfig = {
  projectId: "79aaf32eee7f421c29f132a4c3f1e5f6",
  metadata: {
    name: "StormSale",
    description: "Secure Web3 Affiliate Platform",
    url: "https://stormsale.xyz",
    icons: ["https://stormsale.xyz/icon.png"]
  }
};

export const CHAINS = {
  // Add BlockDAG chain configuration
  blockdag: {
    id: 1043, // Replace with actual BlockDAG chain ID
    name: "BlockDAG",
    currency: "BDAG",
    rpcUrl: "https://rpc.awakening.bdagscan.com/" // Replace with actual RPC URL
  },
  // You can add other chains as needed
  ethereum: {
    id: 1,
    name: "Ethereum",
    currency: "ETH"
  }
};