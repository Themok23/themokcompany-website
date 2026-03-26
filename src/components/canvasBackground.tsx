'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  baseOpacity: number;
  isTeal: boolean;
}

interface MousePos {
  x: number;
  y: number;
}

const PARTICLE_CONFIG = {
  desktop: 80,
  mobile: 40,
  size: 1.5,
  maxOpacity: 0.1,
  minOpacity: 0.05,
  connectionDistance: 150,
  drift: 0.3,
  spotlightRadius: 350,
  spotlightIntensity: 0.8,
  glowLerpSpeed: 0.1,
};

const COLORS = {
  background: '#090B10',
  teal: '#00C4AF',
  cyan: '#00A8FF',
};

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseGlowRef = useRef<MousePos>({ x: 0, y: 0 });
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const mouseHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

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

    const initializeParticles = () => {
      const particleCount = window.innerWidth > 768 ? PARTICLE_CONFIG.desktop : PARTICLE_CONFIG.mobile;
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * (PARTICLE_CONFIG.maxOpacity - PARTICLE_CONFIG.minOpacity) + PARTICLE_CONFIG.minOpacity,
          baseOpacity: Math.random() * (PARTICLE_CONFIG.maxOpacity - PARTICLE_CONFIG.minOpacity) + PARTICLE_CONFIG.minOpacity,
          isTeal: Math.random() > 0.5,
        });
      }

      particlesRef.current = particles;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getParticleOpacity = (particle: Particle, spotlightX: number, spotlightY: number): number => {
      const dx = spotlightX - particle.x;
      const dy = spotlightY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PARTICLE_CONFIG.spotlightRadius) {
        return particle.baseOpacity * 0.3;
      }

      const falloff = 1 - distance / PARTICLE_CONFIG.spotlightRadius;
      const brightOpacity = Math.min(0.6, particle.baseOpacity + 0.4 * falloff);
      const dimOpacity = particle.baseOpacity * 0.3;

      return lerp(dimOpacity, brightOpacity, falloff);
    };

    const drawParticles = (spotlightX: number, spotlightY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        particle.vx += (Math.random() - 0.5) * PARTICLE_CONFIG.drift;
        particle.vy += (Math.random() - 0.5) * PARTICLE_CONFIG.drift;

        particle.vx *= 0.98;
        particle.vy *= 0.98;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const targetOpacity = getParticleOpacity(particle, spotlightX, spotlightY);
        particle.opacity = lerp(particle.opacity, targetOpacity, 0.1);

        if (particle.isTeal) {
          ctx.fillStyle = `rgba(0, 196, 175, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_CONFIG.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const getConnectionOpacity = (distance: number, spotlightX: number, spotlightY: number, x1: number, y1: number, x2: number, y2: number): number => {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      const dx = spotlightX - midX;
      const dy = spotlightY - midY;
      const distToSpotlight = Math.sqrt(dx * dx + dy * dy);

      if (distToSpotlight > PARTICLE_CONFIG.spotlightRadius) {
        return 0;
      }

      const falloff = 1 - distToSpotlight / PARTICLE_CONFIG.spotlightRadius;
      const baseOpacity = (1 - distance / PARTICLE_CONFIG.connectionDistance) * 0.3;

      return baseOpacity * falloff * falloff;
    };

    const drawConnections = (spotlightX: number, spotlightY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < PARTICLE_CONFIG.connectionDistance) {
            const opacity = getConnectionOpacity(distance, spotlightX, spotlightY, particles[i].x, particles[i].y, particles[j].x, particles[j].y);

            if (opacity > 0.001) {
              ctx.strokeStyle = `rgba(0, 196, 175, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const drawSpotlight = (spotlightX: number, spotlightY: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const gradient = ctx.createRadialGradient(spotlightX, spotlightY, 0, spotlightX, spotlightY, PARTICLE_CONFIG.spotlightRadius);

      gradient.addColorStop(0, 'rgba(0, 196, 175, 0.3)');
      gradient.addColorStop(0.4, 'rgba(0, 196, 175, 0.15)');
      gradient.addColorStop(0.7, 'rgba(0, 196, 175, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 196, 175, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(spotlightX - PARTICLE_CONFIG.spotlightRadius, spotlightY - PARTICLE_CONFIG.spotlightRadius, PARTICLE_CONFIG.spotlightRadius * 2, PARTICLE_CONFIG.spotlightRadius * 2);
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouseGlowRef.current.x = lerp(mouseGlowRef.current.x, mouseRef.current.x, PARTICLE_CONFIG.glowLerpSpeed);
      mouseGlowRef.current.y = lerp(mouseGlowRef.current.y, mouseRef.current.y, PARTICLE_CONFIG.glowLerpSpeed);

      drawParticles(mouseGlowRef.current.x, mouseGlowRef.current.y);
      drawConnections(mouseGlowRef.current.x, mouseGlowRef.current.y);
      drawSpotlight(mouseGlowRef.current.x, mouseGlowRef.current.y);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      particlesRef.current.forEach((particle) => {
        particle.y += scrollRef.current * 0.02;
      });
    };

    const handleResize = () => {
      resizeCanvas();
      initializeParticles();
    };

    if (prefersReducedMotion) {
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      initializeParticles();
      particlesRef.current.forEach((particle) => {
        if (particle.isTeal) {
          ctx.fillStyle = `rgba(0, 196, 175, ${particle.baseOpacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.baseOpacity})`;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_CONFIG.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    resizeCanvas();
    initializeParticles();

    resizeHandlerRef.current = handleResize;
    mouseHandlerRef.current = handleMouseMove;
    scrollHandlerRef.current = handleScroll;

    window.addEventListener('resize', resizeHandlerRef.current);
    window.addEventListener('mousemove', mouseHandlerRef.current);
    window.addEventListener('scroll', scrollHandlerRef.current);

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
      }
      if (mouseHandlerRef.current) {
        window.removeEventListener('mousemove', mouseHandlerRef.current);
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
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
