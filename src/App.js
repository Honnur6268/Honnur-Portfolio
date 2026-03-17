import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import ParticleField from './components/ParticleField';
import MouseGlow from './components/MouseGlow';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-navy-900 text-navy-800 dark:text-navy-100 transition-colors duration-300 custom-scrollbar">
        <AnimatePresence mode="wait">
          {loading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ParticleField />
            <MouseGlow />
            <ScrollProgress />
            <BackToTop />

            <Navbar />
            <main className="relative z-[2]">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Achievements />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}
