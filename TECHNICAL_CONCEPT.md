# Technisches Konzept: Text Adventure Engine

## Architektur-Überblick

### Tech Stack

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
├── PostgreSQL (Datenbank)
└── JSON File Storage (MVP)

Deployment:
├── Frontend: Vercel / Netlify (PWA)
└── Backend: Railway / Render
```

### Warum dieser Stack?

**Vue.js 3:**
- Sanfte Lernkurve für WordPress-Entwickler
- Perfekte Reactivity für komplexe State (Stats, Inventar, Tree)
- Exzellenter Mobile-Support
- Component-basiert (Editor + Reader teilen Code)

**Node.js Backend:**
- JavaScript full-stack (eine Sprache)
- Story-Logic kann im Editor UND Player ausgeführt werden
- Keine Code-Duplizierung zwischen Backend und Frontend
- NPM-Ökosystem für RPG-Mechaniken (Dice-Roller, etc.)

**Tailwind CSS:**
- Utility-first = schnelles Prototyping
- Mobile-first by default
- Einfaches Theming (Dark Mode, Reading Themes)

---

## Core Datenmodell

### Campaign / Story Structure

```javascript
{
  campaign: {
    id: "uuid",
    title: "Die dunklen Wälder von Eldoria",
    author: "user_id",
    version: "1.0.0",

    // Metadata
    metadata: {
      description: "Eine epische Fantasy-Geschichte...",
      genre: ["fantasy", "dark-fantasy"],
      difficulty: "medium",
      estimatedPlaytime: "3-5 hours",
      tags: ["magic", "dragons", "choices-matter"]
    },

    // RPG System Configuration
    system: {
      usesStats: true,
      usesDice: true,
      usesInventory: true,

      stats: {
        strength: { min: 1, max: 20, default: 10 },
        intelligence: { min: 1, max: 20, default: 10 },
        charisma: { min: 1, max: 20, default: 10 }
      },

      diceSystem: "d20" // oder "2d6", "custom", etc.
    },

    // Story Nodes
    nodes: [
      {
        id: "node_1",
        type: "story", // "story", "choice", "dice_check", "combat"

        content: {
          text: "Der alte Magier blickt dich durchdringend an...",

          // Optional: Media
          image: "url/to/image.jpg",
          sound: "ambient_magic.mp3"
        },

        // Choices (Verzweigungen)
        choices: [
          {
            id: "choice_1",
            text: "Die Wahrheit sagen",
            targetNode: "node_2",

            // Optional: Conditions
            conditions: {
              operator: "AND", // oder "OR"
              checks: [
                { type: "stat", stat: "charisma", operator: ">=", value: 15 },
                { type: "flag", flag: "met_wizard_before", value: true }
              ]
            },

            // Optional: Effects
            effects: {
              stats: { charisma: +1 },
              flags: { told_truth: true },
              items: ["blessing_of_truth"]
            }
          },
          {
            id: "choice_2",
            text: "Ihn anlügen",
            targetNode: "node_3",

            // Optional: Dice Roll
            diceRoll: {
              stat: "charisma",
              dc: 15, // Difficulty Class
              onSuccess: "node_3a",
              onFailure: "node_3b"
            }
          }
        ],

        // Optional: Automatic Events
        events: {
          onEnter: [
            { type: "giveItem", item: "old_map" },
            { type: "setFlag", flag: "chapter_1_started", value: true }
          ],
          onExit: [
            { type: "saveCheckpoint" }
          ]
        }
      }
    ],

    // Visual Tree (für Editor)
    graph: {
      nodes: [
        { id: "node_1", position: { x: 100, y: 100 } }
      ],
      edges: [
        { id: "edge_1", source: "node_1", target: "node_2", label: "Wahrheit" }
      ]
    }
  }
}
```

### Player State

```javascript
{
  playerId: "uuid",
  campaignId: "uuid",

  // Current Progress
  currentNode: "node_42",
  checkpoint: "node_40",

  // Character State
  character: {
    name: "Thorin",

    stats: {
      strength: 15,
      intelligence: 12,
      charisma: 14
    },

    inventory: [
      { id: "sword_of_flame", quantity: 1 },
      { id: "healing_potion", quantity: 3 }
    ],

    // Story Flags (für Conditions)
    flags: {
      met_wizard: true,
      saved_princess: false,
      betrayed_guild: true
    }
  },

  // History (für Replay-Wert)
  history: [
    { nodeId: "node_1", choiceId: "choice_1", timestamp: "..." }
  ],

  // Metadata
  startedAt: "2025-10-26T...",
  lastPlayedAt: "2025-10-26T...",
  playtime: 7200 // seconds
}
```

---

## Komponenten-Architektur

### 1. Story Editor (für Master)

```
EditorView/
├── TreeView.vue (Visual Graph mit VueFlow)
├── NodeEditor.vue (Edit Panel für aktiven Node)
├── TestPlayer.vue (Quick Play Test)
└── Sidebar.vue (Campaign Settings, Stats Config)

Features:
- Drag & Drop Nodes erstellen
- Connect Nodes mit Edges
- Inline Text-Editor (Rich Text)
- Condition Builder (GUI für komplexe Conditions)
- Test-Modus (Story direkt spielen)
```

### 2. Story Reader (für Spieler)

```
ReaderView/
├── StoryText.vue (Kindle-like Text Display)
├── ChoicePanel.vue (Entscheidungs-UI)
├── CharacterSheet.vue (Slide-in Stats/Inventory)
├── DiceRoller.vue (Animation für Würfelwürfe)
└── SaveManager.vue (Progress speichern/laden)

Features:
- Typography-focused Design
- Smooth Transitions zwischen Nodes
- Touch Gestures (Swipe für History)
- Auto-Save Progress
- Reading Settings (Font Size, Theme, Brightness)
```

### 3. Shared Components

```
components/
├── ConditionEvaluator.js (Logic für Conditions)
├── EffectExecutor.js (Logic für Effects)
├── DiceSystem.js (Würfel-Mechaniken)
└── StateManager.js (Player State Updates)
```

**Wichtig:** Diese Logic läuft **identisch** im Editor (Test) und Reader (Play)!

---

## MVP Scope - Phase 1

### Must Have:
✅ Basic Tree Editor (Nodes, Connections)
✅ Text Input für Story Content
✅ Simple Choices (ohne Conditions)
✅ Reader mit Kindle-like UX
✅ Progress Saving (LocalStorage)
✅ Export/Import (JSON)
✅ Mobile-Responsive

### Nice to Have (später):
⏳ Stats System
⏳ Dice Rolls
⏳ Conditions & Effects
⏳ Inventory System
⏳ Backend Storage
⏳ User Auth
⏳ Cloud Publishing

---

## Progressive Enhancement Strategie

### Level 1: Simple Interactive Story
```javascript
// Autor braucht nur:
{
  text: "Was tust du?",
  choices: [
    { text: "Nach links", goto: "node_2" },
    { text: "Nach rechts", goto: "node_3" }
  ]
}
```

### Level 2: Basic RPG
```javascript
// + Stats hinzufügen:
{
  text: "Der Troll versperrt den Weg",
  choices: [
    {
      text: "Ihn überzeugen",
      goto: "node_2",
      condition: { stat: "charisma", min: 15 }
    }
  ]
}
```

### Level 3: Complex RPG
```javascript
// + Dice, Effects, Flags:
{
  text: "Du versuchst die Tür aufzubrechen",
  diceRoll: {
    stat: "strength",
    dc: 18,
    onSuccess: {
      goto: "node_open",
      effects: { stats: { strength: +1 } }
    },
    onFailure: {
      goto: "node_fail",
      effects: {
        stats: { health: -5 },
        flags: { alerted_guards: true }
      }
    }
  }
}
```

**Jeder Master wählt sein Level!**

---

## Mobile-First Considerations

### Touch Optimization:
- Große Touch Targets (min 44x44px)
- Swipe Gestures (Navigation, Menüs)
- Pull-to-Refresh (Reader)
- Haptic Feedback (Choices, Dice Rolls)

### Performance:
- Lazy Loading (große Kampagnen)
- Virtualized Lists (wenn 100+ Nodes)
- Service Worker (PWA, Offline Reading)
- Image Optimization (WebP, Lazy Load)

### Reading Experience:
- Optimal Line Length (50-75 characters)
- Responsive Font Scaling
- Dark Mode (AMOLED black für mobile)
- Screen Wake Lock (während Lesen)

---

## Deployment Strategie

### MVP (Phase 1):
```
Frontend:
- Vite Build → Static Files
- Deploy auf Vercel/Netlify
- PWA installierbar

Backend (später):
- Node.js API auf Railway
- PostgreSQL Database
- S3/R2 für Story Files
```

### Open Source:
```
GitHub Repository:
├── /frontend (Vue App)
├── /backend (Node API)
├── /docs (Dokumentation)
├── /examples (Example Campaigns)
└── README.md (Getting Started)
```

---

## Erweiterbarkeit

### Plugin System (später):
```javascript
// Custom Dice Systems
plugins: {
  diceRoller: "fate-dice", // statt d20

  // Custom Stats
  statsSystem: "world-of-darkness",

  // Custom UI Themes
  readerTheme: "gothic-horror"
}
```

### API für Community Tools:
- Campaign Validator
- Story Analyzer (tote Enden finden)
- Complexity Calculator
- AI Story Helper (GPT Integration)

---

## Nächste Schritte

1. **Setup:** Vite + Vue 3 Projekt initialisieren
2. **Datenmodell:** JSON Schema definieren
3. **Prototyp Editor:** Basic Tree mit 3-5 Nodes
4. **Prototyp Reader:** Simplen Story Path durchspielen
5. **Iteration:** Feedback → Features hinzufügen

**Ziel:** Funktionierende Demo in der du eine simple Story erstellen und spielen kannst.
