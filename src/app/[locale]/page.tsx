'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

import {
  Brain,
  Rocket,
  Cog,
  ArrowUpRight,
  ArrowRight,
  Search,
  Map,
  Wrench,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  getHomeHero,
  getHomeWhoWeAre,
  getHomeArms,
  getHomeWhyMok,
  getHomeAudience,
  getHomeCTA,
} from '@/content/home';
import { useLocale } from '@/i18n/useLocale';

gsap.registerPlugin(ScrollTrigger);

import ClientLogosCarousel from '@/components/clientLogosCarousel';
import TextAnimate from '@/components/textAnimate';
import CaseStudiesCarousel from '@/components/caseStudiesCarousel';
import VenturesShowcase from '@/components/venturesShowcase';

function animateCards(
  cardsArray: (HTMLDivElement | null)[],
  listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }>
) {
  cardsArray.forEach((card) => {
    if (card) {
      const el = card as HTMLElement;
      const mouseenterHandler = () => gsap.to(el, { y: -8, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      const mouseleaveHandler = () => gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      el.addEventListener('mouseenter', mouseenterHandler);
      el.addEventListener('mouseleave', mouseleaveHandler);
      listeners.push({ element: el, event: 'mouseenter', handler: mouseenterHandler });
      listeners.push({ element: el, event: 'mouseleave', handler: mouseleaveHandler });
    }
  });
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const whoWeAreItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whoWeAreImageRef = useRef<HTMLDivElement>(null);
  const threeArmsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);
  const processCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whyMokRef = useRef<HTMLDivElement>(null);
  const whyMokItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whoWeWorkRef = useRef<HTMLDivElement>(null);
  const workWithItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

      // ---- HERO ----
      const heroTimeline = gsap.timeline({ delay: 0.2 });

      if (heroSubtextRef.current) {
        heroTimeline.fromTo(
          heroSubtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.6
        );
      }

      if (heroCTARef.current) {
        heroTimeline.fromTo(
          heroCTARef.current.querySelectorAll('a'),
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
          0.8
        );
      }

      if (orbRef.current) {
        gsap.to(orbRef.current, { y: 30, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(orbRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
      }

      // ---- STATS BAR ----
      if (statsBarRef.current) {
        const statItems = statsBarRef.current.querySelectorAll('.stat-item');
        statItems.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: statsBarRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });
        // Animate the counter numbers
        const counters = statsBarRef.current.querySelectorAll('.stat-number');
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          gsap.fromTo(counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: { trigger: statsBarRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });
        // Animate the gradient lines
        const lines = statsBarRef.current.querySelectorAll('.stat-line');
        lines.forEach((line) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.2, ease: 'power2.out',
              scrollTrigger: { trigger: statsBarRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });
      }

      // ---- THREE ARMS DESC ----
      if (threeArmsRef.current) {
        const armsDesc = threeArmsRef.current.querySelector('.arms-desc');
        if (armsDesc) {
          gsap.fromTo(armsDesc,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: threeArmsRef.current, start: 'top 65%', toggleActions: 'play none none none' },
            }
          );
        }
      }

      // ---- PROCESS DESC ----
      if (processRef.current) {
        const processDesc = processRef.current.querySelector('.process-desc');
        if (processDesc) {
          gsap.fromTo(processDesc,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: processRef.current, start: 'top 70%', toggleActions: 'play none none none' },
            }
          );
        }
      }

      // ---- WHO WE ARE ----
      if (whoWeAreRef.current) {
        const whoP = whoWeAreRef.current.querySelector('.who-desc');

        if (whoP) {
          gsap.fromTo(whoP,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: whoWeAreRef.current, start: 'top 65%', toggleActions: 'play none none none' },
            }
          );
        }

        whoWeAreItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(item,
              { opacity: 0, x: -30 },
              {
                opacity: 1, x: 0, duration: 0.6, delay: index * 0.12, ease: 'power2.out',
                scrollTrigger: { trigger: whoWeAreRef.current, start: 'top 60%', toggleActions: 'play none none none' },
              }
            );
          }
        });
      }

      if (whoWeAreImageRef.current) {
        gsap.fromTo(
          whoWeAreImageRef.current,
          { yPercent: 10, opacity: 0, scale: 0.95 },
          {
            yPercent: -10, opacity: 1, scale: 1, ease: 'none',
            scrollTrigger: { trigger: whoWeAreImageRef.current, start: 'top bottom', end: 'bottom top', scrub: 3 },
          }
        );
      }

      // ---- THREE ARMS ----
      if (threeArmsRef.current) {
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(card,
              { opacity: 0, y: 50, scale: 0.9 },
              {
                opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
              }
            );
          }
        });
        animateCards(cardsRef.current, listeners);
      }

      // ---- PROCESS (one card at a time) ----
      processCardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        }
      });
      animateCards(processCardsRef.current, listeners);

      // ---- MULTI-SPEED PARALLAX SYSTEM ----
      // Images inside cards: medium speed
      const parallaxImages = containerRef.current?.querySelectorAll('.parallax-image');
      if (parallaxImages) {
        parallaxImages.forEach((el) => {
          gsap.fromTo(el,
            { yPercent: 0 },
            { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 3 } }
          );
        });
      }

      // Section headings: very slow parallax (creates depth between heading and content)
      const sectionHeadings = containerRef.current?.querySelectorAll('.parallax-heading');
      if (sectionHeadings) {
        sectionHeadings.forEach((el) => {
          gsap.fromTo(el,
            { y: 0 },
            { y: -12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 4 } }
          );
        });
      }

      // Number watermarks in process cards: fast parallax (creates layered feel)
      const watermarks = containerRef.current?.querySelectorAll('.parallax-watermark');
      if (watermarks) {
        watermarks.forEach((el) => {
          gsap.fromTo(el,
            { y: 20 },
            { y: -15, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 3 } }
          );
        });
      }

      // Decorative accents & gradient lines: slow opposite direction
      const accents = containerRef.current?.querySelectorAll('.parallax-accent');
      if (accents) {
        accents.forEach((el) => {
          gsap.fromTo(el,
            { x: -10 },
            { x: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 4 } }
          );
        });
      }

      // Icons in cards: subtle float effect on scroll
      const parallaxIcons = containerRef.current?.querySelectorAll('.parallax-icon');
      if (parallaxIcons) {
        parallaxIcons.forEach((el) => {
          gsap.fromTo(el,
            { y: 5, rotation: -3 },
            { y: -5, rotation: 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 3 } }
          );
        });
      }

      // Hero orb: fastest parallax - moves significantly more than content
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          yPercent: -60, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '30% top', scrub: 3 },
        });
      }

      // ---- WHY MOK ----
      if (whyMokRef.current) {
        whyMokItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(item,
              { opacity: 0, y: 50, scale: 0.9 },
              {
                opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: 'power2.out',
                scrollTrigger: { trigger: whyMokRef.current, start: 'top 55%', toggleActions: 'play none none none' },
              }
            );
          }
        });
      }

      // ---- WHY MOK DESC ----
      if (whyMokRef.current) {
        const whyDesc = whyMokRef.current.querySelector('.why-desc');
        if (whyDesc) {
          gsap.fromTo(whyDesc,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: whyMokRef.current, start: 'top 65%', toggleActions: 'play none none none' },
            }
          );
        }
      }

      // ---- WHO WE WORK WITH ----
      if (whoWeWorkRef.current) {
        workWithItemsRef.current.forEach((item) => {
          if (item) {
            gsap.fromTo(item,
              { opacity: 0, x: -30 },
              {
                opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
                scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none none' },
              }
            );
          }
        });
      }

      // ---- WHO WE WORK WITH DESC ----
      if (whoWeWorkRef.current) {
        const workDesc = whoWeWorkRef.current.querySelector('.work-desc');
        if (workDesc) {
          gsap.fromTo(workDesc,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: whoWeWorkRef.current, start: 'top 65%', toggleActions: 'play none none none' },
            }
          );
        }
      }

      // ---- FINAL CTA ----
      if (finalCtaRef.current) {
        gsap.fromTo(
          finalCtaRef.current.querySelectorAll('p, a'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: finalCtaRef.current, start: 'top 70%', toggleActions: 'play none none none' },
          }
        );
      }

      return () => {
        listeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const locale = useLocale();
  const hero = getHomeHero(locale);
  const whoWeAre = getHomeWhoWeAre(locale);
  const arms = getHomeArms(locale);
  const whyMok = getHomeWhyMok(locale);
  const audience = getHomeAudience(locale);
  const cta = getHomeCTA(locale);

  const whyMokDescriptions = [
    "We design, build, and ship. Strategy comes with execution embedded.",
    "We understand constraints, timelines, and ROI. We move fast without breaking things.",
    "Your success is our success. We're invested in your growth and accountable for results.",
  ];

  const whyMokImages = ['/images/strategy.jpg', '/images/team.jpg', '/images/office.jpg'];

  return (
    <div
      ref={containerRef}
      className="text-white overflow-x-clip font-body relative z-[1]"
    >
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          ref={orbRef}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-[#00C4AF]/15 to-[#00A8FF]/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Character-by-character hero headline */}
          <TextAnimate
            text={hero.title}
            mode="chars"
            tag="h1"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-heading"
            delay={0.3}
            duration={0.8}
            stagger={0.04}
          />

          <p
            ref={heroSubtextRef}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12"
          >
            {hero.subtitle}
          </p>

          <div
            ref={heroCTARef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={hero.ctas?.[0]?.href ?? "/contact"}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C4AF] text-[#111318] rounded-lg font-semibold hover:bg-[#00C4AF]/90 transition-colors duration-300 btn-glow"
            >
              {hero.ctas?.[0]?.label}
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href={hero.ctas?.[1]?.href ?? "/our-work"}
              className="inline-flex items-center gap-2 px-8 py-3 border border-border/80 rounded-lg font-semibold hover:bg-surface/40 backdrop-blur-sm transition-colors duration-300 btn-glow-outline"
            >
              {hero.ctas?.[1]?.label}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Animated Stats Counter Bar */}
      <div ref={statsBarRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Top gradient line */}
        <div className="stat-line absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00C4AF]/30 to-transparent origin-center" />

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#1F2733]/40">
          {[
            { value: 10, suffix: '+', label: 'Years Experience' },
            { value: 50, suffix: '+', label: 'Projects Delivered' },
            { value: 6, suffix: '', label: 'Industries Served' },
            { value: 98, suffix: '%', label: 'Client Retention' },
          ].map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center text-center px-4 md:px-8">
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="stat-number text-4xl sm:text-5xl font-bold text-primary font-heading tabular-nums"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-primary font-heading">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-sm text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom gradient line */}
        <div className="stat-line absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#1F2733]/40 to-transparent origin-center" />
      </div>

      {/* WHO WE ARE SECTION */}
      <section
        ref={whoWeAreRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Word-by-word scroll reveal */}
            <TextAnimate
              text={whoWeAre.title}
              mode="gradient"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 font-heading"
              scrollTrigger
              triggerStart="top 70%"
              duration={1.2}
              stagger={0.07}
            />

            <p className="who-desc text-lg text-muted mb-12 max-w-3xl leading-relaxed">
              {whoWeAre.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {whoWeAre?.items?.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => { if (el) whoWeAreItemsRef.current[index] = el; }}
                  className="pl-6 border-l-2 border-[#00C4AF]/60"
                >
                  <p className="text-lg text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={whoWeAreImageRef}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-[#060810]/30 backdrop-blur-sm"
          >
            <Image
              src="/images/team.jpg"
              alt="The Mok Company team"
              width={600}
              height={400}
              className="w-full h-80 lg:h-96 object-cover img-tint hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* THREE ARMS SECTION */}
      <section
        ref={threeArmsRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Gradient opacity sweep - matches "Our Process" heading below */}
        <TextAnimate
          text={arms.title}
          mode="gradient"
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center font-heading"
          scrollTrigger
          triggerStart="top 75%"
          duration={1.2}
          stagger={0.07}
        />

        <p className="arms-desc text-lg text-muted text-center mb-16 max-w-2xl mx-auto">
          {arms.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Brain, title: 'The Mok Management', sub: '360 Management & Marketing Consultancy', items: ['Brand strategy', 'Business transformation', 'Marketing architecture', 'Growth systems', 'Execution management'], img: '/images/consulting.jpg' },
            { icon: Rocket, title: 'The Mok Innovations', sub: 'Venture & Innovation Lab', items: ['New product development', 'Brand incubation', 'Innovation sprints', 'Go-to-market design'], img: '/images/innovation.jpg' },
            { icon: Cog, title: 'The Mok Technologies', sub: 'Digital & Systems Execution', items: ['Web & app platforms', 'AI integration', 'Digital ecosystems', 'Automation & infrastructure'], img: '/images/tech.jpg' },
          ].map((arm, index) => (
            <div
              key={arm.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="rounded-xl border-t-2 border-t-[#00C4AF] border border-border/60 bg-surface/60 backdrop-blur-sm hover:border-[#00C4AF]/60 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={arm.img}
                  alt={arm.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover img-tint parallax-image group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D24] to-transparent" />
              </div>

              <div className="p-8 pt-4">
                <div className="mb-4">
                  <arm.icon size={36} className="text-primary parallax-icon" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">
                  {arm.title}
                </h3>
                <p className="text-muted mb-4">{arm.sub}</p>
                <ul className="space-y-2 text-sm text-muted">
                  {arm.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROCESS SECTION */}
      <section ref={processRef} className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          {/* Gradient opacity sweep */}
          <TextAnimate
            text="Our Process"
            mode="gradient"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading"
            scrollTrigger
            triggerStart="top 75%"
            duration={1.2}
            stagger={0.07}
          />
          <p className="process-desc text-lg text-muted max-w-2xl mx-auto">
            From insight to execution, every step is intentional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { num: '01', icon: Search, title: 'Discovery', desc: 'We start by understanding your world. Market, audience, competition.' },
            { num: '02', icon: Map, title: 'Strategy', desc: 'A clear roadmap built on data, not guesswork.' },
            { num: '03', icon: Wrench, title: 'Execution', desc: 'Design, develop, deploy. We build what we plan.' },
            { num: '04', icon: TrendingUp, title: 'Growth', desc: 'Measure, optimize, scale. The work never stops.', colClass: 'md:col-start-1' },
            { num: '05', icon: Sparkles, title: 'Innovation', desc: "Push boundaries. Challenge norms. Build what's next.", colClass: 'md:col-start-2' },
          ].map((step, index) => (
            <div
              key={step.num}
              ref={(el) => { if (el) processCardsRef.current[index] = el; }}
              className={`relative p-8 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/60 hover:border-[#00C4AF]/40 hover:shadow-[0_0_30px_rgba(0,196,175,0.1)] transition-all duration-300 group ${step.colClass ?? ''}`}
            >
              <div className="parallax-watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="text-9xl font-bold text-primary font-heading">
                  {step.num}
                </span>
              </div>
              <div className="relative z-10">
                <div className="mb-6">
                  <step.icon size={40} className="text-primary parallax-icon" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">
                  {step.title}
                </h3>
                <p className="text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES HORIZONTAL SCROLL */}
      <CaseStudiesCarousel />

      {/* WHY MOK SECTION */}
      <section
        ref={whyMokRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Decorative gradient line */}
        <div className="parallax-accent absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00C4AF] to-transparent" />

        {/* Wave animation */}
        <TextAnimate
          text={whyMok.title}
          mode="gradient"
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center font-heading"
          scrollTrigger
          triggerStart="top 70%"
          duration={1.2}
          stagger={0.07}
        />

        <p className="why-desc text-lg text-muted text-center mb-16 max-w-3xl mx-auto">
          {whyMok.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyMok?.items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => { if (el) whyMokItemsRef.current[index] = el; }}
              className="relative rounded-xl bg-surface/60 backdrop-blur-sm border border-border/60 overflow-hidden group hover:border-[#00C4AF]/40 hover:shadow-[0_0_40px_rgba(0,196,175,0.08)] transition-all duration-500"
            >
              {/* Top accent bar */}
              <div className="parallax-accent h-[2px] w-full bg-gradient-to-r from-[#00C4AF] via-[#00A8FF] to-transparent" />

              {/* Floating number watermark */}
              <div className="parallax-watermark absolute top-4 right-4 z-10">
                <span className="text-6xl font-bold text-primary/[0.06] font-heading leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={whyMokImages[index]}
                  alt={item}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover img-tint parallax-image group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Gradient overlay with teal tint on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D24] via-[#1A1D24]/40 to-transparent group-hover:via-[#00C4AF]/5 transition-all duration-500" />
                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C4AF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8 pt-5">
                <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                  {item}
                </h3>
                <p className="text-muted leading-relaxed">{whyMokDescriptions[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE WORK WITH SECTION */}
      <section
        ref={whoWeWorkRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Character reveal */}
        <TextAnimate
          text={audience.title}
          mode="gradient"
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center font-heading"
          scrollTrigger
          triggerStart="top 70%"
          duration={1.2}
          stagger={0.07}
        />

        <p className="work-desc text-lg text-muted text-center mb-16 max-w-3xl mx-auto">
          {audience.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audience?.items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => { if (el) workWithItemsRef.current[index] = el; }}
              className="flex items-start gap-4"
            >
              <span className="text-primary font-bold text-xl mt-1">-</span>
              <p className="text-lg text-white pt-1">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT LOGOS CAROUSEL */}
      <ClientLogosCarousel />

      {/* VENTURES / SAAS PRODUCTS */}
      <VenturesShowcase />

      {/* FINAL CTA SECTION */}
      <section
        ref={finalCtaRef}
        className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-border/40"
      >
        {/* Words reveal for CTA */}
        <TextAnimate
          text={cta.title ?? "Ready to build what's next?"}
          mode="gradient"
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-heading"
          scrollTrigger
          triggerStart="top 70%"
          duration={1.2}
          stagger={0.07}
        />

        <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
          {cta.subtitle}
        </p>

        <Link
          href={cta.ctas?.[0]?.href ?? "/contact"}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C4AF] text-[#111318] rounded-lg font-semibold hover:bg-[#00C4AF]/90 transition-colors duration-300 btn-glow"
        >
          {cta.ctas?.[0]?.label}
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
