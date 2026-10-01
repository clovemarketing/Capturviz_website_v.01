import { useEffect, useRef } from "react";
import "./PointCloud.css";

type Pt = [x: number, y: number, z: number, heightT: number, jitter: number];

const W = 10, D = 7, H = 3.2;

/** Builds a "scanned room": floor, walls with window + doorway, a column, a desk and a stair run. */
function buildRoom(): Pt[] {
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  const raw: [number, number, number][] = [];
  for (let i = 0; i < 2600; i++) raw.push([r(-W / 2, W / 2), 0, r(-D / 2, D / 2)]);
  for (let i = 0; i < 2200; i++) {
    const x = r(-W / 2, W / 2), y = r(0, H);
    if (x > 1 && x < 3.4 && y > 1 && y < 2.4) continue; // window
    raw.push([x, y, -D / 2]);
  }
  for (let i = 0; i < 1500; i++) {
    const z = r(-D / 2, D / 2), y = r(0, H);
    if (z > 0.6 && z < 1.8 && y < 2.2) continue; // doorway
    raw.push([-W / 2, y, z]);
  }
  for (let i = 0; i < 1300; i++) raw.push([W / 2, r(0, H), r(-D / 2, D / 2)]);
  for (let i = 0; i < 500; i++) { const a = r(0, Math.PI * 2); raw.push([2 + Math.cos(a) * 0.32, r(0, H), 0.6 + Math.sin(a) * 0.32]); }
  for (let i = 0; i < 600; i++) raw.push([r(-2.6, -0.4), 0.75, r(-1.6, -0.6)]);
  for (let i = 0; i < 160; i++) raw.push([[-2.5, -0.5][i % 2], r(0, 0.75), [-1.5, -0.7][(i >> 1) % 2]]);
  for (let s = 0; s < 8; s++) for (let i = 0; i < 70; i++) raw.push([r(3, 4.6), s * 0.32 + 0.32, -D / 2 + 0.4 + s * 0.28 + r(0, 0.28)]);
  return raw.map(([x, y, z]) => [x, y, z, y / H, Math.random()]);
}

function color(t: number, alpha: number) {
  // logo blue (66,176,228) → navy (37,40,102) by height
  const c = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgba(${c(66, 37)},${c(176, 40)},${c(228, 102)},${alpha})`;
}

/** Animated point-cloud scan of a room. Static for users with reduced motion. */
export default function PointCloud() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = buildRoom();
    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now();

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const el = (now - t0) / 1000;
      const ang = reduce ? -0.6 : -0.6 + Math.sin(el * 0.12) * 0.35;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const tilt = 0.55, ct = Math.cos(tilt), st = Math.sin(tilt);
      const narrow = w < 700;
      const scale = Math.min(w, h) * (narrow ? 0.075 : 0.064);
      const cx = w * (narrow ? 0.5 : 0.7), cy = h * (narrow ? 0.17 : 0.56);
      const sweep = reduce ? 99 : el * 2.6 - 1;

      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (p[0] + W / 2 > (sweep * W) / 4) continue;
        const X = p[0] * ca - p[2] * sa, Z = p[0] * sa + p[2] * ca, Y = p[1] - H / 2;
        const Y2 = Y * ct - Z * st, Z2 = Y * st + Z * ct;
        const persp = 9 / (9 + Z2);
        const sx = cx + X * scale * persp, sy = cy - Y2 * scale * persp;
        ctx.fillStyle = color(p[3], Math.min(0.35 + 0.5 * persp * (0.6 + 0.4 * p[4]), 0.9));
        ctx.fillRect(sx, sy, 1.6 * persp, 1.6 * persp);
      }
      if (!reduce && sweep < 4.4) {
        const gx = cx + (-W / 2 + (sweep * W) / 4) * ca * scale;
        const g = ctx.createLinearGradient(gx - 30, 0, gx + 30, 0);
        g.addColorStop(0, "rgba(66,176,228,0)");
        g.addColorStop(0.5, "rgba(66,176,228,.35)");
        g.addColorStop(1, "rgba(66,176,228,0)");
        ctx.fillStyle = g;
        ctx.fillRect(gx - 30, 0, 60, h);
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    size();
    const onResize = () => { size(); if (reduce) draw(performance.now()); };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="point-cloud" aria-hidden="true" />;
}
