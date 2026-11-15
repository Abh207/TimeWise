import React from 'react';
import type { TaskRow } from './heroData';

interface TaskTableCardProps {
  rows: [TaskRow, TaskRow];
  slideIndex: number;
}

export const TaskTableCard: React.FC<TaskTableCardProps> = ({ 
  rows, 
  slideIndex,
}) => {
  return (
    <div
      className="flex flex-col justify-between transition-all duration-200 select-none"
      style={{
        width: 'calc(462 * var(--s))',
        height: 'calc(160 * var(--s))',
        backgroundColor: 'rgba(255, 255, 255, 0.62)',
        backdropFilter: 'blur(calc(14 * var(--s)))',
        WebkitBackdropFilter: 'blur(calc(14 * var(--s)))',
        borderRadius: 'calc(30 * var(--s))',
        padding: 'calc(16 * var(--s))',
        border: 'calc(1 * var(--s)) solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 calc(10 * var(--s)) calc(30 * var(--s)) rgba(60, 40, 10, 0.08)',
      }}
    >
      <div 
        key={slideIndex} 
        role="list"
        aria-label="Task schedule"
        className="flex flex-col justify-between h-full animate-fade-in" 
        style={{ 
          gap: 'calc(14 * var(--s))',
          animationDuration: '350ms',
        }}
      >
        {rows.map((row, idx) => (
          <div
            key={idx}
            role="listitem"
            className="flex items-center justify-between bg-white shadow-2xs hover:shadow-xs transition-shadow"
            style={{
              height: 'calc(60 * var(--s))',
              borderRadius: 'calc(18 * var(--s))',
              padding: '0 calc(20 * var(--s))',
              gap: 'calc(14 * var(--s))',
            }}
          >
            {/* 1. Task Name: semibold 22, color #141414 */}
            <span
              className="font-semibold flex-1 min-w-0 truncate"
              style={{
                fontSize: 'max(var(--min-font, 0px), calc(22 * var(--s)))',
                color: '#141414',
                lineHeight: 1.25,
              }}
            >
              {row.title}
            </span>

            {/* 2. Chip: Peach background #F5C7B0, text #2A1810, uppercase 17 bold */}
            <span
              className="font-bold shrink-0 flex items-center justify-center uppercase"
              style={{
                fontSize: 'max(var(--min-font, 0px), calc(17 * var(--s)))',
                letterSpacing: '0.04em',
                borderRadius: 'calc(8 * var(--s))',
                padding: 'calc(4 * var(--s)) calc(12 * var(--s))',
                lineHeight: 1.1,
                backgroundColor: 'var(--taskcard-chip, #F5C7B0)',
                color: 'var(--taskcard-chip-text, #2A1810)',
                whiteSpace: 'nowrap',
                border: 'none',
              }}
            >
              {row.priority}
            </span>

            {/* 3. Status: grey #77726B, 17 regular */}
            <span
              className="font-normal shrink-0"
              style={{
                fontSize: 'max(var(--min-font, 0px), calc(17 * var(--s)))',
                color: '#77726B',
                whiteSpace: 'nowrap',
              }}
            >
              {row.status}
            </span>

            {/* 4. Duration: monospace 18 bold, color #141414 */}
            <span
              className="font-bold shrink-0 text-right font-mono"
              style={{
                fontSize: 'max(var(--min-font, 0px), calc(18 * var(--s)))',
                fontFamily: 'ui-monospace, "JetBrains Mono", "SF Mono", Consolas, monospace',
                color: '#141414',
                whiteSpace: 'nowrap',
              }}
            >
              {row.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
