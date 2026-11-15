import React, { useState, useEffect, useRef } from 'react';

interface HeroFlatCardProps {
  parallaxFactor?: number;
  floatVariant?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const HeroFlatCard: React.FC<HeroFlatCardProps> = ({
  parallaxFactor = 1,
  floatVariant = 1,
  className = '',
  style = {},
  children,
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  // Check prefers-reduced-motion & fine pointer
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(pointerQuery.matches);
    const handlePointer = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    pointerQuery.addEventListener('change', handlePointer);

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      pointerQuery.removeEventListener('change', handlePointer);
    };
  }, []);

  // Global mousemove for tiny parallax only on mouse devices
  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const nx = (e.clientX - centerX) / centerX;
      const ny = (e.clientY - centerY) / centerY;
      // Clamped to ±6px
      setMouseOffset({
        x: Math.max(-6, Math.min(6, nx * parallaxFactor * 5)),
        y: Math.max(-6, Math.min(6, ny * parallaxFactor * 5)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallaxFactor, reducedMotion, isFinePointer]);

  // Pointer event handlers for drag-and-spring-back (only on fine pointer devices)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reducedMotion || !isFinePointer) return;
    if (e.button !== 0) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPosRef.current || reducedMotion || !isFinePointer) return;

    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;

    if (!hasMovedRef.current) {
      if (Math.hypot(dx, dy) > 5) {
        hasMovedRef.current = true;
        setIsDragging(true);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      }
    }

    if (hasMovedRef.current) {
      const clampedX = Math.max(-40, Math.min(40, dx));
      const clampedY = Math.max(-40, Math.min(40, dy));
      setDragOffset({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (hasMovedRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
    startPosRef.current = null;
    hasMovedRef.current = false;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const totalX = isFinePointer ? dragOffset.x + (isDragging ? 0 : mouseOffset.x) : 0;
  const totalY = isFinePointer ? dragOffset.y + (isDragging ? 0 : mouseOffset.y) + (isHovered && !isDragging ? -2 : 0) : 0;

  // Subtle vertical float animation without rotation
  const floatClass = reducedMotion || isDragging
    ? ''
    : floatVariant === 1
    ? 'animate-hero-float-1'
    : floatVariant === 2
    ? 'animate-hero-float-2'
    : 'animate-hero-float-3';

  return (
    <div
      className={`${floatClass} ${className}`}
      style={style}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="touch-none select-none transition-shadow duration-300"
        style={{
          transform: reducedMotion || !isFinePointer
            ? 'none'
            : `translate3d(${totalX}px, ${totalY}px, 0)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};
