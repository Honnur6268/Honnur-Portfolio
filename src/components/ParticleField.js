import { useEffect, useRef, useCallback, memo } from 'react';
import { useTheme } from '../context/ThemeContext';

const PARTICLE_COUNT = 25;
const CONNECTION_DISTANCE_SQ = 120 * 120;
const MAX_CONNECTIONS = 3;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

function ParticleField() {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animFrame = useRef(null);
  const lastFrame = useRef(0);
  const isVisible = useRef(true);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.5,
    }));
  }, []);

  useEffect(() => {
    init();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };

    const onMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onVisibility = () => {
      isVisible.current = !document.hidden;
      if (isVisible.current) lastFrame.current = 0;
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [init]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = (now) => {
      animFrame.current = requestAnimationFrame(draw);

      // Skip frames to hit target FPS & pause when tab hidden
      if (!isVisible.current) return;
      if (now - lastFrame.current < FRAME_INTERVAL) return;
      lastFrame.current = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const dotColor = darkMode ? 'rgba(234,179,8,' : 'rgba(100,116,139,';
      const lineColor = darkMode ? 'rgba(234,179,8,' : 'rgba(202,138,4,';

      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 10000 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (100 - dist) / 100 * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${0.2 + p.r * 0.08})`;
        ctx.fill();

        // Connections
        let conns = 0;
        for (let j = i + 1; j < pts.length && conns < MAX_CONNECTIONS; j++) {
          const q = pts[j];
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cdSq = cdx * cdx + cdy * cdy;
          if (cdSq < CONNECTION_DISTANCE_SQ) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `${lineColor}${0.05 * (1 - Math.sqrt(cdSq) / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            conns++;
          }
        }
      }
    };

    animFrame.current = requestAnimationFrame(draw);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

export default memo(ParticleField);
