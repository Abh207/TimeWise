import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import type { TodayTaskCard } from './heroData';

interface TodayTasksPanelProps {
  tasks: [TodayTaskCard, TodayTaskCard];
  slideIndex: number;
}

export const TodayTasksPanel: React.FC<TodayTasksPanelProps> = ({ 
  tasks, 
  slideIndex,
}) => {
  const currentDate = format(new Date(), 'dd.MM');

  return (
    <div
      className="flex flex-col justify-between transition-all duration-200 select-none"
      style={{
        width: 'calc(577 * var(--s))',
        height: 'calc(325 * var(--s))',
        backgroundColor: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(calc(14 * var(--s)))',
        WebkitBackdropFilter: 'blur(calc(14 * var(--s)))',
        borderRadius: 'calc(40 * var(--s))',
        padding: 'calc(24 * var(--s))',
        border: 'calc(1 * var(--s)) solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 calc(12 * var(--s)) calc(32 * var(--s)) rgba(60, 40, 10, 0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h2
            className="font-bold leading-tight"
            style={{
              fontSize: 'max(var(--min-font, 0px), calc(34 * var(--s)))',
              color: '#141414',
            }}
          >
            Today's Tasks
          </h2>
          <span
            className="font-medium"
            style={{
              fontSize: 'max(var(--min-font, 0px), calc(22 * var(--s)))',
              color: '#7A756E',
              marginTop: 'calc(4 * var(--s))',
            }}
          >
            To-do list for today
          </span>
        </div>

        {/* White Rounded-Square ↗ Button: 60 x 60 at top-right */}
        <Link
          to="/app/timetable"
          className="flex items-center justify-center bg-white shadow-2xs hover:shadow-xs hover:bg-[#FDFBF7] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] cursor-pointer"
          title="Open Academic Timetable"
          aria-label="Open Academic Timetable"
          style={{
            width: 'calc(60 * var(--s))',
            height: 'calc(60 * var(--s))',
            borderRadius: 'calc(18 * var(--s))',
            color: '#141414',
            border: 'calc(1 * var(--s)) solid rgba(0, 0, 0, 0.04)',
          }}
        >
          <ArrowUpRight 
            style={{ width: 'calc(28 * var(--s))', height: 'calc(28 * var(--s))' }} 
            strokeWidth={2.2} 
          />
        </Link>
      </div>

      {/* Two White Cards Side by Side (each 254 x 200, radius 28, gap 20) */}
      <div 
        key={slideIndex}
        className="flex items-stretch justify-between animate-fade-in"
        style={{
          gap: 'calc(20 * var(--s))',
        }}
      >
        {tasks.map((task, idx) => {
          const isProgress = task.status === 'In Progress';
          const dotColor = isProgress ? 'var(--accent-orange, #F7852C)' : 'var(--accent-amber, #FFC043)';

          return (
            <div
              key={idx}
              className="flex flex-col justify-between bg-white shadow-2xs hover:shadow-xs transition-shadow"
              style={{
                width: 'calc(254 * var(--s))',
                height: 'calc(200 * var(--s))',
                borderRadius: 'calc(28 * var(--s))',
                padding: 'calc(18 * var(--s))',
                border: 'calc(1 * var(--s)) solid rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Top: Date line: 19 */}
              <span
                className="font-normal whitespace-nowrap"
                style={{
                  fontSize: 'max(var(--min-font, 0px), calc(19 * var(--s)))',
                  color: '#7A756E',
                }}
              >
                {currentDate} &nbsp;{task.time}
              </span>

              {/* Middle: Bold Task Title & Subtitle: Title 25, Subtitle 19 */}
              <div className="flex flex-col" style={{ gap: 'calc(3 * var(--s))' }}>
                <h3
                  className="font-bold leading-tight"
                  style={{
                    fontSize: 'max(var(--min-font, 0px), calc(25 * var(--s)))',
                    color: '#141414',
                    wordBreak: 'break-word',
                  }}
                >
                  {task.title}
                </h3>
                <span
                  className="font-normal"
                  style={{
                    fontSize: 'max(var(--min-font, 0px), calc(19 * var(--s)))',
                    color: '#7A756E',
                    lineHeight: 1.3,
                  }}
                >
                  {task.subtitle}
                </span>
              </div>

              {/* Bottom: Status 19 & Dot 18 */}
              <div 
                className="flex items-center justify-between border-t border-black/5"
                style={{
                  paddingTop: 'calc(8 * var(--s))',
                }}
              >
                <span
                  className="font-normal whitespace-nowrap"
                  style={{
                    fontSize: 'max(var(--min-font, 0px), calc(19 * var(--s)))',
                    color: '#7A756E',
                  }}
                >
                  {task.status}
                </span>
                <span
                  className="rounded-full shrink-0"
                  style={{
                    width: 'calc(18 * var(--s))',
                    height: 'calc(18 * var(--s))',
                    backgroundColor: dotColor,
                    boxShadow: `0 0 calc(6 * var(--s)) ${dotColor}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
