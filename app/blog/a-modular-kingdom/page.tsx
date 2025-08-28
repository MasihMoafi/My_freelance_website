'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';
import ReactMarkdown from 'react-markdown';

// --- YOUR FULL MARKDOWN WRITE-UP ---
const markdownContent = `
# 🏰 A-Modular-Kingdom

> **The Foundation for AI-Powered Multi-Agent Systems**

A comprehensive AI infrastructure providing building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core, seamlessly connecting different multi-agent architectures through a unified foundation.

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Core Components](#️-core-components)
- [🤖 Multi-Agent Systems](#-multi-agent-systems)
- [🔧 Tools & Extensions](#-tools--extensions)
- [📝 Commands Reference](#-commands-reference)
- [🎯 CLI Integration](#-cli-integration)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## ✨ Features

- **🔗 Seamless Integration** - Multi-agent systems connect to \`host.py\` for instant access to long-term memory, RAG, and powerful tools
- **🏗️ Modular Architecture** - Build hierarchical or sequential workflows on the same foundation  
- **🛠️ Rich Toolset** - Vision, code execution, browser automation, web search, and more
- **📚 Smart Memory** - Persistent memory and RAG systems working across all agents
- **🌐 MCP Protocol** - Model Context Protocol for reliable, structured interactions
- **🎤 Voice Control** - Speech-to-text and text-to-speech capabilities
- **📂 Transferable RAG** - Work with any document directory seamlessly

## 🏗️ Architecture

<img width="2275" height="1183" alt="architecture" src="https://github.com/user-attachments/assets/6e4eaca7-0cae-43b8-a60d-fc8bdfe8c77e" />


\`\`\`
┌─────────────────────────────────────┐
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
└─────────────────────────────────────┘
\`\`\`

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Ollama (for local LLM)
- UV package manager (recommended)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/A-Modular-Kingdom.git
cd A-Modular-Kingdom

# Install dependencies with UV
uv sync

# Or with pip
pip install -r requirements.txt
\`\`\`

### Basic Usage

\`\`\`bash
# Start the MCP server
python agent/host.py

# In another terminal, start the interactive client
python agent/main.py

# Or use UV
uv run agent/main.py
\`\`\`

## 🛠️ Core Components

### 📡 Host.py - MCP Server

The central hub providing MCP (Model Context Protocol) access to all capabilities.

### 💬 Main.py - Interactive Client

Feature-rich chat interface with intelligent tool selection.

### 📚 RAG System

Three versions of RAG implementation with different strategies.

### 🧠 Memory System

Mem0-based persistent memory with ChromaDB.
  
---

## 🤖 Multi-Agent Systems

### 👑 Council Chamber

<img width="1672" height="1426" alt="architecture" src="https://github.com/user-attachments/assets/35ed7188-6d55-4ed1-9298-cbb5ac20bbb5" />

<img width="338" height="402" alt="architecture_2" src="https://github.com/user-attachments/assets/52aa3fe6-22a8-4e96-ada1-0d206a7619ee" />

Hierarchical multi-agent system with defined roles.
  
---

### 💪 Gym

<img width="2556" height="1375" alt="Screenshot from 2025-07-14 17-57-24" src="https://github.com/user-attachments/assets/32e9a3c8-3553-49e4-b106-5fc26d2d946d" />

Sequential fitness-focused multi-agent system.

## 🔧 Tools & Extensions

| Tool | Description | Note |
|------|-------------|--------|
| **RAG** | Document retrieval | ✅ 3 versions |
| **Memory** | Long-term storage | ✅ Integrated |
| **Vision** | Image analysis | ✅ Ready |
| **Code Exec** | Python sandbox | ✅ Secure |
| **Browser** | Web automation | ✅ Playwright |
| **Web Search** | Info retrieval | ✅ Duckduckgo |
| **TTS** | Text-to-speech | ✅ Kokoro |
| **STT** | Speech-to-text | ✅ Whisper |

## 📝 Commands Reference

### Interactive Commands

\`\`\`bash
# Memory Management
#message          - Save directly to memory
/memory           - List and manage memories
\`\`\`

## 🎯 CLI Integration

**Claude code and Gemini-cli both connect to host.py as clients.** 

### Gemini CLI Extension

<img width="1785" height="1287" alt="Screenshot from 2025-08-16 01-10-56" src="https://github.com/user-attachments/assets/edfc887b-9f33-4b84-89e2-1113881b38f4" />

## Links

https://www.youtube.com/watch?v=hWoQnAr6R_E
https://medium.com/@masihmoafi12/a-modular-kingdom-fcaa69a6c1f0

## 📜 License

MIT License

---

*A-Modular-Kingdom: Where AI agents come together in harmony* 🏰✨
`;

// --- THE PAGE COMPONENT ---
export default function AModularKingdomPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900">
      <MovingStars />
      
      <motion.div /* Back to Blog button */ >
        <Link
          href="/blog"
          className="group fixed top-8 left-8 z-50 flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white hover:text-orange-200 transition-all duration-300 shadow-xl"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🏰 A-Modular-Kingdom
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-6">
                <span>August 17, 2025</span>
                <span>•</span>
                <span>Masih Moafi</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['AI', 'Multi-Agent Systems', 'RAG', 'MCP', 'Python'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-300/20 text-orange-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* --- GITHUB BUTTON ADDED HERE --- */}
              <div className="mt-8">
                <a
                  href="https://github.com/MasihMoafi/A-Modular-Kingdom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 hover:text-orange-200 rounded-xl border border-orange-500/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0 -6.627-5.373-12-12-12z"/>
                  </svg>
                  View the Code on GitHub
                </a>
              </div>
            </header>
            
            <div className="prose prose-invert prose-orange max-w-none text-gray-300">
              <ReactMarkdown>
                {String(markdownContent)}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
