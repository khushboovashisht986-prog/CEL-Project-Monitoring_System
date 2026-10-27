import React from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';

export default function ProjectTable({
  projects = [],
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  typeFilter = 'all',
  onTypeFilterChange,
  managerFilter = 'all',
  onManagerFilterChange,
  onSelectProject,
  onAddProject,
  onDeleteProject,
}) {
  const managers = [
    'all',
    'Divya Prakash Upadhyay',
    'Dayasindhu',
    'Umakanth'
  ];

  const types = ['all', 'P-series', 'R-series'];

  return (
    <div className="space-y-4">
      {/* Table Card Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Card Header & Controls */}
        <div className="p-5 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                All projects &bull; {projects.length}
              </h2>
              <span className="text-xs text-slate-500 font-normal">
                Select a row to open milestones
              </span>
            </div>
          </div>
          {/* Search & 3 Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 lg:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by code, project name or manager"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-2 lg:col-span-2 relative">
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="w-full appearance-none px-3 py-2 pr-8 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                <option value="all">Status: All</option>
                <option value="On track">Status: On track</option>
                <option value="Delayed">Status: Delayed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Type Filter */}
            <div className="sm:col-span-2 lg:col-span-2 relative">
              <select
                value={typeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="w-full appearance-none px-3 py-2 pr-8 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                <option value="all">Type: All</option>
                <option value="P-series">Type: P-series</option>
                <option value="R-series">Type: R-series</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Manager Filter */}
            <div className="sm:col-span-2 lg:col-span-2 relative">
              <select
                value={managerFilter}
                onChange={(e) => onManagerFilterChange(e.target.value)}
                className="w-full appearance-none px-3 py-2 pr-8 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer truncate"
              >
                <option value="all">Manager: All</option>
                {managers
                  .filter((m) => m !== 'all')
                  .map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Desktop / Tablet Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    Code <span className="text-slate-400 text-xs">&uarr;</span>
                  </span>
                </th>
                <th className="py-3 px-4">Project name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Project manager</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Milestones</th>
                <th className="py-3 px-4">Next alert</th>
                <th className="py-3 px-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No matching projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const isDelayed = project.status === 'Delayed';
                  const progressPct = Math.round(
                    (project.completedMilestones / project.totalMilestones) * 100
                  );

                  return (
                    <tr
                      key={project.code}
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className={`cursor-pointer transition-colors ${isDelayed
                        ? 'bg-[#FEF2F2] hover:bg-[#FEE2E2]'
                        : 'bg-white hover:bg-slate-50/70'
                        }`}
                    >
                      {/* Code */}
                      <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                        {project.code}
                      </td>

                      {/* Project Name */}
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        {project.name}
                      </td>

                      {/* Type */}
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                        {project.type}
                      </td>

                      {/* Project Manager */}
                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                        {project.manager}
                      </td>

                      {/* Status: Red Delayed vs Green On track */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isDelayed ? (
                          <span className="inline-flex items-center gap-1 font-bold text-red-600 text-xs">
                            <span className="font-extrabold">!</span> Delayed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-emerald-200/60">
                            <Check className="w-3 h-3 stroke-[2.5]" /> On track
                          </span>
                        )}
                      </td>

                      {/* Milestones progress */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-[11px] text-slate-700 mb-1">
                          {project.completedMilestones} of {project.totalMilestones} completed
                        </div>
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#1E293B] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Next Alert */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className={`font-semibold text-xs ${isDelayed && project.nextAlert.isToday ? 'text-slate-900' : 'text-slate-800'}`}>
                          {project.nextAlert.date}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {project.nextAlert.description}
                        </div>
                      </td>


                      {/* Arrow + Delete */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const confirmed = window.confirm(
                                'Are you sure you want to delete this project?'
                              );
                              if (confirmed) {
                                onDeleteProject?.(project.code);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold"
                          >
                            Delete
                          </button>

                          <ChevronRight className="w-4 h-4 text-slate-400 inline-block" />
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Responsive Cards */}
        <div className="block md:hidden divide-y divide-slate-200">
          {projects.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching projects found.
            </div>
          ) : (
            projects.map((project) => {
              const isDelayed = project.status === 'Delayed';
              const progressPct = Math.round(
                (project.completedMilestones / project.totalMilestones) * 100
              );

              return (
                <div
                  key={project.code}
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className={`p-4 transition-colors cursor-pointer ${isDelayed ? 'bg-[#FEF2F2]' : 'bg-white'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900">
                      {project.code} &bull; <span className="font-normal text-slate-500">{project.type}</span>
                    </span>

                    {isDelayed ? (
                      <span className="font-bold text-red-600 text-xs">
                        ! Delayed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#059669]">
                        <Check className="w-3 h-3 stroke-[2.5]" /> On track
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-sm text-slate-900 leading-snug mb-2">
                    {project.name}
                  </h3>

                  <div className="text-xs text-slate-600 mb-2">
                    Manager: <strong className="text-slate-800 font-medium">{project.manager}</strong>
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="text-[11px] text-slate-600 mb-1 flex items-center justify-between">
                      <span>{project.completedMilestones} of {project.totalMilestones} completed</span>
                      <span className="font-mono">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#1E293B] h-1.5 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                    <div>
                      Next alert: <strong className="text-slate-800">{project.nextAlert.date}</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject?.(project.code);
                        }}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>

                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Table Footer Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <span>Showing all 7 projects &bull; Sorted by project code</span>
          <span className="text-slate-400">Progress = completed milestones / total</span>
        </div>
      </div>

      {/* Bottom Information Callout */}
      <div className="p-3.5 bg-slate-100/70 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <span>
          2 projects need attention. Delayed milestones remain visible in red; scheduled alerts do not change any entered dates.
        </span>
      </div>
    </div>
  );
}
