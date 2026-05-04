"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { 
  Bell, 
  Search, 
  Menu, 
  Home, 
  BarChart3, 
  Layers, 
  Plus,
  HelpCircle
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Desktop & Mobile) */}
        <header className="h-16 flex items-center justify-between px-6 md:px-10 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-2 text-slate-500 hover:text-[#020617] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-[#020617] tracking-tight">AdReach</span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-sm mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-11 pr-4 text-sm text-[#020617] placeholder:text-slate-400 outline-none transition-all focus:border-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:text-[#020617] transition-all">
                <HelpCircle className="w-5 h-5" />
             </button>
             <button className="p-2 text-slate-400 hover:text-[#020617] transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#020617]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-50">
           <button className="flex flex-col items-center gap-1 text-primary">
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-slate-500">
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Stats</span>
           </button>
           <div className="relative -top-6">
              <button className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 active:scale-95 transition-all">
                 <Plus className="w-8 h-8" />
              </button>
           </div>
           <button className="flex flex-col items-center gap-1 text-slate-500">
              <Layers className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Store</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-slate-500">
              <div className="w-5 h-5 rounded-md bg-slate-700 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Me" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
           </button>
        </nav>
      </div>
    </div>
  );
}
