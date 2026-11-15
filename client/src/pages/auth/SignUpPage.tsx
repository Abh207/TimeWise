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
  User, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', score: 0, color: 'bg-slate-200' };
    if (password.length < 6) return { label: 'Weak', score: 1, color: 'bg-[#FF7A6B]' };
    if (password.length < 10) return { label: 'Medium', score: 2, color: 'bg-[#F5A524]' };
    return { label: 'Strong', score: 3, color: 'bg-[#2E9E5E]' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('Please agree to the Terms of Service to proceed.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const session = await authService.signUp(email, password, fullName);
      setUser(session.user);
      navigate('/home');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F3FAF5] dark:bg-[#0C1812] text-[#1B2B22] dark:text-[#F0FDF4] p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-200">
      {/* Left visual panel */}
      <div className="lg:w-1/2 relative rounded-[24px] overflow-hidden border border-[rgba(46,158,94,0.2)] shadow-soft flex flex-col justify-between p-6 sm:p-10 min-h-[280px] lg:min-h-full">
        <img
          src="/images/student-focus.jpg"
          alt="Focused student studying"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#144329]/90 via-[#2E9E5E]/60 to-[#144329]/40 pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white/90 border border-white/20 flex items-center justify-center text-[#2E9E5E] shadow-sm">
              <Clock className="w-5 h-5 font-bold" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">
              TimeWise
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md my-auto py-6 sm:py-0">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-sm">
            Start designing your ideal rhythm today.
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
            Join students, researchers, and professionals who protect their energy and stay focused.
          </p>

          <div className="mt-6 space-y-2.5 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3DB772]" />
              <span>Full bi-weekly rotation cycles (Week A / B)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3DB772]" />
              <span>Solfeggio 528Hz deep focus soundscapes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3DB772]" />
              <span>Streak freeze shields for off-days</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-white/70 pt-4 hidden lg:block">
          &copy; {new Date().getFullYear()} TimeWise Platform
        </div>
      </div>

      {/* Right form panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-10 lg:p-12">
        <div className="w-full max-w-md p-6 sm:p-10 rounded-[24px] bg-white dark:bg-[#122218] border border-[rgba(46,158,94,0.2)] shadow-soft">
          <div className="text-left space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2B22] dark:text-[#F0FDF4] tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs text-[#6B7C72] dark:text-[#9AB3A4]">
              Set up your timetable in under 30 seconds.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 mb-4 rounded-[14px] bg-[#FFF0EE] border border-[#FF7A6B]/30 text-[#FF7A6B] text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B7C72]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-clean w-full pl-10 pr-4 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B7C72]" />
                <input
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-clean w-full pl-10 pr-4 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B2B22] dark:text-[#F0FDF4] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B7C72]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-clean w-full pl-10 pr-10 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#6B7C72] hover:text-[#1B2B22] dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[11px] text-[#6B7C72] dark:text-[#9AB3A4]">
                    <span>Password Strength</span>
                    <span className="font-semibold text-[#1B2B22] dark:text-[#F0FDF4]">{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 h-1">
                    <div className={`rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`rounded-full ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#2E9E5E] focus:ring-[#2E9E5E]"
              />
              <label htmlFor="terms" className="text-xs text-[#6B7C72] dark:text-[#9AB3A4]">
                I agree to the <span className="text-[#2E9E5E]">Terms of Service</span> and <span className="text-[#2E9E5E]">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary-green w-full py-3.5 mt-2 text-xs font-bold uppercase tracking-wider"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Open Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#6B7C72] dark:text-[#9AB3A4] mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#2E9E5E] hover:underline font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
