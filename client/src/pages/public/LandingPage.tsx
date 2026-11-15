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
import { TiltedCard } from '../../components/hero/TiltedCard';
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
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#141414] font-sans selection:bg-[#C8F03C] selection:text-[#141414]">
      
      {/* ============================================================== */}
      {/* TASK 1: HERO FITS ONE SCREEN EXACTLY (100dvh, NO SCROLLBAR)    */}
      {/* ============================================================== */}
      <section
        ref={heroContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[100dvh] min-h-0 overflow-hidden lg:grid lg:grid-rows-[auto_auto_1fr_auto] flex flex-col justify-between"
        style={{
          background: 'radial-gradient(ellipse 95% 85% at 50% 18%, #FFFFFF 0%, #F6F0E8 55%, #F0E8DE 100%)',
          rowGap: 'clamp(6px, 1.2vh, 16px)',
        }}
      >
        {/* Ambient Warm White Glow Blobs */}
        <div 
          aria-hidden="true" 
          className="absolute top-8 left-1/4 w-[460px] h-[460px] rounded-full bg-white/70 blur-[110px] pointer-events-none -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="absolute bottom-12 right-1/4 w-[420px] h-[420px] rounded-full bg-[#FAF5EE]/90 blur-[100px] pointer-events-none -z-10" 
        />

        {/* ROW 1: Nav Bar (~64px) */}
        <HeroNav />

        {/* ROW 2: Headline "FOCUS" / "YOUR TIME" (clamp(44px, 7vw, 110px)) */}
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 shrink-0">
          <HeroHeadline />
        </div>

        {/* ============================================================== */}
        {/* ROW 3: DESKTOP 3-COLUMN STAGE (1fr, Middle Interactive Row)   */}
        {/* ============================================================== */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-4 relative z-20 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 min-h-0 my-auto">
          
          {/* LEFT COLUMN: How It Works + Task Table (Tilted -10deg, Draggable, Floating) */}
          <div className="col-span-4 flex flex-col justify-center space-y-4 pt-1">
            {/* How It Works Card (Draggable, Tilted -10deg) */}
            <TiltedCard direction="left" floatVariant={1} parallaxFactor={0.85}>
              <HowItWorksCard onOpenVideo={() => setIsVideoModalOpen(true)} />
            </TiltedCard>

            {/* Task Table Card under How It Works (Draggable, Tilted -10deg) */}
            <TiltedCard direction="left" floatVariant={2} parallaxFactor={1.1}>
              <TaskTableCard 
                rows={currentSlide.tableRows} 
                slideIndex={currentSlideIndex} 
              />
            </TiltedCard>
          </div>

          {/* CENTER COLUMN: SMARTWATCH WITH VISIBLE GROOVED STRAP */}
          <div className="col-span-4 flex items-center justify-center relative -mt-4">
            <WatchVisual currentLabel={currentSlide.watchLabel} />
          </div>

          {/* RIGHT COLUMN: Today's Tasks Panel (Tilted +10deg, Draggable, Floating) */}
          <div className="col-span-4 flex justify-end items-center pr-2">
            <TiltedCard direction="right" floatVariant={3} parallaxFactor={0.95}>
              <TodayTasksPanel 
                tasks={currentSlide.todayTasks} 
                slideIndex={currentSlideIndex} 
              />
            </TiltedCard>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ROW 4: BOTTOM ROW (Controls at Left, Caption at Right)         */}
        {/* ============================================================== */}
        <div className="hidden lg:flex items-end justify-between w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 pb-3 sm:pb-4 shrink-0">
          {/* Left: Slider Controls */}
          <div>
            <SliderControls 
              heading={currentSlide.heading}
              description={currentSlide.description}
              currentIndex={currentSlideIndex}
              totalSlides={totalSlides}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectSlide={handleSelectSlide}
            />
          </div>

          {/* Right: Small uppercase caption (Hidden on short screens <= 760px) */}
          <div className="max-w-[320px] text-right pr-1 pb-1 short-hide">
            <p className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#6F6A64] leading-relaxed">
              Smart widgets that adapt to your workflow on web and mobile
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABLET STAGE (768px - 1023px)                                 */}
        {/* ============================================================== */}
        <div className="hidden sm:flex lg:hidden flex-col items-center gap-4 py-3 relative z-20 overflow-y-auto px-6">
          <div className="my-1 shrink-0">
            <WatchVisual currentLabel={currentSlide.watchLabel} />
          </div>

          {/* 2-Column Glass Cards Row under watch */}
          <div className="w-full grid grid-cols-2 gap-4 items-start max-w-xl">
            <div className="flex flex-col gap-3">
              <TiltedCard direction="left" floatVariant={1}>
                <HowItWorksCard onOpenVideo={() => setIsVideoModalOpen(true)} />
              </TiltedCard>
              <TiltedCard direction="left" floatVariant={2}>
                <TaskTableCard 
                  rows={currentSlide.tableRows} 
                  slideIndex={currentSlideIndex} 
                />
              </TiltedCard>
            </div>
            <div className="flex justify-end">
              <TiltedCard direction="right" floatVariant={3}>
                <TodayTasksPanel 
                  tasks={currentSlide.todayTasks} 
                  slideIndex={currentSlideIndex} 
                />
              </TiltedCard>
            </div>
          </div>

          {/* Slider Controls & Caption */}
          <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-black/5">
            <SliderControls 
              heading={currentSlide.heading}
              description={currentSlide.description}
              currentIndex={currentSlideIndex}
              totalSlides={totalSlides}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectSlide={handleSelectSlide}
            />
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6F6A64] max-w-[200px] text-center sm:text-right short-hide">
              Smart widgets that adapt to your workflow on web and mobile
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE STAGE (< 768px)                                        */}
        {/* ============================================================== */}
        <div className="sm:hidden flex flex-col items-center gap-4 py-2 relative z-20 px-4 overflow-y-auto">
          {/* Watch centered with scale */}
          <div className="transform scale-[0.74] origin-center -my-5 shrink-0">
            <WatchVisual currentLabel={currentSlide.watchLabel} />
          </div>

          {/* How It Works Card */}
          <div className="w-full max-w-xs flex justify-center">
            <TiltedCard direction="left" floatVariant={1}>
              <HowItWorksCard onOpenVideo={() => setIsVideoModalOpen(true)} />
            </TiltedCard>
          </div>

          {/* Today's Tasks Panel */}
          <div className="w-full max-w-xs flex justify-center">
            <TiltedCard direction="right" floatVariant={3}>
              <TodayTasksPanel 
                tasks={currentSlide.todayTasks} 
                slideIndex={currentSlideIndex} 
              />
            </TiltedCard>
          </div>

          {/* Slider Controls */}
          <div className="w-full max-w-xs pt-1">
            <SliderControls 
              heading={currentSlide.heading}
              description={currentSlide.description}
              currentIndex={currentSlideIndex}
              totalSlides={totalSlides}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectSlide={handleSelectSlide}
            />
          </div>

          {/* Bottom Caption */}
          <p className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-[#6F6A64] text-center max-w-xs pt-1 short-hide">
            Smart widgets that adapt to your workflow on web and mobile
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
      {/* TASK 4: SLEEK BLACK FOOTER (Home page bottom)                 */}
      {/* ============================================================== */}
      <HeroFooter />
    </div>
  );
};
