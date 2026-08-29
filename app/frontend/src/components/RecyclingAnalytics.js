import React, { useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Download,
  Leaf,
  Award,
  Calendar,
  Sparkles,
  TreePine,
  Layers
} from "lucide-react";
import { toast } from "sonner";
import { ANALYTICS } from "@/constants/testIds";

const weeklyVolumeData = [
  { day: "Mon", organic: 8.4, recyclable: 7.2, hazardous: 1.1, landfill: 3.5 },
  { day: "Tue", organic: 9.1, recyclable: 7.8, hazardous: 0.9, landfill: 3.2 },
  { day: "Wed", organic: 8.8, recyclable: 8.1, hazardous: 1.4, landfill: 2.9 },
  { day: "Thu", organic: 9.6, recyclable: 8.5, hazardous: 1.2, landfill: 3.1 },
  { day: "Fri", organic: 10.4, recyclable: 9.3, hazardous: 1.6, landfill: 3.8 },
  { day: "Sat", organic: 11.2, recyclable: 10.1, hazardous: 1.8, landfill: 4.2 },
  { day: "Sun", organic: 7.9, recyclable: 6.8, hazardous: 0.8, landfill: 2.6 },
];

const materialBreakdown = [
  { name: "Organic Compost", value: 42, color: "#2E5A44" },
  { name: "Plastics & Paper", value: 36, color: "#2980B9" },
  { name: "Hazardous & E-Waste", value: 6, color: "#E67E22" },
  { name: "Landfill Residual", value: 16, color: "#95A5A6" },
];

const monthlyCO2Data = [
  { month: "Jan", co2Saved: 11.2, target: 10.0 },
  { month: "Feb", co2Saved: 12.4, target: 11.0 },
  { month: "Mar", co2Saved: 13.1, target: 11.5 },
  { month: "Apr", co2Saved: 14.8, target: 12.0 },
  { month: "May", co2Saved: 15.6, target: 13.0 },
  { month: "Jun", co2Saved: 16.9, target: 14.0 },
];

const RecyclingAnalytics = () => {
  const [timeRange, setTimeRange] = useState("Weekly");

  const handleExportData = () => {
    toast.success("Municipal Sustainability Report Exported!", {
      description: "Downloaded GreenRoute_Q3_Recycling_Analytics.csv with full IoT sensor telemetry.",
    });
  };

  return (
    <div data-testid={ANALYTICS.container} className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold text-[#2C3E50] tracking-tight">
              Recycling Analytics & Carbon Impact
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              Net Zero Metrics
            </span>
          </div>
          <p className="text-sm text-[#2C3E50]/70 mt-1">
            Audited municipal waste recovery, circular diversion, and greenhouse gas offset tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-full bg-white border border-[#2C3E50]/15 text-[#2C3E50] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40"
          >
            <option value="Daily">Daily Telemetry</option>
            <option value="Weekly">Weekly Digest</option>
            <option value="Monthly">Monthly Aggregate</option>
          </select>

          <button
            data-testid={ANALYTICS.exportBtn}
            onClick={handleExportData}
            className="pill-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div data-testid={ANALYTICS.diversionRateMetric} className="clean-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#2C3E50]/70 font-semibold">
            <span>Landfill Diversion Rate</span>
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Leaf className="w-4 h-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-extrabold text-[#2E5A44]">78.4%</p>
          <p className="text-[11px] text-emerald-700 font-medium">
            ↑ 4.2% above national municipality average
          </p>
        </div>

        <div data-testid={ANALYTICS.co2SavedMetric} className="clean-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#2C3E50]/70 font-semibold">
            <span>CO₂ Offset This Month</span>
            <span className="p-1.5 rounded-lg bg-blue-100 text-[#2980B9]">
              <TreePine className="w-4 h-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-extrabold text-[#2980B9]">16.9 Tons</p>
          <p className="text-[11px] text-[#2980B9] font-medium">
            Equivalent to planting 420 urban trees
          </p>
        </div>

        <div className="clean-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#2C3E50]/70 font-semibold">
            <span>Total Recycled Volume</span>
            <span className="p-1.5 rounded-lg bg-amber-100 text-[#E67E22]">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-extrabold text-[#E67E22]">65.4 Tons</p>
          <p className="text-[11px] text-[#E67E22] font-medium">
            Processed across 4 regional sorting facilities
          </p>
        </div>

        <div className="clean-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#2C3E50]/70 font-semibold">
            <span>Contamination Rate</span>
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-extrabold text-[#2C3E50]">3.8%</p>
          <p className="text-[11px] text-emerald-700 font-medium">
            ↓ 1.4% improvement via citizen education
          </p>
        </div>
      </div>

      {/* Primary Analytics Charts (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Weekly Waste Stream Volume Area Chart (7 Cols) */}
        <div data-testid={ANALYTICS.volumeChart} className="lg:col-span-7 clean-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                Daily Waste Stream Volumes (Tons)
              </h3>
              <p className="text-xs text-[#2C3E50]/60">
                Aggregated daily collection metrics across waste categories
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="organicColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E5A44" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2E5A44" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="recycColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2980B9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2980B9" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C3E50" strokeOpacity={0.07} />
                <XAxis dataKey="day" stroke="#2C3E50" strokeOpacity={0.6} tick={{ fontSize: 12 }} />
                <YAxis stroke="#2C3E50" strokeOpacity={0.6} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(44, 62, 80, 0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="organic" name="Organic" stroke="#2E5A44" fillOpacity={1} fill="url(#organicColor)" />
                <Area type="monotone" dataKey="recyclable" name="Recyclable" stroke="#2980B9" fillOpacity={1} fill="url(#recycColor)" />
                <Area type="monotone" dataKey="landfill" name="Landfill" stroke="#95A5A6" fillOpacity={0.3} fill="#95A5A6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Material Segregation Donut Breakdown (5 Cols) */}
        <div data-testid={ANALYTICS.breakdownChart} className="lg:col-span-5 clean-card p-6 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
              Material Segregation Split
            </h3>
            <p className="text-xs text-[#2C3E50]/60">
              Distribution of incoming municipal tonnage
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {materialBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(44, 62, 80, 0.1)' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            {materialBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[#2C3E50]/80 truncate">{item.name}</span>
                <span className="font-bold text-[#2C3E50] ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar: Monthly CO2 Savings vs Target */}
      <div className="clean-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
              Monthly Carbon Avoidance vs. Target (Tons CO₂)
            </h3>
            <p className="text-xs text-[#2C3E50]/60">
              Track progress toward the municipal Net Zero 2030 climate action goal
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            +20.7% Ahead of Target
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCO2Data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C3E50" strokeOpacity={0.07} />
              <XAxis dataKey="month" stroke="#2C3E50" strokeOpacity={0.6} tick={{ fontSize: 12 }} />
              <YAxis stroke="#2C3E50" strokeOpacity={0.6} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(44, 62, 80, 0.1)' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="co2Saved" name="CO₂ Offset (Tons)" fill="#2E5A44" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" name="Municipal Target" fill="#2980B9" radius={[6, 6, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RecyclingAnalytics;
