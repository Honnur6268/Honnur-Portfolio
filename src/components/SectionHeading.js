import { motion } from 'framer-motion';
import useSectionAnimation from '../hooks/useSectionAnimation';

export default function SectionHeading({ label, title }) {
  const [ref, , inView] = useSectionAnimation('-60px');

  return (
    <div ref={ref} className="mb-8 sm:mb-12 lg:mb-16">
      <motion.p
        className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-brand-500 mb-3 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
        <motion.span
          className="h-px flex-1 max-w-[60px] bg-brand-500/30"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ originX: 0 }}
        />
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] 2xl:text-5xl font-bold text-navy-800 dark:text-white leading-tight"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mt-4 flex gap-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-[3px] w-8 rounded-full bg-brand-500"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          style={{ originX: 0 }}
        />
        <motion.div
          className="h-[3px] w-3 rounded-full bg-brand-500/40"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          style={{ originX: 0 }}
        />
        <motion.div
          className="h-[3px] w-1.5 rounded-full bg-brand-500/20"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.2, delay: 0.45 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}
