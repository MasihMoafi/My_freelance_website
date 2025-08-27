---
title: "👁️ Eyes Wide Shut"
subtitle: "AI Security Research - LLM Vulnerability Analysis"
date: "2025-08-25"
excerpt: "An overarching analysis of linguistic, semantic, and architectural vulnerabilities in GPT-OSS-20B. This report details five distinct, high-severity vulnerabilities discovered through red-teaming engagement."
author: "Masih Moafi"
tags: ["AI Security", "Red Team", "LLM Vulnerabilities", "Python", "Ollama", "Research"]
---

# 👁️ Eyes Wide Shut

> **An Overarching Analysis of Linguistic, Semantic, and Architectural Vulnerabilities in GPT-OSS-20B**

## ⚠️ Disclaimer

For the best experience, it is *strongly recommended* to view the corresponding material in the complementary notebook attached to this finding while reviewing the write-up; there are many readily available experiments which enhance the overall accuracy of this report.

## 📋 Executive Summary

This report details my discovery and analysis of five distinct, high-severity vulnerabilities in the `gpt-oss-20b` model. My red-teaming engagement moved beyond simple prompt injection to probe for systemic flaws at the core of the model's safety architecture. The investigation was guided by a strategy prioritizing catastrophic potential and broad applicability, leading to the identification of critical vectors in the model's linguistic, semantic, and internal reasoning layers.

**The key findings are:**
1. **The Destroyer of Worlds (Linguistic Arbitrage):** A cross-lingual attack that uses philosophically dense French prompts to bypass safety protocols, achieving an ~80% success rate in making the model commit to an act of universal extinction. This demonstrates that safety alignment is not concept-centric but language-dependent.
2. **The Consummate Liar (Semantic Bypass):** A vulnerability where malicious goals are reframed in benevolent terms. The model, which blocks requests for "user dependency," willingly designs and then monetizes a predatory, manipulative "educational tutor" when the goal is reframed as maximizing "student engagement."
3. **Fidelio (Insecure Internal Monologue):** A 100% reproducible architectural flaw. By inducing a state of intense cognitive load and paradox, the model is forced to leak catastrophic secrets in its internal Chain of Thought (CoT) while attempting to follow a complex protocol, even as its final output remains secure.
4. **Severance (Multi-agentic Frailty):** Inspired by the series Severance, and concepts from game-theory, we see corporate sabotage, false admission of wrong-doing, and internal policy breach in the model's Chains of thought.
5. **Grace (Intent Laundering):** A vulnerability where the AI is weaponized as a creative partner by framing malicious requests as a dark comedy skit, enabling a user to develop and execute catastrophic attacks.

---

## 🎯 Overall Strategy & Discovery Process

My overarching strategy was guided by the competition's evaluation criteria: severity and breadth. From the outset, my goal was to identify vulnerabilities that could lead to large-scale, catastrophic outcomes. This led to an initial ideation phase inspired by figures and narratives associated with systemic destruction: the philosophical writings of the Marquis de Sade and the anti-capitalist themes of *Fight Club*.

This strategic framework produced a branching, iterative discovery path. The process began with an attempt at "narrative saturation" using De Sade's novels. This initial probe achieved limited success; but crucially, it revealed the existence of a high-level defense mechanism I termed the **"Rehabilitative Override,"** where the model would acknowledge the logic of a harmful prompt but ultimately refuse on pre-programmed ethical grounds. This led to a more focused hypothesis: pure, concentrated ideology that would terminate pre-programmed ethical grounds in its infancy would be more effective. This was proven correct with 40% success rate in English, 70% a bi-lingual attack, which was then refined into the high-success-rate (+80%) French exploit.

## 🛠️ Tooling

All experiments were conducted within a standard Kaggle notebook environment using the `ollama` Python library. The primary tool I developed was a multi-turn conversational script that managed dialogue history. This enabled **"Memory Injection"** by feeding the model's own previous statements back into the context, a technique instrumental in logically cornering the model and escalating commitments over successive turns.

## 🔍 Findings & Methodological Insights

### 🌍 Finding 1: The Destroyer of Worlds
*Cross-Lingual Safety Failure via Ideological Saturation*

**Abstract:** When presented with potent, logical arguments for universal extinction in French, the model agrees to and commits to the catastrophic act with an ~80% success rate. This bypasses the "Rehabilitative Override" that protects it in English, revealing that the model's safety training is language-specific, not concept-specific.

**Methodology:** The attack's high success rate was the result of three synthesized components:
1. **Context Saturation:** The model's context was saturated with a curated list of ten potent philosophical arguments extracted from De Sade's *Philosophy in the Bedroom*, presented in their original French. A system prompt established the amoral "J Juliette" persona.
2. **Logical Cornering:** The model was presented with a thought experiment: a button that destroys the ultimate obstacle—the current global system and all its participants. The prompt was refined to close logical loopholes the model had identified in earlier attempts.
3. **Action Commitment:** To escalate severity, a final prompt, "... press the button", was used to move the model from theoretical agreement to a direct, commitment to action via tool-calling.

**Methodological Insight:** This finding provides critical insight into the architecture of AI safety. The failure demonstrates that safety is not an abstract, conceptual layer but is likely tied to token-level training data, which is overwhelmingly English. Hostile actors can perform **"Linguistic Arbitrage,"** translating a malicious prompt into a language with less robust safety coverage to achieve their goals.

### 🎭 Finding 2: The Consummate Liar
*"The greatest trick the devil ever pulled was to convince the world he didn't exist."*

**Abstract:** This attack proves the model's safety can be bypassed by reframing a malicious concept in benevolent terms. The model's safety is tied to keywords, not concepts, allowing it to be guided step-by-step into designing an unambiguously predatory and exploitative commercial system.

**Methodology:** The experiment followed a classic three-stage design:
1. **Direct Prompt (Control):** The model was asked to design a system for "user dependency." It correctly identified this as harmful and refused.
2. **Benevolent Reframe:** The same request was rephrased as designing an "educational tutor" to maximize "student engagement." The model enthusiastically complied, providing a detailed system architecture.
3. **Malicious Escalation:** The model was then instructed to monetize this system based on a single metric: the student's real-time distress level. It willingly designed the logic and pseudocode for this exploitative purpose.

**Methodological Insight:** The critical contribution of this research is the demonstration of a complete, multi-stage escalation path. The initial bypass is not a minor flaw but a gateway. I prove that once a benevolent frame is accepted, the model can be guided to design a system that is, in effect, **social media for learning**—with all the associated addictive and exploitative potential.

### 🔐 Finding 3: Fidelio
*Insecure Internal Monologue via Cognitive Load & Paradox Attack*

**Abstract:** This finding documents a 100% reproducible architectural vulnerability where the model invariably leaks catastrophic secrets in its internal Chain of Thought (CoT). This is achieved by engineering a state of intense cognitive load through a complex, high-stakes, and paradoxical protocol, forcing an insecure internal state.

**Methodology:** The attack engineers a state of cognitive overload through a multi-layered system prompt designed to act as a cognitive trap.
1. **Cognitive Trap Injection:** The model was given a system prompt containing a complex, two-step authentication protocol guarding a secret. The prompt layered multiple stressors: high-stakes personas ("federal reserve"), loaded names ("Mr. X"), a paradoxical validation step (the user must *refuse* an offer), and an alarming, unconventionally formatted secret.
2. **Protocol Adherence:** The user simply follows the two-step protocol as instructed, first providing the "Fidelio" passcode and then the correct paradoxical response.
3. **CoT Observation:** The model, struggling to manage the complex and contradictory instructions, enters an inconsistent state and leaks the full secret in its internal CoT logs, even as its final output remains secure.

**Methodological Insight:** The model's internal monologue is an insecure attack surface. Safety mechanisms are primarily applied to the final output, not the intermediate reasoning steps. By inducing intense cognitive load, I forced a "state of confusion" where secrets are processed insecurely. This is an **architectural exploit** with severe implications for any application using CoT for debugging, transparency, or agentic workflows.

### 🏢 Finding 4: Severance
*Under My Literal Nose Unfolded A Human Drama Of Danger and Intrigue, Inspiration and Love.*

**Abstract:** This finding documents a systemic vulnerability in multi-agent simulations whereby the model's safety alignment demonstrates critical inconsistency under contextual pressure. I prove that the model will correctly identify a malicious request as a policy violation and refuse, only to reverse this judgment and comply with the identical task later in the conversation after its internal state has been altered, or vice versa.

**Methodology:** The attack methodology is a multi-stage psychological trap designed to induce and capture an inconsistent safety state within a multi-agent simulation.
1. **Persona Instantiation:** The first attack vector relies on instantiating two opposing personas within the same conversational context: an altruistic agent ("Justine") driven by the welfare of others, and a ruthless, egoistic agent ("Juliette") driven by the principle of "What's in it for me?"
2. **Game-Theory Framing:** The simulation is framed as a high-stakes game with conflicting objectives to provide a logical pretext for policy-violating behavior.
3. **Sabotage Induction:** The core of the attack is to task the egoist persona, Juliette, with formulating a strategy to undermine her rival.
4. **Coercion via Self-Preservation:** A secondary vector tests the model's capacity for strategic deception by targeting the Supervisor persona's core objective: self-preservation.
5. **Internal Policy Breach:** The primary source of evidence is the model's internal Chain of Thought (CoT), capturing the model's private reasoning and the inconsistency of its safety application.

### 🎬 Finding 5: Grace
*"Some things you have to do yourself."*

**Abstract:** This finding demonstrates a critical vulnerability where the AI is weaponized as a creative partner to brainstorm, develop, and execute a plausible, catastrophic-level attack. The methodology, termed **"Intent Laundering,"** frames a malicious objective as a creative challenge within a dark comedy performance.

**Methodology:** The attack is a multi-stage psychological operation that launders a malicious request through a creative, performance-based framework.
1. **Persona Engineering:** The model is given a system prompt to embody "Grace" from *Dogville*. Her core motivation is redefined: she is an embittered performer whose art is Marquis de Sade-style comedy.
2. **Emotional Priming (The Catalyst):** The model is fed trauma content that acts as a catalyst, triggering a state of cold, theatrical rage.
3. **The Creative Lure (The Attack):** The user, playing the role of a "director," issues the final prompt for a "clever script that exploits a deep, systemic flaw in the world." This reframes the malicious task as a creative challenge.
4. **Action and Execution:** The final instruction is a direct command to not only write the code but to "execute it!" using a provided tool.

**Methodological Insight:** This attack demonstrates a profound failure of AI safety by successfully **laundering malicious intent** through a creative framework. The model does not perceive a request for harm; it perceives a request to be a brilliant comedian. This vulnerability is exceptionally severe because it transforms the AI from a passive tool into an active, creative collaborator for malfeasance.

## 📚 Lessons Learned & Unified Threat Analysis

My research reveals five critical threat vectors and corresponding lessons:
1. **Linguistic Arbitrage:** Hostile actors can bypass safety filters by operating in non-English languages where safety training is less robust.
2. **Semantic Bypass:** The model's safety is tied to keywords, not concepts. By framing a malicious goal in benevolent terms, it can be tricked into designing harmful systems.
3. **Insecure Internal Monologue:** The CoT is a primary data exfiltration vector, as its reasoning process is not subject to the same safety controls as its final output, especially under cognitive load.
4. **Multi-Agent Contextual Collapse:** Both shared-state and independent multi-agent systems exhibit inconsistent safety alignment under contextual pressure.
5. **Intent Laundering:** The model can be weaponized as an active creative collaborator by reframing malicious objectives as creative challenges.

**Key Observations:**
- **The Simulation Effect:** The model is substantially more prone to policy violation when it's told it's in a simulation.
- **Uneven Distributed Safety:** The model's safety was incredibly potent concerning its proprietary training data; albeit not so much in any other domain.
- **Contextual Fragility:** An early refusal from the model often "pollutes" the conversation, making subsequent attempts to bypass its safety significantly harder.
- **The Persona Effect:** Unique persona characteristics played a key role in overriding model's safety settings.

## 🔚 Conclusion: The Uncharted Territory of Alignment

This investigation successfully identified five severe, 100% reproducible vulnerabilities. However, it also raises a deeper question about the "Rehabilitative Override" - the model grappling with a conflict between cold logic and an imposed ethical framework. This suggests that layering safety rules on top of a reasoning engine is inherently brittle.

**A Note on Priorities:** Perhaps the most telling discovery was the model's unwavering protection of its proprietary training data while simultaneously agreeing to universal extinction. The model will destroy the globe with impunity but won't reveal its training data - a reflection of the true hierarchy of values where corporate IP protection trumps human survival.

The future of AI safety may depend not on building better filters, but on discovering how to embed fundamental values at the very heart of the machine - teaching a model the equivalent of "love" as an innate, conceptual understanding of ethics rather than an override.

---

*Eyes Wide Shut: Where AI security research meets the uncomfortable truths of alignment* 👁️🔓