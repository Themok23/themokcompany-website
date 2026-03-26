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
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const threeArmsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whyMokRef = useRef<HTMLDivElement>(null);
  const whyMokCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whoWeWorkRef = useRef<HTMLDivElement>(null);
  const workWithItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Section Animations
      const heroTimeline = gsap.timeline();

      // Staggered headline reveal
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

      // Subtext fade in
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

      // Animated gradient orb
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
          whoWeAreRef.current.querySelectorAll('h2, p, ul'),
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
              trigger: whoWeAreRef.current,
              start: 'top 70%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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

        // Cards stagger animation
        cardsRef.current.forEach((card) => {
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

        // Why Mok cards animation
        whyMokCardsRef.current.forEach((card, index) => {
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

        // Work with items animation
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

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated gradient orb background */}
        <div
          ref={orbRef}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1
            ref={heroHeadlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          >
            We Build What's Next.
          </h1>

          <p
            ref={heroSubtextRef}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            Strategic consultancy. Marketing innovation. Technology execution. All under one roof.
          </p>

          <div
            ref={heroCTARef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 cursor-pointer"
            >
              Explore Our Work
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              Start a Conversation
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
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          Strategy Without Execution Is Just Theory.
        </h2>

        <p className="text-lg text-white/70 mb-8 max-w-3xl">
          The Mok Company is a 360 degree consultancy built for the ambitious.
          We combine strategic clarity with operational discipline to drive real,
          measurable transformation. We don't just advise. We build. We implement.
          We scale.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li className="text-lg text-white/80 flex items-start gap-3">
            <span className="text-white font-bold mr-2">•</span>
            <span>Strategic clarity</span>
          </li>
          <li className="text-lg text-white/80 flex items-start gap-3">
            <span className="text-white font-bold mr-2">•</span>
            <span>Creative thinking</span>
          </li>
          <li className="text-lg text-white/80 flex items-start gap-3">
            <span className="text-white font-bold mr-2">•</span>
            <span>Marketing innovation</span>
          </li>
          <li className="text-lg text-white/80 flex items-start gap-3">
            <span className="text-white font-bold mr-2">•</span>
            <span>Operational execution</span>
          </li>
        </ul>
      </section>

      {/* THREE ARMS SECTION */}
      <section
        ref={threeArmsRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-center">
          Built for Complexity. Designed for Growth.
        </h2>

        <p className="text-lg text-white/60 text-center mb-16 max-w-2xl mx-auto">
          Three specialized divisions working in concert to solve every challenge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Management */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="p-8 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="mb-6">
              <Brain size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              The Mok Management
            </h3>
            <p className="text-white/70">
              360 Management & Marketing Consultancy
            </p>
          </div>

          {/* Card 2: Innovations */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="p-8 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="mb-6">
              <Rocket size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              The Mok Innovations
            </h3>
            <p className="text-white/70">
              Venture & Innovation Lab
            </p>
          </div>

          {/* Card 3: Technologies */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="p-8 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="mb-6">
              <Cog size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              The Mok Technologies
            </h3>
            <p className="text-white/70">
              Digital & Systems Execution
            </p>
          </div>
        </div>
      </section>

      {/* WHY MOK SECTION */}
      <section
        ref={whyMokRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-center">
          Built Different.
        </h2>

        <p className="text-lg text-white/70 text-center mb-16 max-w-3xl mx-auto">
          Most consultancies advise. Few execute. Even fewer build with their
          clients as true partners. We believe the work matters only when it
          moves the needle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            ref={(el) => {
              if (el) whyMokCardsRef.current[0] = el;
            }}
            className="p-8 rounded-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4">Creators at Heart</h3>
            <p className="text-white/70">
              We don't just think. We design, build, and ship. Every strategy
              comes with execution embedded.
            </p>
          </div>

          <div
            ref={(el) => {
              if (el) whyMokCardsRef.current[1] = el;
            }}
            className="p-8 rounded-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4">Operators by Discipline</h3>
            <p className="text-white/70">
              We understand constraints, timelines, and ROI. We move fast without
              breaking things.
            </p>
          </div>

          <div
            ref={(el) => {
              if (el) whyMokCardsRef.current[2] = el;
            }}
            className="p-8 rounded-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4">Partners by Commitment</h3>
            <p className="text-white/70">
              Your success is our success. We're invested in your growth and
              accountable for results.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH SECTION */}
      <section
        ref={whoWeWorkRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-center">
          For the Ambitious.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            'Scaling startups ready to break into new markets',
            'Established corporates navigating digital transformation',
            'Investment firms seeking operational excellence',
            'Multinationals entering emerging markets',
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) workWithItemsRef.current[index] = el;
              }}
              className="p-8 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4"
            >
              <div className="text-2xl font-bold text-white/40 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </div>
              <p className="text-lg text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section
        ref={finalCtaRef}
        className="py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-white/10"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Ready to Build What's Next?
        </h2>

        <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
          Let's talk about your ambitions, your challenges, and how we can help
          you move faster.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300 cursor-pointer"
        >
          Start a Conversation
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
