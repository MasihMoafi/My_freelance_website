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
  const [nameLetters, setNameLetters] = useState<string[]>([]);
  const name = "Masih Moafi";

  useEffect(() => {
    setMounted(true);

    // Split the name into individual letters with spaces preserved
    const letters = name.split('').map((letter) => letter);
    setNameLetters(letters);
  }, []);

  const handleThemeChange = (theme: 'sunny' | 'gloomy') => {
    setCurrentTheme(theme);
    // Don't change music on theme change
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-black"
      style={{
        backgroundImage: `url(/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <ModernNavbar onThemeChange={handleThemeChange} currentTheme={currentTheme} />
      
      <MovingStars key={currentTheme} starColor={'#ffffff'} />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-64">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <h1
            ref={nameRef}
            className={`text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 font-sans text-white`}
          >
            Masih Moafi
          </h1>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="space-x-8"
          >
            <a href="/about" className={`text-xl md:text-2xl text-white`}>
              About Me
            </a>
            <a href="/projects" className={`text-xl md:text-2xl text-white`}>
              Projects
            </a>
          </motion.div>
        </motion.div>

      </div>

      <button
        onClick={toggleMute}
        className={`absolute bottom-8 left-8 z-20 p-2 rounded-full transition-colors text-white bg-gray-700 hover:bg-gray-600`}
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
