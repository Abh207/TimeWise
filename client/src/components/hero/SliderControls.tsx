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
    <>
      {/* Slide Text Heading: center y = 651, 29 bold */}
      <div
        key={`heading-${currentIndex}`}
        className="absolute z-30 select-none animate-fade-in pointer-events-none"
        style={{
          left: 'calc(64 * var(--s))',
          top: 'calc(651 * var(--s))',
          transform: 'translateY(-50%)',
          maxWidth: 'calc(470 * var(--s))',
        }}
      >
        <h3
          className="font-bold tracking-tight leading-snug"
          style={{
            fontSize: 'max(var(--min-font, 0px), calc(29 * var(--s)))',
            color: '#141414',
          }}
        >
          {heading}
        </h3>
      </div>

      {/* Slide Text Paragraph: starts at y = 693, 23 regular, line-height 31, max-width 470, color grey */}
      <div
        key={`desc-${currentIndex}`}
        className="absolute z-30 select-none animate-fade-in pointer-events-none"
        style={{
          left: 'calc(64 * var(--s))',
          top: 'calc(693 * var(--s))',
          maxWidth: 'calc(470 * var(--s))',
        }}
      >
        <p
          className="font-normal"
          style={{
            fontSize: 'max(var(--min-font, 0px), calc(23 * var(--s)))',
            lineHeight: 'calc(31 * var(--s))',
            color: '#7A756E',
          }}
        >
          {description}
        </p>
      </div>

      {/* Left Arrow Button: 64 x 64 at left 64, vertical center y = 797 */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="tap-target-expanded absolute z-30 flex items-center justify-center bg-white rounded-full transition-all duration-200 hover:bg-[#FDFBF7] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] cursor-pointer"
        style={{
          left: 'calc(64 * var(--s))',
          top: 'calc(797 * var(--s))',
          transform: 'translateY(-50%)',
          width: 'calc(64 * var(--s))',
          height: 'calc(64 * var(--s))',
          boxShadow: '0 calc(4 * var(--s)) calc(14 * var(--s)) rgba(60, 40, 10, 0.08)',
          border: 'calc(1 * var(--s)) solid rgba(0, 0, 0, 0.04)',
          color: '#141414',
        }}
      >
        <ArrowLeft 
          style={{ width: 'calc(24 * var(--s))', height: 'calc(24 * var(--s))' }} 
          strokeWidth={2} 
        />
      </button>

      {/* 6 Dots: start at x = 150, vertical center y = 797, end near x = 270 */}
      <div 
        className="absolute z-30 flex items-center select-none"
        style={{
          left: 'calc(150 * var(--s))',
          top: 'calc(797 * var(--s))',
          transform: 'translateY(-50%)',
          gap: 'calc(14 * var(--s))',
        }}
      >
        {Array.from({ length: totalSlides }).map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C1C21] cursor-pointer"
              style={
                isActive
                  ? {
                      width: 'calc(26 * var(--s))',
                      height: 'calc(26 * var(--s))',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 calc(2 * var(--s)) calc(8 * var(--s)) rgba(60, 40, 10, 0.12)',
                      border: 'calc(3 * var(--s)) solid #141414',
                    }
                  : {
                      width: 'calc(6 * var(--s))',
                      height: 'calc(6 * var(--s))',
                      backgroundColor: '#B5AFA7',
                    }
              }
            />
          );
        })}
      </div>

      {/* Right Arrow Button: 64 x 64 at left 288, vertical center y = 797 */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="tap-target-expanded absolute z-30 flex items-center justify-center bg-white rounded-full transition-all duration-200 hover:bg-[#FDFBF7] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C21] cursor-pointer"
        style={{
          left: 'calc(288 * var(--s))',
          top: 'calc(797 * var(--s))',
          transform: 'translateY(-50%)',
          width: 'calc(64 * var(--s))',
          height: 'calc(64 * var(--s))',
          boxShadow: '0 calc(4 * var(--s)) calc(14 * var(--s)) rgba(60, 40, 10, 0.08)',
          border: 'calc(1 * var(--s)) solid rgba(0, 0, 0, 0.04)',
          color: '#141414',
        }}
      >
        <ArrowRight 
          style={{ width: 'calc(24 * var(--s))', height: 'calc(24 * var(--s))' }} 
          strokeWidth={2} 
        />
      </button>
    </>
  );
};
