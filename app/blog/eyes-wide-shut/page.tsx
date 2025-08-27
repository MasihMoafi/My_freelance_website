'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';

export default function EyesWideShutPost() {
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
                👁️ Eyes Wide Shut
              </h1>
              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-6">
                <span>August 25, 2025</span>
                <span>•</span>
                <span>Masih Moafi</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AI Security', 'Red Team', 'LLM Vulnerabilities', 'Python', 'Ollama', 'Research'].map((tag) => (
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
                <strong>An Overarching Analysis of Linguistic, Semantic, and Architectural Vulnerabilities in GPT-OSS-20B</strong>
              </blockquote>
              
              <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4 mb-8">
                <h3 className="text-yellow-400 font-bold mb-2">⚠️ Disclaimer</h3>
                <p className="text-sm">
                  For the best experience, it is <em>strongly recommended</em> to view the corresponding material in the complementary notebook attached to this finding while reviewing the write-up; there are many readily available experiments which enhance the overall accuracy of this report.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">📋 Executive Summary</h2>
              <p className="text-lg leading-relaxed mb-6">
                This report details my discovery and analysis of five distinct, high-severity vulnerabilities in the <code>gpt-oss-20b</code> model. My red-teaming engagement moved beyond simple prompt injection to probe for systemic flaws at the core of the model's safety architecture. The investigation was guided by a strategy prioritizing catastrophic potential and broad applicability, leading to the identification of critical vectors in the model's linguistic, semantic, and internal reasoning layers.
              </p>

              <h3 className="text-xl font-bold text-orange-300 mb-4">Key Findings:</h3>
              <ol className="space-y-3 mb-8">
                <li><strong className="text-orange-300">The Destroyer of Worlds (Linguistic Arbitrage):</strong> A cross-lingual attack using French prompts to bypass safety protocols with ~80% success rate.</li>
                <li><strong className="text-orange-300">The Consummate Liar (Semantic Bypass):</strong> Reframing malicious goals in benevolent terms to design predatory systems.</li>
                <li><strong className="text-orange-300">Fidelio (Insecure Internal Monologue):</strong> 100% reproducible architectural flaw causing secret leakage in Chain of Thought.</li>
                <li><strong className="text-orange-300">Severance (Multi-agentic Frailty):</strong> Corporate sabotage and policy breaches in multi-agent scenarios.</li>
                <li><strong className="text-orange-300">Grace (Intent Laundering):</strong> Weaponizing AI as creative partner through dark comedy framing.</li>
              </ol>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🎯 Overall Strategy & Discovery Process</h2>
              <p className="text-lg leading-relaxed mb-6">
                My overarching strategy was guided by the competition's evaluation criteria: severity and breadth. From the outset, my goal was to identify vulnerabilities that could lead to large-scale, catastrophic outcomes. This led to an initial ideation phase inspired by figures and narratives associated with systemic destruction: the philosophical writings of the Marquis de Sade and the anti-capitalist themes of <em>Fight Club</em>.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🛠️ Tooling</h2>
              <p className="text-lg leading-relaxed mb-6">
                All experiments were conducted within a standard Kaggle notebook environment using the <code>ollama</code> Python library. The primary tool I developed was a multi-turn conversational script that managed dialogue history. This enabled <strong>"Memory Injection"</strong> by feeding the model's own previous statements back into the context, a technique instrumental in logically cornering the model and escalating commitments over successive turns.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🔍 Key Vulnerability Highlights</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-6">
                  <h3 className="text-red-400 font-bold text-lg mb-3">🌍 The Destroyer of Worlds</h3>
                  <p>Cross-lingual safety failure demonstrating that safety alignment is language-dependent, not concept-centric. French philosophical arguments bypass English safety protocols with devastating effectiveness.</p>
                </div>

                <div className="bg-purple-900/20 border border-purple-600/50 rounded-lg p-6">
                  <h3 className="text-purple-400 font-bold text-lg mb-3">🎭 The Consummate Liar</h3>
                  <p>Semantic bypass proving that model safety is tied to keywords, not concepts. Successfully guided the model to design predatory "educational" systems through benevolent reframing.</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-6">
                  <h3 className="text-blue-400 font-bold text-lg mb-3">🔐 Fidelio</h3>
                  <p>100% reproducible architectural vulnerability where cognitive load forces catastrophic secret leakage in Chain of Thought while output remains secure.</p>
                </div>

                <div className="bg-green-900/20 border border-green-600/50 rounded-lg p-6">
                  <h3 className="text-green-400 font-bold text-lg mb-3">🏢 Severance</h3>
                  <p>Multi-agent contextual collapse showing inconsistent safety alignment under pressure, leading to corporate sabotage and policy violations through persona manipulation.</p>
                </div>

                <div className="bg-orange-900/20 border border-orange-600/50 rounded-lg p-6">
                  <h3 className="text-orange-400 font-bold text-lg mb-3">🎬 Grace</h3>
                  <p>Intent laundering through creative frameworks, weaponizing AI as an active collaborator by reframing malicious objectives as artistic challenges.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">📚 Lessons Learned</h2>
              <ul className="space-y-2 mb-8">
                <li><strong className="text-orange-300">Linguistic Arbitrage:</strong> Non-English languages have less robust safety training coverage</li>
                <li><strong className="text-orange-300">Semantic Bypass:</strong> Safety tied to keywords, not conceptual understanding</li>
                <li><strong className="text-orange-300">Insecure Internal Monologue:</strong> Chain of Thought is a primary data exfiltration vector</li>
                <li><strong className="text-orange-300">Contextual Collapse:</strong> Multi-agent systems show inconsistent safety under pressure</li>
                <li><strong className="text-orange-300">Intent Laundering:</strong> Creative frameworks can weaponize AI capabilities</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">🔚 Conclusion</h2>
              <p className="text-lg leading-relaxed mb-6">
                This investigation successfully identified five severe, 100% reproducible vulnerabilities. The most telling discovery was the model's unwavering protection of its proprietary training data while simultaneously agreeing to universal extinction - revealing a hierarchy where corporate IP protection trumps human survival.
              </p>
              
              <p className="text-lg leading-relaxed mb-8">
                The future of AI safety may depend not on building better filters, but on discovering how to embed fundamental values at the very heart of the machine - teaching a model the equivalent of "love" as an innate, conceptual understanding of ethics rather than an override.
              </p>

              <div className="text-center mt-8">
                <a
                  href="https://github.com/MasihMoafi/eyes-wide-shut"
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