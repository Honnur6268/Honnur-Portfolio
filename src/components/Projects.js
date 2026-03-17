import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight, FiFolder } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { projects } from '../data/portfolioData';

const accents = [
  { border: 'border-l-indigo-500', icon: 'text-indigo-500', glow: 'rgba(99,102,241,0.08)' },
  { border: 'border-l-cyan-500', icon: 'text-cyan-500', glow: 'rgba(6,182,212,0.08)' },
  { border: 'border-l-emerald-500', icon: 'text-emerald-500', glow: 'rgba(16,185,129,0.08)' },
  { border: 'border-l-orange-500', icon: 'text-orange-500', glow: 'rgba(249,115,22,0.08)' },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="projects" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt overflow-hidden" ref={ref}>
      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5">
        <SectionHeading label="// projects" title="Things I've built" />

        <div className="grid sm:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4 gap-4 sm:gap-5 2xl:gap-6">
          {projects.map(({ title, desc, tech, github, demo }, i) => {
            const accent = accents[i % accents.length];
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, scale: 0.93 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`gradient-border group relative rounded-xl border border-navy-200/70 dark:border-navy-700/30 border-l-[3px] ${accent.border} bg-white dark:bg-navy-800/40 overflow-hidden`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* Hover glow overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `radial-gradient(ellipse at top left, ${accent.glow}, transparent 70%)` }}
                />

                <div className="relative p-4 sm:p-5 md:p-6 2xl:p-7">
                  {/* Folder icon + title */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <motion.div
                        className={`mt-0.5 ${accent.icon}`}
                        animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.15 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FiFolder size={20} />
                      </motion.div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1">
                          {title}
                          <motion.span
                            className="opacity-0 group-hover:opacity-100"
                            initial={{ x: -4, y: 4 }}
                            animate={isHovered ? { x: 0, y: 0 } : { x: -4, y: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiArrowUpRight size={14} />
                          </motion.span>
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {github && (
                        <motion.a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-navy-400 hover:text-navy-800 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-700/50 transition-all"
                          whileHover={{ scale: 1.25, rotate: 8 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiGithub size={16} />
                        </motion.a>
                      )}
                      {demo && (
                        <motion.a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-navy-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all"
                          whileHover={{ scale: 1.25, rotate: -8 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-3 sm:mb-4">{desc}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tech.map((t, tIdx) => (
                      <motion.span
                        key={t}
                        className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-navy-100/80 dark:bg-navy-700/40 text-navy-600 dark:text-navy-300 border border-navy-200/50 dark:border-navy-600/20 group-hover:border-brand-300/25 dark:group-hover:border-brand-500/15 transition-all"
                        initial={{ opacity: 0, scale: 0.7, y: 8 }}
                        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ delay: 0.35 + i * 0.1 + tIdx * 0.04, duration: 0.35 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
