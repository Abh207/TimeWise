import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { TimetableEvent, ActivityCategory } from '../../types';
import { 
  Calendar, 
  Clock, 
  Plus, 
  AlertTriangle, 
  RotateCw, 
  Download, 
  Upload, 
  MapPin, 
  Trash2, 
  Edit3, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const TimetablePage: React.FC = () => {
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    completeEvent, 
    rescheduleEvent,
    detectConflicts,
    rotationCycle,
    setRotationCycle,
    user
  } = useStore();

  const [currentView, setCurrentView] = useState<'week' | 'day' | 'agenda'>('week');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ActivityCategory>('Academic');
  const [formColor, setFormColor] = useState('#8b5cf6');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('10:30');
  const [formLocation, setFormLocation] = useState('');
  const [formTravelMins, setFormTravelMins] = useState(15);
  const [formPriority, setFormPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [formRecurrence, setFormRecurrence] = useState<'none' | 'daily' | 'weekly' | 'weekdays'>('weekly');
  const [formRotation, setFormRotation] = useState<'Week A' | 'Week B' | 'All'>('Week A');

  // Conflict detection
  const conflicts = detectConflicts();

  // Categories list
  const categories: (ActivityCategory | 'All')[] = [
    'All', 'Academic', 'Work', 'Study', 'Health', 'Break', 'Meeting', 'Personal'
  ];

  // Filtered events
  const filteredEvents = events.filter(e => {
    if (selectedCategory !== 'All' && e.category !== selectedCategory) return false;
    return true;
  });

  // Week days
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hoursOfDay = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM

  const handleOpenAddModal = () => {
    setEditingEventId(null);
    setFormTitle('');
    setFormCategory('Academic');
    setFormColor('#8b5cf6');
    setFormStartTime('09:00');
    setFormEndTime('10:30');
    setFormLocation('Hall CS-301');
    setFormTravelMins(15);
    setFormPriority('medium');
    setFormRecurrence('weekly');
    setFormRotation('Week A');
    setIsEventModalOpen(true);
  };

  const handleOpenEditModal = (event: TimetableEvent) => {
    setEditingEventId(event.id);
    setFormTitle(event.title);
    setFormCategory(event.category);
    setFormColor(event.color);
    const start = new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const end = new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setFormStartTime(start);
    setFormEndTime(end);
    setFormLocation(event.location || '');
    setFormTravelMins(event.travelTimeMinutes || 0);
    setFormPriority(event.priority);
    setFormRecurrence(event.recurrenceRule || 'none');
    setFormRotation(event.rotationCycle as any || 'Week A');
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const startIso = `${todayStr}T${formStartTime}:00.000Z`;
    const endIso = `${todayStr}T${formEndTime}:00.000Z`;

    if (editingEventId) {
      updateEvent(editingEventId, {
        title: formTitle.trim(),
        category: formCategory,
        color: formColor,
        startTime: startIso,
        endTime: endIso,
        location: formLocation,
        travelTimeMinutes: Number(formTravelMins),
        priority: formPriority,
        recurrenceRule: formRecurrence,
        rotationCycle: formRotation
      });
    } else {
      addEvent({
        userId: user.id,
        title: formTitle.trim(),
        category: formCategory,
        color: formColor,
        startTime: startIso,
        endTime: endIso,
        location: formLocation,
        travelTimeMinutes: Number(formTravelMins),
        priority: formPriority,
        recurrenceRule: formRecurrence,
        rotationCycle: formRotation,
        status: 'scheduled'
      });
      triggerConfetti();
    }

    setIsEventModalOpen(false);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `timewise-schedule-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export to ICS calendar format
  const handleExportICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TimeWise AI//Timetable//EN\n";
    events.forEach(e => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:${e.title}\nDESCRIPTION:${e.description || ''}\nLOCATION:${e.location || ''}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const dataStr = "data:text/calendar;charset=utf-8," + encodeURIComponent(icsContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `timewise-calendar.ics`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Apply Pre-built Template
  const handleApplyTemplate = (type: 'student' | 'engineer' | 'fitness') => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (type === 'student') {
      addEvent({
        userId: user.id,
        title: 'Computer Architecture & Assembly',
        category: 'Academic',
        color: '#8b5cf6',
        startTime: `${todayStr}T08:30:00.000Z`,
        endTime: `${todayStr}T10:00:00.000Z`,
        priority: 'high',
        location: 'Hall B102',
        travelTimeMinutes: 10,
        status: 'scheduled',
        rotationCycle: 'Week A'
      });
      addEvent({
        userId: user.id,
        title: 'Operating Systems Kernel Lab',
        category: 'Academic',
        color: '#3b82f6',
        startTime: `${todayStr}T10:30:00.000Z`,
        endTime: `${todayStr}T12:00:00.000Z`,
        priority: 'high',
        location: 'Tech Lab 4',
        travelTimeMinutes: 10,
        status: 'scheduled',
        rotationCycle: 'Week A'
      });
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Calendar className="w-3.5 h-3.5 text-lime-400" />
            <span>Interactive Timetable Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Advanced Schedule & Classes</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Manage academic periods, recurring events, rotation cycles, and travel buffers with zero overlap friction.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Rotation switcher */}
          <button
            onClick={() => setRotationCycle(rotationCycle === 'Week A' ? 'Week B' : 'Week A')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/30 hover:bg-brand-500/20 transition-all shadow-glow-violet"
          >
            <RotateCw className="w-3.5 h-3.5 text-brand-400" />
            <span>Cycle: {rotationCycle}</span>
          </button>

          {/* Export button */}
          <div className="relative group">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium glass border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          <button
            onClick={handleExportICS}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium glass border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Download .ics for Google Calendar / Apple Calendar"
          >
            <span>.ICS</span>
          </button>

          {/* Add Activity Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Conflict Resolution Banner if conflicts detected */}
      {conflicts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Conflict Detected: {conflicts.length} Overlapping Activity / Insufficient Transit Buffer</span>
          </div>
          {conflicts.map((conf, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-dark-900/80 border border-amber-500/20 text-xs flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-white">"{conf.eventA.title}"</span> overlaps with{' '}
                <span className="font-semibold text-white">"{conf.eventB.title}"</span> ({conf.overlapMinutes} mins).
                <div className="text-slate-300 text-[11px] mt-0.5">{conf.resolutionSuggestion}</div>
              </div>
              <button
                onClick={() => {
                  const newStart = new Date(new Date(conf.eventA.endTime).getTime() + 15 * 60000).toISOString();
                  const newEnd = new Date(new Date(conf.eventA.endTime).getTime() + 75 * 60000).toISOString();
                  rescheduleEvent(conf.eventB.id, newStart, newEnd);
                }}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg text-xs whitespace-nowrap shadow-glow-violet"
              >
                Auto-Fix Slot
              </button>
            </div>
          ))}
        </div>
      )}

      {/* View Selectors & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow-violet font-semibold'
                  : 'glass text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Switcher: Week / Day / Agenda */}
        <div className="flex items-center gap-1 p-1 rounded-xl glass border border-white/10 text-xs">
          <button
            onClick={() => setCurrentView('week')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              currentView === 'week' ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setCurrentView('day')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              currentView === 'day' ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setCurrentView('agenda')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              currentView === 'agenda' ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Agenda
          </button>
        </div>
      </div>

      {/* Main Timetable View Area */}
      {currentView === 'week' && (
        <div className="p-4 sm:p-6 rounded-2xl glass-card border border-white/10 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days header */}
            <div className="grid grid-cols-7 gap-3 pb-3 border-b border-white/10 text-center font-bold text-xs uppercase tracking-wider text-slate-400">
              {daysOfWeek.map((day, idx) => (
                <div key={day} className={`p-2 rounded-lg ${idx === 0 ? 'text-brand-300 bg-brand-500/10' : ''}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Time Slot Columns */}
            <div className="grid grid-cols-7 gap-3 pt-3">
              {daysOfWeek.map((day, dayIndex) => {
                // For demonstration, map filtered events across the week days
                const dayEvents = filteredEvents.filter((_, i) => i % 5 === (dayIndex % 5));

                return (
                  <div key={day} className="space-y-3 min-h-[480px] p-1 rounded-xl bg-dark-900/30 border border-white/5">
                    {dayEvents.map((ev) => {
                      const startTime = new Date(ev.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const endTime = new Date(ev.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const isCompleted = ev.status === 'completed';

                      return (
                        <div
                          key={ev.id}
                          className={`p-3 rounded-xl border transition-all text-xs relative group cursor-pointer ${
                            isCompleted ? 'opacity-65 border-white/5 bg-white/2' : 'glass-card-hover border-white/10 bg-dark-850/80'
                          }`}
                          onClick={() => handleOpenEditModal(ev)}
                        >
                          {/* Color bar top */}
                          <div 
                            className="w-8 h-1 rounded-full mb-2" 
                            style={{ backgroundColor: ev.color }} 
                          />

                          <div className={`font-semibold text-xs leading-snug line-clamp-2 ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                            {ev.title}
                          </div>

                          <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-brand-400" />
                            {startTime} - {endTime}
                          </div>

                          {ev.location && (
                            <div className="mt-1 text-[10px] text-slate-400 flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3" />
                              {ev.location}
                            </div>
                          )}

                          {/* Hover action bar */}
                          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                            <span 
                              className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                              style={{ backgroundColor: `${ev.color}25`, color: ev.color }}
                            >
                              {ev.category}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                completeEvent(ev.id);
                                if (!isCompleted) triggerConfetti();
                              }}
                              className={`p-1 rounded hover:bg-white/10 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`}
                              title={isCompleted ? 'Completed' : 'Mark completed'}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {dayEvents.length === 0 && (
                      <div className="h-full flex items-center justify-center p-4 text-[11px] text-slate-600 border border-dashed border-white/5 rounded-xl">
                        Open Free Slot
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Agenda View */}
      {currentView === 'agenda' && (
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Detailed Chronological Agenda</h3>
          <div className="space-y-3">
            {filteredEvents.map((ev) => {
              const startTime = new Date(ev.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const endTime = new Date(ev.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl border border-white/10 glass-card-hover bg-dark-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-2.5 h-12 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: ev.color }} 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{ev.title}</span>
                        <span 
                          className="text-[10px] px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: `${ev.color}25`, color: ev.color }}
                        >
                          {ev.category}
                        </span>
                        {ev.rotationCycle && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">
                            {ev.rotationCycle}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{ev.description || 'No additional notes'}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-300">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-brand-400" /> {startTime} - {endTime}
                        </span>
                        {ev.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location}
                          </span>
                        )}
                        {ev.travelTimeMinutes && ev.travelTimeMinutes > 0 && (
                          <span className="text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded">
                            {ev.travelTimeMinutes} min travel buffer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenEditModal(ev)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                      title="Edit activity"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(ev.id)}
                      className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10"
                      title="Delete activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {currentView === 'day' && (
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">Today's Hourly Breakdown</h3>
            <span className="text-xs font-mono text-brand-300">{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="space-y-3">
            {hoursOfDay.map((hour) => {
              const hourStr = `${hour < 10 ? '0' : ''}${hour}:00`;
              const matchedEvents = filteredEvents.filter(e => {
                const eStart = new Date(e.startTime).getHours();
                return eStart === hour;
              });

              return (
                <div key={hour} className="flex gap-4 items-start py-2 border-b border-white/5">
                  <div className="w-16 font-mono text-xs font-semibold text-slate-400 pt-1">
                    {hourStr}
                  </div>
                  <div className="flex-1 space-y-2">
                    {matchedEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => handleOpenEditModal(e)}
                        className="p-3 rounded-xl border border-white/10 glass-card-hover bg-dark-900/60 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: e.color }} />
                          <div>
                            <div className="text-xs font-bold text-white">{e.title}</div>
                            <div className="text-[10px] text-slate-400">{e.location || 'Campus / Room'}</div>
                          </div>
                        </div>
                        <span 
                          className="text-[10px] px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: `${e.color}25`, color: e.color }}
                        >
                          {e.category}
                        </span>
                      </div>
                    ))}
                    {matchedEvents.length === 0 && (
                      <div 
                        onClick={handleOpenAddModal}
                        className="h-9 border border-dashed border-white/5 rounded-xl hover:border-brand-500/40 hover:bg-brand-500/5 transition-all flex items-center px-4 text-[11px] text-slate-600 cursor-pointer"
                      >
                        + Click to schedule in this slot
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Activity Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title={editingEventId ? "Edit Timetable Activity" : "Schedule New Timetable Activity"}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Activity Title / Course Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. CS 301: Advanced Algorithms"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="Academic">Academic</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Health">Health / Gym</option>
                <option value="Break">Break</option>
                <option value="Meeting">Meeting</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Accent Color
              </label>
              <div className="flex items-center gap-2 pt-1">
                {['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      formColor === c ? 'scale-110 border-white ring-2 ring-brand-500' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={formStartTime}
                onChange={(e) => setFormStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={formEndTime}
                onChange={(e) => setFormEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Physical Location
              </label>
              <input
                type="text"
                placeholder="Hall CS-301 / Tech Lab"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Transit Buffer (Minutes)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={formTravelMins}
                onChange={(e) => setFormTravelMins(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Recurrence Rule
              </label>
              <select
                value={formRecurrence}
                onChange={(e) => setFormRecurrence(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="none">One-time Event</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly (Regular)</option>
                <option value="weekdays">Weekdays (Mon-Fri)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Rotation Cycle
              </label>
              <select
                value={formRotation}
                onChange={(e) => setFormRotation(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="Week A">Week A only</option>
                <option value="Week B">Week B only</option>
                <option value="All">All Weeks (No rotation)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            {editingEventId && (
              <button
                type="button"
                onClick={() => {
                  deleteEvent(editingEventId);
                  setIsEventModalOpen(false);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
              >
                {editingEventId ? "Save Changes" : "Create Activity"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

