import React from 'react';

export const HeroHeadline: React.FC = () => {
  return (
    <>
      {/* Accessible h1 for screen readers and SEO */}
      <h1 className="sr-only">FOCUS ON YOUR TIME</h1>

      {/* Scaled Desktop Headline on 1920 x 870 Canvas */}
      <div 
        aria-hidden="true"
        className="select-none pointer-events-none"
      >
        {/* "FOCUS ON": left 63, cap top at y = 122 */}
        <div
          className="absolute z-20 font-[800] uppercase tracking-[-0.015em] whitespace-nowrap animate-fade-in-left"
          style={{
            left: 'calc(63 * var(--s))',
            top: 'calc(122 * var(--s))',
            fontSize: 'max(var(--min-font, 0px), calc(170 * var(--s)))',
            lineHeight: 0.84,
            color: '#141414',
          }}
        >
          FOCUS ON
        </div>

        {/* "YOUR": right edge at 1856 (right 64), cap top at y = 122 */}
        <div
          className="absolute z-20 font-[800] uppercase tracking-[-0.015em] text-right whitespace-nowrap animate-fade-in-right"
          style={{
            right: 'calc(64 * var(--s))',
            top: 'calc(122 * var(--s))',
            fontSize: 'max(var(--min-font, 0px), calc(170 * var(--s)))',
            lineHeight: 0.84,
            color: '#141414',
          }}
        >
          YOUR
        </div>

        {/* "TIME": right edge at 1856 (right 64), cap top at y = 257 */}
        <div
          className="absolute z-20 font-[800] uppercase tracking-[-0.015em] text-right whitespace-nowrap animate-fade-in-right"
          style={{
            right: 'calc(64 * var(--s))',
            top: 'calc(257 * var(--s))',
            fontSize: 'max(var(--min-font, 0px), calc(170 * var(--s)))',
            lineHeight: 0.84,
            color: '#141414',
          }}
        >
          TIME
        </div>
      </div>
    </>
  );
};
