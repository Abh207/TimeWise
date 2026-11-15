import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Inbox, 
  Send, 
  CheckSquare, 
  Calendar, 
  Trash2, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

interface InboxItem {
  id: string;
  text: string;
  capturedAt: string;
}

export const InboxPage: React.FC = () => {
  const { addTask, addEvent, user } = useStore();
  const [items, setItems] = useState<InboxItem[]>([
    { id: 'ib-1', text: 'Email Prof. Vance about graduate lab research assistantship openings', capturedAt: 'Today, 11:20 AM' },
    { id: 'ib-2', text: 'Order replacement mechanical switches for ergo keyboard', capturedAt: 'Today, 2:45 PM' },
    { id: 'ib-3', text: 'Review Chapter 4 on Distributed Transactions (Two-Phase Commit vs Sagas)', capturedAt: 'Yesterday, 6:15 PM' },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newItem: InboxItem = {
      id: `ib-${Date.now()}`,
      text: inputVal.trim(),
      capturedAt: 'Just now'
    };

    setItems([newItem, ...items]);
    setInputVal('');
  };

  const handleConvertToTask = (item: InboxItem) => {
    addTask({
      userId: user.id,
      title: item.text,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      status: 'pending',
      category: 'General',
      estimatedMinutes: 30,
      isCompleted: false
    });
    setItems(items.filter(i => i.id !== item.id));
    triggerConfetti();
  };

  const handleConvertToEvent = (item: InboxItem) => {
    const today = new Date().toISOString().split('T')[0];
    addEvent({
      userId: user.id,
      title: item.text,
      category: 'Personal',
      color: '#3b82f6',
      startTime: `${today}T16:00:00.000Z`,
      endTime: `${today}T17:00:00.000Z`,
      priority: 'medium',
      status: 'scheduled'
    });
    setItems(items.filter(i => i.id !== item.id));
    triggerConfetti();
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-card border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-1">
            <Inbox className="w-3.5 h-3.5" />
            <span>Mental Offload & Quick Capture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Quick Capture Inbox</h1>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Capture thoughts, tasks, and ideas in seconds. Process and convert them to timetable activities or tasks later.
          </p>
        </div>
      </div>

      {/* Capture Input Bar */}
      <form onSubmit={handleCapture} className="p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-3">
        <input
          type="text"
          placeholder="Capture an idea, reminder, or to-do without leaving your flow..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs"
          autoFocus
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-glow-violet transition-all flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Capture</span>
        </button>
      </form>

      {/* Captured Items List */}
      <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h2 className="text-sm font-bold text-white">Inbox Queue ({items.length})</h2>
          <span className="text-xs text-slate-400">Zero In-tray philosophy</span>
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              Your inbox is clean! All items have been processed into tasks or events.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-white/10 glass-card-hover bg-dark-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{item.text}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.capturedAt}</div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleConvertToTask(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors font-medium text-[11px]"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>To Task</span>
                  </button>
                  <button
                    onClick={() => handleConvertToEvent(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/30 hover:bg-brand-500/25 transition-colors font-medium text-[11px]"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>To Timetable</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

