import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Sidebar } from '../components/shared/Sidebar';
import { CreateCampaignForm } from '../components/advertiser/CreateCampaignForm';
import { LogSaleForm } from '../components/advertiser/LogSaleForm';
import { GrantAccessForm } from '../components/advertiser/GrantAccessForm';
import { CampaignAnalytics } from '../components/advertiser/CampaignAnalytics';
import { NotificationProvider, useNotification } from '../context/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Plus, BarChart3, Shield, Users, Eye, TrendingUp} from 'lucide-react';

interface AdvertiserProps {
  onBack: () => void;
}

const AdvertiserContent: React.FC<AdvertiserProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { showNotification } = useNotification();

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'create-campaign', label: 'Create Campaign', icon: Plus },
    { id: 'my-campaigns', label: 'My Campaigns', icon: Users },
    { id: 'log-sale', label: 'Log Encrypted Sale', icon: Shield },
    { id: 'grant-access', label: 'Grant Audit Access', icon: Eye },
    { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'create-campaign':
        return <CreateCampaignForm />;
      case 'log-sale':
        return <LogSaleForm />;
      case 'grant-access':
        return <GrantAccessForm />;
      case 'analytics':
        return <CampaignAnalytics />;
      case 'overview':
        return <AdvertiserOverview />;
      case 'my-campaigns':
        return <MyCampaigns />;
      default:
        return <AdvertiserOverview />;
    }
  };

  return (
    <div className="flex min-h-[80vh] bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Sidebar */}
      <div className="hidden lg:flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-emerald-100 dark:border-emerald-900 shadow-xl">
        <div className="p-6 border-b border-emerald-100 dark:border-emerald-900">
          <Button variant="ghost" onClick={onBack} className="w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900">
            <ArrowLeft className="w-4 h-4 mr-3" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-12 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900 hover:text-emerald-600'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="w-4 h-4 mr-3" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-emerald-100 dark:border-emerald-900">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4">
            <div className="text-sm font-semibold text-emerald-600 mb-1">Advertiser Pro</div>
            <div className="text-xs text-muted-foreground">Unlock advanced features</div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full">
        <div className="p-4 border-b bg-white dark:bg-gray-800">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.slice(0, 4).map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="whitespace-nowrap"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label.split(' ')[0]}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Advertiser Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Manage your affiliate campaigns and track performance</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Campaigns', value: '12', change: '+2', icon: Users },
          { title: 'Total Sales', value: '1,234', change: '+12%', icon: BarChart3 },
          { title: 'Total Commissions', value: '$45,678', change: '+8%', icon: TrendingUp },
          { title: 'Active Affiliates', value: '89', change: '+5', icon: Users },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-emerald-600 font-semibold mt-1">{stat.change}</p>
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
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Sale Logged', campaign: 'Tech Gadgets', amount: '$1,200', time: '2 hours ago' },
                { action: 'Campaign Created', campaign: 'Summer Sale', amount: '-', time: '5 hours ago' },
                { action: 'Commission Paid', campaign: 'Web3 Tools', amount: '$450', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.campaign}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">{activity.amount}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Log Sale', icon: Plus, action: () => {} },
                { label: 'Create Campaign', icon: Users, action: () => {} },
                { label: 'View Analytics', icon: BarChart3, action: () => {} },
                { label: 'Manage Access', icon: Eye, action: () => {} },
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                    onClick={action.action}
                  >
                    <IconComponent className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">{action.label}</span>
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

const MyCampaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Campaigns</h2>
          <p className="text-muted-foreground">Manage your active affiliate campaigns</p>
        </div>
      </div>
      
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first campaign to get started</p>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};