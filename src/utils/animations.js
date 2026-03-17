// Reusable Framer Motion variants — premium animation library

const smooth = [0.22, 1, 0.36, 1];
const snappy = [0.16, 1, 0.3, 1];

// ─── Section reveal variants ───────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: smooth },
  }),
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: d, ease: smooth },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: (d = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: d, ease: smooth },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: (d = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: d, ease: smooth },
  }),
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (d = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, delay: d, ease: smooth },
  }),
};

export const scaleRotate = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  show: (d = 0) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.6, delay: d, ease: smooth },
  }),
};

export const slideUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: (d = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, delay: d, ease: smooth },
  }),
};

// ─── Text reveal ───────────────────────────────────────────────
export const wordReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const wordChild = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: smooth },
  },
};

export const charReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
};

export const charChild = {
  hidden: { opacity: 0, y: 20, rotateX: -60 },
  show: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.35, ease: snappy },
  },
};

// ─── Stagger containers ────────────────────────────────────────
export const stagger = (gap = 0.08, start = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: start } },
});

export const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smooth } },
};

export const staggerScaleChild = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: smooth } },
};

export const staggerSlideChild = {
  hidden: { opacity: 0, x: -30, y: 10 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: smooth } },
};

// ─── Hover presets ─────────────────────────────────────────────
export const lift = {
  whileHover: { y: -8, transition: { duration: 0.25, ease: 'easeOut' } },
  whileTap: { y: -3 },
};

export const press = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
};

export const glowLift = {
  whileHover: {
    y: -10,
    boxShadow: '0 24px 48px -12px rgba(234, 179, 8, 0.18)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  whileTap: { y: -4 },
};

export const tiltHover = {
  whileHover: {
    rotateX: -5,
    rotateY: 8,
    scale: 1.03,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const magneticHover = {
  whileHover: {
    scale: 1.08,
    rotate: 3,
    boxShadow: '0 0 24px -4px rgba(234, 179, 8, 0.25)',
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  whileTap: { scale: 0.95 },
};

// ─── Page transition ───────────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: smooth },
};
