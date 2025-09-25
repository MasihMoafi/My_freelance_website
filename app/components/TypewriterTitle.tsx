'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TypewriterTitle() {
  const [displayedName, setDisplayedName] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const name = "MASIH MOAFI";
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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
    }, 150); // Adjust speed here

    return () => clearInterval(typewriterInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="text-center"
    >
      <h1
        ref={nameRef}
        className="text-4xl md:text-5xl lg:text-6xl font-normal leading-none mb-2 text-white"
        style={{ letterSpacing: '2px', fontWeight: '400' }}
      >
        {displayedName}
        {!isTypingComplete && <span className="animate-pulse">|</span>}
      </h1>
      <p className="text-lg md:text-xl font-light opacity-70 mb-6 text-white">
        AI/ML Engineer
      </p>
    </motion.div>
  );
}
