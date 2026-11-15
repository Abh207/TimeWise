import React from 'react';

export const HeroHeadline: React.FC = () => {
  return (
    <div className="w-full select-none pointer-events-none">
      {/* Desktop Layout (>= 1024px): "FOCUS" at top-left, "YOUR" / "TIME" stacked at top-right */}
      <div className="hidden lg:flex w-full items-start justify-between">
        {/* Left: FOCUS */}
        <div className="text-[clamp(44px,7vw,110px)] font-[800] tracking-[-0.03em] leading-[0.88] text-[#141414] animate-fade-in-left">
          FOCUS
        </div>

        {/* Right: YOUR / TIME stacked */}
        <div className="text-right text-[clamp(44px,7vw,110px)] font-[800] tracking-[-0.03em] leading-[0.88] text-[#141414] flex flex-col items-end animate-fade-in-right">
          <span>YOUR</span>
          <span>TIME</span>
        </div>
      </div>

      {/* Mobile & Tablet Layout (< 1024px): Centered Stack */}
      <div className="lg:hidden w-full text-center px-2 py-1">
        <h1 className="text-[clamp(36px,8.5vw,68px)] font-[800] tracking-[-0.03em] leading-[0.9] text-[#141414]">
          <span>FOCUS</span>{' '}
          <span className="block sm:inline">YOUR TIME</span>
        </h1>
      </div>
    </div>
  );
};
