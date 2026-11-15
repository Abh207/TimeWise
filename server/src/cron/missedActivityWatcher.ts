import cron from 'node-cron';
import { seedEvents, seedNotifications } from '../seed/seedData.js';
import type { NotificationItem } from '../types/index.js';

export function startMissedActivityWatcher() {
  console.log('[TimeWise Watcher] Cron service initialized for missed activities detection.');

  // Check every minute in production
  cron.schedule('* * * * *', () => {
    const now = new Date().getTime();

    for (const event of seedEvents) {
      const eventEnd = new Date(event.endTime).getTime();
      
      // If event ended > 5 mins ago and still marked 'scheduled', trigger missed activity review alert
      if (now > eventEnd + 5 * 60 * 1000 && event.status === 'scheduled') {
        const notifExists = seedNotifications.some(
          n => n.relatedEntityId === event.id && n.type === 'missed_activity'
        );

        if (!notifExists) {
          const missedNotif: NotificationItem = {
            id: `notif-missed-${Date.now()}`,
            userId: event.userId,
            type: 'missed_activity',
            title: `Missed or Incomplete: "${event.title}"`,
            message: `This activity ended at ${new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Please review: did you complete it, or should TimeWise reschedule it for your next free slot?`,
            isRead: false,
            actionRequired: true,
            relatedEntityId: event.id,
            createdAt: new Date().toISOString()
          };

          seedNotifications.unshift(missedNotif);
          console.log(`[TimeWise Watcher] Created missed activity notification for: ${event.title}`);
        }
      }
    }
  });
}

