import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiServer, FiDatabase, FiBox, FiMonitor } from 'react-icons/fi';
import { FaJava, FaAws } from 'react-icons/fa';
import {
  SiSpringboot, SiApachekafka, SiDocker, SiKubernetes, SiRedis,
  SiMongodb, SiMysql, SiReact, SiJavascript, SiHtml5,
} from 'react-icons/si';
import SectionHeading from './SectionHeading';
import { skills } from '../data/portfolioData';

const meta = {
  Backend:   { Icon: FiServer,   gradient: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-500', text: 'text-indigo-500', ring: 'ring-indigo-500/25', glow: 'rgba(99,102,241,' },
  Databases: { Icon: FiDatabase, gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500', text: 'text-emerald-500', ring: 'ring-emerald-500/25', glow: 'rgba(16,185,129,' },
  DevOps:    { Icon: FiBox,      gradient: 'from-orange-500 to-amber-500', bg: 'bg-orange-500', text: 'text-orange-500', ring: 'ring-orange-500/25', glow: 'rgba(249,115,22,' },
  Frontend:  { Icon: FiMonitor,  gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500', text: 'text-cyan-500', ring: 'ring-cyan-500/25', glow: 'rgba(6,182,212,' },
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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SkillCard({ name, pct, index, glow, text: textColor }) {
  const IconComp = skillIcons[name] || FiServer;
  const [hovered, setHovered] = useState(false);
  const circumference = 2 * Math.PI * 20;

  return (
    <motion.div
      className="gradient-border group relative"
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.04 }}
    >
      <div className="relative p-3 sm:p-3.5 2xl:p-4 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-white dark:bg-navy-800/50 overflow-hidden text-center">
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ opacity: hovered ? 0.08 : 0 }}
          style={{ background: `radial-gradient(circle, ${glow}0.3), transparent 70%)` }}
          transition={{ duration: 0.35 }}
        />

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
              animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
              transition={{ delay: 0.2 + index * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            <IconComp size={18} className={`sm:w-5 sm:h-5 ${textColor}`} />
          </motion.div>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-navy-800 dark:text-white truncate">{name}</p>
        <motion.p
          className="text-[10px] sm:text-[11px] font-bold font-mono text-navy-400 mt-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.05 }}
        >
          {pct}%
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState(null);

  const tabKey = activeCategory || 'all';

  const filtered = skills
    .filter(({ category }) => !activeCategory || category === activeCategory)
    .flatMap(({ category, items }) =>
      items.map(({ name, pct }) => {
        const m = meta[category] || meta.Backend;
        return { name, pct, glow: m.glow, text: m.text };
      })
    );

  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={ref}>
      {/* Background — animated network/graph lines with glowing nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-ring w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] -ml-[125px] sm:-ml-[175px] -mt-[125px] sm:-mt-[175px] animate-spin-slow opacity-20" />
          <div className="orbit-ring w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] -ml-[200px] sm:-ml-[275px] -mt-[200px] sm:-mt-[275px] animate-spin-slower opacity-10" />
          <div className="orbit-ring w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] -ml-[275px] sm:-ml-[375px] -mt-[275px] sm:-mt-[375px] animate-spin-slow opacity-[0.06]" style={{ animationDirection: 'reverse' }} />
        </div>
        {/* Animated glowing nodes on orbits */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full hidden sm:block"
            style={{
              marginLeft: -3, marginTop: -3,
              width: i % 2 === 0 ? 6 : 4,
              height: i % 2 === 0 ? 6 : 4,
              background: i % 3 === 0
                ? 'rgba(234,179,8,0.3)'
                : i % 3 === 1
                ? 'rgba(99,102,241,0.25)'
                : 'rgba(16,185,129,0.25)',
              boxShadow: i % 2 === 0 ? '0 0 8px rgba(234,179,8,0.2)' : 'none',
            }}
            animate={{
              x: [Math.cos(i * 1.05) * (140 + i * 30), Math.cos(i * 1.05 + Math.PI) * (140 + i * 30), Math.cos(i * 1.05) * (140 + i * 30)],
              y: [Math.sin(i * 1.05) * (140 + i * 30), Math.sin(i * 1.05 + Math.PI) * (140 + i * 30), Math.sin(i * 1.05) * (140 + i * 30)],
            }}
            transition={{ duration: 18 + i * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* Network connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.03] hidden sm:block">
          <motion.line x1="20%" y1="30%" x2="50%" y2="20%" stroke="currentColor" strokeWidth="1"
            className="text-brand-500"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line x1="50%" y1="20%" x2="80%" y2="40%" stroke="currentColor" strokeWidth="1"
            className="text-indigo-500"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.line x1="30%" y1="70%" x2="70%" y2="60%" stroke="currentColor" strokeWidth="1"
            className="text-emerald-500"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </svg>
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

        {/* Skills grid — key forces full remount on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tabKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filtered.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  index={i}
                  glow={skill.glow}
                  text={skill.text}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
