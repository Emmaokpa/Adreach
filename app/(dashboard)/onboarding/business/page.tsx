"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Users, 
  ShoppingBag, 
  Target, 
  Zap, 
  MousePointer2, 
  Briefcase, 
  Megaphone, 
  ChevronLeft, 
  ChevronRight,
  MapPin
} from "lucide-react";
import { NIGERIAN_CITIES, INDUSTRIES } from "@/lib/constants/locations";

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const createBusiness = useMutation(api.businesses.createBusiness);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    city: "",
    goal: "leads", // leads, sales, visits, awareness
    targetCustomer: "",
    promotingType: "service" // service, product
  });

  const goals = [
    { id: "leads", title: "Get More Leads", desc: "Find people interested in your services and collect their contact info.", icon: <Users className="w-6 h-6" /> },
    { id: "sales", title: "Drive Sales", desc: "Send people to your website or WhatsApp to purchase products.", icon: <ShoppingBag className="w-6 h-6" /> },
    { id: "visits", title: "Store Visits", desc: "Encourage local customers to visit your physical shop or office.", icon: <MapPin className="w-6 h-6" /> },
    { id: "awareness", title: "Brand Awareness", desc: "Make your business name known to thousands of people in Nigeria.", icon: <Megaphone className="w-6 h-6" /> }
  ];

  const handleContinue = async () => {
    setLoading(true);
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      router.push("/onboarding/connect");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to landing
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
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Step 1 of 3</span>
               <div className="h-1 w-40 bg-slate-100 rounded-full relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-[#020617] rounded-full transition-all duration-700" />
               </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Business Profile</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-[#020617] mb-2 tracking-tight">Build your business profile</h1>
            <p className="text-slate-500 text-[15px] mb-12">
              Help our AI understand your business so we can generate high-converting ad assets for you.
            </p>

            <div className="space-y-10">
              {/* Row 1: Name & Industry */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-[#020617]">Business Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kola's Kitchen"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm focus:border-slate-400 outline-none transition-all placeholder:text-slate-300"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-3 relative">
                  <label className="text-[13px] font-bold text-[#020617]">Industry</label>
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm focus:border-slate-400 outline-none transition-all appearance-none"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 2: City */}
              <div className="space-y-3 relative">
                <label className="text-[13px] font-bold text-[#020617]">Primary Business City</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm focus:border-slate-400 outline-none transition-all appearance-none"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option value="">Search or select a Nigerian city</option>
                  {NIGERIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-4 bottom-4 pointer-events-none text-slate-400">
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <p className="text-[11px] text-slate-400">Where your target customers are mainly located.</p>
              </div>

              {/* Row 3: Goal Grid */}
              <div className="space-y-6">
                <label className="text-[13px] font-bold text-[#020617]">What is your main advertising goal?</label>
                <div className="grid sm:grid-cols-2 gap-5">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setFormData({...formData, goal: goal.id})}
                      className={`text-left p-6 rounded-2xl border-2 transition-all relative group ${
                        formData.goal === goal.id 
                        ? "border-[#020617] bg-slate-50/50" 
                        : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      {formData.goal === goal.id && (
                        <div className="absolute top-4 right-4 text-[#020617]">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                           </svg>
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                        formData.goal === goal.id ? "bg-[#020617] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}>
                        {goal.icon}
                      </div>
                      <h4 className="font-bold text-sm mb-1.5 text-[#020617]">{goal.title}</h4>
                      <p className="text-[11.5px] text-slate-500 leading-relaxed font-medium">{goal.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Target Customer */}
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#020617]">Describe your ideal customer</label>
                <textarea 
                  rows={4}
                  placeholder="e.g. Young professionals in Lagos aged 25-40 interested in healthy lifestyle and organic food..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm focus:border-slate-400 outline-none transition-all resize-none placeholder:text-slate-300"
                  value={formData.targetCustomer}
                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                />
                <p className="text-[11px] text-slate-400">The more detailed you are, the better our AI can target your ads.</p>
              </div>

              {/* Row 5: Promotion Type */}
              <div className="space-y-6">
                <label className="text-[13px] font-bold text-[#020617]">What are you primarily promoting?</label>
                <div className="inline-flex p-1.5 bg-slate-100 rounded-xl">
                  <button 
                    onClick={() => setFormData({...formData, promotingType: "service"})}
                    className={`px-10 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                      formData.promotingType === "service" 
                      ? "bg-white text-[#020617] shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Service
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, promotingType: "product"})}
                    className={`px-10 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                      formData.promotingType === "product" 
                      ? "bg-white text-[#020617] shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100">
          <button className="text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Save & exit
          </button>
          <button 
            onClick={handleContinue}
            disabled={loading || !formData.businessName || !formData.industry || !formData.city}
            className="w-full sm:w-auto bg-[#111111] text-white px-10 py-4.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-[15px]"
          >
            {loading ? "Saving..." : "Continue to Step 2"}
            {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </motion.div>

      <div className="mt-12 text-center text-[13px] text-slate-400">
        Already have an account? <button onClick={() => router.push("/sign-in")} className="text-[#020617] font-bold hover:underline ml-1">Sign in instead</button>
      </div>
    </div>
  );
}
