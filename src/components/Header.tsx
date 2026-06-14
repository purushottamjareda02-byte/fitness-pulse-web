import { useState, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import Lenis from 'lenis';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORKOUTS', href: '#workouts' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'TRAINERS', href: '#trainers' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'CONTACT', href: '#contact' },
];

interface HeaderProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function Header({ lenisRef }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(`#${section.id}`),
        onEnterBack: () => setActiveSection(`#${section.id}`),
      });
    });
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileMenuOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -80 });
    }
  }, [lenisRef]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-near-black/95 border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollTo('#hero')}
            className="font-oswald text-lg font-bold tracking-widest uppercase text-white"
          >
            FITNESS <span className="font-bold">PULSE</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative font-oswald text-sm font-medium tracking-widest uppercase text-white transition-colors duration-300 group ${
                  activeSection === link.href ? 'text-crimson' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-crimson transition-transform duration-300 origin-left ${
                    activeSection === link.href ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:block btn-primary text-xs py-2.5 px-5"
            >
              JOIN NOW
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-near-black transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-oswald text-2xl font-semibold tracking-widest uppercase text-white transition-colors duration-300 hover:text-crimson"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-primary mt-8"
          >
            JOIN NOW
          </button>
        </nav>
      </div>
    </>
  );
}
