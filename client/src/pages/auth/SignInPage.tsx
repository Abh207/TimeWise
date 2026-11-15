import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useStore } from '../../store/useStore';
import { 
  Clock, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Play
} from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const session = await authService.signIn(email, password);
      setUser(session.user);
      navigate('/home');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const session = await authService.signIn('alex.chen@university.edu', 'demo1234');
    setUser(session.user);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDF1EA] dark:bg-[#140F0D] text-[#1B2B22] dark:text-[#F0FDF4] p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-200">
      {/* ============================================================== */}
      {/* LEFT VISUAL PANEL */}
      {/* On desktop: full height rounded card with image & overlay. */}
      {/* On mobile: short rounded banner at top. */}
      {/* ============================================================== */}
      <div className="lg:w-1/2 relative rounded-[24px] overflow-hidden border border-[rgba(245,199,176,0.3)] shadow-soft flex flex-col justify-between p-6 sm:p-10 min-h-[280px] lg:min-h-full">
        {/* Background Image */}
        <img
          src="/images/signin-bg.jpg"
          alt="Focused study and planning workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft Peach Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#5C2814]/90 via-[#D9805A]/60 to-[#5C2814]/40 pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white/90 border border-white/20 flex items-center justify-center text-[#D9805A] shadow-sm">
              <Clock className="w-5 h-5 font-bold" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">
              TimeWise
            </span>
          </Link>
        </div>

        {/* Middle: Headline */}
        <div className="relative z-10 max-w-md my-auto py-6 sm:py-0">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-sm">
            Master your schedule. Protect your flow.
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
            The clean, intelligent timetable platform built to safeguard deep work blocks and eliminate academic chaos.
          </p>
        </div>

        {/* Floating Mini Timetable Card */}
        <div className="relative z-10 hidden sm:block w-full max-w-sm mt-4 p-4 rounded-[18px] bg-white/95 dark:bg-[#1A120E]/95 backdrop-blur-md border border-[rgba(245,199,176,0.35)] shadow-soft-peach text-left animate-float-slow">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(245,199,176,0.25)] mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5C7B0] animate-pulse" />
              <span className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4]">Active Schedule</span>
            </div>
            <span className="text-[10px] font-semibold text-[#A24E27] dark:text-[#F5C7B0] bg-[#FBE3D6] dark:bg-[#2C1E18] px-2 py-0.5 rounded-full">
              Live Slot
            </span>
          </div>

          {/* Timeline slots */}
          <div className="space-y-2">
            {/* Active task block (peach) */}
            <div className="flex items-center gap-2.5 p-2 rounded-[12px] bg-[#FBE3D6] dark:bg-[#2C1E18] border border-[rgba(245,199,176,0.4)]">
              <div className="w-2 h-2 rounded-full bg-[#F5C7B0] shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1B2B22] dark:text-[#F0FDF4]">CS301 &bull; Distributed Systems</p>
                <p className="text-[10px] text-[#A24E27] dark:text-[#F5C7B0]">09:00 AM - 10:30 AM &bull; Turing Hall</p>
              </div>
            </div>

            {/* Upcoming block */}
            <div className="flex items-center gap-2.5 p-2 rounded-[12px] bg-white dark:bg-[#221713] border border-[rgba(245,199,176,0.25)]">
              <div className="w-2 h-2 rounded-full bg-[#6B7C72] shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4]">Deep Focus &bull; Solfeggio 528Hz</p>
                <p className="text-[10px] text-[#6B7C72] dark:text-[#9AB3A4]">11:00 AM - 12:15 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright in visual panel */}
        <div className="relative z-10 text-[11px] text-white/70 pt-4 hidden lg:block">
          &copy; {new Date().getFullYear()} TimeWise Platform
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT AUTH FORM PANEL */}
      {/* ============================================================== */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-10 lg:p-12">
        <div className="w-full max-w-md p-6 sm:p-10 rounded-[24px] bg-white dark:bg-[#1A120E] border border-[rgba(245,199,176,0.3)] shadow-soft">
          <div className="text-left space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2B22] dark:text-[#F0FDF4] tracking-tight">
              Sign In to TimeWise
            </h1>
            <p className="text-xs text-[#6B7C72] dark:text-[#9AB3A4]">
              Welcome back! Launch with 1 click or enter your credentials.
            </p>
          </div>

          {/* 1-Click Demo Login Button (Prominent outlined peach button with sparkle icon) */}
          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full border-2 border-[#F5C7B0] bg-[#FBE3D6] dark:bg-[#2C1E18] hover:bg-[#F5C7B0] text-[#A24E27] dark:text-[#F5C7B0] hover:text-[#2A1810] text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-soft"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-[#A24E27] dark:text-[#F5C7B0] group-hover:text-[#2A1810]" />
            <span>1-Click Demo Login (Alex Chen &bull; Student)</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[rgba(245,199,176,0.25)] w-full" />
            <span className="bg-white dark:bg-[#1A120E] px-3 text-[10px] uppercase font-bold tracking-wider text-[#6B7C72] dark:text-[#9AB3A4] absolute">
              or with credentials
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 mb-4 rounded-[14px] bg-[#FFF0EE] border border-[#FF7A6B]/30 text-[#FF7A6B] text-xs">
              {errorMessage}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B7C72]" />
                <input
                  type="email"
                  required
                  placeholder="alex.chen@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-clean w-full pl-10 pr-4 text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#A24E27] dark:text-[#F5C7B0] hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B7C72]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-clean w-full pl-10 pr-10 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary-peach w-full py-3.5 mt-2 text-xs font-bold uppercase tracking-wider"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter Home Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-[#6B7C72] dark:text-[#9AB3A4] mt-6">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#A24E27] dark:text-[#F5C7B0] hover:underline font-bold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
