import React from "react";
import {
  LayoutDashboard,
  Trash2,
  Truck,
  BarChart3,
  BookOpen,
  AlertTriangle,
  Sparkles,
  TreePine,
  ChevronRight,
  X
} from "lucide-react";
import { SIDEBAR } from "@/constants/testIds";

const navItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    testId: SIDEBAR.navOverview,
    badge: null,
  },
  {
    id: "bins",
    label: "Smart Bins",
    icon: Trash2,
    testId: SIDEBAR.navBins,
    badge: "142 Live",
  },
  {
    id: "schedules",
    label: "Collection Routes",
    icon: Truck,
    testId: SIDEBAR.navSchedules,
    badge: "3 Active",
  },
  {
    id: "analytics",
    label: "Recycling & Stats",
    icon: BarChart3,
    testId: SIDEBAR.navAnalytics,
    badge: null,
  },
  {
    id: "education",
    label: "Education Hub",
    icon: BookOpen,
    testId: SIDEBAR.navEducation,
    badge: "Quiz",
  },
  {
    id: "alerts",
    label: "Alerts Center",
    icon: AlertTriangle,
    testId: SIDEBAR.navAlerts,
    badge: "alertsCount",
  },
];

const Sidebar = ({
  activeTab,
  setActiveTab,
  unreadAlertsCount = 0,
  setIsChatOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        data-testid={SIDEBAR.container}
        className={`fixed md:sticky top-0 left-0 z-40 md:z-20 h-screen w-64 md:w-60 lg:w-64 bg-white border-r border-[#2C3E50]/10 flex flex-col justify-between py-6 px-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header & Navigation Links */}
        <div className="space-y-6">
          {/* Mobile close button */}
          <div className="flex items-center justify-between md:hidden px-2 pb-2 border-b border-[#2C3E50]/10">
            <span className="font-heading font-bold text-lg text-[#2C3E50]">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-[#2C3E50]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2E5A44]">
              Navigation
            </p>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const badgeContent =
                item.badge === "alertsCount"
                  ? unreadAlertsCount > 0
                    ? unreadAlertsCount
                    : null
                  : item.badge;

              return (
                <button
                  key={item.id}
                  data-testid={item.testId}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#2E5A44] text-white shadow-sm shadow-[#2E5A44]/20"
                      : "text-[#2C3E50]/80 hover:bg-[#F1F8F4] hover:text-[#2E5A44]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#2C3E50]/60"}`} />
                    <span>{item.label}</span>
                  </div>

                  {badgeContent && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.id === "alerts" && unreadAlertsCount > 0
                          ? "bg-[#C0392B] text-white"
                          : "bg-[#2E5A44]/10 text-[#2E5A44]"
                      }`}
                    >
                      {badgeContent}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sustainability Impact Card & AI Assistant Trigger */}
        <div className="space-y-3 pt-4 border-t border-[#2C3E50]/10">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2E5A44]/10 via-[#2E5A44]/5 to-transparent border border-[#2E5A44]/20">
            <div className="flex items-center gap-2 text-[#2E5A44] mb-1.5">
              <TreePine className="w-4 h-4 text-[#2E5A44]" />
              <span className="text-xs font-bold uppercase tracking-wider">Green Impact</span>
            </div>
            <p className="text-xl font-heading font-extrabold text-[#2C3E50]">
              14.8 <span className="text-xs font-normal text-[#2C3E50]/70">Tons CO₂</span>
            </p>
            <p className="text-[11px] text-[#2C3E50]/70 mt-0.5">
              Diverted from landfills this month through IoT smart routing.
            </p>
          </div>

          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#2C3E50] text-white hover:bg-[#1A252F] transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">AI Assistant</p>
                <p className="text-[10px] text-slate-300">Instant sorting advice</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
