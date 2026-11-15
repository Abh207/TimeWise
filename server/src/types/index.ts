export type ActivityCategory = 'Academic' | 'Work' | 'Study' | 'Health' | 'Personal' | 'Break' | 'Meeting';

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
  recurrenceRule?: string; // 'daily' | 'weekly' | 'weekdays'
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location?: string;
  travelTimeMinutes?: number;
  status: 'scheduled' | 'completed' | 'missed' | 'rescheduled';
  createdAt: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: string;
  deadlineTime?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  smartPriorityScore: number;
  subtasks?: { id: string; title: string; isCompleted: boolean }[];
  isCompleted: boolean;
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

export interface ScheduleConflict {
  eventA: TimetableEvent;
  eventB: TimetableEvent;
  overlapMinutes: number;
  resolutionSuggestion: string;
}

