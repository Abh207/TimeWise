import React, { useState } from 'react';
import { 
  HelpCircle, 
  Keyboard, 
  Sparkles, 
  Calendar, 
  Flame, 
  Timer, 
  CloudSun, 
  ChevronDown,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const guides = [
    {
      title: "How to use the Timetable Conflict Detection & Resolution",
      desc: "TimeWise continuously checks for direct overlaps and transit buffer shortages between events. If you schedule two activities in different physical halls without at least 15 minutes to walk between them, a yellow conflict warning will alert you. Simply click 'Auto-Fix Slot' to smoothly reschedule the second activity."
    },
    {
      title: "Using the Rule-Based Smart Planner",
      desc: "Navigate to '/app/smart-planner' to let the deterministic scheduling algorithm suggest ideal time slots for your pending assignments. It looks at your circadian energy peak, 8-hour sleep requirement, and current calendar gaps to propose realistic blocks with built-in travel buffers. Click 'Accept Slot' to commit any recommendation."
    },
    {
      title: "Streak Freezes & Grace Recovery Days",
      desc: "Life happens. In '/app/streaks', if an unavoidable conflict or illness prevents you from completing a daily habit, click 'Grace Freeze'. This applies one of your earned grace days so your multi-week consistency streak remains unbroken."
    },
    {
      title: "How Ambient Procedural Audio works in Focus Mode",
      desc: "In '/app/focus', our synthesizer generates sound waves dynamically in your browser via the Web Audio API. Choose between soothing Rain, filtered Pink Noise, swelling Ocean Waves, or 40Hz Gamma Focus binaural beats—zero external mp3 downloads or network buffering required."
    },
    {
      title: "Migrating from Local Demo Mode to Production Supabase",
      desc: "All database schemas, 27 normalized tables, indexes, and user-isolated Row Level Security policies are ready in '/supabase/migrations/20261111_init.sql'. In client/src/services/authService.ts, switch the session storage to the official Supabase client to connect cloud PostgreSQL authentication in minutes."
    }
  ];

  const shortcuts = [
    { key: "Ctrl / Cmd + K", desc: "Open global search" },
    { key: "Esc", desc: "Close any modal window" },
    { key: "Space", desc: "Play / Pause Focus Timer" },
    { key: "Tab", desc: "Navigate form controls smoothly" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Documentation & Assistance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Help Center & User Guide</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Quick start tutorials, keyboard shortcuts, and detailed explanations of TimeWise system logic.
          </p>
        </div>
      </div>

      {/* Keyboard Shortcuts Card */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-brand-400" />
          <span>Keyboard Shortcuts</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {shortcuts.map((sc, i) => (
            <div key={i} className="p-3 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">{sc.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] border border-white/10">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion User Guide */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white mb-2">Feature Explanations & Walkthroughs</h3>
        <div className="space-y-3">
          {guides.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-dark-900/60 overflow-hidden"
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold text-white hover:bg-white/5 transition-colors"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-400 transition-transform ${
                    activeAccordion === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeAccordion === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                  {item.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

