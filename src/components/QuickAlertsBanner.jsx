import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ChevronRight, X, ArrowRight } from 'lucide-react';

export default function QuickAlertsBanner({ alerts = [], onSelectAlertProject }) {
  const [dismissed, setDismissed] = useState(false);
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical');

  if (dismissed || criticalAlerts.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50/70 p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-600 text-white shadow-2xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wider">
              Critical Escalations Requiring Immediate HOD Review ({criticalAlerts.length})
            </h3>
            <p className="text-[11px] text-rose-700">
              The following project milestones have reported critical delays and pending sanctions:
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-rose-400 hover:text-rose-700 p-1 rounded-md transition-colors"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
        {criticalAlerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onSelectAlertProject && onSelectAlertProject(alert.projectCode)}
            className="p-3 bg-white rounded-lg border border-rose-200 hover:border-rose-400 cursor-pointer transition-all shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono font-bold text-xs px-2 py-0.5 bg-rose-600 text-white rounded">
                  {alert.projectCode}
                </span>
                <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {alert.category}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{alert.title}</h4>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">
                Action: <strong className="text-rose-800">{alert.actionRequired}</strong>
              </span>
              <span className="inline-flex items-center gap-0.5 font-bold text-rose-700 hover:text-rose-900 shrink-0 ml-2">
                Inspect <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
