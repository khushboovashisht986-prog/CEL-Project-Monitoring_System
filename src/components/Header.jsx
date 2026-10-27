import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, Shield } from 'lucide-react';
import { MOCK_CURRENT_USER, MOCK_HEADER_META } from '../data/mockData.js';

export default function Header({
  onToggleMobileMenu,
  onAlertsClick,
  onSignOut,
  currentUser = MOCK_CURRENT_USER
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & System Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-slate-900 text-sm sm:text-base tracking-tight">
            Project Monitoring System
          </span>
        </div>

        {/* Right: Sample Date, Alerts button, User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Sample Date Indicator */}
          <span className="text-xs text-slate-500 hidden md:inline-block font-normal">
            {MOCK_HEADER_META.sampleDateLabel}
          </span>

          {/* Alerts Pill Button */}
          <button
            type="button"
            onClick={onAlertsClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-colors shadow-2xs cursor-pointer"
            title="Open Alert History"
          >
            <Bell className="w-3.5 h-3.5 text-sky-600" />
            <span>Alerts &bull; {MOCK_HEADER_META.upcomingAlertsCount}</span>
          </button>

          {/* User Profile with Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-1 cursor-pointer select-none rounded-lg p-1 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-slate-500 leading-tight">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 divide-y divide-slate-100 text-xs">
                <div className="px-3.5 py-2.5">
                  <div className="font-semibold text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-800 border border-sky-200">
                    <Shield className="w-3 h-3 text-sky-600" />
                    <span>Role: {currentUser.role}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSignOut && onSignOut();
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out (Switch to Login UI)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
