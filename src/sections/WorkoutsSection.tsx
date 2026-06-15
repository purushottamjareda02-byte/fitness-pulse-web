import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const workouts = [
  {
    title: 'CARDIO BLAST',
    description: 'High-energy rhythmic workouts that push your heart rate into the target zone for maximum fat burning and endurance building.',
    image: '/images/workout-cardio.jpg',
  },
  {
    title: 'STRENGTH TRAINING',
    description: 'Progressive resistance programs designed to build lean muscle, increase power, and sculpt your physique using free weights and machines.',
    image: '/images/workout-strength.jpg',
  },
  {
    title: 'CROSSFIT',
    description: 'Functional fitness at maximum intensity. Varied daily workouts combining Olympic lifting, gymnastics, and conditioning for total athletic development.',
    image: '/images/workout-crossfit.jpg',
  },
  {
    title: 'WEIGHT LOSS',
    description: 'Science-backed programs combining targeted cardio, strength circuits, and nutritional guidance to help you shed fat and keep it off.',
    image: '/images/workout-weightloss.jpg',
  },
  {
    title: 'ZUMBA & AEROBICS',
    description: 'Dance your way to fitness with high-energy Zumba classes and dynamic aerobics sessions that make cardio fun and addictive.',
    image: '/images/workout-zumba.jpg',
  },
  {
    title: 'FLOOR EXERCISE',
    description: 'Mat-based workouts focusing on core strength, flexibility, balance, and bodyweight mastery through Pilates-inspired and gymnastics movements.',
    image: '/images/workout-floor.jpg',
  },
];

export default function WorkoutsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.workout-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="workouts"
      className="w-full bg-dark-gray py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <SectionHeader
          label="WORKOUTS WE OFFER"
          title="TRANSFORM YOUR BODY"
          subtitle="From high-intensity strength training to mindful flexibility work, we offer programs designed for every fitness goal and level."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {workouts.map((workout) => (
            <div
              key={workout.title}
              className="workout-card group relative h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={workout.image}
                alt={workout.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Default Overlay */}
              <div
                className="absolute inset-0 z-[1] transition-opacity duration-400 group-hover:opacity-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
                }}
              />

              {/* Red Hover Overlay */}
              <div className="absolute inset-0 z-[2] bg-crimson/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                         {/* Title Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3] transition-all duration-400 group-hover:opacity-0">
              <h3 className="font-oswald text-xl md:text-2xl font-semibold text-white uppercase">
                {workout.title}
              </h3>
            </div>

              {/* Description (visible on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3] opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0">
                <h3 className="font-oswald text-xl md:text-2xl font-semibold text-white uppercase mb-2">
                  {workout.title}
                </h3>
                <p className="font-inter text-sm text-white/80 leading-relaxed">
                  {workout.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
