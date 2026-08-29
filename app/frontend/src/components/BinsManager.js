import React, { useState } from "react";
import {
  Trash2,
  Search,
  Plus,
  Battery,
  BatteryCharging,
  Clock,
  MapPin,
  RefreshCw,
  Truck,
  Sparkles,
  AlertTriangle,
  X
} from "lucide-react";
import { toast } from "sonner";
import { BINS } from "@/constants/testIds";

const typeColors = {
  Organic: {
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    fillColor: "from-emerald-500 to-emerald-600",
    badge: "bg-emerald-100 text-emerald-800",
  },
  Recyclable: {
    bg: "bg-blue-50 text-[#2980B9] border-blue-200",
    fillColor: "from-blue-500 to-[#2980B9]",
    badge: "bg-blue-100 text-[#2980B9]",
  },
  Hazardous: {
    bg: "bg-amber-50 text-[#E67E22] border-amber-200",
    fillColor: "from-amber-500 to-[#E67E22]",
    badge: "bg-amber-100 text-[#E67E22]",
  },
  General: {
    bg: "bg-slate-50 text-slate-700 border-slate-200",
    fillColor: "from-slate-500 to-slate-700",
    badge: "bg-slate-200 text-slate-800",
  },
};

const BinsManager = ({
  bins = [],
  onUpdateBin,
  onAddBin,
  onRequestPickup,
  isAddBinModalOpen,
  setIsAddBinModalOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Add Bin Modal State
  const [newBin, setNewBin] = useState({
    code: `BIN-${Math.floor(100 + Math.random() * 900)}`,
    location: "",
    sector: "North Sector",
    type: "Recyclable",
    capacity: 240,
    fillLevel: 25,
    battery: 95,
  });

  const filteredBins = bins.filter((bin) => {
    const matchesSearch =
      bin.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.sector?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "All" || bin.type === selectedType;

    let matchesStatus = true;
    if (selectedStatus === "Critical") matchesStatus = bin.fillLevel >= 85;
    else if (selectedStatus === "Warning") matchesStatus = bin.fillLevel >= 60 && bin.fillLevel < 85;
    else if (selectedStatus === "Normal") matchesStatus = bin.fillLevel < 60;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSimulateFill = (binId) => {
    const bin = bins.find((b) => b.id === binId);
    if (!bin) return;

    const newLevel = Math.min(100, bin.fillLevel + 15);
    onUpdateBin(binId, { fillLevel: newLevel });

    if (newLevel >= 85) {
      toast.error(`⚠️ Alert: ${bin.code} at ${bin.location} is at ${newLevel}% capacity!`, {
        description: "Collection pickup recommended immediately.",
      });
    } else {
      toast.info(`Simulated fill sensor for ${bin.code}: ${newLevel}%`);
    }
  };

  const handleEmptyBin = (binId) => {
    const bin = bins.find((b) => b.id === binId);
    if (!bin) return;

    onUpdateBin(binId, { 
      fillLevel: 5, 
      lastEmptied: "Just now",
      status: "Operational" 
    });
    toast.success(`Bin ${bin.code} marked as emptied and sanitized!`);
  };

  const handleCreateBinSubmit = (e) => {
    e.preventDefault();
    if (!newBin.location.trim()) {
      toast.error("Please enter a location description");
      return;
    }

    const created = {
      id: `bin-${Date.now()}`,
      ...newBin,
      lastEmptied: "Just created",
      status: "Operational",
      sensorHealth: "Good",
    };

    onAddBin(created);
    setIsAddBinModalOpen(false);
    toast.success(`New Smart Bin ${created.code} registered to IoT network!`);

    // Reset form
    setNewBin({
      code: `BIN-${Math.floor(100 + Math.random() * 900)}`,
      location: "",
      sector: "North Sector",
      type: "Recyclable",
      capacity: 240,
      fillLevel: 10,
      battery: 100,
    });
  };

  return (
    <div data-testid={BINS.container} className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold text-[#2C3E50] tracking-tight">
              Smart IoT Waste Bins
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-bold text-xs">
              {bins.length} Active Nodes
            </span>
          </div>
          <p className="text-sm text-[#2C3E50]/70 mt-1">
            Real-time ultrasonic capacity sensing, battery telemetry, and automated pickup dispatch.
          </p>
        </div>

        {/* Add Bin Button */}
        <button
          data-testid={BINS.addBinBtn}
          onClick={() => setIsAddBinModalOpen(true)}
          className="pill-btn-primary px-5 py-2.5 text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Smart Bin</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="clean-card p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#2C3E50]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            data-testid={BINS.searchInput}
            type="text"
            placeholder="Search by code, street, or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-[#F8F9FA] border border-[#2C3E50]/15 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40 text-[#2C3E50]"
          />
        </div>

        {/* Type & Status Selectors */}
        <div className="flex items-center gap-2">
          <select
            data-testid={BINS.filterType}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs rounded-full bg-[#F8F9FA] border border-[#2C3E50]/15 text-[#2C3E50] font-medium focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40"
          >
            <option value="All">All Waste Types</option>
            <option value="Organic">Organic</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Hazardous">Hazardous</option>
            <option value="General">General</option>
          </select>

          <select
            data-testid={BINS.filterStatus}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-full bg-[#F8F9FA] border border-[#2C3E50]/15 text-[#2C3E50] font-medium focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40"
          >
            <option value="All">All Capacities</option>
            <option value="Normal">Normal (&lt;60%)</option>
            <option value="Warning">Warning (60-84%)</option>
            <option value="Critical">Critical (≥85%)</option>
          </select>
        </div>
      </div>

      {/* Smart Bins Grid */}
      {filteredBins.length === 0 ? (
        <div className="clean-card p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Trash2 className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-[#2C3E50]">No Smart Bins Found</h3>
          <p className="text-sm text-[#2C3E50]/60 max-w-sm mx-auto">
            Try adjusting your search query or reset the type/status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBins.map((bin) => {
            const isCritical = bin.fillLevel >= 85;
            const isWarning = bin.fillLevel >= 60 && bin.fillLevel < 85;
            const typeConfig = typeColors[bin.type] || typeColors.General;

            return (
              <div
                key={bin.id}
                data-testid={BINS.binCard}
                className={`clean-card p-5 flex flex-col justify-between border relative overflow-hidden transition-all ${
                  isCritical
                    ? "border-red-300 ring-1 ring-red-400/30 bg-red-50/20"
                    : isWarning
                    ? "border-amber-200"
                    : "border-[#2C3E50]/10"
                }`}
              >
                {/* Top Row: Bin Code, Type Badge & Battery */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-base text-[#2C3E50]">
                        {bin.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeConfig.badge}`}>
                        {bin.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#2C3E50]/70" title={`Battery: ${bin.battery}%`}>
                      {bin.battery > 30 ? (
                        <Battery className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <BatteryCharging className="w-4 h-4 text-amber-500 animate-pulse" />
                      )}
                      <span className="font-semibold">{bin.battery}%</span>
                    </div>
                  </div>

                  {/* Location & Sector */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#2C3E50] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#2E5A44] shrink-0" />
                      <span className="truncate">{bin.location}</span>
                    </div>
                    <p className="text-[11px] text-[#2C3E50]/60 pl-5">
                      Sector: {bin.sector} • {bin.capacity || 240}L Capacity
                    </p>
                  </div>

                  {/* Fill Level Gauge */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#2C3E50]/70">Ultrasonic Fill Level</span>
                      <span
                        className={`font-heading font-bold text-sm ${
                          isCritical
                            ? "text-[#C0392B]"
                            : isWarning
                            ? "text-[#E67E22]"
                            : "text-[#2E5A44]"
                        }`}
                      >
                        {bin.fillLevel}%
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                          isCritical
                            ? "from-red-500 to-[#C0392B]"
                            : isWarning
                            ? "from-amber-400 to-[#E67E22]"
                            : "from-emerald-500 to-[#2E5A44]"
                        }`}
                        style={{ width: `${bin.fillLevel}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#2C3E50]/50 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Emptied: {bin.lastEmptied || "3 hrs ago"}
                      </span>
                      <span>Sensor: {bin.sensorHealth || "Active"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Toolbar */}
                <div className="mt-4 pt-3 border-t border-[#2C3E50]/10 flex items-center justify-between gap-2">
                  <button
                    data-testid={BINS.simulateBtn}
                    onClick={() => handleSimulateFill(bin.id)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2C3E50] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    title="Simulate Waste Deposit (+15%)"
                  >
                    <RefreshCw className="w-3 h-3 text-[#2980B9]" />
                    <span>+15% Fill</span>
                  </button>

                  {isCritical ? (
                    <button
                      data-testid={BINS.requestPickupBtn}
                      onClick={() => {
                        onRequestPickup(bin);
                        toast.success(`Dispatch request queued for ${bin.code}!`);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-[#C0392B] hover:bg-red-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm animate-pulse-subtle"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Dispatch</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEmptyBin(bin.id)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-[#2E5A44]/10 hover:bg-[#2E5A44] text-[#2E5A44] hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Empty Bin</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Smart Bin Modal */}
      {isAddBinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#2C3E50]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#2E5A44]">
                <Trash2 className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                  Register IoT Smart Bin
                </h3>
              </div>
              <button
                onClick={() => setIsAddBinModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBinSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2C3E50] mb-1">Bin Identifier Code</label>
                <input
                  type="text"
                  required
                  value={newBin.code}
                  onChange={(e) => setNewBin({ ...newBin, code: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C3E50] mb-1">Street / Location Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 450 Maple Avenue, East Park Entrance"
                  value={newBin.location}
                  onChange={(e) => setNewBin({ ...newBin, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Waste Stream</label>
                  <select
                    value={newBin.type}
                    onChange={(e) => setNewBin({ ...newBin, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                  >
                    <option value="Organic">Organic Compost</option>
                    <option value="Recyclable">Recyclable (Plastics/Paper)</option>
                    <option value="Hazardous">Hazardous / E-Waste</option>
                    <option value="General">General Municipal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Sector Zone</label>
                  <select
                    value={newBin.sector}
                    onChange={(e) => setNewBin({ ...newBin, sector: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                  >
                    <option value="North Sector">North Sector</option>
                    <option value="South Sector">South Sector</option>
                    <option value="Central Commercial">Central Commercial</option>
                    <option value="Industrial Park">Industrial Park</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Capacity (Liters)</label>
                  <input
                    type="number"
                    min="100"
                    max="1100"
                    value={newBin.capacity}
                    onChange={(e) => setNewBin({ ...newBin, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Initial Fill Level (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newBin.fillLevel}
                    onChange={(e) => setNewBin({ ...newBin, fillLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddBinModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pill-btn-primary px-5 py-2 text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Node</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinsManager;
