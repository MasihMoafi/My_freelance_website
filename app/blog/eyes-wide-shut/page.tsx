'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';

export default function EyesWideShutProject() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/eyes-wide-shut.txt?v=' + Date.now());
        let content = await response.text();
        
        // Just convert HTML img tags to markdown format - let ReactMarkdown handle the rest
        content = content
          .replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*src='([^']+)'[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*width="[^"]*"[^>]*src="([^"]+)"[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*src="([^"]+)"[^>]*width="[^"]*"[^>]*>/gi, '![]($1)');
        
        console.log('Processed content preview:', content.substring(0, 1000));
        
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error loading content:', error);
        setMarkdownContent('# Eyes Wide Shut\n\nContent could not be loaded.');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <MovingStars starColor="#ffffff" />
      
      <motion.div /* Back to Blog button */ >
        <Link
          href="/blog"
          className="group fixed top-8 left-8 z-50 flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white transition-all duration-300 shadow-xl"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="font-semibold">Back to Blog</span>
        </Link>
      </motion.div>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12 relative z-10"
          >
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <img src="/logo.jpeg" alt="Eyes Wide Shut" className="w-12 h-12 rounded-lg" />
                Eyes Wide Shut
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-6">
                <span>August 26, 2025</span>
                <span>•</span>
                <span>Masih Moafi</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['AI Security', 'Red Teaming', 'LLM Vulnerabilities', 'Safety Research'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert prose-white max-w-none text-gray-300">
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img 
                      {...props} 
                      className="rounded-lg shadow-lg max-w-full h-auto my-4" 
                      loading="lazy"
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-2xl font-bold text-white mb-4" />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table {...props} className="min-w-full border-collapse border border-gray-600 bg-gray-800/50" />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead {...props} className="bg-gray-700" />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="border border-gray-600 px-4 py-3 text-left font-semibold text-white" />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className="border border-gray-600 px-4 py-2 text-gray-300" />
                  ),
                }}
              >
                {String(markdownContent)}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
