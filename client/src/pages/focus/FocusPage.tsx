import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { ambientAudioService } from '../../services/audioService';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  CloudRain, 
  Wind, 
  Waves, 
  Radio, 
  ListTodo
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const FocusPage: React.FC = () => {
  const { tasks, logFocusSession, focusSessions } = useStore();

  const [mode, setMode] = useState<'pomodoro' | 'deep_work' | 'short_break' | 'long_break'>('pomodoro');
  const [durationMins, setDurationMins] = useState(25);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.id || '');
  const [distractionCount, setDistractionCount] = useState(0);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);

  // Sync initial duration when mode changes
  const switchMode = (newMode: 'pomodoro' | 'deep_work' | 'short_break' | 'long_break') => {
    setIsActive(false);
    setMode(newMode);
    let mins = 25;
    if (newMode === 'deep_work') mins = 50;
    else if (newMode === 'short_break') mins = 5;
    else if (newMode === 'long_break') mins = 15;

    setDurationMins(mins);
    setTimeLeftSeconds(mins * 60);
  };

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeftSeconds === 0) {
      // Completed session!
      setIsActive(false);
      ambientAudioService.stop();
      ambientAudioService.playCompletionChime();
      setActiveSound(null);
      triggerConfetti();

      const task = tasks.find(t => t.id === selectedTaskId);
      logFocusSession({
        userId: 'usr-demo-01',
        taskId: selectedTaskId || undefined,
        taskTitle: task?.title,
        mode: mode === 'deep_work' ? 'deep_work' : 'pomodoro',
        durationMinutes: durationMins,
        completedMinutes: durationMins,
        distractionCount
      });
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeftSeconds, mode, durationMins, distractionCount, selectedTaskId, tasks, logFocusSession]);

  // Ambient sound player
  const handleToggleSound = (type: 'rain' | 'whitenoise' | 'ocean' | 'binaural') => {
    if (activeSound === type) {
      ambientAudioService.stop();
      setActiveSound(null);
    } else {
      ambientAudioService.setVolume(volume);
      ambientAudioService.play(type);
      setActiveSound(type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientAudioService.setVolume(newVol);
  };

  // Format MM:SS
  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const timeFormatted = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Timer className="w-3.5 h-3.5" />
            <span>Deep Work & Focus Chamber</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Focus Session Studio</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Distraction-free environment with procedural ambient sounds and Pomodoro telemetry.
          </p>
        </div>

        {/* Total Sessions Today Badge */}
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Completed Today</div>
          <div className="text-base font-extrabold text-cyan-300">
            {focusSessions.length} Sessions &bull; {focusSessions.reduce((acc, s) => acc + s.completedMinutes, 0)} mins
          </div>
        </div>
      </div>

      {/* Main Focus Chamber Box */}
      <div className="max-w-3xl mx-auto p-8 rounded-3xl glass-card bg-gradient-to-b from-dark-900 to-dark-950 border border-white/10 text-center relative overflow-hidden shadow-2xl">
        {/* Glow backdrop pulse */}
        <div className={`absolute inset-0 bg-brand-500/10 blur-[100px] pointer-events-none transition-opacity duration-1000 ${
          isActive ? 'opacity-100' : 'opacity-40'
        }`} />

        {/* Mode selector pills */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl glass border border-white/10 text-xs mb-8 relative z-10">
          {[
            { id: 'pomodoro', label: 'Pomodoro (25m)' },
            { id: 'deep_work', label: 'Deep Work (50m)' },
            { id: 'short_break', label: 'Short Break (5m)' },
            { id: 'long_break', label: 'Long Break (15m)' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id as any)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                mode === m.id
                  ? 'bg-brand-600 text-white shadow-glow-violet'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Active Task Selector */}
        <div className="max-w-md mx-auto mb-8 relative z-10">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Target Focus Task
          </label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-200 bg-dark-900 border border-white/10 text-center"
          >
            <option value="">-- General Unassigned Focus --</option>
            {tasks.filter(t => !t.isCompleted).map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.priority.toUpperCase()} - {t.estimatedMinutes}m)
              </option>
            ))}
          </select>
        </div>

        {/* Large Live Digital Countdown */}
        <div className="my-8 relative z-10 font-mono text-6xl sm:text-8xl font-black tracking-tight text-white drop-shadow-md">
          {timeFormatted}
        </div>

        {/* Play / Pause / Reset Action Controls */}
        <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow-violet transition-all hover:scale-105 flex items-center gap-2"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause Session' : 'Start Focus Flow'}</span>
          </button>
          <button
            onClick={() => {
              setIsActive(false);
              setTimeLeftSeconds(durationMins * 60);
            }}
            className="p-3.5 rounded-2xl glass hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Distraction Logger Counter */}
        <div className="inline-flex items-center gap-3 p-2.5 rounded-xl glass border border-white/10 text-xs text-slate-300 relative z-10">
          <span>Distractions recorded: <strong className="text-amber-400 font-mono">{distractionCount}</strong></span>
          <button
            onClick={() => setDistractionCount(prev => prev + 1)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px]"
          >
            + Log Distraction
          </button>
        </div>
      </div>

      {/* Web Audio Ambient Sound Controls */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Procedural Ambient Audio Synthesizer</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Generated in real-time by Web Audio API &bull; No external streaming required.
            </p>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-24 accent-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'rain', label: 'Gentle Rain', icon: CloudRain },
            { id: 'whitenoise', label: 'Pink Noise', icon: Wind },
            { id: 'ocean', label: 'Ocean Waves', icon: Waves },
            { id: 'binaural', label: '40Hz Gamma Focus', icon: Radio },
          ].map((snd) => {
            const isPlaying = activeSound === snd.id;
            return (
              <button
                key={snd.id}
                onClick={() => handleToggleSound(snd.id as any)}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
                  isPlaying
                    ? 'border-brand-500 bg-brand-500/20 text-brand-300 shadow-glow-violet'
                    : 'border-white/10 glass text-slate-300 hover:border-white/20'
                }`}
              >
                <snd.icon className={`w-5 h-5 ${isPlaying ? 'text-brand-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{snd.label}</span>
                <span className="text-[10px] text-slate-400">
                  {isPlaying ? 'Playing' : 'Click to play'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

