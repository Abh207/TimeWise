import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Sparkles, 
  Calendar, 
  CheckSquare, 
  Flame, 
  Clock, 
  CloudSun, 
  BarChart3, 
  FolderKanban, 
  BookOpen, 
  Target, 
  Bell, 
  User, 
  ArrowRight, 
  Play, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  BrainCircuit, 
  Sun, 
  Moon,
  Timer,
  Activity,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

// SVG wave chart: subtle peach gradient wave
const CardWaveBg: React.FC<{ color?: string; id: string }> = ({ color = '#F5C7B0', id }) => (
  <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M0,80 C150,140 300,20 500,70 L500,150 L0,150 Z"
        fill={`url(#grad-${id})`}
      />
      <path
        d="M0,80 C150,140 300,20 500,70"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 2"
      />
    </svg>
  </div>
);

export const HomeHubPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    events, 
    tasks, 
    habits, 
    focusSessions, 
    records, 
    goals, 
    savedLocations, 
    weather, 
    notifications,
    theme,
    setTheme
  } = useStore();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Time calculations & Greeting
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.displayName || user?.fullName?.split(' ')[0] || 'Innovator';

  // Real data calculations
  const todayStr = format(currentTime, 'yyyy-MM-dd');

  // Today's events
  const todayEvents = useMemo(() => {
    return events.filter(e => {
      return e.startTime.startsWith(todayStr);
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [events, todayStr]);

  const completedEvents = todayEvents.filter(e => e.status === 'completed');
  const nextEvent = todayEvents.find(e => e.status !== 'completed');

  // Tasks metrics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'urgent' || t.priority === 'high');
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  // Habits metrics
  const activeHabits = habits.length;
  const habitsDoneToday = habits.filter(h => h.completedDates?.includes(todayStr)).length;
  const topStreak = habits.reduce((max, h) => Math.max(max, h.currentStreak || 0), 0);

  // Focus metrics
  const todayFocusMinutes = useMemo(() => {
    return focusSessions
      .filter(s => s.timestamp.startsWith(todayStr))
      .reduce((sum, s) => sum + s.completedMinutes, 0);
  }, [focusSessions, todayStr]);

  const totalFocusHoursFormatted = `${Math.floor(todayFocusMinutes / 60)}h ${todayFocusMinutes % 60}m`;

  // Schedule completion percentage
  const totalItemsToday = (todayEvents.length + tasks.length) || 1;
  const totalCompletedToday = completedEvents.length + completedTasks.length;
  const overallDayProgress = Math.min(100, Math.round((totalCompletedToday / totalItemsToday) * 100));

  // Goals
  const activeGoals = goals.filter(g => g.progressPercentage < 100);
  const avgGoalProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progressPercentage, 0) / goals.length) : 0;

  // Notifications
  const unreadNotifs = notifications.filter(n => !n.isRead);

  const formatEventTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return format(d, 'hh:mm a');
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fadeIn selection:bg-[var(--peach-300)]/40 selection:text-[var(--peach-800)]">
      {/* ============================================================== */}
      {/* 1. TOP HERO SECTION */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden rounded-[24px] p-6 sm:p-10 border border-[#F5C7B0]/20 bg-gradient-to-br from-white via-[#FDF1EA] to-[#FBE3D6] dark:from-[#140F0D] dark:via-[#1A120E] dark:to-[#241812] shadow-soft">
        {/* Subtle accent glow backdrops */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#F5C7B0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#EFAE8F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: Greeting, Date & Live Clock */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F5C7B0]/30 bg-[#FBE3D6] dark:bg-[#1B2B22] text-[#A24E27] dark:text-[#F5C7B0] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#F5C7B0] animate-pulse" />
              <span>COMMAND COCKPIT &bull; CENTRAL LIFE HUB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
              {greeting}, <span className="text-[#A24E27] dark:text-[#F5C7B0]">{firstName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#6B7C72] dark:text-[#A0B0A6] max-w-xl font-normal leading-relaxed">
              Welcome to your centralized life operations deck. 16 core engines synchronized with clean timetable clarity.
            </p>

            {/* Time & Date Display */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-baseline gap-2 bg-white dark:bg-[#140F0D] border border-[#F5C7B0]/20 px-4 py-2 rounded-2xl shadow-sm">
                <span className="text-2xl sm:text-3xl font-bold text-[#1B2B22] dark:text-white">
                  {format(currentTime, 'hh:mm')}
                </span>
                <span className="text-xs text-[#A24E27] dark:text-[#F5C7B0] font-bold">
                  {format(currentTime, ':ss a')}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-[#6B7C72] dark:text-[#A0B0A6] font-medium border-l border-[#F5C7B0]/20 pl-4">
                <p className="text-[#1B2B22] dark:text-white font-semibold">{format(currentTime, 'EEEE')}</p>
                <p>{format(currentTime, 'MMMM do, yyyy')}</p>
              </div>
            </div>
          </div>

          {/* Right: Circular Completion Ring & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Circular Progress Widget */}
            <div className="relative flex items-center justify-center p-5 rounded-[20px] bg-white dark:bg-[#140F0D] border border-[#F5C7B0]/20 shadow-soft w-full sm:w-auto">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#FBE3D6"
                    strokeWidth="8"
                    className="dark:stroke-[#241812]"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F5C7B0"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * overallDayProgress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#1B2B22] dark:text-white font-display">{overallDayProgress}%</span>
                  <span className="text-[10px] text-[#6B7C72] dark:text-[#A0B0A6] uppercase tracking-wider font-semibold">Overall</span>
                </div>
              </div>
              <div className="ml-4 pr-2 text-left">
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Daily Velocity</p>
                <p className="text-sm font-bold text-[#1B2B22] dark:text-white">{completedTasks.length} / {totalTasks} Tasks</p>
                <p className="text-xs text-[#A24E27] dark:text-[#F5C7B0] mt-1 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> {todayFocusMinutes}m Logged
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#F5C7B0]/15 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6] uppercase tracking-wider mr-2">Quick Launches:</span>
          <button
            onClick={() => navigate('/app/smart-planner')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1A120E] border border-[#F5C7B0]/30 text-[#A24E27] dark:text-[#F5C7B0] hover:bg-[#F5C7B0] hover:text-[#2A1810] transition-all text-xs font-semibold shadow-soft hover-lift"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Plan My Day (AI)</span>
          </button>
          <button
            onClick={() => navigate('/app/focus')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1A120E] border border-[#F5C7B0]/30 text-[#A24E27] dark:text-[#F5C7B0] hover:bg-[#F5C7B0] hover:text-[#2A1810] transition-all text-xs font-semibold shadow-soft hover-lift"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Focus Session</span>
          </button>
          <button
            onClick={() => navigate('/app/timetable')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1A120E] border border-[#F5C7B0]/30 text-[#A24E27] dark:text-[#F5C7B0] hover:bg-[#F5C7B0] hover:text-[#2A1810] transition-all text-xs font-semibold shadow-soft hover-lift"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>View Schedule</span>
          </button>
          <button
            onClick={() => navigate('/app/records')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1A120E] border border-[#F5C7B0]/30 text-[#A24E27] dark:text-[#F5C7B0] hover:bg-[#F5C7B0] hover:text-[#2A1810] transition-all text-xs font-semibold shadow-soft hover-lift"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Log Quick Note</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION A: CORE */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F5C7B0]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#F5C7B0]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2B22] dark:text-white font-display tracking-tight">
              Section A: Core Navigation
            </h2>
          </div>
          <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Daily Operations & Planning</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Featured Dashboard Card (Spans 2 Columns) */}
          <div
            onClick={() => navigate('/app/dashboard')}
            className="lg:col-span-2 relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="dash" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <Activity className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C7B0] animate-pulse" />
                    LIVE COMMAND DECK
                  </span>
                  <h3 className="text-2xl font-bold text-[#1B2B22] dark:text-white font-display mt-1">Full Dashboard</h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Daily Score</span>
                <p className="text-3xl font-black text-[#A24E27] dark:text-[#F5C7B0] font-display">94<span className="text-sm font-normal text-[#6B7C72]">/100</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 relative z-10">
              <div className="p-4 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 dark:border-white/5">
                <p className="text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A24E27] dark:text-[#F5C7B0]" /> Next Up in Schedule
                </p>
                {nextEvent ? (
                  <div>
                    <p className="font-bold text-[#1B2B22] dark:text-white truncate">{nextEvent.title}</p>
                    <p className="text-xs text-[#A24E27] dark:text-[#F5C7B0] mt-0.5 font-medium">
                      {formatEventTime(nextEvent.startTime)} - {formatEventTime(nextEvent.endTime)} &bull; {nextEvent.location || 'Online'}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">All scheduled events completed for today.</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 dark:border-white/5">
                <p className="text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-[#A24E27] dark:text-[#F5C7B0]" /> Task Progress
                </p>
                <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-[#1B2B22] dark:text-white">{completedTasks.length} Completed</span>
                  <span className="text-[#A24E27] dark:text-[#F5C7B0]">{pendingTasks.length} Pending</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FBE3D6] dark:bg-[#241812] overflow-hidden">
                  <div className="h-full bg-[#F5C7B0] rounded-full transition-all duration-500" style={{ width: `${taskCompletionRate}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] truncate max-w-sm italic">
                "{user?.bio || 'Time is the currency of achievement. Spend it intentionally.'}"
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Open Dashboard <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* 2. Timetable Card */}
          <div
            onClick={() => navigate('/app/timetable')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="tt" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <Calendar className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C7B0] animate-pulse" />
                  SLOTS ACTIVE
                </span>
              </div>

              <div className="mt-6">
                <div className="text-5xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {todayEvents.length} <span className="text-2xl text-[#A24E27] dark:text-[#F5C7B0] font-semibold">Events</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2B22] dark:text-white font-display mt-2">Academic & Daily Timetable</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Interactive multi-view schedule grid, drag & drop slot optimizer, and rotation cycles.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6] font-medium">Next scheduled commitment:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5 truncate">{nextEvent?.title || 'No more events today'}</p>
                <p className="text-[11px] text-[#A24E27] dark:text-[#F5C7B0] mt-1 font-medium">
                  {nextEvent ? `${formatEventTime(nextEvent.startTime)} (${nextEvent.location || 'Main Hall'})` : 'Schedule clear'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">{completedEvents.length} completed today</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Open Timetable <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 3. Smart Planner (AI Badge) */}
          <div
            onClick={() => navigate('/app/smart-planner')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="ai" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  <Sparkles className="w-3 h-3 text-[#A24E27] dark:text-[#F5C7B0]" /> AI OPTIMIZER
                </span>
              </div>

              <div className="mt-6">
                <div className="text-5xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  3 <span className="text-2xl text-[#A24E27] dark:text-[#F5C7B0] font-semibold">Allocations</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2B22] dark:text-white font-display mt-2">Smart AI Planner</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Algorithmic conflict detection, automatic free-slot allocation, and buffer optimization.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <div className="flex items-center gap-2 text-[#A24E27] dark:text-[#F5C7B0] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>0 Conflicts Detected</span>
                </div>
                <p className="text-[11px] text-[#6B7C72] dark:text-[#A0B0A6] mt-1">Recommended next: 45m deep focus block at 3:00 PM.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Heuristic Engine Ready</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Open Planner <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 4. Tasks Card */}
          <div
            onClick={() => navigate('/app/tasks')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#FF7A6B" id="tasks" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1F0] dark:bg-[#201010] border border-[#FF7A6B]/30 flex items-center justify-center text-[#FF7A6B] group-hover:scale-105 transition-transform shadow-sm">
                  <CheckSquare className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1F0] text-[#FF7A6B] dark:bg-[#FF7A6B]/20 border border-[#FF7A6B]/30">
                  {highPriorityTasks.length} URGENT
                </span>
              </div>

              <div className="mt-6">
                <div className="text-5xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {pendingTasks.length} <span className="text-2xl text-[#FF7A6B] font-semibold">Pending</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2B22] dark:text-white font-display mt-2">Tasks & Priorities</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Smart Eisenhower matrix, dynamic priority scoring, and instant completion sounds.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6]">
                  <span>Today's Completion</span>
                  <span className="text-[#FF7A6B] font-bold">{taskCompletionRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FBE3D6] dark:bg-[#241812] overflow-hidden">
                  <div className="h-full bg-[#FF7A6B] rounded-full transition-all duration-500" style={{ width: `${taskCompletionRate}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">{completedTasks.length} finished</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A6B] group-hover:translate-x-1 transition-transform">
                Open Tasks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 5. Master Calendar Card */}
          <div
            onClick={() => navigate('/app/calendar')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#4DA3FF" id="cal" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF5FF] dark:bg-[#0C1A2E] border border-[#4DA3FF]/30 flex items-center justify-center text-[#4DA3FF] group-hover:scale-105 transition-transform shadow-sm">
                  <Calendar className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF5FF] text-[#4DA3FF] dark:bg-[#4DA3FF]/20 border border-[#4DA3FF]/30">
                  {format(currentTime, 'MMMM yyyy')}
                </span>
              </div>

              <div className="mt-6">
                <div className="text-5xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {events.length} <span className="text-2xl text-[#4DA3FF] font-semibold">Total</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2B22] dark:text-white font-display mt-2">Master Calendar</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Unified multi-month schedule, recurring commitment layers, and iCal synchronizer.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1 text-center font-medium">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className={`p-1.5 rounded-lg text-[10px] font-bold ${idx === 2 ? 'bg-[#F5C7B0] text-[#2A1810]' : 'bg-[#FDF1EA] dark:bg-[#140F0D] text-[#6B7C72] dark:text-[#A0B0A6]'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Next: Team Sync 4:00 PM</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4DA3FF] group-hover:translate-x-1 transition-transform">
                Open Calendar <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION B: PRODUCTIVITY & HABITS */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F5C7B0]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#EFAE8F]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2B22] dark:text-white font-display tracking-tight">
              Section B: Productivity & Habits
            </h2>
          </div>
          <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Flow States & Momentum</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 6. Focus Chamber */}
          <div
            onClick={() => navigate('/app/focus')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="focus" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <Timer className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  <Play className="w-2.5 h-2.5 fill-current" /> READY
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {totalFocusHoursFormatted}
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Focus Chamber</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Pomodoro, deep work timers, ambient sounds & 528Hz Solfeggio chimes.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Last Mode: <span className="text-[#A24E27] dark:text-[#F5C7B0] font-semibold">Deep Focus (25m)</span></p>
                <p className="text-[11px] text-[#1B2B22] dark:text-white mt-1">Sessions Logged: {focusSessions.length}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Sound: Rain Forest</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Enter Chamber <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 7. Streaks & Habits */}
          <div
            onClick={() => navigate('/app/streaks')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5A524" id="streaks" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FEF6E6] dark:bg-[#261E0E] border border-[#F5A524]/30 flex items-center justify-center text-[#F5A524] group-hover:scale-105 transition-transform shadow-sm">
                  <Flame className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF6E6] text-[#F5A524] dark:bg-[#F5A524]/20 border border-[#F5A524]/30">
                  {habitsDoneToday}/{activeHabits} DONE
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight flex items-baseline gap-1">
                  {topStreak} <span className="text-xl text-[#F5A524]">Days</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Streaks & Habits</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Habit compounding, streak recovery freeze shields, and daily check-ins.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6]">
                  <span>Daily Habit Target</span>
                  <span className="text-[#F5A524] font-bold">{Math.round((habitsDoneToday / (activeHabits || 1)) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FBE3D6] dark:bg-[#241812] overflow-hidden">
                  <div className="h-full bg-[#F5A524] rounded-full transition-all duration-500" style={{ width: `${(habitsDoneToday / (activeHabits || 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">{activeHabits} Active Habits</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F5A524] group-hover:translate-x-1 transition-transform">
                Open Streaks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 8. Time Waste & Leaks */}
          <div
            onClick={() => navigate('/app/time-analytics')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#FF7A6B" id="leak" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1F0] dark:bg-[#201010] border border-[#FF7A6B]/30 flex items-center justify-center text-[#FF7A6B] group-hover:scale-105 transition-transform shadow-sm">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1F0] text-[#FF7A6B] dark:bg-[#FF7A6B]/20 border border-[#FF7A6B]/30">
                  AUDIT
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  42m <span className="text-xl text-[#FF7A6B]">Saved</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Time Waste & Leaks</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Unplanned gap detector, context-switching metrics, and social media dampener.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Largest Leak Vector:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5">Unscheduled Browsing (-28m)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Efficiency: 88%</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A6B] group-hover:translate-x-1 transition-transform">
                View Leaks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 9. Productivity Insights */}
          <div
            onClick={() => navigate('/app/analytics')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="analytics" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  <TrendingUp className="w-3 h-3 text-[#A24E27] dark:text-[#F5C7B0]" /> +14%
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  89% <span className="text-xl text-[#A24E27] dark:text-[#F5C7B0]">Score</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Productivity Analytics</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Weekly velocity charts, category allocation breakdowns, and goal trajectories.
                </p>
              </div>

              <div className="mt-6 flex items-end gap-1.5 h-10 px-2 py-1 bg-[#FDF1EA] dark:bg-[#140F0D] rounded-xl border border-[#F5C7B0]/15">
                {[40, 65, 80, 55, 90, 75, 89].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-[#F5C7B0]/30 rounded-t hover:bg-[#F5C7B0] transition-colors" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Weekly Adherence</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Explore Data <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION C: LIFE & MANAGEMENT */}
      {/* ============================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F5C7B0]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#8B7CF6]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2B22] dark:text-white font-display tracking-tight">
              Section C: Life & Management
            </h2>
          </div>
          <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Holistic Tracking & System Assets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 10. Project Workspaces */}
          <div
            onClick={() => navigate('/app/projects')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#8B7CF6" id="projects" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#F4F1FD] dark:bg-[#1E1933] border border-[#8B7CF6]/30 flex items-center justify-center text-[#8B7CF6] group-hover:scale-105 transition-transform shadow-sm">
                  <FolderKanban className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F4F1FD] text-[#8B7CF6] dark:bg-[#8B7CF6]/20 border border-[#8B7CF6]/30">
                  KANBAN
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  4 <span className="text-xl text-[#8B7CF6]">Active</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Project Workspaces</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Sprint management, milestone completion bars, and resource linking.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Next Milestone:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5">TimeWise Peach UI Release</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Progress: 76%</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8B7CF6] group-hover:translate-x-1 transition-transform">
                Open Workspaces <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 11. Life Records & Notes */}
          <div
            onClick={() => navigate('/app/records')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#4DA3FF" id="records" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF5FF] dark:bg-[#0C1A2E] border border-[#4DA3FF]/30 flex items-center justify-center text-[#4DA3FF] group-hover:scale-105 transition-transform shadow-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF5FF] text-[#4DA3FF] dark:bg-[#4DA3FF]/20 border border-[#4DA3FF]/30">
                  VAULT
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {records.length} <span className="text-xl text-[#4DA3FF]">Entries</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Life Records & Notes</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Health benchmarks, fitness logs, daily debriefs, and tagged personal records.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Latest Entry:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5 truncate">
                  {records[0]?.title || 'Weekly reflection & milestone review'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Encrypted & Stored</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4DA3FF] group-hover:translate-x-1 transition-transform">
                Open Records <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 12. Goals & Milestones */}
          <div
            onClick={() => navigate('/app/goals')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="goals" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <Target className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  {activeGoals.length} IN FLIGHT
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {avgGoalProgress}% <span className="text-xl text-[#A24E27] dark:text-[#F5C7B0]">Target</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Goals & Milestones</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  OKR framework, quarterly targets, breakdown milestones, and reward triggers.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#6B7C72] dark:text-[#A0B0A6]">
                  <span>Quarterly Objective</span>
                  <span className="text-[#A24E27] dark:text-[#F5C7B0] font-bold">{avgGoalProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FBE3D6] dark:bg-[#241812] overflow-hidden">
                  <div className="h-full bg-[#F5C7B0] rounded-full transition-all duration-500" style={{ width: `${avgGoalProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">{goals.length} Strategic Goals</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Open Goals <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 13. Locations & Travel */}
          <div
            onClick={() => navigate('/app/location')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="locations" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] dark:bg-[#F5C7B0]/20 border border-[#F5C7B0]/30">
                  COMMUTE READY
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {savedLocations.length} <span className="text-xl text-[#A24E27] dark:text-[#F5C7B0]">Venues</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Locations & Travel</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Campus / workplace navigation, commute buffer calculators, and favorite study spots.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Primary Workspace:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5 truncate">{savedLocations[0]?.label || 'Library Study Hall Room 402'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Est. Commute: 15m</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Open Travel <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 14. Weather Dashboard */}
          <div
            onClick={() => navigate('/app/weather')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5A524" id="weather" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FEF6E6] dark:bg-[#261E0E] border border-[#F5A524]/30 flex items-center justify-center text-[#F5A524] group-hover:scale-105 transition-transform shadow-sm">
                  <CloudSun className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF6E6] text-[#F5A524] dark:bg-[#F5A524]/20 border border-[#F5A524]/30">
                  {weather?.city || 'San Francisco'}
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight flex items-baseline gap-1">
                  {weather?.temp || 22}&deg;C <span className="text-xl text-[#F5A524] font-normal">{weather?.condition || 'Clear Sky'}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Weather & Environment</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Live atmospheric forecasts, rain alerts before travel, and outdoor study advice.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#F5A524] font-semibold flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" /> Rain Probability: {weather?.rainProbability || 10}%
                </p>
                <p className="text-[11px] text-[#6B7C72] dark:text-[#A0B0A6] mt-1">Ideal conditions for focused work or campus commute.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Humidity: {weather?.humidity || 55}%</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F5A524] group-hover:translate-x-1 transition-transform">
                Open Weather <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 15. Notifications Hub */}
          <div
            onClick={() => navigate('/app/notifications')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#FF7A6B" id="notifs" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1F0] dark:bg-[#201010] border border-[#FF7A6B]/30 flex items-center justify-center text-[#FF7A6B] group-hover:scale-105 transition-transform shadow-sm">
                  <Bell className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1F0] text-[#FF7A6B] dark:bg-[#FF7A6B]/20 border border-[#FF7A6B]/30">
                  {unreadNotifs.length} UNREAD
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  {unreadNotifs.length} <span className="text-xl text-[#FF7A6B]">Alerts</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Notifications Hub</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Conflict warnings, habit nudges, task reminders, and missed activity reviews.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Latest Notification:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5 truncate">
                  {notifications[0]?.title || 'All schedules and reminders up to date.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Priority Sync</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A6B] group-hover:translate-x-1 transition-transform">
                Open Alerts <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 16. Profile & Settings */}
          <div
            onClick={() => navigate('/app/profile')}
            className="relative min-h-[380px] rounded-[20px] p-8 border border-[#F5C7B0]/15 dark:border-white/10 bg-white dark:bg-[#1A120E] hover:border-[#F5C7B0]/50 shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden hover-lift"
          >
            <CardWaveBg color="#F5C7B0" id="profile" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FBE3D6] dark:bg-[#140F0D] border border-[#F5C7B0]/30 flex items-center justify-center text-[#A24E27] dark:text-[#F5C7B0] group-hover:scale-105 transition-transform shadow-sm">
                  <User className="w-7 h-7" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  className="p-2 rounded-xl bg-[#FDF1EA] dark:bg-white/5 border border-[#F5C7B0]/20 hover:border-[#F5C7B0] text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white transition-colors"
                  title="Toggle theme inside card"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F5A524]" /> : <Moon className="w-4 h-4 text-[#A24E27] dark:text-[#F5C7B0]" />}
                </button>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-black text-[#1B2B22] dark:text-white font-display tracking-tight">
                  Lvl {user?.level || 1} <span className="text-xl text-[#A24E27] dark:text-[#F5C7B0]">Pro</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B22] dark:text-white font-display mt-2">Profile & Settings</h3>
                <p className="text-xs text-[#6B7C72] dark:text-[#A0B0A6] mt-1 line-clamp-2">
                  Account preferences, sleep/wake times, export/import JSON, and Supabase config.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-2xl bg-[#FDF1EA] dark:bg-[#140F0D] border border-[#F5C7B0]/15 text-xs">
                <p className="text-[#6B7C72] dark:text-[#A0B0A6]">Signed in as:</p>
                <p className="font-bold text-[#1B2B22] dark:text-white mt-0.5 truncate">{user?.email || 'user@lifesync.ai'}</p>
                <p className="text-[11px] text-[#A24E27] dark:text-[#F5C7B0] mt-1 font-semibold">XP Points: {user?.xp || 240}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5C7B0]/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#6B7C72] dark:text-[#A0B0A6]">Clean Peach Active</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#A24E27] dark:text-[#F5C7B0] group-hover:translate-x-1 transition-transform">
                Configure <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
