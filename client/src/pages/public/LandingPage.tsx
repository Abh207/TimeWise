import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroNav } from '../../components/hero/HeroNav';
import { HeroHeadline } from '../../components/hero/HeroHeadline';
import { WatchVisual } from '../../components/hero/WatchVisual';
import { HowItWorksCard } from '../../components/hero/HowItWorksCard';
import { TaskTableCard } from '../../components/hero/TaskTableCard';
import { TodayTasksPanel } from '../../components/hero/TodayTasksPanel';
import { SliderControls } from '../../components/hero/SliderControls';
import { VideoModal } from '../../components/hero/VideoModal';
import { HeroFooter } from '../../components/hero/HeroFooter';
import { HeroFlatCard } from '../../components/hero/HeroFlatCard';
import { HERO_SLIDES } from '../../components/hero/heroData';
import { WidgetsSection } from '../../components/home/WidgetsSection/WidgetsSection';

export const LandingPage: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroContainerRef = useRef<HTMLElement>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Auto-advance every 5 seconds (paused on hover/focus/modal and if reduced motion)
  useEffect(() => {
    if (isPaused || reducedMotion || isVideoModalOpen) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, isVideoModalOpen, handleNext]);

  // Keyboard navigation with ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVideoModalOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isVideoModalOpen]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8F4EF] text-[#1C1C21] font-sans selection:bg-[#FFC043] selection:text-[#1C1C21] overflow-x-clip">
      
      {/* ============================================================== */}
      {/* SCALED 1920 x 870 DESIGN CANVAS HERO STAGE                     */}
      {/* ============================================================== */}
      <section
        ref={heroContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="hero-responsive-stage relative w-full max-w-none box-border overflow-hidden select-none"
        style={{
          '--taskcard-chip': '#F5C7B0',
          '--taskcard-chip-text': '#2A1810',
          '--bg-1': '#F2EDE6',
          '--bg-2': '#F8F4EF',
          '--ink': '#1C1C21',
          '--ink-soft': '#7A756E',
          '--accent-orange': '#F7852C',
          '--accent-amber': '#FFC043',
          '--gold': '#E8A93A',
          '--glass': 'rgba(255, 255, 255, 0.55)',
          '--card': '#FFFFFF',
          '--watch-rz': '14deg',
          '--watch-ry': '-18deg',
          '--watch-rx': '6deg',
          background: 'linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%)',
        } as React.CSSProperties}
      >
        {/* Soft Background Blurred White Light Shapes */}
        {/* 1. Big soft white radial glow directly behind the watch */}
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: 'calc(1090 * var(--s))',
            top: 'calc(440 * var(--s))',
            transform: 'translate(-50%, -50%)',
            width: 'calc(620 * var(--s))',
            height: 'calc(620 * var(--s))',
            background: 'radial-gradient(circle, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.4) 45%, transparent 70%)',
            filter: 'blur(calc(40 * var(--s)))',
            zIndex: 5,
          }}
        />

        {/* 2. Top-left soft light swirl */}
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: 'calc(192 * var(--s))',
            top: 'calc(35 * var(--s))',
            width: 'calc(520 * var(--s))',
            height: 'calc(360 * var(--s))',
            background: 'rgba(255, 255, 255, 0.42)',
            filter: 'blur(calc(65 * var(--s)))',
            transform: 'rotate(-15deg)',
            zIndex: 1,
          }}
        />

        {/* 3. Faint diagonal light sweep from bottom-left */}
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: 'calc(-150 * var(--s))',
            bottom: 'calc(-100 * var(--s))',
            width: 'calc(720 * var(--s))',
            height: 'calc(420 * var(--s))',
            background: 'linear-gradient(45deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            filter: 'blur(calc(55 * var(--s)))',
            transform: 'rotate(25deg)',
            zIndex: 1,
          }}
        />

        {/* 4. Top-right soft swirl */}
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            right: 'calc(115 * var(--s))',
            top: 'calc(52 * var(--s))',
            width: 'calc(480 * var(--s))',
            height: 'calc(340 * var(--s))',
            background: 'rgba(255, 255, 255, 0.35)',
            filter: 'blur(calc(60 * var(--s)))',
            zIndex: 1,
          }}
        />

        {/* 1. Nav Bar: z-index 50 */}
        <HeroNav />

        {/* 2. Headline: "FOCUS ON" / "YOUR" / "TIME", z-index 20 */}
        <HeroHeadline />

        {/* 3. Smartwatch Group: center at x = 1090, y = 440, z-index 10 */}
        <WatchVisual currentLabel={currentSlide.watchLabel} />

        {/* 4. "How It Works" Card: left 64, top 249, z-index 30 */}
        <HeroFlatCard 
          floatVariant={1} 
          parallaxFactor={0.8}
          style={{
            position: 'absolute',
            left: 'calc(64 * var(--s))',
            top: 'calc(249 * var(--s))',
            zIndex: 30,
          }}
        >
          <HowItWorksCard onOpenVideo={() => setIsVideoModalOpen(true)} />
        </HeroFlatCard>

        {/* 5. Task Table Card: left 64, top 444, z-index 30 */}
        <HeroFlatCard 
          floatVariant={2} 
          parallaxFactor={1.1}
          style={{
            position: 'absolute',
            left: 'calc(64 * var(--s))',
            top: 'calc(444 * var(--s))',
            zIndex: 30,
          }}
        >
          <TaskTableCard 
            rows={currentSlide.tableRows} 
            slideIndex={currentSlideIndex} 
          />
        </HeroFlatCard>

        {/* 6. Slide Text & Slider Controls: heading y=651, paragraph y=693, controls y=797, z-index 30 */}
        <SliderControls 
          heading={currentSlide.heading}
          description={currentSlide.description}
          currentIndex={currentSlideIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSlide={handleSelectSlide}
        />

        {/* 7. "Today's Tasks" Panel: left 1280, top 447, z-index 40, in front of watch */}
        <HeroFlatCard
          floatVariant={3}
          parallaxFactor={0.95}
          style={{
            position: 'absolute',
            left: 'calc(1280 * var(--s))',
            top: 'calc(447 * var(--s))',
            zIndex: 40,
          }}
        >
          <TodayTasksPanel 
            tasks={currentSlide.todayTasks} 
            slideIndex={currentSlideIndex} 
          />
        </HeroFlatCard>

        {/* 8. Bottom-Right Caption: left 1483, top 797, z-index 30 */}
        <div
          className="absolute z-30 select-none text-left pointer-events-none"
          style={{
            left: 'calc(1483 * var(--s))',
            top: 'calc(797 * var(--s))',
            transform: 'translateY(-50%)',
            width: 'calc(330 * var(--s))',
          }}
        >
          <p
            className="uppercase font-semibold"
            style={{
              fontSize: 'max(var(--min-font, 0px), calc(20 * var(--s)))',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              color: '#7A756E',
            }}
          >
            SMART WIDGETS THAT ADAPT TO YOUR WORKFLOW ON WEB AND MOBILE
          </p>
        </div>

        {/* Video Player Modal */}
        <VideoModal 
          isOpen={isVideoModalOpen} 
          onClose={() => setIsVideoModalOpen(false)} 
          videoSrc="/videos/hero.mp4"
        />
      </section>

      {/* ============================================================== */}
      {/* BENTO GRID: LIVE DASHBOARD WIDGETS SECTION                    */}
      {/* ============================================================== */}
      <WidgetsSection />

      {/* ============================================================== */}
      {/* FOOTER (Home page bottom)                                     */}
      {/* ============================================================== */}
      <HeroFooter />
    </div>
  );
};
