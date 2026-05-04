"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Rocket
} from "lucide-react";
import confetti from "canvas-confetti";

export default function OnboardingSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#10b981", "#020617"]
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div className="p-10 md:p-20 text-center space-y-10">
          {/* Progress Indicator */}
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Step 3 of 3</span>
               <div className="h-1 w-40 bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-[#22c55e] rounded-full transition-all duration-1000" />
               </div>
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
               <CheckCircle2 className="w-3 h-3" />
               Onboarding Complete
             </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-green-400/20 blur-[40px] rounded-full animate-pulse" />
               <div className="relative w-24 h-24 bg-[#020617] rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
                  <Rocket className="text-[#22c55e] w-12 h-12" />
               </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#020617] tracking-tight">You&apos;re all set!</h1>
              <p className="text-slate-500 text-lg max-w-md mx-auto">
                Your account is ready. Our AI is now analyzing your business to prepare your first campaign.
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: <Sparkles className="w-5 h-5" />, title: "AI Creatives", desc: "Generating high-quality ad variants." },
              { icon: <Zap className="w-5 h-5" />, title: "Smart Targeting", desc: "Finding your ideal Nigerian audience." },
              { icon: <CheckCircle2 className="w-5 h-5" />, title: "Ready to Launch", desc: "Start reaching customers in 1 click." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="text-[#22c55e]">{item.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-[#020617]">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto bg-[#020617] text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 group text-lg"
            >
              Go to Dashboard
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 text-xs text-slate-400">
              Welcome to the future of advertising. Let&apos;s grow your business.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
