import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.8 });

    // Label fade in
    tl.fromTo(
      labelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Word-by-word heading reveal
    const words = headingRef.current?.querySelectorAll('.hero-word');
    if (words) {
      words.forEach((word, i) => {
        const inner = word.querySelector('.hero-word-inner');
        tl.fromTo(
          word,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.5,
            ease: 'power3.out',
          },
          0.2 + i * 0.15
        );
        if (inner) {
          tl.fromTo(
            inner,
            { x: '-100%' },
            { x: '0%', duration: 0.5, ease: 'power3.out' },
            0.2 + i * 0.15
          );
        }
      });
    }

    // Subtitle fade up
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // CTA buttons fade up
    const buttons = ctaRef.current?.querySelectorAll('button');
    if (buttons) {
      tl.fromTo(
        buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.1 },
        '-=0.3'
      );
    }

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const words = ['BUILD', 'YOUR', 'BODY', 'STRONG'];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Athlete performing deadlift"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-center">
        <p
          ref={labelRef}
          className="font-oswald text-xs font-medium tracking-[4px] uppercase text-light-gray mb-6 opacity-0 hidden md:block"
        >
          #1 FITNESS CENTER IN THE CITY
        </p>

        <h1
          ref={headingRef}
          className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight uppercase text-white"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
        >
          {words.map((word) => (
            <span
              key={word}
              className="hero-word inline-block overflow-hidden mr-[0.25em]"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              <span className="hero-word-inner inline-block">
                {word === 'YOUR' || word === 'STRONG' ? (
                  <span className="text-crimson">{word}</span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-inter text-base text-white/80 max-w-[600px] mx-auto mt-6 leading-relaxed opacity-0 px-4"
        >
          Push your limits. Break your barriers. Become the strongest version of yourself.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button onClick={() => handleScroll('#contact')} className="btn-primary opacity-0 w-full sm:w-auto">
            JOIN NOW
          </button>
          <button onClick={() => handleScroll('#workouts')} className="btn-secondary opacity-0 w-full sm:w-auto">
            EXPLORE CLASSES
          </button>
        </div>
      </div>
    </section>
  );
}
