import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Bell, 
  Check, 
  Trash2, 
  AlertTriangle, 
  Clock, 
  CloudSun, 
  Flame, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCw
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification, 
    reviewMissedActivity,
    user,
    updateUserPreferences
  } = useStore();

  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all');
  const [browserPermStatus, setBrowserPermStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const requestBrowserPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const perm = await Notification.requestPermission();
      setBrowserPermStatus(perm);
      if (perm === 'granted') {
        new Notification('TimeWise Notifications Active', {
          body: 'You will receive timely alerts before scheduled classes and timetable transitions.'
        });
        triggerConfetti();
      }
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'actionable') return n.actionRequired;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Telemetry Alert Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications & Review Hub</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Review missed commitments, weather alerts, start-of-class reminders, and streak warnings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold glass border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Web Notification Permission Card */}
      <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">Browser Push & Background Notifications</div>
            <div className="text-slate-400 text-[11px]">
              Status: <span className="font-mono text-brand-300 capitalize">{browserPermStatus}</span>
            </div>
          </div>
        </div>

        {browserPermStatus !== 'granted' && (
          <button
            onClick={requestBrowserPermission}
            className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-xs shadow-glow-violet whitespace-nowrap transition-all"
          >
            Enable Browser Alerts
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl glass border border-white/10 text-xs w-fit">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${notifications.filter(n => !n.isRead).length})` },
          { id: 'actionable', label: `Action Needed (${notifications.filter(n => n.actionRequired).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === tab.id
                ? 'bg-brand-600 text-white shadow-glow-violet font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-card border border-white/10 text-xs text-slate-400">
            No notifications in this filter view.
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isMissed = notif.type === 'missed_activity';
            const isWeather = notif.type === 'weather_alert';
            const isStreak = notif.type === 'streak_risk';

            return (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all ${
                  notif.isRead
                    ? 'border-white/5 bg-dark-900/40 opacity-70'
                    : 'border-brand-500/30 glass-card bg-dark-900/80 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/5 flex-shrink-0 mt-0.5">
                      {isMissed && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                      {isWeather && <CloudSun className="w-5 h-5 text-indigo-400" />}
                      {isStreak && <Flame className="w-5 h-5 text-rose-400" />}
                      {!isMissed && !isWeather && !isStreak && <Clock className="w-5 h-5 text-brand-400" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{notif.title}</span>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-brand-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                        {notif.message}
                      </p>
                      <div className="mt-2 text-[10px] text-slate-500 font-mono">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {new Date(notif.createdAt).toLocaleDateString()}
                      </div>

                      {/* Action buttons if missed activity */}
                      {notif.actionRequired && notif.relatedEntityId && (
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => {
                              reviewMissedActivity(notif.relatedEntityId!, 'done');
                              triggerConfetti();
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs"
                          >
                            Mark Done (+50 XP)
                          </button>
                          <button
                            onClick={() => {
                              reviewMissedActivity(notif.relatedEntityId!, 'reschedule');
                              triggerConfetti();
                            }}
                            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg text-xs"
                          >
                            Reschedule to Next Slot
                          </button>
                          <button
                            onClick={() => reviewMissedActivity(notif.relatedEntityId!, 'skip')}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg text-xs"
                          >
                            Skip / Excused
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!notif.isRead && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

