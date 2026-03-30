import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiServer, FiLayers, FiCode, FiTrendingUp } from 'react-icons/fi';
import { fadeLeft, fadeRight, stagger, staggerScaleChild } from '../utils/animations';
import useSectionAnimation from '../hooks/useSectionAnimation';
import useAnimatedCounter from '../hooks/useAnimatedCounter';
import SectionHeading from './SectionHeading';
import { profile } from '../data/portfolioData';

const icons = [FiServer, FiLayers, FiCode, FiTrendingUp];
const accents = ['from-indigo-500/10', 'from-emerald-500/10', 'from-cyan-500/10', 'from-orange-500/10'];

const strengths = [
  { title: 'Backend Architecture', desc: 'Designing robust server-side systems' },
  { title: 'Microservices', desc: 'Distributed service-oriented applications' },
  { title: 'API Development', desc: 'High-performance RESTful services' },
  { title: 'System Design', desc: 'Scalable & fault-tolerant designs' },
];

function Stat({ value, label }) {
  const suffix = value.replace(/[0-9]/g, '');
  const [ref, count] = useAnimatedCounter(parseInt(value, 10));
  return (
    <motion.div
      ref={ref}
      className="text-center p-4 sm:p-5 2xl:p-6 rounded-xl border border-navy-200/50 dark:border-navy-700/30 bg-white/50 dark:bg-navy-800/40 hover-glow"
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-navy-900 dark:text-white">
        {count}<span className="text-gradient">{suffix}</span>
      </span>
      <p className="mt-1 text-xs sm:text-sm text-navy-400 font-medium">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const scrollRef = useRef(null);
  const [sectionRef, , inView] = useSectionAnimation('-80px');

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });
  const avatarY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const avatarRotate = useTransform(scrollYProgress, [0, 1], [8, -4]);
  const decorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <section
      id="about"
      className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 2xl:pt-40 2xl:pb-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt overflow-hidden"
      ref={(el) => { sectionRef.current = el; scrollRef.current = el; }}
    >
      {/* Background — CSS-only animations, no JS-driven motion */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-10 w-[200px] sm:w-[300px] 2xl:w-[400px] h-[200px] sm:h-[300px] 2xl:h-[400px] bg-brand-200/15 dark:bg-brand-500/[0.04] blur-3xl animate-morph"
        />
        <div
          className="absolute bottom-20 left-20 w-32 h-32 sm:w-48 sm:h-48 border border-brand-300/10 dark:border-brand-500/[0.06] rounded-3xl hidden sm:block animate-spin-slower"
        />
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 sm:w-28 sm:h-28 border border-navy-300/10 dark:border-navy-600/10 rounded-full hidden sm:block animate-spin-slow"
          style={{ animationDirection: 'reverse' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// about" title="A bit about me" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 2xl:gap-20 items-center">
          {/* Parallax Avatar */}
          <motion.div
            className="flex justify-center"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={0.2}
          >
            <div className="relative">
              <motion.div
                className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 2xl:w-72 2xl:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-brand-500/20 dark:shadow-brand-500/10"
                style={{ y: avatarY, rotate: avatarRotate }}
                whileHover={{ scale: 1.04, boxShadow: '0 24px 50px -12px rgba(234, 179, 8, 0.25)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <img src="/favicon.svg" alt="HA" className="w-full h-full" />
              </motion.div>
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-2xl border-2 border-dashed border-brand-300/25 dark:border-brand-500/15"
                style={{ rotate: useTransform(scrollYProgress, [0, 1], [-5, 5]), scale: decorScale }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              {/* Floating badges */}
              <motion.div
                className="absolute -bottom-3 -right-4 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 shadow-xl dark:shadow-black/30 border border-navy-100 dark:border-navy-700/50 text-[11px] font-bold text-brand-600 dark:text-brand-400"
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15 }}
              >
                4+ yrs exp
              </motion.div>
              <motion.div
                className="absolute -top-3 -left-4 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 shadow-xl dark:shadow-black/30 border border-navy-100 dark:border-navy-700/50 text-[10px] font-bold text-emerald-500 dark:text-accent-green"
                animate={{ y: [4, -5, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                whileHover={{ scale: 1.15 }}
              >
                5+ projects
              </motion.div>
            </div>
          </motion.div>

          {/* Text + cards */}
          <motion.div variants={fadeRight} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.3}>
            <p className="text-navy-600 dark:text-navy-300 leading-relaxed whitespace-pre-line text-sm sm:text-[15px] 2xl:text-base">
              {profile.about}
            </p>

            <motion.div
              className="grid grid-cols-2 gap-2.5 sm:gap-3 2xl:gap-4 mt-6 sm:mt-8"
              variants={stagger(0.1, 0.5)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              {strengths.map(({ title, desc }, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={title}
                    variants={staggerScaleChild}
                    className="gradient-border p-3 sm:p-4 2xl:p-5 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-white dark:bg-navy-800/50 group overflow-hidden relative"
                    whileHover={{ y: -8, scale: 1.03 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${accents[i]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      <Icon size={20} className="text-brand-500 mb-2 sm:mb-2.5" />
                    </motion.div>
                    <h4 className="relative text-xs sm:text-sm font-semibold text-navy-800 dark:text-white">{title}</h4>
                    <p className="relative text-[10px] sm:text-xs text-navy-400 mt-0.5 leading-relaxed">{desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-14 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-md sm:max-w-xl 2xl:max-w-2xl mx-auto"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={stagger(0.12, 0.7)}
        >
          {profile.stats.map(({ value, label }) => (
            <motion.div key={label} variants={staggerScaleChild}>
              <Stat value={value} label={label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
