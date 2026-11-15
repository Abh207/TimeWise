import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  FileText, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Clock, 
  Save, 
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const ReviewsPage: React.FC = () => {
  const { events, tasks, habits, focusSessions, addRecord, user } = useStore();
  const [reviewType, setReviewType] = useState<'daily' | 'weekly'>('daily');

  // Form states
  const [whatWentWell, setWhatWentWell] = useState('Crushed the LeetCode DP session and stayed fully hydrated.');
  const [whatWasMissed, setWhatWasMissed] = useState('Procrastinated 30 minutes before starting the Distributed Systems lab.');
  const [tomorrowAdjustments, setTomorrowAdjustments] = useState('Move gym workout to 5 PM before dinner to avoid peak crowd.');
  const [productivityRating, setProductivityRating] = useState(4);
  const [isSaved, setIsSaved] = useState(false);

  // Auto-calculated telemetry
  const completedTasksCount = tasks.filter(t => t.isCompleted).length;
  const completedHabitsCount = habits.filter(h => h.completedDates.length > 0).length;
  const totalFocusMins = focusSessions.reduce((acc, s) => acc + s.completedMinutes, 0);

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    addRecord({
      userId: user.id,
      type: 'daily_log',
      title: `${reviewType === 'daily' ? 'Daily' : 'Weekly'} Reflection Review`,
      category: 'Reflection',
      recordDate: new Date().toISOString().split('T')[0],
      tags: ['Review', 'Reflection', 'Discipline'],
      details: {
        journalNotes: `Went Well: ${whatWentWell}\nMissed/Challenges: ${whatWasMissed}\nTomorrow's Focus: ${tomorrowAdjustments}`,
        customFields: { rating: productivityRating }
      }
    });

    setIsSaved(true);
    triggerConfetti();
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Deliberate Practice & Reflection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Daily & Weekly Reviews</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Synthesize what happened, measure planned vs executed hours, and calibrate tomorrow's timetable.
          </p>
        </div>

        {/* Review Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl glass border border-white/10 text-xs">
          <button
            onClick={() => setReviewType('daily')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              reviewType === 'daily' ? 'bg-brand-600 text-white shadow-glow-violet' : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Review
          </button>
          <button
            onClick={() => setReviewType('weekly')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              reviewType === 'weekly' ? 'bg-brand-600 text-white shadow-glow-violet' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Review
          </button>
        </div>
      </div>

      {/* Auto-Generated Summary Telemetry Card */}
      <div className="p-6 rounded-2xl glass-card border border-brand-500/30 bg-gradient-to-r from-dark-900 via-dark-850 to-brand-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Telemetry Summary Generated From Recorded Data</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Live Telemetry Sync</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5">
            <div className="text-slate-400">Tasks Completed</div>
            <div className="font-extrabold text-lg text-white mt-1">{completedTasksCount} / {tasks.length}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5">
            <div className="text-slate-400">Focus Hours Logged</div>
            <div className="font-extrabold text-lg text-cyan-300 mt-1">{(totalFocusMins / 60).toFixed(1)} hrs</div>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5">
            <div className="text-slate-400">Habits Sustained</div>
            <div className="font-extrabold text-lg text-rose-400 mt-1">{completedHabitsCount} habits</div>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5">
            <div className="text-slate-400">Adherence Score</div>
            <div className="font-extrabold text-lg text-lime-400 mt-1">91% Superior</div>
          </div>
        </div>
      </div>

      {/* Reflection Form */}
      <form onSubmit={handleSaveReview} className="p-6 rounded-2xl glass-card border border-white/10 space-y-6">
        <h2 className="text-base font-bold text-white">
          {reviewType === 'daily' ? "Today's Guided Reflection" : "Weekly Executive Review"}
        </h2>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            1. What went well today? (Wins, breakthroughs, focus sessions)
          </label>
          <textarea
            rows={3}
            value={whatWentWell}
            onChange={(e) => setWhatWentWell(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
            placeholder="Record major accomplishments and completed commitments..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            2. What caused friction or delays? (Distractions, overruns, missed activities)
          </label>
          <textarea
            rows={3}
            value={whatWasMissed}
            onChange={(e) => setWhatWasMissed(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
            placeholder="Identify time leaks or where duration was underestimated..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            3. What will you calibrate for tomorrow? (Schedule adjustments & single priority)
          </label>
          <textarea
            rows={3}
            value={tomorrowAdjustments}
            onChange={(e) => setTomorrowAdjustments(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
            placeholder="Define the primary focus and any timetable shifts..."
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Overall Productivity Rating
          </label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setProductivityRating(star)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  productivityRating >= star
                    ? 'bg-amber-500 text-white shadow-glow-violet'
                    : 'bg-white/5 text-slate-500 hover:text-white'
                }`}
              >
                ★ {star}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {isSaved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Reflection saved to Life Records!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow-violet transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Review to Logbook</span>
          </button>
        </div>
      </form>
    </div>
  );
};

