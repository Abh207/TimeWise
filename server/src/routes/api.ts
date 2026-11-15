import { Router, Request, Response } from 'express';
import { seedEvents, seedTasks, seedHabits, seedNotifications } from '../seed/seedData.js';
import { SchedulingEngine } from '../services/schedulingEngine.js';

export const apiRouter = Router();

// ==========================================
// 1. TIMETABLE EVENTS
// ==========================================
apiRouter.get('/events', (req: Request, res: Response) => {
  res.json({ success: true, data: seedEvents });
});

apiRouter.post('/events', (req: Request, res: Response) => {
  const newEvent = {
    id: `evt-${Date.now()}`,
    userId: 'demo-user-1',
    createdAt: new Date().toISOString(),
    status: 'scheduled',
    ...req.body
  };
  seedEvents.push(newEvent);
  res.status(201).json({ success: true, data: newEvent });
});

apiRouter.put('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = seedEvents.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  seedEvents[index] = { ...seedEvents[index], ...req.body };
  res.json({ success: true, data: seedEvents[index] });
});

apiRouter.delete('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = seedEvents.findIndex(e => e.id === id);
  if (index !== -1) {
    seedEvents.splice(index, 1);
  }
  res.json({ success: true, message: 'Event deleted' });
});

apiRouter.get('/events/conflicts', (req: Request, res: Response) => {
  const conflicts = SchedulingEngine.detectConflicts(seedEvents);
  res.json({ success: true, data: conflicts });
});

// ==========================================
// 2. TASKS
// ==========================================
apiRouter.get('/tasks', (req: Request, res: Response) => {
  res.json({ success: true, data: seedTasks });
});

apiRouter.post('/tasks', (req: Request, res: Response) => {
  const score = SchedulingEngine.calculateSmartPriority(req.body);
  const newTask = {
    id: `task-${Date.now()}`,
    userId: 'demo-user-1',
    createdAt: new Date().toISOString(),
    smartPriorityScore: score,
    isCompleted: false,
    status: 'pending',
    ...req.body
  };
  seedTasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

apiRouter.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = seedTasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  seedTasks[index] = { ...seedTasks[index], ...req.body };
  res.json({ success: true, data: seedTasks[index] });
});

apiRouter.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = seedTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    seedTasks.splice(index, 1);
  }
  res.json({ success: true, message: 'Task deleted' });
});

// ==========================================
// 3. HABITS & STREAKS
// ==========================================
apiRouter.get('/habits', (req: Request, res: Response) => {
  res.json({ success: true, data: seedHabits });
});

apiRouter.post('/habits/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = req.body;
  const habit = seedHabits.find(h => h.id === id);
  if (!habit) {
    return res.status(404).json({ success: false, message: 'Habit not found' });
  }

  const dateIdx = habit.completedDates.indexOf(date);
  if (dateIdx > -1) {
    habit.completedDates.splice(dateIdx, 1);
    habit.currentStreak = Math.max(0, habit.currentStreak - 1);
  } else {
    habit.completedDates.push(date);
    habit.currentStreak += 1;
    if (habit.currentStreak > habit.longestStreak) {
      habit.longestStreak = habit.currentStreak;
    }
  }

  res.json({ success: true, data: habit });
});

// ==========================================
// 4. SMART PLANNER RECOMMENDATIONS
// ==========================================
apiRouter.post('/planner/generate', (req: Request, res: Response) => {
  const date = (req.body.date as string) || new Date().toISOString().split('T')[0];
  const recommendations = SchedulingEngine.generatePlan(seedEvents, seedTasks, date);
  res.json({
    success: true,
    data: {
      date,
      totalRecommended: recommendations.length,
      recommendations
    }
  });
});

// ==========================================
// 5. NOTIFICATIONS
// ==========================================
apiRouter.get('/notifications', (req: Request, res: Response) => {
  res.json({ success: true, data: seedNotifications });
});

apiRouter.put('/notifications/:id/read', (req: Request, res: Response) => {
  const { id } = req.params;
  const notif = seedNotifications.find(n => n.id === id);
  if (notif) notif.isRead = true;
  res.json({ success: true, data: notif });
});

// ==========================================
// 6. ANALYTICS & TIME UTILIZATION
// ==========================================
apiRouter.get('/analytics/summary', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      plannedHours: 7.5,
      actualProductiveHours: 6.2,
      wastedHours: 1.3,
      productivityScore: 84,
      categoryDistribution: [
        { name: 'Academic', hours: 3.0, fill: '#8b5cf6' },
        { name: 'Study', hours: 2.0, fill: '#3b82f6' },
        { name: 'Work', hours: 2.0, fill: '#6366f1' },
        { name: 'Health', hours: 1.25, fill: '#ef4444' },
        { name: 'Break', hours: 1.0, fill: '#10b981' },
      ],
      weeklyTrend: [
        { day: 'Mon', productive: 6.5, wasted: 1.0 },
        { day: 'Tue', productive: 7.2, wasted: 0.8 },
        { day: 'Wed', productive: 6.0, wasted: 1.5 },
        { day: 'Thu', productive: 7.8, wasted: 0.5 },
        { day: 'Fri', productive: 5.5, wasted: 2.0 },
        { day: 'Sat', productive: 6.8, wasted: 1.2 },
        { day: 'Sun', productive: 4.5, wasted: 2.2 },
      ]
    }
  });
});

