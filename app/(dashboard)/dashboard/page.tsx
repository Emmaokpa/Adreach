"use client";

import React from "react";
export const dynamic = "force-dynamic";
import { motion } from "framer-motion";
import {
  Users,
  MousePointer2,
  Wallet,
  Zap,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Sparkles,
  ArrowUpRight,
  FileText,
  BarChart3,
  ShieldCheck,
  Crown,
  MessageCircle,
  Megaphone,
  Briefcase,
  Settings,
  CheckCircle2
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const miniChartData = [
  { value: 400 }, { value: 300 }, { value: 600 }, { value: 800 }, { value: 500 }, { value: 900 }, { value: 1100 }
];

const redChartData = [
  { value: 100 }, { value: 400 }, { value: 300 }, { value: 700 }, { value: 600 }, { value: 900 }, { value: 800 }
];

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  const { user } = useUser();
  const business = useQuery(api.businesses.getMyBusiness);

  const stats = [
    { label: "Total Reach", value: "689,000", change: "+18.4%", icon: <Users className="w-5 h-5" />, color: "text-slate-400", trend: "up" },
    { label: "Total Clicks", value: "15,870", change: "+12.1%", icon: <MousePointer2 className="w-5 h-5" />, color: "text-slate-400", trend: "up" },
    { label: "Ad Spend (MTD)", value: "₦208,450", change: "-5.2%", icon: <Wallet className="w-5 h-5" />, color: "text-slate-400", trend: "down", chart: redChartData },
    { label: "Active Campaigns", value: "4", change: "Stable", icon: <Zap className="w-5 h-5" />, color: "text-slate-400", trend: "neutral" },
  ];

  const campaigns = [
    { name: "Easter Sales Boost", status: "Active", spend: "₦45,000", ctr: "3.3%", trend: miniChartData, color: "bg-green-100 text-green-700" },
    { name: "Ikeja Store Visits", status: "Optimizing", spend: "₦28,000", ctr: "2.1%", trend: miniChartData, color: "bg-blue-100 text-blue-700" },
    { name: "Brand Awareness - Lagos", status: "Active", spend: "₦120,000", ctr: "1.9%", trend: miniChartData, color: "bg-green-100 text-green-700" },
    { name: "Wholesale Retargeting", status: "Paused", spend: "₦0", ctr: "0.0%", trend: [{ value: 0 }, { value: 0 }], color: "bg-slate-100 text-slate-500" },
    { name: "New Collection Launch", status: "Active", spend: "₦15,000", ctr: "2.8%", trend: miniChartData, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#020617] tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-[15px]">Welcome back, {user?.firstName ?? "there"}. Your campaigns are performing 12% better this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#020617] flex items-center gap-2 hover:bg-slate-50 transition-all">
            <ArrowUpRight className="w-4 h-4" /> Export Data
          </button>
          <button className="px-5 py-2.5 bg-[#020617] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-500" : "text-slate-400"
                }`}>
                {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                {stat.trend === "down" && <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#020617]">{stat.value}</h3>
            </div>
            {stat.chart && (
              <div className="h-12 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.chart}>
                    <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Campaigns Table Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#020617]">Active Campaigns</h2>
                <p className="text-xs text-slate-400 mt-0.5">Real-time performance of your Meta ads.</p>
              </div>
              <div className="flex p-1 bg-slate-100 rounded-lg">
                <button className="px-4 py-1.5 rounded-md text-[11px] font-bold bg-white text-[#020617] shadow-sm">All</button>
                <button className="px-4 py-1.5 rounded-md text-[11px] font-bold text-slate-500 hover:text-[#020617]">Running</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Campaign Name</th>
                    <th className="px-6 py-4 font-bold text-center">Status</th>
                    <th className="px-6 py-4 font-bold">Spend</th>
                    <th className="px-6 py-4 font-bold">CTR</th>
                    <th className="px-6 py-4 font-bold">7-Day Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaigns.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} alt={c.name} />
                          </div>
                          <span className="text-sm font-bold text-[#020617] truncate max-w-[180px]">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.color}`}>
                            {c.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#020617]">{c.spend}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{c.ctr}</td>
                      <td className="px-6 py-4 w-28">
                        <div className="h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={c.trend}>
                              <Line type="monotone" dataKey="value" stroke={c.status === "Paused" ? "#cbd5e1" : "#020617"} strokeWidth={1.5} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full py-4 text-sm font-bold text-slate-500 hover:text-[#020617] border-t border-slate-100 transition-colors">
              View All Campaigns
            </button>
          </div>

          {/* Bottom Wallet & Health Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0D0D0D] rounded-2xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet className="w-24 h-24" />
              </div>
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Wallet Balance</p>
                  <h3 className="text-3xl font-bold">₦{(business?.walletBalance ?? 0).toLocaleString()}</h3>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white text-[#0D0D0D] rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                    Top Up Wallet
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                    History
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#020617]">Account Healthy</h4>
                  <p className="text-[11px] text-slate-500">Your Meta Business verification is complete. All systems are operational.</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Verification Score</span>
                  <span className="text-[#020617]">{business?.verificationScore ?? 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#020617] rounded-full transition-all duration-1000" style={{ width: `${business?.verificationScore ?? 0}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-8">
          {/* AI Performance Tip */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#020617]">AI Performance Tip</h4>
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                Your &quot;Easter Sales Boost&quot; campaign is seeing high engagement in **Surulere** but low conversion. We recommend shifting **₦3,500/day** budget to your **Lekki Phase 1** audience segment where ROI is 2.4x higher.
              </p>
            </div>
            <button className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#020617] hover:bg-slate-100 transition-all">
              Apply Suggestion
            </button>
          </div>

          {/* Quick Tools */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Tools</h4>
            <div className="space-y-2">
              {[
                { icon: <Sparkles className="w-4 h-4" />, label: "Generate AI Creatives" },
                { icon: <BarChart3 className="w-4 h-4" />, label: "Deep Dive Analytics" },
                { icon: <Users className="w-4 h-4" />, label: "Audience Manager" },
                { icon: <Settings className="w-4 h-4" />, label: "Platform Settings" },
              ].map((tool, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group text-left">
                  <div className="text-slate-400 group-hover:text-[#020617]">{tool.icon}</div>
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-[#020617]">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Feature Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 opacity-5 rotate-12 transition-transform group-hover:scale-110">
              <Zap className="w-32 h-32" />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Crown className="w-3 h-3" /> Premium Feature
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#020617]">Unlock AI Video Ads</h4>
                <p className="text-[12px] text-slate-500 leading-relaxed">
                  Boost conversions by 40% with automated AI video generation for Instagram Reels.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> 5 Video credits per month
                </li>
                <li className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> Advanced audience insights
                </li>
              </ul>
              <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#020617] hover:bg-slate-100 transition-all shadow-sm">
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* Help Chat */}
          <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden" alt="Expert" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#020617]">Need help?</p>
                <p className="text-[10px] text-slate-500">Ask our ad experts.</p>
              </div>
            </div>
            <button className="text-[11px] font-bold text-slate-400 hover:text-[#020617]">Chat Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
