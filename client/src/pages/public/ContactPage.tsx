import React, { useState } from 'react';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { triggerConfetti } from '../../components/ui/Confetti';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100">
      <PublicNavbar />

      <main className="flex-1 max-w-xl mx-auto px-4 py-16 sm:px-6 w-full animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Get in Touch</h1>
          <p className="text-xs text-slate-400 mt-2">
            Have a question, feedback, or feature suggestion for the TimeWise engineering team?
          </p>
        </div>

        <div className="p-8 rounded-2xl glass-card border border-white/10 shadow-2xl">
          {isSent ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-peach-300 mx-auto" />
              <h2 className="text-xl font-bold text-white">Message Dispatched!</h2>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. A team member will review your note shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.chen@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Message / Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your thoughts or report an issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-glow-violet transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

