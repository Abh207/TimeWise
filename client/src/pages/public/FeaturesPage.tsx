import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { Marquee } from '../../components/ui/Marquee';
import { 
  BrainCircuit, 
  Calendar, 
  AlertCircle, 
  Volume2, 
  Flame, 
  CloudSun, 
  Bell, 
  RotateCw, 
  Lock, 
  Share2, 
  MapPin, 
  Sparkles, 
  Zap, 
  Target, 
  FolderKanban, 
  BookOpen, 
  BarChart3, 
  Compass, 
  CheckSquare, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// ==========================================
// FEATURE DATA SETS
// ==========================================

const ROW1_FEATURES = [
  {
    title: "Smart AI Planner",
    desc: "Heuristic engine finds zero-conflict study windows.",
    pill: "AI OPTIMIZER",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: BrainCircuit,
    link: "/app/smart-planner"
  },
  {
    title: "Drag & Drop Grid",
    desc: "Fluid weekly grids with bi-weekly rotation cycles.",
    pill: "INTERACTIVE",
    gradient: "from-[#4DA3FF] to-[#60A5FA]",
    pillColor: "bg-[#EAF4FF] text-[#4DA3FF] border-[rgba(77,163,255,0.3)]",
    icon: Calendar,
    link: "/app/timetable"
  },
  {
    title: "Conflict Detection",
    desc: "Continuous scan flags travel buffers and overlaps.",
    pill: "AUTOMATED",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: AlertCircle,
    link: "/app/timetable"
  },
  {
    title: "Focus Chamber",
    desc: "Pomodoro timers with 528Hz Solfeggio soundscapes.",
    pill: "AUDIO SYNC",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: Volume2,
    link: "/app/focus"
  },
  {
    title: "Streaks & Grace Days",
    desc: "Freeze shields protect habits during exam pinches.",
    pill: "RESILIENCE",
    gradient: "from-[#FF7A6B] to-[#F87171]",
    pillColor: "bg-[#FFF0EE] text-[#FF7A6B] border-[rgba(255,122,107,0.3)]",
    icon: Flame,
    link: "/app/streaks"
  },
  {
    title: "Weather Aware Sync",
    desc: "Atmospheric shifts automatically adjust outdoor plans.",
    pill: "LIVE METEO",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: CloudSun,
    link: "/app/weather"
  },
  {
    title: "Missed Alerts Watcher",
    desc: "Intelligent recovery suggestions for uncompleted blocks.",
    pill: "NUDGES",
    gradient: "from-[#FF7A6B] to-[#F87171]",
    pillColor: "bg-[#FFF0EE] text-[#FF7A6B] border-[rgba(255,122,107,0.3)]",
    icon: Bell,
    link: "/app/notifications"
  },
  {
    title: "Bi-Weekly Rotation",
    desc: "Native support for Week A, Week B, Day 1, Day 2 cycles.",
    pill: "ACADEMIC",
    gradient: "from-[#8B7CF6] to-[#A78BFA]",
    pillColor: "bg-[#F4F1FE] text-[#8B7CF6] border-[rgba(139,124,246,0.3)]",
    icon: RotateCw,
    link: "/app/timetable"
  },
  {
    title: "Zero-Latency Vault",
    desc: "Instant client persistence with full JSON export.",
    pill: "PRIVATE",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: Lock,
    link: "/app/records"
  },
  {
    title: "iCal & Cloud Sync",
    desc: "Export standard .ics calendars and ready for Supabase.",
    pill: "PORTABLE",
    gradient: "from-[#4DA3FF] to-[#60A5FA]",
    pillColor: "bg-[#EAF4FF] text-[#4DA3FF] border-[rgba(77,163,255,0.3)]",
    icon: Share2,
    link: "/app/calendar"
  },
  {
    title: "Travel Buffer Alert",
    desc: "Warns if walking between campus buildings is too tight.",
    pill: "GPS AWARE",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: MapPin,
    link: "/app/location"
  },
  {
    title: "528Hz Solfeggio Audio",
    desc: "Harmonic frequency synthesized purely in Web Audio.",
    pill: "ACOUSTIC",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: Sparkles,
    link: "/app/focus"
  }
];

const ROW2_TOOLS = [
  {
    title: "Time Leak Detector",
    desc: "Audits unplanned gap intervals and browsing drains.",
    pill: "AUDIT TOOL",
    gradient: "from-[#FF7A6B] to-[#F87171]",
    pillColor: "bg-[#FFF0EE] text-[#FF7A6B] border-[rgba(255,122,107,0.3)]",
    icon: Zap,
    link: "/app/time-analytics"
  },
  {
    title: "Habit Tracker",
    desc: "Daily micro-commitments compounding toward mastery.",
    pill: "ATOMIC",
    gradient: "from-[#FF7A6B] to-[#F87171]",
    pillColor: "bg-[#FFF0EE] text-[#FF7A6B] border-[rgba(255,122,107,0.3)]",
    icon: Flame,
    link: "/app/streaks"
  },
  {
    title: "Strategic Goals & OKRs",
    desc: "Quarterly objectives broken into milestone check-ins.",
    pill: "STRATEGY",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: Target,
    link: "/app/goals"
  },
  {
    title: "Kanban Workspaces",
    desc: "Sprint columns, milestone bars, and linked deliverables.",
    pill: "AGILE",
    gradient: "from-[#8B7CF6] to-[#A78BFA]",
    pillColor: "bg-[#F4F1FE] text-[#8B7CF6] border-[rgba(139,124,246,0.3)]",
    icon: FolderKanban,
    link: "/app/projects"
  },
  {
    title: "Life Records Vault",
    desc: "Fitness benchmarks, daily debriefs, and private tags.",
    pill: "JOURNAL",
    gradient: "from-[#4DA3FF] to-[#60A5FA]",
    pillColor: "bg-[#EAF4FF] text-[#4DA3FF] border-[rgba(77,163,255,0.3)]",
    icon: BookOpen,
    link: "/app/records"
  },
  {
    title: "Venue & Commute Transit",
    desc: "Calculates transit overhead before schedule commit.",
    pill: "LOCATIONS",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: MapPin,
    link: "/app/location"
  },
  {
    title: "Velocity Telemetry",
    desc: "Weekly category adherence and focus hour trajectories.",
    pill: "TELEMETRY",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: BarChart3,
    link: "/app/analytics"
  },
  {
    title: "Master Calendar",
    desc: "Month, week, and day overlays in one smooth canvas.",
    pill: "UNIFIED",
    gradient: "from-[#4DA3FF] to-[#60A5FA]",
    pillColor: "bg-[#EAF4FF] text-[#4DA3FF] border-[rgba(77,163,255,0.3)]",
    icon: Calendar,
    link: "/app/calendar"
  },
  {
    title: "Quick Switcher (Ctrl+K)",
    desc: "Jump anywhere or log tasks without lifting your wrists.",
    pill: "KEYBOARD FIRST",
    gradient: "from-[#F5C7B0] to-[#EFAE8F]",
    pillColor: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border-[rgba(245,199,176,0.35)]",
    icon: Compass,
    link: "/home"
  },
  {
    title: "Eisenhower Priorities",
    desc: "Smart priority sorting: Urgent, High, Medium, Low.",
    pill: "MATRIX",
    gradient: "from-[#FF7A6B] to-[#F87171]",
    pillColor: "bg-[#FFF0EE] text-[#FF7A6B] border-[rgba(255,122,107,0.3)]",
    icon: CheckSquare,
    link: "/app/tasks"
  },
  {
    title: "Missed Review Deck",
    desc: "Three-way resolution: Mark Done, Reschedule, Skip.",
    pill: "RESILIENCE",
    gradient: "from-[#F5A524] to-[#FBBF24]",
    pillColor: "bg-[#FFF8EB] text-[#F5A524] border-[rgba(245,165,36,0.3)]",
    icon: AlertCircle,
    link: "/app/notifications"
  },
  {
    title: "Light & Dark Themes",
    desc: "Warm peach palette with matching deep dark mode.",
    pill: "ERGONOMICS",
    gradient: "from-[#8B7CF6] to-[#A78BFA]",
    pillColor: "bg-[#F4F1FE] text-[#8B7CF6] border-[rgba(139,124,246,0.3)]",
    icon: Sparkles,
    link: "/app/settings"
  }
];

const ROW3_TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "STEM Student",
    avatar: "/images/avatar-1.jpg",
    quote: "TimeWise solved my bi-weekly CS labs and saved 4 hours of weekly study time.",
    chipBg: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0]"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Researcher",
    avatar: "/images/avatar-2.jpg",
    quote: "No more double-bookings across wet labs and symposiums. The buffer check is essential.",
    chipBg: "bg-[#EAF4FF] text-[#4DA3FF]"
  },
  {
    name: "Marcus Vance",
    role: "Software Lead",
    avatar: "/images/avatar-3.jpg",
    quote: "The 528Hz Solfeggio bells and Pomodoro chamber keep my coding blocks uninterrupted.",
    chipBg: "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0]"
  },
  {
    name: "Sarah Lindqvist",
    role: "Medical Resident",
    avatar: "/images/avatar-4.jpg",
    quote: "Streak freeze shields saved my 120-day habit streak during grueling hospital shifts.",
    chipBg: "bg-[#FFF0EE] text-[#FF7A6B]"
  },
  {
    name: "Dmitri Volkov",
    role: "Founder",
    avatar: "/images/avatar-1.jpg",
    quote: "Harmonized quarterly OKRs, sprint boards, and sleep cycles in one clean interface.",
    chipBg: "bg-[#F4F1FE] text-[#8B7CF6]"
  },
  {
    name: "Claire Moreau",
    role: "Creative Director",
    avatar: "/images/avatar-2.jpg",
    quote: "Finally a timetable that doesn't look like a 2012 enterprise spreadsheet.",
    chipBg: "bg-[#FFF8EB] text-[#F5A524]"
  }
];

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF1EA] dark:bg-[#140F0D] text-[#1B2B22] dark:text-[#F0FDF4] font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <PublicNavbar />

      {/* Main Content Area */}
      <main className="flex-1 py-12 sm:py-16 space-y-16">
        {/* Header Introduction */}
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE3D6] dark:bg-[#2C1E18] text-[#A24E27] dark:text-[#F5C7B0] text-xs font-semibold border border-[rgba(245,199,176,0.35)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architecture Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1B2B22] dark:text-[#F0FDF4]">
            Everything engineered to <span className="text-[#A24E27] dark:text-[#F5C7B0]">clarify your routine</span>
          </h1>

          <p className="text-sm sm:text-base text-[#6B7C72] dark:text-[#9AB3A4] max-w-2xl mx-auto leading-relaxed">
            Every module is crafted to be lightweight, responsive, and intuitive. Browse through all core capabilities below.
          </p>
        </div>

        {/* ============================================================== */}
        {/* ROW 1: CORE APPLICATION ENGINES */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C7B0]" />
              <h2 className="text-sm font-bold text-[#A24E27] dark:text-[#F5C7B0]">Core Scheduling & Academic Engines</h2>
            </div>
            <span className="text-xs text-[#6B7C72] dark:text-[#9AB3A4] hidden sm:inline">Auto-scrolling Left &rarr; Right</span>
          </div>

          <Marquee speed={40} direction="right" gap="1rem">
            {ROW1_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[230px] sm:w-[250px] h-[140px] p-4 rounded-[20px] bg-white dark:bg-[#1A120E] border border-[rgba(245,199,176,0.3)] shadow-soft hover-lift flex flex-col justify-between shrink-0 select-none group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${item.gradient} text-[#2A1810] flex items-center justify-center shadow-xs shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${item.pillColor}`}>
                        {item.pill}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4] truncate">{item.title}</h3>
                    <p className="text-[11px] text-[#6B7C72] dark:text-[#9AB3A4] mt-0.5 line-clamp-2 leading-tight">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    to={item.link}
                    className="text-[11px] font-semibold text-[#A24E27] dark:text-[#F5C7B0] hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              );
            })}
          </Marquee>
        </div>

        {/* ============================================================== */}
        {/* ROW 2: PRODUCTIVITY TOOLS & TELEMETRY */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF]" />
              <h2 className="text-sm font-bold text-[#A24E27] dark:text-[#F5C7B0]">Productivity Protocols & Insights</h2>
            </div>
            <span className="text-xs text-[#6B7C72] dark:text-[#9AB3A4] hidden sm:inline">Auto-scrolling Right &larr; Left</span>
          </div>

          <Marquee speed={48} direction="left" gap="1rem">
            {ROW2_TOOLS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[230px] sm:w-[250px] h-[140px] p-4 rounded-[20px] bg-[#FBE3D6]/60 dark:bg-[#201612] border border-[rgba(245,199,176,0.3)] shadow-soft hover-lift flex flex-col justify-between shrink-0 select-none group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${item.gradient} text-[#2A1810] flex items-center justify-center shadow-xs shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${item.pillColor}`}>
                        {item.pill}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4] truncate">{item.title}</h3>
                    <p className="text-[11px] text-[#6B7C72] dark:text-[#9AB3A4] mt-0.5 line-clamp-2 leading-tight">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    to={item.link}
                    className="text-[11px] font-semibold text-[#A24E27] dark:text-[#F5C7B0] hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              );
            })}
          </Marquee>
        </div>

        {/* ============================================================== */}
        {/* ROW 3: REAL USER COHORTS & TESTIMONIALS */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A6B]" />
              <h2 className="text-sm font-bold text-[#A24E27] dark:text-[#F5C7B0]">Community Voices & Real Workflows</h2>
            </div>
            <span className="text-xs text-[#6B7C72] dark:text-[#9AB3A4] hidden sm:inline">Smooth Continuous Loop</span>
          </div>

          <Marquee speed={36} direction="right" gap="1rem">
            {ROW3_TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="w-[260px] sm:w-[280px] h-[140px] p-4 rounded-[20px] bg-white dark:bg-[#1A120E] border border-[rgba(245,199,176,0.3)] shadow-soft hover-lift flex flex-col justify-between shrink-0 select-none text-left"
              >
                <p className="text-[11px] text-[#1B2B22] dark:text-[#F0FDF4] italic line-clamp-2 leading-tight">
                  "{item.quote}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(245,199,176,0.2)]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      loading="lazy"
                      className="w-7 h-7 rounded-full object-cover border border-[#F5C7B0]/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4]">{item.name}</h4>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.chipBg}`}>
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Call-to-Action Card */}
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 pt-8">
          <div className="p-8 sm:p-12 rounded-[24px] bg-[#FBE3D6] dark:bg-[#201612] border border-[rgba(245,199,176,0.35)] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#1B2B22] dark:text-[#F0FDF4]">
                Ready to experience clean focus?
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7C72] dark:text-[#9AB3A4]">
                Launch the demo or open your personal timetable in seconds.
              </p>
            </div>
            <Link
              to="/signin"
              className="btn-primary-peach text-sm shrink-0 hover-lift"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

