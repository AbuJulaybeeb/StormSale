import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Download, Calendar } from 'lucide-react';

export const CampaignAnalytics = () => {
  const campaignStats = [
    { name: 'Tech Gadgets Pro', sales: 124, revenue: 24800, commissions: 2480, affiliates: 12 },
    { name: 'Web3 Masterclass', sales: 89, revenue: 44500, commissions: 4450, affiliates: 8 },
    { name: 'Crypto Tools Suite', sales: 67, revenue: 33500, commissions: 3350, affiliates: 6 },
    { name: 'DeFi Starter Pack', sales: 45, revenue: 22500, commissions: 2250, affiliates: 5 },
  ];

  const performanceMetrics = [
    { label: 'Total Revenue', value: '$125,300', change: '+18%', icon: DollarSign },
    { label: 'Total Sales', value: '325', change: '+12%', icon: TrendingUp },
    { label: 'Active Affiliates', value: '31', change: '+5', icon: Users },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: BarChart3 },
  ];

  const topAffiliates = [
    { name: 'Alex Johnson', sales: 45, commission: '$4,500', performance: 'Excellent' },
    { name: 'Sarah Miller', sales: 38, commission: '$3,800', performance: 'Excellent' },
    { name: 'Mike Chen', sales: 32, commission: '$3,200', performance: 'Good' },
    { name: 'Emily Davis', sales: 28, commission: '$2,800', performance: 'Good' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Campaign Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track performance, monitor revenue, and optimize your affiliate campaigns
          </p>
        </div>
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <p className="text-sm text-emerald-600 font-semibold mt-1">{metric.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
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
        {/* Campaign Performance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Revenue and sales across all your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignStats.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.affiliates} affiliates • {campaign.sales} sales
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">${campaign.revenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      ${campaign.commissions.toLocaleString()} commissions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Top Affiliates</CardTitle>
            <CardDescription>Your highest performing affiliates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAffiliates.map((affiliate, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {affiliate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{affiliate.name}</div>
                      <div className="text-sm text-muted-foreground">{affiliate.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{affiliate.commission}</div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      affiliate.performance === 'Excellent' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {affiliate.performance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-emerald-600 hover:text-emerald-700">
              View All Affiliates
              <Eye className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-emerald-400 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Revenue chart visualization</p>
              <p className="text-sm text-muted-foreground mt-1">Interactive chart will be implemented here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold mb-2">32%</div>
            <div className="text-sm opacity-90">Higher conversion rate than industry average</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold mb-2">18%</div>
            <div className="text-sm opacity-90">Month-over-month growth in affiliate signups</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="text-2xl font-bold mb-2">94%</div>
            <div className="text-sm opacity-90">Affiliate retention rate this quarter</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};