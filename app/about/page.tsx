'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function About() {
  const [section, setSection] = useState<'top' | 'middle' | 'bottom'>('top');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Debounce scroll to prevent rapid section changes
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (event: WheelEvent) => {
      clearTimeout(scrollTimeout); // Clear previous timeout
      scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0 && section !== 'bottom') {
          // Scroll down (only if not already at the bottom)
          handleNextSection();
        } else if (event.deltaY < 0 && section !== 'top') {
          // Scroll up (only if not already at the top)
          handlePreviousSection();
        }
      }, 150); // Adjust delay as needed
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [section]);

  const handleNextSection = () => {
    if (section === 'top') setSection('middle');
    else if (section === 'middle') setSection('bottom');
  };

  const handlePreviousSection = () => {
    if (section === 'bottom') setSection('middle');
    else if (section === 'middle') setSection('top');
  };

  // Disable initial load effect after first render
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        key={section} // Re-render on section change for seamless transition
        initial={{ filter: 'blur(2px)' }} // Initial blur (85% clarity)
        animate={{ filter: 'blur(8px)' }} // Apply more blur after initial load
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/about.png" // Replace with your image path
          alt="About Background"
          fill
          className={`object-cover ${
            section === 'top'
              ? 'object-top'
              : section === 'middle'
              ? 'object-center'
              : 'object-bottom'
          }`} // Dynamic positioning
          quality={100}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 text-white bg-gray-700 p-2 rounded-full"
        title="Back to Main Page"
      >
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>

      {/* About Me Text (Only on the first section) */}
      {section === 'top' && (
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[7.6rem] font-bold text-gray-100 leading-none z-10 text-center mt-16"
        >
          About Me
        </motion.h1>
      )}

      {/* Navigation Icons */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-4">
        {/* Triangle Up (Previous Section) */}
        {section !== 'top' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            onClick={handlePreviousSection}
            className="text-white text-4xl cursor-pointer"
          >
            ▲
          </motion.div>
        )}

        {/* Triangle Down (Next Section) */}
        {section !== 'bottom' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={handleNextSection}
            className="text-white text-4xl cursor-pointer"
          >
            ▼
          </motion.div>
        )}
      </div>
    </div>
  );
}