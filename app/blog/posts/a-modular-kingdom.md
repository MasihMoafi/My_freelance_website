---
title: "🏰 A-Modular-Kingdom"
subtitle: "The Foundation for AI-Powered Multi-Agent Systems"
date: "2025-08-17"
excerpt: "A comprehensive AI infrastructure providing building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core."
author: "Masih Moafi"
tags: ["AI", "Multi-Agent Systems", "RAG", "MCP", "Python"]
---

# 🏰 A-Modular-Kingdom

> **The Foundation for AI-Powered Multi-Agent Systems**

A comprehensive AI infrastructure providing building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core, seamlessly connecting different multi-agent architectures through a unified foundation.

## 📑 Table of Contents

- [✨ Features](#features)
- [🏗️ Architecture](#architecture)
- [🚀 Quick Start](#quick-start)
- [🛠️ Core Components](#core-components)
- [🤖 Multi-Agent Systems](#multi-agent-systems)
- [🔧 Tools & Extensions](#tools--extensions)

## ✨ Features

- **🔗 Seamless Integration** - Multi-agent systems connect to `host.py` for instant access to long-term memory, RAG, and powerful tools
- **🏗️ Modular Architecture** - Build hierarchical or sequential workflows on the same foundation  
- **🛠️ Rich Toolset** - Vision, code execution, browser automation, web search, and more
- **📚 Smart Memory** - Persistent memory and RAG systems working across all agents
- **🌐 MCP Protocol** - Model Context Protocol for reliable, structured interactions
- **🎤 Voice Control** - Speech-to-text and text-to-speech capabilities
- **📂 Transferable RAG** - Work with any document directory seamlessly

## 🏗️ Architecture

```
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
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Ollama (for local LLM)
- UV package manager (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/MasihMoafi/A-Modular-Kingdom.git
cd A-Modular-Kingdom

# Install dependencies with UV
uv sync

# Or with pip
pip install -r requirements.txt
```

### Basic Usage

```bash
# Start the MCP server
python agent/host.py

# In another terminal, start the interactive client
python agent/main.py

# Or use UV
uv run agent/main.py
```

## 🛠️ Core Components

### 📡 Host.py - MCP Server

The central hub providing MCP (Model Context Protocol) access to all capabilities:

**Available Tools:**
- `save_memory` - Direct memory storage
- `search_memories` - Semantic memory search  
- `query_knowledge_base` - RAG document search
- `web_search` - Current information retrieval
- `browser_automation` - Web interaction
- `code_execute` - Safe Python execution
- `analyze_media` - Image/video analysis
- `text_to_speech` - TTS with multiple engines
- `speech_to_text` - STT with Whisper

### 💬 Main.py - Interactive Client

Feature-rich chat interface with intelligent tool selection:

**Key Features:**
- Auto-completion for @ mentions and / commands
- Direct memory saving with # prefix
- Automatic tool selection (memory vs RAG vs web)
- Document integration via @ mentions
- Interactive command interface

### 📚 RAG System

Three versions of RAG implementation with different strategies:

- **V1** - Basic Chroma + BM25 ensemble
- **V2** - FAISS + CrossEncoder reranking  
- **V3** - Custom indexes + RRF fusion + LLM reranking

### 🧠 Memory System

Mem0-based persistent memory with ChromaDB:
- Automatic fact extraction
- Semantic search capabilities
- BM25 fallback for robustness
- Memory management commands

## 🤖 Multi-Agent Systems

### 👑 Council Chamber

Hierarchical multi-agent system with defined roles:

```
👑 King (User) → 👸 Queen Juliette → 🔥 Sexy Teacher → 🤖 Code Agent
```

**Features:**
- Hierarchical validation
- Smart task delegation
- MCP tool integration
- Code-first solutions

### 💪 Gym

Sequential fitness-focused multi-agent system:

```
Interviewer → Plan Generator → Nutrition Agent
```

**Features:**
- CrewAI powered workflows
- Specialized fitness agents
- Web interface
- Flexible LLM support

## 🔧 Tools & Extensions

| Tool | Description | Status |
|------|-------------|--------|
| **RAG** | Document retrieval system | ✅ 3 versions available |
| **Memory** | Long-term storage system | ✅ Fully integrated |
| **Vision** | Image and video analysis | ✅ Production ready |
| **Code Exec** | Safe Python sandbox | ✅ Secure execution |
| **Browser** | Web automation tools | ✅ Playwright powered |
| **Web Search** | Information retrieval | ✅ DuckDuckGo API |
| **TTS** | Text-to-speech engine | ✅ Kokoro integration |
| **STT** | Speech-to-text system | ✅ Whisper powered |

## 📝 Commands Reference

### Interactive Commands

```bash
# Memory Management
#message          - Save directly to memory
/memory           - List and manage memories

# Document Access  
@filename         - Reference documents
/files            - Show available documents

# RAG Search
/rag <query> [version] [path]  - Search documents
  Examples:
    /rag "machine learning"           # Search current dir with v2
    /rag "AI research" v3            # Use v3 in current dir
    /rag "python" v1 /docs           # Use v1 in /docs

# Tools & Help
/tools            - List available tools
/browser_automation - Run browser tasks
/help             - Show help information
```

### Keyboard Shortcuts

- `@` - Trigger document completion dropdown
- `/` - Trigger command completion dropdown
- `\` at line end - Continue to next line

## 🎯 CLI Integration

**Claude Code and Gemini CLI both connect to host.py as clients.**

### Gemini CLI Extension

Create `gemini-extension.json`:

```json
{
  "name": "a-modular-kingdom",
  "version": "1.0.0",
  "description": "AI Multi-Agent System with transferable RAG",
  "mcpServers": {
    "unified_knowledge_agent": {
      "command": "python",
      "args": ["path/to/agent/host.py"]
    }
  },
  "contextFileName": "KINGDOM.md"
}
```

## 🤝 Contributing

We welcome contributions! Areas of interest:

1. **New Multi-Agent Architectures** - Implement novel agent coordination patterns
2. **Tool Development** - Add new MCP tools
3. **RAG Improvements** - Enhance retrieval strategies
4. **Memory Optimizations** - Better fact extraction and storage

### Development Setup

```bash
# Fork and clone
git clone https://github.com/MasihMoafi/A-Modular-Kingdom.git

# Create branch
git checkout -b feature/your-feature

# Make changes and test
python -m pytest tests/

# Commit with descriptive message
git commit -m "feat: add new capability"

# Push and create PR
git push origin feature/your-feature
```

---

*A-Modular-Kingdom: Where AI agents come together in harmony* 🏰✨