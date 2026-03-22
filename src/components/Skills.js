import { useRef, useState, memo, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiServer, FiBox } from 'react-icons/fi';
import { FaJava, FaAws } from 'react-icons/fa';
import {
  SiSpringboot, SiApachekafka, SiDocker, SiKubernetes, SiRedis,
  SiMongodb, SiMysql, SiReact, SiJavascript, SiHtml5,
} from 'react-icons/si';
import SectionHeading from './SectionHeading';
import { skills } from '../data/portfolioData';

const meta = {
  Backend:   { gradient: 'from-indigo-500 to-purple-500', text: 'text-indigo-500', glow: 'rgba(99,102,241,', barColor: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
  Databases: { gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-500', glow: 'rgba(16,185,129,', barColor: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
  DevOps:    { gradient: 'from-orange-500 to-amber-500', text: 'text-orange-500', glow: 'rgba(249,115,22,', barColor: 'bg-gradient-to-r from-orange-500 to-amber-500' },
  Frontend:  { gradient: 'from-cyan-500 to-blue-500', text: 'text-cyan-500', glow: 'rgba(6,182,212,', barColor: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
};

const skillIcons = {
  Java: FaJava, 'Spring Boot': SiSpringboot, Kafka: SiApachekafka,
  'REST APIs': FiServer, Microservices: FiServer,
  MongoDB: SiMongodb, MySQL: SiMysql, Redis: SiRedis,
  Docker: SiDocker, Kubernetes: SiKubernetes, AWS: FaAws, 'CI/CD': FiBox,
  React: SiReact, JavaScript: SiJavascript, 'HTML/CSS': SiHtml5,
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Memoized Skill Card — no per-card useInView, no hover re-renders ─── */
const SkillCard = memo(function SkillCard({ name, pct, index, glow, textColor, barColor, isVisible }) {
  const IconComp = skillIcons[name] || FiServer;
  const circumference = 2 * Math.PI * 20;

  return (
    <motion.div
      className="gradient-border group relative"
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative p-3 sm:p-3.5 2xl:p-4 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-white dark:bg-navy-800/50 overflow-hidden text-center">
        {/* CSS-only hover glow — no state needed */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"
          style={{ background: `radial-gradient(circle, ${glow}0.3), transparent 70%)` }}
        />

        {/* Circular progress ring */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 mx-auto mb-2 sm:mb-2.5">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-navy-100 dark:text-navy-700/50" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none" strokeWidth="2.5" strokeLinecap="round"
              className={textColor}
              stroke="currentColor"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={isVisible
                ? { strokeDashoffset: circumference * (1 - pct / 100) }
                : { strokeDashoffset: circumference }
              }
              transition={{ delay: 0.15 + index * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <IconComp size={18} className={`sm:w-5 sm:h-5 ${textColor}`} />
          </div>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-navy-800 dark:text-white truncate">{name}</p>

        {/* Linear progress bar */}
        <div className="mt-2 w-full h-1.5 rounded-full bg-navy-100 dark:bg-navy-700/50 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${pct}%` } : { width: 0 }}
            transition={{ delay: 0.2 + index * 0.03, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.p
          className="text-[10px] sm:text-[11px] font-bold font-mono text-navy-400 mt-1.5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.25 + index * 0.03 }}
        >
          {pct}%
        </motion.p>
      </div>
    </motion.div>
  );
});

export default function Skills() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  // Single IntersectionObserver for the entire grid
  const gridInView = useInView(gridRef, { once: false, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState(null);

  const tabKey = activeCategory || 'all';

  const filtered = useMemo(() =>
    skills
      .filter(({ category }) => !activeCategory || category === activeCategory)
      .flatMap(({ category, items }) =>
        items.map(({ name, pct }) => {
          const m = meta[category] || meta.Backend;
          return { name, pct, glow: m.glow, textColor: m.text, barColor: m.barColor };
        })
      ),
    [activeCategory]
  );

  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={sectionRef}>
      {/* Background — simplified: CSS-only orbit rings + static elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-ring w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] -ml-[125px] sm:-ml-[175px] -mt-[125px] sm:-mt-[175px] animate-spin-slow opacity-20" />
          <div className="orbit-ring w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] -ml-[200px] sm:-ml-[275px] -mt-[200px] sm:-mt-[275px] animate-spin-slower opacity-10" />
          <div className="orbit-ring w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] -ml-[275px] sm:-ml-[375px] -mt-[275px] sm:-mt-[375px] animate-spin-slow opacity-[0.06]" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// skills" title="Tech I work with" />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          <div className="relative inline-flex gap-1 p-1 rounded-xl bg-navy-100/80 dark:bg-navy-800/60 border border-navy-200/40 dark:border-navy-700/30">
            {[{ key: null, label: 'All' }, ...skills.map(({ category }) => ({ key: category, label: category }))].map(({ key, label }) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(key)}
                  className={`relative z-10 px-3.5 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-navy-600 dark:text-navy-300 hover:text-navy-800 dark:hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="skill-tab-indicator"
                      className="absolute inset-0 rounded-lg bg-brand-500 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tabKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length > 0 ? (
              <motion.div
                ref={gridRef}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filtered.map((skill, i) => (
                  <SkillCard
                    key={`${tabKey}-${skill.name}`}
                    name={skill.name}
                    pct={skill.pct}
                    index={i}
                    glow={skill.glow}
                    textColor={skill.textColor}
                    barColor={skill.barColor}
                    isVisible={gridInView}
                  />
                ))}
              </motion.div>
            ) : (
              <p ref={gridRef} className="text-center text-sm text-navy-400 py-12">No skills in this category.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
