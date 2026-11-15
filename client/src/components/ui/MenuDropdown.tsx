import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MoreVertical, 
  X, 
  Home, 
  Calendar, 
  BrainCircuit, 
  CheckSquare, 
  Timer, 
  Flame, 
  CloudSun, 
  Sparkles, 
  LogIn,
  ArrowRight
} from 'lucide-react';

interface MenuDropdownProps {
  className?: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus trap: focus first button when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstButtonRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const navButtons = [
    { label: 'Home Hub', path: '/home', icon: Home, accent: 'text-[#2E9E5E] bg-[#E6F4EA]' },
    { label: 'Academic Timetable', path: '/app/timetable', icon: Calendar, accent: 'text-[#4DA3FF] bg-[#EAF4FF]' },
    { label: 'Smart AI Planner', path: '/app/smart-planner', icon: BrainCircuit, accent: 'text-[#2E9E5E] bg-[#E6F4EA]' },
    { label: 'Eisenhower Tasks', path: '/app/tasks', icon: CheckSquare, accent: 'text-[#FF7A6B] bg-[#FFF0EE]' },
    { label: 'Focus Chamber', path: '/app/focus', icon: Timer, accent: 'text-[#3DB772] bg-[#E6F4EA]' },
    { label: 'Streaks & Grace Days', path: '/app/streaks', icon: Flame, accent: 'text-[#FF7A6B] bg-[#FFF0EE]' },
    { label: 'Weather Adjustments', path: '/app/weather', icon: CloudSun, accent: 'text-[#F5A524] bg-[#FFF8EB]' },
    { label: 'Features Overview', path: '/features', icon: Sparkles, accent: 'text-[#8B7CF6] bg-[#F4F1FE]' },
    { label: 'Sign In to Account', path: '/signin', icon: LogIn, accent: 'text-[#1B2B22] bg-[#E6F4EA]' },
  ];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Three-Dot Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Navigation Menu"
        className="w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-[#122218] text-[#1B2B22] dark:text-[#F0FDF4] hover:bg-[#E6F4EA] dark:hover:bg-[#1E3627] hover:text-[#2E9E5E] border border-[rgba(46,158,94,0.2)] shadow-sm hover:shadow-soft transition-all duration-200"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-50 md:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-In Sheet / Animated Dropdown containing BUTTONS ONLY */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="dialog"
          aria-modal="true"
          aria-label="Application Destinations"
          className="fixed top-20 right-4 sm:right-8 w-[320px] sm:w-[350px] max-h-[85vh] overflow-y-auto bg-white dark:bg-[#122218] border border-[rgba(46,158,94,0.25)] rounded-[20px] shadow-soft-green-lg p-5 z-50 animate-scaleUp text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(46,158,94,0.15)] mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E9E5E]">Direct Switcher</span>
              <h3 className="text-sm font-bold text-[#1B2B22] dark:text-[#F0FDF4]">Jump to Destination</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7C72] hover:text-[#1B2B22] hover:bg-[#E6F4EA] dark:hover:bg-[#1A3122] transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* BUTTONS ONLY */}
          <div className="space-y-1.5" role="menu">
            {navButtons.map((btn, idx) => {
              const Icon = btn.icon;
              return (
                <button
                  key={idx}
                  ref={idx === 0 ? firstButtonRef : undefined}
                  role="menuitem"
                  onClick={() => handleNavigate(btn.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-[14px] hover:bg-[#E6F4EA] dark:hover:bg-[#1E3627] text-left transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${btn.accent} transition-transform group-hover:scale-105`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] group-hover:text-[#2E9E5E] transition-colors">
                      {btn.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6B7C72] opacity-0 group-hover:opacity-100 group-hover:text-[#2E9E5E] transition-all transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-[rgba(46,158,94,0.15)] flex items-center justify-between text-[11px] text-[#6B7C72]">
            <span>Press Esc to close</span>
            <span className="font-semibold text-[#2E9E5E]">TimeWise Clean OS</span>
          </div>
        </div>
      )}
    </div>
  );
};

