
import React, { useMemo, useState } from 'react';
import { MOCK_PROJECTS } from '../data/mockData.js';
import { Search, ArrowLeft, Bell, CheckCircle2 } from 'lucide-react';

const initialAlerts = MOCK_PROJECTS.flatMap((project) =>
  project.milestones
    .filter((milestone) =>
      ['Delayed', 'In Progress', 'Pending'].includes(milestone.status)
    )
    .map((milestone) => ({
      id: milestone.id,
      projectId: project.code,
      projectName: project.name,
      title: milestone.title,
      severity: milestone.status === 'Delayed' ? 'Critical' : 'Medium',
      date: milestone.targetDate,
      status: milestone.status === 'Delayed' ? 'Active' : 'Acknowledged'
    }))
);
export default function AlertHistoryView({ onBackToProjects, onOpenProject }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('All');
  const [status, setStatus] = useState('All');

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        `${alert.title} ${alert.projectId} ${alert.projectName}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesSearch &&
        (severity === 'All' || alert.severity === severity) &&
        (status === 'All' || alert.status === status)
      );
    });
  }, [alerts, search, severity, status]);

  function acknowledgeAlert(id) {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, status: 'Acknowledged' }
          : alert
      )
    );
  }

  const severityStyle = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-sky-100 text-sky-700'
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs text-slate-500 mb-2">
          Workspace / Alert history
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Alert history
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Search, filter and acknowledge project alerts.
            </p>
          </div>
          <button
            onClick={onBackToProjects}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Total alerts</p>
          <p className="mt-1 text-2xl font-bold">{alerts.length}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Active alerts</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {alerts.filter((a) => a.status === 'Active').length}
          </p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Acknowledged</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {alerts.filter((a) => a.status === 'Acknowledged').length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by alert title or project..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="All">All severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Acknowledged">Acknowledged</option>
          </select>

          <p className="self-center text-sm text-slate-500">
            {filteredAlerts.length} result(s)
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b p-4">
          <Bell size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900">Alert log</h2>
        </div>

        {filteredAlerts.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">
            No alerts match your search or filters.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${severityStyle[alert.severity]}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-slate-500">
                      {alert.id} · {alert.date}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    {alert.title}
                  </h3>

                  <button
                    onClick={() => onOpenProject?.(alert.projectId)}
                    className="text-sm font-medium text-sky-700 hover:underline"
                  >
                    Open project: {alert.projectName}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-xs font-medium ${alert.status === 'Active' ? 'text-red-600' : 'text-emerald-700'}`}>
                    {alert.status}
                  </span>

                  {alert.status === 'Active' && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                    >
                      <CheckCircle2 size={15} />
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Demonstration data only. Changes are temporary and reset on refresh.
      </p>
    </section>
  );
}
