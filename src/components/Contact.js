import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck, FiLoader } from 'react-icons/fi';
import { fadeLeft, fadeRight } from '../utils/animations';
import SectionHeading from './SectionHeading';
import { profile } from '../data/portfolioData';

function FloatField({ label, name, type = 'text', value, onChange, textarea, delay = 0, inView }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <motion.div
      className="float-label"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45 }}
    >
      <Tag
        type={textarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        rows={textarea ? 5 : undefined}
        className="w-full px-4 py-3 rounded-xl border border-navy-200 dark:border-navy-700/50 bg-white dark:bg-navy-800/50 text-navy-900 dark:text-white text-sm outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:focus:ring-brand-500/20 resize-none"
      />
      <label>{label}</label>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }, 2800);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 2xl:py-36 bg-white dark:bg-navy-900 overflow-hidden" ref={ref}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-brand-200/15 dark:bg-brand-500/[0.05] blur-3xl animate-morph"
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-navy-200/20 dark:bg-accent-green/[0.03] blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl px-5">
        <SectionHeading label="// contact" title="Let's work together" />

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 2xl:gap-12">
          {/* Info */}
          <motion.div className="lg:col-span-2" variants={fadeLeft} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.2}>
            <div className="gradient-border p-5 sm:p-6 md:p-8 2xl:p-10 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-navy-50/40 dark:bg-navy-800/40 h-full">
              <h3 className="text-base sm:text-lg font-bold text-navy-800 dark:text-white mb-2">Get in touch</h3>
              <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-6 sm:mb-8">
                Have a project or opportunity in mind? I'd love to hear about it.
              </p>

              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                {[
                  { Icon: FiMail, label: 'Email', val: profile.email },
                  { Icon: FiMapPin, label: 'Location', val: profile.location },
                ].map(({ Icon, label, val }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.12 }}
                  >
                    <motion.div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-navy-700/50 border border-navy-200/70 dark:border-navy-600/20 flex items-center justify-center text-brand-500"
                      whileHover={{ scale: 1.15, rotate: 8, boxShadow: '0 0 20px -3px rgba(234, 179, 8, 0.25)' }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon size={16} />
                    </motion.div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-navy-400 font-semibold">{label}</p>
                      <p className="text-xs sm:text-sm font-medium text-navy-700 dark:text-navy-200">{val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 sm:pt-5 border-t border-navy-200/70 dark:border-navy-700/30">
                <p className="text-[10px] uppercase tracking-wider text-navy-400 font-semibold mb-3">Connect</p>
                <div className="flex gap-2.5">
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
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-navy-700/50 border border-navy-200/70 dark:border-navy-600/20 flex items-center justify-center text-navy-400 hover:text-brand-500 hover:border-brand-300 dark:hover:border-brand-500/30 transition-all"
                      whileHover={{ y: -5, scale: 1.15, boxShadow: '0 10px 24px -6px rgba(234, 179, 8, 0.18)' }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.65 + i * 0.08 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-3" variants={fadeRight} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.3}>
            <form onSubmit={onSubmit} className="gradient-border p-5 sm:p-6 md:p-8 2xl:p-10 rounded-xl border border-navy-200/70 dark:border-navy-700/30 bg-navy-50/40 dark:bg-navy-800/40">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <FloatField label="Name" name="name" value={form.name} onChange={onChange} delay={0.35} inView={inView} />
                <FloatField label="Email" name="email" type="email" value={form.email} onChange={onChange} delay={0.4} inView={inView} />
              </div>
              <div className="mb-5 sm:mb-6">
                <FloatField label="Message" name="message" value={form.message} onChange={onChange} textarea delay={0.45} inView={inView} />
              </div>

              {/* Submit button with 3 states */}
              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-3 sm:py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
                  status === 'sent'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-navy-900 dark:bg-brand-500 text-white dark:text-navy-900 disabled:opacity-70'
                }`}
                whileHover={status === 'idle' ? { y: -3, boxShadow: '0 14px 35px -10px rgba(234, 179, 8, 0.3)' } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 }}
              >
                {/* Animated gradient sweep on hover */}
                {status === 'idle' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-brand-500/20 via-transparent to-brand-500/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {status === 'sending' ? (
                    <motion.span
                      key="sending"
                      className="relative z-10 flex items-center gap-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                        <FiLoader size={15} />
                      </motion.span>
                      Sending...
                    </motion.span>
                  ) : status === 'sent' ? (
                    <motion.span
                      key="sent"
                      className="relative z-10 flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.4, times: [0, 0.6, 1] }}
                      >
                        <FiCheck size={16} />
                      </motion.span>
                      Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="relative z-10 flex items-center gap-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      <FiSend size={14} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
