'use client';

import { useEffect, useRef } from 'react';

interface Star {
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  depth: number;
  glowSize: number;
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
  depth: number;
}

interface MousePos {
  x: number;
  y: number;
}

const STARFIELD_CONFIG = {
  desktop: 280,
  mobile: 120,
  minSize: 0.3,
  maxSize: 3,
  cursorGlowRadius: 250,
  cursorGlowLerpSpeed: 0.12,
  scrollParallaxStrength: 0.5,
  mouseParallaxStrength: 0.02,
};

const NEBULA_CONFIG = {
  particleCount: 16,
  minRadius: 150,
  maxRadius: 350,
  minOpacity: 0.02,
  maxOpacity: 0.06,
  driftSpeed: 0.12,
  pulseSpeed: 0.01,
};

const COLORS = {
  white: '#FFFFFF',
  blueWhite: '#E6F2FF',
  teal: '#00C4AF',
  cyan: '#00A8FF',
};

function hexToRgb(hex: string): string {
  if (hex === COLORS.white) return '255, 255, 255';
  if (hex === COLORS.blueWhite) return '230, 242, 255';
  if (hex === COLORS.teal) return '0, 196, 175';
  if (hex === COLORS.cyan) return '0, 168, 255';
  return '255, 255, 255';
}

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulaRef = useRef<NebulaParticle[]>([]);
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });
  const mouseGlowRef = useRef<MousePos>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);
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
      const starColors = [COLORS.white, COLORS.white, COLORS.blueWhite, COLORS.teal, COLORS.cyan];

      for (let i = 0; i < starCount; i++) {
        const depth = Math.random();
        const isBright = depth > 0.7;
        const size = isBright
          ? 1.2 + depth * (STARFIELD_CONFIG.maxSize - 1.2)
          : STARFIELD_CONFIG.minSize + Math.random() * 1;

        stars.push({
          baseX: Math.random() * canvas.width * 1.4 - canvas.width * 0.2,
          baseY: Math.random() * canvas.height * 1.4 - canvas.height * 0.2,
          size,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          baseOpacity: 0.15 + depth * 0.75,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          depth,
          glowSize: isBright ? size * 4 + Math.random() * 6 : size * 2,
        });
      }

      starsRef.current = stars;
    };

    const initializeNebula = () => {
      const nebulas: NebulaParticle[] = [];
      const nebulaColors = [COLORS.teal, COLORS.cyan];

      for (let i = 0; i < NEBULA_CONFIG.particleCount; i++) {
        const depth = 0.2 + Math.random() * 0.6;
        nebulas.push({
          x: Math.random() * canvas.width * 1.2 - canvas.width * 0.1,
          y: Math.random() * canvas.height * 1.2 - canvas.height * 0.1,
          vx: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          vy: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          radius: Math.random() * (NEBULA_CONFIG.maxRadius - NEBULA_CONFIG.minRadius) + NEBULA_CONFIG.minRadius,
          baseOpacity: Math.random() * (NEBULA_CONFIG.maxOpacity - NEBULA_CONFIG.minOpacity) + NEBULA_CONFIG.minOpacity,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: NEBULA_CONFIG.pulseSpeed + Math.random() * 0.005,
          depth,
        });
      }

      nebulaRef.current = nebulas;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getParallaxOffset = (depth: number): { x: number; y: number } => {
      const scrollY = scrollRef.current;
      const mouseOffsetX = (mouseGlowRef.current.x - canvas.width / 2) * STARFIELD_CONFIG.mouseParallaxStrength;
      const mouseOffsetY = (mouseGlowRef.current.y - canvas.height / 2) * STARFIELD_CONFIG.mouseParallaxStrength;

      const parallaxFactor = depth * STARFIELD_CONFIG.scrollParallaxStrength;
      const yOffset = -scrollY * parallaxFactor;
      const xOffset = mouseOffsetX * depth;
      const yMouseOffset = mouseOffsetY * depth;

      return {
        x: xOffset,
        y: yOffset + yMouseOffset,
      };
    };

    const drawNebulas = () => {
      const ctx = contextRef.current;
      if (!ctx) return;

      nebulaRef.current.forEach((nebula) => {
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        if (nebula.x < -nebula.radius * 2) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius * 2) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius * 2) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius * 2) nebula.y = -nebula.radius;

        nebula.pulsePhase += nebula.pulseSpeed;
        const pulseFactor = 0.6 + Math.sin(nebula.pulsePhase) * 0.4;
        const currentOpacity = nebula.baseOpacity * pulseFactor;

        const offset = getParallaxOffset(nebula.depth);
        const drawX = nebula.x + offset.x;
        const drawY = nebula.y + offset.y;

        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, nebula.radius);
        const rgbColor = hexToRgb(nebula.color);
        gradient.addColorStop(0, `rgba(${rgbColor}, ${currentOpacity})`);
        gradient.addColorStop(0.3, `rgba(${rgbColor}, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${rgbColor}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          drawX - nebula.radius,
          drawY - nebula.radius,
          nebula.radius * 2,
          nebula.radius * 2
        );
      });
    };

    const drawStars = (cursorX: number, cursorY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;

        const twinkleFactor = 0.4 + Math.sin(star.twinklePhase) * 0.6;
        let currentOpacity = star.baseOpacity * twinkleFactor;

        const offset = getParallaxOffset(star.depth);
        const drawX = star.baseX + offset.x;
        const drawY = star.baseY + offset.y;

        if (
          drawX < -20 ||
          drawX > canvas.width + 20 ||
          drawY < -20 ||
          drawY > canvas.height + 20
        ) {
          return;
        }

        const dx = cursorX - drawX;
        const dy = cursorY - drawY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let currentSize = star.size;
        let cursorBoost = 0;

        if (distance < STARFIELD_CONFIG.cursorGlowRadius) {
          cursorBoost = 1 - distance / STARFIELD_CONFIG.cursorGlowRadius;
          currentOpacity = Math.min(1, currentOpacity + cursorBoost * 0.5);
          currentSize = star.size + cursorBoost * 2;
        }

        const rgbColor = hexToRgb(star.color);

        // ALWAYS draw glow halo for visible stars
        if (star.size > 0.8 || currentOpacity > 0.3) {
          const glowRadius = star.glowSize * (0.7 + twinkleFactor * 0.5);
          const glowOpacity = currentOpacity * 0.15;

          const glowGrad = ctx.createRadialGradient(
            drawX, drawY, currentSize * 0.3,
            drawX, drawY, glowRadius
          );
          glowGrad.addColorStop(0, `rgba(${rgbColor}, ${glowOpacity * 1.5})`);
          glowGrad.addColorStop(0.5, `rgba(${rgbColor}, ${glowOpacity * 0.4})`);
          glowGrad.addColorStop(1, `rgba(${rgbColor}, 0)`);

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = `rgba(${rgbColor}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Bright inner core for larger stars
        if (currentSize > 1.2) {
          ctx.fillStyle = `rgba(${rgbColor}, ${Math.min(1, currentOpacity * 1.4)})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentSize * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Extra glow ring near cursor
        if (cursorBoost > 0.2) {
          const extraGlowSize = currentSize * 5 * cursorBoost;
          const extraGrad = ctx.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, extraGlowSize
          );
          extraGrad.addColorStop(0, `rgba(${rgbColor}, ${cursorBoost * 0.25})`);
          extraGrad.addColorStop(1, `rgba(${rgbColor}, 0)`);
          ctx.fillStyle = extraGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, extraGlowSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawCursorGlow = (cursorX: number, cursorY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const gradient = ctx.createRadialGradient(
        cursorX, cursorY, 0,
        cursorX, cursorY, STARFIELD_CONFIG.cursorGlowRadius
      );
      gradient.addColorStop(0, 'rgba(0, 196, 175, 0.15)');
      gradient.addColorStop(0.3, 'rgba(0, 196, 175, 0.06)');
      gradient.addColorStop(0.7, 'rgba(0, 168, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 196, 175, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, STARFIELD_CONFIG.cursorGlowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      const ctx = contextRef.current;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseGlowRef.current.x = lerp(
        mouseGlowRef.current.x,
        mouseRef.current.x,
        STARFIELD_CONFIG.cursorGlowLerpSpeed
      );
      mouseGlowRef.current.y = lerp(
        mouseGlowRef.current.y,
        mouseRef.current.y,
        STARFIELD_CONFIG.cursorGlowLerpSpeed
      );

      drawNebulas();
      drawStars(mouseGlowRef.current.x, mouseGlowRef.current.y);
      drawCursorGlow(mouseGlowRef.current.x, mouseGlowRef.current.y);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleResize = () => {
      resizeCanvas();
      initializeStars();
      initializeNebula();
    };

    if (prefersReducedMotion) {
      resizeCanvas();
      initializeStars();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star) => {
        const rgb = hexToRgb(star.color);
        ctx.fillStyle = `rgba(${rgb}, ${star.baseOpacity})`;
        ctx.beginPath();
        ctx.arc(star.baseX, star.baseY, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    resizeCanvas();
    initializeStars();
    initializeNebula();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
