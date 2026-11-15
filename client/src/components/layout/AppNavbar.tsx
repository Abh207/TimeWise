import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Check, 
  LogOut, 
  User, 
  Settings, 
  Home,
  Plus
} from 'lucide-react';
import { authService } from '../../services/authService';

interface AppNavbarProps {
  onOpenQuickCreate: () => void;
  onOpenCommandPalette?: () => void;
  sectionTitle?: string;
  accentColor?: string;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  onOpenQuickCreate,
  onOpenCommandPalette,
  sectionTitle,
  accentColor = '#D9805A'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    user, 
    theme, 
    setTheme, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleSignOut = async () => {
    await authService.signOut();
    navigate('/signin');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const pathPart = location.pathname.split('/').filter(Boolean).pop() || 'dashboard';
  const displayTitle = sectionTitle || pathPart.charAt(0).toUpperCase() + pathPart.slice(1).replace('-', ' ');

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-[rgba(245,199,176,0.25)] bg-white/90 dark:bg-[#1A120E]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-colors">
      {/* Left: Back to Home & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-5">
        <Link
          to="/home"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(245,199,176,0.3)] bg-[#FBE3D6] dark:bg-[#2C1E18] hover:bg-[#F5C7B0] text-[#A24E27] dark:text-[#F5C7B0] hover:text-[#2A1810] text-xs font-semibold transition-all hover-lift"
          title="Return to Home Hub"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hub</span>
        </Link>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6B7C72] dark:text-[#9AB3A4] hidden md:inline">TimeWise</span>
          <span className="text-[#6B7C72] dark:text-[#9AB3A4] hidden md:inline">/</span>
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
            />
            <span className="font-bold text-[#1B2B22] dark:text-[#F0FDF4] text-sm tracking-tight">{displayTitle}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Command Palette Trigger Search */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[rgba(46,158,94,0.2)] bg-[#F3FAF5] dark:bg-[#1A3122] hover:border-[rgba(46,158,94,0.4)] text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#1B2B22] text-xs transition-all w-44 md:w-56"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left truncate">Quick switcher...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#122218] border border-[rgba(46,158,94,0.2)] text-[10px] font-mono text-[#6B7C72]">
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickCreate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5C7B0] hover:bg-[#EFAE8F] text-[#2A1810] text-xs font-bold transition-all shadow-sm hover-lift"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Quick Add</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-[rgba(245,199,176,0.3)] bg-[#FDF1EA] dark:bg-[#2C1E18] hover:bg-[#FBE3D6] text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#A24E27] dark:hover:text-[#F5C7B0] transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F5A524]" /> : <Moon className="w-4 h-4 text-[#4DA3FF]" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full border border-[rgba(245,199,176,0.3)] bg-[#FDF1EA] dark:bg-[#2C1E18] hover:bg-[#FBE3D6] text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#A24E27] dark:hover:text-[#F5C7B0] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF7A6B] animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF7A6B]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-[20px] bg-white dark:bg-[#1A120E] p-4 shadow-soft-peach-lg z-50 animate-scaleUp border border-[rgba(245,199,176,0.35)] text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,199,176,0.25)] mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4] uppercase tracking-wider">Alerts & Reminders</h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#FF7A6B] text-white font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#A24E27] dark:text-[#F5C7B0] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-[14px] border text-xs ${
                      n.isRead 
                        ? 'border-[rgba(245,199,176,0.2)] bg-[#FDF1EA] dark:bg-[#221713] text-[#6B7C72]' 
                        : 'border-[rgba(245,199,176,0.4)] bg-[#FBE3D6] dark:bg-[#2C1E18] text-[#1B2B22] dark:text-[#F0FDF4]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{n.title}</span>
                      {!n.isRead && (
                        <button onClick={() => markNotificationAsRead(n.id)} className="text-[#6B7C72] hover:text-[#A24E27] dark:hover:text-[#F5C7B0]">
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-[#6B7C72] dark:text-[#9AB3A4] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[rgba(245,199,176,0.25)] text-center">
                <Link
                  to="/app/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#A24E27] dark:text-[#F5C7B0] hover:underline font-semibold"
                >
                  View Notification Center →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#FBE3D6] dark:hover:bg-[#2C1E18] transition-colors"
          >
            <img
              src={user.avatarUrl || `${import.meta.env.BASE_URL}images/avatar-1.jpg`}
              alt={user.displayName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#F5C7B0]/60"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-[20px] bg-white dark:bg-[#1A120E] p-2 z-50 shadow-soft-peach-lg border border-[rgba(245,199,176,0.35)] text-left">
              <div className="px-3 py-2 border-b border-[rgba(245,199,176,0.25)] mb-1">
                <div className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4]">{user.fullName}</div>
                <div className="text-[10px] text-[#6B7C72] dark:text-[#9AB3A4] truncate">{user.email}</div>
                <div className="mt-1 text-[10px] text-[#A24E27] dark:text-[#F5C7B0] font-semibold">
                  Level {user.level} &bull; {user.xp} XP
                </div>
              </div>

              <Link
                to="/app/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#A24E27] dark:hover:text-[#F5C7B0] hover:bg-[#FBE3D6] dark:hover:bg-[#2C1E18] rounded-xl"
              >
                <User className="w-3.5 h-3.5 text-[#A24E27] dark:text-[#F5C7B0]" /> Profile & XP
              </Link>
              <Link
                to="/app/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#A24E27] dark:hover:text-[#F5C7B0] hover:bg-[#FBE3D6] dark:hover:bg-[#2C1E18] rounded-xl"
              >
                <Settings className="w-3.5 h-3.5 text-[#4DA3FF]" /> Settings & Backup
              </Link>

              <div className="my-1 border-t border-[rgba(46,158,94,0.15)]" />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#FF7A6B] hover:bg-[#FFF0EE] rounded-xl text-left font-medium"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
