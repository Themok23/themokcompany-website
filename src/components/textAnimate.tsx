'use client';

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationMode =
  | 'chars'       // Character-by-character stagger from bottom
  | 'words'       // Word-by-word reveal with stagger
  | 'scramble'    // Text decode/scramble effect
  | 'gradient'    // Gradient color sweep across text
  | 'wave';       // Wave motion through characters

interface TextAnimateProps {
  text: string;
  mode?: AnimationMode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  scrollTrigger?: boolean;
  triggerStart?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

function getRandomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export default function TextAnimate({
  text,
  mode = 'chars',
  tag: Tag = 'h2',
  className = '',
  scrollTrigger = false,
  triggerStart = 'top 75%',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  once = true,
}: TextAnimateProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into characters and words
  const { chars, words } = useMemo(() => {
    const wordsList = text.split(' ');
    const charsList: { char: string; wordIndex: number; charIndex: number }[] = [];

    wordsList.forEach((word, wIdx) => {
      for (let cIdx = 0; cIdx < word.length; cIdx++) {
        charsList.push({ char: word[cIdx], wordIndex: wIdx, charIndex: cIdx });
      }
      // Add space between words (except last)
      if (wIdx < wordsList.length - 1) {
        charsList.push({ char: '\u00A0', wordIndex: wIdx, charIndex: -1 });
      }
    });

    return { chars: charsList, words: wordsList };
  }, [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    const toggleActions = once ? 'play none none none' : 'play none none reverse';

    const ctx = gsap.context(() => {
      if (mode === 'chars') {
        const charEls = charsRef.current.filter(Boolean) as HTMLSpanElement[];

        // Set initial state
        gsap.set(charEls, {
          opacity: 0,
          y: 40,
          rotateX: -90,
        });

        const animConfig = {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger,
          ease: 'power3.out',
          delay,
        };

        if (scrollTrigger) {
          gsap.to(charEls, {
            ...animConfig,
            scrollTrigger: {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions,
            },
          });
        } else {
          gsap.to(charEls, animConfig);
        }
      }

      if (mode === 'words') {
        const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

        gsap.set(wordEls, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
        });

        const animConfig = {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: duration * 1.2,
          stagger: stagger * 3,
          ease: 'power2.out',
          delay,
        };

        if (scrollTrigger) {
          gsap.to(wordEls, {
            ...animConfig,
            scrollTrigger: {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions,
            },
          });
        } else {
          gsap.to(wordEls, animConfig);
        }
      }

      if (mode === 'scramble') {
        const charEls = charsRef.current.filter(Boolean) as HTMLSpanElement[];
        const originalChars = chars.map(c => c.char);

        gsap.set(charEls, { opacity: 0 });

        const runScramble = () => {
          // First, fade all chars in with random text
          charEls.forEach((el, i) => {
            if (originalChars[i] === '\u00A0') {
              gsap.set(el, { opacity: 1 });
              return;
            }

            gsap.to(el, {
              opacity: 1,
              duration: 0.05,
              delay: delay + i * 0.02,
            });

            // Scramble cycle
            const scrambleDuration = 0.4 + Math.random() * 0.6;
            const startTime = delay + i * stagger;

            let scrambleInterval: ReturnType<typeof setInterval>;
            const timeout1 = setTimeout(() => {
              scrambleInterval = setInterval(() => {
                el.textContent = getRandomChar();
              }, 40);
            }, startTime * 1000);

            // Settle to real character
            const timeout2 = setTimeout(() => {
              clearInterval(scrambleInterval);
              el.textContent = originalChars[i];

              gsap.fromTo(el,
                { color: '#00C4AF' },
                { color: '', duration: 0.5, ease: 'power2.out' }
              );
            }, (startTime + scrambleDuration) * 1000);

            // Store cleanup refs
            (el as unknown as Record<string, unknown>).__scrambleTimeout1 = timeout1;
            (el as unknown as Record<string, unknown>).__scrambleTimeout2 = timeout2;
            (el as unknown as Record<string, unknown>).__scrambleInterval = scrambleInterval!;
          });
        };

        if (scrollTrigger) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: triggerStart,
            onEnter: runScramble,
            once: true,
          });
        } else {
          runScramble();
        }
      }

      if (mode === 'gradient') {
        const charEls = charsRef.current.filter(Boolean) as HTMLSpanElement[];

        gsap.set(charEls, { opacity: 0.15 });

        const animConfig = {
          opacity: 1,
          duration: duration * 0.5,
          stagger: stagger * 0.8,
          ease: 'power1.out',
          delay,
        };

        if (scrollTrigger) {
          gsap.to(charEls, {
            ...animConfig,
            scrollTrigger: {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions: 'play none none none',
            },
          });
        } else {
          gsap.to(charEls, animConfig);
        }
      }

      if (mode === 'wave') {
        const charEls = charsRef.current.filter(Boolean) as HTMLSpanElement[];

        gsap.set(charEls, { opacity: 0, y: 20 });

        const animConfig = {
          opacity: 1,
          y: 0,
          duration: duration * 0.6,
          stagger: {
            each: stagger * 0.8,
            from: 'start' as const,
          },
          ease: 'elastic.out(1, 0.5)',
          delay,
        };

        if (scrollTrigger) {
          gsap.to(charEls, {
            ...animConfig,
            scrollTrigger: {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions,
            },
          });
        } else {
          gsap.to(charEls, animConfig);
        }
      }
    }, containerRef);

    return () => {
      // Clean up scramble timeouts
      if (mode === 'scramble') {
        charsRef.current.forEach((el) => {
          if (!el) return;
          const r = el as unknown as Record<string, unknown>;
          if (r.__scrambleTimeout1) clearTimeout(r.__scrambleTimeout1 as ReturnType<typeof setTimeout>);
          if (r.__scrambleTimeout2) clearTimeout(r.__scrambleTimeout2 as ReturnType<typeof setTimeout>);
          if (r.__scrambleInterval) clearInterval(r.__scrambleInterval as ReturnType<typeof setInterval>);
        });
      }
      ctx.revert();
    };
  }, [mode, text, scrollTrigger, triggerStart, delay, duration, stagger, once, chars]);

  // Render based on mode
  const useWords = mode === 'words';

  const content = useWords ? (
    words.map((word, wIdx) => (
      <span
        key={`w-${wIdx}`}
        ref={(el) => { wordsRef.current[wIdx] = el; }}
        className="inline-block will-change-transform"
        style={{ marginRight: wIdx < words.length - 1 ? '0.3em' : 0 }}
      >
        {word}
      </span>
    ))
  ) : (
    chars.map((item, idx) => (
      <span
        key={`c-${idx}`}
        ref={(el) => { charsRef.current[idx] = el; }}
        className="inline-block will-change-transform"
        style={{
          perspective: '600px',
          transformOrigin: 'center bottom',
        }}
      >
        {item.char}
      </span>
    ))
  );

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} overflow-hidden`}
      style={{ perspective: '1000px' }}
    >
      {content}
    </Tag>
  );
}
