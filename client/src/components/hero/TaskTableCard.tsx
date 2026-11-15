import React from 'react';
import type { TaskRow } from './heroData';

interface TaskTableCardProps {
  rows: [TaskRow, TaskRow];
  slideIndex: number;
}

export const TaskTableCard: React.FC<TaskTableCardProps> = ({ rows, slideIndex }) => {
  return (
    <div className="rounded-[18px] p-2.5 sm:p-3 bg-white/65 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(60,40,10,0.06)] max-w-[245px] sm:max-w-[270px] w-full transition-all duration-200">
      <div key={slideIndex} className="space-y-1.5 animate-fade-in">
        {rows.map((row, idx) => (
          <div 
            key={idx}
            className={`flex items-center justify-between gap-1.5 p-1.5 sm:p-2 rounded-lg bg-white/50 border border-white/70 transition-all duration-300 ${
              idx === 0 ? 'delay-75' : 'delay-150'
            }`}
          >
            {/* Title & Priority Chip */}
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#141414] leading-tight">
                {row.title}
              </span>
              <span className="text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#C8F03C] text-[#141414] shrink-0 shadow-2xs">
                {row.priority}
              </span>
            </div>

            {/* Status & Duration */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] text-[#6F6A64] font-medium hidden sm:inline">
                {row.status}
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#141414] bg-white px-1.5 py-0.5 rounded shadow-2xs">
                {row.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
