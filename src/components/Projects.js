import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCode, FiBookOpen, FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { workProjects, personalProjects, academicProjects } from '../data/portfolioData';

const tabs = [
  { key: 'professional', label: 'Professional', icon: FiBriefcase, data: workProjects },
  { key: 'personal', label: 'Personal', icon: FiCode, data: personalProjects },
  { key: 'academic', label: 'Academic', icon: FiBookOpen, data: academicProjects },
];

const accents = [
  'rgba(234,179,8,0.06)',
  'rgba(99,102,241,0.06)',
  'rgba(16,185,129,0.06)',
  'rgba(249,115,22,0.06)',
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project, index }) {
  const { title, desc, tech, contributions, github, demo } = project;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl border border-navy-200/60 dark:border-navy-700/30 bg-white dark:bg-navy-800/40 overflow-hidden hover-glow transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-500/5"
      whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
    >
      {/* hover gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${accents[index % accents.length]}, transparent 65%)` }}
      />

      <div className="relative p-5 sm:p-6 2xl:p-7 flex flex-col h-full">
        {/* title + links */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
            {title}
          </h3>
          {(github || demo) && (
            <div className="flex gap-1.5 flex-shrink-0 ml-3">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-navy-400 hover:text-navy-700 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-700/50 transition-all hover:scale-110 active:scale-90">
                  <FiGithub size={15} />
                </a>
              )}
              {demo && (
                <a href={demo} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-navy-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all hover:scale-110 active:scale-90">
                  <FiExternalLink size={15} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* description */}
        <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-4">{desc}</p>

        {/* contributions — CSS transitions only */}
        {contributions && contributions.length > 0 && (
          <ul className="space-y-1.5 mb-4 flex-1">
            {contributions.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] sm:text-xs text-navy-500 dark:text-navy-400 leading-relaxed"
              >
                <span className="mt-[5px] w-1 h-1 rounded-full bg-brand-500/50 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* tech badges — opacity only */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-navy-100/80 dark:bg-navy-700/40 text-navy-600 dark:text-navy-300 border border-navy-200/50 dark:border-navy-600/20 group-hover:border-brand-300/20 dark:group-hover:border-brand-500/10 transition-colors hover:opacity-80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('professional');

  const activeData = tabs.find((t) => t.key === activeTab);

  return (
    <section id="projects" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(234,179,8,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
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
        <SectionHeading label="// projects" title="Projects" />

        {/* Tab bar */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="relative inline-flex gap-1 p-1 rounded-xl bg-navy-100/80 dark:bg-navy-800/60 border border-navy-200/40 dark:border-navy-700/30">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative z-10 flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-navy-600 dark:text-navy-300 hover:text-navy-800 dark:hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-lg bg-brand-500 dark:bg-brand-500 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="grid md:grid-cols-2 gap-4 sm:gap-5 2xl:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {activeData.data.map((proj, i) => (
                <ProjectCard key={proj.title} project={proj} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
