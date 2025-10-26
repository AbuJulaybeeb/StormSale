import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useWeb3 } from '../hooks/useWeb3';
import { Megaphone, Users, Eye, Zap, ArrowRight, Shield, TrendingUp, BadgeCheck} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { userAddress } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const roles = [
    {
      id: 'advertiser',
      title: 'Advertiser',
      description: 'Create campaigns, log sales, and manage your affiliate programs',
      icon: Megaphone,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Create Campaigns', 'Log Encrypted Sales', 'Manage Commissions', 'Analytics Dashboard'],
      stats: '500+ Active Campaigns'
    },
    {
      id: 'affiliate',
      title: 'Affiliate',
      description: 'Join campaigns, track sales, and claim your commissions securely',
      icon: Users,
      gradient: 'from-emerald-500 to-blue-500',
      features: ['Join Campaigns', 'Track Performance', 'Secure Payouts', 'Real-time Analytics'],
      stats: '10K+ Happy Affiliates'
    },
    {
      id: 'auditor',
      title: 'Auditor',
      description: 'Access encrypted sale data with proper authorization and compliance',
      icon: Eye,
      gradient: 'from-orange-500 to-red-500',
      features: ['Secure Data Access', 'Compliance Tools', 'Audit Trails', 'Enterprise Features'],
      stats: 'Enterprise Grade Security'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Welcome to StormSale Dashboard
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connected as: <span className="font-mono text-emerald-600">{userAddress && formatAddress(userAddress)}</span>
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                onClick={() => onNavigate(role.id)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Header */}
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="flex items-center text-emerald-600 text-sm font-semibold">
                        <BadgeCheck className="w-4 h-4 mr-1" />
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">KEY FEATURES</h4>
                    <ul className="space-y-2">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Shield className="w-4 h-4 text-emerald-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        {role.stats}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${role.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white border-0`}
                    size="lg"
                  >
                    Enter Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats Footer */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-emerald-600">500+</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-emerald-600">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Total Commissions</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-emerald-600">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Affiliates</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-emerald-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Platform Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};