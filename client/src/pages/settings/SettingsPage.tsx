import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Settings, 
  User, 
  Clock, 
  Moon, 
  Sun, 
  Database, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const SettingsPage: React.FC = () => {
  const { 
    user, 
    updateUserPreferences, 
    theme, 
    setTheme, 
    rotationCycle, 
    setRotationCycle, 
    resetDemoData, 
    events, 
    tasks, 
    habits, 
    records 
  } = useStore();

  const [displayName, setDisplayName] = useState(user.displayName || user.fullName);
  const [role, setRole] = useState(user.role || 'student');
  const [wakeTime, setWakeTime] = useState(user.wakeTime || '07:00');
  const [sleepTime, setSleepTime] = useState(user.sleepTime || '23:00');
  const [bio, setBio] = useState(user.bio || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({
      displayName,
      role: role as any,
      wakeTime,
      sleepTime,
      bio
    });
    setIsSaved(true);
    triggerConfetti();
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportFullData = () => {
    const fullBackup = {
      user,
      events,
      tasks,
      habits,
      records,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `timewise-complete-backup-${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data back to the clean demonstration seed state?")) {
      resetDemoData();
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences & Data Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Settings</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Configure circadian rhythm hours, rotation schedule parameters, theme, and data export.
          </p>
        </div>
      </div>

      {/* Supabase Readiness Status Banner */}
      <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>Database Architecture: PostgreSQL & Supabase Ready</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Decoupled
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Your session is currently running on the high-performance local adapter. When ready for production, plug your <code className="text-emerald-300">VITE_SUPABASE_URL</code> and key in <code className="text-emerald-300">.env</code>; all 27 tables & RLS policies in <code className="text-emerald-300">/supabase/migrations</code> will take over seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Profile & Personal Rhythm Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl glass-card border border-white/10 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-bold text-sm">
          <User className="w-4 h-4 text-brand-400" />
          <span>Profile & Bio</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Primary Role Focus
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-dark-900"
            >
              <option value="student">Student / Academic</option>
              <option value="professional">Professional / Tech</option>
              <option value="freelancer">Freelancer / Creator</option>
              <option value="researcher">Researcher / Graduate</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Personal Bio / Objectives
          </label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 rounded-xl glass-input text-xs"
            placeholder="e.g. CS & AI Major | Aiming for 3.9+ GPA"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Wake Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Sleep Time
            </label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          {isSaved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-glow-violet transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Preferences
          </button>
        </div>
      </form>

      {/* Schedule Rotation & Appearance */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-bold text-sm">
          <Sliders className="w-4 h-4 text-brand-400" />
          <span>Timetable Rotation & Visual Theme</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Class Schedule Rotation Cycle
            </label>
            <div className="flex items-center gap-2">
              {['Week A', 'Week B', 'Day 1', 'Day 2'].map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setRotationCycle(cycle as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    rotationCycle === cycle
                      ? 'bg-brand-600 text-white shadow-glow-violet'
                      : 'glass text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Color Theme Mode
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-brand-600 text-white shadow-glow-violet'
                    : 'glass text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Moon className="w-4 h-4" /> Dark Surface
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  theme === 'light'
                    ? 'bg-brand-600 text-white shadow-glow-violet'
                    : 'glass text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" /> Light Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export & Reset Sandbox */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-bold text-sm">
          <Database className="w-4 h-4 text-brand-400" />
          <span>Data Governance & Backup</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-white">Full Platform JSON Snapshot</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Download your entire dataset including schedules, tasks, habits, focus logs, and records.
            </p>
          </div>
          <button
            onClick={handleExportFullData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold glass border border-white/10 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Backup (.JSON)</span>
          </button>
        </div>

        <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-rose-400">Reset Demo Data State</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Clear local modifications and re-populate the standard demonstration seed records.
            </p>
          </div>
          <button
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

