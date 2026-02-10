import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { InputField } from "../../components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useWeb3 } from "../../hooks/useWeb3";
import { useNotification } from "../../context/NotificationContext";
import { Zap, Target, Clock, DollarSign } from "lucide-react";

export const CreateCampaignForm = () => {
  const [commissionRate, setCommissionRate] = useState("");
  const [clearingPeriod, setClearingPeriod] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { factoryContract } = useWeb3();
  const { showNotification } = useNotification();

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factoryContract) {
      showNotification({
        type: "error",
        title: "Wallet Not Connected",
        message: "Please connect your wallet first",
      });
      return;
    }

    setIsLoading(true);
    try {
      const tx = await factoryContract.createCampaign(
        commissionRate,
        clearingPeriod,
      );

      showNotification({
        type: "info",
        title: "Transaction Submitted",
        message: "Creating your campaign...",
      });

      await tx.wait();

      showNotification({
        type: "success",
        title: "Campaign Created!",
        message: "Your affiliate campaign is now live",
      });

      // Reset form
      setCommissionRate("");
      setClearingPeriod("");
      setCampaignName("");
      setBudget("");
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      showNotification({
        type: "error",
        title: "Creation Failed",
        message: error.message || "Failed to create campaign",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const presetPeriods = [
    { label: "7 Days", value: "604800" },
    { label: "14 Days", value: "1209600" },
    { label: "30 Days", value: "2592000" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Create New Campaign
        </h2>
        <p className="text-muted-foreground mt-2">
          Set up a new affiliate campaign with commission rates and payout terms
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Campaign Details</CardTitle>
              <CardDescription>
                Configure your affiliate program settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleCreateCampaign}>
            <div className="space-y-6">
              <InputField
                label="Campaign Name"
                description="Give your campaign a recognizable name"
                required
              >
                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sale 2024"
                  required
                />
              </InputField>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Commission Rate"
                  description="Percentage commission for affiliates"
                  required
                >
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      placeholder="e.g., 15 for 15%"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      %
                    </div>
                  </div>
                </InputField>

                <InputField
                  label="Campaign Budget"
                  description="Total budget allocated for commissions"
                >
                  <div className="relative">
                    <Input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g., 10000"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      BDAG
                    </div>
                  </div>
                </InputField>
              </div>

              <InputField
                label="Payout Clearing Period"
                description="Time before affiliates can claim commissions"
                required
              >
                <div className="space-y-4">
                  <div className="flex gap-3">
                    {presetPeriods.map((period) => (
                      <Button
                        key={period.value}
                        type="button"
                        variant={
                          clearingPeriod === period.value
                            ? "default"
                            : "outline"
                        }
                        className={`flex-1 ${
                          clearingPeriod === period.value
                            ? "bg-linear-to-r from-emerald-500 to-blue-500 text-white"
                            : "border-emerald-200 hover:bg-emerald-50"
                        }`}
                        onClick={() => setClearingPeriod(period.value)}
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>

                  <div className="relative">
                    <Input
                      type="number"
                      value={clearingPeriod}
                      onChange={(e) => setClearingPeriod(e.target.value)}
                      placeholder="Or enter custom period in seconds"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      seconds
                    </div>
                  </div>
                </div>
              </InputField>

              {/* Summary Card */}
              <div className="bg-linear-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                  Campaign Summary
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Target className="w-4 h-4 mr-2" />
                      Commission Rate
                    </div>
                    <div className="font-semibold">
                      {commissionRate || "0"}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Clearing Period
                    </div>
                    <div className="font-semibold">
                      {clearingPeriod
                        ? Math.round(parseInt(clearingPeriod) / 86400)
                        : "0"}{" "}
                      days
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Estimated Budget
                    </div>
                    <div className="font-semibold">{budget || "0"} BDAG</div>
                  </div>
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
                    <span>Creating Campaign...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Launch Campaign</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
