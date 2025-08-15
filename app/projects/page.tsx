'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import MovingStars from '../components/MovingStars';

const projects = [
  {
    id: 1,
    title: 'A-Modular-Kingdom',
    description: 'The Ultimate AI Multi-Agent Foundation',
    longDescription: 'A comprehensive infrastructure for sophisticated multi-agent AI systems. Features hierarchical Council Chamber and sequential Gym workflows, unified MCP foundation with RAG, memory, vision, code execution, and more.',
    githubUrl: 'https://github.com/MasihMoafi/A-Modular-Kingdom',
    blogUrl: '/blog/a-modular-kingdom',
    tags: ['AI', 'Multi-Agent', 'Python', 'RAG', 'MCP'],
    featured: true,
    image: '/projects/a-modular-kingdom.png'
  },
  {
    id: 2,
    title: 'VoiceCommander',
    description: 'Advanced Voice Control System',
    longDescription: 'Intelligent voice command interface with speech recognition and natural language processing capabilities.',
    githubUrl: 'https://github.com/MasihMoafi/Voice-commander',
    tags: ['Voice AI', 'NLP', 'Python'],
    featured: false
  }
];

export default function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900">
      <MovingStars />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white hover:text-orange-200 transition-all duration-300 shadow-xl"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-semibold">Home</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed top-8 z-40 w-full flex justify-center"
      >
        <h1 className="text-2xl font-bold text-white bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">My Projects</h1>
      </motion.div>

      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  className="relative z-10"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-orange-300/50 transition-all duration-300 group"
                  >
                    <div className="text-center">
                      <Github className="w-16 h-16 text-orange-300 mx-auto mb-6 group-hover:text-orange-200 transition-colors" />
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-center text-orange-300 group-hover:text-orange-200 transition-colors">
                        <span>View on GitHub</span>
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}