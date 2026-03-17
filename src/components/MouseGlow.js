import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function MouseGlow() {
  const { darkMode } = useTheme();
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile.current) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[1] hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: darkMode
          ? 'radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)',
        filter: 'blur(1px)',
      }}
    />
  );
}
