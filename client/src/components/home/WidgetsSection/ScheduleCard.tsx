import React from 'react';
import { Clock, Video, BookOpen, Users, Sparkles, MoreHorizontal } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { SCHEDULE_ITEMS } from './widgetsData';

export const ScheduleCard: React.FC = () => {
  const today = new Date();

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Video className="w-3.5 h-3.5 text-[#3B82F6]" />;
      case 'lecture':
        return <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'study':
        return <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />;
    }
  };

  const getBadgeBg = (type: string) => {
    switch (type) {
      case 'call':
        return 'bg-[#EBF5FF] dark:bg-[#1E293B] border-[#BFDBFE] dark:border-[#334155]';
      case 'lecture':
        return 'bg-[#ECFDF5] dark:bg-[#064E3B]/30 border-[#A7F3D0] dark:border-[#047857]/40';
      case 'study':
        return 'bg-[#F5F3FF] dark:bg-[#4C1D95]/30 border-[#DDD6FE] dark:border-[#6D28D9]/40';
      default:
        return 'bg-[#FFFBEB] dark:bg-[#78350F]/30 border-[#FDE68A] dark:border-[#B45309]/40';
    }
  };

  return (
    <div className="rounded-[24px] p-4 sm:p-5 bg-[#EFEFEF] dark:bg-[#1C1C1C] border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(60,40,10,0.06)] hover:shadow-[0_16px_36px_rgba(60,40,10,0.10)] transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between pb-1">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] block">
            Your meetings
          </span>
          <h3 className="text-lg font-bold text-[#141414] dark:text-white tracking-tight mt-0.5">
            Weekly schedule
          </h3>
        </div>

        <button
          type="button"
          aria-label="More schedule options"
          className="w-7 h-7 rounded-full bg-white dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center shadow-2xs hover:bg-[#141414] hover:text-white dark:hover:bg-[#C8F03C] dark:hover:text-[#141414] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C]"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Four White Rows */}
      <div className="space-y-2.5 mt-3.5">
        {SCHEDULE_ITEMS.map((item, idx) => {
          const itemDate = addDays(today, item.dayOffset);
          const monthStr = format(itemDate, 'MMM');
          const dayNum = format(itemDate, 'd');

          return (
            <div
              key={item.id}
              className="rounded-2xl p-2.5 sm:p-3 bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 shadow-2xs flex items-center justify-between gap-3 hover:shadow-xs transition-shadow duration-200"
              style={{
                animationDelay: `${idx * 80}ms`,
              }}
            >
              {/* Date Tile */}
              <div className="w-10 h-10 rounded-xl bg-[#F8F8F8] dark:bg-[#202020] flex flex-col items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                <span className="text-[9px] font-bold uppercase text-[#737373] dark:text-[#A3A3A3] leading-none">
                  {monthStr}
                </span>
                <span className="text-base font-extrabold text-[#141414] dark:text-white leading-none mt-0.5">
                  {dayNum}
                </span>
              </div>

              {/* Title & Time Range Chip */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#141414] dark:text-white truncate leading-snug">
                  {item.title}
                </h4>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAF4FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] text-[10px] font-semibold mt-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{item.timeRange}</span>
                </div>
              </div>

              {/* Round App / Meeting Icon Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-2xs ${getBadgeBg(
                  item.type
                )}`}
              >
                {getBadgeIcon(item.type)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

