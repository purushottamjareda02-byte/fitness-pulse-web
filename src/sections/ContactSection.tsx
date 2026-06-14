import { useRef, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  [key: string]: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakingField, setShakingField] = useState<string | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Form fields stagger
    const fields = sectionRef.current.querySelectorAll('.form-field');
    gsap.fromTo(
      fields,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    );

    // Info items stagger
    const infoItems = sectionRef.current.querySelectorAll('.info-item');
    gsap.fromTo(
      infoItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.35,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    );

    // Footer columns
    const footerCols = sectionRef.current.querySelectorAll('.footer-col');
    gsap.fromTo(
      footerCols,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 90%', once: true },
      }
    );
  }, { scope: sectionRef });

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.keys(validationErrors).forEach((field) => {
        setShakingField(field);
        setTimeout(() => setShakingField(null), 400);
      });
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1000);
      return;
    }

    setErrors({});
    setStatus('submitting');

    // Simulate submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-dark-gray border px-4 py-3.5 font-inter text-sm text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-crimson focus:shadow-[0_0_0_3px_rgba(229,9,20,0.15)] ${
      errors[field] ? 'border-error-red animate-shake' : 'border-white/15'
    } ${shakingField === field ? 'animate-shake' : ''}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-dark-gray"
    >
      {/* Contact Area */}
      <div className="py-16 md:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
          <SectionHeader
            label="GET IN TOUCH"
            title="CONTACT US"
            subtitle="Ready to start your transformation? Reach out and our team will get back to you within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mt-16">
            {/* Left: Form */}
            <form onSubmit={handleSubmit} className="bg-near-black border border-white/10 p-8 md:p-10 space-y-4">
              <div className="form-field opacity-0">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-error-red text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="form-field opacity-0">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-error-red text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="form-field opacity-0">
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClass('phone')}
                />
              </div>
              <div className="form-field opacity-0">
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className={inputClass('subject')}
                />
                {errors.subject && <p className="text-error-red text-xs mt-1">{errors.subject}</p>}
              </div>
              <div className="form-field opacity-0">
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-error-red text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`form-field opacity-0 w-full py-3.5 font-oswald text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-success-green text-white border-2 border-success-green'
                    : status === 'error'
                    ? 'bg-error-red text-white border-2 border-error-red'
                    : 'btn-primary'
                } ${status === 'submitting' ? 'animate-pulse' : ''}`}
              >
                {status === 'submitting' && 'SENDING...'}
                {status === 'success' && 'MESSAGE SENT ✓'}
                {status === 'error' && 'TRY AGAIN'}
                {status === 'idle' && 'SEND MESSAGE'}
              </button>
            </form>

            {/* Right: Info */}
            <div className="bg-near-black border border-white/10 p-8 md:p-10 space-y-8">
              <div className="info-item group opacity-0">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-crimson flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-oswald text-sm font-medium text-white uppercase tracking-widest group-hover:text-crimson transition-colors duration-300">
                      VISIT US
                    </h4>
                    <p className="font-inter text-sm text-light-gray leading-relaxed mt-2">
                      123 Fitness Avenue, Downtown District, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-item group opacity-0">
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-crimson flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-oswald text-sm font-medium text-white uppercase tracking-widest group-hover:text-crimson transition-colors duration-300">
                      CALL US
                    </h4>
                    <a href="tel:21255534863" className="font-inter text-sm text-light-gray mt-2 block hover:text-white transition-colors duration-300">
                      (212) 555-FITNESS
                    </a>
                  </div>
                </div>
              </div>

              <div className="info-item group opacity-0">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-crimson flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-oswald text-sm font-medium text-white uppercase tracking-widest group-hover:text-crimson transition-colors duration-300">
                      EMAIL US
                    </h4>
                    <a href="mailto:info@fitnesspulsegym.com" className="font-inter text-sm text-light-gray mt-2 block hover:text-white transition-colors duration-300">
                      info@fitnesspulsegym.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="info-item group opacity-0">
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-crimson flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-oswald text-sm font-medium text-white uppercase tracking-widest group-hover:text-crimson transition-colors duration-300">
                      OPENING HOURS
                    </h4>
                    <div className="font-inter text-sm text-light-gray mt-2 space-y-1">
                      <p>Monday – Friday: 5:00 AM – 10:00 PM</p>
                      <p>Saturday: 6:00 AM – 9:00 PM</p>
                      <p>Sunday: 7:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="info-item opacity-0 relative h-[200px] border border-white/10 overflow-hidden group cursor-pointer">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location"
                />
                <div className="absolute inset-0 bg-crimson/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="font-oswald text-xs text-white uppercase tracking-widest">Open in Google Maps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer bg-near-black py-16 md:py-20 pb-8 md:pb-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="footer-col opacity-0">
              <span className="font-oswald text-lg font-bold tracking-widest uppercase text-white">
                FITNESS <span className="font-bold">PULSE</span>
              </span>
              <p className="font-inter text-sm text-light-gray leading-relaxed mt-4 max-w-[280px]">
                The city's premier fitness destination since 2009. Transform your body, transform your life.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-col opacity-0">
              <h4 className="font-oswald text-sm font-semibold text-white uppercase tracking-widest">
                QUICK LINKS
              </h4>
              <nav className="mt-4 space-y-3">
                {['Home', 'About Us', 'Workouts', 'Gallery', 'Trainers', 'Pricing', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const href = link === 'About Us' ? '#about' : link === 'Home' ? '#hero' : `#${link.toLowerCase()}`;
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block font-inter text-sm text-light-gray hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="footer-col opacity-0">
              <h4 className="font-oswald text-sm font-semibold text-white uppercase tracking-widest">
                CONTACT
              </h4>
              <div className="mt-4 space-y-3">
                <p className="font-inter text-sm text-light-gray">
                  123 Fitness Avenue, NY 10001
                </p>
                <p className="font-inter text-sm text-light-gray">
                  (212) 555-FITNESS
                </p>
                <p className="font-inter text-sm text-light-gray">
                  info@fitnesspulsegym.com
                </p>
              </div>
            </div>

            {/* Social & Hours */}
            <div className="footer-col opacity-0">
              <h4 className="font-oswald text-sm font-semibold text-white uppercase tracking-widest">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-4 mt-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-light-gray hover:text-crimson transition-colors duration-300"
                    aria-label="Social link"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
              <div className="mt-6 space-y-1">
                <p className="font-inter text-[13px] text-light-gray">
                  Mon – Fri: 5AM – 10PM
                </p>
                <p className="font-inter text-[13px] text-light-gray">
                  Sat: 6AM – 9PM
                </p>
                <p className="font-inter text-[13px] text-light-gray">
                  Sun: 7AM – 6PM
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-6 border-t border-medium-gray/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-[13px] text-white/40">
              © 2025 Fitness Pulse Gym. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-inter text-[13px] text-white/40 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="font-inter text-[13px] text-white/40 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
