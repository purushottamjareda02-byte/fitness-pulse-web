import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  titleAccent?: string;
}

export default function SectionHeader({ label, title, subtitle, align = 'center', titleAccent }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.fromTo(
      containerRef.current.querySelector('.section-label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
      .fromTo(
        containerRef.current.querySelector('.section-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

    if (subtitle) {
      tl.fromTo(
        containerRef.current.querySelector('.section-subtitle'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );
    }

    return () => { tl.kill(); };
  }, { scope: containerRef });

  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  const renderTitle = () => {
    if (titleAccent) {
      const parts = title.split(titleAccent);
      return (
        <>
          {parts[0]}<span className="text-crimson">{titleAccent}</span>{parts[1] || ''}
        </>
      );
    }
    return title;
  };

  return (
    <div ref={containerRef} className={alignClass}>
      <p className="section-label opacity-0">{label}</p>
      <h2 className="section-title mt-4 opacity-0">{renderTitle()}</h2>
      {subtitle && (
        <p className={`body-text mt-4 max-w-[600px] mx-auto opacity-0 section-subtitle ${align === 'left' ? 'mx-0' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
