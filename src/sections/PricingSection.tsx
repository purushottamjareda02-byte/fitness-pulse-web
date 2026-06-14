import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeader from '@/components/SectionHeader';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  durations: { label: string; price: string; period: string; savings?: string }[];
  features: string[];
  featured?: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: 'BASIC MEMBERSHIP',
    durations: [
      { label: 'Monthly', price: '49', period: '/month' },
      { label: 'Quarterly', price: '129', period: '/quarter', savings: 'Save $18' },
      { label: 'Half-Yearly', price: '239', period: '/6 months', savings: 'Save $55' },
      { label: 'Annual', price: '449', period: '/year', savings: 'Save $139' },
    ],
    features: [
      'Full gym access (5 AM – 10 PM)',
      'Locker room & shower facilities',
      'Free fitness assessment',
      'Access to group classes',
      'Mobile app workout tracking',
    ],
    cta: 'JOIN NOW',
  },
  {
    name: 'PERSONAL TRAINING',
    featured: true,
    durations: [
      { label: '1 Month', price: '199', period: '/month' },
      { label: '3 Months', price: '549', period: '/3 months', savings: 'Save $48' },
      { label: '6 Months', price: '999', period: '/6 months', savings: 'Save $195' },
    ],
    features: [
      'Everything in Basic Membership',
      'Dedicated personal trainer',
      'Customized workout plan',
      'Nutrition guidance & meal planning',
      'Weekly progress tracking',
      'Priority booking for classes',
      'Body composition analysis',
    ],
    cta: 'START TRAINING',
  },
  {
    name: 'COUPLE PACKAGE',
    durations: [
      { label: 'Half-Yearly', price: '79', period: '/month per person' },
      { label: 'Annual', price: '69', period: '/month per person', savings: 'Save $120' },
    ],
    features: [
      'Everything in Basic Membership',
      '2 membership accounts',
      'Buddy workout sessions',
      'Couple fitness challenges',
      'Shared progress dashboard',
      '10% discount on merchandise',
    ],
    cta: 'JOIN AS A COUPLE',
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  const [activeTab, setActiveTab] = useState(0);
  const priceRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    const el = priceRef.current;
    if (el) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setActiveTab(index);
          gsap.to(el, { opacity: 1, duration: 0.15 });
        },
      });
    } else {
      setActiveTab(index);
    }
  };

  const current = plan.durations[activeTab];

  return (
    <div
      className={`relative bg-dark-gray p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
        plan.featured
          ? 'border-2 border-crimson'
          : 'border border-white/10 hover:border-crimson'
      }`}
    >
      {/* Featured Badge */}
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-crimson px-6 py-2">
          <span className="font-oswald text-[11px] font-semibold text-white uppercase tracking-widest">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Plan Name */}
      <p className="font-oswald text-sm font-medium text-light-gray uppercase tracking-widest">
        {plan.name}
      </p>

      {/* Duration Tabs */}
      <div className="flex flex-wrap gap-2 mt-6 border-b border-white/10 pb-4">
        {plan.durations.map((d, i) => (
          <button
            key={d.label}
            onClick={() => handleTabChange(i)}
            className={`font-inter text-[13px] font-medium uppercase pb-2 px-3 transition-all duration-300 ${
              i === activeTab
                ? 'text-white border-b-2 border-crimson'
                : 'text-light-gray border-b-2 border-transparent hover:text-white'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Price */}
      <div ref={priceRef} className="mt-8">
        <span className="font-oswald text-2xl font-normal text-white">$</span>
        <span className="font-oswald text-5xl font-bold text-white tracking-tight">
          {current.price}
        </span>
        <span className="font-inter text-sm text-light-gray ml-1">
          {current.period}
        </span>
        {current.savings && (
          <span className="block font-inter text-xs text-success-green mt-1">
            {current.savings}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={14} className="text-success-green mt-1 flex-shrink-0" />
            <span className="font-inter text-sm text-light-gray leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className={`w-full mt-8 py-3.5 font-oswald text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
          plan.featured
            ? 'btn-primary'
            : 'btn-secondary'
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.pricing-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    );

    // Feature list items stagger
    const lists = sectionRef.current.querySelectorAll('.pricing-card ul');
    lists.forEach((list) => {
      const items = list.querySelectorAll('li');
      gsap.fromTo(
        items,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="w-full bg-near-black py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <SectionHeader
          label="MEMBERSHIP PLANS"
          title="OUR PRICING"
          subtitle="Choose the plan that fits your goals. All memberships include full facility access and a complimentary fitness assessment."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {plans.map((plan) => (
            <div key={plan.name} className="pricing-card">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
