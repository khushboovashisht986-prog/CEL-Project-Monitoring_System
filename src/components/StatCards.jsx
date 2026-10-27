import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, Bell } from 'lucide-react';

export default function StatCards({
  totalCount = 7,
  onTrackCount = 5,
  delayedCount = 2,
  upcomingAlertsCount = 3,
  selectedStatusFilter,
  onSelectStatusFilter
}) {
  const cards = [
    {
      id: 'all',
      title: 'Total projects',
      value: totalCount,
      subtitle: 'All registered projects',
      icon: Layers,
      iconColor: 'text-slate-500'
    },
    {
      id: 'On track',
      title: 'On track',
      value: onTrackCount,
      subtitle: 'No delayed milestones',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600'
    },
    {
      id: 'Delayed',
      title: 'Delayed',
      value: delayedCount,
      subtitle: 'Includes P101 and P104',
      icon: AlertTriangle,
      iconColor: 'text-red-500'
    },
    {
      id: 'alerts',
      title: 'Upcoming alerts',
      value: upcomingAlertsCount,
      subtitle: 'Due 23–25 Jul · includes today',
      icon: Bell,
      iconColor: 'text-amber-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedStatusFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => {
              if (card.id === 'alerts') {
                // Focus on projects with upcoming alerts
                onSelectStatusFilter && onSelectStatusFilter('all');
              } else {
                onSelectStatusFilter && onSelectStatusFilter(card.id);
              }
            }}
            className={`bg-white rounded-xl border p-5 shadow-2xs transition-all cursor-pointer ${
              isSelected
                ? 'border-slate-900 ring-2 ring-slate-900/10'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {card.title}
              </span>
              <Icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>

            <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
              {card.value}
            </div>

            <div className="text-xs text-slate-500 mt-2 font-normal">
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
