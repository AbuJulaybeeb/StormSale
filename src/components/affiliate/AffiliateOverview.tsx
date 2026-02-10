import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";

export const AffiliateOverview = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "$12,847",
      change: "+18%",
      icon: DollarSign,
    },
    { title: "Active Campaigns", value: "8", change: "+2", icon: Users },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.4%",
      icon: TrendingUp,
    },
    { title: "Monthly Goal", value: "85%", change: "On track", icon: Target },
  ];

  const recentPayouts = [
    {
      campaign: "Tech Gadgets Pro",
      amount: "$1,250",
      date: "2 days ago",
      status: "Completed",
    },
    {
      campaign: "Web3 Masterclass",
      amount: "$890",
      date: "1 week ago",
      status: "Completed",
    },
    {
      campaign: "Crypto Tools",
      amount: "$2,150",
      date: "2 weeks ago",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Affiliate Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your performance and maximize your earnings
          </p>
        </div>
        <Button className="bg-linear-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
          <Zap className="w-4 h-4 mr-2" />
          Quick Start Guide
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-emerald-600 font-semibold mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Payouts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Your latest commission payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayouts.map((payout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{payout.campaign}</div>
                      <div className="text-sm text-muted-foreground">
                        {payout.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">
                      {payout.amount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {payout.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-blue-600 hover:text-blue-700"
            >
              View All Payouts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Tips</CardTitle>
            <CardDescription>Boost your affiliate earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  tip: "Optimize your content for higher conversions",
                  impact: "High",
                },
                { tip: "Join trending campaigns early", impact: "Medium" },
                { tip: "Use multiple promotion channels", impact: "High" },
                {
                  tip: "Engage with your audience regularly",
                  impact: "Medium",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-linear-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-lg"
                >
                  <div className="text-sm">{item.tip}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.impact === "High"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "Join New Campaign",
                description: "Discover high-paying campaigns",
                icon: Users,
              },
              {
                label: "Track Performance",
                description: "View analytics and insights",
                icon: TrendingUp,
              },
              {
                label: "Withdraw Earnings",
                description: "Claim your commissions",
                icon: DollarSign,
              },
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900 text-left"
                >
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold">{action.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
