import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Flame, 
  Award, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  Plus, 
  TrendingUp, 
  Calendar,
  Zap,
  Star
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const StreaksPage: React.FC = () => {
  const { habits, toggleHabit, addHabit, recoverStreak, user, updateUserPreferences } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Coding');
  const [habitTarget, setHabitTarget] = useState(60);
  const [habitUnit, setHabitUnit] = useState('mins');
  const [habitColor, setHabitColor] = useState('#8b5cf6');

  const todayStr = new Date().toISOString().split('T')[0];

  // Achievements list
  const achievements = [
    { id: 'ach-1', title: '7-Day Momentum', desc: 'Sustained any habit for a full unbroken week', unlocked: true, icon: '🔥' },
    { id: 'ach-2', title: 'Code Warrior', desc: '14+ consecutive days of coding & LeetCode', unlocked: true, icon: '💻' },
    { id: 'ach-3', title: 'Hydro Master', desc: '10 consecutive days drinking 3L water', unlocked: true, icon: '💧' },
    { id: 'ach-4', title: 'Deep Work Disciple', desc: 'Reach Level 5 Productivity XP', unlocked: user.level >= 5, icon: '⚡' },
    { id: 'ach-5', title: 'Century Club', desc: 'Complete 100 total habit sessions', unlocked: false, icon: '👑' },
  ];

  // At-risk habits (not yet completed today)
  const atRiskHabits = habits.filter(h => !h.completedDates.includes(todayStr));

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    addHabit({
      userId: user.id,
      name: habitName.trim(),
      category: habitCategory,
      frequency: 'daily',
      targetValue: Number(habitTarget),
      unit: habitUnit,
      color: habitColor
    });
    triggerConfetti();
    setHabitName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Consistency & Habit Mastery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Habit Streaks & XP System</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Track daily discipline, earn Level XP, and safeguard your streaks with built-in grace day recovery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Level</div>
            <div className="text-base font-extrabold text-brand-300">Level {user.level} &bull; {user.xp} XP</div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Habit</span>
          </button>
        </div>
      </div>

      {/* Streak Risk Alert if any uncompleted today */}
      {atRiskHabits.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-xs text-rose-200">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Streak Safeguard Warning:</span> {atRiskHabits.length} habits remain uncompleted today ({atRiskHabits.map(h => h.name).join(', ')}).
              <div className="text-[11px] text-slate-300 mt-0.5">
                Complete them before 23:00 to keep your longest streaks intact!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit) => {
          const isDoneToday = habit.completedDates.includes(todayStr);

          // Simulated last 14 days heatmap squares
          const last14Days = Array.from({ length: 14 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (13 - i));
            const str = d.toISOString().split('T')[0];
            const isCompleted = habit.completedDates.includes(str) || (i > 3 && i % 2 === 0);
            return { dateStr: str, isCompleted };
          });

          return (
            <div
              key={habit.id}
              className="p-5 rounded-2xl glass-card border border-white/10 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <h3 className="font-bold text-base text-white">{habit.name}</h3>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Target: {habit.targetValue} {habit.unit} daily &bull; {habit.category}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-extrabold text-rose-400">
                    <Flame className="w-4 h-4 fill-rose-500" />
                    <span>{habit.currentStreak} Days</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Best: {habit.longestStreak}d</div>
                </div>
              </div>

              {/* Heatmap trail */}
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 flex justify-between">
                  <span>14-Day Consistency Trail</span>
                  <span>{isDoneToday ? 'Completed Today' : 'Pending Today'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {last14Days.map((slot, i) => (
                    <div
                      key={i}
                      title={`${slot.dateStr}: ${slot.isCompleted ? 'Completed' : 'Missed'}`}
                      className={`flex-1 h-6 rounded-md transition-all ${
                        slot.isCompleted
                          ? 'bg-brand-500 shadow-glow-violet'
                          : 'bg-white/5 border border-white/5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  onClick={() => {
                    toggleHabit(habit.id);
                    if (!isDoneToday) triggerConfetti();
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isDoneToday
                      ? 'bg-peach-300 text-on-peach'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-violet'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDoneToday ? 'Completed Today ✓' : 'Mark Done Today (+30 XP)'}</span>
                </button>

                {/* Grace Recovery Button */}
                <button
                  onClick={() => {
                    recoverStreak(habit.id);
                    triggerConfetti();
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                  title="Use 1 Grace Day to protect streak after an unavoidable absence"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Grace Freeze</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges & Achievements Section */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Achievements & Mastery Milestones</h2>
          </div>
          <span className="text-xs text-brand-300 font-mono font-semibold">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                ach.unlocked
                  ? 'border-brand-500/40 bg-brand-500/10'
                  : 'border-white/5 bg-dark-900/40 opacity-50'
              }`}
            >
              <div className="text-2xl p-2 rounded-xl bg-white/5">{ach.icon}</div>
              <div>
                <div className="font-bold text-xs text-white flex items-center gap-1.5">
                  {ach.title}
                  {ach.unlocked && <span className="text-[9px] px-1.5 rounded bg-peach-300/20 text-peach-300">Unlocked</span>}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Habit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Daily Habit"
      >
        <form onSubmit={handleCreateHabit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Habit Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1 LeetCode Hard Problem"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                placeholder="Coding / Fitness / Health"
                value={habitCategory}
                onChange={(e) => setHabitCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Daily Target
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={habitTarget}
                  onChange={(e) => setHabitTarget(Number(e.target.value))}
                  className="w-20 px-3 py-2 rounded-xl glass-input text-sm"
                />
                <input
                  type="text"
                  placeholder="mins / ml / pages"
                  value={habitUnit}
                  onChange={(e) => setHabitUnit(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-2 pt-1">
              {['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setHabitColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    habitColor === c ? 'scale-110 border-white ring-2 ring-brand-500' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
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
              Start Habit Streak
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

