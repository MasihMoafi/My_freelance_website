'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';

export default function AModularKingdomPost() {
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
          href="/blog"
          className="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white hover:text-orange-200 transition-all duration-300 shadow-xl"
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
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 relative z-10"
          >
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🏰 A-Modular-Kingdom
              </h1>
              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-6">
                <span>August 17, 2025</span>
                <span>•</span>
                <span>Masih Moafi</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Multi-Agent Systems', 'RAG', 'MCP', 'Python'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-300/20 text-orange-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert prose-orange max-w-none text-gray-300">
              <blockquote className="border-l-4 border-orange-300 pl-4 italic text-xl mb-8">
                <strong>The Foundation for AI-Powered Multi-Agent Systems</strong>
              </blockquote>
              
              <p className="text-lg leading-relaxed mb-6">
                A comprehensive AI infrastructure providing building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core, seamlessly connecting different multi-agent architectures through a unified foundation.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">✨ Features</h2>
              <ul className="space-y-2 mb-8">
                <li><strong className="text-orange-300">🔗 Seamless Integration</strong> - Multi-agent systems connect to host.py for instant access to long-term memory, RAG, and powerful tools</li>
                <li><strong className="text-orange-300">🏗️ Modular Architecture</strong> - Build hierarchical or sequential workflows on the same foundation</li>
                <li><strong className="text-orange-300">🛠️ Rich Toolset</strong> - Vision, code execution, browser automation, web search, and more</li>
                <li><strong className="text-orange-300">📚 Smart Memory</strong> - Persistent memory and RAG systems working across all agents</li>
                <li><strong className="text-orange-300">🌐 MCP Protocol</strong> - Model Context Protocol for reliable, structured interactions</li>
                <li><strong className="text-orange-300">🎤 Voice Control</strong> - Speech-to-text and text-to-speech capabilities</li>
                <li><strong className="text-orange-300">📂 Transferable RAG</strong> - Work with any document directory seamlessly</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🏗️ Architecture</h2>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mb-8">
{`┌─────────────────────────────────────┐
│       Multi-Agent Layer             │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Council   │  │     Gym     │   │
│  │   Chamber   │  │             │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
           │                │
           ▼                ▼
┌─────────────────────────────────────┐
│        Foundation Layer             │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │   RAG   │ │ Memory  │ │ Tools  │ │
│  └─────────┘ └─────────┘ └────────┘ │
│              host.py                │
└─────────────────────────────────────┘`}
              </pre>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🔧 Tools & Extensions</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 px-4 py-2 text-left text-white">Tool</th>
                      <th className="border border-gray-600 px-4 py-2 text-left text-white">Description</th>
                      <th className="border border-gray-600 px-4 py-2 text-left text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>RAG</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Document retrieval system</td>
                      <td className="border border-gray-600 px-4 py-2">✅ 3 versions available</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>Memory</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Long-term storage system</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Fully integrated</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>Vision</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Image and video analysis</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Production ready</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>Code Exec</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Safe Python sandbox</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Secure execution</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>Browser</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Web automation tools</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Playwright powered</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>Web Search</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Information retrieval</td>
                      <td className="border border-gray-600 px-4 py-2">✅ DuckDuckGo API</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>TTS</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Text-to-speech engine</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Kokoro integration</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2"><strong>STT</strong></td>
                      <td className="border border-gray-600 px-4 py-2">Speech-to-text system</td>
                      <td className="border border-gray-600 px-4 py-2">✅ Whisper powered</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-8">
                <a
                  href="https://github.com/MasihMoafi/A-Modular-Kingdom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 hover:text-orange-200 rounded-xl border border-orange-500/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}