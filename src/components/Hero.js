import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiDocker, SiKubernetes, SiRedis } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';
import ResumeButton from './ResumeButton';

const cycleWords = ['Microservices', 'Scalable APIs', 'Distributed Systems', 'Event-Driven Architecture'];

const floatingIcons = [
  { Icon: FaJava, x: '6%', y: '20%', delay: 0, size: 24, color: 'text-orange-400/30 dark:text-orange-400/20' },
  { Icon: SiSpringboot, x: '88%', y: '22%', delay: 1, size: 20, color: 'text-emerald-400/30 dark:text-emerald-400/20' },
  { Icon: SiApachekafka, x: '82%', y: '72%', delay: 2.5, size: 22, color: 'text-cyan-400/25 dark:text-cyan-400/15' },
  { Icon: SiDocker, x: '10%', y: '78%', delay: 1.5, size: 21, color: 'text-blue-400/25 dark:text-blue-400/15' },
  { Icon: SiKubernetes, x: '93%', y: '48%', delay: 3, size: 19, color: 'text-indigo-400/25 dark:text-indigo-400/15' },
  { Icon: SiRedis, x: '4%', y: '50%', delay: 2, size: 18, color: 'text-red-400/20 dark:text-red-400/12' },
];

/* ─── Desktop tilt card ─── */
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

/* ─── Code lines data ─── */
const codeLines = [
  { indent: 0, content: <><span className="text-purple-400">public class</span> <span className="text-emerald-400">Developer</span> {'{'}</> },
  { indent: 1, content: <><span className="text-purple-400">private</span> String name = <span className="text-amber-300">"Honnur Ali"</span>;</> },
  { indent: 1, content: <><span className="text-purple-400">private</span> String focus = <span className="text-amber-300">"Backend"</span>;</> },
  { indent: 0, content: null },
  { indent: 1, content: <><span className="text-purple-400">private</span> String[] stack = {'{'}</> },
  { indent: 2, content: <><span className="text-amber-300">"Java"</span>, <span className="text-amber-300">"Spring Boot"</span>,</> },
  { indent: 2, content: <><span className="text-amber-300">"Kafka"</span>, <span className="text-amber-300">"Microservices"</span></> },
  { indent: 2, content: <><span className="text-amber-300">"React"</span>, <span className="text-amber-300">"AWS"</span></> },
  { indent: 2, content: <><span className="text-amber-300">"MongoDB"</span>, <span className="text-amber-300">"MySQL"</span></> },
  { indent: 1, content: <>{'}'};</> },
  { indent: 0, content: null },
  { indent: 1, content: <><span className="text-purple-400">public</span> String <span className="text-cyan-400">motto</span>() {'{'}</> },
  { indent: 2, content: <><span className="text-purple-400">return</span> <span className="text-amber-300">"Ship it."</span>;</> },
  { indent: 1, content: <>{'}'}</> },
  { indent: 0, content: <>{'}'}</> },
];

/* ─── Code card inner ─── */
const CodeCardInner = memo(function CodeCardInner() {
  return (
    <div className="rounded-xl border border-navy-700/60 dark:border-navy-700/40 bg-navy-900 dark:bg-navy-800/90 shadow-2xl shadow-navy-900/20 dark:shadow-black/50 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-navy-700/50 dark:border-navy-700/30 bg-navy-800/50 dark:bg-navy-800/80">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
        <span className="ml-2 sm:ml-3 text-[10px] sm:text-[11px] text-navy-500 font-mono">Developer.java</span>
      </div>
      {/* Code lines — static, no fade animation */}
      <div className="p-3 sm:p-4 xl:p-5 font-mono text-[10px] sm:text-[11px] xl:text-[12.5px] leading-[1.7] sm:leading-[1.9] text-navy-300 overflow-x-auto scrollbar-none">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className={line.content === null ? 'h-1.5 sm:h-2' : 'whitespace-nowrap'}
            style={{ paddingLeft: `${line.indent * 0.75}rem` }}
          >
            {line.content && (
              <>
                <span className="text-navy-600 select-none mr-2 sm:mr-4 text-[9px] sm:text-[10px]">{String(i + 1).padStart(2, ' ')}</span>
                {line.content}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

/* ─── Hero Section ─── */
export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(true);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-40px' });

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
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-white dark:bg-navy-900 noise-overlay lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800/80" />

        <div className="absolute -top-32 -right-32 w-[250px] sm:w-[350px] lg:w-[550px] 2xl:w-[650px] h-[250px] sm:h-[350px] lg:h-[550px] 2xl:h-[650px] bg-brand-200/25 dark:bg-brand-500/[0.08] blur-3xl animate-morph" />
        <div
          className="absolute -bottom-32 -left-32 w-[200px] sm:w-[300px] lg:w-[450px] 2xl:w-[550px] h-[200px] sm:h-[300px] lg:h-[450px] 2xl:h-[550px] bg-navy-200/30 dark:bg-brand-500/[0.04] blur-3xl animate-morph"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[150px] sm:w-[250px] lg:w-[350px] h-[150px] sm:h-[250px] lg:h-[350px] bg-brand-300/8 dark:bg-accent-green/[0.03] blur-3xl animate-morph"
          style={{ animationDelay: '8s' }}
        />

        {/* Dot grid — hidden on mobile for clean look */}
        <div className="absolute inset-0 dot-grid text-navy-300/20 dark:text-navy-700/10 hidden md:block" />

        {/* Mobile-only floating corner accents — pure CSS */}
        <div className="md:hidden">
          <span className="absolute top-16 left-4 w-3 h-3 rounded-full bg-brand-400/25 dark:bg-brand-400/15 animate-hero-float-1" />
          <span className="absolute top-20 right-5 w-2.5 h-2.5 rounded-full bg-emerald-400/25 dark:bg-emerald-400/15 animate-hero-float-2" />
          <span className="absolute bottom-24 left-6 w-2 h-2 rounded-full bg-purple-400/25 dark:bg-purple-400/15 animate-hero-float-3" />
          <span className="absolute bottom-32 right-4 w-3 h-3 rounded-full bg-cyan-400/20 dark:bg-cyan-400/12 animate-hero-float-4" />
        </div>

        {floatingIcons.map(({ Icon, x: posX, y: posY, delay, size, color }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color} hidden md:block`}
            style={{ left: posX, top: posY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + delay * 0.25, duration: 0.5 }}
          >
            <div
              className="animate-float"
              style={{ animationDuration: `${8 + i * 2}s`, animationDelay: `${i * 0.5}s` }}
            >
              <Icon size={size} />
            </div>
          </motion.div>
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <div className="orbit-ring w-[500px] h-[500px] -ml-[250px] -mt-[250px] animate-spin-slower opacity-30" />
          <div className="orbit-ring w-[700px] h-[700px] -ml-[350px] -mt-[350px] animate-spin-slow opacity-15" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 2xl:gap-16 items-center">

          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status badge */}
            <div className="mb-5 sm:mb-6">
              <motion.span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-brand-300/40 dark:border-brand-500/25 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/[0.08]"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to work
              </motion.span>
            </div>

            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-[4rem] 3xl:text-7xl font-bold leading-[1.08] text-navy-900 dark:text-white flex flex-wrap gap-x-2 sm:gap-x-3"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block">{word}</span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-3 text-base sm:text-lg md:text-xl 2xl:text-2xl text-navy-500 dark:text-navy-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {profile.role}
            </motion.p>

            {/* Typing effect */}
            <motion.div
              className="mt-3 sm:mt-4 h-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
            >
              <span className="font-mono text-xs sm:text-sm text-navy-400">
                <span className="text-brand-500">{'>'}</span>{' '}
                <span className="text-brand-600 dark:text-brand-400">{text}</span>
                <span className="blink text-brand-500 font-bold">_</span>
              </span>
            </motion.div>

            <motion.p
              className="mt-4 sm:mt-5 text-navy-500 dark:text-navy-400 max-w-lg 2xl:max-w-xl leading-relaxed text-sm sm:text-[15px] 2xl:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {profile.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.45 }}
            >
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 16px 40px -10px rgba(234, 179, 8, 0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/projects"
                  className="group relative px-5 sm:px-6 py-2.5 rounded-lg bg-navy-900 dark:bg-brand-500 text-white dark:text-navy-900 text-sm font-semibold overflow-hidden inline-block"
                >
                  <span className="relative z-10">View Projects</span>
                </Link>
              </motion.div>
              <ResumeButton />
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 30px -8px rgba(234, 179, 8, 0.15)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex px-5 sm:px-6 py-2.5 rounded-lg border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 text-sm font-semibold hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 dark:hover:border-brand-500/40 transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="mt-6 sm:mt-8 flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { Icon: FiGithub, href: profile.github, external: true, label: 'GitHub profile' },
                { Icon: FiLinkedin, href: profile.linkedin, external: true, label: 'LinkedIn profile' },
                { Icon: FiMail, href: `mailto:${profile.email}`, external: false, label: 'Send email' },
              ].map(({ Icon, href, external, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="p-2.5 rounded-xl border border-navy-200 dark:border-navy-700 text-navy-400 hover:text-brand-500 hover:border-brand-400 dark:hover:border-brand-500/40 transition-all"
                  whileHover={{ y: -5, scale: 1.12, boxShadow: '0 10px 24px -6px rgba(234, 179, 8, 0.18)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.08, duration: 0.4 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Code card */}
          <motion.div
            className="w-full max-w-md mx-auto lg:max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Desktop: tilt effect */}
            <div className="hidden lg:block perspective-1200 group">
              <TiltCard>
                <CodeCardInner />
              </TiltCard>
            </div>

            {/* Mobile/Tablet: CSS auto-tilt simulating desktop hover */}
            <div className="lg:hidden" style={{ perspective: '1400px' }}>
              <div className="animate-auto-tilt">
                <CodeCardInner />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
