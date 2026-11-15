import React, { useState } from 'react';
import { Modal } from './Modal';
import { useStore } from '../../store/useStore';
import { CheckSquare, Calendar, Flame, BookOpen, Clock } from 'lucide-react';
import { triggerConfetti } from './Confetti';

interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'task' | 'event' | 'habit' | 'record';
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'task'
}) => {
  const [tab, setTab] = useState<'task' | 'event' | 'habit' | 'record'>(defaultTab);
  const { addTask, addEvent, addHabit, addRecord, user } = useStore();

  // Task form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [taskCategory, setTaskCategory] = useState('Academic');
  const [taskEstimatedMins, setTaskEstimatedMins] = useState(45);

  // Event form
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'Academic' | 'Work' | 'Study' | 'Health' | 'Personal' | 'Break' | 'Meeting'>('Academic');
  const [eventStart, setEventStart] = useState('10:00');
  const [eventEnd, setEventEnd] = useState('11:00');
  const [eventLocation, setEventLocation] = useState('');

  // Habit form
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Coding');
  const [habitTarget, setHabitTarget] = useState(60);
  const [habitUnit, setHabitUnit] = useState('mins');

  // Record form
  const [recordTitle, setRecordTitle] = useState('');
  const [recordNotes, setRecordNotes] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({
      userId: user.id,
      title: taskTitle.trim(),
      dueDate: taskDueDate,
      priority: taskPriority,
      status: 'pending',
      category: taskCategory,
      estimatedMinutes: Number(taskEstimatedMins),
      isCompleted: false
    });
    setTaskTitle('');
    onClose();
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    const date = new Date().toISOString().split('T')[0];
    addEvent({
      userId: user.id,
      title: eventTitle.trim(),
      category: eventCategory,
      color: eventCategory === 'Academic' ? '#8b5cf6' : eventCategory === 'Health' ? '#ef4444' : '#3b82f6',
      startTime: `${date}T${eventStart}:00.000Z`,
      endTime: `${date}T${eventEnd}:00.000Z`,
      priority: 'medium',
      location: eventLocation,
      status: 'scheduled'
    });
    setEventTitle('');
    setEventLocation('');
    onClose();
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    addHabit({
      userId: user.id,
      name: habitName.trim(),
      category: habitCategory,
      frequency: 'daily',
      targetValue: Number(habitTarget),
      unit: habitUnit,
      color: '#8b5cf6'
    });
    triggerConfetti();
    setHabitName('');
    onClose();
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordTitle.trim()) return;
    addRecord({
      userId: user.id,
      type: 'daily_log',
      title: recordTitle.trim(),
      category: 'General',
      recordDate: new Date().toISOString().split('T')[0],
      tags: ['Quick Capture'],
      details: { journalNotes: recordNotes }
    });
    setRecordTitle('');
    setRecordNotes('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Create" maxWidth="max-w-lg">
      <div className="flex border-b border-white/10 mb-6 -mt-2">
        <button
          type="button"
          onClick={() => setTab('task')}
          className={`flex items-center gap-2 pb-3 px-3 font-medium text-sm border-b-2 transition-all ${
            tab === 'task'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-4 h-4" /> Task
        </button>
        <button
          type="button"
          onClick={() => setTab('event')}
          className={`flex items-center gap-2 pb-3 px-3 font-medium text-sm border-b-2 transition-all ${
            tab === 'event'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Timetable
        </button>
        <button
          type="button"
          onClick={() => setTab('habit')}
          className={`flex items-center gap-2 pb-3 px-3 font-medium text-sm border-b-2 transition-all ${
            tab === 'habit'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4" /> Habit
        </button>
        <button
          type="button"
          onClick={() => setTab('record')}
          className={`flex items-center gap-2 pb-3 px-3 font-medium text-sm border-b-2 transition-all ${
            tab === 'record'
              ? 'border-brand-500 text-brand-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Note / Log
        </button>
      </div>

      {tab === 'task' && (
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement Raft Consensus Protocol"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-dark-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="Academic / Study / Work"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Estimated Minutes
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={taskEstimatedMins}
                onChange={(e) => setTaskEstimatedMins(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      {tab === 'event' && (
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Activity / Class Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems Lecture"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
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
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value as any)}
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
                Location
              </label>
              <input
                type="text"
                placeholder="Hall 301 / Online"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Schedule Activity
            </button>
          </div>
        </form>
      )}

      {tab === 'habit' && (
        <form onSubmit={handleCreateHabit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Habit Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. LeetCode 1 Problem Daily"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={habitCategory}
                onChange={(e) => setHabitCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Value
              </label>
              <input
                type="number"
                min="1"
                value={habitTarget}
                onChange={(e) => setHabitTarget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Unit
              </label>
              <input
                type="text"
                placeholder="mins / ml / pages"
                value={habitUnit}
                onChange={(e) => setHabitUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Start Streak
            </button>
          </div>
        </form>
      )}

      {tab === 'record' && (
        <form onSubmit={handleCreateRecord} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Title / Thought
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Key takeaway from Distributed Systems lab"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Notes & Details
            </label>
            <textarea
              rows={3}
              placeholder="Write thoughts, learnings, or quick reflections..."
              value={recordNotes}
              onChange={(e) => setRecordNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              Save Record
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

