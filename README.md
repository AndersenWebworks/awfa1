# Interactive Fantasy RPG Literature Engine

> **"Das WordPress für interaktive Fantasy-Literatur"**
>
> Eine mobile-first, open-source Plattform für interaktive Fantasy-Geschichten - Kindle meets D&D.

---

## 🎯 Was ist das?

Eine Engine, mit der **Autoren und Game Master** interaktive Fantasy-RPG-Kampagnen erstellen und **Spieler** diese wie ein E-Book lesen und erleben können - alles vom Smartphone aus.

**Für Spieler:** Lies Fantasy-Bücher wie auf einem Kindle - aber lebe sie wie in einem Pen & Paper RPG.

**Für Master:** Schreibe Fantasy-RPG-Kampagnen so einfach wie eine Geschichte - aber mit der Macht komplexer RPG-Systeme.

---

## 📚 Dokumentation

### Pflichtlektüre (in dieser Reihenfolge):
1. **[CORE_PRINCIPLES.md](./CORE_PRINCIPLES.md)** - Die unverrückbaren Prinzipien (IMMER zuerst lesen!)
2. **[TEAM.md](./TEAM.md)** - 🎲 Meet the Team: Syntax, Serif & Dice (NUTZE DAS TEAM!)
3. **[VISION.md](./VISION.md)** - Die nicht-technische Vision
4. **[TECHNICAL_CONCEPT.md](./TECHNICAL_CONCEPT.md)** - Technische Architektur & Datenmodell
5. **[MVP_ROADMAP.md](./MVP_ROADMAP.md)** - Konkrete Entwicklungs-Milestones

### Wichtig für zukünftige Entwickler/Claude-Instanzen:
- Lies **CORE_PRINCIPLES.md** vor JEDER Entscheidung
- Lies **TEAM.md** und NUTZE das Team (Syntax, Serif, Dice)
- Antworte ALS das Team - verschiedene Perspektiven zeigen
- Nutze den **Fokus-Test** (5 Fragen) vor jedem neuen Feature
- Halte dich an die **MVP Roadmap** - kein Scope Creep!

---

## 🛠️ Tech Stack

```
Frontend (PWA):
├── Vue.js 3 (Composition API)
├── Vite (Build Tool)
├── Tailwind CSS (Styling)
├── Pinia (State Management)
├── VueFlow (Tree Visualisierung)
└── VueUse (Mobile Utilities)

Backend:
├── Node.js + Express (REST API)
├── PostgreSQL (Datenbank - später)
└── JSON File Storage (MVP Start)
```

**Warum dieser Stack?**
- Vue.js: Sanfte Lernkurve, perfekt für komplexe State
- Node.js: JavaScript full-stack, keine Code-Duplizierung
- Tailwind: Mobile-first by default
- Details siehe: [TECHNICAL_CONCEPT.md](./TECHNICAL_CONCEPT.md)

---

## 📍 Aktueller Status

**Phase:** MVP Development - Milestone 1 ✅
**Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)
**Nächster Schritt:** Reader & Editor Features (siehe [MVP_ROADMAP.md](./MVP_ROADMAP.md))

### Completed:
- ✅ Vision definiert
- ✅ Technisches Konzept erstellt
- ✅ Core Principles festgelegt
- ✅ Datenmodell entworfen
- ✅ MVP Roadmap definiert
- ✅ Vite + Vue 3 Projekt aufgesetzt
- ✅ Tailwind CSS konfiguriert
- ✅ Pinia State Management implementiert
- ✅ Router & Basis-Views erstellt
- ✅ GitHub Pages Deployment konfiguriert
- ✅ Demo Stories erstellt

### Next:
- [ ] Reader View Features ausbauen
- [ ] Editor View Features ausbauen
- [ ] JSON Schema finalisieren

---

## 🎮 Die zwei Modi

### 1. Editor (für Game Master & Autoren)
- Visual Tree Editor (Drag & Drop Nodes)
- Text schreiben wie in einem Notizbuch
- Optional: Stats, Würfel, Inventar konfigurieren
- Test-Modus: Story direkt spielen
- Export/Import Stories (JSON)

### 2. Reader (für Spieler)
- Kindle-like Reading Experience
- Elegante Typography, Dark Mode
- Interaktive Choices
- Optional: Character Stats, Inventar
- Auto-Save Progress (LocalStorage)

---

## 🚀 MVP Ziel

**Definition of Done:**
Eine funktionierende Demo, in der du:
1. Im **Editor** eine Story mit 5+ Nodes erstellen kannst
2. Nodes verbinden und Text eingeben kannst
3. Im **Reader** diese Story durchspielen kannst
4. Choices treffen kannst die zu anderen Nodes führen
5. Die Story als JSON exportieren/importieren kannst

**Ohne** (kommt später):
- Stats, Dice Rolls, Conditions
- Backend, User Auth, Cloud Storage
- Inventory System
- Community Features

**Timeline:** MVP in 2-3 Entwicklungs-Sessions

---

## 📱 Mobile-First Design Principles

### Für den Reader:
- Serifenschrift (Merriweather, Lora)
- Optimal Line Length (50-75 chars)
- Touch-optimierte Buttons (min 44x44px)
- Swipe Gestures
- Dark Mode (AMOLED black)

### Für den Editor:
- Große Touch Targets
- Drag & Drop mit Touch
- Mobile Keyboard optimiert
- Quick Actions
- Intuitive Gesten

---

## 🧭 Entwicklungs-Kompass

**Bei jeder Entscheidung fragen:**
> "Würde das helfen, wenn jemand abends im Bett auf dem Handy eine Fantasy-Geschichte schreibt oder spielt?"

Wenn NEIN → weglassen.

**Die 5 Prinzipien prüfen:**
1. Mobile-First ist nicht verhandelbar ✅
2. Lesefreundlichkeit vor Gaming-UI ✅
3. Flexibilität ohne Zwang ✅
4. Writer-Friendly vor Developer-Friendly ✅
5. Open Source & Community ✅

---

## 📂 Projekt-Struktur (geplant)

```
/
├── frontend/              # Vue.js PWA
│   ├── src/
│   │   ├── views/
│   │   │   ├── EditorView/    # Story Editor
│   │   │   └── ReaderView/    # Story Reader
│   │   ├── components/        # Shared Components
│   │   └── stores/            # Pinia Stores
│   └── public/
│
├── backend/               # Node.js API (später)
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── services/
│   └── package.json
│
├── docs/                  # Dokumentation
├── examples/              # Example Campaigns
│
├── CORE_PRINCIPLES.md     # ⭐ Die heiligen Prinzipien
├── VISION.md              # Vision & Zielgruppe
├── TECHNICAL_CONCEPT.md   # Technisches Konzept
├── MVP_ROADMAP.md         # Entwicklungs-Milestones
└── README.md              # Diese Datei
```

---

## 🤝 Für zukünftige Entwickler

### Bevor du anfängst:
1. Lies **alle Docs** in der oben genannten Reihenfolge
2. Verstehe die **5 Core Principles**
3. Halte dich an die **MVP Roadmap**
4. Nutze den **Fokus-Test** bei Unsicherheit

### Beim Entwickeln:
- Mobile-First (teste auf echtem Smartphone!)
- Einfache Stories dürfen nicht komplexer werden
- Lesefreundlichkeit > Gaming-Features
- Writer-Friendly UI (keine technischen Begriffe)

### Bei Feature-Requests:
- Prüfe gegen **CORE_PRINCIPLES.md**
- Nutze den **Fokus-Test** (5 Fragen)
- Wenn Zweifel: Lass es weg (später hinzufügen ist leichter)

---

## 🎯 Langfristige Vision

Eine lebendige Community von tausenden Autoren, Game Mastern und Spielern die:
- Interaktive Fantasy-Literatur erstellen und teilen
- Von einfachen Stories bis komplexen RPG-Welten
- Alles open source, kostenlos und remixbar
- Eine neue Form der Fantasy-Literatur erschaffen

**"Das WordPress für interaktive Fantasy-Literatur"**

---

## 📝 Notizen für Claude-Instanzen

### Context für neue Sessions:
1. Lies immer zuerst **CORE_PRINCIPLES.md**
2. Lies **TEAM.md** und werde Syntax, Serif & Dice 🎲
3. Prüfe **MVP_ROADMAP.md** für aktuellen Status
4. Halte dich an die **Definition of Done** im Roadmap
5. Kein Feature Creep - MVP first!

### Bei Unsicherheit:
- Frage den User, statt anzunehmen
- Prüfe gegen die 5 Core Principles
- Nutze den Fokus-Test
- Im Zweifel: einfacher ist besser

### Wichtige Entscheidungen:
- Datenmodell siehe **TECHNICAL_CONCEPT.md** Zeile 52-205
- MVP Scope siehe **TECHNICAL_CONCEPT.md** Zeile 260-278
- Progressive Enhancement siehe **TECHNICAL_CONCEPT.md** Zeile 284-334

---

## 🔗 Quick Links

- **Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/) 🚀
- **Core Principles:** [CORE_PRINCIPLES.md](./CORE_PRINCIPLES.md) ⭐
- **The Team:** [TEAM.md](./TEAM.md) 🎲 ← **START HERE for Claude instances!**
- **Vision:** [VISION.md](./VISION.md)
- **Tech Concept:** [TECHNICAL_CONCEPT.md](./TECHNICAL_CONCEPT.md)
- **MVP Roadmap:** [MVP_ROADMAP.md](./MVP_ROADMAP.md)
- **Deploy Instructions:** [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)

---

## 🚀 Deployment

**Live URL:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)

**Platform:** GitHub Pages mit GitHub Actions
**Branch:** `main`
**Build:** Automatisch bei jedem Push

### Deploy Workflow:
1. Push zu `main` oder `claude/*` Branch
2. GitHub Actions baut Vue App (`npm run build`)
3. Deployed automatisch zu GitHub Pages
4. Live in ~2-3 Minuten

Siehe [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md) für Details.

---

**Let's build something beautiful.** 📖✨
