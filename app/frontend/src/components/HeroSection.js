import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Trash2, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf 
} from "lucide-react";
import { HERO } from "@/constants/testIds";

const HeroSection = ({ setActiveTab, setIsChatOpen }) => {
  return (
    <section 
      data-testid={HERO.container || "hero-section"}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#F1F8F4]/60 border border-[#2C3E50]/10 p-6 sm:p-10 lg:p-12 shadow-soft mb-8"
    >
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#2E5A44]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#2980B9]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left text & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5A44]/10 border border-[#2E5A44]/20 text-[#2E5A44] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#2E5A44]" />
            <span>Next-Gen Smart Waste Infrastructure</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2C3E50] leading-[1.15]">
            Cleaner Cities Powered by{" "}
            <span className="text-[#2E5A44] underline decoration-[#2E5A44]/30 underline-offset-8">
              IoT Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#2C3E50]/80 leading-relaxed max-w-xl">
            Real-time ultrasonic fill monitoring, dynamic collection route optimization, and AI-driven citizen recycling engagement to eliminate overflows and cut city emissions by up to 34%.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("bins")}
              className="pill-btn-primary px-6 py-3 text-sm flex items-center gap-2 shadow-md shadow-[#2E5A44]/20"
            >
              <Trash2 className="w-4 h-4" />
              <span>Monitor Live Bins</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab("schedules")}
              className="pill-btn-secondary px-5 py-3 text-sm flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#2980B9]" />
              <span>Route Dispatch</span>
            </button>

            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-sm font-semibold hover:bg-amber-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Ask Eco AI</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#2C3E50]/10 text-xs text-[#2C3E50]/70">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Sensor Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#2980B9]" />
              <span>Zero-Overflow Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right visual card with curated hero image & live overlay telemetry (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-[#2C3E50]/15 group">
            <img
              src="https://images.unsplash.com/photo-1609069258650-fd58e4c7b278?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxjbGVhbiUyMGdyZWVuJTIwbW9kZXJuJTIwY2l0eSUyMHN0cmVldHxlbnwwfHx8fDE3ODM3ODM1MjB8MA&ixlib=rb-4.1.0&q=85"
              alt="Clean Modern City Street with IoT Waste Monitoring"
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A252F]/90 via-[#1A252F]/30 to-transparent" />

            {/* Telemetry Floating Widget on Hero Image */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#2C3E50] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Central Hub Telemetry
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  All Systems Optimal
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Active Bins</p>
                  <p className="text-base font-heading font-bold text-[#2C3E50]">142</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Diversion Rate</p>
                  <p className="text-base font-heading font-bold text-emerald-700">78.4%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Pickups Today</p>
                  <p className="text-base font-heading font-bold text-[#2980B9]">36 / 38</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
