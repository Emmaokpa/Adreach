"use client";

import React, { useState } from "react";
export const dynamic = "force-dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  MoreVertical,
  X,
  ArrowRight
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePaystackPayment } from "react-paystack";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const { user } = useUser();
  const business = useQuery(api.businesses.getMyBusiness);
  const fundWallet = useMutation(api.businesses.fundWallet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [funding, setFunding] = useState(false);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    amount: (parseInt(amount) || 0) * 100, // Paystack uses kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
  };

  const initializePayment = usePaystackPayment(config);
  const realTransactions = useQuery(api.businesses.getTransactions, business ? { businessId: business._id } : "skip");

  const onSuccess = (reference: any) => {
    setFunding(true);
    fundWallet({
      businessId: business!._id,
      amount: parseInt(amount),
      reference: reference.reference,
    }).then(() => {
      setFunding(false);
      setIsModalOpen(false);
      setAmount("");
    });
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const handleFundWallet = () => {
     if (!business || !amount) return;
     initializePayment({ onSuccess, onClose });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#020617] tracking-tight">Wallet</h1>
          <p className="text-slate-500 text-[15px]">Manage your ad budget and view transaction history.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#020617] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-100"
        >
          <Plus className="w-4 h-4" /> Fund Wallet
        </button>
      </div>

      {/* Wallet Balance Card */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#0D0D0D] rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <Wallet className="w-40 h-40" />
          </div>
          <div className="relative z-10 space-y-10">
             <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Total Balance</p>
                <h2 className="text-5xl font-black tracking-tight">₦{(business?.walletBalance ?? 0).toLocaleString()}</h2>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                   <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center">
                      <ArrowDownLeft className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deposited</p>
                      <p className="text-sm font-bold">₦120,000</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                   <div className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Spent</p>
                      <p className="text-sm font-bold">₦77,500</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Quick Actions/Info */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 space-y-8">
           <h3 className="text-sm font-bold text-[#020617] uppercase tracking-widest">Payment Method</h3>
           <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                 <img src="https://api.dicebear.com/7.x/initials/svg?seed=VISA" alt="VISA" className="w-full h-full p-1" />
              </div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-[#020617]">•••• 4242</p>
                 <p className="text-[11px] text-slate-400">Expires 12/28</p>
              </div>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed">
             Secure payments powered by **Paystack**. Your card details are never stored on our servers.
           </p>
           <button className="w-full py-4 text-xs font-bold text-[#020617] hover:underline">Change method</button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#020617]">Transaction History</h2>
          <div className="flex items-center gap-2">
             <button className="p-2 text-slate-400 hover:text-[#020617] transition-all"><Clock className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Transaction</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Amount</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {realTransactions?.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        tx.amount > 0 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {tx.amount > 0 ? <Plus className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#020617]">{tx.amount > 0 ? "Wallet Top-up" : "Campaign Spend"}</p>
                        <p className="text-[11px] text-slate-400">{tx.amount > 0 ? `via Paystack` : "Campaign"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      tx.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={cn(
                    "px-8 py-5 text-sm font-bold text-right",
                    tx.amount > 0 ? "text-green-600" : "text-[#020617]"
                  )}>
                    {tx.amount > 0 ? "+" : "-"}₦{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-[#020617] transition-colors"><MoreVertical className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
              {(!realTransactions || realTransactions.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm italic">
                    No transactions found. Fund your wallet to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Wallet Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                   <div className="w-12 h-12 bg-[#020617] rounded-2xl flex items-center justify-center text-white">
                      <Wallet className="w-6 h-6" />
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-[#020617] transition-colors">
                      <X className="w-6 h-6" />
                   </button>
                </div>
                <div className="space-y-2">
                   <h2 className="text-2xl font-bold text-[#020617]">Fund your wallet</h2>
                   <p className="text-sm text-slate-500">Enter the amount you&apos;d like to add to your ad budget.</p>
                </div>

                <div className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Amount (NGN)</label>
                      <div className="relative">
                         <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₦</span>
                         <input 
                           type="number" 
                           placeholder="50,000"
                           className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 pl-14 pr-6 text-2xl font-bold text-[#020617] outline-none focus:border-[#020617] transition-all"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-3">
                      {["10000", "25000", "50000"].map((preset) => (
                        <button 
                          key={preset}
                          onClick={() => setAmount(preset)}
                          className="py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-[#020617] hover:bg-slate-100 transition-all"
                        >
                          ₦{parseInt(preset).toLocaleString()}
                        </button>
                      ))}
                   </div>

                   <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-[11px] text-green-800 leading-relaxed font-medium">
                        Your funds will be available instantly after successful payment via Paystack.
                      </p>
                   </div>

                   <button 
                     onClick={handleFundWallet}
                     disabled={!amount || parseInt(amount) < 1000}
                     className="w-full py-5 bg-[#020617] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-slate-100"
                   >
                     Pay with Paystack
                     <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Megaphone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}
