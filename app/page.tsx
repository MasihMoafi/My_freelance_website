'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { useState, useRef, useEffect } from 'react'; // Added useEffect
import ThemeSelector from './ThemeSelector'; // Correct import path

const roboto = Roboto({ subsets: ['latin'], weight: '400' }); // Regular weight for subtitle

const sunnyBackgrounds = ['/sunny1.png'];
const gloomyBackgrounds = ['/gloomy.png'];
const darkGloomyBackgrounds = ['/gloomy2.png']; // Really gloomy background

export default function Home() {
  const [background, setBackground] = useState('');
  const [isHoveringProjects, setIsHoveringProjects] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set a default theme when the component mounts
  useEffect(() => {
    handleThemeChange('sunny'); // Set the default theme to 'sunny'
  }, []);

  const handleThemeChange = (theme: 'sunny' | 'gloomy' | 'dark-gloomy') => {
    const backgrounds =
      theme === 'sunny'
        ? sunnyBackgrounds
        : theme === 'gloomy'
        ? gloomyBackgrounds
        : darkGloomyBackgrounds;
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBackground);
    setIsInitialLoad(false); // Disable initial load effect after first theme change
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Image with Animation */}
      {background && (
        <motion.div
          key={background} // Re-render on background change for seamless transition
          initial={{ filter: 'blur(2px)' }} // Starts at 85-90% clarity
          animate={{ filter: 'blur(8px)' }} // Ends more blurred
          transition={{ duration: 1, ease: 'easeInOut' }} // Smooth transition
          className="absolute inset-0 z-0"
        >
          <Image
            src={background} // Randomly selected background
            alt="Background"
            fill
            className="object-cover object-top" // Show only the top half
            quality={100}
          />
        </motion.div>
      )}

      {/* Overlay (without backdrop-blur) */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Name with Cool Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-[7.6rem] font-bold text-gray-100 leading-none z-10 text-center"
      >
        Masih Moafi
      </motion.h1>

      {/* Subtitle with Cool Animation */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`text-xl text-gray-200 mt-4 px-16 text-center z-10 max-w-2xl font-medium ${roboto.className}`}
      >
        Welcome to my website where I showcase my <span className="font-semibold">talents</span> and{' '}
        <span className="font-semibold">versatility</span>!
      </motion.p>

      {/* Navigation Links with Fade-In Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-8 left-8 right-8 flex justify-between z-10"
      >
        {/* Projects Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsHoveringProjects(!isHoveringProjects)} // Toggle dropdown on click
            className="text-xl text-gray-200 hover:text-white transition-colors"
          >
            Projects
          </button>

          {/* Dropdown */}
          {isHoveringProjects && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-8 left-0 bg-black/50 p-2 rounded-lg flex flex-col gap-1 backdrop-blur-sm border border-gray-700 shadow-lg w-48" // Adjusted padding and gap
            >
              <a
                href="/architecture"
                className="text-gray-200 hover:bg-gray-700/50 px-3 py-1 rounded-md transition-colors" // Adjusted padding
              >
                Architecture
              </a>
              <a
                href="https://github.com/MasihMoafi?tab=repositories&q=&type=&language=&sort=name"
                className="text-gray-200 hover:bg-gray-700/50 px-3 py-1 rounded-md transition-colors" // Link updated to GitHub
              >
                Machine Learning
              </a>
            </motion.div>
          )}
        </div>

        {/* About Link */}
        <a href="/about" className="text-xl text-gray-200 hover:text-white transition-colors">
          About
        </a>
      </motion.div>

      {/* Theme Selector (Moved Below the Navigation Links) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-24 right-8 z-20" // Adjusted position
      >
        <ThemeSelector onThemeChange={handleThemeChange} />
      </motion.div>

      {/* Music Toggle Button (Moved to Bottom-Left Corner) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 left-8 z-20 text-white bg-gray-700 p-2 rounded-full" // Changed to left-8
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
            <line x1="1" y1="1" x2="23" y2="23" />
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
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} src="/2.mp4" loop autoPlay />
    </div>
  );
}
