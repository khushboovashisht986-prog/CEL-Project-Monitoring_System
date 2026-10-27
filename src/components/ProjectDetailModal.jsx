import React, { useState, useEffect } from 'react';
import { X, Calendar, User, CheckCircle2, Clock, AlertTriangle, Layers, MessageSquare } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onUpdate }) {
  if (!project) return null;
  const [formData, setFormData] = useState({
    delayReason: project.delayReason || '',
    correctiveAction: project.correctiveAction || '',
    hodSupport: project.hodSupport || '',
    remark: project.remark || '',
  });
  useEffect(() => {
    setFormData({
      delayReason: project.delayReason || '',
      correctiveAction: project.correctiveAction || '',
      hodSupport: project.hodSupport || '',
      remark: project.remark || '',
    });
  }, [project]);

  const isDelayed = project.status === 'Delayed';
  const progressPct = Math.round(
    (project.completedMilestones / project.totalMilestones) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-2xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div
          className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${isDelayed ? 'bg-red-50/70 border-red-200' : 'bg-slate-50 border-slate-200'
            }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded ${isDelayed ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                  }`}
              >
                {project.code}
              </span>
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-xs font-medium rounded">
                {project.type}
              </span>
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${isDelayed
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
              >
                {project.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {project.name}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Project Manager: <strong className="text-slate-800">{project.manager}</strong></span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 min-h-0 max-h-">
          {/* Progress Bar Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Milestone Completion Progress</span>
              <span className="font-mono">{project.completedMilestones} of {project.totalMilestones} ({progressPct}%)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${isDelayed ? 'bg-red-600' : 'bg-slate-900'
                  }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
              <div>
                <span className="block text-slate-400 text-[11px]">Start Date</span>
                <span className="font-medium text-slate-800">{project.startDate}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[11px]">Target Date</span>
                <span className="font-medium text-slate-800">{project.targetDate}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
            <div>
              <span className="block text-slate-400 text-[11px]">Start Date</span>
              <span className="font-medium text-slate-800">{project.startDate}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[11px]">Target Date</span>
              <span className="font-medium text-slate-800">{project.targetDate}</span>
            </div>
          </div>
        </div>

        {/* Delay Notification Banner if project is delayed */}
        {isDelayed && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Delay Factor & Corrective Action</span>
            </div>
            <div className="text-xs space-y-1 text-slate-700">
              <p>
                <strong className="text-red-900">Reason:</strong> {project.delayReason}
              </p>
              <p>
                <strong className="text-emerald-900">Corrective Action:</strong> {project.correctiveAction}
              </p>
            </div>
          </div>
        )}


        {/* Delay Management Form */}
        <div className="p-4 border border-slate-200 rounded-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Delay Management
          </h3>

          <div>
            <label className="block text-xs font-medium mb-1">
              Delay Reason
            </label>
            <textarea
              value={formData.delayReason}
              onChange={(e) =>
                setFormData({ ...formData, delayReason: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter reason for delay"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Corrective Action
            </label>
            <textarea
              value={formData.correctiveAction}
              onChange={(e) =>
                setFormData({ ...formData, correctiveAction: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter corrective action"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              HOD Support Required
            </label>
            <textarea
              value={formData.hodSupport}
              onChange={(e) =>
                setFormData({ ...formData, hodSupport: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter support required"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Remark
            </label>
            <textarea
              value={formData.remark}
              onChange={(e) =>
                setFormData({ ...formData, remark: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter remarks"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const updatedProject = {
                ...project,
                delayReason: formData.delayReason,
                correctiveAction: formData.correctiveAction,
                hodSupportStatus: formData.hodSupport,
                hodRemarks: formData.remark,
              };
              if (onUpdate) onUpdate(updatedProject);
              alert('Delay details saved!');
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm"
          >
            Save Delay Details
          </button>
        </div>


        {/* Milestones List */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            Project Milestones ({project.milestones.length})
          </h3>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            {project.milestones.map((m, idx) => {
              const isMCompleted = m.status === 'Completed';
              const isMDelayed = m.status === 'Delayed';

              return (
                <div
                  key={m.id || idx}
                  className={`p-3.5 text-xs ${isMDelayed ? 'bg-red-50/50' : 'bg-white'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 mb-0.5">
                        M{idx + 1}: {m.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                        <span>Assignee: <strong className="text-slate-700 font-medium">{m.assignee || 'Unassigned'}</strong></span>
                        <span>&bull;</span>
                        <span>Target: <strong className="text-slate-700 font-medium">{m.targetDate}</strong></span>
                        {m.actualDate && (
                          <>
                            <span>&bull;</span>
                            <span>Actual: <strong className="text-emerald-700 font-medium">{m.actualDate}</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center ${isMCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isMDelayed
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  {m.note && (
                    <div className="text-[11px] text-slate-500 mt-1 italic">
                      Note: {m.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Demonstration mock data &bull; CEL Project Monitoring</span>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
