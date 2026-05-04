import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "bg-slate-900 border border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "bg-slate-800 border-white/5 text-white hover:bg-slate-700",
            socialButtonsBlockButtonText: "text-white",
            dividerLine: "bg-white/10",
            dividerText: "text-slate-500",
            formFieldLabel: "text-slate-300",
            formFieldInput: "bg-slate-800 border-white/10 text-white",
            footerActionText: "text-slate-400",
            footerActionLink: "text-primary hover:text-primary/80"
          }
        }}
      />
    </div>
  );
}
