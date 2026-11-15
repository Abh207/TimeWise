import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Clock, 
  Calendar, 
  CheckSquare, 
  Flame, 
  Timer, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  CloudSun, 
  MapPin, 
  TrendingUp, 
  Activity, 
  Award,
  Zap,
  Play
} from 'lucide-react';
import { QuickCreateModal } from '../../components/ui/QuickCreateModal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    events, 
    tasks, 
    habits, 
    focusSessions, 
    toggleTaskComplete, 
    toggleHabit, 
    completeEvent, 
    detectConflicts,
    rotationCycle,
    weather,
    fetchLiveWeather
  } = useStore();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed' | 'high'>('pending');
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [quickCreateTab, setQuickCreateTab] = useState<'task' | 'event' | 'habit'>('task');

  // Clock interval
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather on mount if not loaded
  useEffect(() => {
    if (!weather) {
      fetchLiveWeather(37.7749, -122.4194, 'Campus');
    }
  }, [weather, fetchLiveWeather]);

  // Greeting based on hour
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Conflict detection
  const conflicts = detectConflicts();

  // Tasks calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const taskProgressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filtered tasks
  const filteredTasks = tasks.filter(t => {
    if (taskFilter === 'pending') return !t.isCompleted;
    if (taskFilter === 'completed') return t.isCompleted;
    if (taskFilter === 'high') return !t.isCompleted && (t.priority === 'high' || t.priority === 'urgent');
    return true;
  });

  // Next scheduled event & countdown
  const nowMs = currentTime.getTime();
  const upcomingEvents = events
    .filter(e => new Date(e.startTime).getTime() > nowMs && e.status === 'scheduled')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const nextEvent = upcomingEvents[0];
  let countdownStr = 'No upcoming commitments';
  if (nextEvent) {
    const diffMins = Math.round((new Date(nextEvent.startTime).getTime() - nowMs) / 60000);
    if (diffMins < 60) {
      countdownStr = `Starts in ${diffMins} min${diffMins === 1 ? '' : 's'}`;
    } else {
      const diffHrs = Math.floor(diffMins / 60);
      const remMins = diffMins % 60;
      countdownStr = `Starts in ${diffHrs}h ${remMins}m`;
    }
  }

  // Habits completed today
  const todayStr = currentTime.toISOString().split('T')[0];
  const habitsDoneToday = habits.filter(h => h.completedDates.includes(todayStr)).length;
  const habitCompletionPct = habits.length > 0 ? Math.round((habitsDoneToday / habits.length) * 100) : 0;

  // Focus time today
  const totalFocusMins = focusSessions.reduce((acc, s) => acc + s.completedMinutes, 0);

  const openQuickAdd = (tab: 'task' | 'event' | 'habit') => {
    setQuickCreateTab(tab);
    setIsQuickCreateOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Welcome Section & Live Clock Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card bg-gradient-to-r from-dark-900 via-dark-850 to-brand-950/30 border border-white/10 shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute right-0 top-0 w-80 h-40 bg-brand-500/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-peach-300" />
            <span>Cycle: {rotationCycle} &bull; Productivity Status: Optimal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {greeting}, {user.displayName || user.fullName}!
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl font-light leading-relaxed">
            "Your energy flows where your focus goes." You have {upcomingEvents.length} scheduled commitments and {tasks.filter(t => !t.isCompleted).length} active priorities today.
          </p>
        </div>

        {/* Live Clock & Productivity Score */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-3 rounded-xl bg-dark-950/70 border border-white/10 text-center font-mono">
            <div className="text-[10px] uppercase font-bold text-slate-400">Local Time</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] text-slate-400">
              {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-brand-500/15 border border-brand-500/30 text-center">
            <div className="text-[10px] uppercase font-bold text-brand-300">Daily Score</div>
            <div className="text-base sm:text-lg font-black text-brand-300 mt-0.5">88%</div>
            <div className="text-[10px] text-peach-300 font-semibold">+6% vs avg</div>
          </div>
        </div>
      </div>

      {/* 2. Conflict or Weather Recommendation Alerts if present */}
      {conflicts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Schedule Conflict Detected ({conflicts.length})</div>
              <p className="mt-0.5 text-amber-200/90 leading-relaxed">
                {conflicts[0].resolutionSuggestion}
              </p>
            </div>
          </div>
          <Link
            to="/app/timetable"
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-lg text-xs whitespace-nowrap transition-colors"
          >
            Resolve in Timetable →
          </Link>
        </div>
      )}

      {/* 3. Key Productivity Progress Cards (4-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Next Activity Countdown */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-400" /> Next Activity
            </span>
            <span className="text-[10px] text-brand-400 font-mono font-bold">LIVE</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white truncate">
              {nextEvent ? nextEvent.title : 'All commitments finished'}
            </div>
            <div className="text-xs text-peach-300 font-medium mt-1">
              {countdownStr}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>{nextEvent?.location || 'Self-paced'}</span>
            <Link to="/app/timetable" className="text-brand-400 hover:underline">View</Link>
          </div>
        </div>

        {/* Card 2: Task Completion Progress */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-peach-300" /> Tasks Done
            </span>
            <span className="text-xs font-bold text-peach-300">{taskProgressPct}%</span>
          </div>
          <div>
            <div className="text-xl font-extrabold text-white">
              {completedTasks} <span className="text-xs text-slate-400 font-normal">/ {totalTasks} tasks</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-peach-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${taskProgressPct}%` }}
              />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>{tasks.filter(t => !t.isCompleted).length} remaining</span>
            <Link to="/app/tasks" className="text-brand-400 hover:underline">Manage</Link>
          </div>
        </div>

        {/* Card 3: Habit Consistency */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-400" /> Habit Streaks
            </span>
            <span className="text-xs font-bold text-rose-400">{habitCompletionPct}%</span>
          </div>
          <div>
            <div className="text-xl font-extrabold text-white">
              {habitsDoneToday} <span className="text-xs text-slate-400 font-normal">/ {habits.length} habits today</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${habitCompletionPct}%` }}
              />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Top Streak: 19 days</span>
            <Link to="/app/streaks" className="text-brand-400 hover:underline">Streaks</Link>
          </div>
        </div>

        {/* Card 4: Focus Time Logged */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-cyan-400" /> Focus Time
            </span>
            <span className="text-xs font-bold text-cyan-400">{totalFocusMins}m</span>
          </div>
          <div>
            <div className="text-xl font-extrabold text-white">
              {(totalFocusMins / 60).toFixed(1)} <span className="text-xs text-slate-400 font-normal">hours logged</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalFocusMins / 180) * 100)}%` }}
              />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: 3.0 hrs</span>
            <Link to="/app/focus" className="text-brand-400 hover:underline">Focus Mode</Link>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Layout: Today's Schedule Timeline (Left) & Today's Tasks + Habits (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Today's Schedule Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-400" />
                <h2 className="text-base font-bold text-white">Today's Schedule & Classes</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openQuickAdd('event')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-medium shadow-glow-violet transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Activity
                </button>
                <Link
                  to="/app/timetable"
                  className="text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Full View →
                </Link>
              </div>
            </div>

            {/* Timeline Events List */}
            <div className="space-y-3">
              {events.map((event) => {
                const startTime = new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const endTime = new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const isDone = event.status === 'completed';

                return (
                  <div
                    key={event.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isDone
                        ? 'border-white/5 bg-white/2 opacity-75'
                        : 'border-white/10 glass-card-hover bg-dark-900/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Checkbox */}
                      <button
                        onClick={() => {
                          completeEvent(event.id);
                          if (!isDone) triggerConfetti();
                        }}
                        className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-peach-300 border-peach-300 text-on-peach'
                            : 'border-slate-500 hover:border-brand-400 text-transparent'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark activity completed'}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {event.title}
                          </span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: `${event.color}25`, color: event.color }}
                          >
                            {event.category}
                          </span>
                        </div>

                        {event.description && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{event.description}</p>
                        )}

                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-mono text-slate-300">
                            <Clock className="w-3 h-3 text-brand-400" />
                            {startTime} - {endTime}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {event.location}
                            </span>
                          )}
                          {event.travelTimeMinutes && event.travelTimeMinutes > 0 && (
                            <span className="text-[10px] text-brand-300 bg-brand-500/10 px-1.5 py-0.5 rounded">
                              +{event.travelTimeMinutes}m transit
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isDone
                          ? 'bg-peach-300/20 text-peach-300'
                          : 'bg-brand-500/20 text-brand-300'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smart Planner Suggestion Box */}
          <div className="p-4 rounded-2xl glass-card border border-brand-500/30 bg-gradient-to-r from-brand-950/40 to-dark-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-peach-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Smart Planner Engine Active</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-peach-300/20 text-peach-300 font-mono">
                    Explainable AI
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 font-light">
                  Have unplanned assignments? The Smart Planner analyzes historical focus windows and weather to generate your optimal timetable.
                </p>
              </div>
            </div>
            <Link
              to="/app/smart-planner"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet whitespace-nowrap transition-all"
            >
              Open Planner →
            </Link>
          </div>
        </div>

        {/* Right Column: Tasks + Habits Tracker */}
        <div className="space-y-6">
          {/* Today's Tasks Card */}
          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-peach-300" />
                <h3 className="text-base font-bold text-white">Today's Tasks</h3>
              </div>
              <button
                onClick={() => openQuickAdd('task')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Add task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Filter chips */}
            <div className="flex gap-1.5 pb-3 border-b border-white/10 mb-3 text-[11px]">
              {(['pending', 'high', 'completed', 'all'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                    taskFilter === filter
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Task list */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {filteredTasks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No tasks in this view.</p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 transition-all ${
                      task.isCompleted
                        ? 'border-white/5 bg-white/2 opacity-70'
                        : 'border-white/10 bg-dark-900/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => {
                          toggleTaskComplete(task.id);
                          if (!task.isCompleted) triggerConfetti();
                        }}
                        className="mt-0.5 rounded border-slate-600 bg-dark-850 text-brand-500 focus:ring-brand-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold truncate ${task.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {task.title}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                          <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                            task.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' :
                            task.priority === 'high' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700/50 text-slate-300'
                          }`}>
                            {task.priority}
                          </span>
                          <span>Score: {task.smartPriorityScore}</span>
                          {task.estimatedMinutes && <span>&bull; {task.estimatedMinutes}m</span>}
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/app/focus"
                      title="Start Focus Session on this task"
                      className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 text-center">
              <Link to="/app/tasks" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                View All Tasks & Kanban Board →
              </Link>
            </div>
          </div>

          {/* Habit Tracker Rings Card */}
          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Daily Habits</h3>
              </div>
              <button
                onClick={() => openQuickAdd('habit')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Add Habit"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {habits.map((habit) => {
                const isDone = habit.completedDates.includes(todayStr);

                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-dark-900/40 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          toggleHabit(habit.id);
                          if (!isDone) triggerConfetti();
                        }}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs transition-colors ${
                          isDone
                            ? 'bg-peach-300 border-peach-300 text-on-peach'
                            : 'border-slate-600 hover:border-brand-400 text-transparent'
                        }`}
                      >
                        ✓
                      </button>
                      <div>
                        <div className={`font-semibold ${isDone ? 'text-slate-300' : 'text-white'}`}>
                          {habit.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Target: {habit.targetValue} {habit.unit}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-xs text-rose-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{habit.currentStreak}d</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 text-center">
              <Link to="/app/streaks" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                Streak Heatmaps & XP Badges →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Quick Create Modal */}
      <QuickCreateModal
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        defaultTab={quickCreateTab}
      />
    </div>
  );
};

