import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface WatchVisualProps {
  currentLabel: string;
}

export const WatchVisual: React.FC<WatchVisualProps> = ({ currentLabel }) => {
  const [time, setTime] = useState(new Date());
  const [parallax, setParallax] = useState({ rotateX: 0, rotateY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update real-time clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check reduced motion & mouse parallax
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || motionQuery.matches) {
      return () => motionQuery.removeEventListener('change', handleMotion);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      // Max ±5-6 degrees on top of base tilt
      setParallax({
        rotateX: -deltaY * 5,
        rotateY: deltaX * 5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotion);
    };
  }, []);

  // Calculate analog hand degrees
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center select-none short-shrink"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Soft Round White Glow Behind */}
      <div 
        aria-hidden="true" 
        className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full bg-white/80 blur-3xl pointer-events-none -z-20" 
      />

      {/* 2. Blurred Oval Shadow Under Watch */}
      <div 
        aria-hidden="true"
        className="absolute bottom-[-28px] w-44 sm:w-56 h-8 bg-[#3C280A]/16 blur-xl rounded-full pointer-events-none -z-20 transform scale-y-60 rotate-[12deg]"
      />

      {/* 3. Orbit Ring (Behind Half) */}
      <div 
        aria-hidden="true"
        className="absolute w-[310px] sm:w-[380px] h-[140px] sm:h-[170px] pointer-events-none -z-10"
        style={{
          transform: 'rotateZ(28deg) rotateX(65deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg viewBox="0 0 380 170" className="w-full h-full" fill="none">
          <ellipse 
            cx="190" 
            cy="85" 
            rx="180" 
            ry="75" 
            stroke="#C8F03C" 
            strokeWidth="2.5" 
            strokeDasharray="6 4"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* 4. Watch Body: Outer Float Wrapper (translateY only, doesn't fight rotation) */}
      <div className={reducedMotion ? '' : 'animate-watch-float'}>
        {/* Inner 3D Tilt Wrapper */}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            '--watch-tilt': '28deg',
            transform: reducedMotion 
              ? 'perspective(1200px) rotateZ(var(--watch-tilt, 28deg)) rotateY(-12deg) rotateX(8deg)' 
              : `perspective(1200px) rotateZ(var(--watch-tilt, 28deg)) rotateY(${-12 + parallax.rotateY}deg) rotateX(${8 + parallax.rotateX}deg)`,
            transformStyle: 'preserve-3d',
          } as React.CSSProperties}
        >
          {/* ======================================================== */}
          {/* TOP STRAP (Pearl/Cream Rubber Belt with Grooves)         */}
          {/* ======================================================== */}
          <div 
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -top-[68px] sm:-top-[78px] w-[105px] sm:w-[120px] lg:w-[126px] h-[78px] sm:h-[88px] rounded-t-[20px] border-l border-white/70 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.08),0_4px_12px_rgba(60,40,10,0.10)] -z-10 overflow-hidden flex flex-col justify-end pb-3"
            style={{
              background: 'linear-gradient(135deg, #F0ECE4 0%, #E9E4DA 40%, #DFD8CB 80%, #D9D2C5 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
              maskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
            }}
          >
            {/* 5 Thin Horizontal Grooves with White Highlights */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full flex flex-col items-center my-[2.5px] px-2.5">
                <div className="w-full h-[1.5px] bg-black/10 rounded-full" />
                <div className="w-full h-[1px] bg-white/70 rounded-full" />
              </div>
            ))}
          </div>

          {/* Top Metal Lugs / Connection Joint */}
          <div 
            aria-hidden="true" 
            className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[114px] sm:w-[130px] flex justify-between px-1 pointer-events-none z-10"
          >
            <div className="w-2.5 h-1.5 rounded-t-xs bg-gradient-to-b from-[#E6E0D8] to-[#C9C2B7] border border-white/50 shadow-2xs" />
            <div className="w-2.5 h-1.5 rounded-t-xs bg-gradient-to-b from-[#E6E0D8] to-[#C9C2B7] border border-white/50 shadow-2xs" />
          </div>

          {/* ======================================================== */}
          {/* BOTTOM STRAP (Pearl/Cream Rubber Belt with Grooves)      */}
          {/* ======================================================== */}
          <div 
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -bottom-[68px] sm:-bottom-[78px] w-[105px] sm:w-[120px] lg:w-[126px] h-[78px] sm:h-[88px] rounded-b-[20px] border-l border-white/70 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.08),0_4px_12px_rgba(60,40,10,0.10)] -z-10 overflow-hidden flex flex-col justify-start pt-3"
            style={{
              background: 'linear-gradient(135deg, #F0ECE4 0%, #E9E4DA 40%, #DFD8CB 80%, #D9D2C5 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            }}
          >
            {/* 5 Thin Horizontal Grooves with White Highlights */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full flex flex-col items-center my-[2.5px] px-2.5">
                <div className="w-full h-[1.5px] bg-black/10 rounded-full" />
                <div className="w-full h-[1px] bg-white/70 rounded-full" />
              </div>
            ))}
          </div>

          {/* Bottom Metal Lugs / Connection Joint */}
          <div 
            aria-hidden="true" 
            className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-[114px] sm:w-[130px] flex justify-between px-1 pointer-events-none z-10"
          >
            <div className="w-2.5 h-1.5 rounded-b-xs bg-gradient-to-b from-[#C9C2B7] to-[#E6E0D8] border border-white/50 shadow-2xs" />
            <div className="w-2.5 h-1.5 rounded-b-xs bg-gradient-to-b from-[#C9C2B7] to-[#E6E0D8] border border-white/50 shadow-2xs" />
          </div>

          {/* ======================================================== */}
          {/* WATCH CASE (Pearl Ceramic with Glossy Bevel)             */}
          {/* ======================================================== */}
          <div className="relative w-[175px] sm:w-[200px] lg:w-[218px] h-[210px] sm:h-[245px] lg:h-[265px] rounded-[36px] sm:rounded-[42px] p-[8px] sm:p-[9px] bg-gradient-to-br from-[#FFFFFF] via-[#F4EFEA] to-[#DFD8CE] shadow-[0_18px_45px_rgba(50,35,15,0.18),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.08)] border border-white/90">
            
            {/* Digital Crown on Right */}
            <div 
              aria-hidden="true"
              className="absolute -right-[7px] top-[55px] sm:top-[65px] w-[7px] sm:w-[8px] h-[32px] sm:h-[36px] rounded-r-md bg-gradient-to-b from-[#D4CCC0] via-[#FFFFFF] to-[#BDB4A8] border-y border-r border-[#B8AF9F] shadow-xs flex flex-col justify-between py-1"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[1px] bg-[#9F9585] mx-[1px]" />
              ))}
            </div>

            {/* Side Button below Crown */}
            <div 
              aria-hidden="true"
              className="absolute -right-[4px] top-[105px] sm:top-[120px] w-[4px] h-[22px] sm:h-[26px] rounded-r-sm bg-gradient-to-b from-[#CCC4B7] to-[#BDB4A7]"
            />

            {/* OLED Black Screen */}
            <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-between p-2.5 sm:p-3 border border-white/10 shadow-inner">
              
              {/* Glossy diagonal glass reflection */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" 
              />

              {/* Top Screen: Slide badge & Date */}
              <div className="relative z-10 w-full flex items-center justify-between px-0.5 pt-0.5">
                <span className="text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#C8F03C]/20 text-[#C8F03C] border border-[#C8F03C]/40">
                  {currentLabel}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono text-white/70 font-semibold">
                  {format(time, 'EEE d')}
                </span>
              </div>

              {/* Center Screen: Clock Face with Real-time Hands */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center my-auto">
                {/* 12 Hour Ticks */}
                {[...Array(12)].map((_, i) => {
                  const angle = i * 30;
                  const isMain = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      aria-hidden="true"
                      className="absolute inset-0 flex items-start justify-center"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div 
                        className={`rounded-full ${
                          isMain 
                            ? 'w-[1.5px] sm:w-[2px] h-[5px] sm:h-[6px] bg-white/90' 
                            : 'w-[1px] h-[3.5px] bg-white/40'
                        }`} 
                      />
                    </div>
                  );
                })}

                {/* Hour Hand */}
                <div
                  className="absolute w-[3px] h-[24px] sm:h-[32px] bg-white rounded-full shadow-md origin-bottom"
                  style={{
                    bottom: '50%',
                    transform: `rotate(${hourDeg}deg)`,
                    transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                  }}
                />

                {/* Minute Hand */}
                <div
                  className="absolute w-[2px] h-[34px] sm:h-[44px] bg-white/95 rounded-full shadow-md origin-bottom"
                  style={{
                    bottom: '50%',
                    transform: `rotate(${minuteDeg}deg)`,
                    transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                  }}
                />

                {/* Second Hand (Thin Lime Needle) */}
                <div
                  className="absolute w-[1px] sm:w-[1.5px] h-[40px] sm:h-[50px] bg-[#C8F03C] origin-bottom shadow-[0_0_5px_#C8F03C]"
                  style={{
                    bottom: '50%',
                    transform: `rotate(${secondDeg}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C8F03C]" />
                </div>

                {/* Center Hub */}
                <div className="absolute w-2 h-2 rounded-full bg-[#141414] border-[1.5px] border-[#C8F03C] z-20 shadow-xs" />
              </div>

              {/* Bottom Screen: Digital Time Display */}
              <div className="relative z-10 flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-white font-bold tracking-tight pb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F03C] animate-pulse" />
                <span>{format(time, 'hh:mm:ss a')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Orbit Ring Front Dot (Passing in Front of Watch) */}
      <div 
        aria-hidden="true"
        className="absolute w-[310px] sm:w-[380px] h-[140px] sm:h-[170px] pointer-events-none z-30"
        style={{
          transform: 'rotateZ(28deg) rotateX(65deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C8F03C] shadow-[0_0_8px_#C8F03C]" 
        />
      </div>
    </div>
  );
};
