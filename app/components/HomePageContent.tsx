'use client';

import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
import TypewriterTitle from './TypewriterTitle';

export default function HomePageContent() {
  const secondaryButtonClass = 'px-8 py-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-200 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform';

  return (
    <>
      <TypewriterTitle />

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
            className={secondaryButtonClass}
          >
            About Me
          </motion.a>
          
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={secondaryButtonClass}
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
    </>
  );
}
