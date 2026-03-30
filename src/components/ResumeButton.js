import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCheck } from 'react-icons/fi';
import { profile } from '../data/portfolioData';

const iconVariants = {
  idle: { y: 0, rotate: 0 },
  downloading: {
    y: [0, 6, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 0.8, repeat: Infinity, ease: 'linear' },
  },
};

export default function ResumeButton() {
  const [state, setState] = useState('idle'); // idle | downloading | success | error

  const handleClick = useCallback(() => {
    if (state !== 'idle') return;

    try {
      window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer');
      setState('success');
      setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  }, [state]);

  const isDownloading = state === 'downloading';

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        disabled={state !== 'idle'}
        aria-label="Download resume"
        title="Download Resume (PDF)"
        className={`group relative px-5 sm:px-6 py-2.5 rounded-lg border text-sm font-semibold flex items-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900 ${
          state === 'idle'
            ? 'border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 dark:hover:border-brand-500/40'
            : 'border-brand-400/60 dark:border-brand-500/40 text-brand-600 dark:text-brand-400 pointer-events-none opacity-85'
        }`}
        whileHover={state === 'idle' ? { y: -4, scale: 1.05, boxShadow: '0 12px 30px -8px rgba(234, 179, 8, 0.25)' } : {}}
        whileTap={state === 'idle' ? { scale: 0.93 } : {}}
        animate={isDownloading ? { boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 20px rgba(234,179,8,0.2)', '0 0 0px rgba(234,179,8,0)'] } : {}}
        transition={isDownloading ? { duration: 1.2, repeat: Infinity } : {}}
      >
        {/* Icon area */}
        <span className="relative inline-flex w-[14px] h-[14px] items-center justify-center">
          <AnimatePresence mode="wait">
            {state === 'downloading' ? (
              <motion.span
                key="spinner"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="block w-3.5 h-3.5 border-2 border-brand-500/30 border-t-brand-500 rounded-full"
                  variants={spinnerVariants}
                  animate="animate"
                />
              </motion.span>
            ) : state === 'success' ? (
              <motion.span
                key="check"
                className="absolute inset-0 flex items-center justify-center text-emerald-500"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <FiCheck size={14} strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span
                key="download"
                className="absolute inset-0 flex items-center justify-center"
                variants={iconVariants}
                animate="idle"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex group-hover:translate-y-0.5 transition-transform duration-300"
                >
                  <FiDownload size={14} />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {state === 'downloading' ? 'Downloading...' : state === 'success' ? 'Opened!' : 'Resume'}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Toast messages */}
      <AnimatePresence>
        {state === 'success' && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-8 left-0 right-0 text-center text-[11px] text-emerald-500 dark:text-emerald-400 whitespace-nowrap font-medium"
          >
            Resume opened successfully
          </motion.span>
        )}
        {state === 'error' && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-8 left-0 right-0 text-center text-[11px] text-red-500 dark:text-red-400 whitespace-nowrap font-medium"
          >
            Unable to load resume
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
