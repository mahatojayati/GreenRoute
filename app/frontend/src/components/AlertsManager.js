import React, { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Bell,
  Clock,
  MapPin,
  Truck,
  Trash2,
  Filter,
  CheckCheck
} from "lucide-react";
import { toast } from "sonner";
import { ALERTS } from "@/constants/testIds";

const initialAlerts = [
  {
    id: "ALT-801",
    title: "Critical Overflow Warning: Bin #BIN-104",
    message: "Ultrasonic sensor reading 96% fill level at 120 Market Street. High risk of street spillage.",
    severity: "Critical",
    location: "120 Market St (Central Commercial)",
    timestamp: "12 minutes ago",
    status: "Active",
    binCode: "BIN-104",
  },
  {
    id: "ALT-802",
    title: "Missed Scheduled Collection on Route #RT-101",
    message: "Collection vehicle delayed due to traffic congestion on 5th Avenue. Estimated 25 min delay.",
    severity: "Warning",
    location: "North Sector residential corridor",
    timestamp: "45 minutes ago",
    status: "Active",
    binCode: null,
  },
  {
    id: "ALT-803",
    title: "Low Sensor Battery Telemetry: Bin #BIN-205",
    message: "Internal lithium cell level dropped to 14%. Solar charging panel may require cleaning.",
    severity: "Warning",
    location: "Greenway Park, Sector North",
    timestamp: "2 hours ago",
    status: "Active",
    binCode: "BIN-205",
  },
  {
    id: "ALT-804",
    title: "Municipal Sorting Facility Firmware Sync",
    message: "Optical sorting firmware update v4.2 applied successfully across Depot 1 and Depot 3.",
    severity: "Info",
    location: "Central Recycling Depot",
    timestamp: "Yesterday",
    status: "Resolved",
    binCode: null,
  },
];

const severityConfig = {
  Critical: {
    badge: "bg-red-100 text-[#C0392B] border-red-200",
    icon: AlertCircle,
    color: "#C0392B",
    border: "border-red-300 bg-red-50/20",
  },
  Warning: {
    badge: "bg-amber-100 text-[#E67E22] border-amber-200",
    icon: AlertTriangle,
    color: "#E67E22",
    border: "border-amber-200 bg-amber-50/10",
  },
  Info: {
    badge: "bg-blue-100 text-[#2980B9] border-blue-200",
    icon: Info,
    color: "#2980B9",
    border: "border-blue-200 bg-blue-50/10",
  },
  Resolved: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
    color: "#27AE60",
    border: "border-emerald-200 bg-emerald-50/10",
  },
};

const AlertsManager = ({ setActiveTab }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedSeverity === "All") return true;
    return alert.severity === selectedSeverity;
  });

  const handleResolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: "Resolved", severity: "Resolved" } : a))
    );
    toast.success(`Alert ${alertId} resolved and logged to audit log!`);
  };

  const handleDispatchForAlert = (alert) => {
    toast.info(`Emergency dispatch route created for ${alert.location}`, {
      description: "Closest available EV truck notified via mobile driver terminal.",
    });
    if (setActiveTab) setActiveTab("schedules");
  };

  const handleAcknowledgeAll = () => {
    setAlerts((prev) =>
      prev.map((a) => ({ ...a, status: "Acknowledged" }))
    );
    toast.success("All active alerts acknowledged by operator.");
  };

  return (
    <div data-testid={ALERTS.container} className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold text-[#2C3E50] tracking-tight">
              Alerts & Incident Center
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#C0392B]/10 text-[#C0392B] font-bold text-xs">
              {alerts.filter((a) => a.status === "Active").length} Active Incidents
            </span>
          </div>
          <p className="text-sm text-[#2C3E50]/70 mt-1">
            Real-time notifications for bin capacity overruns, delayed routes, and IoT sensor maintenance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            data-testid={ALERTS.filterSeverity}
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-full bg-white border border-[#2C3E50]/15 text-[#2C3E50] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/40"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="Warning">Warnings</option>
            <option value="Info">Informational</option>
            <option value="Resolved">Resolved History</option>
          </select>

          <button
            onClick={handleAcknowledgeAll}
            className="pill-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#2E5A44]" />
            <span>Acknowledge All</span>
          </button>
        </div>
      </div>

      {/* Alerts Stream */}
      <div className="space-y-3.5">
        {filteredAlerts.map((alert) => {
          const config = severityConfig[alert.severity] || severityConfig.Info;
          const Icon = config.icon;
          const isResolved = alert.status === "Resolved";

          return (
            <div
              key={alert.id}
              data-testid={ALERTS.alertItem}
              className={`clean-card p-5 border transition-all ${config.border}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Alert content */}
                <div className="flex items-start gap-3.5">
                  <div
                    className="p-2.5 rounded-2xl shrink-0 mt-0.5"
                    style={{ backgroundColor: `${config.color}15`, color: config.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-sm text-[#2C3E50]">
                        {alert.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${config.badge}`}>
                        {alert.severity}
                      </span>
                      {alert.binCode && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {alert.binCode}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#2C3E50]/80 leading-relaxed">
                      {alert.message}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-[#2C3E50]/60 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2E5A44]" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  {alert.severity === "Critical" && !isResolved && (
                    <button
                      onClick={() => handleDispatchForAlert(alert)}
                      className="px-3.5 py-1.5 rounded-full bg-[#C0392B] text-white hover:bg-red-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Dispatch Now</span>
                    </button>
                  )}

                  {!isResolved ? (
                    <button
                      data-testid={ALERTS.resolveBtn}
                      onClick={() => handleResolveAlert(alert.id)}
                      className="pill-btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Resolve</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Logged & Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsManager;
