'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
// Using system fonts to avoid Google Fonts issues
import { useState, useRef, useEffect } from 'react';
import ModernNavbar from './components/ModernNavbar';
import MovingStars from './components/MovingStars';
import { useMusicContext } from './components/MusicProvider';
// Removed anime.js for now to fix build

// Using system fonts


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'sunny' | 'gloomy'>('gloomy');
  const { audioRef, isMuted, setIsMuted, toggleMute, playMusic } = useMusicContext();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const animationComplete = useRef(false);
  const [displayedName, setDisplayedName] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const name = "Masih Moafi";

  useEffect(() => {
    setMounted(true);
    
    // Typewriter effect
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < name.length) {
        setDisplayedName(name.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typewriterInterval);
      }
    }, 150); // Adjust speed here

    return () => clearInterval(typewriterInterval);
  }, []);

  const handleThemeChange = (theme: 'sunny' | 'gloomy') => {
    setCurrentTheme(theme);
    // Don't change music on theme change
  };

  const getBackgroundStyle = () => {
    return "url('/background.jpg')"; 
  };

  const getTextColor = () => {
    return currentTheme === 'sunny' ? 'text-black' : 'text-white';
  };

  const getAccentColor = () => {
    return currentTheme === 'sunny' ? 'text-teal-600' : 'text-orange-300'; // Teal is opposite of orange
  };

  const getButtonClass = () => {
    return 'px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg font-semibold';
  };

  const getSecondaryButtonClass = () => {
    return 'px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg font-semibold';
  };


  if (!mounted) {
    return null;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black" 
      style={{
        backgroundImage: getBackgroundStyle(), 
        backgroundSize: '81%', 
        backgroundPosition: 'center center', 
        backgroundRepeat: 'no-repeat'
      }} 
      data-theme="dark"
    >
      <ModernNavbar />
      
      <MovingStars starColor='#ffffff' />

      <div className="relative z-10 flex flex-col items-center justify-start pt-32 min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <h1
            ref={nameRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-6 font-mono ${getTextColor()}`}
          >
            {displayedName}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </h1>

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
                Learn More About Me
              </motion.a>
              
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={getSecondaryButtonClass()}
              >
                View My Work
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      <button
        onClick={toggleMute}
        className={`absolute bottom-8 left-8 z-20 p-2 rounded-full transition-colors ${
          currentTheme === 'sunny' 
            ? 'text-black bg-gray-200 hover:bg-gray-300' 
            : 'text-white bg-gray-700 hover:bg-gray-600'
        }`}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

    </div>
  );
}
