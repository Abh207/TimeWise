import React, { useEffect, useRef, useState } from 'react';
import { ScheduleCard } from './ScheduleCard';
import { TimeAnalysisCard } from './TimeAnalysisCard';
import { DailyHoursCard } from './DailyHoursCard';
import { NoteCard } from './NoteCard';
import { MonthlyProgressCard } from './MonthlyProgressCard';
import { TaskCountCard } from './TaskCountCard';
import { TasksListCard } from './TasksListCard';
import './WidgetsSection.css';

export const WidgetsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="widgets"
      ref={sectionRef}
      className="w-full widgets-dotted-bg text-[#141414] dark:text-white transition-colors relative z-20 py-[clamp(48px,6vw,96px)] border-t border-[rgba(20,20,20,0.06)] dark:border-white/10 overflow-hidden"
    >
      <div className="w-full px-[clamp(12px,2vw,32px)]">
        
        {/* ============================================================ */}
        {/* SECTION HEADER (Centered above grid)                         */}
        {/* ============================================================ */}
        <div
          className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Small Peach Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C7B0] text-[#2A1810] text-xs font-[800] uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-pulse" />
            <span>Live Dashboard</span>
          </div>

          {/* Big Heading */}
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-[800] tracking-[-0.03em] leading-[1.08] text-[#141414] dark:text-white">
            Everything you need, in one glance.
          </h2>

          {/* One Grey Subtitle Line */}
          <p className="text-xs sm:text-sm text-[#6F6A64] dark:text-[#A3A3A3] font-normal leading-relaxed">
            Real-time calendar synchronization, flow analytics, focus notes, and workload metrics unified.
          </p>
        </div>

        {/* ============================================================ */}
        {/* FULL-WIDTH 3-COLUMN BENTO GRID                               */}
        {/* Tablet (640-1023px): 2 cols; Mobile (<640px): 1 col          */}
        {/* ============================================================ */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(12px,1.2vw,20px)] items-stretch transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* ========================================================== */}
          {/* COLUMN 1 (Left): [A] Schedule + [B] Time Analysis          */}
          {/* ========================================================== */}
          <div className="flex flex-col justify-between gap-[clamp(12px,1.2vw,20px)] h-full widget-float-1">
            <ScheduleCard />
            <TimeAnalysisCard />
          </div>

          {/* ========================================================== */}
          {/* COLUMN 2 (Middle): [C] Daily Hours + [D] Note + [E] Prog   */}
          {/* ========================================================== */}
          <div className="flex flex-col justify-between gap-[clamp(12px,1.2vw,20px)] h-full widget-float-2">
            <DailyHoursCard />
            <NoteCard />
            <MonthlyProgressCard />
          </div>

          {/* ========================================================== */}
          {/* COLUMN 3 (Right): [F] Task Count + [G] Tasks List          */}
          {/* ========================================================== */}
          <div className="flex flex-col justify-between gap-[clamp(12px,1.2vw,20px)] h-full widget-float-3 sm:col-span-2 lg:col-span-1">
            <TaskCountCard />
            <TasksListCard />
          </div>
        </div>

      </div>
    </section>
  );
};
