"use client";

import React from "react";
import { Zap, HelpCircle, Bell, Search } from "lucide-react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020617] rounded-lg flex items-center justify-center">
              <Zap className="text-[#22C55E] w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold text-[#020617] tracking-tight">AdReach</span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-sm mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-11 pr-4 text-sm outline-none transition-all focus:border-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2024 AdReach AI. Built for Nigerian SMEs.</p>
        <div className="flex gap-6">
           <a href="#" className="hover:text-slate-800">Privacy Policy</a>
           <a href="#" className="hover:text-slate-800">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
