import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { TASK_COUNT_SETS } from './widgetsData';

export const TaskCountCard: React.FC = () => {
  const [datasetIndex, setDatasetIndex] = useState(0);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const current = TASK_COUNT_SETS[datasetIndex];
  const maxSegments = 15;

  return (
    <div className="rounded-[24px] p-4 sm:p-5 bg-[#0B0B0B] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Number of tasks
          </h3>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1A1A1A] text-[11px] font-bold text-white border border-white/10">
            <span>Weekly</span>
            <ChevronDown className="w-3 h-3 text-[#A3A3A3]" />
          </div>
        </div>

        {/* Big White Number with Green Increment */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-3xl font-[800] tracking-tight text-white font-mono">
            {current.total}
          </span>
          <span className="text-xs font-bold text-[#C8F03C] inline-flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{current.change}</span>
          </span>
        </div>
      </div>

      {/* Darker Inner Panel (#151515) with Segmented Bar Chart */}
      <div className="mt-3 rounded-2xl bg-[#151515] p-3 border border-white/5 relative">
        {/* Tooltip on hover */}
        <div className="h-5 flex items-center justify-center">
          {hoveredBarIndex !== null && (
            <span className="text-[10px] font-mono font-bold text-[#C8F03C] bg-white/10 px-2 py-0.5 rounded-full animate-fade-in">
              {current.counts[hoveredBarIndex]} tasks completed
            </span>
          )}
        </div>

        {/* Chart Grid */}
        <div className="flex items-end gap-2.5 pt-1">
          {/* Y Axis Values (15, 10, 5, 0) */}
          <div className="flex flex-col justify-between h-28 text-[9px] font-mono text-white/40 select-none pb-1 pr-1 text-right">
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>

          {/* 5 Stacked Segmented Bars */}
          <div className="flex-1 flex items-end justify-between gap-2.5 h-28 pb-1 border-b border-white/10">
            {current.counts.map((count, barIdx) => {
              const isHovered = hoveredBarIndex === barIdx;
              return (
                <div
                  key={barIdx}
                  onMouseEnter={() => setHoveredBarIndex(barIdx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  className="flex-1 flex flex-col justify-end gap-[2px] cursor-pointer group h-full"
                >
                  {/* Stack of 15 segments */}
                  {Array.from({ length: maxSegments }).map((_, segIdx) => {
                    const segNumber = maxSegments - segIdx; // 15 at top, 1 at bottom
                    const isActive = segNumber <= count;
                    const isCyanTop = isActive && segNumber > count - 4;

                    return (
                      <div
                        key={segIdx}
                        className={`h-[4.5px] rounded-xs transition-all duration-200 ${
                          isActive
                            ? isCyanTop
                              ? isHovered
                                ? 'bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]'
                                : 'bg-[#06B6D4]'
                              : 'bg-[#404040]'
                            : 'bg-white/5'
                        }`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Round Avatar Circles below Bars */}
        <div className="flex items-center justify-between pl-6 pr-1 pt-2">
          {current.avatars.map((avatar, idx) => (
            <div
              key={idx}
              title={avatar.name}
              className="w-6 h-6 rounded-full border border-black/40 flex items-center justify-center text-[9px] font-bold shadow-xs select-none"
              style={{
                backgroundColor: avatar.bg,
                color: avatar.text || '#FFFFFF',
              }}
            >
              {avatar.initials}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots at Bottom (Middle is long pill) */}
      <div className="flex items-center justify-center gap-1.5 pt-3">
        {TASK_COUNT_SETS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setDatasetIndex(i)}
            aria-label={`View dataset ${i + 1}`}
            className={`transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8F03C] ${
              i === datasetIndex
                ? 'w-5 h-1.5 bg-[#C8F03C]'
                : i === 1 && datasetIndex !== 1
                ? 'w-3 h-1.5 bg-white/20 hover:bg-white/40'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

