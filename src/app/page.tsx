'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const whoWeAreItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const threeArmsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const processCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whyMokRef = useRef<HTMLDivElement>(null);
  const whyMokItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whoWeWorkRef = useRef<HTMLDivElement>(null);
  const workWithItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline();

      // Hero headline reveal
      if (heroHeadlineRef.current) {
        heroTimeline.fromTo(
          heroHeadlineRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0
        );
      }

      // Hero subtext fade in
      if (heroSubtextRef.current) {
        heroTimeline.fromTo(
          heroSubtextRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.2
        );
      }

      // CTA buttons fade in
      if (heroCTARef.current) {
        heroTimeline.fromTo(
          heroCTARef.current.querySelectorAll('button, a'),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          },
          0.4
        );
      }

      // Animated gradient orb background
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: 30,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(orbRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }

      // Who We Are section
      if (whoWeAreRef.current) {
        gsap.fromTo(
          whoWeAreRef.current.querySelector('h2'),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whoWeAreRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          whoWeAreRef.current.querySelector('p'),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whoWeAreRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        whoWeAreItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                x: -20,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: whoWeAreRef.current,
                  start: 'top 60%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      }

      // Three Arms section
      if (threeArmsRef.current) {
        gsap.fromTo(
          threeArmsRef.current.querySelector('h2'),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: threeArmsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );

            // Hover lift effect
            const cardElement = card as HTMLElement;
            cardElement.addEventListener('mouseenter', () => {
              gsap.to(cardElement, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out',
              });
            });

            cardElement.addEventListener('mouseleave', () => {
              gsap.to(cardElement, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          }
        });
      }

      // Process Cards Section - Stagger Reveal Animation
      processCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Hover lift effect
          const cardElement = card as HTMLElement;
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              y: -8,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });

      // Parallax images in sections (subtle y movement on scroll)
      const parallaxElements = containerRef.current?.querySelectorAll('.parallax-image');
      if (parallaxElements) {
        parallaxElements.forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: 0 },
            {
              yPercent: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                markers: false,
              },
            }
          );
        });
      }

      // Why Mok section
      if (whyMokRef.current) {
        gsap.fromTo(
          whyMokRef.current.querySelector('h2'),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whyMokRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        whyMokItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: whyMokRef.current,
                  start: 'top 50%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      }

      // Who We Work With section
      if (whoWeWorkRef.current) {
        gsap.fromTo(
          whoWeWorkRef.current.querySelector('h2'),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whoWeWorkRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        workWithItemsRef.current.forEach((item) => {
          if (item) {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                x: -30,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      }

      // Final CTA section
      if (finalCtaRef.current) {
        gsap.fromTo(
          finalCtaRef.current.querySelectorAll('h2, p, button, a'),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: finalCtaRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const hero = getHomeHero();
  const whoWeAre = getHomeWhoWeAre();
  const arms = getHomeArms();
  const whyMok = getHomeWhyMok();
  const audience = getHomeAudience();
  const cta = getHomeCTA();

  return (
    <div
      ref={containerRef}
      className="bg-[#090B10] text-white overflow-hidden font-[family-name:var(--font-dm-sans)]"
    >

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated gradient orb background */}
        <div
          ref={orbRef}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-[#00C4AF]/20 to-[#00A8FF]/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1
            ref={heroHeadlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-[family-name:var(--font-sora)]"
          >
            {hero.title}
          </h1>

          <p
            ref={heroSubtextRef}
            className="text-lg sm:text-xl text-[#8A9BB0] max-w-2xl mx-auto mb-12"
          >
            {hero.subtitle}
          </p>

          <div
            ref={heroCTARef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={hero.ctas?.[0]?.href ?? "/contact"}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C4AF] text-[#111318] rounded-lg font-semibold hover:bg-[#00C4AF]/90 transition-colors duration-300"
            >
              {hero.ctas?.[0].label}
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href={hero.ctas?.[1]?.href ?? "/our-work"}
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#1F2733] rounded-lg font-semibold hover:bg-[#1A1D24] transition-colors duration-300"
            >
              {hero.ctas?.[1].label}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section
        ref={whoWeAreRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-sora)]">
          {whoWeAre.title}
        </h2>

        <p className="text-lg text-[#8A9BB0] mb-12 max-w-3xl leading-relaxed">
          {whoWeAre.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {whoWeAre?.items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) whoWeAreItemsRef.current[index] = el;
              }}
              className="pl-6 border-l-2 border-[#00C4AF]"
            >
              <p className="text-lg text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THREE ARMS SECTION */}
      <section
        ref={threeArmsRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-center font-[family-name:var(--font-sora)]">
          {arms.title}
        </h2>

        <p className="text-lg text-[#8A9BB0] text-center mb-16 max-w-2xl mx-auto">
          {arms.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Management */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="p-8 rounded-xl border-t-2 border-t-[#00C4AF] border border-[#1F2733] bg-[#1A1D24] hover:border-[#00C4AF] transition-all duration-300"
          >
            <div className="mb-6">
              <Brain size={40} className="text-[#00C4AF]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
              The Mok Management
            </h3>
            <p className="text-[#8A9BB0] mb-4">
              360 Management & Marketing Consultancy
            </p>
            <ul className="space-y-2 text-sm text-[#8A9BB0]">
              <li>Strategic planning</li>
              <li>Brand development</li>
              <li>Market research</li>
            </ul>
          </div>

          {/* Card 2: Innovations */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="p-8 rounded-xl border-t-2 border-t-[#00C4AF] border border-[#1F2733] bg-[#1A1D24] hover:border-[#00C4AF] transition-all duration-300"
          >
            <div className="mb-6">
              <Rocket size={40} className="text-[#00C4AF]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
              The Mok Innovations
            </h3>
            <p className="text-[#8A9BB0] mb-4">
              Venture & Innovation Lab
            </p>
            <ul className="space-y-2 text-sm text-[#8A9BB0]">
              <li>AI solutions</li>
              <li>Product development</li>
              <li>Market innovation</li>
            </ul>
          </div>

          {/* Card 3: Technologies */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="p-8 rounded-xl border-t-2 border-t-[#00C4AF] border border-[#1F2733] bg-[#1A1D24] hover:border-[#00C4AF] transition-all duration-300"
          >
            <div className="mb-6">
              <Cog size={40} className="text-[#00C4AF]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
              The Mok Technologies
            </h3>
            <p className="text-[#8A9BB0] mb-4">
              Digital & Systems Execution
            </p>
            <ul className="space-y-2 text-sm text-[#8A9BB0]">
              <li>Web development</li>
              <li>App development</li>
              <li>Infrastructure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OUR PROCESS SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-sora)]">
            Our Process
          </h2>
          <p className="text-lg text-[#8A9BB0] max-w-2xl mx-auto">
            From insight to execution, every step is intentional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Discovery */}
          <div
            ref={(el) => {
              if (el) processCardsRef.current[0] = el;
            }}
            className="relative p-8 rounded-xl bg-[#1A1D24]/80 backdrop-blur-sm border border-[#1F2733] hover:border-[#00C4AF]/60 hover:shadow-[0_0_30px_rgba(0,196,175,0.15)] transition-all duration-300 group"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-9xl font-bold text-[#00C4AF] font-[family-name:var(--font-sora)]">
                01
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <Search size={40} className="text-[#00C4AF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
                Discovery
              </h3>
              <p className="text-[#8A9BB0]">
                We start by understanding your world. Market, audience, competition.
              </p>
            </div>
          </div>

          {/* Card 2: Strategy */}
          <div
            ref={(el) => {
              if (el) processCardsRef.current[1] = el;
            }}
            className="relative p-8 rounded-xl bg-[#1A1D24]/80 backdrop-blur-sm border border-[#1F2733] hover:border-[#00C4AF]/60 hover:shadow-[0_0_30px_rgba(0,196,175,0.15)] transition-all duration-300 group"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-9xl font-bold text-[#00C4AF] font-[family-name:var(--font-sora)]">
                02
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <Map size={40} className="text-[#00C4AF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
                Strategy
              </h3>
              <p className="text-[#8A9BB0]">
                A clear roadmap built on data, not guesswork.
              </p>
            </div>
          </div>

          {/* Card 3: Execution */}
          <div
            ref={(el) => {
              if (el) processCardsRef.current[2] = el;
            }}
            className="relative p-8 rounded-xl bg-[#1A1D24]/80 backdrop-blur-sm border border-[#1F2733] hover:border-[#00C4AF]/60 hover:shadow-[0_0_30px_rgba(0,196,175,0.15)] transition-all duration-300 group"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-9xl font-bold text-[#00C4AF] font-[family-name:var(--font-sora)]">
                03
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <Wrench size={40} className="text-[#00C4AF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
                Execution
              </h3>
              <p className="text-[#8A9BB0]">
                Design, develop, deploy. We build what we plan.
              </p>
            </div>
          </div>

          {/* Card 4: Growth - Centered on second row */}
          <div
            ref={(el) => {
              if (el) processCardsRef.current[3] = el;
            }}
            className="relative p-8 rounded-xl bg-[#1A1D24]/80 backdrop-blur-sm border border-[#1F2733] hover:border-[#00C4AF]/60 hover:shadow-[0_0_30px_rgba(0,196,175,0.15)] transition-all duration-300 group md:col-start-1"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-9xl font-bold text-[#00C4AF] font-[family-name:var(--font-sora)]">
                04
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <TrendingUp size={40} className="text-[#00C4AF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
                Growth
              </h3>
              <p className="text-[#8A9BB0]">
                Measure, optimize, scale. The work never stops.
              </p>
            </div>
          </div>

          {/* Card 5: Innovation - Centered on second row */}
          <div
            ref={(el) => {
              if (el) processCardsRef.current[4] = el;
            }}
            className="relative p-8 rounded-xl bg-[#1A1D24]/80 backdrop-blur-sm border border-[#1F2733] hover:border-[#00C4AF]/60 hover:shadow-[0_0_30px_rgba(0,196,175,0.15)] transition-all duration-300 group md:col-start-2"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-9xl font-bold text-[#00C4AF] font-[family-name:var(--font-sora)]">
                05
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <Sparkles size={40} className="text-[#00C4AF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-sora)]">
                Innovation
              </h3>
              <p className="text-[#8A9BB0]">
                Push boundaries. Challenge norms. Build what's next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MOK SECTION */}
      <section
        ref={whyMokRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-center font-[family-name:var(--font-sora)]">
          {whyMok.title}
        </h2>

        <p className="text-lg text-[#8A9BB0] text-center mb-16 max-w-3xl mx-auto">
          {whyMok.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyMok?.items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) whyMokItemsRef.current[index] = el;
              }}
              className="p-8 rounded-xl bg-[#1A1D24] border border-[#1F2733]"
            >
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-sora)]">
                {item}
              </h3>
              <p className="text-[#8A9BB0]">
                {index === 0 &&
                  "We design, build, and ship. Strategy comes with execution embedded."}
                {index === 1 &&
                  "We understand constraints, timelines, and ROI. We move fast without breaking things."}
                {index === 2 &&
                  "Your success is our success. We're invested in your growth and accountable for results."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE WORK WITH SECTION */}
      <section
        ref={whoWeWorkRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-center font-[family-name:var(--font-sora)]">
          {audience.title}
        </h2>

        <p className="text-lg text-[#8A9BB0] text-center mb-16 max-w-3xl mx-auto">
          {audience.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audience?.items?.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) workWithItemsRef.current[index] = el;
              }}
              className="flex items-start gap-4"
            >
              <span className="text-[#00C4AF] font-bold text-xl mt-1">-</span>
              <p className="text-lg text-white pt-1">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section
        ref={finalCtaRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-[#1F2733]"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 font-[family-name:var(--font-sora)]">
          {cta.title}
        </h2>

        <p className="text-lg text-[#8A9BB0] mb-12 max-w-2xl mx-auto">
          {cta.subtitle}
        </p>

        <Link
          href={cta.ctas?.[0]?.href ?? "/contact"}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C4AF] text-[#111318] rounded-lg font-semibold hover:bg-[#00C4AF]/90 transition-colors duration-300"
        >
          {cta.ctas?.[0].label}
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
