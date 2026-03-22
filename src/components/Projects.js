import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCode, FiX, FiZap, FiArrowRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { workProjects, personalProjects, academicProjects } from '../data/portfolioData';

const categories = [
  { key: 'work', label: 'Work Experience', icon: FiBriefcase, data: workProjects },
  { key: 'other', label: 'Personal & Academic', icon: FiCode, data: [...personalProjects, ...academicProjects] },
];

const accents = [
  { gradient: 'from-amber-500/20 to-orange-500/10', glow: 'rgba(234,179,8,0.10)' },
  { gradient: 'from-indigo-500/20 to-purple-500/10', glow: 'rgba(99,102,241,0.10)' },
  { gradient: 'from-emerald-500/20 to-teal-500/10', glow: 'rgba(16,185,129,0.10)' },
  { gradient: 'from-cyan-500/20 to-blue-500/10', glow: 'rgba(6,182,212,0.10)' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Detail Modal ─── */
function ProjectModal({ project, index, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;
  const { title, impact, tech, contributions, current } = project;
  const accent = accents[index % accents.length];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-navy-900/50 dark:bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        role="dialog"
        aria-label={title}
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-navy-200/60 dark:border-navy-700/40 bg-white dark:bg-navy-800/95 shadow-2xl shadow-black/10 custom-scrollbar"
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-1 w-full bg-gradient-to-r ${accent.gradient} rounded-t-2xl`} />

        <div className="p-5 sm:p-6">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 p-2 rounded-xl text-navy-400 hover:text-navy-700 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-700/50 transition-all"
          >
            <FiX size={16} />
          </button>

          {/* Title + status */}
          <div className="flex items-center gap-2.5 mb-3 pr-8">
            <h3 className="text-base sm:text-lg font-bold text-navy-800 dark:text-white">
              {title}
            </h3>
            {current && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            )}
          </div>

          {/* Impact */}
          {impact && (
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 border border-brand-200/30 dark:border-brand-500/15">
              <FiZap size={13} className="text-brand-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-brand-700 dark:text-brand-400">{impact}</span>
            </div>
          )}

          {/* Contributions */}
          {contributions && contributions.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400 mb-2.5">Key Contributions</h4>
              <ul className="space-y-2">
                {contributions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-navy-600 dark:text-navy-300 leading-relaxed"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-500/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech */}
          <div className="pt-4 border-t border-navy-100 dark:border-navy-700/30">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400 mb-2.5">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-lg bg-navy-100/80 dark:bg-navy-700/50 text-navy-600 dark:text-navy-300 border border-navy-200/50 dark:border-navy-600/25"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, onClick }) {
  const { title, impact, tech, current } = project;
  const accent = accents[index % accents.length];

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl border border-navy-200/50 dark:border-navy-700/25 bg-white dark:bg-navy-800/40 overflow-hidden cursor-pointer"
      whileHover={{
        y: -5,
        boxShadow: `0 12px 28px -6px ${accent.glow}`,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onClick}
    >
      {/* Top accent */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${accent.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 30% 0%, ${accent.glow}, transparent 70%)` }}
      />

      <div className="relative p-5 sm:p-6 flex flex-col h-full min-h-[160px]">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
            {title}
          </h3>
          {current && (
            <span className="flex items-center gap-1 px-1.5 py-px rounded-full text-[9px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20 flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          )}
        </div>

        {/* Impact */}
        {impact && (
          <div className="flex items-start gap-1.5 mb-4">
            <FiZap size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-[13px] text-navy-500 dark:text-navy-400 leading-relaxed">{impact}</span>
          </div>
        )}

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-navy-100/70 dark:bg-navy-700/40 text-navy-500 dark:text-navy-400 border border-navy-200/40 dark:border-navy-600/15 group-hover:border-brand-300/25 dark:group-hover:border-brand-500/10 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* View details */}
        <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-navy-400 dark:text-navy-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
          <span>View details</span>
          <FiArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ─── */
export default function Projects() {
  const [activeTab, setActiveTab] = useState('work');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeData = categories.find((c) => c.key === activeTab);

  const openModal = useCallback((project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section id="projects" className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 2xl:pt-40 2xl:pb-36 bg-navy-50/50 dark:bg-navy-900/60 section-dark-alt overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient sweep */}
        <div className="absolute inset-0 projects-gradient-sweep" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.01]"
          style={{
            backgroundImage: 'linear-gradient(rgba(234,179,8,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.25) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Pulsing glow orbs */}
        <div className="absolute -top-20 -right-20 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] bg-brand-300/10 dark:bg-brand-500/[0.04] projects-glow" />
        <div className="absolute bottom-10 -left-20 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-indigo-300/8 dark:bg-indigo-500/[0.03] projects-glow" style={{ animationDelay: '-3s' }} />

        {/* Floating accent dots */}
        <div className="absolute top-1/4 right-[15%] w-2 h-2 rounded-full bg-brand-400/20 dark:bg-brand-400/10 projects-float" />
        <div className="absolute bottom-1/3 left-[10%] w-1.5 h-1.5 rounded-full bg-indigo-400/20 dark:bg-indigo-400/10 projects-float-alt" />
        <div className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-emerald-400/25 dark:bg-emerald-400/10 projects-float" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// projects" title="Projects" />

        {/* Tab bar — 2 categories */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="relative inline-flex gap-1 p-1 rounded-xl bg-navy-100/80 dark:bg-navy-800/60 border border-navy-200/40 dark:border-navy-700/30">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`relative z-10 flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-navy-600 dark:text-navy-300 hover:text-navy-800 dark:hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-lg bg-brand-500 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeData.data.length > 0 ? (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {activeData.data.map((proj, i) => (
                  <ProjectCard
                    key={proj.title}
                    project={proj}
                    index={i}
                    onClick={() => openModal(proj, i)}
                  />
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-sm text-navy-400 py-12">No projects in this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            index={selectedIndex}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
