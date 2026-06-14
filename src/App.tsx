import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import WorkoutsSection from '@/sections/WorkoutsSection';
import GallerySection from '@/sections/GallerySection';
import TrainersSection from '@/sections/TrainersSection';
import PricingSection from '@/sections/PricingSection';
import ContactSection from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative">
      <LoadingScreen />
      <Header lenisRef={lenisRef} />
      <ScrollProgress />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkoutsSection />
        <GallerySection />
        <TrainersSection />
        <PricingSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
