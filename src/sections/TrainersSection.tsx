import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';
import { ChevronLeft, ChevronRight, Check, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: 'ALEX MITCHELL',
    role: 'HEAD COACH / STRENGTH SPECIALIST',
    image: '/images/trainer-alex.jpg',
    qualifications: [
      'NASM Certified Personal Trainer',
      '10+ Years Experience',
      'Specialist in Powerlifting & Hypertrophy',
      'Nutrition Certification (ISSA)',
    ],
  },
  {
    name: 'SARAH CHEN',
    role: 'GROUP FITNESS DIRECTOR',
    image: '/images/trainer-sarah.jpg',
    qualifications: [
      'ACE Certified Group Fitness Instructor',
      'CrossFit Level 2 Trainer',
      'Yoga Alliance RYT-200',
      '8+ Years Experience',
    ],
  },
  {
    name: 'MARCUS JOHNSON',
    role: 'FUNCTIONAL TRAINING EXPERT',
    image: '/images/trainer-marcus.jpg',
    qualifications: [
      'NSCA CSCS (Certified Strength & Conditioning)',
      'FMS Level 1 Certified',
      'TRX & Kettlebell Specialist',
      '7+ Years Experience',
    ],
  },
  {
    name: 'EMILY RODRIGUEZ',
    role: 'NUTRITION & WEIGHT LOSS COACH',
    image: '/images/trainer-emily.jpg',
    qualifications: [
      'Precision Nutrition Level 2 Coach',
      'NASM Weight Loss Specialist',
      'Certified Health Coach (ACE)',
      '6+ Years Experience',
    ],
  },
];

export default function TrainersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(trainers.length / itemsPerView));

  const scrollToPage = (page: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(page, totalPages - 1));
    setCurrentPage(clamped);
    const cardWidth = itemsPerView === 1 ? 260 : 280;
    const gap = 24;
    trackRef.current.scrollTo({
      left: clamped * (cardWidth + gap) * itemsPerView,
      behavior: 'smooth',
    });
  };

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.trainer-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    );
  }, { scope: sectionRef });

  const cardWidth = itemsPerView === 1 ? '260px' : '280px';
  const imgHeight = itemsPerView === 1 ? '320px' : '360px';

  return (
    <section
      ref={sectionRef}
      id="trainers"
      className="w-full bg-dark-gray py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <SectionHeader
          label="EXPERT TRAINERS"
          title="MEET OUR TEAM"
          subtitle="Our certified trainers bring decades of combined experience in strength training, nutrition, and sports science to help you achieve your goals."
          align="left"
        />

        <div className="relative mt-16">
          {/* Arrows */}
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
            {trainers.map((trainer) => (
              <div
                key={trainer.name}
                className="trainer-card flex-shrink-0 snap-start group"
                style={{ width: cardWidth }}
              >
                {/* Photo */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: imgHeight }}
                >
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 contrast-110 group-hover:contrast-100 transition-all duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                    <ul className="space-y-2">
                      {trainer.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-[13px] text-white/80 font-inter leading-relaxed">
                          <Check size={12} className="text-crimson mt-0.5 flex-shrink-0" />
                          {q}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3 mt-4">
                      <a href="#" className="text-white hover:text-crimson transition-colors duration-300" aria-label="Facebook">
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="text-white hover:text-crimson transition-colors duration-300" aria-label="Instagram">
                        <Instagram size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-near-black p-6">
                  <h3 className="font-oswald text-lg font-semibold text-white uppercase group-hover:text-crimson transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="font-inter text-xs font-medium text-crimson uppercase tracking-wider mt-1">
                    {trainer.role}
                  </p>
                </div>
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
