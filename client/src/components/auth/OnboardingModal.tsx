import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { User, Sun, Moon, Target, MapPin, Check, ArrowRight } from 'lucide-react';
import { triggerConfetti } from '../ui/Confetti';

export const OnboardingModal: React.FC = () => {
  const { user, updateUserPreferences } = useStore();
  const [step, setStep] = useState(1);

  // Form states
  const [role, setRole] = useState(user.role || 'student');
  const [wakeTime, setWakeTime] = useState(user.wakeTime || '07:00');
  const [sleepTime, setSleepTime] = useState(user.sleepTime || '23:00');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Academic Excellence & 4.0 GPA',
    'Daily Coding / DSA Habit'
  ]);
  const [locationStatus, setLocationStatus] = useState<string>('Not configured');

  if (user.onboardingCompleted) {
    return null;
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      setLocationStatus('Requesting browser permission...');
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationStatus('Location granted successfully!');
          updateUserPreferences({ locationPermissionGranted: true });
        },
        () => {
          setLocationStatus('Permission denied. TimeWise will use manual city selection.');
          updateUserPreferences({ locationPermissionGranted: false });
        }
      );
    } else {
      setLocationStatus('Geolocation unsupported on this browser.');
    }
  };

  const handleFinish = () => {
    updateUserPreferences({
      role: role as any,
      wakeTime,
      sleepTime,
      onboardingCompleted: true
    });
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-card bg-dark-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 animate-scaleUp">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-brand-400">
              Personalizing Your System
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Welcome to TimeWise, {user.displayName || 'friend'}!
            </h2>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-7 h-1.5 rounded-full transition-all ${
                  step === s ? 'bg-brand-500 w-10 shadow-glow-violet' : step > s ? 'bg-brand-700' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Role & Daily Rhythm */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What describes your primary focus?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'student', label: 'Student / Academic', desc: 'Classes, exams, study schedules' },
                  { id: 'professional', label: 'Professional / Tech', desc: 'Projects, deep work, meetings' },
                  { id: 'freelancer', label: 'Freelancer / Creator', desc: 'Flexible blocks, client deliverables' },
                  { id: 'researcher', label: 'Researcher / Grad', desc: 'Reading, lab time, writing' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      role === item.id
                        ? 'border-brand-500 bg-brand-500/10 shadow-glow-violet text-white'
                        : 'border-white/10 bg-dark-850/50 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Typical Wake Time
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" /> Target Sleep Time
                </label>
                <input
                  type="time"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium shadow-glow-violet transition-all"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Key Goals */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Select your primary goals for this term:
              </label>
              <p className="text-xs text-slate-400 mb-4">
                TimeWise will tailor smart timetable suggestions and streak targets to these.
              </p>
              <div className="space-y-2.5">
                {[
                  'Academic Excellence & 4.0 GPA',
                  'Daily Coding / DSA Habit',
                  'Deep Work (2+ hours distraction-free)',
                  'Consistent Fitness & Gym Routines',
                  'Eliminate Unplanned Screen Distractions',
                  'Balanced Sleep Rhythm & Hydration'
                ].map((goal) => {
                  const selected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${
                        selected
                          ? 'border-brand-500 bg-brand-500/10 text-brand-300 shadow-glow-violet'
                          : 'border-white/10 bg-dark-850/50 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Target className="w-4 h-4 text-brand-400" />
                        {goal}
                      </span>
                      {selected && <Check className="w-4 h-4 text-brand-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-slate-400 hover:text-white text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium shadow-glow-violet transition-all"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Location & Weather Permission */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-4 border border-brand-500/30">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Enable Weather & Commute Planning</h3>
              <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
                TimeWise dynamically shifts outdoor activities if rain or extreme temperatures are forecast, and estimates travel buffers.
              </p>
            </div>

            <div className="p-4 rounded-xl glass border border-white/10 text-center">
              <div className="text-xs text-slate-400 mb-2">Location Status</div>
              <div className="text-sm font-semibold text-slate-200">{locationStatus}</div>
              <button
                type="button"
                onClick={requestLocation}
                className="mt-3 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Detect Location via Browser
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-slate-400 hover:text-white text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-glow-violet transition-all"
              >
                Launch TimeWise Dashboard <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

