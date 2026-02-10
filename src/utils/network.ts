const CONTRACT_ADDRESSES = {
  network: {
    // replace these values with your real network settings
    chainId: 1046,
    chainName: "BlockDAG",
    rpcUrl: "https://relay.awakening.bdagscan.com",
    blockExplorer: "https://explorer.blockdag.network",
  },
};

export const switchToBlockDAGNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${CONTRACT_ADDRESSES.network.chainId.toString(16)}`,
          chainName: CONTRACT_ADDRESSES.network.chainName,
          rpcUrls: [CONTRACT_ADDRESSES.network.rpcUrl],
          blockExplorerUrls: [CONTRACT_ADDRESSES.network.blockExplorer],
          nativeCurrency: {
            name: "BDAG",
            symbol: "BDAG",
            decimals: 18,
          },
        },
      ],
    });
    return true;
  } catch (error) {
    console.error("Error adding BlockDAG network:", error);
    return false;
  }
};
