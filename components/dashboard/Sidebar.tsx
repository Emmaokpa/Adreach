"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BarChart3, 
  Layers, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap,
  PlusCircle,
  MessageSquare,
  Megaphone,
  Sparkles,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const business = useQuery(api.businesses.getMyBusiness);

  const menuItems = [
    { icon: Megaphone, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: Sparkles, label: "Creatives", href: "/dashboard/creatives" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const secondaryItems = [
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white text-slate-500 border-r border-slate-200 sticky top-0">
      {/* Logo */}
      <div className="p-4">
        <div className="h-12 bg-[#020617] rounded-lg flex items-center px-4 gap-2">
          <Zap className="text-primary w-5 h-5 fill-current" />
          <span className="text-lg font-bold text-white tracking-tight">AdReach</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all group",
                isActive 
                  ? "bg-slate-100 text-[#020617]" 
                  : "text-slate-500 hover:text-[#020617] hover:bg-slate-50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-[#020617]" : "text-slate-400 group-hover:text-[#020617]"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="p-4 mt-auto space-y-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
          <PlusCircle className="w-5 h-5" />
          New Campaign
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 bg-slate-50">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200">
           <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden">
              <img src={user?.imageUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`} alt="User" />
           </div>
           <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-[#020617] truncate">{business?.name ?? "My Business"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
           </div>
        </div>
      </div>
    </aside>
  );
}
