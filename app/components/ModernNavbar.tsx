'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, Home, User, Briefcase, Menu, X, BookOpen } from 'lucide-react';

interface ModernNavbarProps {
}

export default function ModernNavbar({}: ModernNavbarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectsMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  const projectItems = [
    { name: 'Architecture', href: '/architecture' },
    { name: 'Machine Learning', href: 'https://github.com/MasihMoafi?tab=repositories&q=&type=&language=&sort=name', external: true },
  ];


  const getNavbarBg = () => {
    return scrolled 
      ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' 
      : 'bg-transparent';
  };

  const getTextColor = () => {
    return 'text-white';
  };

  const getTextColorSecondary = () => {
    return 'text-gray-300';
  };

  const getHoverColor = () => {
    return 'hover:text-white';
  };

  const getMenuBg = () => {
    return 'bg-black/90';
  };

  const getBorderColor = () => {
    return 'border-white/10';
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-start h-16">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link 
                    href={item.href}
                    className={`flex items-center space-x-1 ${getTextColorSecondary()} ${getHoverColor()} transition-colors group`}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-teal-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  className={`flex items-center space-x-1 ${getTextColorSecondary()} ${getHoverColor()} transition-colors group`}
                >
                  <Briefcase className="w-4 h-4 group-hover:text-teal-400 transition-colors" />
                  <span>Projects</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isProjectsOpen && (
                    <motion.div
                      variants={projectsMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`absolute top-full left-0 mt-2 w-64 ${getMenuBg()} backdrop-blur-lg border ${getBorderColor()} rounded-lg shadow-xl overflow-hidden`}
                      onMouseLeave={() => setIsProjectsOpen(false)}
                    >
                      {projectItems.map((item) => (
                        <motion.div
                          key={item.name}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                          className="transition-colors"
                        >
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block px-4 py-3 ${getTextColorSecondary()} ${getHoverColor()} transition-colors`}
                            >
                              {item.name}
                              <span className="text-xs text-gray-500 ml-2">↗</span>
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className={`block px-4 py-3 ${getTextColorSecondary()} ${getHoverColor()} transition-colors`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}