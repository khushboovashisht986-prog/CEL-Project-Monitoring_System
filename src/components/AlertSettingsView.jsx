
import { useState } from 'react';

export default function AlertSettingsView({ onBackToProjects }) {
  const [settings, setSettings] = useState({
    reminderDays: 7,
    warningDays: 3,
    criticalDays: 1,
    emailAlerts: true,
    dashboardAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Alert Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure project milestone alert preferences.
          </p>
        </div>

        <button
          onClick={onBackToProjects}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Back to Projects
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Alert thresholds
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Set when milestone reminders should be triggered.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            { key: 'reminderDays', label: 'Reminder (days before)' },
            { key: 'warningDays', label: 'Warning (days before)' },
            { key: 'criticalDays', label: 'Critical (days before)' },
          ].map((item) => (
            <label key={item.key} className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <input
                type="number"
                min="1"
                max="90"
                value={settings[item.key]}
                onChange={(e) =>
                  updateSetting(item.key, Number(e.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Notification preferences
        </h2>

        <div className="mt-5 space-y-5">
          {[
            {
              key: 'dashboardAlerts',
              label: 'Dashboard notifications',
              description: 'Show alerts inside the project dashboard.',
            },
            {
              key: 'emailAlerts',
              label: 'Email notifications',
              description: 'Enable email alert preference for the demo.',
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-start gap-3"
            >
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) =>
                  updateSetting(item.key, e.target.checked)
                }
                className="mt-1 h-4 w-4 accent-blue-600"
              />
              <span>
                <span className="block text-sm font-medium text-slate-800">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {item.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSave}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Save Settings
        </button>

        {saved && (
          <p role="status" className="text-sm font-medium text-green-700">
            Settings saved for this session.
          </p>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Demo only: settings are not persisted to a backend.
      </p>
    </div>
  );
}
