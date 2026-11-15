import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Clock, Mail, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await authService.resetPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark-950 text-slate-100 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-brand-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10 shadow-2xl relative z-10 animate-fadeIn">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-violet">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-white">TimeWise</span>
        </Link>

        {isSubmitted ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Reset Link Dispatched</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              We have generated a mock password reset authorization for <strong className="text-white">{email}</strong>. In production mode with Supabase, an email verification link will be delivered directly to your inbox.
            </p>
            <div className="pt-4">
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-violet transition-all"
              >
                Back to Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Enter the email associated with your TimeWise account, and we will send recovery instructions.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="alex.chen@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow-violet transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Send Reset Link'}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

