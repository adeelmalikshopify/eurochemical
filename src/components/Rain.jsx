import { useEffect, useRef } from 'react';

// Lightweight canvas rain that "bounces" off an invisible shield line —
// a visual nod to water proofing. Pauses when off-screen.
export default function Rain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, drops, splashes, raf, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / (w < 700 ? 9000 : 6000));
      drops = Array.from({ length: count }, () => newDrop(true));
      splashes = [];
    };

    const newDrop = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -20,
      len: 10 + Math.random() * 18,
      v: 6 + Math.random() * 7,
      o: 0.15 + Math.random() * 0.35,
    });

    const shieldY = () => h * 0.82;

    const tick = () => {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      const sy = shieldY();
      for (const d of drops) {
        d.y += d.v;
        d.x -= d.v * 0.12;
        if (d.y + d.len > sy) {
          if (Math.random() < 0.5) splashes.push({ x: d.x, y: sy, r: 0, o: 0.5 });
          Object.assign(d, newDrop(false));
          d.x = Math.random() * (w + 100);
        }
        ctx.strokeStyle = `rgba(140, 220, 255, ${d.o})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.12, d.y - d.len);
        ctx.stroke();
      }
      splashes = splashes.filter((s) => s.o > 0.02);
      for (const s of splashes) {
        s.r += 0.9;
        s.o *= 0.9;
        ctx.strokeStyle = `rgba(84, 200, 238, ${s.o})`;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.r * 2, s.r * 0.5, 0, Math.PI, 0);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    if (!reduce) tick();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}
