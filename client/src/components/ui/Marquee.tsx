import React, { useRef, useState, useEffect } from 'react';

export interface MarqueeProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  children: React.ReactNode;
  className?: string;
  gap?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  direction = 'left',
  speed = 35,
  pauseOnHover = true,
  children,
  className = '',
  gap = '1.5rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Performance optimization: pause animation when element is scrolled out of viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isVertical = direction === 'up' || direction === 'down';

  // Determine animation class
  const animationClass = {
    left: 'animate-marquee-left',
    right: 'animate-marquee-right',
    up: 'animate-marquee-up',
    down: 'animate-marquee-down',
  }[direction];

  return (
    <div
      ref={containerRef}
      className={`marquee-container overflow-hidden relative ${
        isVertical ? 'mask-marquee-y flex-col h-full' : 'mask-marquee-x flex-row w-full'
      } flex ${className}`}
      style={
        {
          '--marquee-duration': `${speed}s`,
        } as React.CSSProperties
      }
    >
      {/* Primary track */}
      <div
        className={`marquee-track flex shrink-0 ${
          isVertical ? 'flex-col' : 'flex-row'
        } ${animationClass}`}
        style={{
          gap,
          animationPlayState: isInView ? 'running' : 'paused',
        }}
      >
        {children}
      </div>

      {/* Duplicate track for seamless infinite looping */}
      <div
        aria-hidden="true"
        className={`marquee-track flex shrink-0 ${
          isVertical ? 'flex-col' : 'flex-row'
        } ${animationClass}`}
        style={{
          gap,
          animationPlayState: isInView ? 'running' : 'paused',
        }}
      >
        {children}
      </div>
    </div>
  );
};

