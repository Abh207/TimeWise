import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  User, 
  Sparkles, 
  Award, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  TrendingUp,
  Mail
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, tasks, habits, focusSessions, events } = useStore();

  const totalFocusMins = focusSessions.reduce((acc, s) => acc + s.completedMinutes, 0);
  const completedTasks = tasks.filter(t => t.isCompleted).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Profile Header Card */}
      <div className="p-8 rounded-3xl glass-card bg-gradient-to-r from-dark-900 via-dark-850 to-brand-950/40 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={user.fullName}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-brand-500/50 shadow-glow-violet"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.fullName}</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Level {user.level}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
              <span>&bull;</span>
              <span className="capitalize">{user.role}</span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl font-light mt-1">
              {user.bio || 'Computer Science & AI Major &bull; Building scalable systems and mastering data structures.'}
            </p>

            {/* Level XP Progress Bar */}
            <div className="max-w-md pt-2 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>XP Progress to Level {user.level + 1}</span>
                <span className="font-mono text-brand-300 font-bold">{user.xp} / 2000 XP</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (user.xp / 2000) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
          <Clock className="w-5 h-5 text-brand-400 mx-auto mb-2" />
          <div className="text-xl font-black text-white font-mono">{(totalFocusMins / 60).toFixed(1)}h</div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Focus Logged</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
          <CheckCircle2 className="w-5 h-5 text-peach-300 mx-auto mb-2" />
          <div className="text-xl font-black text-white font-mono">{completedTasks}</div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Tasks Done</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
          <Flame className="w-5 h-5 text-rose-400 mx-auto mb-2" />
          <div className="text-xl font-black text-white font-mono">19 Days</div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Top Streak</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
          <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <div className="text-xl font-black text-white font-mono">92%</div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Adherence Score</div>
        </div>
      </div>

      {/* Account System Status */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4 text-xs">
        <h3 className="font-bold text-sm text-white">System & Storage Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/5 space-y-1">
            <div className="text-slate-400">Storage Engine</div>
            <div className="font-semibold text-white">Local Persistent State (Adapter Pattern)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/5 space-y-1">
            <div className="text-slate-400">Database Ready</div>
            <div className="font-semibold text-peach-300">27 Supabase / PostgreSQL Tables</div>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/5 space-y-1">
            <div className="text-slate-400">Service Worker</div>
            <div className="font-semibold text-brand-300">Offline PWA & Push Notifications</div>
          </div>
        </div>
      </div>
    </div>
  );
};

