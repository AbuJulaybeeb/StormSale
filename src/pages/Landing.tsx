import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useWeb3 } from "../hooks/useWeb3";
import { Shield, FileCheck, Zap, ArrowRight, Star, Lock } from "lucide-react";
import { motion } from "framer-motion";

export const Landing = () => {
  const { connectWallet } = useWeb3();

  const stats = [
    { value: "500+", label: "Active Campaigns" },
    { value: "$2.5M+", label: "Total Commissions" },
    { value: "10K+", label: "Happy Affiliates" },
    { value: "99.9%", label: "Uptime" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Advertiser",
      content:
        "StormSale revolutionized our affiliate program. The encryption gives us peace of mind.",
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      role: "Affiliate",
      content: "Earned over $50K in commissions securely. The platform is incredibly reliable.",
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "Enterprise Client",
      content: "NIST compliance was crucial for us. StormSale delivered beyond expectations.",
      avatar: "EW",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 dark:bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                StormSale
              </h1>
              <p className="hidden md:block text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest leading-none mt-1">
                Secure Web3 Affiliate Platform
              </p>
            </div>
          </div>
          <Button
            onClick={() => connectWallet()}
            className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md transition-all h-10 md:h-12 px-6 font-bold"
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Connect Wallet
          </Button>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center relative">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-4 py-1.5 rounded-full mb-8 shadow-sm"
          >
            <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs md:text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              Enterprise Grade Web3 Security
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight text-zinc-900 dark:text-white"
          >
            Trustless{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Affiliate
            </span>{" "}
            Stack
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Built on BlockDAG. Powered by NIST-level encryption. Automate your affiliate program
            with complete transparency.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Button
              onClick={() => connectWallet()}
              size="lg"
              className="w-full sm:w-auto rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20 transition-all transform hover:-translate-y-1 h-16 px-10 text-xl font-bold"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white transition-all h-16 px-10 text-xl font-bold"
            >
              Explore Tech Stack
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-3xl bg-white dark:bg-zinc-900/50 shadow-sm border border-slate-100 dark:border-zinc-800 group hover:border-indigo-500/50 transition-colors"
            >
              <div className="text-3xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-1 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-zinc-900 dark:text-white">
            Enterprise Protocol
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Military-grade security frameworks for trustless collaboration
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Hybrid Encryption",
              desc: "On-chain data secured via AES-GCM and ECIES public key infrastructure.",
              icon: Shield,
            },
            {
              title: "Private Key Ownership",
              desc: "Non-custodial access control. Only valid key holders can decrypt sales data.",
              icon: Lock,
            },
            {
              title: "Regulatory Ready",
              desc: "Designed to meet NIST SP 800-53 and ISO/IEC 27001 data protection standards.",
              icon: FileCheck,
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group h-full hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="text-center pt-10 px-8">
                  <div className="w-20 h-20 bg-zinc-900 dark:bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:rotate-6 transition-transform duration-500 shadow-xl">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-zinc-900 dark:text-white">
            Industry Standard
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            Used by top-tier Web3 projects globally
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm hover:shadow-lg transition-all rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-zinc-900 dark:bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-zinc-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed text-lg font-medium">
                    "{testimonial.content}"
                  </p>
                  <div className="flex space-x-1 mt-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-indigo-500 text-indigo-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 dark:bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            Ready to scale securely?
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100/80 mb-12 max-w-2xl mx-auto font-medium">
            Join the leading protocol for trustless affiliate marketing on the BlockDAG network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => connectWallet()}
              size="lg"
              className="h-16 px-12 rounded-2xl bg-white text-zinc-900 hover:bg-slate-100 text-xl font-bold transition-transform hover:-translate-y-1"
            >
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 px-12 rounded-2xl border-white/20 text-white hover:bg-white/10 text-xl font-bold"
            >
              Read Docs
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-zinc-900 dark:bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">
                  StormSale
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                Next-generation affiliate protocol. Secure, trustless, and fully decentralized.
              </p>
            </div>
            {["Product", "Company", "Legal"].map((title, i) => (
              <div key={i}>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest text-xs">
                  {title}
                </h3>
                <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-500">
                  <li>
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                      Link Item 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                      Link Item 2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                      Link Item 3
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 dark:border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <div>© 2024 StormSale Protocol.</div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-4 h-4" />
              <span>BlockDAG Mainnet Verified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
