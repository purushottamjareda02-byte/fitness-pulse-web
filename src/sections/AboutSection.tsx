import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Expert Trainers' },
  { value: 10, suffix: 'K+', label: 'Happy Members' },
  { value: 50, suffix: '+', label: 'Fitness Programs' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Content fade up
    const contentEls = sectionRef.current.querySelectorAll('.about-content');
    gsap.fromTo(
      contentEls,
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

    // Image fade up with scale
    const imgEl = sectionRef.current.querySelector('.about-image');
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { opacity: 0, y: 40, scale: 1.02 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }

    // Stats count-up
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((el, i) => {
        const target = stats[i].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.4 + i * 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = Math.round(obj.val) + stats[i].suffix;
          },
        });
      });

      // Labels fade in
      const labels = statsRef.current.querySelectorAll('.stat-label');
      gsap.fromTo(
        labels,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-near-black py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="about-content">
              <SectionHeader
                label="ABOUT US"
                title="ALL ABOUT FITNESS"
                align="left"
                titleAccent="FITNESS"
              />
            </div>
            <p className="about-content body-text mt-6 max-w-[480px]">
              Fitness Pulse Gym is the premier fitness destination in the city, spanning over 9,000 square feet of cutting-edge training space. Since 2009, we've been transforming lives through science-backed training programs, world-class equipment, and an unwavering commitment to every member's success.
            </p>
            <p className="about-content body-text mt-4 max-w-[480px]">
              Our philosophy is simple: provide the best equipment, the most knowledgeable trainers, and an environment that pushes you to be better every single day. Whether you're a beginner taking your first steps or an elite athlete chasing your next PR, Fitness Pulse is where transformations happen.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="about-content inline-block mt-8 font-oswald text-sm font-medium tracking-widest uppercase text-crimson border-b border-crimson pb-1 hover:text-white hover:border-white transition-all duration-300 group"
            >
              LEARN MORE ABOUT US
              <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Right: Image */}
          <div className="about-image overflow-hidden">
            <img
              src="/images/about-feature.jpg"
              alt="Athlete performing barbell squat"
              className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 mt-16 lg:mt-20 divide-x divide-medium-gray/50"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-6 group cursor-default"
            >
              <span className="stat-number font-oswald text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-crimson transition-colors duration-300">
                0{stat.suffix}
              </span>
              <span className="stat-label font-inter text-xs font-medium text-light-gray uppercase tracking-widest mt-2 opacity-0">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
