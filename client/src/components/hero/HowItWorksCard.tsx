import React from 'react';
import { Play } from 'lucide-react';

interface HowItWorksCardProps {
  onOpenVideo: () => void;
}

export const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ onOpenVideo }) => {
  return (
    <div 
      onClick={onOpenVideo}
      className="group cursor-pointer rounded-[18px] p-2 sm:p-2.5 bg-white/65 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(60,40,10,0.06)] transition-all duration-200 flex items-center justify-between gap-2 max-w-[230px] sm:max-w-[250px] w-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenVideo();
        }
      }}
      aria-label="Watch how TimeWise works video"
    >
      <div className="flex items-center gap-2 min-w-0">
        {/* Small Rounded Thumbnail */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8F03C] to-[#FBF8F3] p-0.5 border border-white/60 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
          <div className="w-4 h-6 rounded-xs bg-[#141414] border border-white/40 flex flex-col items-center justify-start pt-0.5 px-0.5">
            <div className="w-1.5 h-[1px] bg-[#C8F03C] rounded-full mb-0.5" />
            <div className="w-full space-y-[1px]">
              <div className="w-full h-[1px] bg-white/30 rounded-full" />
              <div className="w-4/5 h-[1px] bg-white/30 rounded-full" />
              <div className="w-3/5 h-[1px] bg-[#C8F03C] rounded-full" />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="text-left min-w-0">
          <h2 className="text-[11px] sm:text-xs font-bold text-[#141414] leading-tight truncate">
            How It Works
          </h2>
          <p className="text-[9.5px] sm:text-[10px] text-[#6F6A64] mt-0.5 truncate">
            Watch how it works
          </p>
        </div>
      </div>

      {/* Round White Play Button */}
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-2xs flex items-center justify-center text-[#141414] group-hover:bg-[#141414] group-hover:text-white transition-all duration-200 shrink-0">
        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
      </div>
    </div>
  );
};
