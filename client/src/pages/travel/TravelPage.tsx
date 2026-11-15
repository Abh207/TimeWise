import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  CheckSquare, 
  Plus, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Trash2,
  Luggage,
  Sparkles
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

interface TravelItem {
  id: string;
  title: string;
  category: 'Commute' | 'Trip' | 'Conference';
  origin: string;
  destination: string;
  date: string;
  transitMinutes: number;
  packingList: { id: string; item: string; checked: boolean }[];
}

export const TravelPage: React.FC = () => {
  const [plans, setPlans] = useState<TravelItem[]>([
    {
      id: 'trv-1',
      title: 'ACM ICPC Regional Collegiate Contest',
      category: 'Conference',
      origin: 'Campus North Dorms',
      destination: 'Regional Convention Center',
      date: '2026-11-28',
      transitMinutes: 45,
      packingList: [
        { id: 'p-1', item: 'Laptop & 100W GaN Charger', checked: true },
        { id: 'p-2', item: 'Student ID & Team Contest Badges', checked: true },
        { id: 'p-3', item: 'Algorithms & Graph Theory Cheatsheet binder', checked: false },
        { id: 'p-4', item: 'Mechanical keyboard & ergonomic mouse', checked: false },
      ]
    },
    {
      id: 'trv-2',
      title: 'Daily Campus Quad Commute',
      category: 'Commute',
      origin: 'Apartment Suite 3B',
      destination: 'Hall CS-301',
      date: 'Daily Recurring',
      transitMinutes: 15,
      packingList: [
        { id: 'p-21', item: 'Hydro Flask 3L Water bottle', checked: true },
        { id: 'p-22', item: 'Noise cancelling headphones', checked: true },
      ]
    }
  ]);

  const toggleCheck = (planId: string, itemId: string) => {
    setPlans(plans.map(p => {
      if (p.id !== planId) return p;
      return {
        ...p,
        packingList: p.packingList.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      };
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Plane className="w-3.5 h-3.5" />
            <span>Mobility & Preparation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Travel & Commute Hub</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Plan conference trips, hackathon travel, and daily campus routes with essential packing checklists.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-2xl glass-card border border-white/10 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300">
                  {plan.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{plan.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>{plan.origin}</span>
                  <span>&rarr;</span>
                  <span className="text-white font-medium">{plan.destination}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded">
                  {plan.transitMinutes}m Transit
                </span>
                <div className="text-[10px] text-slate-400 mt-1">{plan.date}</div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Gear & Packing Checklist</span>
                <span className="font-mono text-[11px] text-brand-300">
                  {plan.packingList.filter(i => i.checked).length} / {plan.packingList.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {plan.packingList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      toggleCheck(plan.id, item.id);
                      if (!item.checked) triggerConfetti();
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs border transition-all ${
                      item.checked
                        ? 'border-peach-400/20 bg-peach-300/10 text-slate-300 line-through'
                        : 'border-white/5 bg-dark-900/40 text-slate-200 hover:border-white/10'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${
                        item.checked ? 'text-peach-300' : 'text-slate-600'
                      }`}
                    />
                    <span>{item.item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

