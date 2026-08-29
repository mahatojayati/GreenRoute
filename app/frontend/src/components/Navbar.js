import React from "react";
import { 
  Leaf, 
  Bell, 
  MessageSquare, 
  PlusCircle, 
  Menu, 
  Radio, 
  Sparkles 
} from "lucide-react";
import { NAVBAR } from "@/constants/testIds";

const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  unreadAlertsCount = 0, 
  setIsChatOpen, 
  setIsAddBinOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <header 
      data-testid={NAVBAR.container}
      className="sticky top-0 z-30 w-full border-b border-[#2C3E50]/10 glass-header px-4 sm:px-8 py-3.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#2C3E50] hover:bg-[#2E5A44]/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button 
            data-testid={NAVBAR.logo}
            onClick={() => setActiveTab("overview")}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2E5A44] flex items-center justify-center text-white shadow-md shadow-[#2E5A44]/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-tight text-[#2C3E50]">
                  GreenRoute
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-bold uppercase tracking-wider">
                  IoT v2.4
                </span>
              </div>
              <p className="text-xs text-[#2C3E50]/60 hidden sm:block">
                Smart Waste & Resource Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* Center: System Status Pill (Desktop) */}
        <div 
          data-testid={NAVBAR.statusBadge}
          className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-[#2E5A44]/5 border border-[#2E5A44]/15 text-xs text-[#2C3E50]"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-[#2E5A44]">Fleet Operational</span>
          </div>
          <span className="text-[#2C3E50]/20">|</span>
          <span className="text-[#2C3E50]/70 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-[#2980B9]" />
            142 Connected Bins
          </span>
          <span className="text-[#2C3E50]/20">|</span>
          <span className="text-emerald-700 font-semibold">
            78.4% Diversion Rate
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Bin CTA */}
          <button
            data-testid={NAVBAR.quickAddBin}
            onClick={() => {
              setActiveTab("bins");
              if (setIsAddBinOpen) setIsAddBinOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] hover:bg-[#2E5A44] hover:text-white transition-all text-xs font-semibold"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Smart Bin</span>
          </button>

          {/* AI Waste Assistant */}
          <button
            data-testid={NAVBAR.chatToggle}
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#2E5A44] text-white hover:bg-[#264A38] text-xs font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
            title="Open AI Waste Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Eco AI</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Alerts Notification Button */}
          <button
            data-testid={NAVBAR.alertsToggle}
            onClick={() => setActiveTab("alerts")}
            className={`relative p-2.5 rounded-full border transition-all ${
              activeTab === "alerts"
                ? "bg-[#2E5A44] text-white border-[#2E5A44]"
                : "bg-white text-[#2C3E50] border-[#2C3E50]/15 hover:bg-[#F8F9FA] hover:text-[#2E5A44]"
            }`}
            aria-label="View system alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C0392B] px-1 text-[10px] font-bold text-white shadow-sm">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
