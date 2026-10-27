import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import { MOCK_USERS } from './data/mockData.js';
import AlertSettingsView from './components/AlertSettingsView.jsx';
import UsersRolesView from './components/UsersRolesView.jsx';
import { MOCK_PROJECTS } from './data/mockData.js';
import ProjectDetailModal from './components/ProjectDetailModal.jsx';
import AlertHistoryView from './components/AlertHistoryView.jsx';
import DashboardView from './components/DashboardView.jsx';
import { MOCK_CURRENT_USER, MOCK_HEADER_META } from './data/mockData.js';
import {
  Bell,
  Users,
  SlidersHorizontal,
  ArrowLeft,
  Shield,
  Lock,
  LogIn,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation state: 'projects' | 'alerts' | 'users' | 'settings' | 'login'
  const [activeNav, setActiveNav] = useState('projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(MOCK_CURRENT_USER);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('cel-projects');
    return savedProjects ? JSON.parse(savedProjects) : MOCK_PROJECTS;
  });
  useEffect(() => {
    localStorage.setItem('cel-projects', JSON.stringify(projects));
  }, [projects]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectManager, setNewProjectManager] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);


  // If user is on the Login Screen

  if (activeNav === 'login') {

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#244E7C]">CEL</span>
            <span className="border-l pl-3 text-xs font-semibold">
              Project Monitoring System
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            Internal network only
          </span>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <section>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
              <span>✓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 leading-tight">
              Project Monitoring
              <br />
              System
            </h1>
            <p className="text-sm text-slate-500 mt-4 leading-6">
              A shared view of project milestones, status updates and scheduled alerts.
            </p>
            <hr className="my-5 border-slate-200" />
            <p className="text-xs text-slate-500 leading-5">
              Use the username and password provided by your administrator.
              Access is available only on the CEL internal network.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Sample date · 23 Jul 2026
            </p>
          </section>

          <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold">Sign in</h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Enter your CEL access credentials.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  loginUsername.trim() === 'admin' &&
                  loginPassword === 'cel123'
                ) {
                  setLoginError(false);
                  setActiveNav('projects');
                } else {
                  setLoginError(true);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Username *
                </label>
                <input
                  required
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Provided by your administrator.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Password *
                </label>
                <input
                  required
                  type="password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {loginError && (
                <p role="alert" className="text-xs text-red-600">
                  Invalid username or password. Please contact your administrator.
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#244E7C] hover:bg-[#1D4168] text-white rounded py-2.5 text-xs font-semibold"
              >
                Sign in
              </button>
            </form>

            <div className="border-t border-slate-200 mt-5 pt-4 text-[11px] text-slate-500">
              Forgotten your password or need access?
              <br />
              Contact your administrator.
            </div>
          </section>
        </main>

        <footer className="px-6 py-4 flex justify-between text-[10px] text-slate-400">
          <span>CEL · Authorised personnel only</span>
          <span>Draft scope v2.0 · Discussion design</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-800">
      <div className="flex-1 flex flex-row">
        {/* Dark Navy Sidebar */}
        <Sidebar
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Clean White Top Header */}
          <Header
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onAlertsClick={() => setActiveNav('alerts')}
            onSignOut={() => setActiveNav('login')}
            currentUser={currentUser}
          />

          {/* Dynamic Main Page Canvas based on activeNav */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {/* Screen 1: Project Dashboard */}
            {activeNav === 'projects' && (
              <DashboardView
                onAddProject={() => setShowCreateProject(true)}
                showCreateProject={showCreateProject}
                setShowCreateProject={setShowCreateProject}
                projects={projects}
                setProjects={setProjects}
              />
            )}
            {/* Screen 2: Alert History (Shell for P2) */}
            {activeNav === 'alerts' && (
              <AlertHistoryView
                onBackToProjects={() => setActiveNav('projects')}
                onOpenProject={(projectId) => {
                  const project = projects.find(
                    (item) => item.code === projectId
                  );

                  if (project) {
                    setSelectedProject(project);
                    setActiveNav('projects');
                  }
                }}
              />
            )}
            {/* Screen 3: Users & Roles (Shell for P3) */}
            {activeNav === 'users' && (
              <UsersRolesView
                onBackToProjects={() => setActiveNav('projects')}
                onUserUpdate={setCurrentUser}
              />
            )}

            {/* Screen 4: Alert Settings (Shell for P4) */}
            {activeNav === 'settings' && (
              <AlertSettingsView
                onBackToProjects={() => setActiveNav('projects')}
              />
            )}
            {activeNav === 'projects' && selectedProject && (
              <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                onUpdate={(updatedProject) => {
                  setProjects((previousProjects) =>
                    previousProjects.map((item) =>
                      item.code === updatedProject.code ? updatedProject : item
                    )
                  );
                  setSelectedProject(updatedProject);
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
