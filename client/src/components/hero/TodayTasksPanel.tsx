import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import type { TodayTaskCard } from './heroData';

interface TodayTasksPanelProps {
  tasks: [TodayTaskCard, TodayTaskCard];
  slideIndex: number;
}

export const TodayTasksPanel: React.FC<TodayTasksPanelProps> = ({ tasks, slideIndex }) => {
  const currentDate = format(new Date(), 'dd.MM');

  return (
    <div className="rounded-[18px] p-2.5 sm:p-3 bg-white/65 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(60,40,10,0.06)] max-w-[265px] sm:max-w-[290px] w-full transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div>
          <h2 className="text-xs sm:text-[13px] font-bold text-[#141414] leading-tight">
            Today's Tasks
          </h2>
          <p className="text-[9px] sm:text-[10px] text-[#6F6A64] mt-0.5">
            To-do list for today
          </p>
        </div>

        <Link
          to="/app/timetable"
          className="w-6 h-6 rounded-md bg-white shadow-xs flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
          title="Open Academic Timetable"
          aria-label="Open Timetable"
        >
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Two White Mini Cards Side by Side */}
      <div key={slideIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 animate-fade-in">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="p-2 sm:p-2.5 rounded-lg bg-white shadow-2xs border border-black/5 flex flex-col justify-between space-y-1 hover:shadow-xs transition-shadow"
          >
            {/* Date & Time */}
            <span className="text-[8px] sm:text-[8.5px] font-mono font-semibold text-[#6F6A64]">
              {currentDate} &bull; {task.time}
            </span>

            {/* Task Title & Subtitle */}
            <div>
              <h3 className="text-[10px] sm:text-[11px] font-bold text-[#141414] leading-snug line-clamp-1">
                {task.title}
              </h3>
              <p className="text-[8.5px] sm:text-[9px] text-[#6F6A64] mt-0.5 line-clamp-1">
                {task.subtitle}
              </p>
            </div>

            {/* Status with Color Dot */}
            <div className="flex items-center gap-1 pt-1 border-t border-black/5">
              <span 
                className={`w-1.5 h-1.5 rounded-full ${
                  task.dotColor === 'lime' 
                    ? 'bg-[#C8F03C] shadow-[0_0_4px_#C8F03C]' 
                    : 'bg-[#4DA3FF] shadow-[0_0_4px_#4DA3FF]'
                }`} 
              />
              <span className="text-[9px] font-semibold text-[#141414]">
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
