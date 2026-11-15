import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import { Footer } from './Footer';
import { OnboardingModal } from '../auth/OnboardingModal';
import { QuickCreateModal } from '../ui/QuickCreateModal';
import { CommandPalette } from '../ui/CommandPalette';
import { authService } from '../../services/authService';
import { Home, Calendar, CheckSquare, User } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const session = authService.getSession();
  const location = useLocation();
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [quickCreateTab, setQuickCreateTab] = useState<'task' | 'event' | 'habit' | 'record'>('task');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl/Cmd + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If no session exists, redirect to signin
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  const handleOpenQuickCreate = (tab: 'task' | 'event' | 'habit' | 'record' = 'task') => {
    setQuickCreateTab(tab);
    setIsQuickCreateOpen(true);
  };

  const isAtHomeHub = location.pathname === '/home' || location.pathname === '/app/home';

  return (
    <div className="min-h-screen flex flex-col bg-[#F3FAF5] dark:bg-[#0C1812] text-[#1B2B22] dark:text-[#F0FDF4] relative font-sans selection:bg-[#2E9E5E]/20 selection:text-[#2E9E5E] transition-colors duration-200">
      {/* Slim Topbar Header */}
      <AppNavbar
        onOpenQuickCreate={() => handleOpenQuickCreate('task')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-[1440px] w-full mx-auto">
        <Outlet />
      </main>

      {/* In-App Compact Footer */}
      <Footer compact />

      {/* Floating "Home Hub" launcher at bottom right (hidden when already on /home) */}
      {!isAtHomeHub && (
        <Link
          to="/home"
          className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#122218]/95 hover:bg-[#2E9E5E] text-[#2E9E5E] hover:text-white border border-[#2E9E5E]/30 shadow-soft font-semibold text-xs tracking-tight transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1"
          title="Return to Home Hub"
        >
          <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Home Hub</span>
        </Link>
      )}

      {/* Mobile Bottom Dock (4 Core Destinations) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#122218]/95 border-t border-[#2E9E5E]/15 dark:border-white/10 backdrop-blur-2xl px-6 py-2.5 flex items-center justify-between shadow-soft">
        <Link
          to="/home"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            isAtHomeHub ? 'text-[#2E9E5E]' : 'text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Hub</span>
        </Link>

        <Link
          to="/app/timetable"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            location.pathname.includes('/timetable') ? 'text-[#2E9E5E]' : 'text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </Link>

        <Link
          to="/app/tasks"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            location.pathname.includes('/tasks') ? 'text-[#2E9E5E]' : 'text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>Tasks</span>
        </Link>

        <Link
          to="/app/profile"
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            location.pathname.includes('/profile') ? 'text-[#2E9E5E]' : 'text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* Global Interactive Modals */}
      <OnboardingModal />
      <QuickCreateModal
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        defaultTab={quickCreateTab}
      />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenQuickCreate={handleOpenQuickCreate}
      />
    </div>
  );
};
