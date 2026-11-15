import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { MenuDropdown } from '../ui/MenuDropdown';

interface PublicNavbarProps {
  isTransparent?: boolean;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ isTransparent = false }) => {
  return (
    <header className={
      isTransparent
        ? "absolute top-0 left-0 right-0 z-40 w-full bg-black/25 dark:bg-black/40 border-b border-white/10 backdrop-blur-md transition-colors"
        : "sticky top-0 z-40 w-full bg-[#FDF1EA]/90 dark:bg-[#140F0D]/90 border-b border-[rgba(245,199,176,0.25)] backdrop-blur-md"
    }>
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo on the Left */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${
            isTransparent
              ? "bg-white/15 border border-white/25 text-[#F5C7B0]"
              : "bg-[#FBE3D6] dark:bg-[#2C1E18] border border-[rgba(245,199,176,0.35)] text-[#A24E27] dark:text-[#F5C7B0]"
          }`}>
            <Clock className="w-5 h-5 font-bold" />
          </div>
          <span className={`font-extrabold text-2xl tracking-tight font-sans flex items-center gap-2 ${
            isTransparent ? "text-white" : "text-[#1B2B22] dark:text-[#F0FDF4]"
          }`}>
            TimeWise
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
              isTransparent
                ? "bg-[#F5C7B0]/20 text-[#F5C7B0] border border-[#F5C7B0]/30"
                : "bg-[#FBE3D6] text-[#A24E27] dark:text-[#F5C7B0] border border-[rgba(245,199,176,0.35)]"
            }`}>
              Clean
            </span>
          </span>
        </Link>

        {/* Right side: Three-dot menu button (⋮) */}
        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className={`hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              isTransparent
                ? "text-white/90 hover:text-white hover:bg-white/15 border border-white/20"
                : "text-[#A24E27] dark:text-[#F5C7B0] hover:bg-[#FBE3D6] dark:hover:bg-[#2C1E18]"
            }`}
          >
            Sign In
          </Link>
          <MenuDropdown />
        </div>
      </div>
    </header>
  );
};
