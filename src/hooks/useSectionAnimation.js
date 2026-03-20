import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';

/**
 * Reusable hook for re-triggerable section animations.
 * Returns [ref, controls, inView] — attach ref to the section,
 * use controls for manual animation triggers, inView for conditional rendering.
 *
 * Animations replay every time the section enters the viewport.
 */
export default function useSectionAnimation(margin = '-80px') {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return [ref, controls, inView];
}
