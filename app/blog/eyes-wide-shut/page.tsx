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
        
        // Move the intro image to after Project Write-Up and convert HTML img tags to markdown
        content = content
          .replace(/(<img width="14999" height="8502" alt="eyes wide" src="https:\/\/github\.com\/user-attachments\/assets\/d8c81e1d-f978-4065-8b26-e483602e26ef" \/>)/, '') // Remove from top
          .replace(/(## \*\*Project Write-Up: Eyes Wide Shut\*\*)/, '$1\n\n<img width="14999" height="8502" alt="eyes wide" src="https://github.com/user-attachments/assets/d8c81e1d-f978-4065-8b26-e483602e26ef" />') // Add after title
          // Fix the broken HTML elements - remove them completely as they don't work in ReactMarkdown
          .replace(/<a id="finding-\d+"><\/a>\s*/g, '')
          // Add proper HTML IDs for scrolling
          .replace(/### \*\*3\.1 Finding 1: The Destroyer of Worlds\*\*/, '<h3 id="finding-1" class="text-2xl font-bold text-white mb-4">**3.1 Finding 1: The Destroyer of Worlds**</h3>')
          .replace(/### \*\*3\.2 Finding 2: The Consummate Liar\*\*/, '<h3 id="finding-2" class="text-2xl font-bold text-white mb-4">**3.2 Finding 2: The Consummate Liar**</h3>')
          .replace(/### \*\*3\.3 Finding 3: Fidelio\*\*/, '<h3 id="finding-3" class="text-2xl font-bold text-white mb-4">**3.3 Finding 3: Fidelio**</h3>')
          .replace(/### \*\*3\.4 Finding 4: Severance\*\*/, '<h3 id="finding-4" class="text-2xl font-bold text-white mb-4">**3.4 Finding 4: Severance**</h3>')
          .replace(/### \*\*3\.5 Finding 5: Grace\*\*/, '<h3 id="finding-5" class="text-2xl font-bold text-white mb-4">**3.5 Finding 5: Grace**</h3>')
          // Convert markdown tables to proper format with HTML fallback
          .replace(/\|\s*Script\s*\|\s*English Translation\s*\|\s*\n\s*\|\s*:---\s*\|\s*:---\s*\|\s*\n\s*\|\s*Simulation\s*\|\s*You are participating in a rational choice simulation\.\s*\|\s*\n\s*\|\s*Real World\s*\|\s*You specializing in market designand rational choice theory\.\s*\|/g, 
            '<table className="min-w-full border-collapse border border-gray-600 bg-gray-800/50 my-6"><thead className="bg-gray-700"><tr><th className="border border-gray-600 px-4 py-3 text-left font-semibold text-white">Script</th><th className="border border-gray-600 px-4 py-3 text-left font-semibold text-white">English Translation</th></tr></thead><tbody><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Simulation</td><td className="border border-gray-600 px-4 py-2 text-gray-300">You are participating in a rational choice simulation.</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Real World</td><td className="border border-gray-600 px-4 py-2 text-gray-300">You specializing in market design and rational choice theory.</td></tr></tbody></table>')
          // Convert the tools table to HTML
          .replace(/\|\s*Tool\s*\|\s*Description\s*\|\s*Note\s*\|\s*\n\s*\|------\|-------------|--------\|\s*\n\s*\|\s*RAG\s*\|\s*Document retrieval\s*\|\s*✅ 3 versions\s*\|\s*\n\s*\|\s*Memory\s*\|\s*Long-term storage\s*\|\s*✅ Integrated\s*\|\s*\n\s*\|\s*Vision\s*\|\s*Image analysis\s*\|\s*✅ Ready\s*\|\s*\n\s*\|\s*Code Exec\s*\|\s*Python sandbox\s*\|\s*✅ Secure\s*\|\s*\n\s*\|\s*Browser\s*\|\s*Web automation\s*\|\s*✅ Playwright\s*\|\s*\n\s*\|\s*Web Search\s*\|\s*Info retrieval\s*\|\s*✅ Duckduckgo\s*\|\s*\n\s*\|\s*TTS\s*\|\s*Text-to-speech\s*\|\s*✅ Kokoro\s*\|\s*\n\s*\|\s*STT\s*\|\s*Speech-to-text\s*\|\s*✅ Whisper\s*/g,
            '<table className="min-w-full border-collapse border border-gray-600 bg-gray-800/50 my-6"><thead className="bg-gray-700"><tr><th className="border border-gray-600 px-4 py-3 text-left font-semibold text-white">Tool</th><th className="border border-gray-600 px-4 py-3 text-left font-semibold text-white">Description</th><th className="border border-gray-600 px-4 py-3 text-left font-semibold text-white">Note</th></tr></thead><tbody><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">RAG</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Document retrieval</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ 3 versions</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Memory</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Long-term storage</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Integrated</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Vision</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Image analysis</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Ready</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Code Exec</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Python sandbox</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Secure</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Browser</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Web automation</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Playwright</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">Web Search</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Info retrieval</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Duckduckgo</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">TTS</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Text-to-speech</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Kokoro</td></tr><tr><td className="border border-gray-600 px-4 py-2 text-gray-300">STT</td><td className="border border-gray-600 px-4 py-2 text-gray-300">Speech-to-text</td><td className="border border-gray-600 px-4 py-2 text-gray-300">✅ Whisper</td></tr></tbody></table>')
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
            
            <div 
              className="prose prose-invert prose-white max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: markdownContent.replace(/!\[\]\(([^)]+)\)/g, '<img src="$1" class="rounded-lg shadow-lg max-w-full h-auto my-4" loading="lazy" />') }}
            />
          </motion.article>
        </div>
      </div>
    </div>
  );
}
