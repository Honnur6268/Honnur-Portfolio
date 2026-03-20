import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const PARTICLE_COUNT = 30;
const CONNECTION_DISTANCE_SQ = 130 * 130;
const MAX_CONNECTIONS_PER_PARTICLE = 4;

export default function ParticleField() {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animFrame = useRef(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  useEffect(() => {
    init();
    const onResize = () => init();
    window.addEventListener('resize', onResize);

    const onMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [init]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const dotColor = darkMode ? 'rgba(234,179,8,' : 'rgba(100,116,139,';
      const lineColor = darkMode ? 'rgba(234,179,8,' : 'rgba(202,138,4,';
      const connDistSq = CONNECTION_DISTANCE_SQ;
      const connDist = 130;

      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion — use squared distance to avoid sqrt
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) { // 120^2
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120 * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${0.25 + p.r * 0.1})`;
        ctx.fill();

        // Connections — limit per particle, use squared distance
        let connections = 0;
        for (let j = i + 1; j < pts.length && connections < MAX_CONNECTIONS_PER_PARTICLE; j++) {
          const q = pts[j];
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cdSq = cdx * cdx + cdy * cdy;
          if (cdSq < connDistSq) {
            const cd = Math.sqrt(cdSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `${lineColor}${0.06 * (1 - cd / connDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            connections++;
          }
        }
      }

      animFrame.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.5, willChange: 'transform' }}
    />
  );
}
