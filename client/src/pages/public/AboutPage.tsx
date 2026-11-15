import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { Clock, ShieldCheck, Heart, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 sm:px-6 space-y-12 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-500/30 text-xs text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Platform Philosophy & Vision
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Designed for Intentional Living
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            TimeWise was engineered from the conviction that modern scheduling tools fail students and professionals by being static digital calendars rather than intelligent, adaptive life operating systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-brand-400" />
              <span>Explainable, Transparent AI</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Unlike opaque black-box AI platforms that guess without context, TimeWise's scheduling engine is rule-based, deterministic, and 100% explainable. It tells you exactly why a task was allocated to a particular hour.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Privacy & Local Sovereign Data</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your personal schedule, life journal, and habit logs belong solely to you. TimeWise works fully offline in your browser with persistent storage and requires zero third-party telemetry tracking.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl glass-card bg-gradient-to-r from-brand-950/40 via-dark-900 to-indigo-950/40 border border-brand-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Experience the Difference</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Start structuring your timetable, protecting your energy, and achieving deep work without distraction.
          </p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow-violet transition-all hover:scale-105"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

