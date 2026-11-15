import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Hourglass } from 'lucide-react';
import { DAILY_HOURS_PERIODS } from './widgetsData';

export const DailyHoursCard: React.FC = () => {
  const [periodIndex, setPeriodIndex] = useState(0);

  const handlePrev = () => {
    setPeriodIndex((prev) => (prev - 1 + DAILY_HOURS_PERIODS.length) % DAILY_HOURS_PERIODS.length);
  };

  const handleNext = () => {
    setPeriodIndex((prev) => (prev + 1) % DAILY_HOURS_PERIODS.length);
  };

  const current = DAILY_HOURS_PERIODS[periodIndex];

  return (
    <div className="widget-card p-4 sm:p-5 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#141414] dark:text-white tracking-tight">
            Daily working hours
          </h3>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous daily period"
              className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#C8F03C] dark:hover:text-[#141414] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8F03C]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next daily period"
              className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#C8F03C] dark:hover:text-[#141414] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8F03C]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Big Number with Hourglass icon */}
        <div className="flex items-baseline gap-2 mt-2">
          <Hourglass className="w-5 h-5 text-[#2E9E5E] shrink-0 self-center animate-pulse" />
          <span className="text-2xl sm:text-[26px] font-[800] tracking-tight text-[#141414] dark:text-white">
            {current.total}
          </span>
          <span className="text-[11px] font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wider">
            {current.period}
          </span>
        </div>
      </div>

      {/* Dashed Divider */}
      <div className="border-b border-dashed border-black/10 dark:border-white/10 my-3.5" />

      {/* Two Progress Bars */}
      <div className="space-y-3">
        {/* 1. Active Time (Green Diagonal-Striped Bar) */}
        <div>
          <div className="border-l-2 border-[#2E9E5E] pl-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#141414] dark:text-white">
              Active time <span className="text-[#2E9E5E] font-bold">{current.active}</span>
            </span>
            <span className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3]">
              {current.activePercent}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#EAEAEA] dark:bg-[#262626] overflow-hidden mt-1.5 p-0.5">
            <div
              className="h-full rounded-full striped-bar-green transition-all duration-700 ease-out"
              style={{ width: `${current.activePercent}%` }}
            />
          </div>
        </div>

        {/* 2. Pause Time (Solid Orange Bar) */}
        <div>
          <div className="border-l-2 border-[#FF8A3D] pl-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#141414] dark:text-white">
              Pause time <span className="text-[#FF8A3D] font-bold">{current.pause}</span>
            </span>
            <span className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3]">
              {current.pausePercent}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#EAEAEA] dark:bg-[#262626] overflow-hidden mt-1.5 p-0.5">
            <div
              className="h-full rounded-full bg-[#FF8A3D] transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${current.pausePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

