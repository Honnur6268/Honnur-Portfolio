import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function useAnimatedCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target, 10) || 0;

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, num, duration]);

  return [ref, count];
}
