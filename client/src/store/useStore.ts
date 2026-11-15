import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  UserProfile, 
  TimetableEvent, 
  Task, 
  Habit, 
  PersonalRecord, 
  FocusSession, 
  NotificationItem, 
  Goal, 
  SavedLocation, 
  WeatherData,
  ScheduleConflict,
  SmartRecommendation
} from '../types';
import { 
  INITIAL_EVENTS, 
  INITIAL_TASKS, 
  INITIAL_HABITS, 
  INITIAL_RECORDS, 
  INITIAL_FOCUS_SESSIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_GOALS, 
  INITIAL_LOCATIONS 
} from '../data/seedData';
import { authService } from '../services/authService';
import { WeatherService } from '../services/weatherService';

interface AppState {
  // User
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  updateUserPreferences: (prefs: Partial<UserProfile>) => void;

  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;

  // Rotation Schedule
  rotationCycle: 'Week A' | 'Week B' | 'Day 1' | 'Day 2';
  setRotationCycle: (cycle: 'Week A' | 'Week B' | 'Day 1' | 'Day 2') => void;

  // Events
  events: TimetableEvent[];
  addEvent: (event: Omit<TimetableEvent, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, updates: Partial<TimetableEvent>) => void;
  deleteEvent: (id: string) => void;
  completeEvent: (id: string) => void;
  rescheduleEvent: (id: string, newStartTime: string, newEndTime: string) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'smartPriorityScore'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTaskComplete: (id: string) => void;
  deleteTask: (id: string) => void;

  // Habits
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => void;
  toggleHabit: (id: string, date?: string) => void;
  deleteHabit: (id: string) => void;
  recoverStreak: (id: string) => void;

  // Focus
  focusSessions: FocusSession[];
  logFocusSession: (session: Omit<FocusSession, 'id' | 'timestamp'>) => void;

  // Records
  records: PersonalRecord[];
  addRecord: (record: Omit<PersonalRecord, 'id' | 'createdAt'>) => void;
  updateRecord: (id: string, updates: Partial<PersonalRecord>) => void;
  deleteRecord: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  reviewMissedActivity: (eventId: string, action: 'done' | 'reschedule' | 'skip') => void;

  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  // Locations
  savedLocations: SavedLocation[];
  addLocation: (loc: Omit<SavedLocation, 'id'>) => void;
  deleteLocation: (id: string) => void;

  // Weather
  weather: WeatherData | null;
  fetchLiveWeather: (lat?: number, lon?: number, city?: string) => Promise<void>;
  setCustomWeather: (weather: WeatherData) => void;

  // Conflict Detection & Smart Planner
  detectConflicts: () => ScheduleConflict[];
  generateSmartPlan: (date?: string) => SmartRecommendation[];
  applyRecommendation: (rec: SmartRecommendation) => void;

  // System
  resetDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User default from session
      user: authService.getSession()?.user || {
        id: 'usr-demo-01',
        email: 'alex.chen@university.edu',
        fullName: 'Alex Chen',
        displayName: 'Alex',
        role: 'student',
        wakeTime: '07:00',
        sleepTime: '23:00',
        level: 4,
        xp: 1420,
        onboardingCompleted: true,
        locationPermissionGranted: true,
        createdAt: new Date().toISOString()
      },
      setUser: (user) => set({ user }),
      updateUserPreferences: (prefs) => {
        set((state) => ({ user: { ...state.user, ...prefs } }));
        authService.updateProfile(prefs);
      },

      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      rotationCycle: 'Week A',
      setRotationCycle: (cycle) => set({ rotationCycle: cycle }),

      // Events
      events: INITIAL_EVENTS,
      addEvent: (eventData) => {
        const newEvent: TimetableEvent = {
          ...eventData,
          id: `evt-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ events: [newEvent, ...state.events] }));
      },
      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e))
        }));
      },
      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id)
        }));
      },
      completeEvent: (id) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, status: 'completed' as const } : e
          ),
          user: { ...state.user, xp: state.user.xp + 50 }
        }));
      },
      rescheduleEvent: (id, newStartTime, newEndTime) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, startTime: newStartTime, endTime: newEndTime, status: 'rescheduled' as const } : e
          )
        }));
      },

      // Tasks
      tasks: INITIAL_TASKS,
      addTask: (taskData) => {
        // Calculate smart priority
        let score = 50;
        if (taskData.priority === 'urgent') score += 30;
        else if (taskData.priority === 'high') score += 20;
        else if (taskData.priority === 'medium') score += 10;
        else score -= 10;

        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}`,
          smartPriorityScore: score,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
        }));
      },
      toggleTaskComplete: (id) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          const wasCompleted = task?.isCompleted;
          const nextCompleted = !wasCompleted;

          return {
            tasks: state.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    isCompleted: nextCompleted,
                    status: nextCompleted ? ('completed' as const) : ('pending' as const),
                    completedAt: nextCompleted ? new Date().toISOString() : undefined
                  }
                : t
            ),
            user: {
              ...state.user,
              xp: nextCompleted ? state.user.xp + 40 : Math.max(0, state.user.xp - 40)
            }
          };
        });
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id)
        }));
      },

      // Habits
      habits: INITIAL_HABITS,
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: `habit-${Date.now()}`,
          currentStreak: 0,
          longestStreak: 0,
          completedDates: [],
          createdAt: new Date().toISOString()
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },
      toggleHabit: (id, targetDate) => {
        const date = targetDate || new Date().toISOString().split('T')[0];
        set((state) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return state;

          const alreadyCompleted = habit.completedDates.includes(date);
          let newDates: string[];
          let newStreak = habit.currentStreak;

          if (alreadyCompleted) {
            newDates = habit.completedDates.filter((d) => d !== date);
            newStreak = Math.max(0, newStreak - 1);
          } else {
            newDates = [...habit.completedDates, date];
            newStreak += 1;
          }

          const longestStreak = Math.max(habit.longestStreak, newStreak);

          return {
            habits: state.habits.map((h) =>
              h.id === id
                ? { ...h, completedDates: newDates, currentStreak: newStreak, longestStreak }
                : h
            ),
            user: {
              ...state.user,
              xp: !alreadyCompleted ? state.user.xp + 30 : Math.max(0, state.user.xp - 30)
            }
          };
        });
      },
      deleteHabit: (id) => {
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) }));
      },
      recoverStreak: (id) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, currentStreak: h.currentStreak + 1, graceDaysUsedThisWeek: 1 } : h
          )
        }));
      },

      // Focus
      focusSessions: INITIAL_FOCUS_SESSIONS,
      logFocusSession: (sessionData) => {
        const newSession: FocusSession = {
          ...sessionData,
          id: `fcs-${Date.now()}`,
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          focusSessions: [newSession, ...state.focusSessions],
          user: { ...state.user, xp: state.user.xp + sessionData.completedMinutes * 2 }
        }));
      },

      // Records
      records: INITIAL_RECORDS,
      addRecord: (recordData) => {
        const newRecord: PersonalRecord = {
          ...recordData,
          id: `rec-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ records: [newRecord, ...state.records] }));
      },
      updateRecord: (id, updates) => {
        set((state) => ({
          records: state.records.map((r) => (r.id === id ? { ...r, ...updates } : r))
        }));
      },
      deleteRecord: (id) => {
        set((state) => ({ records: state.records.filter((r) => r.id !== id) }));
      },

      // Notifications
      notifications: INITIAL_NOTIFICATIONS,
      addNotification: (notifData) => {
        const newNotif: NotificationItem = {
          ...notifData,
          id: `notif-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ notifications: [newNotif, ...state.notifications] }));
      },
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          )
        }));
      },
      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
        }));
      },
      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }));
      },
      reviewMissedActivity: (eventId, action) => {
        const state = get();
        if (action === 'done') {
          state.completeEvent(eventId);
        } else if (action === 'skip') {
          state.updateEvent(eventId, { status: 'missed' });
        } else if (action === 'reschedule') {
          // Push event 2 hours forward
          const event = state.events.find((e) => e.id === eventId);
          if (event) {
            const newStart = new Date(new Date(event.startTime).getTime() + 2 * 3600000).toISOString();
            const newEnd = new Date(new Date(event.endTime).getTime() + 2 * 3600000).toISOString();
            state.rescheduleEvent(eventId, newStart, newEnd);
          }
        }

        // Dismiss related notification
        set((st) => ({
          notifications: st.notifications.map((n) =>
            n.relatedEntityId === eventId ? { ...n, isRead: true, actionRequired: false } : n
          )
        }));
      },

      // Goals
      goals: INITIAL_GOALS,
      addGoal: (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: `goal-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ goals: [...state.goals, newGoal] }));
      },
      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g))
        }));
      },
      toggleMilestone: (goalId, milestoneId) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const updatedMilestones = g.milestones.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
            );
            const completedCount = updatedMilestones.filter((m) => m.isCompleted).length;
            const progressPercentage = Math.round((completedCount / updatedMilestones.length) * 100);
            return {
              ...g,
              milestones: updatedMilestones,
              progressPercentage,
              status: progressPercentage === 100 ? ('completed' as const) : ('in_progress' as const)
            };
          })
        }));
      },

      // Locations
      savedLocations: INITIAL_LOCATIONS,
      addLocation: (locData) => {
        const newLoc: SavedLocation = {
          ...locData,
          id: `loc-${Date.now()}`
        };
        set((state) => ({ savedLocations: [...state.savedLocations, newLoc] }));
      },
      deleteLocation: (id) => {
        set((state) => ({
          savedLocations: state.savedLocations.filter((l) => l.id !== id)
        }));
      },

      // Weather
      weather: null,
      fetchLiveWeather: async (lat, lon, city) => {
        const data = await WeatherService.fetchWeather(lat, lon, city);
        set({ weather: data });
      },
      setCustomWeather: (weather) => set({ weather }),

      // Conflict Detection
      detectConflicts: () => {
        const { events } = get();
        const conflicts: ScheduleConflict[] = [];
        const sorted = [...events].sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

        for (let i = 0; i < sorted.length; i++) {
          for (let j = i + 1; j < sorted.length; j++) {
            const evA = sorted[i];
            const evB = sorted[j];

            const startA = new Date(evA.startTime).getTime();
            const endA = new Date(evA.endTime).getTime();
            const startB = new Date(evB.startTime).getTime();
            const endB = new Date(evB.endTime).getTime();

            const travelBufferA = (evA.travelTimeMinutes || 0) * 60 * 1000;
            if (startB >= endA + travelBufferA) {
              break;
            }

            if (startB < endA) {
              const overlapMinutes = Math.round((Math.min(endA, endB) - Math.max(startA, startB)) / 60000);
              conflicts.push({
                eventA: evA,
                eventB: evB,
                overlapMinutes,
                resolutionSuggestion: `Move "${evB.title}" to start after "${evA.title}" ends at ${new Date(endA).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
              });
            } else if (startB < endA + travelBufferA) {
              const shortage = Math.round((endA + travelBufferA - startB) / 60000);
              conflicts.push({
                eventA: evA,
                eventB: evB,
                overlapMinutes: shortage,
                resolutionSuggestion: `Add ${shortage} min transit buffer between "${evA.title}" and "${evB.title}".`
              });
            }
          }
        }

        return conflicts;
      },

      // Smart Planner Generator
      generateSmartPlan: (date) => {
        const targetDate = date || new Date().toISOString().split('T')[0];
        const { events, tasks, user } = get();

        const dayEvents = events.filter((e) => e.startTime.startsWith(targetDate));
        const sorted = [...dayEvents].sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

        const pendingTasks = tasks
          .filter((t) => !t.isCompleted)
          .sort((a, b) => b.smartPriorityScore - a.smartPriorityScore);

        const recommendations: SmartRecommendation[] = [];
        let currentSlotTime = new Date(`${targetDate}T${user.wakeTime}:00`);

        for (const task of pendingTasks) {
          const durationMins = task.estimatedMinutes || 45;
          let foundSlot = false;

          for (const ev of sorted) {
            const evStart = new Date(ev.startTime);
            const evEnd = new Date(ev.endTime);

            if (evStart.getTime() - currentSlotTime.getTime() >= (durationMins + 15) * 60000) {
              const slotEnd = new Date(currentSlotTime.getTime() + durationMins * 60000);
              recommendations.push({
                id: `rec-${task.id}`,
                task,
                suggestedStartTime: currentSlotTime.toISOString(),
                suggestedEndTime: slotEnd.toISOString(),
                confidenceScore: 94,
                energyLevelFit: currentSlotTime.getHours() < 12 ? 'Peak Energy' : 'Steady Focus',
                reason: `Allocated to morning focus window before "${ev.title}". Includes 15-min travel/buffer interval.`
              });
              currentSlotTime = new Date(slotEnd.getTime() + 15 * 60000);
              foundSlot = true;
              break;
            }

            if (currentSlotTime < evEnd) {
              currentSlotTime = new Date(evEnd.getTime() + 15 * 60000);
            }
          }

          if (!foundSlot) {
            const sleepCutoff = new Date(`${targetDate}T${user.sleepTime}:00`);
            const slotEnd = new Date(currentSlotTime.getTime() + durationMins * 60000);
            if (slotEnd <= sleepCutoff) {
              recommendations.push({
                id: `rec-${task.id}`,
                task,
                suggestedStartTime: currentSlotTime.toISOString(),
                suggestedEndTime: slotEnd.toISOString(),
                confidenceScore: 88,
                energyLevelFit: 'Evening Flow',
                reason: `Positioned in post-dinner deep work slot. Avoids schedule fragmentation and preserves full 8hr sleep window.`
              });
              currentSlotTime = new Date(slotEnd.getTime() + 15 * 60000);
            }
          }
        }

        return recommendations;
      },

      applyRecommendation: (rec) => {
        const { addEvent, completeEvent } = get();
        addEvent({
          userId: rec.task.userId,
          title: `Focus: ${rec.task.title}`,
          description: rec.task.description,
          category: rec.task.category === 'Academic' ? 'Academic' : 'Work',
          color: '#6366f1',
          startTime: rec.suggestedStartTime,
          endTime: rec.suggestedEndTime,
          priority: rec.task.priority,
          status: 'scheduled'
        });
      },

      resetDemoData: () => {
        localStorage.removeItem('timewise_store');
        localStorage.removeItem('timewise_auth_session');
        set({
          events: INITIAL_EVENTS,
          tasks: INITIAL_TASKS,
          habits: INITIAL_HABITS,
          records: INITIAL_RECORDS,
          focusSessions: INITIAL_FOCUS_SESSIONS,
          notifications: INITIAL_NOTIFICATIONS,
          goals: INITIAL_GOALS,
          savedLocations: INITIAL_LOCATIONS
        });
      }
    }),
    {
      name: 'timewise_store',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        rotationCycle: state.rotationCycle,
        events: state.events,
        tasks: state.tasks,
        habits: state.habits,
        records: state.records,
        focusSessions: state.focusSessions,
        notifications: state.notifications,
        goals: state.goals,
        savedLocations: state.savedLocations
      })
    }
  )
);

