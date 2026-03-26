'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface NebulaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface MousePos {
  x: number;
  y: number;
}

const STARFIELD_CONFIG = {
  desktop: 220,
  mobile: 100,
  minSize: 0.3,
  maxSize: 2.5,
  cursorGlowRadius: 200,
  cursorGlowLerpSpeed: 0.12,
};

const NEBULA_CONFIG = {
  particleCount: 14,
  minRadius: 120,
  maxRadius: 250,
  minOpacity: 0.015,
  maxOpacity: 0.055,
  driftSpeed: 0.15,
  pulseSpeed: 0.01,
};

const COLORS = {
  white: '#FFFFFF',
  blueWhite: '#E6F2FF',
  teal: '#00C4AF',
  cyan: '#00A8FF',
};

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulaRef = useRef<NebulaParticle[]>([]);
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });
  const mouseGlowRef = useRef<MousePos>({ x: 0, y: 0 });
  const animationIdRef = useRef<number>(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    contextRef.current = ctx;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initializeStars = () => {
      const starCount = window.innerWidth > 768 ? STARFIELD_CONFIG.desktop : STARFIELD_CONFIG.mobile;
      const stars: Star[] = [];
      const starColors = [COLORS.white, COLORS.blueWhite, COLORS.teal, COLORS.cyan];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (STARFIELD_CONFIG.maxSize - STARFIELD_CONFIG.minSize) + STARFIELD_CONFIG.minSize,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          baseOpacity: 0.3 + Math.random() * 0.7,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.015 + Math.random() * 0.02,
        });
      }

      starsRef.current = stars;
    };

    const initializeNebula = () => {
      const nebulas: NebulaParticle[] = [];
      const nebulaColors = [COLORS.teal, COLORS.cyan];

      for (let i = 0; i < NEBULA_CONFIG.particleCount; i++) {
        nebulas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          vy: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          radius: Math.random() * (NEBULA_CONFIG.maxRadius - NEBULA_CONFIG.minRadius) + NEBULA_CONFIG.minRadius,
          baseOpacity: Math.random() * (NEBULA_CONFIG.maxOpacity - NEBULA_CONFIG.minOpacity) + NEBULA_CONFIG.minOpacity,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: NEBULA_CONFIG.pulseSpeed + Math.random() * 0.005,
        });
      }

      nebulaRef.current = nebulas;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const drawNebulas = () => {
      const ctx = contextRef.current;
      if (!ctx) return;

      nebulaRef.current.forEach((nebula) => {
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        // Wrap around screen
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;

        nebula.pulsePhase += nebula.pulseSpeed;
        const pulseFactor = 0.7 + Math.sin(nebula.pulsePhase) * 0.3;
        const currentOpacity = nebula.baseOpacity * pulseFactor;

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
        const rgbColor = nebula.color === COLORS.teal ? '0, 196, 175' : '0, 168, 255';
        gradient.addColorStop(0, `rgba(${rgbColor}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${rgbColor}, ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${rgbColor}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(nebula.x - nebula.radius, nebula.y - nebula.radius, nebula.radius * 2, nebula.radius * 2);
      });
    };

    const drawStars = (cursorX: number, cursorY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = 0.5 + Math.sin(star.twinklePhase) * 0.5;
        let currentOpacity = star.baseOpacity * twinkleFactor;

        // Check if star is near cursor
        const dx = cursorX - star.x;
        const dy = cursorY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let currentSize = star.size;

        if (distance < STARFIELD_CONFIG.cursorGlowRadius) {
          const brightness = 1 - distance / STARFIELD_CONFIG.cursorGlowRadius;
          currentOpacity = Math.min(1, star.baseOpacity + brightness * 0.7);
          currentSize = star.size + brightness * 1.5;
        }

        // Convert hex color to rgb for dynamic opacity
        let rgbColor = '255, 255, 255';
        if (star.color === COLORS.blueWhite) rgbColor = '230, 242, 255';
        else if (star.color === COLORS.teal) rgbColor = '0, 196, 175';
        else if (star.color === COLORS.cyan) rgbColor = '0, 168, 255';

        ctx.fillStyle = `rgba(${rgbColor}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for nearby stars
        if (distance < STARFIELD_CONFIG.cursorGlowRadius) {
          const brightness = 1 - distance / STARFIELD_CONFIG.cursorGlowRadius;
          const glowOpacity = brightness * 0.3;

          // Outer glow
          const outerGlowGradient = ctx.createRadialGradient(star.x, star.y, currentSize / 2, star.x, star.y, currentSize * 3);
          outerGlowGradient.addColorStop(0, `rgba(${rgbColor}, ${glowOpacity})`);
          outerGlowGradient.addColorStop(1, `rgba(${rgbColor}, 0)`);
          ctx.fillStyle = outerGlowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize * 3, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.fillStyle = `rgba(${rgbColor}, ${Math.min(1, currentOpacity * 1.5)})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize / 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawCursorGlow = (cursorX: number, cursorY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, STARFIELD_CONFIG.cursorGlowRadius);
      gradient.addColorStop(0, 'rgba(0, 196, 175, 0.2)');
      gradient.addColorStop(0.3, 'rgba(0, 196, 175, 0.08)');
      gradient.addColorStop(0.7, 'rgba(0, 196, 175, 0.01)');
      gradient.addColorStop(1, 'rgba(0, 196, 175, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, STARFIELD_CONFIG.cursorGlowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      const ctx = contextRef.current;
      if (!ctx) return;

      // Clear canvas to transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseGlowRef.current.x = lerp(mouseGlowRef.current.x, mouseRef.current.x, STARFIELD_CONFIG.cursorGlowLerpSpeed);
      mouseGlowRef.current.y = lerp(mouseGlowRef.current.y, mouseRef.current.y, STARFIELD_CONFIG.cursorGlowLerpSpeed);

      drawNebulas();
      drawStars(mouseGlowRef.current.x, mouseGlowRef.current.y);
      drawCursorGlow(mouseGlowRef.current.x, mouseGlowRef.current.y);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      initializeStars();
      initializeNebula();
    };

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      initializeStars();
      initializeNebula();
      starsRef.current.forEach((star) => {
        let rgbColor = '255, 255, 255';
        if (star.color === COLORS.blueWhite) rgbColor = '230, 242, 255';
        else if (star.color === COLORS.teal) rgbColor = '0, 196, 175';
        else if (star.color === COLORS.cyan) rgbColor = '0, 168, 255';
        ctx.fillStyle = `rgba(${rgbColor}, ${star.baseOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    resizeCanvas();
    initializeStars();
    initializeNebula();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default CanvasBackground;
