export interface TaskRow {
  title: string;
  priority: string;
  status: string;
  duration: string;
}

export interface TodayTaskCard {
  time: string;
  title: string;
  subtitle: string;
  status: string;
  dotColor: 'peach' | 'blue';
}

export interface HeroSlide {
  id: number;
  heading: string;
  description: string;
  watchLabel: string;
  tableRows: [TaskRow, TaskRow];
  todayTasks: [TodayTaskCard, TodayTaskCard];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    heading: "Focus on What Matters Today",
    description: "Track your most important tasks as they are intelligently prioritized and scheduled by AI.",
    watchLabel: "DEEP FOCUS",
    tableRows: [
      { title: "Core Engine", priority: "Urgent", status: "In Progress", duration: "2.5h" },
      { title: "Code Review", priority: "Medium", status: "Scheduled", duration: "45m" }
    ],
    todayTasks: [
      { time: "10:00 AM", title: "Mobile App Design", subtitle: "4 Hours Per Task", status: "In Progress", dotColor: "peach" },
      { time: "02:00 PM", title: "Dashboard Design", subtitle: "3 Hours Per Task", status: "Scheduled", dotColor: "blue" }
    ]
  },
  {
    id: 1,
    heading: "Protect Your Flow",
    description: "Shield your peak creative energy from meeting conflicts and digital distractions.",
    watchLabel: "FLOW SHIELD",
    tableRows: [
      { title: "App Design", priority: "Urgent", status: "In Progress", duration: "4h" },
      { title: "Team Meeting", priority: "Medium", status: "Scheduled", duration: "30m" }
    ],
    todayTasks: [
      { time: "11:30 AM", title: "Algorithm Deep Work", subtitle: "3 Hours Per Task", status: "In Progress", dotColor: "peach" },
      { time: "03:30 PM", title: "Architecture Sync", subtitle: "1 Hour Per Task", status: "Scheduled", dotColor: "blue" }
    ]
  },
  {
    id: 2,
    heading: "Weather-Aware Plans",
    description: "Dynamic schedule reshuffling when rain or commute delays threaten your transit.",
    watchLabel: "WEATHER SYNC",
    tableRows: [
      { title: "Campus Commute", priority: "Urgent", status: "Adjusted", duration: "+20m" },
      { title: "Library Study", priority: "Medium", status: "Scheduled", duration: "2h" }
    ],
    todayTasks: [
      { time: "08:45 AM", title: "Rain Delay Transit", subtitle: "Buffer Added", status: "In Progress", dotColor: "peach" },
      { time: "01:15 PM", title: "Physics Lecture", subtitle: "Hall Room 204", status: "Scheduled", dotColor: "blue" }
    ]
  },
  {
    id: 3,
    heading: "Never Break a Streak",
    description: "Automatic recovery shields and grace periods preserve your long-term momentum.",
    watchLabel: "14D STREAK",
    tableRows: [
      { title: "Morning Cardio", priority: "Urgent", status: "In Progress", duration: "45m" },
      { title: "Read Research", priority: "Medium", status: "Scheduled", duration: "30m" }
    ],
    todayTasks: [
      { time: "07:00 AM", title: "Habit Check-in", subtitle: "Freeze Shield Ready", status: "In Progress", dotColor: "peach" },
      { time: "05:00 PM", title: "Gym Session", subtitle: "Day 14 in a Row", status: "Scheduled", dotColor: "blue" }
    ]
  },
  {
    id: 4,
    heading: "Smart Travel Buffers",
    description: "Real-time travel buffers dynamically recalculate between class locations and meetings.",
    watchLabel: "TRANSIT ON",
    tableRows: [
      { title: "Metro Transit", priority: "Urgent", status: "In Progress", duration: "22m" },
      { title: "Seminar Hall", priority: "Medium", status: "Scheduled", duration: "1.5h" }
    ],
    todayTasks: [
      { time: "12:15 PM", title: "Campus Shuttle", subtitle: "Smart Buffer +10m", status: "In Progress", dotColor: "peach" },
      { time: "04:00 PM", title: "Group Presentation", subtitle: "Auditorium B", status: "Scheduled", dotColor: "blue" }
    ]
  },
  {
    id: 5,
    heading: "Plan Your Week in Seconds",
    description: "AI synthesizes your syllabi, deadlines, and personal goals into an effortless timetable.",
    watchLabel: "WEEK SYNC",
    tableRows: [
      { title: "Syllabus Parse", priority: "Urgent", status: "In Progress", duration: "6 Slots" },
      { title: "Weekend Prep", priority: "Medium", status: "Scheduled", duration: "3h" }
    ],
    todayTasks: [
      { time: "09:30 AM", title: "Distributed Systems", subtitle: "Turing Hall 402", status: "In Progress", dotColor: "peach" },
      { time: "02:30 PM", title: "Milestone Sprint", subtitle: "Release 2.0 Ready", status: "Scheduled", dotColor: "blue" }
    ]
  }
];

