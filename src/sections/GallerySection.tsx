import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/gallery-main-floor.jpg', alt: 'Main gym floor with treadmills and cardio equipment' },
  { src: '/images/gallery-free-weights.jpg', alt: 'Free weights zone with dumbbell racks' },
  { src: '/images/gallery-cable-machines.jpg', alt: 'Cable crossover machines and functional trainers' },
  { src: '/images/gallery-group-studio.jpg', alt: 'Group fitness studio with wooden flooring' },
  { src: '/images/gallery-locker-room.jpg', alt: 'Premium locker room facilities' },
  { src: '/images/gallery-functional-zone.jpg', alt: 'Functional training zone with TRX and battle ropes' },
  { src: '/images/gallery-recovery.jpg', alt: 'Recovery and stretching area' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(galleryImages.length / itemsPerView));

  const scrollToPage = (page: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(page, totalPages - 1));
    setCurrentPage(clamped);
    const slideWidth = trackRef.current.children[0]?.clientWidth + 24 || 424;
    trackRef.current.scrollTo({
      left: clamped * slideWidth * itemsPerView,
      behavior: 'smooth',
    });
  };

  useGSAP(() => {
    if (!sectionRef.current) return;
    const carousel = sectionRef.current.querySelector('.gallery-carousel');
    if (carousel) {
      gsap.fromTo(
        carousel,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }
  }, { scope: sectionRef });

  const slideWidth = itemsPerView === 1 ? '280px' : itemsPerView === 2 ? '340px' : '400px';
  const slideHeight = itemsPerView === 1 ? '210px' : itemsPerView === 2 ? '255px' : '300px';

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="w-full bg-near-black py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <SectionHeader
          label="OUR FACILITY"
          title="LATEST EQUIPMENTS"
        />

        <div className="gallery-carousel relative mt-16">
          {/* Navigation Arrows */}
          <div className="hidden lg:flex items-center gap-2 absolute -top-16 right-0 z-10">
            <button
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="w-12 h-12 bg-near-black border border-medium-gray flex items-center justify-center text-white hover:bg-crimson hover:border-crimson transition-all duration-300 disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="w-12 h-12 bg-near-black border border-medium-gray flex items-center justify-center text-white hover:bg-crimson hover:border-crimson transition-all duration-300 disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-start group overflow-hidden border-2 border-medium-gray"
                style={{ width: slideWidth, height: slideHeight }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          {totalPages > 1 && (
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
      </div>
    </section>
  );
}
