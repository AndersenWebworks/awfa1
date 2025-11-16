# Projekt-Kontext

**Last Updated:** 2025-11-16
**Version:** v0.2
**Phase:** MVP Development - Milestone 1 Completed

## Was ist dieses Projekt?

**Interactive Fantasy RPG Literature Engine** - Eine mobile-first PWA für interaktive Fantasy-Geschichten.

**Tagline:** "Das WordPress für interaktive Fantasy-Literatur"

**Zielgruppe:**
- Fantasy-Leser die interaktive Geschichten auf dem Handy lesen wollen (Kindle-like)
- Game Master & Autoren die RPG-Kampagnen erstellen wollen (einfach wie ein Notizbuch)

## Aktueller Status

### Completed ✅
- Vision, Tech-Konzept, Core Principles dokumentiert
- Team-Struktur (Syntax, Serif, Dice, Page, Edge) etabliert
- Vite + Vue 3 + Tailwind Projekt aufgesetzt
- Pinia State Management implementiert
- Router & Basis-Views erstellt
- GitHub Pages Deployment konfiguriert
- Demo Stories erstellt (demo-story.json, page-dragon-story.json)
- Persistente Navigation implementiert
- SPA-Routing mit 404.html-Redirect

### Live Demo
[https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)

### Next Steps
- Reader View Features ausbauen
- Editor View Features ausbauen
- JSON Schema finalisieren

## Tech Stack

```
Frontend (PWA):
├── Vue.js 3 (Composition API)
├── Vite (Build Tool)
├── Tailwind CSS (Styling)
├── Pinia (State Management)
└── VueUse (Mobile Utilities)

Backend (später):
├── Node.js + Express (REST API)
└── PostgreSQL (Datenbank)

Deployment:
├── GitHub Pages
└── GitHub Actions (auto-deploy)
```

## Projektstruktur

```
/
├── frontend/              # Vue.js PWA
│   ├── src/
│   │   ├── views/        # EditorView, ReaderView, LibraryView
│   │   ├── components/   # Shared Components
│   │   ├── stores/       # Pinia Stores (storyStore)
│   │   └── router/       # Vue Router
│   ├── public/           # Static Assets (404.html, demo-stories)
│   └── dist/             # Build Output (für GitHub Pages)
│
├── docs/                  # Root-Doku (README, VISION, etc.)
├── ai/                    # KI-Kontext & Versionierung
│   ├── manifest.json     # SSOT für Versionen
│   ├── CONTEXT.md        # Diese Datei
│   ├── ARCHITECTURE.md   # Tech-Doku
│   └── CHANGELOG.md      # Changelog
│
├── .claude/              # Claude Code Config
│   ├── skills/          # Team Skills (dice, edge, page, serif, syntax)
│   └── agents/          # Team Agents
│
├── TEAM_MEMORY/          # Team-Gedächtnis
│   ├── DAILY_LOGS/      # Daily Progress Logs
│   └── QA_REPORTS/      # QA-Berichte (Edge)
│
└── CORE_PRINCIPLES.md    # Die 5 heiligen Prinzipien
```

## Core Principles (Die 5 Heiligen)

1. **Mobile-First ist nicht verhandelbar**
2. **Lesefreundlichkeit vor Gaming-UI**
3. **Flexibilität ohne Zwang**
4. **Writer-Friendly vor Developer-Friendly**
5. **Open Source & Community**

**Bei JEDER Entscheidung prüfen!**

## Das Team

- **Syntax** ⚡ - Tech Lead & Code Architect
- **Serif** 📱 - UX/UI Designer & Mobile Experience Lead
- **Dice** 🎲 - Product Manager & Scope Guardian (VETO-Recht!)
- **Page** 📖 - Lead Playtester & User Voice
- **Edge** 🔍 - QA Lead & Bug Hunter

**Wichtig:** Bei komplexen Entscheidungen verschiedene Perspektiven zeigen!

## MVP Definition of Done

Eine funktionierende Demo, in der:
1. Im **Editor** eine Story mit 5+ Nodes erstellt werden kann
2. Nodes verbunden und Text eingegeben werden kann
3. Im **Reader** die Story durchgespielt werden kann
4. Choices getroffen werden können die zu anderen Nodes führen
5. Die Story als JSON exportiert/importiert werden kann

**OHNE** (kommt später):
- Stats, Dice Rolls, Conditions
- Backend, User Auth, Cloud Storage
- Inventory System
- Community Features

## Bekannte Issues

*Aktuell keine kritischen Issues*

## Offene Tasks

- [ ] Reader View: Story-Navigation verbessern
- [ ] Editor View: Node-Editor implementieren
- [ ] JSON Schema für Stories finalisieren
- [ ] Testing auf verschiedenen Mobile Devices (Edge)

## Wichtige Links

- **Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)
- **Core Principles:** [../CORE_PRINCIPLES.md](../CORE_PRINCIPLES.md)
- **Team:** [../TEAM.md](../TEAM.md)
- **Vision:** [../VISION.md](../VISION.md)
- **Tech Concept:** [../TECHNICAL_CONCEPT.md](../TECHNICAL_CONCEPT.md)

## Für neue KI-Sessions

1. Lies **zuerst** [CORE_PRINCIPLES.md](../CORE_PRINCIPLES.md)
2. Lies [TEAM.md](../TEAM.md) - du BIST das Team!
3. Lies diese Datei (CONTEXT.md)
4. Bei Tech-Fragen: [ARCHITECTURE.md](ARCHITECTURE.md)
5. Bei Scope-Fragen: Dice fragen! 🎲

**Dice's Reminder:** Kein Feature Creep! MVP first! 🛑
