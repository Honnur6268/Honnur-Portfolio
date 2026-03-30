import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass border-b border-navy-100/50 dark:border-navy-800/50 shadow-sm shadow-navy-900/[0.03]' : ''
      }`}
    >
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.4))' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-sm text-navy-800 dark:text-white transition-colors"
          >
            <img src="/favicon.svg" alt="HA" className="w-8 h-8 rounded-lg" />
            <span className="font-mono text-sm">
              <span className="text-brand-500">$</span> java.dev
            </span>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-navy-500 dark:text-navy-300 hover:text-navy-800 dark:hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-brand-500/[0.08] dark:bg-brand-500/[0.12] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="w-px h-5 bg-navy-200 dark:bg-navy-700 mx-2" />
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-navy-400 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
            whileTap={{ scale: 0.8, rotate: 25 }}
            whileHover={{ scale: 1.12 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ rotate: -120, opacity: 0, scale: 0.3 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 120, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1.5">
          <motion.button
            onClick={toggleTheme}
            className="p-2 text-navy-500 dark:text-navy-300"
            aria-label="Toggle theme"
            whileTap={{ scale: 0.85, rotate: 20 }}
          >
            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </motion.button>
          <motion.button
            onClick={() => setOpen(!open)}
            className="p-2 text-navy-500 dark:text-navy-300"
            aria-label={open ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden glass border-t border-navy-100 dark:border-navy-800"
          >
            <div className="px-4 sm:px-6 lg:px-8 py-3 space-y-1">
              {links.map(({ to, label }, i) => {
                const isActive = pathname === to;
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={to}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-brand-600 bg-brand-500/[0.08]'
                          : 'text-navy-600 dark:text-navy-300'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
