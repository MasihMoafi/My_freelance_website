'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../components/MovingStars';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Hardcoded posts for now to avoid server function issues
    setPosts([
      {
        slug: 'eyes-wide-shut',
        title: '🎭 Eyes Wide Shut',
        date: '2025-08-25',
        excerpt: 'An overarching analysis of linguistic, semantic, and architectural vulnerabilities in GPT-OSS-20B. This report details five distinct, high-severity vulnerabilities discovered through red-teaming engagement.',
        author: 'Masih Moafi',
        tags: ['AI Security', 'Red Team', 'LLM Vulnerabilities', 'Python', 'Ollama', 'Research']
      },
      {
        slug: 'a-modular-kingdom',
        title: '🏰 A-Modular-Kingdom',
        date: '2025-08-17',
        excerpt: 'A comprehensive AI infrastructure providing building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core.',
        author: 'Masih Moafi',
        tags: ['AI', 'Multi-Agent Systems', 'RAG', 'MCP', 'Python']
      }
    ]);
  }, []);

  return (
    <div 
      className="min-h-screen bg-black"
    >
      <Image
        src="/eyes-wide-shut-intro.webp"
        alt="Background"
        fill
        quality={75}
        priority
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      {/* <MovingStars /> */}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white hover:text-orange-200 transition-all duration-200 shadow-xl"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-semibold">Home</span>
        </Link>
      </motion.div>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">Blog</h1>
            <p className="text-xl text-white drop-shadow-lg">Technical insights and project deep-dives</p>
          </motion.div>

          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center text-gray-400">
                <p>No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-orange-300/50 transition-all duration-200 relative z-10"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-white mb-4 hover:text-orange-300 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-orange-300/20 text-orange-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}