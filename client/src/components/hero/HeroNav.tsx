import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export const HeroNav: React.FC = () => {
  const navLinks = [
    { label: 'Product', path: '/features', left: 964 },
    { label: 'AI Features', path: '/features', left: 1128 },
    { label: 'Use Cases', path: '/features', left: 1323 },
    { label: 'Pricing', path: '/features', left: 1512 },
  ];

  return (
    <nav 
      aria-label="Hero navigation"
      className="absolute inset-0 pointer-events-none z-50 select-none"
    >
      {/* Left: TimeWise Logo (Icon 48x48 at left 63, top 27; Wordmark at left 128, y=51) */}
      <Link 
        to="/" 
        aria-label="TimeWise Home"
        className="pointer-events-auto flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] rounded-lg"
      >
        {/* Logo Icon */}
        <div 
          className="absolute bg-[#1C1C21] text-[#F5C7B0] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200"
          style={{
            left: 'calc(63 * var(--s))',
            top: 'calc(27 * var(--s))',
            width: 'calc(48 * var(--s))',
            height: 'calc(48 * var(--s))',
            borderRadius: 'calc(14 * var(--s))',
          }}
        >
          <Clock 
            style={{ width: 'calc(26 * var(--s))', height: 'calc(26 * var(--s))' }} 
            className="stroke-[2.5]" 
          />
        </div>

        {/* Wordmark */}
        <span 
          className="absolute font-extrabold tracking-tight"
          style={{
            left: 'calc(128 * var(--s))',
            top: 'calc(51 * var(--s))',
            transform: 'translateY(-50%)',
            fontSize: 'max(var(--min-font, 0px), calc(40 * var(--s)))',
            color: '#141414',
          }}
        >
          TimeWise
        </span>
      </Link>

      {/* Nav Links: font 24, regular, color #141414, vertically centered at y = 51 */}
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="pointer-events-auto absolute hover:opacity-75 transition-opacity group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] rounded"
          style={{
            left: `calc(${link.left} * var(--s))`,
            top: 'calc(51 * var(--s))',
            transform: 'translateY(-50%)',
            fontSize: 'max(var(--min-font, 0px), calc(24 * var(--s)))',
            color: '#141414',
            fontWeight: 400,
          }}
        >
          <span>{link.label}</span>
          <span 
            className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#141414] transition-all duration-300 group-hover:w-full" 
          />
        </Link>
      ))}

      {/* "Get Started" button: right 64 (right edge 1856), top 19, width 193, height 62, radius 20, font 24 semibold, white on #1E1E22 */}
      <Link
        to="/signin"
        className="pointer-events-auto absolute inline-flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] shadow-xs cursor-pointer"
        style={{
          right: 'calc(64 * var(--s))',
          top: 'calc(19 * var(--s))',
          width: 'calc(193 * var(--s))',
          height: 'calc(62 * var(--s))',
          borderRadius: 'calc(20 * var(--s))',
          fontSize: 'max(var(--min-font, 0px), calc(24 * var(--s)))',
          fontWeight: 600,
          background: '#1E1E22',
        }}
      >
        Get Started
      </Link>
    </nav>
  );
};
