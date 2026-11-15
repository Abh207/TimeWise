import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface WatchVisualProps {
  currentLabel?: string;
}

export const WatchVisual: React.FC<WatchVisualProps> = () => {
  const [time, setTime] = useState(new Date());
  const [parallax, setParallax] = useState({ rotateX: 0, rotateY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check prefers-reduced-motion & mouse parallax (only hover:hover and pointer:fine, max ±3.5°)
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const mouseQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mouseQuery.matches || motionQuery.matches) {
      return () => motionQuery.removeEventListener('change', handleMotion);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      // Max ±3.5°
      setParallax({
        rotateX: -deltaY * 3.5,
        rotateY: deltaX * 3.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotion);
    };
  }, []);

  // Real analog hand degrees
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  // Real date string "Sun 15"
  const dateStr = format(time, 'EEE d');

  return (
    <div
      ref={containerRef}
      className="absolute select-none pointer-events-none"
      style={{
        left: 'calc(1090 * var(--s))',
        top: 'calc(440 * var(--s))',
        transform: 'translate(-50%, -50%)',
        width: 'calc(640 * var(--s))',
        height: 'calc(900 * var(--s))',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Blurred Oval Shadow Under Watch */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none -z-20 rounded-full"
        style={{
          left: '50%',
          bottom: 'calc(60 * var(--s))',
          transform: 'translateX(-50%) rotate(14deg)',
          width: 'calc(450 * var(--s))',
          height: 'calc(60 * var(--s))',
          background: 'rgba(90, 60, 20, 0.18)',
          filter: 'blur(calc(28 * var(--s)))',
        }}
      />

      {/* 2. Gentle Idle Float Wrapper */}
      <div 
        className={reducedMotion ? 'w-full h-full flex items-center justify-center' : 'w-full h-full flex items-center justify-center animate-watch-float'}
      >
        {/* 3. 3D Tilt Wrapper with CSS Variables */}
        <div
          className="relative"
          style={{
            width: 'calc(450 * var(--s))',
            height: 'calc(480 * var(--s))',
            transformStyle: 'preserve-3d',
            transform: reducedMotion
              ? 'perspective(1400px) rotateZ(var(--watch-rz, 14deg)) rotateY(var(--watch-ry, -18deg)) rotateX(var(--watch-rx, 6deg))'
              : `perspective(1400px) rotateZ(calc(var(--watch-rz, 14deg))) rotateY(calc(var(--watch-ry, -18deg) + ${parallax.rotateY}deg)) rotateX(calc(var(--watch-rx, 6deg) + ${parallax.rotateX}deg))`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* ========================================================== */}
          {/* UPPER STRAP (Smooth Pearl Silicone, behind case, reaches top) */}
          {/* ========================================================== */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 pointer-events-none -z-10 overflow-hidden"
            style={{
              width: 'calc(268 * var(--s))',
              height: 'calc(260 * var(--s))',
              top: 'calc(-230 * var(--s))',
              transform: 'translateX(-50%)',
              borderTopLeftRadius: 'calc(42 * var(--s))',
              borderTopRightRadius: 'calc(42 * var(--s))',
              background: 'linear-gradient(135deg, #F3EDE5 0%, #E8E1D6 50%, #DDD5C9 100%)',
              boxShadow: 'inset 0 calc(2 * var(--s)) calc(4 * var(--s)) rgba(255,255,255,0.9), inset calc(1 * var(--s)) 0 calc(2 * var(--s)) rgba(255,255,255,0.7), inset calc(-1 * var(--s)) 0 calc(3 * var(--s)) rgba(60,40,10,0.08)',
              border: 'calc(1 * var(--s)) solid rgba(255,255,255,0.6)',
              borderBottom: 'none',
            }}
          >
            {/* Subtle top bevel highlight */}
            <div 
              className="w-full h-full opacity-60 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.04) 100%)',
              }}
            />
          </div>

          {/* ========================================================== */}
          {/* LOWER STRAP (Down-left, longer, punch holes, soft fade)   */}
          {/* ========================================================== */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 pointer-events-none -z-10"
            style={{
              width: 'calc(268 * var(--s))',
              height: 'calc(340 * var(--s))',
              bottom: 'calc(-300 * var(--s))',
              transform: 'translateX(-50%)',
              borderBottomLeftRadius: 'calc(50 * var(--s))',
              borderBottomRightRadius: 'calc(50 * var(--s))',
              background: 'linear-gradient(135deg, #EFE9E0 0%, #E3DCD1 55%, #D7CFC2 100%)',
              boxShadow: 'inset 0 calc(-2 * var(--s)) calc(4 * var(--s)) rgba(0,0,0,0.08), inset calc(1 * var(--s)) 0 calc(2 * var(--s)) rgba(255,255,255,0.8), inset calc(-1 * var(--s)) 0 calc(3 * var(--s)) rgba(60,40,10,0.08)',
              border: 'calc(1 * var(--s)) solid rgba(255,255,255,0.6)',
              borderTop: 'none',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            }}
          >
            {/* Column of 5 oval punch holes along the strap */}
            <div 
              className="flex flex-col items-center justify-start"
              style={{
                paddingTop: 'calc(32 * var(--s))',
                gap: 'calc(16 * var(--s))',
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-full shadow-inner"
                  style={{
                    width: 'calc(10 * var(--s))',
                    height: 'calc(18 * var(--s))',
                    backgroundColor: '#C5BCAD',
                    boxShadow: 'inset 0 calc(1 * var(--s)) calc(2 * var(--s)) rgba(0,0,0,0.3), 0 calc(1 * var(--s)) calc(1 * var(--s)) rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ========================================================== */}
          {/* WATCH CASE (Silver/Titanium Bezel, rounded square)        */}
          {/* ========================================================== */}
          <div
            className="relative w-full h-full"
            style={{
              borderRadius: 'calc(96 * var(--s))',
              padding: 'calc(16 * var(--s))',
              background: 'linear-gradient(135deg, #D9D9DC 0%, #FFFFFF 22%, #F4F4F6 50%, #BDBDC2 100%)',
              border: 'calc(1 * var(--s)) solid rgba(255,255,255,0.95)',
              boxShadow: '0 calc(26 * var(--s)) calc(58 * var(--s)) rgba(50,35,15,0.18), inset 0 calc(3 * var(--s)) calc(5 * var(--s)) rgba(255,255,255,0.95), inset 0 calc(-3 * var(--s)) calc(6 * var(--s)) rgba(0,0,0,0.12)',
            }}
          >
            {/* Crown on Right Edge with thin gold ring */}
            <div
              aria-hidden="true"
              className="absolute flex items-center justify-center overflow-hidden"
              style={{
                right: 'calc(-14 * var(--s))',
                top: 'calc(146 * var(--s))',
                width: 'calc(16 * var(--s))',
                height: 'calc(65 * var(--s))',
                borderTopRightRadius: 'calc(10 * var(--s))',
                borderBottomRightRadius: 'calc(10 * var(--s))',
                background: 'linear-gradient(to bottom, #DCDAE0 0%, #FFFFFF 30%, #C4C2C8 70%, #ABA9B0 100%)',
                boxShadow: 'calc(1 * var(--s)) calc(2 * var(--s)) calc(4 * var(--s)) rgba(0,0,0,0.18)',
                border: 'calc(0.5 * var(--s)) solid rgba(255,255,255,0.7)',
              }}
            >
              {/* Thin gold ring in crown */}
              <div 
                className="w-full"
                style={{
                  height: 'calc(7 * var(--s))',
                  background: 'linear-gradient(90deg, #F5B041 0%, var(--gold, #E8A93A) 50%, #D48E25 100%)',
                  boxShadow: '0 0 calc(2 * var(--s)) rgba(232,169,58,0.6)',
                }}
              />
            </div>

            {/* Side button below crown */}
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                right: 'calc(-8 * var(--s))',
                top: 'calc(260 * var(--s))',
                width: 'calc(9 * var(--s))',
                height: 'calc(44 * var(--s))',
                borderTopRightRadius: 'calc(7 * var(--s))',
                borderBottomRightRadius: 'calc(7 * var(--s))',
                background: 'linear-gradient(to bottom, #CCC8C2 0%, #E6E2DB 50%, #B8B3AC 100%)',
                boxShadow: 'calc(1 * var(--s)) calc(1 * var(--s)) calc(3 * var(--s)) rgba(0,0,0,0.15)',
              }}
            />

            {/* ======================================================== */}
            {/* BLACK OLED DISPLAY INSET                                 */}
            {/* ======================================================== */}
            <div
              className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-white"
              style={{
                borderRadius: 'calc(80 * var(--s))',
                backgroundColor: '#0C0C0E',
                boxShadow: 'inset 0 calc(4 * var(--s)) calc(10 * var(--s)) rgba(0,0,0,0.9), 0 0 0 calc(1 * var(--s)) rgba(0,0,0,0.6)',
              }}
            >
              {/* Subtle diagonal glass reflection sweep */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 42%, transparent 60%)',
                }}
              />

              {/* Real Date Label "Sun 15" above center */}
              <div
                className="absolute font-semibold text-white pointer-events-none tracking-normal"
                style={{
                  top: 'calc(80 * var(--s))',
                  fontSize: 'max(var(--min-font, 0px), calc(22 * var(--s)))',
                  letterSpacing: '0.01em',
                  opacity: 0.95,
                }}
              >
                {dateStr}
              </div>

              {/* 12 Thin Tick Marks near Edge */}
              <div 
                className="relative rounded-full flex items-center justify-center pointer-events-none"
                style={{
                  width: 'calc(310 * var(--s))',
                  height: 'calc(310 * var(--s))',
                }}
              >
                {[...Array(12)].map((_, i) => {
                  const deg = i * 30;
                  const isQuarter = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 flex justify-center items-start"
                      style={{ transform: `rotate(${deg}deg)` }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          marginTop: 'calc(7 * var(--s))',
                          width: isQuarter ? 'calc(3.5 * var(--s))' : 'calc(2.2 * var(--s))',
                          height: isQuarter ? 'calc(12 * var(--s))' : 'calc(7 * var(--s))',
                          backgroundColor: isQuarter ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                        }}
                      />
                    </div>
                  );
                })}

                {/* Hour Hand (White with rounded tip) */}
                <div
                  className="absolute bg-white rounded-full shadow-md origin-bottom pointer-events-none"
                  style={{
                    bottom: '50%',
                    width: 'calc(6.5 * var(--s))',
                    height: 'calc(74 * var(--s))',
                    transform: `rotate(${hourDeg}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                    boxShadow: '0 calc(2 * var(--s)) calc(8 * var(--s)) rgba(0,0,0,0.5)',
                  }}
                />

                {/* Minute Hand (White with rounded tip) */}
                <div
                  className="absolute bg-white rounded-full shadow-md origin-bottom pointer-events-none"
                  style={{
                    bottom: '50%',
                    width: 'calc(4.5 * var(--s))',
                    height: 'calc(106 * var(--s))',
                    transform: `rotate(${minuteDeg}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                    boxShadow: '0 calc(2 * var(--s)) calc(8 * var(--s)) rgba(0,0,0,0.5)',
                  }}
                />

                {/* Amber Second Hand (#FFB020) with short tail and center cap */}
                <div
                  className="absolute origin-bottom pointer-events-none"
                  style={{
                    bottom: '50%',
                    width: 'calc(2.5 * var(--s))',
                    height: 'calc(124 * var(--s))',
                    backgroundColor: '#FFB020',
                    transform: `rotate(${secondDeg}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 0.08s linear',
                    boxShadow: '0 calc(1 * var(--s)) calc(6 * var(--s)) rgba(255,176,32,0.4)',
                  }}
                >
                  {/* Tail extending past center */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      bottom: 'calc(-28 * var(--s))',
                      left: '0',
                      width: 'calc(2.5 * var(--s))',
                      height: 'calc(28 * var(--s))',
                      backgroundColor: '#FFB020',
                    }}
                  />
                </div>

                {/* Center Cap */}
                <div
                  className="absolute rounded-full z-20 pointer-events-none"
                  style={{
                    width: 'calc(10 * var(--s))',
                    height: 'calc(10 * var(--s))',
                    backgroundColor: '#FFB020',
                    boxShadow: '0 calc(1 * var(--s)) calc(4 * var(--s)) rgba(0,0,0,0.6)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
