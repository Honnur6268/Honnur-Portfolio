import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { profile } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 border-t border-navy-100 dark:border-navy-800/50 bg-white dark:bg-navy-900">
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <span className="font-mono text-[11px] sm:text-xs text-navy-400 flex items-center gap-1.5">
          <span className="text-brand-500">$</span> java.dev &mdash; built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiHeart size={11} className="text-red-400" />
          </motion.span>
          &copy; {new Date().getFullYear()} {profile.name}
        </span>

        <div className="flex items-center gap-3">
          {[
            { Icon: FiGithub, href: profile.github },
            { Icon: FiLinkedin, href: profile.linkedin },
            { Icon: FiMail, href: `mailto:${profile.email}` },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-400 hover:text-brand-500 transition-colors"
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
