import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiDocker, SiKubernetes, SiRedis } from 'react-icons/si';
import { wordReveal, wordChild, stagger, staggerChild } from '../utils/animations';
import { profile } from '../data/portfolioData';

const cycleWords = ['Microservices', 'Scalable APIs', 'Distributed Systems', 'Event-Driven Architecture'];

const floatingIcons = [
  { Icon: FaJava, x: '6%', y: '20%', delay: 0, size: 24, color: 'text-orange-400/30 dark:text-orange-400/20' },
  { Icon: SiSpringboot, x: '88%', y: '22%', delay: 1, size: 20, color: 'text-emerald-400/30 dark:text-emerald-400/20' },
  { Icon: SiApachekafka, x: '82%', y: '72%', delay: 2.5, size: 22, color: 'text-cyan-400/25 dark:text-cyan-400/15' },
  { Icon: SiDocker, x: '10%', y: '78%', delay: 1.5, size: 21, color: 'text-blue-400/25 dark:text-blue-400/15' },
  { Icon: SiKubernetes, x: '93%', y: '48%', delay: 3, size: 19, color: 'text-indigo-400/25 dark:text-indigo-400/15' },
  { Icon: SiRedis, x: '4%', y: '50%', delay: 2, size: 18, color: 'text-red-400/20 dark:text-red-400/12' },
];

function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-200, 200], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-12, 12]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(x, [-200, 200], [0, 100]);
  const glowY = useTransform(y, [-200, 200], [0, 100]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(234,179,8,0.15), transparent 65%)`
  );

  const handleMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-1 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: glowBg }}
      />
      {children}
    </motion.div>
  );
}

const codeLines = [
  { indent: 0, content: <><span className="text-purple-400">public class</span> <span className="text-emerald-400">Developer</span> {'{'}</> },
  { indent: 4, content: <><span className="text-purple-400">private</span> String name = <span className="text-amber-300">"Honnur Ali"</span>;</> },
  { indent: 4, content: <><span className="text-purple-400">private</span> String focus = <span className="text-amber-300">"Backend"</span>;</> },
  { indent: 0, content: null },
  { indent: 4, content: <><span className="text-purple-400">private</span> String[] stack = {'{'}</> },
  { indent: 8, content: <><span className="text-amber-300">"Java"</span>, <span className="text-amber-300">"Spring Boot"</span>,</> },
  { indent: 8, content: <><span className="text-amber-300">"Kafka"</span>, <span className="text-amber-300">"Microservices"</span></> },
  { indent: 8, content: <><span className="text-amber-300">"React"</span>, <span className="text-amber-300">"AWS"</span></> },
  { indent: 8, content: <><span className="text-amber-300">"MongoDB"</span>, <span className="text-amber-300">"MySQL"</span></> },
  { indent: 4, content: <>{'}'};</> },
  { indent: 0, content: null },
  { indent: 4, content: <><span className="text-purple-400">public</span> String <span className="text-cyan-400">motto</span>() {'{'}</> },
  { indent: 8, content: <><span className="text-purple-400">return</span> <span className="text-amber-300">"Ship it."</span>;</> },
  { indent: 4, content: <>{'}'}</> },
  { indent: 0, content: <>{'}'}</> },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = cycleWords[wordIdx];
    let t;
    if (typing) {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 85);
      } else {
        t = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 45);
      } else {
        setWordIdx((i) => (i + 1) % cycleWords.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [text, typing, wordIdx]);

  const titleWords = `Hi, I'm ${profile.name}`.split(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white dark:bg-navy-900 overflow-hidden noise-overlay">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark mode gradient overlay */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800/80" />

        {/* Morphing gradient blobs */}
        <motion.div
          className="absolute -top-32 -right-32 w-[350px] sm:w-[450px] lg:w-[550px] 2xl:w-[650px] h-[350px] sm:h-[450px] lg:h-[550px] 2xl:h-[650px] bg-brand-200/25 dark:bg-brand-500/[0.08] blur-3xl animate-morph"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[300px] sm:w-[400px] lg:w-[450px] 2xl:w-[550px] h-[300px] sm:h-[400px] lg:h-[450px] 2xl:h-[550px] bg-navy-200/30 dark:bg-brand-500/[0.04] blur-3xl animate-morph"
          style={{ animationDelay: '4s' }}
          animate={{ x: [0, -25, 20, 0], y: [0, 30, -15, 0], scale: [1, 0.93, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[250px] lg:w-[350px] h-[250px] lg:h-[350px] bg-brand-300/8 dark:bg-accent-green/[0.03] blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Parallax dot grid */}
        <motion.div
          className="absolute inset-0 dot-grid text-navy-300/20 dark:text-navy-700/10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating tech icons */}
        {floatingIcons.map(({ Icon, x: posX, y: posY, delay, size, color }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color} hidden sm:block`}
            style={{ left: posX, top: posY }}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.2 + delay * 0.25, duration: 0.7, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              animate={{
                y: [0, -(8 + i * 2), 0],
                rotate: [0, 6 + i, -(4 + i), 0],
                scale: [1, 1.05, 0.97, 1],
              }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.15 }}
            >
              <Icon size={size} />
            </motion.div>
          </motion.div>
        ))}

        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <div className="orbit-ring w-[500px] h-[500px] -ml-[250px] -mt-[250px] animate-spin-slower opacity-30" />
          <div className="orbit-ring w-[700px] h-[700px] -ml-[350px] -mt-[350px] animate-spin-slow opacity-15" />
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5 w-full py-20 pt-24 sm:py-24 sm:pt-28 lg:py-24 lg:pt-28">
        <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-8 2xl:gap-16 items-center">
          {/* Left — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            variants={stagger(0.1, 0.12)}
            initial="hidden"
            animate="show"
          >
            {/* Status badge */}
            <motion.div variants={staggerChild} className="mb-5 sm:mb-6">
              <motion.span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-brand-300/40 dark:border-brand-500/25 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/[0.08]"
                whileHover={{ scale: 1.06, boxShadow: '0 0 20px -3px rgba(234, 179, 8, 0.25)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to work
              </motion.span>
            </motion.div>

            {/* Heading with word-by-word blur reveal */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl 2xl:text-[4rem] 3xl:text-7xl font-bold leading-[1.08] text-navy-900 dark:text-white flex flex-wrap gap-x-2 sm:gap-x-3"
              variants={wordReveal}
              initial="hidden"
              animate="show"
            >
              {titleWords.map((word, i) => (
                <motion.span key={i} variants={wordChild} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-3 text-base sm:text-lg md:text-xl 2xl:text-2xl text-navy-500 dark:text-navy-300 font-medium"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {profile.role}
            </motion.p>

            {/* Typing effect */}
            <motion.div
              className="mt-3 sm:mt-4 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <span className="font-mono text-xs sm:text-sm text-navy-400">
                <span className="text-brand-500">{'>'}</span>{' '}
                <span className="text-brand-600 dark:text-brand-400">{text}</span>
                <span className="blink text-brand-500 font-bold">_</span>
              </span>
            </motion.div>

            <motion.p
              className="mt-4 sm:mt-5 text-navy-500 dark:text-navy-400 max-w-lg 2xl:max-w-xl leading-relaxed text-sm sm:text-[15px] 2xl:text-base"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.55 }}
            >
              {profile.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-5 sm:px-6 py-2.5 rounded-lg bg-navy-900 dark:bg-brand-500 text-white dark:text-navy-900 text-sm font-semibold overflow-hidden"
                whileHover={{ y: -4, boxShadow: '0 16px 40px -10px rgba(234, 179, 8, 0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-400/20 dark:from-brand-600/30 dark:to-brand-400/30"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.35 }}
                />
              </motion.a>
              <motion.a
                href={profile.resumeUrl}
                className="px-5 sm:px-6 py-2.5 rounded-lg border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 text-sm font-semibold flex items-center gap-2 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 dark:hover:border-brand-500/40 transition-colors"
                whileHover={{ y: -4, boxShadow: '0 12px 30px -8px rgba(234, 179, 8, 0.15)' }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                  <FiDownload size={14} />
                </motion.span>
                Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="hidden sm:inline-flex px-5 sm:px-6 py-2.5 rounded-lg border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 text-sm font-semibold hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 dark:hover:border-brand-500/40 transition-colors"
                whileHover={{ y: -4, boxShadow: '0 12px 30px -8px rgba(234, 179, 8, 0.15)' }}
                whileTap={{ scale: 0.97 }}
              >
                Contact
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="mt-6 sm:mt-8 flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
            >
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
                  className="p-2.5 rounded-xl border border-navy-200 dark:border-navy-700 text-navy-400 hover:text-brand-500 hover:border-brand-400 dark:hover:border-brand-500/40 transition-all"
                  whileHover={{ y: -5, scale: 1.12, boxShadow: '0 10px 24px -6px rgba(234, 179, 8, 0.18)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Tilt code card */}
          <motion.div
            className="lg:col-span-2 hidden lg:block perspective-1200 group"
            initial={{ opacity: 0, y: 50, rotateY: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard>
              <div className="rounded-xl border border-navy-700/60 dark:border-navy-700/40 bg-navy-900 dark:bg-navy-800/90 shadow-2xl shadow-navy-900/20 dark:shadow-black/50 overflow-hidden animate-glow-pulse">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-navy-700/50 dark:border-navy-700/30 bg-navy-800/50 dark:bg-navy-800/80">
                  <motion.span className="w-3 h-3 rounded-full bg-red-400/80" whileHover={{ scale: 1.5, backgroundColor: '#f87171' }} />
                  <motion.span className="w-3 h-3 rounded-full bg-yellow-400/80" whileHover={{ scale: 1.5, backgroundColor: '#facc15' }} />
                  <motion.span className="w-3 h-3 rounded-full bg-green-400/80" whileHover={{ scale: 1.5, backgroundColor: '#4ade80' }} />
                  <span className="ml-3 text-[11px] text-navy-500 font-mono">Developer.java</span>
                </div>
                {/* Code lines with staggered reveal */}
                <div className="p-4 xl:p-5 font-mono text-[11px] xl:text-[12.5px] leading-[1.9] text-navy-300">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.9 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={line.content === null ? 'h-2' : ''}
                      style={{ paddingLeft: line.indent * 6 }}
                    >
                      {line.content && (
                        <>
                          <span className="text-navy-600 select-none mr-4 text-[10px]">{String(i + 1).padStart(2, ' ')}</span>
                          {line.content}
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-navy-300 dark:text-navy-500 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          whileHover={{ scale: 1.15 }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            scroll
          </span>
          <motion.div className="w-5 h-8 rounded-full border border-navy-300 dark:border-navy-600 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-brand-500"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
