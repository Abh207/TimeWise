import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import type { Task } from '../../types';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Play, 
  CheckCircle2, 
  Layers, 
  ListFilter, 
  Clock, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { triggerConfetti } from '../../components/ui/Confetti';

export const TasksPage: React.FC = () => {
  const { tasks, addTask, updateTask, toggleTaskComplete, deleteTask, user } = useStore();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<'pending' | 'in_progress' | 'completed' | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [deadlineTime, setDeadlineTime] = useState('18:00');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [category, setCategory] = useState('Academic');
  const [estimatedMinutes, setEstimatedMinutes] = useState(45);
  const [tagInput, setTagInput] = useState('');

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) && !t.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  const pendingTasks = filteredTasks.filter((t) => t.status === 'pending');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = filteredTasks.filter((t) => t.isCompleted);

  const handleOpenAdd = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setDeadlineTime('18:00');
    setPriority('medium');
    setCategory('Academic');
    setEstimatedMinutes(45);
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(task.dueDate);
    setDeadlineTime(task.deadlineTime || '18:00');
    setPriority(task.priority);
    setCategory(task.category);
    setEstimatedMinutes(task.estimatedMinutes);
    setTagInput((task.tags || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingTaskId) {
      updateTask(editingTaskId, {
        title: title.trim(),
        description: description.trim(),
        dueDate,
        deadlineTime,
        priority,
        category,
        estimatedMinutes: Number(estimatedMinutes),
        tags
      });
    } else {
      addTask({
        userId: user.id,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        deadlineTime,
        priority,
        status: 'pending',
        category,
        estimatedMinutes: Number(estimatedMinutes),
        tags,
        isCompleted: false
      });
      triggerConfetti();
    }
    setIsModalOpen(false);
  };

  const handleDragStatus = (task: Task, nextStatus: 'pending' | 'in_progress' | 'completed') => {
    const isCompleted = nextStatus === 'completed';
    updateTask(task.id, {
      status: nextStatus,
      isCompleted,
      completedAt: isCompleted ? new Date().toISOString() : undefined
    });
    if (isCompleted) triggerConfetti();
  };

  const handleDropOnCol = (taskId: string, targetCol: 'pending' | 'in_progress' | 'completed') => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== targetCol) {
      handleDragStatus(task, targetCol);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Smart Task Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Priority & Task Workspace</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Ranked by urgency, deadline proximity, and estimated effort scores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center p-1 rounded-xl glass border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'list' ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-glow-violet transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl glass-input"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400">Filter Priority:</span>
          {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors ${
                priorityFilter === p
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'glass text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Pending */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOverCol('pending'); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData('taskId');
              if (taskId) handleDropOnCol(taskId, 'pending');
              setDragOverCol(null);
            }}
            className={`p-4 rounded-2xl glass-card border space-y-3 transition-all ${
              dragOverCol === 'pending' ? 'border-amber-400 bg-amber-500/10 shadow-lg' : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> To Do / Pending
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 font-mono">{pendingTasks.length}</span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleOpenEdit(task)}
                  onDelete={() => deleteTask(task.id)}
                  onMoveTo={(status) => handleDragStatus(task, status)}
                  onToggleComplete={() => toggleTaskComplete(task.id)}
                />
              ))}
              {pendingTasks.length === 0 && (
                <div className="h-32 flex items-center justify-center text-xs text-slate-600 border border-dashed border-white/5 rounded-xl">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOverCol('in_progress'); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData('taskId');
              if (taskId) handleDropOnCol(taskId, 'in_progress');
              setDragOverCol(null);
            }}
            className={`p-4 rounded-2xl glass-card border space-y-3 transition-all ${
              dragOverCol === 'in_progress' ? 'border-brand-400 bg-brand-500/10 shadow-glow-violet' : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" /> In Progress
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 font-mono">{inProgressTasks.length}</span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {inProgressTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleOpenEdit(task)}
                  onDelete={() => deleteTask(task.id)}
                  onMoveTo={(status) => handleDragStatus(task, status)}
                  onToggleComplete={() => toggleTaskComplete(task.id)}
                />
              ))}
              {inProgressTasks.length === 0 && (
                <div className="h-32 flex items-center justify-center text-xs text-slate-600 border border-dashed border-white/5 rounded-xl">
                  Drag tasks here
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Completed */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOverCol('completed'); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData('taskId');
              if (taskId) handleDropOnCol(taskId, 'completed');
              setDragOverCol(null);
            }}
            className={`p-4 rounded-2xl glass-card border space-y-3 transition-all ${
              dragOverCol === 'completed' ? 'border-emerald-400 bg-emerald-500/10 shadow-lg' : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Done & Verified
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 font-mono">{completedTasks.length}</span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleOpenEdit(task)}
                  onDelete={() => deleteTask(task.id)}
                  onMoveTo={(status) => handleDragStatus(task, status)}
                  onToggleComplete={() => toggleTaskComplete(task.id)}
                />
              ))}
              {completedTasks.length === 0 && (
                <div className="h-32 flex items-center justify-center text-xs text-slate-600 border border-dashed border-white/5 rounded-xl">
                  Drop tasks here to complete
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                task.isCompleted ? 'border-white/5 bg-white/2 opacity-70' : 'border-white/10 bg-dark-900/60 glass-card-hover'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleTaskComplete(task.id)}
                  className="rounded border-slate-600 bg-dark-850 text-brand-500 focus:ring-brand-500"
                />
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm truncate ${task.isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Due: {task.dueDate}</span>
                    <span>&bull;</span>
                    <span>{task.category}</span>
                    <span>&bull;</span>
                    <span className="font-mono text-brand-300">Priority Score: {task.smartPriorityScore}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/app/focus"
                  title="Focus mode"
                  className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/5"
                >
                  <Play className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleOpenEdit(task)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTaskId ? 'Edit Task' : 'Create New Priority Task'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement Raft Consensus State Machine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Description / Objectives
            </label>
            <textarea
              rows={3}
              placeholder="Key specifications, test cases, and deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Go, Distributed, Exam, Homework"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-glow-violet transition-all"
            >
              {editingTaskId ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Sub-component for individual Task Card on Kanban
const TaskCard: React.FC<{
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onMoveTo: (status: 'pending' | 'in_progress' | 'completed') => void;
  onToggleComplete: () => void;
}> = ({ task, onEdit, onDelete, onMoveTo, onToggleComplete }) => {
  return (
    <div className="p-3.5 rounded-xl border border-white/10 glass-card-hover bg-dark-850/80 text-xs space-y-2">
      <div className="flex items-start justify-between gap-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          task.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' :
          task.priority === 'high' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700/40 text-slate-300'
        }`}>
          {task.priority}
        </span>
        <span className="font-mono text-[10px] text-brand-300 bg-brand-500/10 px-1.5 py-0.5 rounded">
          Score: {task.smartPriorityScore}
        </span>
      </div>

      <div className={`font-semibold text-white ${task.isCompleted ? 'line-through text-slate-400' : ''}`}>
        {task.title}
      </div>

      {task.description && (
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Subtasks progress if present */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="pt-1 text-[10px] text-slate-400">
          Subtasks: {task.subtasks.filter(st => st.isCompleted).length} / {task.subtasks.length}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-brand-400" /> {task.estimatedMinutes}m
        </span>

        {/* Quick status mover buttons */}
        <div className="flex items-center gap-1">
          {task.status !== 'in_progress' && !task.isCompleted && (
            <button
              onClick={() => onMoveTo('in_progress')}
              className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 hover:bg-brand-500/30"
              title="Move to In Progress"
            >
              Start
            </button>
          )}
          {!task.isCompleted && (
            <button
              onClick={() => onMoveTo('completed')}
              className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
              title="Mark Completed"
            >
              Done
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-1 hover:text-white"
            title="Edit"
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:text-rose-400"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

