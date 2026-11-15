import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

export const CalendarPage: React.FC = () => {
  const { events, tasks, user } = useStore();
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[] | null>(null);
  const [selectedDayTitle, setSelectedDayTitle] = useState('');

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // First day of month and number of days
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonthDate(new Date());
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingSlots = Array.from({ length: (firstDayIndex + 6) % 7 }, (_, i) => i); // Mon as first day

  const handleDayClick = (dayNum: number, dayEvents: any[]) => {
    setSelectedDayTitle(`${monthName} ${dayNum}, ${year}`);
    setSelectedDayEvents(dayEvents);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Master Schedule Synchronization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Consolidated Calendar</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Unified monthly overview integrating lectures, assignments, milestone deadlines, and exam schedules.
          </p>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-semibold glass border border-white/10 text-slate-200 hover:text-white rounded-xl transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-1 glass p-1 rounded-xl border border-white/10">
            <button
              onClick={prevMonth}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-white font-mono">
              {monthName} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-2 pb-3 border-b border-white/10 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="py-1">{day}</div>
            ))}
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-7 gap-2 pt-3">
            {/* Empty padding slots */}
            {paddingSlots.map(slot => (
              <div key={`pad-${slot}`} className="h-28 rounded-xl bg-white/1 border border-transparent opacity-30" />
            ))}

            {/* Days in Month */}
            {daysArray.map(dayNum => {
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isToday = new Date().toDateString() === new Date(year, month, dayNum).toDateString();

              // Collect events & tasks for this date
              const dayEvents = events.filter(e => e.startTime.startsWith(dateStr));
              const dayTasks = tasks.filter(t => t.dueDate === dateStr);
              const totalItems = [...dayEvents, ...dayTasks];

              return (
                <div
                  key={dayNum}
                  onClick={() => handleDayClick(dayNum, totalItems)}
                  className={`h-28 p-2 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                    isToday
                      ? 'border-brand-500 bg-brand-500/10 shadow-glow-violet'
                      : 'border-white/5 bg-dark-900/60 hover:border-white/20 hover:bg-dark-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isToday ? 'text-brand-300 font-mono' : 'text-slate-300'}`}>
                      {dayNum}
                    </span>
                    {totalItems.length > 0 && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-brand-500/20 text-brand-300 font-mono font-bold">
                        {totalItems.length}
                      </span>
                    )}
                  </div>

                  {/* Micro event pills */}
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map(e => (
                      <div
                        key={e.id}
                        className="text-[10px] px-1.5 py-0.5 rounded truncate text-white font-medium"
                        style={{ backgroundColor: `${e.color}40`, borderLeft: `2px solid ${e.color}` }}
                      >
                        {e.title}
                      </div>
                    ))}
                    {dayTasks.slice(0, 1).map(t => (
                      <div
                        key={t.id}
                        className="text-[10px] px-1.5 py-0.5 rounded truncate text-amber-200 bg-amber-500/20 border-l-2 border-amber-400"
                      >
                        Task: {t.title}
                      </div>
                    ))}
                    {totalItems.length > 3 && (
                      <div className="text-[9px] text-slate-500 pl-1 font-mono">
                        +{totalItems.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      <Modal
        isOpen={selectedDayEvents !== null}
        onClose={() => setSelectedDayEvents(null)}
        title={`Schedule & Commitments: ${selectedDayTitle}`}
      >
        <div className="space-y-3">
          {selectedDayEvents && selectedDayEvents.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No events or tasks scheduled for this date.</p>
          ) : (
            selectedDayEvents?.map((item: any) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-white/10 bg-dark-900 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{item.title}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                    {item.category}
                  </span>
                </div>
                {item.description && (
                  <p className="text-slate-400 text-[11px]">{item.description}</p>
                )}
                <div className="text-slate-400 flex items-center gap-3 pt-1 text-[11px]">
                  {item.startTime && (
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Clock className="w-3 h-3 text-brand-400" />
                      {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};

