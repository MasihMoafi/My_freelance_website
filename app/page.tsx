'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Roboto, Inter } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';
import ModernNavbar from './components/ModernNavbar';
import MovingStars from './components/MovingStars';
import { useMusicContext } from './components/MusicProvider';
import * as anime from 'animejs';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600', '700'] });


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'sunny' | 'gloomy'>('sunny');
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
    
    if (nameRef.current && !animationComplete.current) {
      const letterElements = nameRef.current.querySelectorAll('.letter');
      
      // Initial glitch animation
      anime({
        targets: letterElements,
        opacity: [0, 1],
        translateY: function() { return [anime.random(-40, 40), 0]; },
        translateX: function() { return [anime.random(-40, 40), 0]; },
        scale: function() { return [anime.random(0.5, 1.5), 1]; },
        rotate: function() { return [anime.random(-15, 15), 0]; },
        color: ['#ffffff', 'var(--teal)'],
        textShadow: ['0 0 0px rgba(0, 128, 128, 0)', '0 0 10px rgba(0, 128, 128, 0.8)'],
        duration: 1800,
        delay: anime.stagger(80),
        easing: 'easeOutExpo',
        complete: function() {
          animationComplete.current = true;
          
          // Subtle continuous animation
          anime({
            targets: letterElements,
            translateY: function() { return anime.random(-3, 3); },
            translateX: function() { return anime.random(-2, 2); },
            opacity: function() { return anime.random(0.8, 1); },
            color: function(el: Element, i: number) {
              return i % 2 ? ['var(--teal)', '#f9ddb1'] : ['#f9ddb1', 'var(--teal)'];
            },
            textShadow: '0 0 5px var(--teal)',
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
            duration: 3000,
            delay: anime.stagger(100)
          });
          
          // Random glitch effect every few seconds
          const glitchInterval = setInterval(() => {
            // Select a random subset of letters to glitch
            const randomLetters = Array.from(letterElements).filter(() => Math.random() > 0.7);
            if (randomLetters.length === 0) return;
            
            anime({
              targets: randomLetters,
              translateX: function() { return anime.random(-10, 10); },
              translateY: function() { return anime.random(-5, 5); },
              scale: function() { return anime.random(0.9, 1.1); },
              color: 'var(--teal)',
              textShadow: ['0 0 5px var(--teal)', '0 0 15px var(--teal)', '0 0 5px var(--teal)'],
              duration: 200,
              easing: 'steps(2)',
              complete: function(anim: any) {
                anime({
                  targets: anim.animatables.map((a: any) => a.target),
                  translateX: 0,
                  translateY: 0,
                  scale: 1,
                  color: '#f9ddb1',
                  textShadow: '0 0 5px var(--teal)',
                  duration: 300,
                  easing: 'easeOutExpo'
                });
              }
            });
          }, 2000);

          // Cleanup function to clear interval
          return () => clearInterval(glitchInterval);
        }
      });
    }
  }, []);

  const handleThemeChange = (theme: 'sunny' | 'gloomy') => {
    setCurrentTheme(theme);
    // Don't change music on theme change
  };

  const getBackgroundStyle = () => {
    switch (currentTheme) {
      case 'sunny':
        return '#ffffff'; // White background for day
      case 'gloomy':
        return '#1f2937'; // Dark background for night
      default:
        return '#1f2937';
    }
  };

  const getTextColor = () => {
    return currentTheme === 'sunny' ? 'text-black' : 'text-white';
  };

  const getAccentColor = () => {
    return currentTheme === 'sunny' ? 'text-teal-600' : 'text-orange-300'; // Teal is opposite of orange
  };

  const getButtonClass = () => {
    return currentTheme === 'sunny' ? 'btn-primary-inverted' : 'btn-primary';
  };

  const getSecondaryButtonClass = () => {
    return currentTheme === 'sunny' ? 'btn-secondary-inverted' : 'btn-secondary';
  };


  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: getBackgroundStyle()}}>
      <ModernNavbar onThemeChange={handleThemeChange} currentTheme={currentTheme} />
      
      <MovingStars key={currentTheme} starColor={currentTheme === 'sunny' ? '#000000' : '#ffffff'} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <h1
            ref={nameRef}
            className={`text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 ${inter.className} ${getTextColor()}`}
          >
            {nameLetters.map((letter, index) => (
              <span 
                key={index} 
                className={`letter ${letter === ' ' ? 'mr-2' : ''}`}
              >
                {letter}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="space-y-4"
          >
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${inter.className} font-light ${getTextColor()}`}>
              Welcome to my website where I showcase my{' '}
              <span className={`font-semibold ${getAccentColor()}`}>creativity</span>,{' '}
              <span className={`font-semibold ${getAccentColor()}`}>versatility</span> and{' '}
              <span className={`font-semibold ${getAccentColor()}`}>technical prowess</span>!
            </p>
            
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
                className={getButtonClass()}
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
