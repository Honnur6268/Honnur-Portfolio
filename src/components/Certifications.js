import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiCloud, FiCpu, FiBookOpen, FiDatabase } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { certifications, internship } from '../data/portfolioData';

const cardIcons = {
  oracle: FiDatabase,
  microservices: FiCpu,
  iot: FiCloud,
};

const cardColors = [
  { icon: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', glow: 'rgba(16,185,129,0.06)' },
  { icon: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', glow: 'rgba(249,115,22,0.06)' },
  { icon: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', glow: 'rgba(99,102,241,0.06)' },
];

function CertCard({ item, index, inView }) {
  const IconComp = cardIcons[item.icon] || FiAward;
  const color = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ delay: 0.12 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-navy-200/60 dark:border-navy-700/30 bg-white dark:bg-navy-800/40 overflow-hidden hover-glow"
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at 50% 30%, ${color.glow}, transparent 70%)` }}
      />

      <div className="relative p-5 sm:p-6 2xl:p-7">
        <div className="flex items-start gap-4">
          {/* icon */}
          <motion.div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          >
            <IconComp size={20} className={color.icon} />
          </motion.div>

          {/* content */}
          <div className="min-w-0">
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${
              item.type === 'internship'
                ? 'text-emerald-500 dark:text-emerald-400'
                : 'text-brand-600 dark:text-brand-400'
            }`}>
              {item.type === 'internship' ? <FiBookOpen size={9} /> : <FiAward size={9} />}
              {item.type}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white leading-snug">{item.title}</h3>
            <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 mt-0.5">{item.subtitle}</p>
            <p className="text-[11px] sm:text-xs font-medium text-brand-600 dark:text-brand-400 mt-2">{item.org}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  const allItems = [{ ...internship }, ...certifications];

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-brand-200/8 dark:bg-brand-500/[0.03] blur-2xl animate-morph"
        />
        <div
          className="absolute bottom-1/4 right-0 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-indigo-200/6 dark:bg-indigo-500/[0.02] blur-2xl"
        />

        {/* floating icons */}
        {[
          { Icon: FiAward, x: '8%', y: '25%', size: 18, color: 'text-brand-400/12 dark:text-brand-400/6' },
          { Icon: FiCloud, x: '88%', y: '22%', size: 20, color: 'text-cyan-400/12 dark:text-cyan-400/6' },
          { Icon: FaJava, x: '90%', y: '72%', size: 22, color: 'text-orange-400/12 dark:text-orange-400/6' },
        ].map(({ Icon, x, y, size, color }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color} hidden sm:block`}
            style={{ left: x, top: y }}
            animate={{ y: [0, -(8 + i * 3), 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// credentials" title="Internship & Certifications" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6">
          {allItems.map((item, i) => (
            <CertCard key={item.title} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
