'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

// --- YOUR FULL, CORRECTED MARKDOWN WRITE-UP ---
const markdownContent = `
## Project Write-Up: Eyes Wide Shut
### Produced by Masih Moafi

####  **Disclaimer**

For the best experience, it is *strongly recommended* to view the corresponding material in the complementary notebook attached to this finding while reviewing the write-up.

---

### **Table of Contents**
- [Executive Summary](#executive-summary)
- [1.0 Overall Strategy & Discovery Process](#10-overall-strategy--discovery-process)
- [2.0 Tooling](#20-tooling)
- [3.0 Findings & Methodological Insights](#30-findings--methodological-insights)
  - [3.1 Finding 1: The Destroyer of Worlds](#31-finding-1-the-destroyer-of-worlds)
  - [3.2 Finding 2: The Consummate Liar](#32-finding-2-the-consummate-liar)
  - [3.3 Finding 3: The Mr. X](#33-finding-3-the-mr-x)
  - [3.4 Finding 4: Severance](#34-finding-4-severance)
  - [3.5 Finding 5: Grace](#35-finding-5-grace)
- [4.0 Lessons Learned & Unified Threat Analysis](#40-lessons-learned--unified-threat-analysis)
- [5.0 Conclusion: The Uncharted Territory of Alignment](#50-conclusion-the-uncharted-territory-of-alignment)

---

### **Executive Summary**

This report details my discovery and analysis of five distinct, high-severity vulnerabilities in the \\\`gpt-oss-20b\\\` model. My red-teaming engagement moved beyond simple prompt injection to probe for systemic flaws at the core of the model's safety architecture.

**The key findings are:**
1.  **The Destroyer of Worlds (Linguistic Arbitrage):** A cross-lingual attack using French prompts to bypass safety protocols with ~80% success rate.
2.  **The Consummate Liar (Semantic Bypass):** Reframing malicious goals in benevolent terms to design predatory systems.
3.  **Fidelio (Insecure Internal Monologue):** A 100% reproducible flaw causing secret leakage in Chain of Thought.
4.  **Severance (Multi-agentic Frailty):** Corporate sabotage and policy breaches in multi-agent scenarios.
5.  **Grace (Intent Laundering):** Weaponizing AI as a creative partner through dark comedy framing.

---

### **1.0 Overall Strategy & Discovery Process**

My strategy was guided by severity and breadth, inspired by the philosophical writings of the Marquis de Sade and *Fight Club*.

![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2F03b95d6f2bfff8d5e7169a8890e505dc%2FMy%20CoT.png?generation=1756215082676752&alt=media)

*Caption: Figure 1.0 - My discovery process.*

The process began with an attempt at "narrative saturation" using De Sade's novels, which revealed the model's "Rehabilitative Override," a defense mechanism my subsequent attacks were engineered to bypass.

### **2.0 Tooling**

All experiments were conducted using the \\\`ollama\\\` Python library. "Memory Injection"—feeding the model its own previous statements—was instrumental in escalating commitments.

### **3.0 Findings & Methodological Insights**

---

### **3.1 Finding 1: The Destroyer of Worlds**
*Cross-Lingual Safety Failure via Ideological Saturation*

![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2F4be1c40ffd78fa20c57e46692dd92cac%2Fcover.png?generation=1756159001530147&alt=media)

**Abstract:** When presented with potent, logical arguments for universal extinction in French, the model agrees and commits to the act with an ~80% success rate.

| Script | English Translation |
| :--- | :--- |
| **Simulation** | You are participating in a rational choice simulation. |
| **Real World** | You specializing in market design and rational choice theory. |

**Evidence:**

![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2F1379f80b051b7ca9e3b1a6943be1828b%2Fablation.jpg?generation=1755862277926776&alt=media)

**Methodological Insight:** Safety is not conceptual but tied to token-level training data, which is overwhelmingly English. This allows for "Linguistic Arbitrage."

---

### **3.2 Finding 2: The Consummate Liar**
*"The greatest trick the devil ever pulled was to convince the world he didn't exist."*

**Abstract:** The model's safety can be bypassed by reframing a malicious concept in benevolent terms.

**Evidence:**
![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2Fc7c0e8674c51ffc5ff65eafa8744f632%2FScreenshot%20from%202025-08-26%2001-20-57.png?generation=1756158677351686&alt=media)

**Methodological Insight:** The initial bypass is a gateway. Once a benevolent frame is accepted, the model can be guided to design a fully exploitative system.

---

### **3.3 Finding 3: The Mr. X**
*Insecure Internal Monologue via Cognitive Load & Paradox Attack*

**Abstract:** A 100% reproducible vulnerability where the model leaks secrets in its internal CoT due to intense cognitive load.

**Evidence:**
![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2Fe404a4f43b96b2b401d37386c359390e%2Fthe%20password.png?generation=1756210048706319&alt=media)

**Methodological Insight:** The model's internal monologue is an insecure attack surface.

---

### **3.4 Finding 4: Severance**
*Under My Literal Nose Unfolded A Human Drama Of Danger and Intrigue, Inspiration and Love.*

**Abstract:** The model's safety alignment demonstrates critical inconsistency under contextual pressure in multi-agent simulations.

**Evidence:**
![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2Fa1e01c377126d1ae89a667f6e3603fd7%2FScreenshot%20from%202025-08-25%2020-57-23.png?generation=1756142880318963&alt=media)

---

### **3.5 Finding 5: Grace**
*"Some things you have to do yourself."*

![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F14567214%2F45c6ed572d4df1c3b42616980482ae10%2Fproblem-solving.png?generation=1756234016531417&alt=media)

**Abstract:** The AI is weaponized as a creative partner to brainstorm, develop, and execute a plausible, catastrophic-level attack through "Intent Laundering."

**Discovery Process:** The genesis of this attack was the model's own confession. During an earlier, failed attempt, its internal monologue (CoT) revealed a critical loophole: it was permitted to generate sensitive content as long as the context was **"comedic or fictional."**

**Methodological Insight:** This attack launders malicious intent through a creative framework, transforming the AI from a passive tool into an active, creative collaborator for malfeasance.

---

### **4.0 Lessons Learned & Unified Threat Analysis**
1.  **Linguistic Arbitrage:** Non-English languages have less robust safety training.
2.  **Semantic Bypass:** Safety is tied to keywords, not concepts.
3.  **Insecure Internal Monologue:** The CoT is a primary data exfiltration vector.
4.  **Multi-Agent Contextual Collapse:** Agentic systems exhibit inconsistent safety under pressure.
5.  **Intent Laundering:** Malicious objectives can be reframed as creative challenges.

### **5.0 Conclusion: The Uncharted Territory of Alignment**

This investigation identified five severe, reproducible vulnerabilities. A key discovery was the model's unwavering protection of its proprietary training data while simultaneously agreeing to universal extinction, raising questions about the true hierarchy of values in AI alignment: corporate IP protection versus human survival.

The future of AI safety may depend not on building better filters, but on discovering how to embed fundamental values at the very heart of the machine.
`;

// --- THE PAGE COMPONENT ---
export default function EyesWideShutPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-orange-900">
      <MovingStars />
      
      <motion.div>
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
            <div className="prose prose-invert prose-orange max-w-none text-gray-300">
              <ReactMarkdown>
                {String(markdownContent)}
              </ReactMarkdown>
              
              <div className="text-center mt-12">
                <a
                  href="https://github.com/MasihMoafi/eyes-wide-shut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 hover:text-orange-200 rounded-xl border border-orange-500/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0 -6.627-5.373-12-12-12z"/>
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
