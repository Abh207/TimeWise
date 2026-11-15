import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TIME_ANALYSIS_SETS } from './widgetsData';

export const TimeAnalysisCard: React.FC = () => {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday default as in reference

  const currentDataset = TIME_ANALYSIS_SETS[activeSetIndex];
  const selectedDay = currentDataset.days[selectedDayIndex];

  // SVG dimensions
  const svgWidth = 280;
  const svgHeight = 110;
  const dayXCoords = [25, 80, 140, 195, 255];

  // Map hours to SVG Y coords (higher hours = smaller Y)
  // Max hours around 10h -> Y=15, Min hours around 0 -> Y=95
  const getY = (hours: number) => {
    const minH = 0;
    const maxH = 10;
    const clamped = Math.max(minH, Math.min(maxH, hours));
    return svgHeight - 20 - (clamped / maxH) * (svgHeight - 35);
  };

  // Generate cubic bezier smooth curve through points
  const generateSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const activePoints = currentDataset.days.map((d, i) => ({
    x: dayXCoords[i],
    y: getY(d.activeHours),
  }));

  const pausePoints = currentDataset.days.map((d, i) => ({
    x: dayXCoords[i],
    y: getY(d.pauseHours),
  }));

  const activePathD = generateSmoothPath(activePoints);
  const pausePathD = generateSmoothPath(pausePoints);

  const activeX = dayXCoords[selectedDayIndex];
  const activeY = getY(selectedDay.activeHours);
  const pauseY = getY(selectedDay.pauseHours);

  return (
    <div className="widget-card p-[clamp(16px,1.4vw,24px)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-[#141414] dark:text-white tracking-tight">
            Working time analysis
          </h3>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3EFE9] dark:bg-[#242424] text-[11px] font-bold text-[#141414] dark:text-white border border-black/5 dark:border-white/10 shadow-2xs">
            <span>{currentDataset.periodLabel}</span>
            <ChevronDown className="w-3 h-3 text-[#737373]" />
          </div>
        </div>

        {/* Big Number */}
        <div className="text-3xl font-[800] tracking-tight text-[#141414] dark:text-white mt-1.5">
          {currentDataset.totalTime}
        </div>
      </div>

      {/* Chart Panel with Dual Curves and Interactive Tooltips */}
      <div className="mt-3 rounded-2xl bg-[#F8F5EE] dark:bg-[#1E1E1E] p-3 border border-black/5 dark:border-white/5 relative overflow-hidden">
        
        {/* Tooltip Pills sitting above active day */}
        <div className="flex items-center justify-between pb-1 relative z-10 min-h-[26px]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141414] text-white text-[10px] font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span>{selectedDay.activeLabel}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white dark:bg-[#2C2C2C] text-[#EA580C] text-[10px] font-bold border border-orange-200 dark:border-orange-900/40 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
            <span>{selectedDay.pauseLabel}</span>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full h-[clamp(95px,7.5vw,120px)] my-1">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Vertical Guide Line for hovered day */}
            <line
              x1={activeX}
              y1={10}
              x2={activeX}
              y2={svgHeight - 10}
              stroke="rgba(20,20,20,0.15)"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Purple Active Time Curve */}
            <path
              d={activePathD}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="chart-path-animated"
            />

            {/* Orange Pause Time Curve */}
            <path
              d={pausePathD}
              fill="none"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
              className="chart-path-animated"
            />

            {/* Glowing Active Day Dots */}
            <circle
              cx={activeX}
              cy={activeY}
              r="4.5"
              fill="#8B5CF6"
              stroke="#FFFFFF"
              strokeWidth="2"
              className="shadow-sm"
            />
            <circle
              cx={activeX}
              cy={pauseY}
              r="4"
              fill="#FB923C"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="shadow-sm"
            />
          </svg>
        </div>

        {/* Day Pills (Mon - Fri) at bottom */}
        <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5">
          {currentDataset.days.map((item, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <button
                key={item.day}
                type="button"
                onClick={() => setSelectedDayIndex(idx)}
                onMouseEnter={() => setSelectedDayIndex(idx)}
                aria-label={`View ${item.day} analysis`}
                className={`text-[10px] font-bold py-1 px-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C7B0] ${
                  isSelected
                    ? 'bg-white dark:bg-[#141414] text-[#141414] dark:text-white shadow-2xs scale-105'
                    : 'text-[#737373] dark:text-[#A3A3A3] hover:text-[#141414] dark:hover:text-white'
                }`}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots at Bottom */}
      <div className="flex items-center justify-center gap-1.5 pt-3">
        {TIME_ANALYSIS_SETS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSetIndex(i)}
            aria-label={`Switch to period ${i + 1}`}
            className={`transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C7B0] ${
              i === activeSetIndex
                ? 'w-4 h-1.5 bg-[#141414] dark:bg-white'
                : 'w-1.5 h-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

