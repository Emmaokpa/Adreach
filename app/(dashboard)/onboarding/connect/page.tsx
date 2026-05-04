"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function MetaConnectPage() {
  const router = useRouter();
  const business = useQuery(api.businesses.getMyBusiness);
  const updateBusiness = useMutation(api.businesses.updateBusiness);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // Simulate Meta OAuth flow
    setTimeout(async () => {
      if (business) {
        await updateBusiness({
          id: business._id,
          metaConnected: true,
          onboardingStep: "success",
        });
      }
      setLoading(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => router.push("/onboarding/business")}
        className="flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to business profile
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
      >
        <div className="p-10 md:p-14">
          {/* Step Header */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
            <div className="space-y-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Step 2 of 3</span>
               <div className="h-1 w-40 bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-[66%] bg-[#020617] rounded-full transition-all duration-700" />
               </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Meta Connection</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-[#020617] mb-2 tracking-tight">Connect your Meta account</h1>
            <p className="text-slate-500 text-[15px] mb-12">
              Link your Facebook and Instagram business pages so our AI can launch and manage ads on your behalf.
            </p>

            {!connected ? (
              <div className="space-y-10">
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center space-y-6">
                  <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-100">
                    <FacebookIcon className="text-white w-10 h-10 fill-current" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#020617]">Facebook & Instagram</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      You'll be redirected to Meta to securely authorize AdReach to manage your ads.
                    </p>
                  </div>
                  <button 
                    onClick={handleConnect}
                    disabled={loading}
                    className="w-full max-w-sm bg-[#1877F2] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-100 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </span>
                    ) : (
                      <>
                        Continue with Meta
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#020617] mb-1">Official Meta Partner</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        We use official Meta APIs. Your data is protected and we never see your password.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#020617] mb-1">Bank-Level Security</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        All access tokens are encrypted and stored in isolated secure environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-100">
                    <CheckCircle2 className="text-white w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-green-900">Successfully Connected!</h3>
                    <p className="text-sm text-green-700">
                      Meta has authorized AdReach to manage **Kola's Kitchen** ads.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[13px] font-bold text-[#020617]">Select Facebook Page</label>
                  <div className="p-4 rounded-xl border-2 border-[#020617] bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/initials/svg?seed=KK" alt="Kola's Kitchen" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#020617]">Kola's Kitchen</p>
                        <p className="text-[11px] text-slate-500">Facebook Page • 2.4k Followers</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#020617] fill-current" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[13px] font-bold text-[#020617]">Select Instagram Account</label>
                  <div className="p-4 rounded-xl border-2 border-[#020617] bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/initials/svg?seed=IG" alt="Kola's Kitchen" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#020617]">@kolas_kitchen_ng</p>
                        <p className="text-[11px] text-slate-500">Instagram Professional • 1.2k Followers</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#020617] fill-current" />
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                   <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                   <p className="text-[11px] text-amber-800 leading-relaxed">
                     Don't see your page? Make sure you have **Admin access** to the Facebook Page and that it is linked to your Instagram Professional account.
                   </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100">
          <button className="text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Save & exit
          </button>
          <button 
            onClick={() => router.push("/onboarding/success")}
            disabled={!connected || loading}
            className="w-full sm:w-auto bg-[#111111] text-white px-10 py-4.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-[15px]"
          >
            Continue to Final Step
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
