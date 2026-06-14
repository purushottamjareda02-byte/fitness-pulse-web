import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
        '-=0.1'
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.2,
      });

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-near-black flex flex-col items-center justify-center"
    >
      <div
        ref={logoRef}
        className="font-oswald text-2xl font-semibold tracking-[6px] uppercase text-white opacity-0"
      >
        FITNESS PULSE
      </div>
      <div
        ref={lineRef}
        className="w-48 h-[2px] bg-crimson mt-4 origin-center"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
