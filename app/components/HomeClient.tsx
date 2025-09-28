'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ModernNavbar from './ModernNavbar';
import SocialLinks from './SocialLinks';
import MovingStars from './MovingStars';

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'sunny' | 'gloomy'>('gloomy');
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [displayedName, setDisplayedName] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const name = "MASIH MOAFI";

  useEffect(() => {
    setMounted(true);
    
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index <= name.length) {
        setDisplayedName(name.substring(0, index));
        index++;
        if (index > name.length) {
          setIsTypingComplete(true);
          clearInterval(typewriterInterval);
        }
      }
    }, 150);

    return () => clearInterval(typewriterInterval);
  }, []);

  const getTextColor = () => {
    return currentTheme === 'sunny' ? 'text-black' : 'text-white';
  };

  const getSecondaryButtonClass = () => {
    return 'px-8 py-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-200 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform';
  };

  if (!mounted) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden bg-black" 
        data-theme="dark"
      >
        {/* Loading state can be a simple spinner or skeleton screen */}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black" 
      data-theme="dark"
    >
      {mounted && <MovingStars />}
      <ModernNavbar />
      
      <div className="relative z-20 flex flex-col items-center justify-start pt-32 min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <h1
            ref={nameRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-normal leading-none mb-2 ${getTextColor()}`}
            style={{letterSpacing: '2px', fontWeight: '400'}}
          >
            {displayedName}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </h1>
          
          <p className={`text-lg md:text-xl font-light opacity-70 mb-6 ${getTextColor()}`}>
            AI/ML Engineer
          </p>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="space-y-4"
          >
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,128,128,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className={getSecondaryButtonClass()}
              >
                About Me
              </motion.a>
              
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={getSecondaryButtonClass()}
              >
                Portfolio
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="mt-8"
            >
              <SocialLinks className="justify-center" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
