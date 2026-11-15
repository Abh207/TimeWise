import React, { useState, useEffect, useRef } from 'react';

interface TiltedCardProps {
  direction: 'left' | 'right';
  parallaxFactor?: number;
  floatVariant?: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  direction,
  parallaxFactor = 1,
  floatVariant = 1,
  className = '',
  children,
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  // Global mousemove for subtle parallax (max ±12px)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const nx = (e.clientX - centerX) / centerX;
      const ny = (e.clientY - centerY) / centerY;
      // Clamped to ±12px
      setMouseOffset({
        x: Math.max(-12, Math.min(12, nx * parallaxFactor * 10)),
        y: Math.max(-12, Math.min(12, ny * parallaxFactor * 10)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallaxFactor, reducedMotion]);

  // Pointer event handlers for spring drag (threshold 5px, max ±60px)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    // Only drag with primary mouse button / single touch
    if (e.button !== 0) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPosRef.current || reducedMotion) return;

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
      // Limit to ±60px
      const clampedX = Math.max(-60, Math.min(60, dx));
      const clampedY = Math.max(-60, Math.min(60, dy));
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
    // Spring back to 0,0
    setDragOffset({ x: 0, y: 0 });
  };

  // Base angles: left is -10deg, right is +10deg. Straightens to -6deg / +6deg on hover.
  const baseTilt = direction === 'left' ? -10 : 10;
  const hoverTilt = direction === 'left' ? -6 : 6;
  const currentTilt = isHovered && !isDragging ? hoverTilt : baseTilt;

  // Perspective rotateY for 3D depth
  const rotateY = direction === 'left' ? 3 : -3;

  // Combined translations
  const totalX = dragOffset.x + (isDragging ? 0 : mouseOffset.x);
  const totalY = dragOffset.y + (isDragging ? 0 : mouseOffset.y) + (isHovered && !isDragging ? -4 : 0);

  // Float animation class
  const floatClass = reducedMotion || isDragging
    ? ''
    : floatVariant === 1
    ? 'animate-card-float-1'
    : floatVariant === 2
    ? 'animate-card-float-2'
    : 'animate-card-float-3';

  return (
    <div
      className={`${floatClass} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`touch-none cursor-grab active:cursor-grabbing select-none ${
          isHovered ? 'shadow-[0_16px_36px_rgba(60,40,10,0.14)]' : 'shadow-[0_10px_28px_rgba(60,40,10,0.08)]'
        }`}
        style={{
          transform: reducedMotion
            ? `rotate(${baseTilt}deg)`
            : `translate3d(${totalX}px, ${totalY}px, 0) perspective(900px) rotateY(${rotateY}deg) rotateZ(${currentTilt}deg)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'subpixel-antialiased',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};

