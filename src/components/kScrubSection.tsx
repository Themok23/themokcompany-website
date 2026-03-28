'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  { label: 'Strategy', desc: 'Vision to roadmap' },
  { label: 'Technology', desc: 'Architecture to deployment' },
  { label: 'Innovation', desc: 'Ideas to products' },
  { label: 'Consulting', desc: 'Insight to transformation' },
];

export default function KScrubSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainIconRef = useRef<HTMLImageElement>(null);
  const echoesRef = useRef<(HTMLImageElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !mainIconRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // ============================
      // PHASE 1: "The Helix Zoom"
      // Icon starts MASSIVE (you're inside it), zooms out with 3D rotation
      // ============================
      tl.fromTo(
        mainIconRef.current,
        {
          scale: 8,
          opacity: 0.06,
          rotation: -90,
          filter: 'blur(20px)',
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.inOut',
        },
        0
      );

      // Echo ghosts trail behind the main icon zoom
      echoesRef.current.forEach((echo, i) => {
        if (!echo) return;
        const delay = 0.1 + i * 0.15;
        const echoScale = 6 - i * 1.2;

        tl.fromTo(
          echo,
          {
            scale: echoScale,
            opacity: 0,
            rotation: -90 + i * 20,
            filter: 'blur(12px)',
          },
          {
            scale: 1.2 - i * 0.15,
            opacity: 0.12 - i * 0.025,
            rotation: i * 30,
            filter: 'blur(4px)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          delay
        );

        // Fade echoes out as main icon settles
        tl.to(echo, {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: 'power1.in',
        }, 1.5);
      });

      // ============================
      // PHASE 2: "The Lock-In"
      // Icon reaches center, energy burst + rings expand
      // ============================

      // Energy burst flash
      if (burstRef.current) {
        tl.fromTo(
          burstRef.current,
          { scale: 0, opacity: 0 },
          { scale: 3, opacity: 0.7, duration: 0.3, ease: 'power2.out' },
          1.4
        );
        tl.to(burstRef.current, {
          scale: 6,
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out',
        }, 1.7);
      }

      // Concentric rings expand outward
      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        tl.fromTo(
          ring,
          { scale: 0, opacity: 0.6 },
          {
            scale: 3 + i * 1.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          1.5 + i * 0.12
        );
      });

      // Icon does a satisfying micro-bounce on lock
      tl.to(mainIconRef.current, {
        scale: 1.15,
        duration: 0.15,
        ease: 'power2.out',
      }, 1.5);
      tl.to(mainIconRef.current, {
        scale: 1,
        duration: 0.25,
        ease: 'elastic.out(1, 0.4)',
      }, 1.65);

      // ============================
      // PHASE 3: "The Reveal"
      // Heading + subtitle sweep in, icon lifts up
      // ============================

      // Icon shifts up to make room
      tl.to(mainIconRef.current, {
        y: '-18vh',
        scale: 0.7,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 2.0);

      // Heading clips in from below
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.5,
            ease: 'power3.out',
          },
          2.2
        );
      }

      // Subtitle fades in
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          2.5
        );
      }

      // Accent line draws across
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
          2.4
        );
      }

      // ============================
      // PHASE 4: "The Bloom"
      // Cards emerge outward from center, icon becomes watermark
      // ============================

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Cards start stacked at center, fan out to their grid positions
        const angles = [-1, 1, -1, 1];
        const xOffsets = [-1, 1, -1, 1];
        const yOffsets = [-1, -1, 1, 1];

        tl.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.3,
            x: 0,
            y: 0,
            rotation: angles[i] * 15,
          },
          {
            opacity: 1,
            scale: 1,
            x: xOffsets[i] * 0,
            y: yOffsets[i] * 0,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.4)',
          },
          2.8 + i * 0.1
        );
      });

      // Icon fades to rotating watermark
      tl.to(mainIconRef.current, {
        y: 0,
        scale: 2.5,
        opacity: 0.04,
        rotation: 180,
        duration: 1,
        ease: 'power1.inOut',
      }, 3.2);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#060810]"
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gradient-radial from-[#00C4AF]/8 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Energy burst (flash on lock-in) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
        <div
          ref={burstRef}
          className="w-24 h-24 rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(0,196,175,0.6) 0%, rgba(0,168,255,0.3) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Expanding rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => { ringRefs.current[i] = el; }}
            className="absolute w-20 h-20 rounded-full border opacity-0"
            style={{
              borderColor: i === 0 ? 'rgba(0,196,175,0.5)' : i === 1 ? 'rgba(0,168,255,0.35)' : 'rgba(45,212,191,0.2)',
              borderWidth: i === 0 ? '2px' : '1px',
            }}
          />
        ))}
      </div>

      {/* Echo ghost copies (trail behind main icon) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[8]">
        {[0, 1, 2, 3].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            ref={(el) => { echoesRef.current[i] = el; }}
            src="/mok-brand-icon.png"
            alt=""
            aria-hidden="true"
            width={200}
            height={340}
            className="absolute w-[200px] h-auto opacity-0 will-change-transform"
            style={{
              filter: `hue-rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main K Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mainIconRef}
          src="/mok-brand-icon.png"
          alt="MOK Brand Icon"
          width={260}
          height={440}
          className="w-[260px] h-auto will-change-transform drop-shadow-[0_0_60px_rgba(0,196,175,0.4)]"
        />
      </div>

      {/* Heading + subtitle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pt-24">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center opacity-0 font-heading"
        >
          What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">Build</span>
        </h2>

        <div
          ref={lineRef}
          className="w-24 h-[2px] bg-gradient-to-r from-[#00C4AF] to-[#00A8FF] mt-5 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        <p
          ref={subRef}
          className="text-lg text-muted mt-4 max-w-md text-center opacity-0"
        >
          End-to-end capability. Zero hand-offs.
        </p>
      </div>

      {/* Capability cards */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20 pb-16 sm:pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full px-6">
          {CAPABILITIES.map((cap, index) => (
            <div
              key={cap.label}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="opacity-0 pointer-events-auto group"
            >
              <div className="relative p-5 sm:p-6 rounded-xl bg-[#0D1117]/80 backdrop-blur-md border border-border/60 hover:border-[#00C4AF]/40 transition-all duration-300 cursor-default overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#00C4AF]/5 to-transparent pointer-events-none" />

                {/* Number accent */}
                <span className="absolute top-3 right-3 text-primary/15 text-4xl font-bold font-heading pointer-events-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-1 font-heading">
                    {cap.label}
                  </h3>
                  <p className="text-sm text-muted">{cap.desc}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00C4AF] to-[#00A8FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00C4AF]/20 animate-float"
            style={{
              left: `${10 + (i * 7.5) % 80}%`,
              top: `${15 + (i * 11.3) % 70}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3) * 1.5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
