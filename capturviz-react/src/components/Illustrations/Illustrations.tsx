import { useMemo } from "react";
import "./Illustrations.css";

/** Seeded random so the dot field is identical on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function SiteScanVisual() {
  const dots = useMemo(() => {
    const rnd = seeded(7);
    return Array.from({ length: 260 }, () => ({ cx: 40 + rnd() * 150, cy: 60 + rnd() * 180 }));
  }, []);
  return (
    <div className="visual">
      <svg viewBox="0 0 400 300" role="img" aria-label="A scanned room shown as points beside its clean model outline">
        <defs>
          <linearGradient id="vis-site-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EEF0FD" />
            <stop offset="1" stopColor="#DCEFFB" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#vis-site-bg)" />
        <g fill="#42B0E4" opacity=".75">
          {dots.map((d, i) => <circle key={i} cx={d.cx.toFixed(1)} cy={d.cy.toFixed(1)} r="1.5" />)}
        </g>
        <g fill="none" stroke="#252866" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M220 230V90l70-34 70 34v140z" />
          <path d="M220 90l70 34 70-34M290 124v106" />
          <path d="M245 230v-50h28v50" stroke="#42B0E4" />
        </g>
        <path d="M190 150h22" stroke="#252866" strokeWidth="2" strokeDasharray="4 5" />
      </svg>
    </div>
  );
}

export function FloorPlanVisual() {
  return (
    <div className="visual">
      <svg viewBox="0 0 400 300" role="img" aria-label="A floor plan with measured rooms">
        <rect width="400" height="300" fill="#F4F3FD" />
        <g fill="none" stroke="#252866" strokeWidth="3">
          <rect x="50" y="50" width="300" height="200" rx="4" />
          <path d="M50 140h120v110M170 50v50M230 140h120M230 140v40" />
        </g>
        <g fill="#42B0E4" opacity=".18">
          <rect x="53" y="53" width="114" height="84" />
          <rect x="233" y="143" width="114" height="104" />
        </g>
        <g className="vis-label">
          <text x="70" y="100">Office A</text>
          <text x="250" y="200">Plant room</text>
          <text x="185" y="95">Corridor</text>
        </g>
        <path d="M50 268h300M50 262v12M350 262v12" stroke="#42B0E4" strokeWidth="2" />
      </svg>
    </div>
  );
}
