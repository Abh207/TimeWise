import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Goal } from '../../types';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Trash2, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const GoalsPage: React.FC = () => {
  const { goals, addGoal, updateGoal, toggleMilestone, user } = useStore();
  const [timeframeFilter, setTimeframeFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'yearly'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [targetDate, setTargetDate] = useState('2026-12-31');
  const [milestonesInput, setMilestonesInput] = useState('');

  const filteredGoals = goals.filter(g => {
    if (timeframeFilter !== 'all' && g.timeframe !== timeframeFilter) return false;
    return true;
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const milestones = milestonesInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map((m, i) => ({ id: `m-${Date.now()}-${i}`, title: m, isCompleted: false }));

    addGoal({
      userId: user.id,
      title: title.trim(),
      description: description.trim(),
      timeframe,
      targetDate,
      progressPercentage: 0,
      milestones,
      status: 'in_progress'
    });

    triggerConfetti();
    setTitle('');
    setDescription('');
    setMilestonesInput('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400 mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>North Star & Vision Trajectory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Goals & Milestones</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Deconstruct semester ambitions, GPA targets, and technical skills into trackable milestones.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create Goal</span>
        </button>
      </div>

      {/* Timeframe Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl glass border border-white/10 text-xs w-fit">
        {['all', 'daily', 'weekly', 'monthly', 'yearly'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframeFilter(tf as any)}
            className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
              timeframeFilter === tf
                ? 'bg-brand-600 text-white shadow-glow-violet font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => {
          const isDone = goal.progressPercentage === 100;

          return (
            <div
              key={goal.id}
              className={`p-6 rounded-2xl glass-card border transition-all space-y-4 ${
                isDone ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300">
                      {goal.timeframe}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Target: {goal.targetDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1.5">{goal.title}</h3>
                  {goal.description && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                      {goal.description}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-brand-300 font-mono">
                    {goal.progressPercentage}%
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize">{goal.status.replace('_', ' ')}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-indigo-500'
                  }`}
                  style={{ width: `${goal.progressPercentage}%` }}
                />
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Milestones ({goal.milestones.filter(m => m.isCompleted).length} / {goal.milestones.length})
                </div>
                <div className="space-y-2">
                  {goal.milestones.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        toggleMilestone(goal.id, m.id);
                        if (!m.isCompleted) triggerConfetti();
                      }}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs border transition-all ${
                        m.isCompleted
                          ? 'border-emerald-500/20 bg-emerald-500/5 text-slate-300 line-through'
                          : 'border-white/5 bg-dark-900/40 text-slate-200 hover:border-white/10'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          m.isCompleted ? 'text-emerald-400' : 'text-slate-600'
                        }`}
                      />
                      <span>{m.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Goal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Establish New Vision Goal"
      >
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Goal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Distributed Systems & Build Raft Cluster"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Description / Significance
            </label>
            <textarea
              rows={2}
              placeholder="Why this milestone matters to your academic or professional career..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Timeframe Horizon
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="daily">Daily Goal</option>
                <option value="weekly">Weekly Goal</option>
                <option value="monthly">Monthly Goal</option>
                <option value="yearly">Yearly Goal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Deadline
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Milestones (One per line)
            </label>
            <textarea
              rows={4}
              placeholder="Read Raft paper&#10;Implement leader election timer&#10;Pass consensus partition tests"
              value={milestonesInput}
              onChange={(e) => setMilestonesInput(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-xs font-mono"
            />
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
              Create Goal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

