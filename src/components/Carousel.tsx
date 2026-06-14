import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  itemsPerView?: number;
  gap?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export default function Carousel({
  children,
  itemsPerView = 3,
  gap = 24,
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const childrenArray = useRef<ReactNode[]>([]);

  useEffect(() => {
    childrenArray.current = Array.isArray(children) ? children : [children];
    const total = childrenArray.current.length;
    setTotalPages(Math.max(1, Math.ceil(total / itemsPerView)));
  }, [children, itemsPerView]);

  const getSlideWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const containerWidth = trackRef.current.parentElement?.clientWidth || 0;
    return (containerWidth - gap * (itemsPerView - 1)) / itemsPerView + gap;
  }, [gap, itemsPerView]);

  const scrollToPage = useCallback((page: number) => {
    if (!trackRef.current) return;
    const slideWidth = getSlideWidth();
    const clampedPage = Math.max(0, Math.min(page, totalPages - 1));
    setCurrentPage(clampedPage);
    trackRef.current.scrollTo({
      left: clampedPage * slideWidth * itemsPerView,
      behavior: 'smooth',
    });
  }, [getSlideWidth, itemsPerView, totalPages]);

  const handlePrev = useCallback(() => {
    scrollToPage(currentPage - 1);
  }, [currentPage, scrollToPage]);

  const handleNext = useCallback(() => {
    scrollToPage(currentPage + 1);
  }, [currentPage, scrollToPage]);

  // Handle scroll to update current page
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const slideWidth = getSlideWidth();
      const page = Math.round(track.scrollLeft / (slideWidth * itemsPerView));
      setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [getSlideWidth, itemsPerView, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>

      {/* Arrows */}
      {showArrows && totalPages > 1 && (
        <div className="hidden md:flex items-center gap-2 absolute -top-16 right-0">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="w-12 h-12 bg-near-black border border-medium-gray flex items-center justify-center text-white hover:bg-crimson hover:border-crimson transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className="w-12 h-12 bg-near-black border border-medium-gray flex items-center justify-center text-white hover:bg-crimson hover:border-crimson transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Dots */}
      {showDots && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                i === currentPage ? 'bg-crimson' : 'bg-medium-gray'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
