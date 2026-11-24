import type { CSSProperties } from 'react';

interface SvgProps {
  className?: string;
  style?: CSSProperties;
}

export function CornerTL({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      style={{ width: 'var(--corner)', height: 'var(--corner)', ...style }}
      aria-hidden="true"
    >
      <path d="M0 11.5V0.5H11.5" />
    </svg>
  );
}

export function CornerTR({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      style={{ width: 'var(--corner)', height: 'var(--corner)', ...style }}
      aria-hidden="true"
    >
      <path d="M0.5 0.5H11.5V11.5" />
    </svg>
  );
}

export function CornerBL({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      style={{ width: 'var(--corner)', height: 'var(--corner)', ...style }}
      aria-hidden="true"
    >
      <path d="M0 0.5V11.5H11.5" />
    </svg>
  );
}

export function CornerBR({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      style={{ width: 'var(--corner)', height: 'var(--corner)', ...style }}
      aria-hidden="true"
    >
      <path d="M0.5 11.5H11.5V0.5" />
    </svg>
  );
}

export function CheckerboardGrid({ className = '', style }: SvgProps) {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <svg
      viewBox="0 0 36 18"
      fill="currentColor"
      className={className}
      style={{
        width: 'var(--checker-w)',
        height: 'var(--checker-h)',
        ...style,
      }}
      aria-hidden="true"
    >
      {rows.map((row) => {
        const isEvenRow = row % 2 === 1;
        const offsetX = isEvenRow ? 2.25 : 0;
        const y = row * 4.5 + 0.35;
        return cols.map((col) => {
          const x = col * 4.5 + offsetX;
          if (x + 3.8 > 36) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={3.8}
              height={3.8}
            />
          );
        });
      })}
    </svg>
  );
}

export function WireframeGlobe({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
      style={{ width: 'var(--globe)', height: 'var(--globe)', ...style }}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" />
      <line x1="4" y1="32" x2="60" y2="32" />
      <ellipse cx="32" cy="32" rx="28" ry="11" />
      <ellipse cx="32" cy="32" rx="28" ry="21" />
      <line x1="32" y1="4" x2="32" y2="60" />
      <ellipse cx="32" cy="32" rx="11" ry="28" />
      <ellipse cx="32" cy="32" rx="21" ry="28" />
    </svg>
  );
}
