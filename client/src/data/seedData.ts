import type { TimetableEvent, Task, Habit, PersonalRecord, FocusSession, NotificationItem, Goal, SavedLocation } from '../types';

const today = new Date().toISOString().split('T')[0];

export const INITIAL_EVENTS: TimetableEvent[] = [
  {
    id: 'evt-1',
    userId: 'usr-demo-01',
    title: 'Advanced Algorithms & Complexity',
    description: 'Graph algorithms: Dijkstra, Bellman-Ford, and Flow Networks in Hall CS-301',
    category: 'Academic',
    color: '#8b5cf6',
    startTime: `${today}T09:00:00.000Z`,
    endTime: `${today}T10:30:00.000Z`,
    priority: 'high',
    location: 'CS Hall 301, Engineering Wing',
    travelTimeMinutes: 15,
    status: 'completed',
    rotationCycle: 'Week A',
    reminderMinutes: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-2',
    userId: 'usr-demo-01',
    title: 'Distributed Systems Lecture',
    description: 'Raft Consensus Protocol and Fault Tolerance Lab intro',
    category: 'Academic',
    color: '#3b82f6',
    startTime: `${today}T11:00:00.000Z`,
    endTime: `${today}T12:30:00.000Z`,
    priority: 'high',
    location: 'Tech Hub B204',
    travelTimeMinutes: 10,
    status: 'scheduled',
    rotationCycle: 'Week A',
    reminderMinutes: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-3',
    userId: 'usr-demo-01',
    title: 'Nutritious Lunch & Outdoor Walk',
    description: 'Mindful recharge away from all blue screens',
    category: 'Break',
    color: '#10b981',
    startTime: `${today}T12:30:00.000Z`,
    endTime: `${today}T13:30:00.000Z`,
    priority: 'medium',
    location: 'Campus Green Café',
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-4',
    userId: 'usr-demo-01',
    title: 'AI Capstone Team Sync',
    description: 'Weekly team sprint review, model accuracy benchmarks & staging deploy checklist',
    category: 'Meeting',
    color: '#f59e0b',
    startTime: `${today}T14:00:00.000Z`,
    endTime: `${today}T15:00:00.000Z`,
    priority: 'urgent',
    location: 'Room 402 / Meet',
    travelTimeMinutes: 5,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-5',
    userId: 'usr-demo-01',
    title: 'Deep Work: Microservices Architecture',
    description: 'State management refactor, WebSockets & offline-first IndexedDB sync',
    category: 'Work',
    color: '#6366f1',
    startTime: `${today}T15:30:00.000Z`,
    endTime: `${today}T17:30:00.000Z`,
    priority: 'high',
    location: 'Main Library 4th Floor',
    travelTimeMinutes: 10,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-6',
    userId: 'usr-demo-01',
    title: 'Gym & Cardio Workout',
    description: 'Strength training (Chest & Triceps) followed by 20m high-cadence cycling',
    category: 'Health',
    color: '#ef4444',
    startTime: `${today}T18:00:00.000Z`,
    endTime: `${today}T19:15:00.000Z`,
    priority: 'medium',
    location: 'FitZone University Gym',
    travelTimeMinutes: 15,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    userId: 'usr-demo-01',
    title: 'Implement Raft Consensus State Machine',
    description: 'Complete heartbeat leader election and append-entries RPC log replication in Go',
    dueDate: today,
    deadlineTime: '17:00',
    priority: 'urgent',
    status: 'in_progress',
    category: 'Academic',
    estimatedMinutes: 90,
    actualMinutes: 45,
    smartPriorityScore: 96,
    subtasks: [
      { id: 'st-1', title: 'Leader election randomized timer', isCompleted: true },
      { id: 'st-2', title: 'AppendEntries RPC handling', isCompleted: true },
      { id: 'st-3', title: 'CommitIndex state machine execution', isCompleted: false },
    ],
    tags: ['Go', 'Distributed', 'Assignment'],
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    userId: 'usr-demo-01',
    title: 'Solve 3 LeetCode Hard Dynamic Programming',
    description: 'Focus on Burst Balloons, Edit Distance with memory compression, and Palindrome Partitioning',
    dueDate: today,
    deadlineTime: '21:00',
    priority: 'high',
    status: 'pending',
    category: 'Study',
    estimatedMinutes: 60,
    smartPriorityScore: 88,
    tags: ['DSA', 'LeetCode', 'Interview'],
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    userId: 'usr-demo-01',
    title: 'Review System Design Chapter: Distributed Caching',
    description: 'Cache invalidation strategies, write-through vs write-behind, and Redis Sentinel replication',
    dueDate: today,
    deadlineTime: '22:30',
    priority: 'medium',
    status: 'pending',
    category: 'Study',
    estimatedMinutes: 45,
    smartPriorityScore: 74,
    tags: ['System Design', 'Redis'],
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    userId: 'usr-demo-01',
    title: 'Submit ML Assignment 3: Transformer Attention',
    description: 'Implement multi-head self-attention module in PyTorch and write experimental report',
    dueDate: today,
    priority: 'urgent',
    status: 'completed',
    category: 'Academic',
    estimatedMinutes: 50,
    actualMinutes: 40,
    smartPriorityScore: 92,
    tags: ['PyTorch', 'ML', 'Homework'],
    isCompleted: true,
    completedAt: `${today}T10:15:00.000Z`,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    userId: 'usr-demo-01',
    name: 'Coding & LeetCode Practice',
    category: 'Coding',
    frequency: 'daily',
    targetValue: 60,
    unit: 'mins',
    currentStreak: 19,
    longestStreak: 34,
    color: '#8b5cf6',
    completedDates: [today],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit-2',
    userId: 'usr-demo-01',
    name: 'Drink 3 Liters Water',
    category: 'Health',
    frequency: 'daily',
    targetValue: 3000,
    unit: 'ml',
    currentStreak: 14,
    longestStreak: 21,
    color: '#06b6d4',
    completedDates: [today],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit-3',
    userId: 'usr-demo-01',
    name: 'Read Non-Fiction Literature',
    category: 'Growth',
    frequency: 'daily',
    targetValue: 20,
    unit: 'pages',
    currentStreak: 8,
    longestStreak: 15,
    color: '#10b981',
    completedDates: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit-4',
    userId: 'usr-demo-01',
    name: 'Gym & Cardio Routine',
    category: 'Fitness',
    frequency: 'daily',
    targetValue: 45,
    unit: 'mins',
    currentStreak: 6,
    longestStreak: 18,
    color: '#ef4444',
    completedDates: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit-5',
    userId: 'usr-demo-01',
    name: 'Sleep 8 Hours Schedule',
    category: 'Recovery',
    frequency: 'daily',
    targetValue: 8,
    unit: 'hours',
    currentStreak: 11,
    longestStreak: 25,
    color: '#f59e0b',
    completedDates: [today],
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_RECORDS: PersonalRecord[] = [
  {
    id: 'rec-1',
    userId: 'usr-demo-01',
    type: 'project',
    title: 'TimeWise Intelligent Architecture',
    category: 'Engineering',
    recordDate: today,
    tags: ['React', 'TypeScript', 'Tailwind', 'Architecture'],
    details: {
      status: 'In Progress',
      progressPercentage: 85,
      hoursSpent: 16.5,
      journalNotes: 'Finalized offline-first data synchronization, rule-based scheduler with explanations, and Web Audio focus synthesizer.'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: 'rec-2',
    userId: 'usr-demo-01',
    type: 'daily_log',
    title: 'Daily Productivity & Wellness Check-in',
    category: 'Wellness',
    recordDate: today,
    tags: ['Reflection', 'Focus', 'Fitness'],
    details: {
      mood: 'Great',
      sleepHours: 7.5,
      waterLiters: 2.8,
      mealsSummary: 'High protein oatmeal, chicken avocado bowl, Greek yogurt with berries',
      expenseAmount: 14.50,
      journalNotes: 'Energy peaked at 10 AM during the algorithms session. Consistent hydration noticeably helped afternoon coding.'
    },
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_FOCUS_SESSIONS: FocusSession[] = [
  {
    id: 'fcs-1',
    userId: 'usr-demo-01',
    taskId: 'task-1',
    taskTitle: 'Raft Consensus State Machine',
    mode: 'pomodoro',
    durationMinutes: 25,
    completedMinutes: 25,
    distractionCount: 0,
    timestamp: `${today}T09:30:00.000Z`
  },
  {
    id: 'fcs-2',
    userId: 'usr-demo-01',
    taskId: 'task-4',
    taskTitle: 'Transformer Attention PyTorch',
    mode: 'deep_work',
    durationMinutes: 45,
    completedMinutes: 45,
    distractionCount: 1,
    distractionNotes: 'Checked Slack message for 30s',
    timestamp: `${today}T10:15:00.000Z`
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-demo-01',
    type: 'reminder',
    title: 'Upcoming: Distributed Systems Lecture',
    message: 'Starts in 15 minutes at Tech Hub B204. Estimated transit buffer is 10 minutes.',
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-2',
    userId: 'usr-demo-01',
    type: 'weather_alert',
    title: 'Precipitation Warning for Evening Workout',
    message: '70% chance of rain at 18:00. TimeWise recommends shifting cardio workout to the indoor FitZone campus facility.',
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-3',
    userId: 'usr-demo-01',
    type: 'streak_risk',
    title: 'Streak at Risk: 20 Pages Reading',
    message: 'You have sustained an 8-day reading streak! Read 20 pages before 23:00 to advance to Level 5.',
    isRead: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-1',
    userId: 'usr-demo-01',
    title: 'Achieve 3.9+ GPA in Fall Semester',
    description: 'Maintain top marks in Algorithms, Distributed Systems and Operating Systems',
    timeframe: 'monthly',
    targetDate: '2026-12-20',
    progressPercentage: 88,
    status: 'in_progress',
    milestones: [
      { id: 'm-1', title: 'Ace Midterm Exams (avg 94%)', isCompleted: true },
      { id: 'm-2', title: 'Submit All Coding Assignments on time', isCompleted: true },
      { id: 'm-3', title: 'Final Project Submission & Presentation', isCompleted: false },
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'goal-2',
    userId: 'usr-demo-01',
    title: 'Solve 150 LeetCode Questions',
    description: 'Solidify DP, Graph, and Tree patterns for upcoming software engineering interviews',
    timeframe: 'quarterly',
    targetDate: '2027-01-31',
    progressPercentage: 68,
    status: 'in_progress',
    milestones: [
      { id: 'm-21', title: '50 Medium Problems', isCompleted: true },
      { id: 'm-22', title: '50 Graph & Tree Problems', isCompleted: true },
      { id: 'm-23', title: '30 Hard DP Problems', isCompleted: false },
    ],
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_LOCATIONS: SavedLocation[] = [
  { id: 'loc-1', label: 'Home / Apartment', address: '420 University Ave, Suite 3B', lat: 37.7749, lng: -122.4194, isDefault: true },
  { id: 'loc-2', label: 'CS Hall & Tech Hub', address: 'Engineering Building, 3rd Floor', lat: 37.7785, lng: -122.4150, isDefault: false },
  { id: 'loc-3', label: 'FitZone Gym', address: 'Campus Recreation Center', lat: 37.7710, lng: -122.4220, isDefault: false },
  { id: 'loc-4', label: 'Central Library', address: 'Main Academic Quad Desk 12', lat: 37.7760, lng: -122.4180, isDefault: false },
];

