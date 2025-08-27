'use client';

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-50 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white hover:text-orange-200 transition-all duration-300 shadow-xl group"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: theme === 'light' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        )}
      </motion.div>
    </motion.button>
  );
}