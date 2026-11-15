import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Flame, 
  AlertTriangle, 
  PieChart as PieIcon, 
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { events, tasks, habits, focusSessions } = useStore();

  const totalFocusMins = focusSessions.reduce((acc, s) => acc + s.completedMinutes, 0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Category distribution data
  const categoryData = [
    { name: 'Academic', hours: 4.5, color: '#8b5cf6' },
    { name: 'Study', hours: 3.0, color: '#3b82f6' },
    { name: 'Work', hours: 2.5, color: '#6366f1' },
    { name: 'Health', hours: 1.5, color: '#ef4444' },
    { name: 'Break', hours: 1.0, color: '#10b981' },
  ];

  // Weekly Trend
  const weeklyData = [
    { day: 'Mon', planned: 7.5, actual: 6.8, wasted: 0.7 },
    { day: 'Tue', planned: 8.0, actual: 7.4, wasted: 0.6 },
    { day: 'Wed', planned: 7.0, actual: 6.0, wasted: 1.0 },
    { day: 'Thu', planned: 8.5, actual: 8.1, wasted: 0.4 },
    { day: 'Fri', planned: 6.5, actual: 5.5, wasted: 1.0 },
    { day: 'Sat', planned: 6.0, actual: 6.2, wasted: 0.5 },
    { day: 'Sun', planned: 5.0, actual: 4.5, wasted: 1.2 },
  ];

  // Hourly Productivity Curve
  const hourlyCurve = [
    { hour: '8 AM', score: 65 },
    { hour: '10 AM', score: 94 },
    { hour: '12 PM', score: 82 },
    { hour: '2 PM', score: 70 },
    { hour: '4 PM', score: 88 },
    { hour: '6 PM', score: 78 },
    { hour: '8 PM', score: 85 },
    { hour: '10 PM', score: 60 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Telemetry & Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Productivity & Time Analytics</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Measure planned vs actual time, detect hidden time leaks, and identify your circadian focus peak.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Average Adherence</div>
          <div className="text-base font-extrabold text-brand-300">89.4% Exceptional</div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-400" /> Focus Hours Logged
          </div>
          <div className="text-2xl font-extrabold text-white">
            {(totalFocusMins / 60).toFixed(1)}h
          </div>
          <div className="text-[11px] text-lime-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +1.2 hrs vs last week
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Task Completion Rate
          </div>
          <div className="text-2xl font-extrabold text-white">
            {taskCompletionRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {completedTasks} completed of {totalTasks} total
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-400" /> Longest Active Streak
          </div>
          <div className="text-2xl font-extrabold text-white">
            19 Days
          </div>
          <div className="text-[11px] text-rose-400 mt-1">
            LeetCode & Coding habit
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Estimated Time Leak
          </div>
          <div className="text-2xl font-extrabold text-white">
            1.1 hrs / day
          </div>
          <div className="text-[11px] text-amber-400 mt-1">
            Down from 2.4 hrs baseline
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Planned vs Actual Hours */}
        <div className="p-5 rounded-2xl glass-card border border-white/10">
          <h3 className="text-sm font-bold text-white mb-1">Weekly Hours: Planned vs Productive vs Wasted</h3>
          <p className="text-xs text-slate-400 mb-4">Comparison of planned timetable slots vs actual execution.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} 
                />
                <Bar dataKey="actual" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Productive" />
                <Bar dataKey="wasted" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Wasted / Leak" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Circadian Productivity Curve */}
        <div className="p-5 rounded-2xl glass-card border border-white/10">
          <h3 className="text-sm font-bold text-white mb-1">Circadian Focus Efficiency by Hour</h3>
          <p className="text-xs text-slate-400 mb-4">Your peak focus window reliably occurs between 10 AM - 12 PM.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyCurve}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} />
                <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#focusGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Smart Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-card border border-white/10 lg:col-span-1">
          <h3 className="text-sm font-bold text-white mb-4">Time Distribution by Category</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="hours" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-mono text-white font-semibold">{cat.hours} hrs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>AI Rule-Based Schedule Insights</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-dark-900/80 border border-white/10">
              <div className="font-semibold text-white">1. High Energy Utilization</div>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                You complete 82% of LeetCode and programming tasks when scheduled before 1 PM. Keep evening blocks reserved for lighter reading and exercise.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-dark-900/80 border border-white/10">
              <div className="font-semibold text-white">2. Wednesday Midday Slump</div>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Historical logs show an extra 45 min idle time on Wednesday afternoons. TimeWise recommends adding a 20-minute mindful walk break at 2:00 PM.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-dark-900/80 border border-white/10">
              <div className="font-semibold text-white">3. Travel Buffer Optimization</div>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                Transit between CS Hall 301 and Tech Hub B204 took an average of 12 minutes. The 15-minute automatic buffer prevented any tardiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

