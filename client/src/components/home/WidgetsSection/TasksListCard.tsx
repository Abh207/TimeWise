import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Folder, 
  Check, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';
import { TASKS_PROJECT_SETS } from './widgetsData';

export const TasksListCard: React.FC = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectData, setProjectData] = useState(TASKS_PROJECT_SETS);

  const currentProject = projectData[projectIndex];

  const handlePrev = () => {
    setProjectIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  const handleNext = () => {
    setProjectIndex((prev) => (prev + 1) % projectData.length);
  };

  const toggleSubtask = (subtaskId: string) => {
    setProjectData((prev) =>
      prev.map((proj, pIdx) => {
        if (pIdx !== projectIndex) return proj;
        return {
          ...proj,
          subtasks: proj.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      })
    );
  };

  // Calculate dynamic progress based on completed subtask minutes
  const totalMinutes = currentProject.subtasks.reduce((acc, st) => acc + st.minutes, 0) || 1;
  const completedMinutes = currentProject.subtasks
    .filter((st) => st.completed)
    .reduce((acc, st) => acc + st.minutes, 0);

  const progressPercent = Math.round((completedMinutes / totalMinutes) * 100);

  const formatHoursMinutes = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m > 0 ? `${m}m` : ''}`;
  };

  return (
    <div className="widget-card p-[clamp(16px,1.4vw,24px)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-[#141414] dark:text-white tracking-tight">
            Tasks
          </h3>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#F5C7B0] dark:hover:text-[#2A1810] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C7B0]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="w-6 h-6 rounded-full bg-[#F3EFE9] dark:bg-[#2A2A2A] text-[#141414] dark:text-white flex items-center justify-center hover:bg-[#141414] hover:text-white dark:hover:bg-[#F5C7B0] dark:hover:text-[#2A1810] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C7B0]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Parent Project Row with Orange Folder and Dynamic Progress */}
        <div className="mt-3 p-2.5 rounded-xl bg-[#F8F5EE] dark:bg-[#1E1E1E] border border-black/5 dark:border-white/5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#FFEDD5] dark:bg-[#7C2D12]/40 text-[#EA580C] flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-900/40">
                <Folder className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[#141414] dark:text-white truncate">
                {currentProject.projectName}
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-[#141414] dark:text-white shrink-0">
              {formatHoursMinutes(totalMinutes)}
            </span>
          </div>

          {/* Peach Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#E5E5E5] dark:bg-[#2C2C2C] overflow-hidden">
            <div
              className="h-full bg-[var(--peach-400)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Indented Tree with Connecting Line */}
      <div className="border-l-2 border-black/10 dark:border-white/10 ml-3.5 pl-3.5 space-y-2.5 my-3">
        {currentProject.subtasks.map((st) => (
          <div
            key={st.id}
            onClick={() => toggleSubtask(st.id)}
            className="flex items-center justify-between gap-2 cursor-pointer group select-none"
            role="checkbox"
            aria-checked={st.completed}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSubtask(st.id);
              }
            }}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* Checkbox circle */}
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  st.completed
                    ? 'bg-[var(--peach-300)] text-[var(--on-peach)] shadow-2xs'
                    : 'border-2 border-black/25 dark:border-white/25 bg-transparent group-hover:border-[var(--peach-400)]'
                }`}
              >
                {st.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>

              {/* Title */}
              <span
                className={`text-xs font-medium truncate transition-colors ${
                  st.completed
                    ? 'line-through text-[#8A8A8A] dark:text-[#737373]'
                    : 'text-[#141414] dark:text-white group-hover:text-[var(--peach-800)] dark:group-hover:text-[var(--peach-300)]'
                }`}
              >
                {st.title}
              </span>
            </div>

            {/* Time */}
            <span className="text-[10px] font-mono text-[#737373] dark:text-[#A3A3A3] shrink-0">
              {st.time}
            </span>
          </div>
        ))}
      </div>

      {/* Footer: Date Range, Comment Count and Overlapping Avatars */}
      <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-[11px] text-[#737373] dark:text-[#A3A3A3]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#737373]" />
            <span className="font-medium">{currentProject.dateRange}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#737373]" />
            <span className="font-bold">{currentProject.commentsCount}</span>
          </div>
        </div>

        {/* Two Overlapping Round Avatars */}
        <div className="flex items-center -space-x-1.5">
          <div className="w-5 h-5 rounded-full bg-[#4DA3FF] text-white text-[8px] font-bold border-2 border-white dark:border-[#161616] flex items-center justify-center shadow-2xs">
            AC
          </div>
          <div className="w-5 h-5 rounded-full bg-[#F5C7B0] text-[#2A1810] text-[8px] font-bold border-2 border-white dark:border-[#161616] flex items-center justify-center shadow-2xs">
            MP
          </div>
        </div>
      </div>
    </div>
  );
};

