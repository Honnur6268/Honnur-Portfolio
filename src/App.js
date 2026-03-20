import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import ParticleField from './components/ParticleField';
import MouseGlow from './components/MouseGlow';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
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
              <ScrollToTop />

              <Navbar />
              <main className="relative z-[2]">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </motion.div>
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
