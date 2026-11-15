import React, { useState } from 'react';
import { Pencil, MoreVertical, Play, Pause, Check } from 'lucide-react';
import { INITIAL_NOTE_CHECKLIST, NOTE_WAVEFORM_BARS } from './widgetsData';

export const NoteCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [checklist, setChecklist] = useState(INITIAL_NOTE_CHECKLIST);

  const speeds = ['1x', '1.5x', '2x'];

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const cycleSpeed = () => {
    setSpeedIndex((prev) => (prev + 1) % speeds.length);
  };

  return (
    <div className="rounded-[24px] overflow-hidden bg-[#FFD76A] border border-[#F0C958] shadow-[0_10px_30px_rgba(60,40,10,0.08)] hover:shadow-[0_16px_36px_rgba(60,40,10,0.12)] transition-all duration-300 flex flex-col justify-between">
      {/* Header Strip in lighter yellow */}
      <div className="bg-[#FFE49A] px-4 py-2 flex items-center justify-between border-b border-[#F0C958]/60">
        <span className="text-[10.5px] font-[800] uppercase tracking-widest text-[#784714]">
          FOCUS NOTE
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Edit note"
            className="w-6 h-6 rounded-full bg-[#FFD76A] hover:bg-[#F0C958] text-[#784714] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141414]"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            type="button"
            aria-label="Note options"
            className="w-6 h-6 rounded-full bg-[#FFD76A] hover:bg-[#F0C958] text-[#784714] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141414]"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Note Body */}
      <div className="p-[clamp(14px,1.4vw,22px)] pt-3 flex flex-col justify-between flex-1">
        <p className="text-xs text-[#52320A] leading-relaxed font-medium">
          Plan the week for the Algorithms project. Keep blocks short, protect deep-work time, and remember to include:
        </p>

        {/* White Pill Audio Player */}
        <div className="bg-white rounded-full p-1.5 px-3 flex items-center justify-between gap-2 shadow-2xs my-3 border border-black/5">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause audio note' : 'Play audio note'}
            className="w-6 h-6 rounded-full bg-[#141414] hover:bg-[#282828] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141414]"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-between gap-[2px] sm:gap-[3px] h-6 flex-1 px-1 sm:px-2 overflow-hidden">
            {NOTE_WAVEFORM_BARS.map((height, i) => {
              const isPlayed = i < 7;
              return (
                <div
                  key={i}
                  className={`flex-1 max-w-[4px] min-w-[2px] rounded-full transition-all duration-200 ${
                    isPlaying ? 'waveform-active' : ''
                  } ${isPlayed ? 'bg-[#141414]' : 'bg-[#FDBA74]'}`}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 65}ms`,
                  }}
                />
              );
            })}
          </div>

          {/* Time & Speed Bubble */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono font-bold text-[#141414]">6:12</span>
            <button
              type="button"
              onClick={cycleSpeed}
              aria-label="Cycle playback speed"
              className="px-1.5 py-0.5 rounded-full bg-[#F3EFE9] hover:bg-[#141414] hover:text-white text-[9px] font-bold text-[#141414] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141414]"
            >
              {speeds[speedIndex]}
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-2 cursor-pointer group"
              role="checkbox"
              aria-checked={item.completed}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCheck(item.id);
                }
              }}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                  item.completed
                    ? 'bg-[#141414] text-white shadow-2xs'
                    : 'border-2 border-[#784714]/60 bg-transparent group-hover:border-[#141414]'
                }`}
              >
                {item.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span
                className={`text-xs leading-snug font-medium transition-colors ${
                  item.completed
                    ? 'line-through text-[#784714]/60'
                    : 'text-[#4A2B06] group-hover:text-[#141414]'
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right-aligned Footer Time */}
        <div className="text-[10px] font-semibold text-[#784714]/80 text-right pt-2">
          Today, 2:35 PM
        </div>
      </div>
    </div>
  );
};

