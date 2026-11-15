import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  Calendar, 
  CheckSquare, 
  Flame, 
  Timer, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  CloudSun, 
  BarChart3, 
  Plus, 
  Sun, 
  Moon, 
  Settings, 
  X,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickCreate: (tab?: 'task' | 'event' | 'habit' | 'record') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenQuickCreate
}) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { id: 'nav-dashboard', label: 'Go to Dashboard', category: 'Navigation', icon: Calendar, run: () => navigate('/app/dashboard') },
    { id: 'nav-timetable', label: 'Go to Timetable', category: 'Navigation', icon: Calendar, run: () => navigate('/app/timetable') },
    { id: 'nav-planner', label: 'Open Smart Planner (AI)', category: 'Navigation', icon: Sparkles, run: () => navigate('/app/smart-planner') },
    { id: 'nav-tasks', label: 'Go to Tasks Workspace', category: 'Navigation', icon: CheckSquare, run: () => navigate('/app/tasks') },
    { id: 'nav-focus', label: 'Start Focus Flow Mode', category: 'Navigation', icon: Timer, run: () => navigate('/app/focus') },
    { id: 'nav-streaks', label: 'View Habit Streaks & XP', category: 'Navigation', icon: Flame, run: () => navigate('/app/streaks') },
    { id: 'nav-analytics', label: 'View Productivity Insights', category: 'Navigation', icon: BarChart3, run: () => navigate('/app/analytics') },
    { id: 'nav-weather', label: 'Check Weather Dashboard', category: 'Navigation', icon: CloudSun, run: () => navigate('/app/weather') },
    { id: 'nav-location', label: 'Manage Locations & Travel', category: 'Navigation', icon: MapPin, run: () => navigate('/app/location') },
    { id: 'nav-records', label: 'Open Life Records & Notes', category: 'Navigation', icon: BookOpen, run: () => navigate('/app/records') },
    { id: 'nav-settings', label: 'Go to Settings', category: 'Navigation', icon: Settings, run: () => navigate('/app/settings') },

    { id: 'act-task', label: 'Create New Task', category: 'Quick Action', icon: Plus, run: () => onOpenQuickCreate('task') },
    { id: 'act-event', label: 'Schedule Timetable Activity', category: 'Quick Action', icon: Plus, run: () => onOpenQuickCreate('event') },
    { id: 'act-habit', label: 'Start New Habit Streak', category: 'Quick Action', icon: Plus, run: () => onOpenQuickCreate('habit') },
    { id: 'act-theme', label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, category: 'System', icon: theme === 'dark' ? Sun : Moon, run: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
  ];

  const filtered = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].run();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div className="relative w-full max-w-xl glass-card bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-dark-850">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Type a command or search destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500 font-medium"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-400 font-mono">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No matching commands found.</p>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.run();
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-glow-violet'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-dark-950/80 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono">↵</kbd> to select</span>
          </div>
          <span>TimeWise AI Platform</span>
        </div>
      </div>
    </div>
  );
};

