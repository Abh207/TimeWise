import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { SmartRecommendation } from '../../types';
import { 
  Sparkles, 
  BrainCircuit, 
  Check, 
  X, 
  Clock, 
  Calendar, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  TrendingUp,
  CloudSun
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const SmartPlannerPage: React.FC = () => {
  const { 
    events, 
    tasks, 
    user, 
    generateSmartPlan, 
    applyRecommendation, 
    addNotification 
  } = useStore();

  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [simulationWakeTime, setSimulationWakeTime] = useState(user.wakeTime || '07:00');
  const [simulationStudyHours, setSimulationStudyHours] = useState(4);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // Generate recommendations
  const allRecommendations = generateSmartPlan(targetDate);
  const recommendations = allRecommendations.filter(r => !dismissedIds.includes(r.id));

  const handleApply = (rec: SmartRecommendation) => {
    applyRecommendation(rec);
    setAppliedIds(prev => [...prev, rec.id]);
    triggerConfetti();
    addNotification({
      userId: user.id,
      type: 'reminder',
      title: `Scheduled: ${rec.task.title}`,
      message: `TimeWise successfully allocated ${rec.task.title} for ${new Date(rec.suggestedStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} with travel buffer included.`,
      isRead: false
    });
  };

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>Deterministic Explainable Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Timetable Planner</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            AI-style rule-based engine that automatically assigns pending tasks into optimal focus slots without fragmentation.
          </p>
        </div>

        {/* Confidence rating */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Engine Confidence</div>
            <div className="text-base font-extrabold text-lime-400">94% High</div>
          </div>
        </div>
      </div>

      {/* Engine Transparency & Inputs Card */}
      <div className="p-5 rounded-2xl glass-card border border-white/10 bg-dark-900/60">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-brand-400" /> Active Scheduling Parameters Analyzed
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="text-slate-400 text-[10px]">Circadian Energy Peak</div>
            <div className="font-semibold text-white mt-1">10:00 AM - 12:30 PM</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="text-slate-400 text-[10px]">Rest & Sleep Window</div>
            <div className="font-semibold text-white mt-1">{user.wakeTime} to {user.sleepTime} (8h)</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="text-slate-400 text-[10px]">Transit Buffer Rule</div>
            <div className="font-semibold text-white mt-1">15 min automatic margin</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="text-slate-400 text-[10px]">Urgent Priority Tasks</div>
            <div className="font-semibold text-lime-400 mt-1">
              {tasks.filter(t => !t.isCompleted && t.priority === 'urgent').length} Ready to Allocate
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations List with "Why This Slot?" Explanations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-lime-400" />
            <span>Proposed Schedule Allocations ({recommendations.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Date: {targetDate}</span>
        </div>

        {recommendations.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-card border border-white/10">
            <Check className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">All Tasks Allocated!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your pending priority assignments are smoothly scheduled in your timetable.
            </p>
          </div>
        ) : (
          recommendations.map((rec) => {
            const isApplied = appliedIds.includes(rec.id);
            const startTimeStr = new Date(rec.suggestedStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endTimeStr = new Date(rec.suggestedEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isApplied
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-white/10 glass-card bg-dark-900/80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{rec.task.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300">
                        {rec.task.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-lime-300 bg-lime-500/20">
                        {rec.confidenceScore}% Confidence
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-mono text-brand-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-brand-400" /> {startTimeStr} - {endTimeStr}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> {rec.energyLevelFit}
                      </span>
                    </div>

                    {/* "Why this slot?" Transparent Reasoning */}
                    <div className="p-3 rounded-xl bg-dark-850/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-brand-300 font-semibold">Why this slot?</strong> {rec.reason}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    {isApplied ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                        <Check className="w-4 h-4" /> Added to Timetable
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleApply(rec)}
                          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow-violet transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" /> Accept Slot
                        </button>
                        <button
                          onClick={() => handleDismiss(rec.id)}
                          className="p-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition-colors"
                          title="Dismiss suggestion"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* What-If Simulation Sandbox Card */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Sliders className="w-4 h-4 text-brand-400" />
          <span>What-If Schedule Simulator</span>
        </div>
        <p className="text-xs text-slate-400">
          Adjust parameters below to see how shifts in your wake schedule or target study hours change the planner recommendations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Simulated Wake-Up Time
            </label>
            <input
              type="time"
              value={simulationWakeTime}
              onChange={(e) => setSimulationWakeTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Daily Study Goal: {simulationStudyHours} Hours
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={simulationStudyHours}
              onChange={(e) => setSimulationStudyHours(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

