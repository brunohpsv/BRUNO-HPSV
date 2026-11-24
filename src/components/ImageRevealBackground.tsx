import { useEffect, useRef, useState } from 'react';
import { HERO_BASE_IMAGE, HERO_REVEAL_IMAGE } from '../data/catalog';

function computeCellSize(): number {
  if (typeof window === 'undefined') return 48;
  return Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)));
}

export function ImageRevealBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const [cellSize, setCellSize] = useState<number>(computeCellSize);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const gridOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasPointerRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let rafId = 0;

    const syncDimensions = () => {
      setCellSize(computeCellSize());
      const scale = 0.5;
      const w = Math.max(1, Math.round(window.innerWidth * scale));
      const h = Math.max(1, Math.round(window.innerHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    syncDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        smoothRef.current.x = e.clientX;
        smoothRef.current.y = e.clientY;
        return;
      }
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const tick = () => {
      const vw = window.innerWidth;

      if (vw >= 1024 && ctx && revealRef.current && hasPointerRef.current) {
        const mouse = mouseRef.current;
        const smooth = smoothRef.current;

        smooth.x += (mouse.x - smooth.x) * 0.1;
        smooth.y += (mouse.y - smooth.y) * 0.1;

        const scale = 0.5;
        const cw = canvas.width;
        const ch = canvas.height;
        const cx = smooth.x * scale;
        const cy = smooth.y * scale;
        const radius =
          Math.round(Math.min(420, Math.max(160, vw * 0.16))) * scale;

        ctx.clearRect(0, 0, cw, ch);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        const dataUrl = canvas.toDataURL();
        revealRef.current.style.maskImage = `url(${dataUrl})`;
        revealRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        revealRef.current.style.maskSize = '100% 100%';
        revealRef.current.style.webkitMaskSize = '100% 100%';
        revealRef.current.style.maskRepeat = 'no-repeat';
        revealRef.current.style.webkitMaskRepeat = 'no-repeat';
        revealRef.current.style.opacity = '1';

        if (patternRef.current && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const normX = rect.width > 0 ? smooth.x / rect.width - 0.5 : 0;
          const normY = rect.height > 0 ? smooth.y / rect.height - 0.5 : 0;
          const targetX = normX * 16;
          const targetY = normY * 16;

          gridOffsetRef.current.x += (targetX - gridOffsetRef.current.x) * 0.06;
          gridOffsetRef.current.y += (targetY - gridOffsetRef.current.y) * 0.06;

          patternRef.current.setAttribute(
            'x',
            gridOffsetRef.current.x.toFixed(2)
          );
          patternRef.current.setAttribute(
            'y',
            gridOffsetRef.current.y.toFixed(2)
          );
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', syncDimensions);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', syncDimensions);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      {/* Layer 1: Base image (light-blue suit) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${HERO_BASE_IMAGE}")` }}
      />

      {/* Layer 2: Reveal image (black suit revealed inside cursor spotlight) */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
        style={{ backgroundImage: `url("${HERO_REVEAL_IMAGE}")` }}
      />

      {/* Layer 3: Subtle SVG parallax grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            ref={patternRef}
            id="lgpsm-parallax-grid"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="#64748b"
              strokeWidth={0.6}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgpsm-parallax-grid)" />
      </svg>
    </div>
  );
}
