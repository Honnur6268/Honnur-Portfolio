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

function SkillCard({ name, pct, delay, inView, glow, text: textColor }) {
  const IconComp = skillIcons[name] || FiServer;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="gradient-border group relative"
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.04 }}
    >
      <div className="relative p-3 sm:p-3.5 2xl:p-4 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-white dark:bg-navy-800/50 overflow-hidden text-center">
        {/* Glow background on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ opacity: hovered ? 0.08 : 0 }}
          style={{ background: `radial-gradient(circle, ${glow}0.3), transparent 70%)` }}
          transition={{ duration: 0.35 }}
        />

        {/* Animated proficiency ring */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16 mx-auto mb-2 sm:mb-2.5">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-navy-100 dark:text-navy-700/50" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none" strokeWidth="2.5" strokeLinecap="round"
              className={textColor}
              stroke="currentColor"
              strokeDasharray={`${2 * Math.PI * 20}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={inView ? { strokeDashoffset: 2 * Math.PI * 20 * (1 - pct / 100) } : {}}
              transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {pct}%
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-ring w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] -ml-[125px] sm:-ml-[175px] -mt-[125px] sm:-mt-[175px] animate-spin-slow opacity-20" />
          <div className="orbit-ring w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] -ml-[200px] sm:-ml-[275px] -mt-[200px] sm:-mt-[275px] animate-spin-slower opacity-10" />
          <div className="orbit-ring w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] -ml-[275px] sm:-ml-[375px] -mt-[275px] sm:-mt-[375px] animate-spin-slow opacity-[0.06]" style={{ animationDirection: 'reverse' }} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-brand-400/30 dark:bg-brand-400/20"
            style={{ marginLeft: -4, marginTop: -4 }}
            animate={{
              x: [Math.cos(i * 1.57) * 175, Math.cos(i * 1.57 + Math.PI) * 175, Math.cos(i * 1.57) * 175],
              y: [Math.sin(i * 1.57) * 175, Math.sin(i * 1.57 + Math.PI) * 175, Math.sin(i * 1.57) * 175],
            }}
            transition={{ duration: 20 + i * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5">
        <SectionHeading label="// skills" title="Tech I work with" />

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-all ${
              activeCategory === null
                ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                : 'border-navy-200 dark:border-navy-700 text-navy-500 dark:text-navy-300 hover:border-brand-300 dark:hover:border-brand-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {skills.map(({ category }) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-all ${
                activeCategory === category
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                  : 'border-navy-200 dark:border-navy-700 text-navy-500 dark:text-navy-300 hover:border-brand-300 dark:hover:border-brand-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {skills
              .filter(({ category }) => !activeCategory || category === activeCategory)
              .flatMap(({ category, items }) =>
                items.map(({ name, pct }, i) => {
                  const m = meta[category] || meta.Backend;
                  return (
                    <SkillCard
                      key={name}
                      name={name}
                      pct={pct}
                      delay={0.15 + i * 0.05}
                      inView={inView}
                      gradient={m.gradient}
                      glow={m.glow}
                      text={m.text}
                    />
                  );
                })
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
