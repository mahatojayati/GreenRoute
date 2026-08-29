import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import BinsManager from "@/components/BinsManager";
import CollectionScheduler from "@/components/CollectionScheduler";
import RecyclingAnalytics from "@/components/RecyclingAnalytics";
import EducationHub from "@/components/EducationHub";
import SupportChatDrawer from "@/components/SupportChatDrawer";
import AlertsManager from "@/components/AlertsManager";
import { HOME } from "@/constants/testIds";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const defaultBins = [
  {
    id: "bin-1",
    code: "BIN-101",
    location: "Market Square & 4th Street",
    sector: "Central Commercial",
    type: "Organic",
    capacity: 360,
    fillLevel: 58,
    battery: 92,
    lastEmptied: "2 hours ago",
    status: "Operational",
    sensorHealth: "Active",
  },
  {
    id: "bin-2",
    code: "BIN-104",
    location: "120 Market Street Plaza",
    sector: "Central Commercial",
    type: "Recyclable",
    capacity: 240,
    fillLevel: 94,
    battery: 88,
    lastEmptied: "Yesterday",
    status: "Critical",
    sensorHealth: "Active",
  },
  {
    id: "bin-3",
    code: "BIN-201",
    location: "Greenway Park - Main Entrance",
    sector: "North Sector",
    type: "Recyclable",
    capacity: 240,
    fillLevel: 42,
    battery: 98,
    lastEmptied: "5 hours ago",
    status: "Operational",
    sensorHealth: "Active",
  },
  {
    id: "bin-4",
    code: "BIN-205",
    location: "North High School Campus",
    sector: "North Sector",
    type: "General",
    capacity: 660,
    fillLevel: 76,
    battery: 34,
    lastEmptied: "3 hours ago",
    status: "Warning",
    sensorHealth: "Active",
  },
  {
    id: "bin-5",
    code: "BIN-302",
    location: "Tech District Innovation Hub",
    sector: "Industrial Park",
    type: "Hazardous",
    capacity: 120,
    fillLevel: 30,
    battery: 85,
    lastEmptied: "1 day ago",
    status: "Operational",
    sensorHealth: "Active",
  },
  {
    id: "bin-6",
    code: "BIN-305",
    location: "Metro Rail Station Concourse",
    sector: "Central Commercial",
    type: "Recyclable",
    capacity: 480,
    fillLevel: 88,
    battery: 91,
    lastEmptied: "4 hours ago",
    status: "Critical",
    sensorHealth: "Active",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bins, setBins] = useState(defaultBins);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddBinModalOpen, setIsAddBinModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(2);

  // Attempt to sync bins with backend if available
  useEffect(() => {
    const fetchBackendBins = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/bins`, { timeout: 2500 });
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBins(res.data);
        }
      } catch (e) {
        // Fallback to rich default state silently
      }
    };
    fetchBackendBins();
  }, []);

  const handleUpdateBin = (binId, updates) => {
    setBins((prev) =>
      prev.map((b) => (b.id === binId ? { ...b, ...updates } : b))
    );
  };

  const handleAddBin = (newBin) => {
    setBins((prev) => [newBin, ...prev]);
  };

  const handleRequestPickup = (bin) => {
    toast.success(`Priority collection route dispatched for ${bin.code}!`, {
      description: `Truck en route to ${bin.location}. Fill: ${bin.fillLevel}%.`,
    });
  };

  const handleOptimizeRoutes = () => {
    toast.success("AI Route Planner active: Real-time sensor waypoints optimized!");
  };

  return (
    <div data-testid={HOME.container} className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadAlertsCount={unreadAlertsCount}
        setIsChatOpen={setIsChatOpen}
        setIsAddBinOpen={setIsAddBinModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Workspace Layout (Sidebar + Content Stream) */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Persistent Desktop / Responsive Mobile Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadAlertsCount={unreadAlertsCount}
          setIsChatOpen={setIsChatOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Main Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {/* Tab 1: System Overview (Hero + Bento Grid) */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <HeroSection
                setActiveTab={setActiveTab}
                setIsChatOpen={setIsChatOpen}
              />
              <BentoGrid
                bins={bins}
                setActiveTab={setActiveTab}
                setIsChatOpen={setIsChatOpen}
                onOptimizeRoute={handleOptimizeRoutes}
              />
            </div>
          )}

          {/* Tab 2: Smart IoT Bins Manager */}
          {activeTab === "bins" && (
            <div className="animate-fade-in">
              <BinsManager
                bins={bins}
                onUpdateBin={handleUpdateBin}
                onAddBin={handleAddBin}
                onRequestPickup={handleRequestPickup}
                isAddBinModalOpen={isAddBinModalOpen}
                setIsAddBinModalOpen={setIsAddBinModalOpen}
              />
            </div>
          )}

          {/* Tab 3: Collection Routes & Fleet Scheduler */}
          {activeTab === "schedules" && (
            <div className="animate-fade-in">
              <CollectionScheduler onOptimizeRoute={handleOptimizeRoutes} />
            </div>
          )}

          {/* Tab 4: Recycling Analytics & Net Zero Reports */}
          {activeTab === "analytics" && (
            <div className="animate-fade-in">
              <RecyclingAnalytics />
            </div>
          )}

          {/* Tab 5: Citizen Sustainability Education Hub */}
          {activeTab === "education" && (
            <div className="animate-fade-in">
              <EducationHub setIsChatOpen={setIsChatOpen} />
            </div>
          )}

          {/* Tab 6: Alerts & Incident Center */}
          {activeTab === "alerts" && (
            <div className="animate-fade-in">
              <AlertsManager setActiveTab={setActiveTab} />
            </div>
          )}

          {/* Footer Bar */}
          <footer className="mt-12 pt-6 border-t border-[#2C3E50]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#2C3E50]/60 gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2E5A44]">GreenRoute</span>
              <span>• Smart Municipal Waste Management IoT System</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                data-testid={HOME.emergentLink}
                href="https://emergent.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2E5A44] hover:underline font-semibold"
              >
                Built on Emergent
              </a>
              <span>•</span>
              <span>ISO 14001 Compliant</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Support Chat Drawer */}
      <SupportChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        apiBaseUrl={BACKEND_URL}
      />
    </div>
  );
}

export default App;
