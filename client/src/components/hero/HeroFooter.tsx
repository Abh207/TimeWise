import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Check, 
  Send, 
  ArrowUp, 
  Share2, 
  Code2, 
  MessageSquare, 
  Mail, 
  Sun, 
  Moon, 
  Globe,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

export const HeroFooter: React.FC = () => {
  const { theme, setTheme } = useStore();
  const [time, setTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  // Live ticking clock
  useEffect(() => {
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4500);
  };

  return (
    <footer 
      className="w-full rounded-t-[32px] border-t border-white/10 text-sm text-[#A7A7A7] relative overflow-hidden transition-colors select-none"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 pb-12 space-y-12 relative z-10">
        
        {/* ============================================================== */}
        {/* TOP ROW: Brand Info, Tagline & Pill Input                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-white/[0.08]">
          {/* Left Brand info (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-white/10 text-[#C8F03C] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#FFFFFF] font-sans">
                TimeWise
              </span>
            </Link>

            <p className="text-sm text-[#A7A7A7] max-w-lg leading-relaxed font-normal">
              The smart timetable that protects your focus, adapts to your day and keeps your streak alive.
            </p>
          </div>

          {/* Right Newsletter Pill Input (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label htmlFor="footer-newsletter" className="text-xs font-bold text-[#FFFFFF] block">
                Stay updated with intelligent timetable releases
              </label>

              <div className="relative flex items-center rounded-full bg-[#161616] border border-white/10 p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)] focus-within:border-[#C8F03C] focus-within:ring-2 focus-within:ring-[#C8F03C]/40 transition-all">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="bg-transparent px-4 py-2 text-xs sm:text-sm text-[#FFFFFF] placeholder-[#6E6E6E] outline-none flex-1 min-w-0"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="min-h-[40px] px-6 py-2 rounded-full bg-[#C8F03C] text-[#141414] font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#d8ff4f] hover:shadow-[0_0_20px_#C8F03C] transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
                >
                  {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isSubscribed ? "You're in!" : "Join"}</span>
                </button>
              </div>

              {error && (
                <p className="text-[11px] text-red-400 font-medium pl-3">{error}</p>
              )}
              {isSubscribed && (
                <p className="text-[11px] text-[#C8F03C] font-semibold flex items-center gap-1.5 pl-3">
                  <span className="w-2 h-2 rounded-full bg-[#C8F03C]" />
                  You're in! Welcome to the focus collective.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MIDDLE ROW: Link Columns (Product, Resources, Connect)         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-white/[0.08]">
          
          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
              Product
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home Hub', path: '/home' },
                { label: 'Academic Timetable', path: '/app/timetable' },
                { label: 'Smart AI Planner', path: '/app/smart-planner' },
                { label: 'Eisenhower Tasks', path: '/app/tasks' },
                { label: 'Focus Chamber', path: '/app/focus' },
                { label: 'Streaks & Grace Days', path: '/app/streaks' },
                { label: 'Weather Adjustments', path: '/app/weather' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group relative inline-flex items-center min-h-[44px] text-xs sm:text-sm text-[#A7A7A7] hover:text-[#FFFFFF] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C] rounded-sm"
                  >
                    <span>{item.label}</span>
                    <span className="absolute left-0 bottom-1 w-0 h-[1.5px] bg-[#C8F03C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Documentation', path: '/features' },
                { label: 'Heuristic Engine', path: '/features' },
                { label: 'Conflict Resolution', path: '/features' },
                { label: 'Interactive Demo', path: '/signin' },
                { label: 'Support & Feedback', path: '/features' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group relative inline-flex items-center min-h-[44px] text-xs sm:text-sm text-[#A7A7A7] hover:text-[#FFFFFF] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C] rounded-sm"
                  >
                    <span>{item.label}</span>
                    <span className="absolute left-0 bottom-1 w-0 h-[1.5px] bg-[#C8F03C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect (Round dark buttons that fill lime on hover) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
              Connect
            </h4>
            <p className="text-xs text-[#A7A7A7] leading-relaxed">
              Join our developer community and life optimization channel.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Share2, label: 'Share TimeWise' },
                { icon: Code2, label: 'API Repository' },
                { icon: MessageSquare, label: 'Community Chat' },
                { icon: Mail, label: 'Direct Mail' },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={btn.label}
                  className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-white/10 shadow-sm flex items-center justify-center text-[#FFFFFF] hover:bg-[#C8F03C] hover:text-[#141414] hover:border-[#C8F03C] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
                >
                  <btn.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Status Card & Live Clock */}
          <div className="rounded-[22px] p-5 bg-[#141414] border border-white/10 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8F03C] shadow-[0_0_8px_#C8F03C] animate-pulse" />
                <span className="text-xs font-bold text-[#FFFFFF]">All Systems Operational</span>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-9 h-9 rounded-full bg-[#202020] border border-white/10 flex items-center justify-center text-[#FFFFFF] hover:bg-[#C8F03C] hover:text-[#141414] hover:border-[#C8F03C] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-[#A7A7A7]">Live Clock:</span>
              <span className="font-bold text-[#C8F03C]">{format(time, 'hh:mm:ss a')}</span>
            </div>

            <div className="text-[11px] text-[#A7A7A7] italic flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8F03C] shrink-0 mt-0.5" />
              <span>"Consistency beats intensity every single day."</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SUBTLE FAINT "TIMEWISE" OUTLINE TEXT (White at 6-8% opacity)   */}
        {/* ============================================================== */}
        <div 
          aria-hidden="true"
          className="w-full text-center select-none pointer-events-none py-1 opacity-[0.07] text-[clamp(44px,9vw,120px)] font-[900] tracking-widest text-[#FFFFFF] leading-none"
        >
          TIMEWISE
        </div>

        {/* ============================================================== */}
        {/* BOTTOM BAR: Copyright & Preferences                            */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[#A7A7A7]">
          <p className="text-center sm:text-left">
            &copy; 2026 TimeWise Platform. Engineered for absolute focus &amp; flow.
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#FFFFFF] font-medium bg-[#161616] px-2.5 py-1 rounded-full border border-white/10">
              <Globe className="w-3.5 h-3.5 text-[#C8F03C]" />
              <span>English (US)</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full bg-[#161616] hover:bg-[#202020] text-[#FFFFFF] border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
              title="Toggle Light / Dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#C8F03C]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#C8F03C]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
