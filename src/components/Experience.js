import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={ref}>
      {/* Background — vertical glow pulse + floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-20 left-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-brand-200/10 dark:bg-brand-500/[0.04] blur-3xl"
          animate={{ x: [0, -20, 15, 0], y: [0, 15, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Vertical light pulse traveling through the section */}
        <motion.div
          className="absolute left-[50px] sm:left-[80px] w-[1px] h-32 bg-gradient-to-b from-transparent via-brand-400/20 to-transparent hidden sm:block"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-20 w-16 h-16 border border-brand-300/5 dark:border-brand-500/[0.03] rounded-full hidden lg:block"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="// experience" title="Where I've worked" />

        <div className="relative">
          {/* Scroll-driven timeline line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-navy-200/40 dark:bg-navy-700/20 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-brand-500 via-brand-400 to-brand-300 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-6 sm:space-y-10 lg:space-y-12">
            {experiences.map(({ role, company, period, items }, idx) => (
              <motion.div
                key={idx}
                className="relative pl-12 sm:pl-14"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                transition={{ delay: 0.2 + idx * 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Timeline dot with glow */}
                <motion.div
                  className="absolute left-[6px] top-2 w-[22px] h-[22px] rounded-full bg-brand-500 flex items-center justify-center z-10 ring-4 ring-white dark:ring-navy-900"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                  transition={{ delay: 0.3 + idx * 0.2, type: 'spring', stiffness: 350, damping: 15 }}
                  whileHover={{ scale: 1.5, boxShadow: '0 0 24px -3px rgba(234, 179, 8, 0.5)' }}
                >
                  <FiBriefcase size={9} className="text-white" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="gradient-border p-4 sm:p-5 md:p-6 2xl:p-7 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-navy-50/40 dark:bg-navy-800/40 hover-glow"
                  whileHover={{ y: -5, x: 5, boxShadow: '0 20px 40px -12px rgba(234, 179, 8, 0.08)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-navy-800 dark:text-white">{role}</h3>
                      <p className="text-brand-600 dark:text-brand-400 text-xs sm:text-sm font-semibold mt-0.5">{company}</p>
                    </div>
                    <motion.span
                      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-navy-100 dark:bg-navy-700/40 text-navy-500 dark:text-navy-300 border border-navy-200/50 dark:border-navy-600/20"
                      initial={{ opacity: 0, x: 15 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
                      transition={{ delay: 0.5 + idx * 0.2 }}
                    >
                      <FiCalendar size={10} />
                      {period}
                    </motion.span>
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
                    {items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed"
                        initial={{ opacity: 0, x: -16 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                        transition={{ delay: 0.55 + idx * 0.2 + i * 0.06, duration: 0.4 }}
                      >
                        <motion.span
                          className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-500/50 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={inView ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.65 + idx * 0.2 + i * 0.06, type: 'spring', stiffness: 500 }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
