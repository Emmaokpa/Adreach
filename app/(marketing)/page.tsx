"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Wallet,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Background Glow */}
      <div className="hero-glow" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Zap className="text-primary-foreground w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tight">AdReach</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#docs" className="hover:text-primary transition-colors">Docs</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">Sign in</Link>
            <Link href="/sign-up" className="btn-primary px-6 py-2.5 rounded-full text-sm">
              Start for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="space-y-8"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-xs font-medium text-primary">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Meta Ads for Nigeria</span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Your ads. <br />
            <span className="gradient-text">Running themselves.</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            The first AI advertising platform built specifically for Nigerian SMEs. 
            Reach thousands of customers on Facebook and Instagram without ever opening an Ads Manager.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/sign-up" className="btn-primary px-8 py-4 rounded-full flex items-center gap-2 group text-lg w-full sm:w-auto">
              Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="glass px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all text-lg w-full sm:w-auto border border-white/10">
              <Play className="w-5 h-5 fill-current" /> View Demo
            </button>
          </motion.div>

          <motion.div variants={fadeIn} className="pt-8 flex flex-col items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Launch in 2 mins</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10 rounded-full" />
          <div className="glass rounded-3xl p-4 border-white/10 overflow-hidden shadow-2xl">
             <div className="bg-[#020617] rounded-2xl aspect-video flex items-center justify-center border border-white/5 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                <Sparkles className="w-16 h-16 text-primary/20 animate-pulse" />
                {/* Float elements to mimic dashboard */}
                <div className="absolute top-10 left-10 glass p-4 rounded-xl border-white/10 animate-bounce transition-all duration-[3000ms]">
                  <BarChart3 className="text-primary" />
                </div>
                <div className="absolute bottom-10 right-10 glass p-4 rounded-xl border-white/10 animate-bounce transition-all duration-[2000ms]">
                  <Target className="text-primary" />
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl font-bold tracking-tighter">PAYSTACK</span>
          <span className="text-xl font-bold tracking-tighter italic">Kuda.</span>
          <span className="text-xl font-bold tracking-tighter">FLUTTERWAVE</span>
          <span className="text-xl font-bold tracking-tighter lowercase font-mono">moniepoint</span>
          <span className="text-xl font-bold tracking-tighter uppercase">Bukka Hut</span>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple. Fast. Effective.</h2>
          <p className="text-slate-400">Three simple steps to start reaching your ideal customers today.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              step: 1, 
              title: "Profile Your Business", 
              desc: "Tell us what you sell and who your customers are in plain English.",
              icon: <Target className="w-6 h-6" />
            },
            { 
              step: 2, 
              title: "Connect Your Page", 
              desc: "Securely link your Facebook and Instagram accounts with one click.",
              icon: <Zap className="w-6 h-6" />
            },
            { 
              step: 3, 
              title: "Let AI Take Over", 
              desc: "Our AI generates ads, finds your audience, and optimises for sales.",
              icon: <Sparkles className="w-6 h-6" />
            }
          ].map((item) => (
            <div key={item.step} className="relative p-8 rounded-3xl glass border-white/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="absolute top-8 right-8 text-6xl font-bold text-white/5">{item.step}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
               <span className="text-primary font-medium text-sm tracking-widest uppercase">Platform Features</span>
               <h2 className="text-3xl md:text-5xl font-bold mt-2">Everything you need to grow <br/> your business online</h2>
            </div>
            <Link href="/features" className="text-primary hover:underline flex items-center gap-2 group">
              See all features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Hyper-Local Targeting", desc: "We target by specific Nigerian cities, neighbourhoods, and local interests that actually convert into sales.", icon: <Target /> },
              { title: "AI Creative Engine", desc: "No designer? No problem. Our AI generates multiple ad variations with high-converting copy in seconds.", icon: <Sparkles /> },
              { title: "Transparent Reports", desc: "Simple weekly reports on WhatsApp or Email. See exactly how many customers and sales you got.", icon: <BarChart3 /> },
              { title: "Auto-Optimisation", desc: "Our algorithm shifts your budget to the best-performing ads automatically to save you money.", icon: <Zap /> },
              { title: "Safe Meta Connection", desc: "Official Meta API integration ensures your account is always secure and compliant with policies.", icon: <ShieldCheck /> },
              { title: "One-Click Wallet", desc: "Fund your ad account easily with local Nigerian cards, bank transfers, or USSD codes.", icon: <Wallet /> },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl glass border-white/5 hover:bg-white/[0.07] transition-all">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6">
                  {React.cloneElement(f.icon as React.ReactElement, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary/20 via-slate-900 to-slate-950 p-12 md:p-24 text-center border border-primary/20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />
          
          <h2 className="text-3xl md:text-6xl font-bold mb-8">Ready to stop guessing and start growing?</h2>
          <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
            Join 500+ Nigerian business owners who have automated their growth with AdReach.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/sign-up" className="btn-primary px-10 py-5 rounded-full text-lg w-full sm:w-auto shadow-2xl">
              Get Started for Free
            </Link>
            <button className="glass px-10 py-5 rounded-full text-lg w-full sm:w-auto hover:bg-white/10 transition-all border-white/10">
              Talk to an Expert
            </button>
          </div>
          
          <p className="mt-8 text-sm text-slate-500">No credit card required • Cancel anytime • 24/7 local support</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="text-primary-foreground w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">AdReach</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Automating Meta ads for the next 1 million Nigerian businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#features" className="hover:text-primary">AI Targeting</Link></li>
              <li><Link href="#features" className="hover:text-primary">Auto Optimisation</Link></li>
              <li><Link href="#features" className="hover:text-primary">Campaign Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-primary">Ad Academy</Link></li>
              <li><Link href="#" className="hover:text-primary">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-primary">Meta Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-primary">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-primary">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2024 AdReach AI. All rights reserved.</p>
          <div className="flex gap-8">
             <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
          <p>Lagos, Nigeria</p>
        </div>
      </footer>
    </div>
  );
}
