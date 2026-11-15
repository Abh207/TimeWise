import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  Sparkles, 
  ArrowUp, 
  Check, 
  Send, 
  Globe, 
  Sun, 
  Moon, 
  CloudSun,
  Share2,
  Code2,
  MessageSquare,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const MOTIVATIONAL_QUOTES = [
  "Time is the currency of achievement. Spend it intentionally.",
  "Deep focus is not an accident; it is the deliberate design of your environment.",
  "Consistency beats intensity every single day.",
  "You don't need more time, you need more clarity.",
  "Small daily disciplines compound into massive life breakthroughs.",
  "Guard your focus with the same care as your greatest asset."
];

interface FooterProps {
  compact?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ compact }) => {
  const location = useLocation();
  const { theme, setTheme, weather } = useStore();

  const [time, setTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // In-app compact mode if on /app or /home
  const isAppMode = compact ?? (location.pathname.startsWith('/app') || location.pathname === '/home');

  useEffect(() => {
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 12000);
    return () => {
      clearInterval(clockTimer);
      clearInterval(quoteTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  // ==========================================
  // IN-APP COMPACT FOOTER
  // ==========================================
  if (isAppMode) {
    return (
      <footer className="w-full bg-[#FFFFFF] dark:bg-[#122218] border-t border-[rgba(46,158,94,0.15)] py-4 px-4 sm:px-8 mt-auto text-xs text-[#6B7C72] dark:text-[#9AB3A4] relative z-20 transition-colors">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Clock, Date & Weather */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4EA] dark:bg-[#1A3122] text-[#2E9E5E] font-medium text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
            <span className="hidden sm:inline">
              {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {weather && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF8EB] dark:bg-[#2B2313] text-[#F5A524]">
                <CloudSun className="w-3.5 h-3.5" />
                <span>{weather.city}: {weather.temp}&deg;C</span>
              </div>
            )}
          </div>

          {/* Center: Quote */}
          <div className="text-center max-w-md italic text-[#1B2B22] dark:text-[#F0FDF4] flex items-center justify-center gap-2 px-2 text-[11px] truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#2E9E5E] shrink-0" />
            <span className="truncate">"{MOTIVATIONAL_QUOTES[quoteIndex]}"</span>
          </div>

          {/* Right: Quick Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E9E5E] animate-pulse" />
              <span className="text-[11px]">All Systems Operational</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] dark:bg-[#1A3122] text-[#2E9E5E] hover:bg-[#2E9E5E] hover:text-white transition-all text-[11px] font-semibold"
              title="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </footer>
    );
  }

  // ==========================================
  // FULL PUBLIC CLEAN GREEN FOOTER
  // ==========================================
  return (
    <footer className="w-full bg-gradient-to-b from-[#F3FAF5] to-[#FFFFFF] dark:from-[#0C1812] dark:to-[#122218] border-t border-[rgba(46,158,94,0.15)] text-sm text-[#6B7C72] dark:text-[#9AB3A4] transition-colors relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 pt-16 pb-12 space-y-12 relative z-10">
        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Newsletter (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#E6F4EA] dark:bg-[#1A3122] border border-[rgba(46,158,94,0.3)] flex items-center justify-center text-[#2E9E5E]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#1B2B22] dark:text-[#F0FDF4] font-sans tracking-tight">TimeWise</span>
            </div>

            <p className="text-xs text-[#6B7C72] dark:text-[#9AB3A4] leading-relaxed max-w-sm">
              A fresh, intelligent timetable and daily productivity companion designed to protect your energy and clarify your routines.
            </p>

            {/* Newsletter: Pill-shaped input with green "Join" button */}
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm pt-2">
              <span className="text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] block">
                Join our weekly productivity dispatch
              </span>
              <div className="flex items-center rounded-full bg-white dark:bg-[#1A3122] border border-[rgba(46,158,94,0.25)] focus-within:border-[#2E9E5E] focus-within:ring-2 focus-within:ring-[#2E9E5E]/20 p-1.5 shadow-sm transition-all">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent px-3 py-1.5 text-xs text-[#1B2B22] dark:text-[#F0FDF4] placeholder-[#6B7C72] dark:placeholder-[#9AB3A4] outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#2E9E5E] hover:bg-[#3DB772] text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isSubscribed ? 'Joined' : 'Join'}</span>
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-[#2E9E5E] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2E9E5E]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2B22] dark:text-[#F0FDF4]">Product</h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/home" className="hover:text-[#2E9E5E] transition-colors">Home Hub</Link></li>
              <li><Link to="/features" className="hover:text-[#2E9E5E] transition-colors font-medium text-[#2E9E5E]">Features Gallery</Link></li>
              <li><Link to="/app/timetable" className="hover:text-[#2E9E5E] transition-colors">Academic Timetable</Link></li>
              <li><Link to="/app/smart-planner" className="hover:text-[#2E9E5E] transition-colors">Smart AI Planner</Link></li>
              <li><Link to="/app/tasks" className="hover:text-[#2E9E5E] transition-colors">Eisenhower Tasks</Link></li>
              <li><Link to="/app/focus" className="hover:text-[#2E9E5E] transition-colors">Focus Chamber</Link></li>
              <li><Link to="/app/streaks" className="hover:text-[#2E9E5E] transition-colors">Streaks & Grace Days</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4DA3FF]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2B22] dark:text-[#F0FDF4]">Resources</h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#2E9E5E] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#2E9E5E] transition-colors">Help & Contact</Link></li>
              <li><Link to="/features" className="hover:text-[#2E9E5E] transition-colors">Release Notes</Link></li>
              <li><Link to="/signin" className="hover:text-[#2E9E5E] transition-colors">Interactive Demo</Link></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B7CF6]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2B22] dark:text-[#F0FDF4]">Connect</h4>
            </div>
            {/* Social icons in round mint buttons with hover color fill */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: Share2, label: 'Share', href: '#' },
                { icon: Code2, label: 'Source', href: '#' },
                { icon: MessageSquare, label: 'Community', href: '#' },
                { icon: Compass, label: 'Roadmap', href: '#' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-full bg-[#E6F4EA] dark:bg-[#1A3122] text-[#2E9E5E] hover:bg-[#2E9E5E] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <div className="pt-2 text-xs text-[#6B7C72] dark:text-[#9AB3A4]">
              <p className="font-semibold text-[#1B2B22] dark:text-[#F0FDF4]">Local-First Storage</p>
              <p className="text-[11px]">Ready for Supabase cloud sync</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(46,158,94,0.15)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Status, Clock, Quote */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E9E5E] animate-pulse" />
              <span className="font-semibold text-[#1B2B22] dark:text-[#F0FDF4]">All Systems Operational</span>
            </div>
            <span className="text-[#6B7C72] dark:text-[#9AB3A4] hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5 text-[#6B7C72] dark:text-[#9AB3A4]">
              <Clock className="w-3.5 h-3.5 text-[#2E9E5E]" />
              <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <span className="text-[#6B7C72] dark:text-[#9AB3A4] hidden sm:inline">&bull;</span>
            <div className="italic text-[#6B7C72] dark:text-[#9AB3A4] max-w-sm truncate text-center">
              "{MOTIVATIONAL_QUOTES[quoteIndex]}"
            </div>
          </div>

          {/* Right: Back to top, copyright, light/dark toggle */}
          <div className="flex items-center gap-4">
            <span>&copy; {time.getFullYear()} TimeWise</span>
            <span>&bull;</span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-1.5 text-[#6B7C72] dark:text-[#9AB3A4] hover:text-[#2E9E5E] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#F5A524]" /> : <Moon className="w-3.5 h-3.5 text-[#4DA3FF]" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#2E9E5E] hover:underline font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
