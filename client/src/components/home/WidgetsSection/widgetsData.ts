export interface MeetingItem {
  id: string;
  dayOffset: number; // 0 for today, 1 for tomorrow, etc.
  title: string;
  timeRange: string;
  type: 'lecture' | 'call' | 'study' | 'lab';
  badgeColor: string;
}

export interface DayAnalysis {
  day: string;
  activeHours: number;
  pauseHours: number;
  activeLabel: string;
  pauseLabel: string;
}

export interface WorkingTimeDataset {
  periodLabel: string;
  totalTime: string;
  days: DayAnalysis[];
}

export interface DailyHoursPeriod {
  period: string;
  total: string;
  active: string;
  pause: string;
  activePercent: number;
  pausePercent: number;
}

export interface NoteChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MonthlyGoalItem {
  month: string;
  percentage: number;
}

export interface TaskCountDataset {
  total: number;
  change: string;
  counts: number[];
  avatars: { name: string; initials: string; bg: string; text?: string }[];
}

export interface ProjectSubtask {
  id: string;
  title: string;
  time: string;
  minutes: number;
  completed: boolean;
}

export interface ProjectDataset {
  projectName: string;
  dateRange: string;
  commentsCount: number;
  subtasks: ProjectSubtask[];
}

// 1. Weekly Schedule Rows
export const SCHEDULE_ITEMS: MeetingItem[] = [
  {
    id: 's1',
    dayOffset: 0,
    title: 'Data Structures Lecture',
    timeRange: '10:00 – 11:30',
    type: 'lecture',
    badgeColor: '#4DA3FF',
  },
  {
    id: 's2',
    dayOffset: 1,
    title: 'Project Sprint Sync',
    timeRange: '13:00 – 13:45',
    type: 'call',
    badgeColor: '#8B7CF6',
  },
  {
    id: 's3',
    dayOffset: 2,
    title: 'Study Group – Algorithms',
    timeRange: '15:00 – 16:30',
    type: 'study',
    badgeColor: '#2E9E5E',
  },
  {
    id: 's4',
    dayOffset: 3,
    title: 'Advisor Meeting',
    timeRange: '16:45 – 17:30',
    type: 'lab',
    badgeColor: '#F5A524',
  },
];

// 2. Working Time Analysis (3 sets for the 3 pagination dots)
export const TIME_ANALYSIS_SETS: WorkingTimeDataset[] = [
  {
    periodLabel: 'This Week',
    totalTime: '36h 15m',
    days: [
      { day: 'Mon', activeHours: 5.5, pauseHours: 1.8, activeLabel: '24h active', pauseLabel: '9h 15m pause' },
      { day: 'Tue', activeHours: 7.2, pauseHours: 2.1, activeLabel: '25h active', pauseLabel: '9h 45m pause' },
      { day: 'Wed', activeHours: 6.8, pauseHours: 1.9, activeLabel: '26h active time', pauseLabel: '10h 15m pause time' },
      { day: 'Thu', activeHours: 8.4, pauseHours: 2.4, activeLabel: '28h active', pauseLabel: '11h pause' },
      { day: 'Fri', activeHours: 5.2, pauseHours: 1.6, activeLabel: '22h active', pauseLabel: '8h 30m pause' },
    ],
  },
  {
    periodLabel: 'Last Week',
    totalTime: '38h 40m',
    days: [
      { day: 'Mon', activeHours: 6.1, pauseHours: 2.0, activeLabel: '26h active', pauseLabel: '10h pause' },
      { day: 'Tue', activeHours: 7.8, pauseHours: 2.3, activeLabel: '27h active', pauseLabel: '10h 30m pause' },
      { day: 'Wed', activeHours: 8.0, pauseHours: 2.2, activeLabel: '28h active', pauseLabel: '11h pause' },
      { day: 'Thu', activeHours: 7.5, pauseHours: 1.9, activeLabel: '26h 30m active', pauseLabel: '9h 45m pause' },
      { day: 'Fri', activeHours: 6.0, pauseHours: 1.7, activeLabel: '24h active', pauseLabel: '8h 15m pause' },
    ],
  },
  {
    periodLabel: 'Sprint Cycle',
    totalTime: '34h 50m',
    days: [
      { day: 'Mon', activeHours: 5.0, pauseHours: 1.5, activeLabel: '22h active', pauseLabel: '8h pause' },
      { day: 'Tue', activeHours: 6.5, pauseHours: 2.0, activeLabel: '25h active', pauseLabel: '9h pause' },
      { day: 'Wed', activeHours: 7.0, pauseHours: 1.8, activeLabel: '26h active', pauseLabel: '9h 30m pause' },
      { day: 'Thu', activeHours: 7.2, pauseHours: 2.2, activeLabel: '27h active', pauseLabel: '10h pause' },
      { day: 'Fri', activeHours: 5.8, pauseHours: 1.5, activeLabel: '23h active', pauseLabel: '8h pause' },
    ],
  },
];

// 3. Daily Working Hours Periods
export const DAILY_HOURS_PERIODS: DailyHoursPeriod[] = [
  {
    period: 'Today',
    total: '8h 27m',
    active: '6h 17m',
    pause: '2h 10m',
    activePercent: 74,
    pausePercent: 26,
  },
  {
    period: 'Yesterday',
    total: '7h 45m',
    active: '5h 50m',
    pause: '1h 55m',
    activePercent: 75,
    pausePercent: 25,
  },
  {
    period: 'Last Week Avg',
    total: '8h 10m',
    active: '6h 05m',
    pause: '2h 05m',
    activePercent: 74,
    pausePercent: 26,
  },
];

// 4. Initial Note Checklist Items
export const INITIAL_NOTE_CHECKLIST: NoteChecklistItem[] = [
  { id: 'nc1', text: 'Weekly review slots', completed: true },
  { id: 'nc2', text: 'Updated focus blocks with travel buffers', completed: false },
];

export const NOTE_WAVEFORM_BARS = [
  28, 45, 65, 38, 75, 92, 60, 42, 85, 70, 95, 62, 48, 78, 52, 88, 64, 30,
];

// 5. Monthly Goals Data
export const MONTHLY_GOALS: MonthlyGoalItem[] = [
  { month: 'November Goals', percentage: 82 },
  { month: 'October Goals', percentage: 91 },
  { month: 'September Goals', percentage: 76 },
];

// 6. Number of Tasks Datasets
export const TASK_COUNT_SETS: TaskCountDataset[] = [
  {
    total: 146,
    change: '+14',
    counts: [11, 14, 9, 15, 12],
    avatars: [
      { name: 'Alex Chen', initials: 'AC', bg: '#4DA3FF' },
      { name: 'Maya Patel', initials: 'MP', bg: '#C8F03C', text: '#141414' },
      { name: 'Sam Wilson', initials: 'SW', bg: '#FF7A6B' },
      { name: 'Elena Rostova', initials: 'ER', bg: '#8B7CF6' },
      { name: 'David Kim', initials: 'DK', bg: '#3DB772' },
    ],
  },
  {
    total: 132,
    change: '+8',
    counts: [10, 12, 14, 11, 13],
    avatars: [
      { name: 'Maya Patel', initials: 'MP', bg: '#C8F03C', text: '#141414' },
      { name: 'Alex Chen', initials: 'AC', bg: '#4DA3FF' },
      { name: 'David Kim', initials: 'DK', bg: '#3DB772' },
      { name: 'Sam Wilson', initials: 'SW', bg: '#FF7A6B' },
      { name: 'Elena Rostova', initials: 'ER', bg: '#8B7CF6' },
    ],
  },
  {
    total: 158,
    change: '+22',
    counts: [13, 15, 12, 14, 15],
    avatars: [
      { name: 'Elena Rostova', initials: 'ER', bg: '#8B7CF6' },
      { name: 'Sam Wilson', initials: 'SW', bg: '#FF7A6B' },
      { name: 'Alex Chen', initials: 'AC', bg: '#4DA3FF' },
      { name: 'Maya Patel', initials: 'MP', bg: '#C8F03C', text: '#141414' },
      { name: 'David Kim', initials: 'DK', bg: '#3DB772' },
    ],
  },
];

// 7. Tasks List Projects
export const TASKS_PROJECT_SETS: ProjectDataset[] = [
  {
    projectName: 'Final Year Project',
    dateRange: 'Nov 24 – Dec 15',
    commentsCount: 8,
    subtasks: [
      { id: 'st1', title: 'Research & Preparation', time: '2h 15m', minutes: 135, completed: true },
      { id: 'st2', title: 'Prototype & Design Review', time: '6h 45m', minutes: 405, completed: true },
      { id: 'st3', title: 'Final Report Draft', time: '40m', minutes: 40, completed: false },
    ],
  },
  {
    projectName: 'Distributed Systems Lab',
    dateRange: 'Nov 18 – Dec 05',
    commentsCount: 5,
    subtasks: [
      { id: 'st4', title: 'Consensus Algorithm Spec', time: '3h 30m', minutes: 210, completed: true },
      { id: 'st5', title: 'RPC Benchmark Suite', time: '4h 15m', minutes: 255, completed: false },
      { id: 'st6', title: 'Failure Recovery Tests', time: '1h 45m', minutes: 105, completed: false },
    ],
  },
];

