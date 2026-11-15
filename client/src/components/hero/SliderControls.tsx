import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SliderControlsProps {
  heading: string;
  description: string;
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
  heading,
  description,
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
}) => {
  return (
    <div className="max-w-[300px] sm:max-w-[340px] w-full select-none">
      {/* Slide Text Content (with aria-live for accessibility) */}
      <div 
        key={currentIndex} 
        aria-live="polite"
        className="space-y-1 animate-fade-in transition-opacity duration-350 min-h-[58px] sm:min-h-[64px]"
      >
        <h3 className="text-sm sm:text-base font-[800] text-[#141414] tracking-tight leading-snug">
          {heading}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-[#6F6A64] font-normal leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Controls Row: [←] • • • • • • [→] */}
      <div className="flex items-center gap-2.5 mt-2 sm:mt-2.5">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-lg bg-white shadow-2xs border border-black/5 flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <ArrowLeft className="w-3 h-3 stroke-[2.5]" />
        </button>

        {/* 6 Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F03C] ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#C8F03C] border border-[#141414]/20 scale-110 shadow-[0_0_6px_#C8F03C]'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next slide"
          className="w-8 h-8 rounded-lg bg-white shadow-2xs border border-black/5 flex items-center justify-center text-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
        >
          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
