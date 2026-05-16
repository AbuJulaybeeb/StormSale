import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useWeb3 } from "../hooks/useWeb3";
import {
  Megaphone,
  Users,
  Eye,
  Zap,
  ArrowRight,
  Shield,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { userAddress, updateUserRole } = useWeb3();

  const handleRoleSelect = async (roleId: string) => {
    await updateUserRole(roleId.toUpperCase());
    onNavigate(roleId);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const roles = [
    {
      id: "advertiser",
      title: "Advertiser",
      description:
        "Create campaigns, log sales, and manage your affiliate programs securely on-chain.",
      icon: Megaphone,
      features: [
        "Create Campaigns",
        "Log Encrypted Sales",
        "Manage Commissions",
        "Analytics Dashboard",
      ],
      stats: "500+ Active Campaigns",
    },
    {
      id: "affiliate",
      title: "Affiliate",
      description:
        "Join campaigns, track sales, and claim your commissions securely with crypto payouts.",
      icon: Users,
      features: ["Join Campaigns", "Track Performance", "Secure Payouts", "Real-time Analytics"],
      stats: "10K+ Happy Affiliates",
    },
    {
      id: "auditor",
      title: "Auditor",
      description:
        "Access encrypted sale data with proper authorization and compliance verification.",
      icon: Eye,
      features: ["Secure Data Access", "Compliance Tools", "Audit Trails", "Enterprise Features"],
      stats: "Enterprise Grade Security",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs md:text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              Welcome to StormSale
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
            Choose Your Role
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Connected as:{" "}
            <span className="font-mono font-medium text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800 shadow-sm ml-2">
              {userAddress ? formatAddress(userAddress) : "Not Connected"}
            </span>
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group relative h-full flex flex-col overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900/80 cursor-pointer rounded-2xl"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  {/* Header */}
                  <CardHeader className="relative z-10 pb-6 pt-8 px-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-zinc-900 dark:bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                          Status
                        </div>
                        <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-bold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Active
                        </div>
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[48px]">
                      {role.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 flex flex-col flex-1 px-8 pb-8">
                    {/* Features List */}
                    <div className="mb-8 flex-1">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {role.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300"
                          >
                            <Shield className="w-4 h-4 text-indigo-500 mr-3 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 p-4 bg-slate-50 dark:bg-zinc-950/50 rounded-xl border border-slate-100 dark:border-zinc-800/50">
                      <div className="flex items-center text-sm font-semibold">
                        <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-zinc-900 dark:text-white">{role.stats}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md transition-all h-12 rounded-xl font-semibold">
                      Enter Dashboard
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats Footer */}
        <div className="max-w-5xl mx-auto mt-20 pt-16 border-t border-slate-200 dark:border-zinc-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                500+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Active Campaigns
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                $2.5M+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Total Commissions
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                10K+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Happy Affiliates
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                99.9%
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Platform Uptime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
