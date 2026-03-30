import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function useAnimatedCounter(target, duration = 700, delay = 0) {
  const num = parseInt(target, 10) || 0;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let raf;
    let timeout;

    timeout = setTimeout(() => {
      const t0 = performance.now();
      let prev = -1;

      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        // Ease-out cubic — fast ramp, smooth finish
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(ease * num);

        // Only update state when the displayed number actually changes
        if (val !== prev) {
          prev = val;
          setCount(val);
        }

        if (p < 1) {
          raf = requestAnimationFrame(step);
        }
      };

      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, num, duration, delay]);

  return [ref, count];
}
