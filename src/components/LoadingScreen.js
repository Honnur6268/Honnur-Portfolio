import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-navy-950"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Terminal prompt */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <span className="font-mono text-brand-500 text-sm font-bold">$</span>
        <motion.span
          className="font-mono text-sm tracking-widest text-navy-400 dark:text-navy-300"
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ~/Honnur/portfolio
        </motion.span>
        <motion.span
          className="blink text-brand-500 font-mono font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          _
        </motion.span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-[3px] rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500"
          style={{ backgroundSize: '200% 800%' }}
          initial={{ width: 0 }}
          animate={{ width: '100%', backgroundPosition: ['0% 0%', '100% 0%'] }}
          transition={{ width: { duration: 1.3, ease: [0.22, 1, 0.36, 1] }, backgroundPosition: { duration: 1.3, ease: 'linear' } }}
        />
      </div>

      {/* Loading dots */}
      <motion.div
        className="flex gap-1.5 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-brand-500/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
