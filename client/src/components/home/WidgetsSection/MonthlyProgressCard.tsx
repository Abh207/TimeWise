import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHLY_GOALS } from './widgetsData';

export const MonthlyProgressCard: React.FC = () => {
  const [goalIndex, setGoalIndex] = useState(0);

  const handlePrev = () => {
    setGoalIndex((prev) => (prev - 1 + MONTHLY_GOALS.length) % MONTHLY_GOALS.length);
  };

  const handleNext = () => {
    setGoalIndex((prev) => (prev + 1) % MONTHLY_GOALS.length);
  };

  const current = MONTHLY_GOALS[goalIndex];

  return (
    <div className="widget-card p-[clamp(16px,1.4vw,24px)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="min-w-0 pr-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#141414] dark:text-white tracking-tight truncate">
            Monthly progress towards your goals
          </h3>
          <span className="text-[10px] text-[#737373] dark:text-[#A3A3A3] font-medium block mt-0.5">
            {current.month}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous month goal"
            className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#F5C7B0] dark:hover:text-[#2A1810] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C7B0]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next month goal"
            className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#F5C7B0] dark:hover:text-[#2A1810] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C7B0]"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Percentage Row */}
      <div className="flex items-center gap-3 pt-1">
        {/* Animated Diagonal Striped Blue Bar */}
        <div className="flex-1 h-5 sm:h-6 rounded-full bg-[#EAEAEA] dark:bg-[#262626] overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full striped-bar-blue-animated transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${current.percentage}%` }}
          />
        </div>

        {/* Big Percentage Number */}
        <span className="text-xl sm:text-2xl font-[800] text-[#141414] dark:text-white shrink-0 font-mono">
          {current.percentage}%
        </span>
      </div>
    </div>
  );
};

