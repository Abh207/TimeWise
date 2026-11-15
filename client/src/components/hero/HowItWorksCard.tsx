import React from 'react';
import { Play } from 'lucide-react';

interface HowItWorksCardProps {
  onOpenVideo: () => void;
}

export const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ onOpenVideo }) => {
  return (
    <div
      onClick={onOpenVideo}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenVideo();
        }
      }}
      aria-label="Play How TimeWise Works video"
      className="tap-target-expanded group cursor-pointer flex items-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21]"
      style={{
        width: 'calc(408 * var(--s))',
        height: 'calc(151 * var(--s))',
        backgroundColor: 'var(--glass, rgba(255, 255, 255, 0.55))',
        backdropFilter: 'blur(calc(16 * var(--s)))',
        WebkitBackdropFilter: 'blur(calc(16 * var(--s)))',
        borderRadius: 'calc(30 * var(--s))',
        border: 'calc(1 * var(--s)) solid rgba(255, 255, 255, 0.85)',
        boxShadow: '0 calc(12 * var(--s)) calc(36 * var(--s)) rgba(60, 40, 10, 0.08)',
        padding: 'calc(14 * var(--s))',
        gap: 'calc(16 * var(--s))',
      }}
    >
      {/* Left Thumbnail */}
      <div
        className="shrink-0 flex items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform duration-200"
        style={{
          width: 'calc(123 * var(--s))',
          height: 'calc(123 * var(--s))',
          borderRadius: 'calc(20 * var(--s))',
          background: 'linear-gradient(135deg, #F6EDE3 0%, #F5DAC9 50%, #ECC5B0 100%)',
          boxShadow: 'inset 0 calc(1 * var(--s)) calc(2 * var(--s)) rgba(255,255,255,0.8), 0 calc(2 * var(--s)) calc(6 * var(--s)) rgba(60,40,10,0.06)',
          border: 'calc(1 * var(--s)) solid rgba(255,255,255,0.7)',
        }}
      >
        {/* Stylized Miniature Phone Mockup */}
        <div
          className="relative flex items-center justify-center bg-white shadow-xs"
          style={{
            width: 'calc(54 * var(--s))',
            height: 'calc(88 * var(--s))',
            borderRadius: 'calc(12 * var(--s))',
            border: 'calc(1.5 * var(--s)) solid #D6CBC1',
          }}
        >
          {/* Top Notch */}
          <div
            className="absolute rounded-full bg-[#BDB4A8]"
            style={{ 
              top: 'calc(5 * var(--s))',
              width: 'calc(16 * var(--s))', 
              height: 'calc(3.5 * var(--s))' 
            }}
          />

          {/* Center Play Icon */}
          <div
            className="rounded-full bg-[#1C1C21] text-white flex items-center justify-center shadow-xs group-hover:bg-[#F7852C] transition-colors"
            style={{
              width: 'calc(28 * var(--s))',
              height: 'calc(28 * var(--s))',
            }}
          >
            <Play
              className="fill-current"
              style={{
                width: 'calc(12 * var(--s))',
                height: 'calc(12 * var(--s))',
                marginLeft: 'calc(2 * var(--s))',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right: Title & 2-line Subtitle */}
      <div 
        className="flex flex-col justify-center min-w-0 flex-1 pr-1.5"
        style={{ gap: 'calc(4 * var(--s))' }}
      >
        <span
          className="font-bold leading-tight"
          style={{
            fontSize: 'max(var(--min-font, 0px), calc(32 * var(--s)))',
            color: '#141414',
          }}
        >
          How It Works
        </span>
        <p
          className="font-normal leading-snug line-clamp-2"
          style={{
            fontSize: 'max(var(--min-font, 0px), calc(25 * var(--s)))',
            color: '#7A756E',
            lineHeight: 1.3,
          }}
        >
          Watch the video to see how it works.
        </p>
      </div>
    </div>
  );
};
