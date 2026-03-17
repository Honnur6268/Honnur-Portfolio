import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiZap, FiShield, FiLock, FiTrendingUp } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const items = [
  { icon: FiTrendingUp, title: 'High-Throughput Systems', desc: 'Built payment backends handling 10K+ TPS with 99.9% uptime', accent: 'text-indigo-500', glow: 'rgba(99,102,241,0.1)' },
  { icon: FiShield, title: 'Kafka Retry Patterns', desc: 'Designed DLQ retry mechanisms reducing message loss to near-zero', accent: 'text-emerald-500', glow: 'rgba(16,185,129,0.1)' },
  { icon: FiLock, title: 'API Encryption', desc: 'Implemented end-to-end encryption meeting PCI DSS compliance', accent: 'text-orange-500', glow: 'rgba(249,115,22,0.1)' },
  { icon: FiZap, title: 'Performance Gains', desc: 'Optimized caching and queries improving response times by 60%', accent: 'text-cyan-500', glow: 'rgba(6,182,212,0.1)' },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 sm:py-24 lg:py-32 2xl:py-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt" ref={ref}>
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5">
        <SectionHeading label="// highlights" title="Key achievements" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 2xl:gap-5">
          {items.map(({ icon: Icon, title, desc, accent, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.88 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-border group relative p-4 sm:p-5 md:p-6 2xl:p-7 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-white dark:bg-navy-800/40 text-center overflow-hidden"
              whileHover={{ y: -10, scale: 1.04 }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 30%, ${glow}, transparent 70%)` }}
              />

              <motion.div
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4"
                whileHover={{ scale: 1.25, rotate: 12, boxShadow: `0 0 28px -4px ${glow.replace('0.1', '0.4')}` }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                <Icon size={20} className={`sm:w-[22px] sm:h-[22px] ${accent}`} />
              </motion.div>
              <h3 className="relative text-xs sm:text-sm font-bold text-navy-800 dark:text-white mb-1 sm:mb-1.5">{title}</h3>
              <p className="relative text-[10px] sm:text-xs text-navy-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
