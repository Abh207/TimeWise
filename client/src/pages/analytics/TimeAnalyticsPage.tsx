import React, { useState } from 'react';
import { 
  PieChart, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Trash2, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

interface TimeLeakEntry {
  id: string;
  activity: string;
  category: string;
  durationMins: number;
  reason: string;
  isIntentional: boolean;
  timestamp: string;
}

export const TimeAnalyticsPage: React.FC = () => {
  const [entries, setEntries] = useState<TimeLeakEntry[]>([
    {
      id: 'leak-1',
      activity: 'Endless Instagram & YouTube Shorts Scroll',
      category: 'Social Media',
      durationMins: 45,
      reason: 'Procrastinated starting Distributed Systems lab',
      isIntentional: false,
      timestamp: 'Today, 2:15 PM'
    },
    {
      id: 'leak-2',
      activity: 'Casual gaming break extended over time',
      category: 'Gaming',
      durationMins: 30,
      reason: 'Played one extra match with roommates',
      isIntentional: false,
      timestamp: 'Today, 5:30 PM'
    },
    {
      id: 'leak-3',
      activity: 'Mindful Netflix episode with dinner',
      category: 'Entertainment',
      durationMins: 45,
      reason: 'Planned relaxation reward after coding',
      isIntentional: true,
      timestamp: 'Yesterday, 8:00 PM'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [category, setCategory] = useState('Social Media');
  const [durationMins, setDurationMins] = useState(30);
  const [reason, setReason] = useState('');
  const [isIntentional, setIsIntentional] = useState(false);

  const totalLeakMins = entries
    .filter(e => !e.isIntentional)
    .reduce((acc, e) => acc + e.durationMins, 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    const newEntry: TimeLeakEntry = {
      id: `leak-${Date.now()}`,
      activity: activity.trim(),
      category,
      durationMins: Number(durationMins),
      reason: reason.trim(),
      isIntentional,
      timestamp: 'Just now'
    };

    setEntries([newEntry, ...entries]);
    setActivity('');
    setReason('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <PieChart className="w-3.5 h-3.5" />
            <span>Time Leak & Distraction Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Time-Waste Analysis</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Distinguish guilt-free rest from unplanned screen time leaks and recover 1–2 hours each day.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Log Unplanned Time</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Unplanned Time Lost Today</div>
          <div className="text-2xl font-extrabold text-rose-400">{totalLeakMins} mins</div>
          <div className="text-[11px] text-slate-400 mt-1">~{(totalLeakMins / 60).toFixed(1)} hours of potential deep work</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Intentional Rest & Play</div>
          <div className="text-2xl font-extrabold text-peach-300">
            {entries.filter(e => e.isIntentional).reduce((acc, e) => acc + e.durationMins, 0)} mins
          </div>
          <div className="text-[11px] text-peach-300/80 mt-1">Guilt-free recovery buffers</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Weekly Reclaim Potential</div>
          <div className="text-2xl font-extrabold text-peach-300">+5.2 hrs</div>
          <div className="text-[11px] text-peach-300/80 mt-1">Can cover 4 coding problem sets</div>
        </div>
      </div>

      {/* Time Leaks Table */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-brand-400" />
            <span>Logged Time Outlets & Overruns</span>
          </h2>
          <span className="text-xs text-slate-400">{entries.length} entries recorded</span>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-white/10 glass-card-hover bg-dark-900/60 flex items-start justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{entry.activity}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    entry.isIntentional
                      ? 'bg-peach-300/20 text-peach-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {entry.isIntentional ? 'Intentional Rest' : 'Unplanned Leak'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                    {entry.category}
                  </span>
                </div>
                {entry.reason && (
                  <p className="text-slate-400 mt-1 italic">"{entry.reason}"</p>
                )}
                <div className="mt-2 flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <Clock className="w-3 h-3 text-brand-400" /> {entry.durationMins} minutes
                  </span>
                  <span>&bull;</span>
                  <span>{entry.timestamp}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Log Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Distraction or Leisure Time"
      >
        <form onSubmit={handleAddEntry} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Activity Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Unplanned Instagram Reels & TikTok scrolling"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="Social Media">Social Media</option>
                <option value="Entertainment">Entertainment / Streaming</option>
                <option value="Unplanned Browsing">Unplanned Browsing</option>
                <option value="Gaming">Gaming</option>
                <option value="Excessive Break">Excessive Break</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Reason / Trigger
            </label>
            <input
              type="text"
              placeholder="e.g. Felt fatigued after lecture; avoidance of tough problem"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="intentional"
              checked={isIntentional}
              onChange={(e) => setIsIntentional(e.target.checked)}
              className="rounded border-slate-600 bg-dark-900 text-brand-500"
            />
            <label htmlFor="intentional" className="text-xs text-slate-300">
              This was an intentional, mindful rest block (not accidental waste)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Save Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

