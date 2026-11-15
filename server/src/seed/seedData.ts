import type { TimetableEvent, Task, Habit, NotificationItem } from '../types/index.js';

const today = new Date().toISOString().split('T')[0];

export const seedEvents: TimetableEvent[] = [
  {
    id: 'evt-1',
    userId: 'demo-user-1',
    title: 'Advanced Data Structures & Algorithms',
    description: 'Graph algorithms: Dijkstra, Bellman-Ford, and Minimum Spanning Trees in Room CS-301',
    category: 'Academic',
    color: '#8b5cf6',
    startTime: `${today}T09:00:00.000Z`,
    endTime: `${today}T10:30:00.000Z`,
    priority: 'high',
    location: 'CS Hall 301, Engineering Block',
    travelTimeMinutes: 15,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-2',
    userId: 'demo-user-1',
    title: 'Distributed Systems & Cloud Computing',
    description: 'Raft consensus algorithm lecture and lab assignment briefing',
    category: 'Academic',
    color: '#3b82f6',
    startTime: `${today}T11:00:00.000Z`,
    endTime: `${today}T12:30:00.000Z`,
    priority: 'high',
    location: 'Tech Hub B204',
    travelTimeMinutes: 10,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-3',
    userId: 'demo-user-1',
    title: 'Healthy Lunch & Mindful Walk',
    description: 'Step away from screens, nutrition recharge',
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
    userId: 'demo-user-1',
    title: 'AI Capstone Team Sync',
    description: 'Weekly sprint planning, model accuracy benchmarks review and deployment checklist',
    category: 'Meeting',
    color: '#f59e0b',
    startTime: `${today}T14:00:00.000Z`,
    endTime: `${today}T15:00:00.000Z`,
    priority: 'urgent',
    location: 'Google Meet / Room 402',
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-5',
    userId: 'demo-user-1',
    title: 'Deep Work: Frontend Microservices Architecture',
    description: 'Refactoring state management and implementing offline-first sync',
    category: 'Work',
    color: '#6366f1',
    startTime: `${today}T15:30:00.000Z`,
    endTime: `${today}T17:30:00.000Z`,
    priority: 'high',
    location: 'Study Library Desk 12',
    status: 'scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-6',
    userId: 'demo-user-1',
    title: 'Gym & Cardio Workout',
    description: 'Push workout + 20 mins HIIT cardio',
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

export const seedTasks: Task[] = [
  {
    id: 'task-1',
    userId: 'demo-user-1',
    title: 'Implement Raft Consensus State Machine',
    description: 'Complete heartbeat leader election and append-entries RPC log replication in Go',
    dueDate: today,
    priority: 'urgent',
    status: 'in_progress',
    category: 'Academic',
    estimatedMinutes: 90,
    actualMinutes: 45,
    smartPriorityScore: 95,
    subtasks: [
      { id: 'st-1', title: 'Leader election timer', isCompleted: true },
      { id: 'st-2', title: 'AppendEntries RPC handling', isCompleted: true },
      { id: 'st-3', title: 'CommitIndex state machine pass', isCompleted: false },
    ],
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    userId: 'demo-user-1',
    title: 'Solve 3 LeetCode Hard DP Questions',
    description: 'Focus on Burst Balloons and Edit Distance with space optimization',
    dueDate: today,
    priority: 'high',
    status: 'pending',
    category: 'Study',
    estimatedMinutes: 60,
    smartPriorityScore: 88,
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    userId: 'demo-user-1',
    title: 'Review System Design Chapter: Distributed Caching',
    description: 'Cache invalidation strategies, Redis Cluster replication, and thundering herd mitigation',
    dueDate: today,
    priority: 'medium',
    status: 'pending',
    category: 'Study',
    estimatedMinutes: 45,
    smartPriorityScore: 72,
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    userId: 'demo-user-1',
    title: 'Submit Machine Learning Project Milestone 2',
    description: 'Upload Jupyter Notebook with ROC-AUC curve comparisons and precision-recall graphs',
    dueDate: today,
    priority: 'urgent',
    status: 'completed',
    category: 'Academic',
    estimatedMinutes: 40,
    actualMinutes: 35,
    smartPriorityScore: 92,
    isCompleted: true,
    createdAt: new Date().toISOString()
  }
];

export const seedHabits: Habit[] = [
  {
    id: 'habit-1',
    userId: 'demo-user-1',
    name: 'Coding & LeetCode Daily',
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
    userId: 'demo-user-1',
    name: 'Drink 3L Water',
    category: 'Health',
    frequency: 'daily',
    targetValue: 3000,
    unit: 'ml',
    currentStreak: 12,
    longestStreak: 21,
    color: '#06b6d4',
    completedDates: [today],
    createdAt: new Date().toISOString()
  },
  {
    id: 'habit-3',
    userId: 'demo-user-1',
    name: 'Read Non-Fiction Book',
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
    userId: 'demo-user-1',
    name: 'Gym / Calisthenics Routine',
    category: 'Fitness',
    frequency: 'daily',
    targetValue: 45,
    unit: 'mins',
    currentStreak: 5,
    longestStreak: 14,
    color: '#f43f5e',
    completedDates: [],
    createdAt: new Date().toISOString()
  }
];

export const seedNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'demo-user-1',
    type: 'reminder',
    title: 'Upcoming: Distributed Systems Lecture',
    message: 'Starts in 15 minutes at Tech Hub B204. Walk duration is approx 10 minutes.',
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-2',
    userId: 'demo-user-1',
    type: 'weather_alert',
    title: 'Rain Forecasted for Evening Exercise',
    message: 'Precipitation probability is 70% at 18:00. TimeWise recommends shifting workout to indoor gym.',
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-3',
    userId: 'demo-user-1',
    type: 'streak_risk',
    title: 'Streak at Risk: 20 Pages Reading',
    message: 'You have kept your 8-day reading streak alive! Complete 20 pages before 23:00 to advance to Level 4.',
    isRead: true,
    createdAt: new Date().toISOString()
  }
];

