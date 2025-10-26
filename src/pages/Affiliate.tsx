import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Sidebar } from '../components/shared/Sidebar';
import { JoinCampaignButton } from '../components/affiliate/JoinCampaignButton';
import { SalesList } from '../components/affiliate/SalesList';
import { ClaimPayouts } from '../components/affiliate/ClaimPayouts';
import { AffiliateOverview } from '../components/affiliate/AffiliateOverview';
import { ArrowLeft, Users, TrendingUp, DollarSign, BarChart3, Shield } from 'lucide-react';
import { NotificationProvider, useNotification } from '../context/NotificationContext';


interface AffiliateProps {
  onBack: () => void;
}

const AffiliateContent: React.FC<AffiliateProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'join-campaign', label: 'Join Campaign', icon: Users },
    { id: 'my-sales', label: 'My Sales & Commissions', icon: DollarSign },
    { id: 'claim-payouts', label: 'Claim Payouts', icon: TrendingUp },
    { id: 'performance', label: 'Performance Analytics', icon: TrendingUp },
    { id: 'security', label: 'Security Settings', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'join-campaign':
        return <JoinCampaignButton />;
      case 'my-sales':
        return <SalesList />;
      case 'claim-payouts':
        return <ClaimPayouts />;
      case 'overview':
        return <AffiliateOverview />;
      default:
        return <AffiliateOverview />;
    }
  };

  return (
    <div className="flex min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Sidebar */}
      <div className="hidden lg:flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-blue-100 dark:border-blue-900 shadow-xl">
        <div className="p-6 border-b border-blue-100 dark:border-blue-900">
          <Button variant="ghost" onClick={onBack} className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900">
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
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600'
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

        {/* Sidebar Stats */}
        <div className="p-4 border-t border-blue-100 dark:border-blue-900">
          <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg p-4">
            <div className="text-sm font-semibold text-blue-600 mb-1">Earnings This Month</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">$2,847</div>
            <div className="text-xs text-muted-foreground">+12% from last month</div>
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

export const Affiliate: React.FC<AffiliateProps> = (props) => (
  <NotificationProvider>
    <AffiliateContent {...props} />
  </NotificationProvider>
);