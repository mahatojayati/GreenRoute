import React, { useState } from "react";
import {
  Truck,
  Calendar,
  Zap,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Compass,
  Fuel,
  Users,
  X
} from "lucide-react";
import { toast } from "sonner";
import { SCHEDULER } from "@/constants/testIds";

const initialRoutes = [
  {
    id: "RT-101",
    name: "Downtown Commercial & Retail Loop",
    sector: "Central Commercial",
    driver: "Marcus Vance",
    truck: "EV CleanHaul #04",
    status: "In Progress",
    stops: 14,
    completedStops: 10,
    distanceKm: 18.4,
    fuelSavedL: 6.2,
    eta: "14:30 PM",
    bins: ["BIN-101", "BIN-104", "BIN-108", "BIN-112"],
  },
  {
    id: "RT-102",
    name: "North Residential & Park Sector",
    sector: "North Sector",
    driver: "Elena Rostova",
    truck: "CNG Compactor #02",
    status: "Scheduled",
    stops: 22,
    completedStops: 0,
    distanceKm: 28.0,
    fuelSavedL: 9.8,
    eta: "16:00 PM",
    bins: ["BIN-201", "BIN-205", "BIN-210"],
  },
  {
    id: "RT-103",
    name: "Industrial & E-Waste Special Pickup",
    sector: "Industrial Park",
    driver: "Devon Brooks",
    truck: "Heavy Recovery #01",
    status: "Completed",
    stops: 8,
    completedStops: 8,
    distanceKm: 14.2,
    fuelSavedL: 4.5,
    eta: "11:15 AM",
    bins: ["BIN-302", "BIN-305"],
  },
];

const CollectionScheduler = ({ onOptimizeRoute }) => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [isNewScheduleModalOpen, setIsNewScheduleModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    sector: "South Sector",
    driver: "Alex Rivera",
    truck: "EV CleanHaul #05",
    stops: 12,
  });

  const handleOptimizeClick = () => {
    // Simulate TSP optimization calculation
    const updated = routes.map((route) => {
      if (route.status !== "Completed") {
        const distanceReduction = Number((route.distanceKm * 0.12).toFixed(1));
        return {
          ...route,
          distanceKm: Number((route.distanceKm - distanceReduction).toFixed(1)),
          fuelSavedL: Number((route.fuelSavedL + 1.8).toFixed(1)),
        };
      }
      return route;
    });

    setRoutes(updated);
    if (onOptimizeRoute) onOptimizeRoute();
    toast.success("AI Route Optimization applied!", {
      description: "Waypoints compressed: ~12% transit distance and 1.8L fuel saved per active route.",
    });
  };

  const handleAdvanceRoute = (routeId) => {
    setRoutes((prev) =>
      prev.map((r) => {
        if (r.id === routeId) {
          const nextCompleted = Math.min(r.stops, r.completedStops + 1);
          const isDone = nextCompleted === r.stops;
          return {
            ...r,
            completedStops: nextCompleted,
            status: isDone ? "Completed" : "In Progress",
          };
        }
        return r;
      })
    );
    toast.success(`Stop logged for route ${routeId}!`);
  };

  const handleCreateRouteSubmit = (e) => {
    e.preventDefault();
    if (!newSchedule.name.trim()) {
      toast.error("Please enter a route description");
      return;
    }

    const createdRoute = {
      id: `RT-${Math.floor(104 + Math.random() * 800)}`,
      name: newSchedule.name,
      sector: newSchedule.sector,
      driver: newSchedule.driver,
      truck: newSchedule.truck,
      status: "Scheduled",
      stops: Number(newSchedule.stops) || 10,
      completedStops: 0,
      distanceKm: 22.5,
      fuelSavedL: 5.0,
      eta: "Tomorrow 09:00 AM",
      bins: ["BIN-401", "BIN-402"],
    };

    setRoutes([createdRoute, ...routes]);
    setIsNewScheduleModalOpen(false);
    toast.success(`Route ${createdRoute.id} successfully queued for dispatch!`);
    setNewSchedule({
      name: "",
      sector: "South Sector",
      driver: "Alex Rivera",
      truck: "EV CleanHaul #05",
      stops: 12,
    });
  };

  return (
    <div data-testid={SCHEDULER.container} className="space-y-6">
      {/* Header & Fleet Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold text-[#2C3E50] tracking-tight">
              Collection Routes & Dispatch
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2980B9]/10 text-[#2980B9] font-bold text-xs">
              AI Route Planner
            </span>
          </div>
          <p className="text-sm text-[#2C3E50]/70 mt-1">
            Dynamic Traveling Salesperson Problem (TSP) optimization based on ultrasonic bin fullness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            data-testid={SCHEDULER.optimizeBtn}
            onClick={handleOptimizeClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2980B9] text-white hover:bg-[#1f6696] text-xs font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Optimize All Routes</span>
          </button>

          <button
            data-testid={SCHEDULER.createScheduleBtn}
            onClick={() => setIsNewScheduleModalOpen(true)}
            className="pill-btn-primary px-4 py-2.5 text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Route</span>
          </button>
        </div>
      </div>

      {/* Fleet KPI Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" data-testid={SCHEDULER.truckStatus}>
        <div className="clean-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#2C3E50]/60">Active Fleet</p>
            <p className="font-heading font-bold text-lg text-[#2C3E50]">4 Electric Trucks</p>
          </div>
        </div>

        <div className="clean-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#2980B9]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#2C3E50]/60">Total Distance</p>
            <p className="font-heading font-bold text-lg text-[#2C3E50]">60.6 km</p>
          </div>
        </div>

        <div className="clean-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#E67E22]">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#2C3E50]/60">Fuel Conserved</p>
            <p className="font-heading font-bold text-lg text-[#E67E22]">20.5 Liters</p>
          </div>
        </div>

        <div className="clean-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#2C3E50]/60">Assigned Drivers</p>
            <p className="font-heading font-bold text-lg text-[#2C3E50]">3 On Duty</p>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div data-testid={SCHEDULER.routeList} className="space-y-4">
        {routes.map((route) => {
          const isDone = route.status === "Completed";
          const isInProgress = route.status === "In Progress";
          const progressPercent = Math.round((route.completedStops / route.stops) * 100);

          return (
            <div
              key={route.id}
              className={`clean-card p-5 border transition-all ${
                isInProgress
                  ? "border-[#2980B9]/40 bg-blue-50/10"
                  : isDone
                  ? "border-emerald-200 bg-emerald-50/10"
                  : "border-[#2C3E50]/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Route Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-extrabold text-lg text-[#2C3E50]">
                      {route.id}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isInProgress
                          ? "bg-blue-100 text-[#2980B9]"
                          : isDone
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {route.status}
                    </span>
                    <span className="text-xs text-[#2C3E50]/60 hidden sm:inline">
                      • Sector: {route.sector}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#2C3E50]">
                    {route.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#2C3E50]/70">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#2E5A44]" />
                      {route.truck} ({route.driver})
                    </span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#2980B9]" />
                      {route.distanceKm} km optimized
                    </span>
                    <span className="flex items-center gap-1 text-[#2E5A44] font-semibold">
                      <Fuel className="w-3.5 h-3.5" />
                      {route.fuelSavedL}L fuel saved
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      ETA: {route.eta}
                    </span>
                  </div>
                </div>

                {/* Progress & Quick Action */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 min-w-[240px]">
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#2C3E50]/70">
                        {route.completedStops} of {route.stops} Pickups Cleared
                      </span>
                      <span className="text-[#2C3E50]">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? "bg-emerald-600" : "bg-[#2980B9]"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {!isDone && (
                    <button
                      onClick={() => handleAdvanceRoute(route.id)}
                      className="pill-btn-secondary px-4 py-1.5 text-xs flex items-center gap-1.5 self-end"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Log Next Pickup Stop</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create New Route Schedule Modal */}
      {isNewScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#2C3E50]/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#2980B9]">
                <Truck className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg text-[#2C3E50]">
                  Schedule Collection Route
                </h3>
              </div>
              <button
                onClick={() => setIsNewScheduleModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRouteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2C3E50] mb-1">Route Name / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., South Residential Evening Collection"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Sector</label>
                  <select
                    value={newSchedule.sector}
                    onChange={(e) => setNewSchedule({ ...newSchedule, sector: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/50"
                  >
                    <option value="Central Commercial">Central Commercial</option>
                    <option value="North Sector">North Sector</option>
                    <option value="South Sector">South Sector</option>
                    <option value="Industrial Park">Industrial Park</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Number of Bin Stops</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newSchedule.stops}
                    onChange={(e) => setNewSchedule({ ...newSchedule, stops: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Assigned Driver</label>
                  <input
                    type="text"
                    required
                    value={newSchedule.driver}
                    onChange={(e) => setNewSchedule({ ...newSchedule, driver: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C3E50] mb-1">Collection Vehicle</label>
                  <input
                    type="text"
                    required
                    value={newSchedule.truck}
                    onChange={(e) => setNewSchedule({ ...newSchedule, truck: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/50"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#2980B9] text-white hover:bg-[#1f6696] font-semibold flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatch Route</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionScheduler;
