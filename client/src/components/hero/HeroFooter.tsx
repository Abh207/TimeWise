import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Check, 
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [socialProofIndex, setSocialProofIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Live social-proof notifications
  const SOCIAL_PROOFS = [
    'Aarav from Delhi joined Pro · 1 min ago',
    'Meera from Pune joined Pro · 3 mins ago',
    'Rohan from Mumbai joined Pro · 4 mins ago',
    'Sneha from Jaipur joined Pro · 6 mins ago',
    'Kabir from Chandigarh joined Pro · 9 mins ago',
  ];

  // Real countdown to midnight local time (end of current day)
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = Math.max(0, midnight.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const [countdown, setCountdown] = useState(calculateTimeLeft());

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  // Live ticking clock & real countdown timer
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setTime(new Date());
      setCountdown(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Rotate social proof every 5 seconds
  useEffect(() => {
    const proofTimer = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % SOCIAL_PROOFS.length);
    }, 5000);
    return () => clearInterval(proofTimer);
  }, [SOCIAL_PROOFS.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClaimOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  const productLinks = [
    { label: 'Home Hub', path: '/home' },
    { label: 'Academic Timetable', path: '/app/timetable' },
    { label: 'Smart AI Planner', path: '/app/smart-planner' },
    { label: 'Eisenhower Tasks', path: '/app/tasks' },
    { label: 'Focus Chamber', path: '/app/focus' },
    { label: 'Streaks & Grace Days', path: '/app/streaks' },
    { label: 'Weather Adjustments', path: '/app/weather' },
  ];

  const resourceLinks = [
    { label: 'Documentation', path: '/features' },
    { label: 'Heuristic Engine', path: '/features' },
    { label: 'Conflict Resolution', path: '/features' },
    { label: 'Interactive Demo', path: '/signin' },
    { label: 'Support & Feedback', path: '/features' },
  ];

  return (
    <footer 
      className="w-full rounded-t-[32px] border-t border-white/10 text-sm text-[#A7A7A7] relative overflow-hidden transition-colors select-none"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-14 pb-10 space-y-10 relative z-10">
        
        {/* ============================================================== */}
        {/* PRO OFFER BLOCK (TOP OF FOOTER)                                */}
        {/* ============================================================== */}
        <div
          className="w-full rounded-[32px] border border-white/[0.08] p-[clamp(24px,4vw,56px)] relative overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 85% 20%, rgba(245, 199, 176, 0.08) 0%, rgba(15, 15, 15, 1) 60%), #0F0F0F',
          }}
        >
          {/* Subtle Ambient Peach Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F5C7B0]/10 blur-[100px] pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT SIDE (col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Outlined Pill Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xs text-xs font-semibold text-[#E5E5E5] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#F5C7B0] shadow-[0_0_8px_#F5C7B0] animate-pulse" />
                <span>Free for students &middot; This week only</span>
              </div>

              {/* Heading */}
              <h2 className="text-[clamp(28px,4vw,52px)] font-[800] tracking-[-0.03em] leading-[1.05] text-white">
                Get a <span className="text-[#F5C7B0]">free Pro week</span><br className="hidden sm:inline" /> to master your schedule.
              </h2>

              {/* Paragraph */}
              <p className="text-[#CFCFCF] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Join TimeWise for smart timetable tips, focus protocols and early features before everyone else. Your Pro access arrives the moment you join.
              </p>

              {/* Real Countdown Tiles */}
              <div className="space-y-2 pt-1">
                <span className="text-xs uppercase tracking-wider text-[#9E9E9E] font-bold block">
                  This week's student offer ends in
                </span>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="w-[clamp(52px,6vw,68px)] h-[clamp(52px,6vw,68px)] rounded-2xl bg-[#141414] border border-white/[0.12] flex items-center justify-center shadow-inner">
                      <span className="text-2xl sm:text-3xl font-[800] text-white font-mono tracking-tight tabular-nums">
                        {countdown.hours}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#8A8A8A] uppercase mt-1.5">
                      HOURS
                    </span>
                  </div>

                  <span className="text-xl sm:text-2xl font-bold text-white/40 pb-5 select-none">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="w-[clamp(52px,6vw,68px)] h-[clamp(52px,6vw,68px)] rounded-2xl bg-[#141414] border border-white/[0.12] flex items-center justify-center shadow-inner">
                      <span className="text-2xl sm:text-3xl font-[800] text-white font-mono tracking-tight tabular-nums">
                        {countdown.minutes}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#8A8A8A] uppercase mt-1.5">
                      MIN
                    </span>
                  </div>

                  <span className="text-xl sm:text-2xl font-bold text-white/40 pb-5 select-none">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="w-[clamp(52px,6vw,68px)] h-[clamp(52px,6vw,68px)] rounded-2xl bg-[#141414] border border-white/[0.12] flex items-center justify-center shadow-inner">
                      <span className="text-2xl sm:text-3xl font-[800] text-[#F5C7B0] font-mono tracking-tight tabular-nums">
                        {countdown.seconds}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#8A8A8A] uppercase mt-1.5">
                      SEC
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Proof Pill */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#A7A7A7]">
                  <span className="w-2 h-2 rounded-full bg-[#F5C7B0] shrink-0" />
                  <span className={`font-medium ${reducedMotion ? '' : 'transition-opacity duration-300'}`} key={socialProofIndex}>
                    {SOCIAL_PROOFS[socialProofIndex]}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (Form Card - col-span-5) */}
            <div className="lg:col-span-5 w-full">
              <div
                className="w-full rounded-[28px] border border-white/10 p-6 sm:p-8 relative shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                style={{
                  background: 'linear-gradient(145deg, #161616 0%, #0C0C0C 100%)',
                }}
              >
                {/* Glow behind card */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[28px] bg-[#F5C7B0]/5 blur-xl pointer-events-none -z-10"
                />

                {/* Top Row */}
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A] block">
                      Student perk
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                      Claim your free Pro week
                    </h3>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#F5C7B0] text-[#2A1810] font-extrabold text-xs flex items-center justify-center shadow-md shrink-0">
                    FREE
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F5C7B0]/20 border border-[#F5C7B0] text-[#F5C7B0] mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-lg font-bold text-white">You're in!</h4>
                    <p className="text-xs text-[#CFCFCF] max-w-xs mx-auto">
                      Check your inbox for your exclusive Pro access pass and timetable acceleration guide.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#F5C7B0] hover:underline pt-2 font-semibold"
                    >
                      Submit another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleClaimOffer} className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="pro-offer-email" className="text-xs font-semibold text-[#A7A7A7] block">
                        Email address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-[#737373] absolute left-4 pointer-events-none" />
                        <input
                          id="pro-offer-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="name@university.edu"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0A0A0A] border border-white/10 text-sm text-white placeholder-[#5A5A5A] outline-none focus:border-[#F5C7B0] focus:ring-2 focus:ring-[#F5C7B0]/40 transition-all"
                        />
                      </div>
                      {error && (
                        <p className="text-[11px] text-red-400 font-medium pl-1">{error}</p>
                      )}
                    </div>

                    {/* Gradient CTA Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      aria-label="Get my free week"
                      className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-[#2A1810] shadow-md hover:shadow-[0_0_24px_rgba(245,199,176,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0]"
                      style={{
                        background: 'linear-gradient(135deg, #F5C7B0 0%, #EFAE8F 100%)',
                      }}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-[#2A1810] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Get my free week &rarr;</span>
                      )}
                    </button>

                    <p className="text-[11px] text-[#737373] text-center">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BRAND ROW: Logo + TimeWise on Left, Tagline on Right           */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-white/10 text-[#F5C7B0] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#FFFFFF] font-sans">
              TimeWise
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-md font-normal">
            The smart timetable that protects your focus, adapts to your day and keeps your streak alive.
          </p>
        </div>

        {/* ============================================================== */}
        {/* HORIZONTAL LINK ROWS (Product, Resources, Connect)             */}
        {/* ============================================================== */}
        <div className="space-y-6 pb-6">
          
          {/* ROW 1: PRODUCT */}
          <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-3 min-[900px]:gap-6 pb-6 border-b border-white/[0.08]">
            <div className="min-[900px]:w-[140px] shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Product
              </span>
            </div>

            {/* Links: desktop horizontal flex, mobile wrapped pills */}
            <div className="flex flex-wrap items-center gap-2 min-[900px]:gap-x-6 min-[900px]:gap-y-2">
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group relative inline-flex items-center text-xs sm:text-sm text-[#A7A7A7] hover:text-[#FFFFFF] transition-all py-1 min-[900px]:py-1.5 px-3 min-[900px]:px-0 rounded-full min-[900px]:rounded-none bg-[#161616] min-[900px]:bg-transparent border border-white/10 min-[900px]:border-none min-h-[40px] min-[900px]:min-h-[auto] hover:border-[#F5C7B0]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0]"
                >
                  <span>{item.label}</span>
                  <span className="hidden min-[900px]:block absolute left-0 bottom-0.5 w-0 h-[1.5px] bg-[#F5C7B0] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* ROW 2: RESOURCES */}
          <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-3 min-[900px]:gap-6 pb-6 border-b border-white/[0.08]">
            <div className="min-[900px]:w-[140px] shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Resources
              </span>
            </div>

            {/* Links: desktop horizontal flex, mobile wrapped pills */}
            <div className="flex flex-wrap items-center gap-2 min-[900px]:gap-x-6 min-[900px]:gap-y-2">
              {resourceLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group relative inline-flex items-center text-xs sm:text-sm text-[#A7A7A7] hover:text-[#FFFFFF] transition-all py-1 min-[900px]:py-1.5 px-3 min-[900px]:px-0 rounded-full min-[900px]:rounded-none bg-[#161616] min-[900px]:bg-transparent border border-white/10 min-[900px]:border-none min-h-[40px] min-[900px]:min-h-[auto] hover:border-[#F5C7B0]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0]"
                >
                  <span>{item.label}</span>
                  <span className="hidden min-[900px]:block absolute left-0 bottom-0.5 w-0 h-[1.5px] bg-[#F5C7B0] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* ROW 3: CONNECT */}
          <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-3 min-[900px]:gap-6 pb-6 border-b border-white/[0.08]">
            <div className="min-[900px]:w-[140px] shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Connect
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <p className="text-xs text-[#A7A7A7] leading-relaxed max-w-md">
                Join our developer community and life optimization channel.
              </p>

              <div className="flex items-center gap-2.5">
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
                    className="w-11 h-11 rounded-full bg-[#1A1A1A] border border-white/10 shadow-sm flex items-center justify-center text-[#FFFFFF] hover:bg-[#F5C7B0] hover:text-[#2A1810] hover:border-[#F5C7B0] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0] cursor-pointer"
                  >
                    <btn.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPACT HORIZONTAL STATUS BAR                                  */}
        {/* ============================================================== */}
        <div className="w-full rounded-[20px] p-3.5 sm:p-4 px-5 sm:px-6 bg-[#141414] border border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Status info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs">
            {/* Operational */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C7B0] shadow-[0_0_8px_#F5C7B0] animate-pulse" />
              <span className="font-bold text-white">All Systems Operational</span>
            </div>

            <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />

            {/* Live clock */}
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[#8E8E8E]">Live Clock:</span>
              <span className="font-bold text-[#F5C7B0] tabular-nums">{format(time, 'hh:mm:ss a')}</span>
            </div>

            <div className="hidden sm:block w-[1px] h-3.5 bg-white/15" />

            {/* Quote */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#A7A7A7] italic">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C7B0] shrink-0" />
              <span>"Consistency beats intensity every single day."</span>
            </div>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 min-w-[36px] rounded-full bg-[#202020] border border-white/10 flex items-center justify-center text-[#FFFFFF] hover:bg-[#F5C7B0] hover:text-[#2A1810] hover:border-[#F5C7B0] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0] cursor-pointer"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* SUBTLE WATERMARK: "TIMEWISE"                                   */}
        {/* ============================================================== */}
        <div 
          aria-hidden="true"
          className="w-full text-center select-none pointer-events-none py-1 opacity-[0.06] text-[clamp(40px,8vw,110px)] font-[900] tracking-widest text-[#FFFFFF] leading-none"
        >
          TIMEWISE
        </div>

        {/* ============================================================== */}
        {/* BOTTOM BAR: Copyright & Preferences                            */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-[#A7A7A7]">
          <p className="text-center sm:text-left">
            &copy; 2026 TimeWise Platform. Engineered for absolute focus &amp; flow.
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#FFFFFF] font-medium bg-[#161616] px-3 py-1.5 rounded-full border border-white/10">
              <Globe className="w-3.5 h-3.5 text-[#F5C7B0]" />
              <span>English (US)</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-[#161616] hover:bg-[#202020] text-[#FFFFFF] border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0] cursor-pointer"
              title="Toggle Light / Dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#F5C7B0]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#F5C7B0]" />
              )}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
