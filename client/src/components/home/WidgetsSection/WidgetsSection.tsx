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
      className="w-full widgets-dotted-bg text-[#141414] dark:text-white transition-colors relative z-20 py-[clamp(48px,8vw,100px)] border-t border-[rgba(20,20,20,0.06)] dark:border-white/10"
    >
      <div className="max-w-[1180px] mx-auto px-[clamp(16px,4vw,48px)]">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Small Lime Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8F03C] text-[#141414] text-xs font-[800] uppercase tracking-wider shadow-2xs">
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
        {/* 3-COLUMN BENTO GRID (Exact match to reference)               */}
        {/* ============================================================ */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* ========================================================== */}
          {/* COLUMN 1 (Left): [A] Schedule + [B] Time Analysis          */}
          {/* ========================================================== */}
          <div className="flex flex-col gap-4 widget-float-1">
            {/* [A] Weekly Schedule (Tall, light grey outer card) */}
            <ScheduleCard />

            {/* [B] Working Time Analysis (Tall with dual smooth curves) */}
            <TimeAnalysisCard />
          </div>

          {/* ========================================================== */}
          {/* COLUMN 2 (Middle): [C] Daily Hours + [D] Note + [E] Prog   */}
          {/* ========================================================== */}
          <div className="flex flex-col gap-4 widget-float-2">
            {/* [C] Daily Working Hours (Short) */}
            <DailyHoursCard />

            {/* [D] Note Card (Tall, warm yellow with audio player) */}
            <NoteCard />

            {/* [E] Monthly Progress (Short with animated blue stripes) */}
            <MonthlyProgressCard />
          </div>

          {/* ========================================================== */}
          {/* COLUMN 3 (Right): [F] Task Count + [G] Tasks List          */}
          {/* ========================================================== */}
          <div className="flex flex-col gap-4 widget-float-3 md:col-span-2 lg:col-span-1">
            {/* [F] Number of Tasks (Tall, near-black #0B0B0B card) */}
            <TaskCountCard />

            {/* [G] Tasks List (Tall with tree hierarchy & checkboxes) */}
            <TasksListCard />
          </div>
        </div>

      </div>
    </section>
  );
};

