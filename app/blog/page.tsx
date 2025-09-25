import Image from 'next/image';
import BlogClient from '../components/BlogClient';

// This is now a PURE Server Component.
// The data is defined directly on the server.
export default function BlogPage() {
  const posts = [
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
  ];

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
      
      {/* All interactive elements are now neatly contained in this one component */}
      <BlogClient posts={posts} />
    </div>
  );
}
