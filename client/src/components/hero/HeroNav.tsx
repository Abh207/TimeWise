import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { MenuDropdown } from '../ui/MenuDropdown';

export const HeroNav: React.FC = () => {
  const navLinks = [
    { label: 'Product', path: '/features' },
    { label: 'AI Features', path: '/features' },
    { label: 'Use Cases', path: '/features' },
    { label: 'Pricing', path: '/features' },
  ];

  return (
    <nav className="w-full h-16 px-6 sm:px-8 lg:px-12 flex items-center justify-between relative z-40 shrink-0">
      {/* Left: TimeWise Logo */}
      <Link to="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] rounded-xl p-1">
        <div className="w-9 h-9 rounded-xl bg-[#141414] text-[#C8F03C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
          <Clock className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-[#141414] font-sans">
          TimeWise
        </span>
      </Link>

      {/* Right: Desktop Links + Dark Pill Button */}
      <div className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="relative text-[#6F6A64] hover:text-[#141414] font-medium text-sm transition-colors group py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] rounded-md"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#141414] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <Link
          to="/signin"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#141414] hover:bg-[#282828] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
        >
          <span>Get Started &rarr;</span>
        </Link>
      </div>

      {/* Mobile: Three-dot Menu */}
      <div className="lg:hidden flex items-center gap-3">
        <Link
          to="/signin"
          className="inline-flex sm:hidden items-center text-xs font-bold text-[#141414] px-3.5 py-1.5 rounded-full bg-white/70 border border-black/10"
        >
          Sign In
        </Link>
        <MenuDropdown />
      </div>
    </nav>
  );
};

