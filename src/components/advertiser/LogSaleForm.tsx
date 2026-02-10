import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { InputGroup, InputField } from "../../components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useWeb3 } from "../../hooks/useWeb3";
import { useNotification } from "../../context/NotificationContext";
import {
  generateAESKey,
  encryptPayload,
  wrapAESKey,
  getPublicKeyForAddress,
} from "../../lib/crypto";
import { Shield, Zap, Users, FileKey } from "lucide-react";

export const LogSaleForm = () => {
  const [affiliateAddress, setAffiliateAddress] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [campaignAddress, setCampaignAddress] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getCampaignContract, userAddress } = useWeb3();
  const { showNotification } = useNotification();

  const handleLogSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliateAddress || !saleAmount || !campaignAddress) {
      showNotification({
        type: "warning",
        title: "Missing Information",
        message: "Please fill all required fields",
      });
      return;
    }

    setIsLoading(true);
    try {
      const campaignContract = getCampaignContract(campaignAddress);

      showNotification({
        type: "info",
        title: "Encrypting Data",
        message: "Securing sale information...",
      });

      // TODO: Implement client-side encryption
      // 1. Generate new AES symmetric key
      const aesKey = await generateAESKey();

      // 2. Encrypt payload with AES key
      const payload = {
        customer: customerData || "Anonymous Customer",
        saleId: `SALE_${Date.now()}`,
        product: "Digital Product",
        timestamp: new Date().toISOString(),
        metadata: "Additional sale information",
      };
      const encryptedPayload = await encryptPayload(payload, aesKey);

      // 3. Get Advertiser & Affiliate Public Keys
      const advertiserPublicKey = await getPublicKeyForAddress(userAddress!);
      const affiliatePublicKey = await getPublicKeyForAddress(affiliateAddress);

      // 4. Wrap AES key for Advertiser
      const advertiserWrappedKey = await wrapAESKey(
        aesKey,
        advertiserPublicKey,
      );

      // 5. Wrap AES key for Affiliate
      const affiliateWrappedKey = await wrapAESKey(aesKey, affiliatePublicKey);

      showNotification({
        type: "info",
        title: "Transaction Submitted",
        message: "Logging encrypted sale...",
      });

      // Call Campaign.logEncryptedSale(...) with all 5 pieces of data
      const tx = await campaignContract.logEncryptedSale(
        affiliateAddress,
        saleAmount,
        encryptedPayload,
        advertiserWrappedKey,
        affiliateWrappedKey,
        { value: saleAmount }, // Assuming BDAG token handling
      );

      await tx.wait();

      showNotification({
        type: "success",
        title: "Sale Logged Successfully!",
        message: "Encrypted sale data has been recorded on-chain",
      });

      // Reset form
      setAffiliateAddress("");
      setSaleAmount("");
      setCampaignAddress("");
      setCustomerData("");
    } catch (error: any) {
      console.error("Error logging sale:", error);
      showNotification({
        type: "error",
        title: "Logging Failed",
        message: error.message || "Failed to log sale",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Log Encrypted Sale
        </h2>
        <p className="text-muted-foreground mt-2">
          Record a new sale with military-grade encryption and commission escrow
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Secure Sale Logging</CardTitle>
              <CardDescription>
                All data is encrypted before being stored on-chain
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogSale}>
            <InputGroup className="space-y-6">
              <InputField
                label="Campaign Address"
                description="The campaign contract where this sale belongs"
                required
              >
                <Input
                  value={campaignAddress}
                  onChange={(e) => setCampaignAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b8..."
                  required
                />
              </InputField>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Affiliate Address"
                  description="The affiliate who made this sale"
                  required
                >
                  <Input
                    value={affiliateAddress}
                    onChange={(e) => setAffiliateAddress(e.target.value)}
                    placeholder="0x..."
                    required
                  />
                </InputField>

                <InputField
                  label="Sale Amount (BDAG)"
                  description="Total sale amount in BDAG tokens"
                  required
                >
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.001"
                      min="0"
                      value={saleAmount}
                      onChange={(e) => setSaleAmount(e.target.value)}
                      placeholder="e.g., 100.50"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      BDAG
                    </div>
                  </div>
                </InputField>
              </div>

              <InputField
                label="Customer Information"
                description="Optional customer data (will be encrypted)"
              >
                <Input
                  value={customerData}
                  onChange={(e) => setCustomerData(e.target.value)}
                  placeholder="Customer name, email, or reference ID"
                />
              </InputField>

              {/* Encryption Flow Visualization */}
              <div className="bg-linear-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center">
                  <FileKey className="w-5 h-5 mr-2" />
                  Encryption Security Flow
                </h4>
                <div className="grid md:grid-cols-5 gap-4 text-center">
                  {[
                    { step: "1", label: "Generate AES Key", icon: Zap },
                    { step: "2", label: "Encrypt Data", icon: Shield },
                    { step: "3", label: "Get Public Keys", icon: Users },
                    { step: "4", label: "Wrap Keys", icon: FileKey },
                    { step: "5", label: "Store On-Chain", icon: Shield },
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">
                          {item.step}
                        </div>
                        <IconComponent className="w-4 h-4 text-emerald-600 mb-1" />
                        <div className="text-xs text-muted-foreground">
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-linear-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging Encrypted Sale...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Log Encrypted Sale</span>
                  </div>
                )}
              </Button>
            </InputGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
