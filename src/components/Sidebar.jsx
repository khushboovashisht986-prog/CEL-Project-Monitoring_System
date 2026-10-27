import React from 'react';
import {
  LayoutGrid,
  Bell,
  Users,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { MOCK_HEADER_META } from '../data/mockData.js';

export default function Sidebar({
  activeNav = 'projects',
  onSelectNav,
  mobileOpen = false,
  onCloseMobile
}) {
  const navItems = [
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'alerts', label: 'Alert history', icon: Bell, badge: `${MOCK_HEADER_META.upcomingAlertsCount}` },
    { id: 'users', label: 'Users & roles', icon: Users },
    { id: 'settings', label: 'Alert settings', icon: SlidersHorizontal }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0B132B] text-slate-200">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="text-xl font-black text-white tracking-wider">
            CEL
          </div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">
            PROJECT MONITORING
          </div>
        </div>
        {mobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectNav && onSelectNav(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-[#1E293B] text-white shadow-2xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Workspace Footer Section */}
      <div className="p-5 border-t border-slate-800/80 text-xs space-y-1">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          WORKSPACE
        </div>
        <div className="text-xs font-medium text-slate-200">
          {MOCK_HEADER_META.workspaceName}
        </div>
        <div className="text-[11px] text-slate-400">
          {MOCK_HEADER_META.scopeVersion}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 h-screen sticky top-0 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-xs h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
