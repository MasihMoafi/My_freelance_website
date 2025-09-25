import Image from 'next/image';
import { motion } from 'framer-motion';
import ModernNavbar from './components/ModernNavbar';
import SocialLinks from './components/SocialLinks';
import TypewriterTitle from './components/TypewriterTitle';

// This is now a SERVER COMPONENT by default.
// It renders on the server, resulting in a faster initial load.
export default function Home() {
  // Button styles are now static since theme logic is removed for simplicity.
  // A more advanced implementation could use CSS variables for theming.
  const secondaryButtonClass = 'px-8 py-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-200 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform';

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black" 
      data-theme="dark"
    >
      <Image
        src="/eyes-wide-shut-intro.webp"
        alt="Background"
        fill
        quality={75}
        priority
        className="object-cover opacity-50"
      />
      <ModernNavbar />
      
      <div className="relative z-20 flex flex-col items-center justify-start pt-32 min-h-screen px-4">
        
        {/* This is our interactive "island" */}
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
      </div>
    </div>
  );
}