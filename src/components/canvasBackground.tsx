'use client';

import { useEffect, useRef } from 'react';

interface Star {
  baseX: number;
  baseY: number;
  // Smooth attraction offset - lerps toward target each frame
  attractX: number;
  attractY: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  depth: number;
  glowSize: number;
  // Center convergence - stars slowly drift toward center
  convergeX: number;
  convergeY: number;
  // Ambient drift - subtle constant movement
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftRadius: number;
  // Cursor convergence state
  convergeProgress: number; // 0 = free, 1 = fully converged
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
  desktop: 480,
  mobile: 220,
  minSize: 0.3,
  maxSize: 3.2,
  cursorGlowRadius: 300,
  // Passive hover attraction - small radius, but stars fully reach cursor
  cursorAttractionRadius: 80,
  cursorAttractionStrength: 0.95,
  cursorAttractionLerp: 0.06,
  cursorClarityRadius: 250,
  cursorGlowLerpSpeed: 0.14,
  scrollParallaxStrength: 0.5,
  mouseParallaxStrength: 0.02,
  // Cursor convergence - triggered by click-and-hold
  cursorConvergeDuration: 2.5,      // seconds to fully converge (2-3s max)
  cursorConvergeRadius: 280,        // wider region on click
  convergeFlashSpeed: 1.8,          // slower, elegant pulse
  convergeFlashSize: 35,            // flash particle size
  // Passive hover: few stars fully converge to cursor point
  passiveAttractionRadius: 80,      // tiny hover zone - only nearest stars
  passiveAttractionStrength: 0.95,  // stars fully reach cursor
  // Center convergence - forms a bright cluster at screen center
  convergenceStrength: 0.18,
  convergenceLerp: 0.003,
};

const NEBULA_CONFIG = {
  particleCount: 28,
  minRadius: 150,
  maxRadius: 400,
  minOpacity: 0.02,
  maxOpacity: 0.08,
  driftSpeed: 0.1,
  pulseSpeed: 0.008,
};

const COLORS = {
  white: '#FFFFFF',
  blueWhite: '#E6F2FF',
  teal: '#00C4AF',
  cyan: '#00A8FF',
};

const RGB_CACHE: Record<string, string> = {
  '#FFFFFF': '255, 255, 255',
  '#E6F2FF': '230, 242, 255',
  '#00C4AF': '0, 196, 175',
  '#00A8FF': '0, 168, 255',
};

function hexToRgb(hex: string): string {
  return RGB_CACHE[hex] ?? '255, 255, 255';
}

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulaRef = useRef<NebulaParticle[]>([]);
  const mouseRef = useRef<MousePos>({ x: -1000, y: -1000 });
  const mouseGlowRef = useRef<MousePos>({ x: -1000, y: -1000 });
  const scrollRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef = useRef<number>(1);
  const lastFrameTimeRef = useRef<number>(0);
  const mousePressedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    contextRef.current = ctx;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initializeStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const starCount = w > 768 ? STARFIELD_CONFIG.desktop : STARFIELD_CONFIG.mobile;
      const stars: Star[] = [];
      const starColors = [COLORS.white, COLORS.white, COLORS.blueWhite, COLORS.teal, COLORS.cyan];

      for (let i = 0; i < starCount; i++) {
        const depth = Math.random();
        const isBright = depth > 0.7;
        const size = isBright
          ? 1.2 + depth * (STARFIELD_CONFIG.maxSize - 1.2)
          : STARFIELD_CONFIG.minSize + Math.random() * 1;

        stars.push({
          baseX: Math.random() * w * 1.4 - w * 0.2,
          baseY: Math.random() * h * 1.4 - h * 0.2,
          attractX: 0,
          attractY: 0,
          size,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          baseOpacity: 0.15 + depth * 0.75,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.015 + Math.random() * 0.035,
          depth,
          glowSize: isBright ? size * 4 + Math.random() * 6 : size * 2,
          convergeX: 0,
          convergeY: 0,
          driftPhaseX: Math.random() * Math.PI * 2,
          driftPhaseY: Math.random() * Math.PI * 2,
          driftSpeedX: 0.003 + Math.random() * 0.006,
          driftSpeedY: 0.002 + Math.random() * 0.005,
          driftRadius: 1.5 + Math.random() * 3.5,
          convergeProgress: 0,
        });
      }

      starsRef.current = stars;
    };

    const initializeNebula = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nebulas: NebulaParticle[] = [];
      const nebulaColors = [COLORS.teal, COLORS.cyan];

      for (let i = 0; i < NEBULA_CONFIG.particleCount; i++) {
        const depth = 0.2 + Math.random() * 0.6;
        nebulas.push({
          x: Math.random() * w * 1.2 - w * 0.1,
          y: Math.random() * h * 1.2 - h * 0.1,
          vx: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          vy: (Math.random() - 0.5) * NEBULA_CONFIG.driftSpeed,
          radius: Math.random() * (NEBULA_CONFIG.maxRadius - NEBULA_CONFIG.minRadius) + NEBULA_CONFIG.minRadius,
          baseOpacity: Math.random() * (NEBULA_CONFIG.maxOpacity - NEBULA_CONFIG.minOpacity) + NEBULA_CONFIG.minOpacity,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: NEBULA_CONFIG.pulseSpeed + Math.random() * 0.004,
          depth,
        });
      }

      nebulaRef.current = nebulas;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getParallaxOffset = (depth: number): { x: number; y: number } => {
      const scrollY = scrollRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouseOffsetX = (mouseGlowRef.current.x - w / 2) * STARFIELD_CONFIG.mouseParallaxStrength;
      const mouseOffsetY = (mouseGlowRef.current.y - h / 2) * STARFIELD_CONFIG.mouseParallaxStrength;

      const parallaxFactor = depth * STARFIELD_CONFIG.scrollParallaxStrength;
      const yOffset = -scrollY * parallaxFactor;

      return {
        x: mouseOffsetX * depth,
        y: yOffset + mouseOffsetY * depth,
      };
    };

    const drawNebulas = () => {
      const c = contextRef.current;
      if (!c) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scroll-based glow intensifier: ramps up after scrolling past hero (~100vh)
      const scrollY = scrollRef.current;
      const heroHeight = h;
      const scrollGlow = Math.min(1, Math.max(0, (scrollY - heroHeight * 0.3) / (heroHeight * 0.7)));
      const glowMultiplier = 1 + scrollGlow * 1.8;

      for (let i = 0; i < nebulaRef.current.length; i++) {
        const nebula = nebulaRef.current[i];
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        if (nebula.x < -nebula.radius * 2) nebula.x = w + nebula.radius;
        if (nebula.x > w + nebula.radius * 2) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius * 2) nebula.y = h + nebula.radius;
        if (nebula.y > h + nebula.radius * 2) nebula.y = -nebula.radius;

        nebula.pulsePhase += nebula.pulseSpeed;
        const pulseFactor = 0.6 + Math.sin(nebula.pulsePhase) * 0.4;
        const currentOpacity = nebula.baseOpacity * pulseFactor * glowMultiplier;

        const offset = getParallaxOffset(nebula.depth);
        const drawX = nebula.x + offset.x;
        const drawY = nebula.y + offset.y;

        const gradient = c.createRadialGradient(drawX, drawY, 0, drawX, drawY, nebula.radius);
        const rgbColor = hexToRgb(nebula.color);
        gradient.addColorStop(0, `rgba(${rgbColor}, ${currentOpacity})`);
        gradient.addColorStop(0.3, `rgba(${rgbColor}, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${rgbColor}, 0)`);

        ctx.fillStyle = gradient;
        c.fillRect(drawX - nebula.radius, drawY - nebula.radius, nebula.radius * 2, nebula.radius * 2);
      }
    };

    const drawStars = (cursorX: number, cursorY: number) => {
      const c = contextRef.current;
      if (!c) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scroll-based star glow boost
      const scrollY = scrollRef.current;
      const heroH = h;
      const starScrollGlow = Math.min(1, Math.max(0, (scrollY - heroH * 0.3) / (heroH * 0.7)));
      const starGlowBoost = 1 + starScrollGlow * 0.6;
      const clarityR = STARFIELD_CONFIG.cursorClarityRadius;
      const attractR = STARFIELD_CONFIG.cursorAttractionRadius;
      const attractStr = STARFIELD_CONFIG.cursorAttractionStrength;
      const attractLerp = STARFIELD_CONFIG.cursorAttractionLerp;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];
        star.twinklePhase += star.twinkleSpeed;

        const twinkleFactor = 0.4 + Math.sin(star.twinklePhase) * 0.6;
        let currentOpacity = star.baseOpacity * twinkleFactor;

        const offset = getParallaxOffset(star.depth);

        // Ambient drift: subtle constant wandering motion
        star.driftPhaseX += star.driftSpeedX;
        star.driftPhaseY += star.driftSpeedY;
        const driftX = Math.sin(star.driftPhaseX) * star.driftRadius * star.depth;
        const driftY = Math.cos(star.driftPhaseY) * star.driftRadius * star.depth;

        // Center convergence: stars gently drift toward viewport center
        const centerX = w / 2;
        const centerY = h / 2;
        const towardCenterX = (centerX - star.baseX) * STARFIELD_CONFIG.convergenceStrength * star.depth;
        const towardCenterY = (centerY - star.baseY) * STARFIELD_CONFIG.convergenceStrength * star.depth;
        star.convergeX = lerp(star.convergeX, towardCenterX, STARFIELD_CONFIG.convergenceLerp);
        star.convergeY = lerp(star.convergeY, towardCenterY, STARFIELD_CONFIG.convergenceLerp);

        const nominalX = star.baseX + offset.x + star.convergeX + driftX;
        const nominalY = star.baseY + offset.y + star.convergeY + driftY;

        // Calculate distance from star's base position to cursor
        const dx = cursorX - nominalX;
        const dy = cursorY - nominalY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate target attraction offset
        let targetAttractX = 0;
        let targetAttractY = 0;

        if (distance < attractR && distance > 0) {
          // Stars within radius converge to cursor center point
          // Quadratic ease: closer stars snap in, edge stars drift gently
          const t = 1 - distance / attractR;
          // Pull = full distance * eased factor - stars actually reach the cursor
          targetAttractX = dx * t * t * attractStr;
          targetAttractY = dy * t * t * attractStr;
        }

        // Convergence pull: guide stars toward cursor on click
        if (star.convergeProgress > 0) {
          // Smooth ease-out curve: fast start, gentle finish
          const cp = 1 - Math.pow(1 - star.convergeProgress, 3);
          // Stars drift 92% of the way on click - tight cluster but still organic
          targetAttractX = targetAttractX * (1 - cp) + dx * 0.92 * cp;
          targetAttractY = targetAttractY * (1 - cp) + dy * 0.92 * cp;
        }

        // Smoothly lerp the attraction offset - gentle even during convergence
        const effectiveLerp = star.convergeProgress > 0 
          ? attractLerp + star.convergeProgress * 0.06  // ramps up during click convergence
          : attractLerp;
        star.attractX = lerp(star.attractX, targetAttractX, effectiveLerp);
        star.attractY = lerp(star.attractY, targetAttractY, effectiveLerp);

        // Snap to zero if very small (avoid lingering drift)
        if (Math.abs(star.attractX) < 0.01 && Math.abs(targetAttractX) === 0) star.attractX = 0;
        if (Math.abs(star.attractY) < 0.01 && Math.abs(targetAttractY) === 0) star.attractY = 0;

        const drawX = nominalX + star.attractX;
        const drawY = nominalY + star.attractY;

        // Cull offscreen stars
        if (drawX < -30 || drawX > w + 30 || drawY < -30 || drawY > h + 30) continue;

        // Convergence brightness boost - gentle ramp
        if (star.convergeProgress > 0.4) {
          const brightBoost = (star.convergeProgress - 0.4) / 0.6;
          currentOpacity = Math.min(1, currentOpacity + brightBoost * 0.35);
        }

        let currentSize = star.size;
        // Convergence size boost - subtle growth
        if (star.convergeProgress > 0.6) {
          const sizeBoost = (star.convergeProgress - 0.6) / 0.4;
          currentSize = star.size * (1 + sizeBoost * 0.8);
        }
        let blurFactor = 0;

        // Cursor clarity effect - sharp near cursor, blurry far away
        // Use actual drawn position for clarity
        const actualDx = cursorX - drawX;
        const actualDy = cursorY - drawY;
        const actualDist = Math.sqrt(actualDx * actualDx + actualDy * actualDy);

        if (actualDist < clarityR) {
          const clarityT = 1 - actualDist / clarityR;
          currentOpacity = Math.min(1, currentOpacity + clarityT * 0.6);
          currentSize = star.size + clarityT * 2.5;
          blurFactor = 0;
        } else {
          const distanceBeyond = Math.min((actualDist - clarityR) / 400, 1);
          blurFactor = distanceBeyond * 0.6;
          currentOpacity *= (1 - blurFactor * 0.3);
        }

        const rgbColor = hexToRgb(star.color);

        // Draw glow halo (intensifies on scroll)
        if (star.size > 0.6 || currentOpacity > 0.25) {
          const baseGlowRadius = star.glowSize * (0.7 + twinkleFactor * 0.5);
          const glowRadius = baseGlowRadius * (1 + blurFactor * 1.5) * (1 + starScrollGlow * 0.3);
          const glowOpacity = currentOpacity * (0.12 + blurFactor * 0.08) * starGlowBoost;

          const glowGrad = c.createRadialGradient(
            drawX, drawY, currentSize * 0.2,
            drawX, drawY, glowRadius
          );
          glowGrad.addColorStop(0, `rgba(${rgbColor}, ${glowOpacity * 1.5})`);
          glowGrad.addColorStop(0.4, `rgba(${rgbColor}, ${glowOpacity * 0.5})`);
          glowGrad.addColorStop(1, `rgba(${rgbColor}, 0)`);

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        if (blurFactor < 0.4) {
          ctx.fillStyle = `rgba(${rgbColor}, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentSize / 2, 0, Math.PI * 2);
          ctx.fill();

          if (currentSize > 1.2) {
            ctx.fillStyle = `rgba(${rgbColor}, ${Math.min(1, currentOpacity * 1.4)})`;
            ctx.beginPath();
            ctx.arc(drawX, drawY, currentSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          const softRadius = currentSize * (1 + blurFactor * 2);
          const softGrad = c.createRadialGradient(drawX, drawY, 0, drawX, drawY, softRadius);
          softGrad.addColorStop(0, `rgba(${rgbColor}, ${currentOpacity * 0.8})`);
          softGrad.addColorStop(0.5, `rgba(${rgbColor}, ${currentOpacity * 0.3})`);
          softGrad.addColorStop(1, `rgba(${rgbColor}, 0)`);
          ctx.fillStyle = softGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, softRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Extra glow ring near cursor
        if (actualDist < clarityR * 0.6) {
          const boostT = 1 - actualDist / (clarityR * 0.6);
          const extraGlowSize = currentSize * 5 * boostT;
          const extraGrad = c.createRadialGradient(drawX, drawY, 0, drawX, drawY, extraGlowSize);
          extraGrad.addColorStop(0, `rgba(${rgbColor}, ${boostT * 0.2})`);
          extraGrad.addColorStop(1, `rgba(${rgbColor}, 0)`);
          ctx.fillStyle = extraGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, extraGlowSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawCursorGlow = (cursorX: number, cursorY: number) => {
      const c = contextRef.current;
      if (!c) return;

      const r = STARFIELD_CONFIG.cursorGlowRadius;
      const gradient = c.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, r);
      gradient.addColorStop(0, 'rgba(0, 196, 175, 0.12)');
      gradient.addColorStop(0.25, 'rgba(0, 196, 175, 0.06)');
      gradient.addColorStop(0.6, 'rgba(0, 168, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 196, 175, 0)');

      c.fillStyle = gradient;
      c.beginPath();
      c.arc(cursorX, cursorY, r, 0, Math.PI * 2);
      c.fill();
    };

    // Central "super star" glow - where converging stars cluster
    const drawCenterStar = (w: number, h: number) => {
      const c = contextRef.current;
      if (!c) return;
      const cx = w / 2;
      const cy = h / 2;

      // Pulsing glow at center
      const time = Date.now() * 0.001;
      const pulse = 0.7 + Math.sin(time * 0.8) * 0.3;

      // Outer soft glow
      const outerR = 180 * pulse;
      const outerGrad = c.createRadialGradient(cx, cy, 0, cx, cy, outerR);
      outerGrad.addColorStop(0, 'rgba(0, 196, 175, 0.04)');
      outerGrad.addColorStop(0.3, 'rgba(0, 196, 175, 0.02)');
      outerGrad.addColorStop(0.6, 'rgba(0, 168, 255, 0.01)');
      outerGrad.addColorStop(1, 'rgba(0, 196, 175, 0)');
      c.fillStyle = outerGrad;
      c.beginPath();
      c.arc(cx, cy, outerR, 0, Math.PI * 2);
      c.fill();

      // Inner bright core
      const innerR = 40 * pulse;
      const innerGrad = c.createRadialGradient(cx, cy, 0, cx, cy, innerR);
      innerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      innerGrad.addColorStop(0.3, 'rgba(0, 196, 175, 0.04)');
      innerGrad.addColorStop(1, 'rgba(0, 196, 175, 0)');
      c.fillStyle = innerGrad;
      c.beginPath();
      c.arc(cx, cy, innerR, 0, Math.PI * 2);
      c.fill();

      // Tiny bright dot at dead center
      c.fillStyle = 'rgba(255, 255, 255, 0.12)';
      c.beginPath();
      c.arc(cx, cy, 2, 0, Math.PI * 2);
      c.fill();
    };

    const drawConvergeFlash = (cx: number, cy: number, convergence: number) => {
      const c = contextRef.current;
      if (!c || convergence < 0.1) return;

      const time = Date.now() * 0.001;
      const flashPulse = 0.5 + Math.sin(time * STARFIELD_CONFIG.convergeFlashSpeed * Math.PI * 2) * 0.5;
      const intensity = convergence * convergence; // ease-in curve
      const baseSize = STARFIELD_CONFIG.convergeFlashSize * intensity;
      const size = baseSize * (0.8 + flashPulse * 0.4);

      // Outer glow ring
      const outerR = size * 3;
      const outerGrad = c.createRadialGradient(cx, cy, size * 0.3, cx, cy, outerR);
      outerGrad.addColorStop(0, 'rgba(0, 196, 175, ' + (0.3 * intensity * flashPulse) + ')');
      outerGrad.addColorStop(0.3, 'rgba(0, 168, 255, ' + (0.15 * intensity) + ')');
      outerGrad.addColorStop(0.6, 'rgba(0, 196, 175, ' + (0.05 * intensity) + ')');
      outerGrad.addColorStop(1, 'rgba(0, 196, 175, 0)');
      c.fillStyle = outerGrad;
      c.beginPath();
      c.arc(cx, cy, outerR, 0, Math.PI * 2);
      c.fill();

      // Main flash body
      const mainGrad = c.createRadialGradient(cx, cy, 0, cx, cy, size);
      mainGrad.addColorStop(0, 'rgba(255, 255, 255, ' + (0.9 * intensity * (0.7 + flashPulse * 0.3)) + ')');
      mainGrad.addColorStop(0.2, 'rgba(0, 196, 175, ' + (0.6 * intensity) + ')');
      mainGrad.addColorStop(0.5, 'rgba(0, 168, 255, ' + (0.3 * intensity) + ')');
      mainGrad.addColorStop(1, 'rgba(0, 196, 175, 0)');
      c.fillStyle = mainGrad;
      c.beginPath();
      c.arc(cx, cy, size, 0, Math.PI * 2);
      c.fill();

      // Bright white core
      const coreSize = size * 0.25 * (0.6 + flashPulse * 0.4);
      c.fillStyle = 'rgba(255, 255, 255, ' + (0.95 * intensity) + ')';
      c.beginPath();
      c.arc(cx, cy, coreSize, 0, Math.PI * 2);
      c.fill();

      // Cross-flare rays at high convergence
      if (intensity > 0.5) {
        const rayLength = size * 2.5 * flashPulse;
        const rayWidth = 1.5 * intensity;
        c.strokeStyle = 'rgba(255, 255, 255, ' + (0.3 * intensity * flashPulse) + ')';
        c.lineWidth = rayWidth;
        // Horizontal ray
        c.beginPath();
        c.moveTo(cx - rayLength, cy);
        c.lineTo(cx + rayLength, cy);
        c.stroke();
        // Vertical ray
        c.beginPath();
        c.moveTo(cx, cy - rayLength);
        c.lineTo(cx, cy + rayLength);
        c.stroke();
      }
    };

    const animate = () => {
      const c = contextRef.current;
      if (!c) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const now = performance.now() / 1000;
      const dt = lastFrameTimeRef.current > 0 ? Math.min(now - lastFrameTimeRef.current, 0.05) : 0.016;
      lastFrameTimeRef.current = now;

      c.clearRect(0, 0, w, h);

      mouseGlowRef.current.x = lerp(mouseGlowRef.current.x, mouseRef.current.x, STARFIELD_CONFIG.cursorGlowLerpSpeed);
      mouseGlowRef.current.y = lerp(mouseGlowRef.current.y, mouseRef.current.y, STARFIELD_CONFIG.cursorGlowLerpSpeed);

      // Convergence only on click-and-hold
      const shouldConverge = mousePressedRef.current && mouseRef.current.x > 0;

      // Update star convergence progress
      const convergeSpeed = 1 / STARFIELD_CONFIG.cursorConvergeDuration; // per second
      const cursorX = mouseGlowRef.current.x;
      const cursorY = mouseGlowRef.current.y;
      let maxConvergence = 0;

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];
        const offset = getParallaxOffset(star.depth);
        const sx = star.baseX + offset.x + star.convergeX;
        const sy = star.baseY + offset.y + star.convergeY;
        const dxC = cursorX - sx;
        const dyC = cursorY - sy;
        const distC = Math.sqrt(dxC * dxC + dyC * dyC);

        if (shouldConverge && distC < STARFIELD_CONFIG.cursorConvergeRadius) {
          // Ramp up convergence progress
          star.convergeProgress = Math.min(1, star.convergeProgress + convergeSpeed * dt);
        } else {
          // Release - smooth fade out
          star.convergeProgress = Math.max(0, star.convergeProgress - convergeSpeed * 1.5 * dt);
        }

        if (star.convergeProgress > maxConvergence) {
          maxConvergence = star.convergeProgress;
        }
      }

      drawNebulas();
      drawStars(cursorX, cursorY);
      drawCenterStar(w, h);
      drawConvergeFlash(cursorX, cursorY, maxConvergence);
      drawCursorGlow(cursorX, cursorY);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      mousePressedRef.current = true;
    };

    const handleMouseUp = () => {
      mousePressedRef.current = false;
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
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      aria-hidden="true"
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
