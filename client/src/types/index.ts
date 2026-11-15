export type ActivityCategory = 
  | 'Academic' 
  | 'Work' 
  | 'Study' 
  | 'Health' 
  | 'Personal' 
  | 'Break' 
  | 'Meeting';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  role: 'student' | 'professional' | 'freelancer' | 'researcher';
  wakeTime: string; // '07:00'
  sleepTime: string; // '23:00'
  avatarUrl?: string;
  bio?: string;
  level: number;
  xp: number;
  onboardingCompleted: boolean;
  locationPermissionGranted: boolean;
  createdAt: string;
}

export interface TimetableEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: ActivityCategory;
  color: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  isRecurring?: boolean;
  recurrenceRule?: 'none' | 'daily' | 'weekly' | 'weekdays';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location?: string;
  travelTimeMinutes?: number;
  status: 'scheduled' | 'completed' | 'missed' | 'rescheduled';
  rotationCycle?: 'Week A' | 'Week B' | 'Day 1' | 'Day 2' | 'All';
  reminderMinutes?: number;
  createdAt: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: string; // YYYY-MM-DD
  deadlineTime?: string; // HH:mm
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  smartPriorityScore: number;
  subtasks?: { id: string; title: string; isCompleted: boolean }[];
  tags?: string[];
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  category: string;
  frequency: 'daily' | 'weekdays' | 'weekly';
  targetValue: number;
  unit: string;
  currentStreak: number;
  longestStreak: number;
  color: string;
  completedDates: string[]; // ['YYYY-MM-DD']
  graceDaysUsedThisWeek?: number;
  createdAt: string;
}

export interface FocusSession {
  id: string;
  userId: string;
  taskId?: string;
  taskTitle?: string;
  mode: 'pomodoro' | 'deep_work' | 'custom';
  durationMinutes: number;
  completedMinutes: number;
  distractionCount: number;
  distractionNotes?: string;
  timestamp: string;
}

export interface PersonalRecord {
  id: string;
  userId: string;
  type: 'project' | 'daily_log' | 'custom';
  title: string;
  category: string;
  recordDate: string;
  tags: string[];
  details: {
    status?: string;
    progressPercentage?: number;
    hoursSpent?: number;
    mood?: 'Great' | 'Good' | 'Neutral' | 'Tired' | 'Stressed';
    sleepHours?: number;
    waterLiters?: number;
    mealsSummary?: string;
    expenseAmount?: number;
    journalNotes?: string;
    customFields?: Record<string, string | number>;
  };
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'missed_activity' | 'reminder' | 'streak_risk' | 'weather_alert' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedEntityId?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  targetDate: string;
  progressPercentage: number;
  milestones: { id: string; title: string; isCompleted: boolean }[];
  status: 'in_progress' | 'completed' | 'abandoned';
  createdAt: string;
}

export interface SavedLocation {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  hourly: { time: string; temp: number; pop: number }[];
  daily: { date: string; tempMax: number; tempMin: number; condition: string; rainProb: number }[];
  advice: string;
}

export interface ScheduleConflict {
  eventA: TimetableEvent;
  eventB: TimetableEvent;
  overlapMinutes: number;
  resolutionSuggestion: string;
}

export interface SmartRecommendation {
  id: string;
  task: Task;
  suggestedStartTime: string;
  suggestedEndTime: string;
  confidenceScore: number;
  reason: string;
  energyLevelFit: 'Peak Energy' | 'Steady Focus' | 'Evening Flow';
}
