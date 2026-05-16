import { useState } from "react";
import { Button } from "../components/ui/button";
import { Sidebar } from "../components/shared/Sidebar";
import { CreateCampaignForm } from "../components/advertiser/CreateCampaignForm";
import { LogSaleForm } from "../components/advertiser/LogSaleForm";
import { GrantAccessForm } from "../components/advertiser/GrantAccessForm";
import { CampaignAnalytics } from "../components/advertiser/CampaignAnalytics";
import { MyCampaignsList } from "../components/advertiser/MyCampaignsList";
import { NotificationProvider } from "../context/NotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  ArrowRight,
  Plus,
  BarChart3,
  Shield,
  Users,
  Eye,
  TrendingUp,
  Megaphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvertiserProps {
  onBack: () => void;
}

const AdvertiserContent: React.FC<AdvertiserProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
    { id: "create-campaign", label: "Create Campaign", icon: Plus },
    { id: "my-campaigns", label: "My Campaigns", icon: Users },
    { id: "log-sale", label: "Log Encrypted Sale", icon: Shield },
    { id: "grant-access", label: "Grant Audit Access", icon: Eye },
    { id: "analytics", label: "Campaign Analytics", icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "create-campaign":
        return <CreateCampaignForm />;
      case "log-sale":
        return <LogSaleForm />;
      case "grant-access":
        return <GrantAccessForm />;
      case "analytics":
        return <CampaignAnalytics />;
      case "overview":
        return <AdvertiserOverview />;
      case "my-campaigns":
        return <MyCampaignsList />;
      default:
        return <AdvertiserOverview />;
    }
  };

  return (
    <div className="flex min-h-[calc(100-65px)] bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        onBack={onBack}
        roleName="Advertiser Pro"
      />

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-8 lg:overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const Advertiser: React.FC<AdvertiserProps> = (props) => (
  <NotificationProvider>
    <AdvertiserContent {...props} />
  </NotificationProvider>
);

// Additional Components for Advertiser Dashboard
const AdvertiserOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Advertiser Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Manage your encrypted affiliate campaigns and track performance on-chain.
          </p>
        </div>
        <Button className="mt-6 lg:mt-0 bg-zinc-900 hover:bg-zinc-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-full px-6 h-12 font-semibold shadow-md transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Campaigns", value: "12", change: "+2 this week", icon: Megaphone },
          { title: "Total Sales", value: "1,234", change: "+12% vs last month", icon: BarChart3 },
          {
            title: "Total Commissions",
            value: "$45,678",
            change: "+8% vs last month",
            icon: TrendingUp,
          },
          { title: "Active Affiliates", value: "89", change: "+5 this week", icon: Users },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white dark:bg-zinc-900/80 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-zinc-800 rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-zinc-700">
                    <IconComponent className="w-5 h-5 text-zinc-900 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-900/50">
          <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 pb-4">
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Latest on-chain actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                {
                  action: "Sale Logged (Encrypted)",
                  campaign: "Tech Gadgets",
                  amount: "$1,200",
                  time: "2 hours ago",
                },
                {
                  action: "Campaign Created",
                  campaign: "Summer Sale",
                  amount: "N/A",
                  time: "5 hours ago",
                },
                {
                  action: "Commission Escrowed",
                  campaign: "Web3 Tools",
                  amount: "$450",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800/50 rounded-xl hover:border-slate-200 dark:hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-900 dark:text-white">
                      {activity.action}
                    </div>
                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                      {activity.campaign}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                      {activity.amount}
                    </div>
                    <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-slate-50 dark:hover:bg-zinc-900/50"
            >
              View All Activity <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-900/50">
          <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 pb-4">
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Frequently used smart contract calls
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Log Sale", icon: Shield, action: () => {} },
                { label: "Create Campaign", icon: Plus, action: () => {} },
                { label: "View Analytics", icon: BarChart3, action: () => {} },
                { label: "Manage Access", icon: Eye, action: () => {} },
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-24 flex-col gap-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all group"
                    onClick={action.action}
                  >
                    <IconComponent className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      {action.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
