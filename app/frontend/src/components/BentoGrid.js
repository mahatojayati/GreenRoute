import React from "react";
import {
  Trash2,
  Truck,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Zap,
  Leaf,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { BENTO } from "@/constants/testIds";

const BentoGrid = ({ 
  bins = [], 
  schedules = [], 
  setActiveTab, 
  setIsChatOpen,
  onOptimizeRoute
}) => {
  // Compute summary values
  const totalBins = bins.length || 142;
  const criticalBins = bins.filter((b) => b.fillLevel >= 85).length || 3;
  const avgFill = bins.length
    ? Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length)
    : 64;

  return (
    <div data-testid={BENTO.container || "bento-grid"} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2C3E50] tracking-tight">
            System Operations & Live Intelligence
          </h2>
          <p className="text-sm text-[#2C3E50]/70">
            Real-time telemetry across city waste sensors and active collection logistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#2E5A44] px-3 py-1 bg-[#2E5A44]/10 rounded-full">
            Live Stream Sync
          </span>
        </div>
      </div>

      {/* Bento Grid: 12 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6">
        
        {/* BENTO CARD 1: Real-Time Bin Capacity (4 Cols) */}
        <div className="lg:col-span-4 md:col-span-8 clean-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#2E5A44]/10 flex items-center justify-center text-[#2E5A44]">
                <Trash2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E5A44]">
                IoT Sensor Net
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#2C3E50]/60">Average Fill Level</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-4xl font-extrabold text-[#2C3E50]">
                  {avgFill}%
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Nominal
                </span>
              </div>
            </div>

            {/* Progress bar visual */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-emerald-500 via-[#2E5A44] to-[#E67E22]"
                  style={{ width: `${avgFill}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#2C3E50]/60">
                <span>0% Empty</span>
                <span>{totalBins} Monitored</span>
                <span>100% Full</span>
              </div>
            </div>

            {/* Critical alert snippet */}
            {criticalBins > 0 ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/70 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#E67E22]">
                    {criticalBins} Bins Over 85% Capacity
                  </p>
                  <p className="text-[#2C3E50]/70 mt-0.5">
                    Automated pickup dispatch suggested for North Sector.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>All IoT bins within safe operating limits.</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab("bins")}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#F1F8F4] text-[#2E5A44] hover:bg-[#2E5A44] hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5 group-hover:shadow-sm"
          >
            <span>View All {totalBins} Smart Bins</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* BENTO CARD 2: Smart Collection Logistics & Route Optimization (8 Cols) */}
        <div className="lg:col-span-8 md:col-span-8 clean-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2980B9]/10 flex items-center justify-center text-[#2980B9]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                    Dynamic Fleet Routing Engine
                  </h3>
                  <p className="text-xs text-[#2C3E50]/60">
                    AI-powered TSP algorithm to minimize fuel, distance & transit time
                  </p>
                </div>
              </div>

              <button
                onClick={onOptimizeRoute}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2980B9] text-white text-xs font-semibold hover:bg-[#1f6696] transition-all shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Re-Optimize Active Routes</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#2C3E50]/5">
                <span className="text-[11px] font-bold text-[#2C3E50]/60 uppercase tracking-wider">
                  Active Dispatch Routes
                </span>
                <p className="font-heading text-2xl font-bold text-[#2C3E50] mt-1">
                  3 <span className="text-xs font-normal text-[#2C3E50]/60">Vehicles En Route</span>
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ 94.8% On-Time SLA
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#2C3E50]/5">
                <span className="text-[11px] font-bold text-[#2C3E50]/60 uppercase tracking-wider">
                  Fuel Conserved
                </span>
                <p className="font-heading text-2xl font-bold text-[#2E5A44] mt-1">
                  -42.6 L <span className="text-xs font-normal text-[#2C3E50]/60">Today</span>
                </p>
                <p className="text-[11px] text-[#2E5A44] font-medium mt-0.5">
                  18.4% route compression
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-[#2C3E50]/5">
                <span className="text-[11px] font-bold text-[#2C3E50]/60 uppercase tracking-wider">
                  Est. Completion
                </span>
                <p className="font-heading text-2xl font-bold text-[#2980B9] mt-1">
                  16:45 <span className="text-xs font-normal text-[#2C3E50]/60">PM</span>
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  38 of 42 pickups cleared
                </p>
              </div>
            </div>

            {/* Live Route Preview Pill */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <span className="font-bold text-[#2C3E50]">Route #GR-04:</span>
                  <span className="text-[#2C3E50]/70 ml-1.5">
                    Downtown Commercial District → Recycling Depot 2
                  </span>
                </div>
              </div>
              <span className="font-semibold text-[#2980B9] hidden sm:inline">
                Driver: Alex Rivera (EV Truck 02)
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 pt-2 border-t border-[#2C3E50]/5">
            <button
              onClick={() => setActiveTab("schedules")}
              className="text-xs font-bold text-[#2980B9] hover:text-[#1f6696] flex items-center gap-1"
            >
              <span>Manage Schedules & Vehicle Dispatch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BENTO CARD 3: Material Breakdown & Environmental Impact (7 Cols) */}
        <div className="lg:col-span-7 md:col-span-8 clean-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                  Material Segregation & Diversion
                </h3>
                <p className="text-xs text-[#2C3E50]/60">
                  Municipal recycling efficacy and diversion from landfill
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("analytics")}
              className="text-xs font-bold text-[#2E5A44] hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Breakdown Bars */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Organic & Compostable
                </span>
                <span className="text-[#2C3E50]">42.5 Tons (42%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-[#2980B9]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2980B9]"></span>
                  Recyclables (Plastics, Metals, Paper)
                </span>
                <span className="text-[#2C3E50]">36.4 Tons (36%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#2980B9] rounded-full" style={{ width: '36%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-[#E67E22]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E67E22]"></span>
                  Hazardous & Electronic Waste
                </span>
                <span className="text-[#2C3E50]">6.1 Tons (6%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#E67E22] rounded-full" style={{ width: '6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  General Non-Recyclable Landfill
                </span>
                <span className="text-[#2C3E50]">15.0 Tons (16%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* BENTO CARD 4: Community Engagement & AI Assistant (5 Cols) */}
        <div className="lg:col-span-5 md:col-span-8 clean-card p-6 flex flex-col justify-between space-y-4 bg-gradient-to-br from-white via-white to-amber-50/40">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Citizen Hub
              </span>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                Recycling Intelligence & Quiz
              </h3>
              <p className="text-xs text-[#2C3E50]/70 mt-1">
                Empower citizens with quick waste identification, proper bin sorting rules, and rewards.
              </p>
            </div>

            {/* Quick AI sample prompt */}
            <div className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Tip of the Day:</span>
              </div>
              <p className="text-xs text-[#2C3E50]/80 italic">
                "Greasy pizza boxes cannot be recycled in the paper bin! Tear off the clean top lid for paper recycling and put the oily base in compost."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab("education")}
              className="flex-1 py-2.5 px-3 rounded-full bg-[#2E5A44] text-white hover:bg-[#264A38] text-xs font-semibold transition-all text-center"
            >
              Take Sorting Quiz
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="py-2.5 px-4 rounded-full bg-white border border-[#2C3E50]/15 text-[#2C3E50] hover:bg-[#F8F9FA] text-xs font-semibold transition-all"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BentoGrid;
