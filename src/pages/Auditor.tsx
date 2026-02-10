import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { InputGroup, InputField } from "../components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  ArrowLeft,
  Eye,
  Shield,
  FileSearch,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useWeb3 } from "../hooks/useWeb3";
import { useNotification } from "../context/NotificationContext";
interface AuditorProps {
  onBack: () => void;
}

export const Auditor: React.FC<AuditorProps> = ({ onBack }) => {
  const [saleId, setSaleId] = useState("");
  const [campaignAddress, setCampaignAddress] = useState("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { userAddress } = useWeb3();
  const { showNotification } = useNotification();

  const checkAccess = async () => {
    if (!saleId || !campaignAddress || !userAddress) {
      showNotification({
        type: "warning",
        title: "Missing Information",
        message: "Please fill all required fields",
      });
      return;
    }

    setIsChecking(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const hasAccess = Math.random() > 0.3; // 70% success rate for demo
      setHasAccess(hasAccess);

      showNotification({
        type: hasAccess ? "success" : "warning",
        title: hasAccess ? "Access Granted" : "Access Denied",
        message: hasAccess
          ? "You can now view the encrypted sale data"
          : "Request access from advertiser or affiliate",
      });
    } catch (error) {
      showNotification({
        type: "error",
        title: "Check Failed",
        message: "Unable to verify access rights",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const requestAccess = () => {
    showNotification({
      type: "info",
      title: "Access Requested",
      message: "Your request has been sent to the parties involved",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Auditor Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Access encrypted sale data with proper authorization and
                maintain compliance
              </p>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Verify Access Rights</CardTitle>
                    <CardDescription>
                      Check your permissions for specific sale data
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <InputGroup>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                      label="Campaign Address"
                      description="The campaign contract address"
                      required
                    >
                      <Input
                        value={campaignAddress}
                        onChange={(e) => setCampaignAddress(e.target.value)}
                        placeholder="0x742d35Cc6634C0532925a3b8..."
                      />
                    </InputField>

                    <InputField
                      label="Sale ID"
                      description="Unique identifier for the sale"
                      required
                    >
                      <Input
                        type="number"
                        value={saleId}
                        onChange={(e) => setSaleId(e.target.value)}
                        placeholder="e.g., 123"
                      />
                    </InputField>
                  </div>

                  <Button
                    onClick={checkAccess}
                    disabled={isChecking}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    {isChecking ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Checking Access...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FileSearch className="w-5 h-5" />
                        <span>Verify Access Rights</span>
                      </div>
                    )}
                  </Button>
                </InputGroup>

                {/* Access Result */}
                {hasAccess !== null && (
                  <div
                    className={`mt-6 p-6 rounded-xl border-2 ${
                      hasAccess
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                        : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {hasAccess ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                          <div>
                            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">
                              Access Granted
                            </h4>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                              You have been granted access to view this
                              encrypted sale data.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-8 h-8 text-red-600" />
                          <div>
                            <h4 className="font-semibold text-red-700 dark:text-red-300">
                              Access Denied
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                              You don't have permission to access this sale
                              data.
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {!hasAccess && (
                      <Button
                        onClick={requestAccess}
                        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        Request Access
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auditor Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Auditor Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Audits Completed", value: "47" },
                  { label: "Active Requests", value: "3" },
                  { label: "Success Rate", value: "98%" },
                  { label: "Avg. Response Time", value: "2.3h" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="font-semibold text-purple-600">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Guide */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Auditor Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Verify campaign address format",
                  "Ensure sale ID is valid",
                  "Check your access permissions",
                  "Contact parties if access denied",
                  "Follow compliance protocols",
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
