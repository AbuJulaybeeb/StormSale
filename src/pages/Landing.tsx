import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useWeb3 } from '../hooks/useWeb3';
import { Shield, Key, FileCheck, Zap, Users, TrendingUp, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

export const Landing = () => {
  const { connectWallet } = useWeb3();
  
  // Safe handler for WalletConnect init — ignore duplicate-init warning from core
  const handleConnectWalletConnect = async () => {
    try {
      await connectWallet('walletconnect');
    } catch (err: any) {
      const msg = err?.message || '';
      // Silently ignore WalletConnect double-init message (can happen in StrictMode / HMR)
      if (msg.includes('already initialized') || msg.includes('Init() was called')) {
        // no-op
        return;
      }
      // rethrow or log other errors
      console.error('WalletConnect error:', err);
    }
  };

  const stats = [
    { value: '500+', label: 'Active Campaigns' },
    { value: '$2.5M+', label: 'Total Commissions' },
    { value: '10K+', label: 'Happy Affiliates' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Advertiser",
      content: "StormSale revolutionized our affiliate program. The encryption gives us peace of mind.",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Affiliate",
      content: "Earned over $50K in commissions securely. The platform is incredibly reliable.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Enterprise Client",
      content: "NIST compliance was crucial for us. StormSale delivered beyond expectations.",
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                StormSale
              </h1>
              <p className="text-sm text-muted-foreground">Secure Web3 Affiliate Platform</p>
            </div>
          </div>
          <Button 
            onClick={() => connectWallet()}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900 px-4 py-2 rounded-full mb-8">
            <Star className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Trusted by 500+ Web3 Companies
            </span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">StormSale</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The Future of Trustless Affiliate Marketing. Powered by BlockDAG and built on 
            <span className="font-semibold text-emerald-600"> NIST/ISO security principles</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
               onClick={handleConnectWalletConnect}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900 px-8"
            >
              Watch Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with military-grade encryption and compliance standards
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-emerald-100 dark:border-emerald-900">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">On-Chain Encryption</CardTitle>
              <CardDescription className="text-lg">
                All affiliate data is secured on-chain using hybrid AES + Public Key encryption.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-300 border-emerald-100 dark:border-emerald-900">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Key className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Cryptographic Access</CardTitle>
              <CardDescription className="text-lg">
                Only you can access your data with your private key. No exceptions.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-300 border-emerald-100 dark:border-emerald-900">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">NIST/ISO Compliant</CardTitle>
              <CardDescription className="text-lg">
                Designed from the ground up to meet core cybersecurity standards.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-white dark:bg-gray-800 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How StormSale Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and efficient affiliate management in three steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              step: "01",
              title: "Advertiser Logs Sale",
              description: "Advertiser creates encrypted sale records with commission escrow in BDAG tokens",
              icon: <Users className="w-8 h-8" />
            },
            {
              step: "02",
              title: "Data is Encrypted & Escrowed",
              description: "All data is encrypted on-chain with BDAG tokens held in secure escrow",
              icon: <Shield className="w-8 h-8" />
            },
            {
              step: "03",
              title: "Affiliate Claims Payout",
              description: "Affiliate decrypts data and claims commission after clearing period",
              icon: <TrendingUp className="w-8 h-8" />
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white font-bold text-2xl">{item.step}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-xl text-muted-foreground">See what our users say about StormSale</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-emerald-100 dark:border-emerald-900">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex space-x-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Floating Banner */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 animate-float">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Ready to get started?</span>
          </div>
          <Button 
             onClick={handleConnectWalletConnect}
             variant="secondary"
             size="sm"
             className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold"
           >
             Launch App
           </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StormSale</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Secure Web3 affiliate platform built on BlockDAG with enterprise-grade security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-emerald-600">Features</a></li>
                <li><a href="#" className="hover:text-emerald-600">Security</a></li>
                <li><a href="#" className="hover:text-emerald-600">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-600">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-emerald-600">About</a></li>
                <li><a href="#" className="hover:text-emerald-600">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-emerald-600">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-600">Security</a></li>
                <li><a href="#" className="hover:text-emerald-600">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 StormSale. All rights reserved. Built on BlockDAG.
          </div>
        </div>
      </footer>
    </div>
  );
};