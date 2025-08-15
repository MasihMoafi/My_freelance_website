---
title: "A-Modular-Kingdom: The Foundation for AI-Powered Multi-Agent Systems"
date: "2025-01-14"
excerpt: "A comprehensive AI infrastructure that provides the building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core, it seamlessly connects different multi-agent architectures through a unified foundation."
author: "Masih Moafi"
tags: ["AI", "Multi-Agent Systems", "LLM", "RAG", "MCP", "Python", "Automation"]
---

# 🏰 A-Modular-Kingdom

**The Foundation for AI-Powered Multi-Agent Systems**

A-Modular-Kingdom is a comprehensive AI infrastructure that provides the building blocks for sophisticated multi-agent workflows. Built with modularity and standardization at its core, it seamlessly connects different multi-agent architectures through a unified foundation.

## 🎯 What Makes This Special

This isn't just another AI project - it's a **foundation** that enables:

- **🔗 Seamless Integration**: Multi-agent systems connect to `host.py` for instant access to long-term memory, RAG, and powerful tools
- **🏗️ Modular Architecture**: Build hierarchical (Council Chamber) or sequential (Gym) workflows on the same foundation  
- **🛠️ Rich Toolset**: Vision, code execution, browser automation, web search, and more - all standardized and ready to use
- **📚 Smart Memory**: Persistent memory and RAG systems that work across all your agents
- **🌐 ACP Communication**: Agents communicate through ACP servers for reliable, structured interactions

## 🏛️ Multi-Agent Systems

### 👑 Council Chamber (Hierarchical)
A sophisticated royal court where agents have defined roles and hierarchy:

![Council Chamber Architecture](https://github.com/user-attachments/assets/4cf13c5c-c66a-4e5d-b585-35d37312765a)

```
👑 King (User) → 👸 Queen Juliette → 🔥 Sexy Teacher → 🤖 Code Agent
```

**Features:**
- **Hierarchical validation**: Each level validates the work of subordinates
- **Smart delegation**: Intelligent routing based on task complexity  
- **MCP tool integration**: Sexy Teacher uses all foundation tools
- **Code-first approach**: Code Agent writes solutions as executable code using smolagents

### 🏋️ Gym (Sequential) 
A fitness-focused multi-agent system with specialized roles:

![Gym System](https://github.com/user-attachments/assets/19f8d576-4267-428a-a3ff-2bcb7dab7c85)

```
Interviewer → Plan Generator →  → Nutrition Agent
```

**Features:**
- **CrewAI powered**: Built on the CrewAI framework for sequential workflows
- **Specialized agents**: Each agent has a specific fitness domain expertise
- **Web interface**: Modern chat interface for user interaction
- **Flexible LLM support**: Works with local Ollama or cloud providers

## 🧠 Core Infrastructure

### 🖥️ Host.py - The Central Hub
The heart of A-Modular-Kingdom, providing MCP (Model Context Protocol) access to:

- **📚 RAG System**: Advanced document retrieval with multiple strategies (V1, V2, V3)
- **🧠 Memory Core**: Persistent conversation and context memory
- **👁️ Vision Tools**: Image analysis and processing capabilities  
- **⚡ Code Execution**: Safe Python code execution environment
- **🌐 Browser Automation**: Web interaction through Playwright
- **🔍 Web Search**: Intelligent web search capabilities

### 🔧 Tool Ecosystem

| Tool | Purpose | Status |
| --- | --- | --- |
| **[RAG](https://github.com/MasihMoafi/A-Modular-Kingdom/tree/main/A-Modular-Kingdom/rag)** | Document retrieval & knowledge | ✅ Multiple versions |
| **[Memory](https://github.com/MasihMoafi/A-Modular-Kingdom/tree/main/A-Modular-Kingdom/memory)** | Long-term conversation storage | ✅ Fully integrated |
| **[Vision](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/tools/vision.py)** | Image analysis | ✅ Ready to use |
| **[Code Exec](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/tools/code_exec.py)** | Safe Python execution | ✅ Sandboxed |
| **[Browser](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/tools/browser_agent.py)** | Web automation | ✅ Playwright powered |
| **[Web Search](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/tools/web_search.py)** | Information retrieval | ✅ Integrated |
| **Structured Output** | Formatted responses | 🔄 Coming soon |

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Ollama (for local LLM)
- UV package manager (recommended)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd A-Modular-Kingdom

# Install dependencies
uv sync

# Start the foundation
python agent/host.py
```

### Launch Multi-Agent Systems

**Council Chamber:**
```bash
# Terminal 1: Start Code Agent
python council_chamber/code_agent_server.py

# Terminal 2: Start Sexy Teacher  
python council_chamber/enhanced_sexy_teacher_server.py

# Terminal 3: Start Queen Juliette
python council_chamber/queen_juliette.py
```

**Gym:**
```bash
cd gym/
python setup.py
python main.py
```

## 🏗️ Architecture

A-Modular-Kingdom follows a **modular foundation** approach:

![A-Modular-Kingdom Architecture](https://github.com/user-attachments/assets/fe937a83-07df-4927-a1f0-58d3a51bf1fb)

```
┌─────────────────────────────────────┐
│          Multi-Agent Layer          │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Council   │  │     Gym     │   │
│  │   Chamber   │  │             │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
           │                │
           ▼                ▼
┌─────────────────────────────────────┐
│         Foundation Layer            │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │   RAG   │ │ Memory  │ │ Tools  │ │
│  └─────────┘ └─────────┘ └────────┘ │
│              host.py                │
└─────────────────────────────────────┘
```

**Key Principles:**
- **Standard Interface**: All multi-agent systems use the same foundation
- **ACP Communication**: Reliable agent-to-agent communication  
- **Tool Sharing**: Common tools available to all agents
- **Memory Persistence**: Shared memory across sessions

## 📖 Documentation

- **[RAG Documentation](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/rag/RAG_Documentation_V1.md)**: Multiple RAG implementations and evaluations
- **[Memory System](https://github.com/MasihMoafi/A-Modular-Kingdom/blob/main/A-Modular-Kingdom/memory/MEMORY_SYSTEM_DOCUMENTATION.md)**: Conversation and context persistence  
- **[Tool Documentation](https://github.com/MasihMoafi/A-Modular-Kingdom/tree/main/A-Modular-Kingdom/tools)**: Individual tool guides

## 🤝 Contributing

A-Modular-Kingdom grows through experimentation and iteration. Each multi-agent system teaches us more about effective AI coordination.

## 🔗 External Resources

- **[ACP Tutorial](https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/)**  
- **[Smolagents Paper](https://arxiv.org/pdf/2402.01030)**  
- **[MCP Documentation](https://modelcontextprotocol.io/)**

---

*A-Modular-Kingdom: Where AI agents come together in harmony* 🏰✨