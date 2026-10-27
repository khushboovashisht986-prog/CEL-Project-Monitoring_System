import React, { useState, useMemo } from 'react';
import StatCards from './StatCards.jsx';
import ProjectTable from './ProjectTable.jsx';
import ProjectDetailModal from './ProjectDetailModal.jsx';
import { MOCK_PROJECTS, MOCK_HEADER_META } from '../data/mockData.js';
import { Plus } from 'lucide-react';

export default function DashboardView({
  onAddProject,
  showCreateProject,
  setShowCreateProject,
  projects,
  setProjects,
}) {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [managerFilter, setManagerFilter] = useState('all');

  // Selected project for milestones slide-over/modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Filtered projects computation
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Text Search query (code, name, or manager)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.code.toLowerCase().includes(q) ||
        project.name.toLowerCase().includes(q) ||
        project.manager.toLowerCase().includes(q);

      // 2. Status filter
      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter;

      // 3. Type filter
      const matchesType =
        typeFilter === 'all' || project.type === typeFilter;

      // 4. Manager filter
      const matchesManager =
        managerFilter === 'all' || project.manager === managerFilter;

      return matchesSearch && matchesStatus && matchesType && matchesManager;
    });
  }, [projects, searchQuery, statusFilter, typeFilter, managerFilter]);

  // Dynamic counts
  const totalCount = projects.length;
  const onTrackCount = projects.filter((p) => p.status === 'On track').length;
  const delayedCount = projects.filter((p) => p.status === 'Delayed').length;
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectManager, setNewProjectManager] = useState('');
  const [newProjectType, setNewProjectType] = useState('P-series');
  return (
    <>
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-1.5 font-normal">
        Workspace / Projects
      </div>

      {/* Title and Top Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Project dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor every project, find slipping milestones and act on upcoming alerts.
          </p>
        </div>

        {/* + Create project button */}
        <button
          type="button"
          onClick={() => setShowCreateProject(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create project</span>
        </button>
      </div>
      {showCreateProject && (
        <div className="mb-6 rounded-xl border bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">Create New Project</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const newProject = {
                code: `P${Date.now().toString().slice(-4)}`,
                name: newProjectName,
                manager: newProjectManager,
                type: newProjectType,
                status: 'On track',
                completedMilestones: 0,
                totalMilestones: 1,
                nextAlert: {
                  date: 'Not scheduled',
                  description: 'No upcoming alert',
                  isToday: false,
                },
              };
              console.log('New project:', newProject);
              setProjects((prev) => [...prev, newProject]);
              setNewProjectName('');
              setNewProjectManager('');
              setNewProjectType('P-series');
              setShowCreateProject(false);
            }}
            className="space-y-3"
          >
            <input
              required
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full rounded-lg border p-3"
            />

            <input
              required
              value={newProjectManager}
              onChange={(e) => setNewProjectManager(e.target.value)}
              placeholder="Project manager"
              className="w-full rounded-lg border p-3"
            />

            <select
              value={newProjectType}
              onChange={(e) => setNewProjectType(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="P-series">P-series</option>
              <option value="R-series">R-series</option>
            </select>

            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
              Save Project
            </button>

            <button
              type="button"
              onClick={() => setShowCreateProject(false)}
              className="ml-2 rounded-lg border px-4 py-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {/* 4 Summary Metric Cards */}
      <StatCards
        totalCount={totalCount}
        onTrackCount={onTrackCount}
        delayedCount={delayedCount}
        upcomingAlertsCount={MOCK_HEADER_META.upcomingAlertsCount}
        selectedStatusFilter={statusFilter}
        onSelectStatusFilter={setStatusFilter}
      />

      {/* Main Projects Table with Search & Dropdowns */}
      <ProjectTable
        projects={filteredProjects}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        managerFilter={managerFilter}
        onManagerFilterChange={setManagerFilter}
        onSelectProject={setSelectedProject}
        onDeleteProject={(projectCode) => {
          const confirmed = window.confirm('Are you sure you want to delete this project?');

          if (confirmed) {
            setProjects((prev) => prev.filter((project) => project.code !== projectCode));
          }
        }}
        onAddProject={onAddProject}
      />

      {/* Interactive Milestones Slide-over / Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
