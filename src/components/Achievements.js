import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiShield, FiRefreshCw, FiDatabase, FiTrendingUp, FiRadio } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const achievements = [
  {
    icon: FiRefreshCw,
    title: 'Kafka Retry Mechanism',
    desc: 'Designed DLQ-based retry patterns with exponential backoff, reducing message loss to near-zero across high-volume transaction pipelines.',
    tech: ['Kafka', 'Spring Boot', 'DLQ'],
    accent: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    glow: 'rgba(16,185,129,',
  },
  {
    icon: FiRadio,
    title: 'Pub-Sub Architecture',
    desc: 'Implemented publish-subscribe event-driven architecture using Kafka, decoupling microservices and enabling real-time data processing at scale.',
    tech: ['Kafka', 'Microservices', 'Event-Driven'],
    accent: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    glow: 'rgba(99,102,241,',
  },
  {
    icon: FiDatabase,
    title: 'Redis Caching Integration',
    desc: 'Integrated Redis caching layer across critical APIs, improving response times by 60% and reducing database load during peak traffic.',
    tech: ['Redis', 'Spring Boot', 'REST APIs'],
    accent: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    glow: 'rgba(6,182,212,',
  },
  {
    icon: FiTrendingUp,
    title: 'High-Throughput Systems',
    desc: 'Built payment backends handling 10K+ TPS with 99.9% uptime through optimized connection pooling and async processing.',
    tech: ['Java', 'Kafka', 'MongoDB'],
    accent: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    glow: 'rgba(249,115,22,',
  },
  {
    icon: FiShield,
    title: 'API Security & Encryption',
    desc: 'Implemented end-to-end encryption and secure API design meeting PCI DSS compliance for financial transaction processing.',
    tech: ['Security', 'REST APIs', 'PCI DSS'],
    accent: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    glow: 'rgba(244,63,94,',
  },
  {
    icon: FiZap,
    title: 'Performance Optimization',
    desc: 'Optimized database queries, caching strategies, and service communication patterns achieving sub-100ms p95 latency.',
    tech: ['Redis', 'MySQL', 'Profiling'],
    accent: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    glow: 'rgba(245,158,11,',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function AchievementCard({ item }) {
  const { icon: Icon, title, desc, tech, accent, bg, glow } = item;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl border border-navy-200/60 dark:border-navy-700/30 bg-white dark:bg-navy-800/40 overflow-hidden hover-glow transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-500/5"
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25 } }}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${glow}0.08), transparent 65%)` }}
      />

      <div className="relative p-5 sm:p-6 2xl:p-7 flex flex-col h-full">
        {/* Icon */}
        <motion.div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        >
          <Icon size={22} className={accent} />
        </motion.div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-4 flex-1">
          {desc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-navy-100/80 dark:bg-navy-700/40 text-navy-600 dark:text-navy-300 border border-navy-200/50 dark:border-navy-600/20 group-hover:border-brand-300/30 dark:group-hover:border-brand-500/15 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gradient-to-br from-brand-200/8 to-indigo-200/8 dark:from-brand-500/[0.03] dark:to-indigo-500/[0.02] blur-2xl animate-morph"
          style={{ willChange: 'transform' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-emerald-200/5 dark:bg-emerald-500/[0.02] blur-2xl"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// highlights" title="Key Achievements" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-60px' }}
        >
          {achievements.map((item) => (
            <AchievementCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
