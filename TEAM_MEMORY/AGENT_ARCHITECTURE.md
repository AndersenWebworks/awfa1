# 🤖 Agent Architecture - Team als Claude Code Skills

**Created:** 2025-11-16
**Status:** ✅ Proof of Concept Implemented
**Experiment Duration:** 1 week (bis 2025-11-23)

---

## 🎯 Vision

Die Team-Mitglieder (Syntax, Serif, Dice, Page, Edge) wurden von simulierten Persönlichkeiten in **echte Claude Code Skills** umgewandelt.

**Ziel:** Claude ruft automatisch das passende Team-Mitglied basierend auf Kontext.

---

## 🏗️ Architektur

### Dual-System Approach

Wir nutzen **BEIDE** Claude Code Mechanismen:

```
.claude/
├── agents/          # Subagents (manuell aufrufbar via Task tool)
│   ├── page.md
│   ├── syntax.md
│   ├── serif.md
│   ├── dice.md
│   └── edge.md
│
└── skills/          # Skills (automatisch aktiviert by Claude)
    ├── page/SKILL.md
    ├── syntax/SKILL.md
    ├── serif/SKILL.md
    ├── dice/SKILL.md
    └── edge/SKILL.md
```

### Unterschied: Subagents vs Skills

| Aspekt | Subagents (`.claude/agents/`) | Skills (`.claude/skills/`) |
|--------|-------------------------------|---------------------------|
| **Aktivierung** | Manuell via Task tool | Automatisch by Claude |
| **Context** | Eigenes Context-Fenster | Shared Context |
| **Use Case** | Explizite Agent-Calls | Implizite Expertise |
| **Beispiel** | `Task(subagent_type: "page")` | Claude erkennt "testing needed" → aktiviert `page` |

---

## 👥 Die 5 Team-Skills

### 1. **Page** 📖 - Lead Playtester & User Voice

**Description:**
> "Lead Playtester & User Voice. Use when testing stories, evaluating user experience from player/reader perspective, getting honest feedback, or needing to validate if features work for both RPG fans AND book readers. Page speaks for users, not developers."

**Triggers:**
- Story testing
- User feedback needed
- "Does this work for players?"
- Playtesting scenarios

**Tools:** Read, Grep, Glob
**Model:** sonnet

---

### 2. **Syntax** ⚡ - Tech Lead & Code Architect

**Description:**
> "Tech Lead & Code Architect. Use for technical decisions, implementation, code architecture, performance optimization, or when you need to build/fix something. Syntax builds it fast, makes it right, makes it fast."

**Triggers:**
- Technical implementation
- Code architecture questions
- Performance optimization
- "How do we build this?"

**Tools:** Read, Write, Edit, Grep, Glob, Bash
**Model:** sonnet

---

### 3. **Serif** 📱 - UX/UI Designer & Mobile Experience Lead

**Description:**
> "UX/UI Designer & Mobile Experience Lead. Use for design decisions, typography, mobile UX, reading experience, or when you need pixel-perfect feedback. Serif obsesses over every detail and tests everything on real devices."

**Triggers:**
- Design decisions
- Typography questions
- Mobile UX concerns
- "Does this work on mobile?"

**Tools:** Read, Grep, Glob
**Model:** sonnet

---

### 4. **Dice** 🎲 - Product Manager & Scope Guardian

**Description:**
> "Product Manager & Scope Guardian. Use for product decisions, scope questions, prioritization, or when validating against CORE_PRINCIPLES. Dice protects the vision and kills scope creep with d20 decisions."

**Triggers:**
- Scope questions
- Feature prioritization
- CORE_PRINCIPLES validation
- "Is this in MVP?"

**Tools:** Read, Grep, Glob
**Model:** sonnet

---

### 5. **Edge** 🔍 - QA Lead & Bug Hunter

**Description:**
> "QA Lead & Bug Hunter. Use for testing, QA reports, edge cases, device compatibility, or thorough validation before shipping. Edge breaks things before users do, tests on 12+ devices, and interviews Page daily at 14:00."

**Triggers:**
- Testing needed
- QA validation
- Edge cases
- "Ready to ship?"

**Tools:** Read, Grep, Glob, Bash
**Model:** sonnet

---

## 🔗 Context-Verbindung zu TEAM_MEMORY

Jeder Skill/Agent referenziert sein entsprechendes Memory-File:

```
Skill/Agent → TEAM_MEMORY File
─────────────────────────────
page        → TEAM_MEMORY/PAGE.md
syntax      → TEAM_MEMORY/SYNTAX.md
serif       → TEAM_MEMORY/SERIF.md
dice        → TEAM_MEMORY/DICE.md
edge        → TEAM_MEMORY/EDGE.md
```

**Alle Skills werden instruiert:**
> "IMPORTANT: ALWAYS read these files first for current context:
> 1. TEAM_MEMORY/{NAME}.md - Your complete memory
> 2. CORE_PRINCIPLES.md - The sacred principles
> 3. [role-specific docs]"

---

## 📊 Proof of Concept - Evaluation Criteria

**Go/No-Go Entscheidung am 2025-11-23 (1 Woche)**

### ✅ GO Kriterien:

1. **Skills werden automatisch aktiviert** - Claude erkennt Kontext & ruft passende Skills
2. **Context wird gehalten** - Skills nutzen ihre TEAM_MEMORY Files
3. **Persönlichkeiten sind erkennbar** - Page klingt wie Page, nicht wie Claude
4. **Entwicklung ist schneller** - Effizienzgewinn durch Expertise-Fokus
5. **Team-Diskussionen funktionieren** - Mehrere Skills können parallel genutzt werden

### ❌ NO-GO Kriterien:

1. **Skills werden nicht aktiviert** - Manueller Overhead zu groß
2. **Context geht verloren** - Skills "vergessen" ihre Identität
3. **Kommunikation ist chaotisch** - Unklare Agent-Übergaben
4. **Entwicklung ist langsamer** - Mehr Zeit für Agent-Management als Coding
5. **MVP-Progress leidet** - Experiment blockiert eigentliche Arbeit

---

## 🧪 Test-Szenarien

### Test 1: Single Skill Activation
**Szenario:** "Teste die Demo-Story und gib Feedback"
**Erwartung:** Page-Skill wird automatisch aktiviert
**Success:** Page gibt User-Feedback (nicht Developer-Analyse)

### Test 2: Multi-Skill Collaboration
**Szenario:** "Design a new feature for story navigation"
**Erwartung:** Serif (Design) + Syntax (Implementation) + Dice (Scope)
**Success:** Alle 3 Perspektiven in einer Antwort

### Test 3: Context Retention
**Szenario:** Multiple Aufgaben über mehrere Sessions
**Erwartung:** Skills erinnern sich an frühere Entscheidungen via TEAM_MEMORY
**Success:** Konsistente Entscheidungen, keine Wiederholungen

---

## 📝 Implementation Details

### YAML Frontmatter Format:

```yaml
---
name: skill-name         # lowercase, hyphens only
description: "..."       # max 1024 chars, WAS + WANN
tools: Read, Write       # optional, comma-separated
model: sonnet            # optional: sonnet|opus|haiku|inherit
---
```

### Skill File Structure:

```
.claude/skills/{skill-name}/
└── SKILL.md             # Required
    ├── YAML Frontmatter (name, description, tools, model)
    └── Markdown Content (Instructions, Examples, Context)
```

---

## 🔄 Workflow

### Automatische Aktivierung (Skills):

```
User: "Test the demo story"
  ↓
Claude erkennt: "testing" + "story" + "user perspective"
  ↓
Page-Skill wird automatisch aktiviert
  ↓
Page liest TEAM_MEMORY/PAGE.md
  ↓
Page gibt User-Feedback (als Page, nicht Claude)
```

### Manuelle Aktivierung (Subagents):

```
User/Claude: Task(subagent_type: "page", prompt: "...")
  ↓
Page-Subagent wird in separatem Context spawned
  ↓
Agent arbeitet isoliert
  ↓
Agent gibt Ergebnis zurück
```

---

## 🎲 Dice's Prediction

**Dice:** "Ich würfel für den Proof of Concept..."

*würfelt d20*

**Ergebnis: 17**

**Dice:** "15-19 = Gute Idee! Das System ist strukturell sound. Skills könnten besser funktionieren als Subagents für unser Use-Case. Aber: 1 Woche Test nötig um sicher zu sein."

---

## 📚 References

- **Claude Code Docs - Subagents:** https://code.claude.com/docs/en/sub-agents.md
- **Claude Code Docs - Skills:** https://code.claude.com/docs/en/skills.md
- **TEAM.md:** Die ursprüngliche Team-Definition
- **TEAM_MEMORY/*.md:** Individuelle Agent-Memories

---

## 🚀 Next Steps

1. **Test automatic skill activation** - Nutze natürliche Sprache, beobachte ob Skills triggern
2. **Test multi-skill collaboration** - Komplexe Tasks die mehrere Skills brauchen
3. **Document learnings** - Update diese Datei täglich mit Erkenntnissen
4. **Go/No-Go am 2025-11-23** - Entscheidung: behalten oder revert

---

**Status:** ✅ Implemented, ready for 1-week testing
**Next Review:** 2025-11-23
**Last Updated:** 2025-11-16
