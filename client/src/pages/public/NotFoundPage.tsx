import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-950 text-slate-100 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 border border-brand-500/20">
        <Clock className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white font-mono">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mt-2">Page Not Found</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-sm">
        The timeline coordinates you requested do not exist or have been shifted to another slot.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow-violet transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to TimeWise
        </Link>
      </div>
    </div>
  );
};

