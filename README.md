# AWFA1 - Interactive Fantasy RPG Literature Engine

> **"Kindle meets D&D" - Eine mobile-first Plattform für interaktive Fantasy-Geschichten**
>
> Erstelle und erlebe interaktive Fantasy-Literatur auf dem Smartphone - open source, frei teilbar, einfach zu nutzen.

**Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/) 🚀

**Current Version:** v0.6 (MVP near complete!)

---

## 🎯 Was ist das?

Eine Engine, mit der **Autoren** interaktive Fantasy-Geschichten erstellen und **Leser** diese wie ein E-Book erleben können - mit Entscheidungen, Verzweigungen und multiplen Enden.

**Für Leser:** Lies Fantasy-Bücher wie auf einem Kindle - aber triff Entscheidungen die die Geschichte verändern.

**Für Autoren:** Schreibe verzweigte Geschichten so einfach wie in einem Editor - keine Programmierung nötig.

---

## ✨ Features (MVP v0.6)

### 📖 **Reader (Lesemodus)**
- ✅ **Immersive Reading Experience** - Kindle-ähnliche Typography, optimale Zeilenlänge
- ✅ **Mobile-First Design** - Touch-optimiert, responsive auf allen Geräten
- ✅ **Interaktive Choices** - Verzweigungen durch Entscheidungen
- ✅ **Story Library** - Browse & play Stories, Import/Export
- ✅ **Personal Stories** - Speichere deine eigenen Geschichten
- ✅ **Progress Tracking** - Fortschritt wird automatisch gespeichert (LocalStorage)
- ✅ **Clean UI** - Navigation verschwindet beim Lesen (volle Immersion)

### ✍️ **Editor (Autorenmodus)**
- ✅ **Visual Node Editor** - Side-by-Side Layout (Liste links, Editor rechts)
- ✅ **Editable Node Names** - Lesbare IDs statt Timestamps (node-1, node-2, etc.)
- ✅ **Choice Management** - Verzweigungen mit Target-Selection
- ✅ **Title & Author Fields** - Metadata direkt editierbar
- ✅ **JSON Preview** - Live-Vorschau mit Copy-to-Clipboard
- ✅ **Export/Import** - Stories als JSON speichern & laden
- ✅ **Save to Library** - Speichere in "Meine Geschichten"
- ✅ **Validation & Error Handling** - Hilfreiche Fehlermeldungen

---

## 🚀 Schnellstart

### Option 1: Live Demo nutzen
1. Gehe zu [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)
2. Klicke "Geschichten lesen" → Wähle eine Demo-Story
3. Oder klicke "Geschichten erschaffen" → Erstelle deine eigene!

### Option 2: Lokal entwickeln
```bash
# Clone repository
git clone https://github.com/AndersenWebworks/awfa1.git
cd awfa1/frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

**Dev Server:** http://localhost:5173/
**Build Output:** `frontend/dist/`

---

## 📱 Mobile-First Design

**Alles funktioniert perfekt auf dem Smartphone:**
- ✅ Touch-optimierte Buttons (min. 44x44px)
- ✅ Responsive Layout (320px+)
- ✅ Optimierte Typography für kleine Bildschirme
- ✅ Side-by-Side Editor wird auf Mobile gestacked
- ✅ Getestet auf 12+ Geräten (iPhone SE, Pixel, iPad, Desktop)

**Reading Experience:**
- Goudy Bookletter 1911 Font (Kindle-ähnlich)
- Line-height: 1.8 (Desktop) / 1.75 (Mobile)
- Max-width: 42rem (~65-75 Zeichen/Zeile - optimal)
- Bottom padding für "breathing room"

---

## 🛠️ Tech Stack

```
Frontend (PWA):
├── Vue.js 3 (Composition API)
├── Vite (Build Tool, HMR)
├── Tailwind CSS v3 (Styling)
├── Pinia (State Management)
└── VueRouter (SPA Routing)

Deployment:
├── GitHub Pages
├── GitHub Actions (Auto-Deploy)
└── Vite Build Pipeline
```

**Warum dieser Stack?**
- **Vue 3:** Reactive, performant, sanfte Lernkurve
- **Vite:** Blitzschnelles HMR, optimierte Builds
- **Tailwind:** Mobile-first by default, rapid prototyping
- **Pinia:** Vue 3 native, TypeScript ready
- **No Backend (yet):** LocalStorage für MVP, später Cloud-Sync

---

## 📊 MVP Status

**Version:** v0.6 (Build 6)
**MVP Completion:** ~95%

### ✅ Completed Milestones:
- **Milestone 1:** Projekt Setup ✅
- **Milestone 2:** Datenmodell & JSON Schema ✅
- **Milestone 3:** Basic Story Reader ✅
- **Milestone 4:** Basic Story Editor ✅
- **Milestone 6:** Polish & Testing (in progress) ✅

### 📋 Remaining für MVP v1.0:
- [ ] Final README polish (this file)
- [ ] Comprehensive cross-device testing
- [ ] Performance audit (Lighthouse 95+)
- [ ] Accessibility review (optional)

### ⏳ Post-MVP (Phase 2):
- [ ] Stats System (optional für Autoren)
- [ ] Dice Rolls & Conditions
- [ ] Visual Tree Editor (VueFlow)
- [ ] Backend & Cloud Storage
- [ ] User Authentication
- [ ] Story Discovery / Community

---

## 📂 Projekt-Struktur

```
awfa1/
├── frontend/                 # Vue.js App
│   ├── src/
│   │   ├── views/
│   │   │   ├── HomeView.vue        # Landing Page
│   │   │   ├── ReaderView.vue      # Story Reader
│   │   │   └── EditorView.vue      # Story Editor
│   │   ├── components/
│   │   │   ├── StoryLibrary.vue    # Library Browser
│   │   │   ├── ReaderHeader.vue    # Minimal Reader Nav
│   │   │   └── EndingScreen.vue    # Story Endings
│   │   ├── stores/
│   │   │   ├── story.js            # Reader State
│   │   │   ├── editor.js           # Editor State
│   │   │   └── personalStories.js  # User's Stories
│   │   └── router/index.js
│   ├── public/                     # Public assets
│   └── package.json
│
├── docs/                     # GitHub Pages Deploy Target
├── ai/
│   └── manifest.json         # Version Tracking
│
├── CORE_PRINCIPLES.md        # ⭐ Heilige Prinzipien
├── VISION.md                 # Vision & USP
├── TECHNICAL_CONCEPT.md      # Architektur
├── MVP_ROADMAP.md            # Milestones
└── README.md                 # Diese Datei
```

---

## 🎮 Wie es funktioniert

### Als Leser:
1. **Browse Library** → Wähle eine Story aus "Alle Geschichten"
2. **Read** → Lies den Text, treffe Entscheidungen
3. **Navigate** → Folge deinen Choices durch die Story
4. **Progress Auto-Save** → Dein Fortschritt wird gespeichert
5. **Back Button** → Zurück zur Library

### Als Autor:
1. **Create Story** → Klicke "Neue Geschichte erstellen"
2. **Edit Metadata** → Titel & Autor eingeben
3. **Add Nodes** → Erstelle Abschnitte (Nodes) mit Text
4. **Add Choices** → Verzweigungen mit Ziel-Auswahl
5. **Preview JSON** → Live-Vorschau deiner Story-Struktur
6. **Save/Export** → Speichere in "Meine Geschichten" oder exportiere als JSON

---

## 📖 Story Format (JSON)

```json
{
  "id": "story-123",
  "title": "Dein Abenteuer",
  "author": "Dein Name",
  "version": "1.0.0",
  "metadata": {
    "description": "Eine epische Fantasy-Geschichte",
    "genre": ["fantasy"],
    "tags": []
  },
  "startNodeId": "start",
  "nodes": [
    {
      "id": "start",
      "type": "story",
      "content": {
        "text": "Du erwachst in einem dunklen Wald..."
      },
      "choices": [
        {
          "id": "choice_1",
          "text": "Nach Norden gehen",
          "targetNode": "north"
        },
        {
          "id": "choice_2",
          "text": "Nach Süden gehen",
          "targetNode": "south"
        }
      ]
    }
  ]
}
```

**Validation:**
- ✅ Mindestens 1 Node
- ✅ Titel erforderlich
- ✅ startNodeId muss existieren (auto-fix auf ersten Node)
- ✅ Choices können leer sein (= Ende der Geschichte)

---

## 🧭 Entwicklungs-Philosophie

### CORE PRINCIPLES:
1. **Mobile-First ist nicht verhandelbar**
2. **Lesefreundlichkeit vor Gaming-UI**
3. **Flexibilität ohne Zwang**
4. **Writer-Friendly vor Developer-Friendly**
5. **Open Source & Community**

**Fokus-Test vor jedem Feature:**
> "Hilft es beim Schreiben oder Lesen einer Fantasy-Geschichte auf dem Handy?"

Wenn NEIN → weglassen.

Details: [CORE_PRINCIPLES.md](./CORE_PRINCIPLES.md)

---

## 🤝 Für Entwickler

### Setup:
```bash
cd frontend
npm install
npm run dev
```

### Build & Deploy:
```bash
npm run build            # Build zu frontend/dist/
cp -r dist/* ../docs/    # Copy to GitHub Pages dir
git add -A
git commit -m "deploy: v0.x"
git push                 # GitHub Actions deployt automatisch
```

### Code-Stil:
- Vue 3 Composition API (`<script setup>`)
- Tailwind CSS (utility-first)
- Pinia Stores (composable state)
- DRY, SSOT, Clean Architecture
- Mobile-First (test auf echten Geräten!)

### Before PR:
1. Test auf Mobile (real device!)
2. Check Lighthouse Score (95+ target)
3. Validate gegen CORE_PRINCIPLES
4. Update manifest.json version

---

## 📜 Changelog

**v0.6** (Current) - Polish & QA
- Mobile JSON preview fix
- Save validation
- Better error messages

**v0.5** - Milestone 4 Complete
- JSON live preview modal
- ES module fix

**v0.4** - Editor UX Overhaul
- Editable node names
- Side-by-side layout
- Title/Author fields

**v0.3** - Reader Immersion
- Library vs Reading mode distinction
- Nav hiding in reading mode
- Bottom padding

**v0.2** - GitHub Pages Deploy
**v0.1** - Initial MVP Setup

Details: `ai/manifest.json`

---

## 🎯 Vision

**"Das WordPress für interaktive Fantasy-Literatur"**

Eine lebendige Community von Autoren und Lesern die:
- Interaktive Fantasy-Geschichten erstellen & teilen
- Von einfachen "Choose Your Own Adventure" bis komplexen RPG-Welten
- Alles open source, kostenlos, remixbar
- Eine neue Form der Fantasy-Literatur erschaffen

---

## 📝 Team

Entwickelt mit Hilfe von:
- **Syntax** (Tech Lead) - Code Architecture
- **Serif** (UX/UI Designer) - Typography & Mobile Experience
- **Dice** (Product Manager) - Scope & Vision
- **Page** (Lead Playtester) - User Voice
- **Edge** (QA Lead) - Testing & Quality

Siehe: [.claude/CLAUDE.md](.claude/CLAUDE.md)

---

## 📄 Lizenz

Open Source (noch keine Lizenz gewählt)

---

## 🔗 Links

- **Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/) 🚀
- **Repository:** [github.com/AndersenWebworks/awfa1](https://github.com/AndersenWebworks/awfa1)
- **Core Principles:** [CORE_PRINCIPLES.md](./CORE_PRINCIPLES.md) ⭐
- **Vision:** [VISION.md](./VISION.md)
- **Tech Concept:** [TECHNICAL_CONCEPT.md](./TECHNICAL_CONCEPT.md)
- **MVP Roadmap:** [MVP_ROADMAP.md](./MVP_ROADMAP.md)

---

**Let's build the future of interactive Fantasy literature.** 📖✨
