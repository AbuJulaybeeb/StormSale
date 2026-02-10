import { Button } from "../../components/ui/button";
import { useWeb3 } from "../../hooks/useWeb3";
import { Moon, Sun, Shield, Wallet, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const {
    userAddress,
    connectWallet,
    disconnectWallet,
    isConnected,
    connectorType,
  } = useWeb3();
  const [darkMode, setDarkMode] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async (connectorType: "metamask" | "walletconnect") => {
    try {
      await connectWallet(connectorType);
      setShowWalletOptions(false);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              StormSale
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#stats"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Stats
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {isConnected ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {formatAddress(userAddress!)}
                </span>
                {connectorType === "walletconnect" && (
                  <ExternalLink className="w-3 h-3 text-emerald-600" />
                )}
              </div>
              <Button
                variant="outline"
                onClick={disconnectWallet}
                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Button
                onClick={() => setShowWalletOptions(!showWalletOptions)}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>

              {showWalletOptions && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-emerald-100 dark:border-emerald-900 z-50">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => handleConnect("metamask")}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900 flex items-center space-x-2"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>MetaMask</span>
                    </button>
                    <button
                      onClick={() => handleConnect("walletconnect")}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>WalletConnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
