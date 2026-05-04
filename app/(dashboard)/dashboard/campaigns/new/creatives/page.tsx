"use client";

import React, { useState } from "react";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Layers, 
  X, 
  CheckCircle2, 
  Plus,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CampaignCreativesPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"upload" | "ai" | "catalog">("upload");
  const [files, setFiles] = useState<{ id: string; name: string; size: string; preview: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        preview: URL.createObjectURL(file)
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#020617] transition-all mb-2 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-[#020617] tracking-tight">Campaign Creatives</h1>
          <p className="text-slate-500 text-[15px]">Upload your assets or let our AI generate high-converting visuals for you.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Step 2 of 4</span>
              <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-1/2 bg-[#020617] rounded-full" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Options Column */}
        <div className="space-y-4">
          {[
            { id: "upload", label: "Upload Your Own", desc: "Use your own images or videos.", icon: <Upload className="w-5 h-5" /> },
            { id: "ai", label: "AI Generated", desc: "Let AI create visuals for you.", icon: <Sparkles className="w-5 h-5" /> },
            { id: "catalog", label: "From Catalog", desc: "Use products from your store.", icon: <Layers className="w-5 h-5" /> },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id as any)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border-2 transition-all relative group",
                selectedOption === option.id 
                  ? "border-[#020617] bg-white shadow-lg shadow-slate-100" 
                  : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-200"
              )}
            >
              <div className="flex gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  selectedOption === option.id ? "bg-[#020617] text-white" : "bg-white text-slate-400 group-hover:text-[#020617]"
                )}>
                  {option.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#020617] mb-0.5">{option.label}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{option.desc}</p>
                </div>
              </div>
              {selectedOption === option.id && (
                <div className="absolute top-5 right-5 text-[#020617]">
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Interface Column */}
        <div className="lg:col-span-2 space-y-6">
          {selectedOption === "upload" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] border border-slate-200 p-8 space-y-8"
            >
              {/* Upload Area */}
              <div className="relative group">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-200 rounded-[1.5rem] p-12 text-center group-hover:border-[#020617] group-hover:bg-slate-50 transition-all">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-all">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#020617]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#020617]">Drop files here or click to upload</h3>
                  <p className="text-sm text-slate-500 mt-2">Supports JPG, PNG, MP4, MOV (Max 50MB per file)</p>
                </div>
              </div>

              {/* Requirements List */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                    <div>
                       <p className="text-[11px] font-bold text-[#020617]">Image Size</p>
                       <p className="text-[10px] text-slate-500">1080 x 1080px (1:1)</p>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <Video className="w-5 h-5 text-slate-400" />
                    <div>
                       <p className="text-[11px] font-bold text-[#020617]">Video Duration</p>
                       <p className="text-[10px] text-slate-500">Up to 60 seconds</p>
                    </div>
                 </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#020617]">Uploaded Assets ({files.length})</h4>
                    <button className="text-xs font-bold text-red-500 hover:underline" onClick={() => setFiles([])}>Clear all</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {files.map((file) => (
                      <motion.div 
                        layoutId={file.id}
                        key={file.id} 
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
                      >
                        <img src={file.preview} alt={file.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#020617]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                           <p className="text-[10px] font-bold text-white truncate w-full">{file.name}</p>
                           <button 
                             onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                             className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                           >
                             <X className="w-4 h-4" />
                           </button>
                        </div>
                      </motion.div>
                    ))}
                    <div className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#020617] hover:text-[#020617] cursor-pointer transition-all">
                       <Plus className="w-6 h-6" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Add more</span>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} multiple />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedOption === "ai" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-indigo-100">
                <Sparkles className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#020617]">AI Creative Studio</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm">
                  Our AI will generate high-performing ad variants based on your business profile and industry trends.
                </p>
              </div>
              <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Start AI Generation
              </button>
            </motion.div>
          )}

          {selectedOption === "catalog" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-amber-100">
                <Layers className="w-10 h-10 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#020617]">From Your Catalog</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm">
                  Launch dynamic ads using products from your uploaded catalog. Best for e-commerce.
                </p>
              </div>
              <button className="px-8 py-3.5 bg-[#020617] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-slate-100">
                Select from Catalog
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
         <button className="text-sm font-bold text-slate-500 hover:text-[#020617] transition-colors">
            Cancel campaign
         </button>
         <button 
           disabled={selectedOption === "upload" && files.length === 0}
           onClick={() => router.push("/dashboard/campaigns/new/audience")}
           className="px-10 py-4 bg-[#020617] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-slate-200"
         >
           Continue to Audience
           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}
