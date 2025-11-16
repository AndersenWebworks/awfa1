# MVP Roadmap - Konkrete Entwicklungs-Milestones

**Ziel:** Eine funktionierende Demo in der man eine einfache interaktive Story erstellen und spielen kann.

**Prinzip:** Einfach starten, dann erweitern. Kein Feature Creep!

---

## 🎯 Definition of Done (MVP)

### Eine Story muss:
- ✅ Im Editor mit 5+ Text-Nodes erstellt werden können
- ✅ Nodes müssen verbunden werden können (Verzweigungen)
- ✅ Jeder Node hat Text-Content
- ✅ Jeder Node kann 1-4 Choices haben
- ✅ Im Reader durchspielbar sein
- ✅ Als JSON exportiert/importiert werden können

### Spieler muss:
- ✅ Story laden können
- ✅ Text lesen (Kindle-like UX)
- ✅ Choices sehen und anklicken können
- ✅ Durch die Story navigieren (Forward/Back)
- ✅ Progress wird gespeichert (LocalStorage)

### NICHT im MVP (kommt später):
- ❌ Stats, Dice Rolls, Conditions
- ❌ Inventar System
- ❌ Backend / Cloud Storage
- ❌ User Auth / Login
- ❌ Community Features
- ❌ Rich Text Formatting
- ❌ Media (Bilder, Sounds)

---

## 📅 Milestones

### Milestone 1: Projekt Setup ⏳
**Geschätzte Zeit:** 1 Session

**Tasks:**
- [ ] Vite + Vue 3 Projekt initialisieren
- [ ] Tailwind CSS einrichten
- [ ] Pinia State Management setup
- [ ] Basis-Routing (Editor / Reader Views)
- [ ] Basic Mobile-Responsive Layout
- [ ] Git Repository bereinigen (falls nötig)

**Deliverable:**
- Leeres Vue-Projekt läuft auf `localhost`
- Kann zwischen Editor und Reader wechseln
- Responsive auf Mobile

---

### Milestone 2: Datenmodell & JSON Schema
**Geschätzte Zeit:** 0.5 Session

**Tasks:**
- [ ] JSON Schema für Campaign definieren
- [ ] JSON Schema für Story Node definieren
- [ ] JSON Schema für Player State definieren
- [ ] Validator-Functions schreiben
- [ ] Beispiel-Story als JSON erstellen (zum Testen)

**Deliverable:**
- `schemas/campaign.schema.js`
- `schemas/node.schema.js`
- `schemas/playerState.schema.js`
- `examples/simple-story.json` (5 Nodes zum Testen)

**Beispiel Simple Story:**
```javascript
{
  campaign: {
    id: "demo-001",
    title: "Der verlorene Schlüssel",
    nodes: [
      {
        id: "start",
        text: "Du stehst vor einer verschlossenen Tür...",
        choices: [
          { text: "Klopfen", targetNode: "knock" },
          { text: "Lauschen", targetNode: "listen" }
        ]
      },
      { id: "knock", text: "...", choices: [...] },
      { id: "listen", text: "...", choices: [...] }
    ]
  }
}
```

---

### Milestone 3: Basic Story Reader
**Geschätzte Zeit:** 1 Session

**Tasks:**
- [ ] `ReaderView.vue` erstellen
- [ ] `StoryText.vue` Component (Text Display)
- [ ] `ChoicePanel.vue` Component (Choices)
- [ ] Story aus JSON laden
- [ ] Navigation (Next Node bei Choice Click)
- [ ] Progress State (Pinia Store)
- [ ] LocalStorage Save/Load
- [ ] Basic Typography (Serif Font, Line Height)

**Deliverable:**
- Reader kann `examples/simple-story.json` laden
- Spieler kann durch Story navigieren
- Progress wird gespeichert
- Mobile-optimiert, lesefreundlich

**Design-Focus:**
- Kindle-like Typography
- Große Touch Targets für Choices
- Minimale UI (Fokus auf Text)
- Dark Mode optional

---

### Milestone 4: Basic Story Editor
**Geschätzte Zeit:** 1.5 Sessions

**Tasks:**
- [ ] `EditorView.vue` erstellen
- [ ] Node List anzeigen (alle Nodes)
- [ ] Node erstellen (+ Button)
- [ ] Node löschen (Delete Button)
- [ ] Node bearbeiten (Text Input)
- [ ] Choice hinzufügen zu Node
- [ ] Choice Target auswählen (Dropdown)
- [ ] Campaign JSON live preview
- [ ] Export Button (JSON Download)
- [ ] Import Button (JSON Upload)

**Deliverable:**
- Editor kann neue Story erstellen
- Nodes hinzufügen/löschen/bearbeiten
- Choices mit Targets definieren
- Story exportieren als JSON
- Story importieren aus JSON

**UI-Focus:**
- Einfach, nicht überladen
- Mobile-friendly (große Buttons)
- Liste statt Graph (Graph kommt später)
- Text Input im Fokus

---

### Milestone 5: Visual Tree Editor (Optional für MVP+)
**Geschätzte Zeit:** 1 Session

**Tasks:**
- [ ] VueFlow integration
- [ ] Nodes als Graph visualisieren
- [ ] Drag & Drop Nodes
- [ ] Connections zeichnen (Edges)
- [ ] Zoom & Pan
- [ ] Node Click → Edit Panel

**Deliverable:**
- Visual Tree neben/statt Node List
- Drag & Drop funktioniert auf Desktop
- Touch-optimiert für Mobile (schwierig!)

**Wichtig:**
- Dies ist **optional** für MVP
- Nur wenn Zeit & einfach mobile-nutzbar
- Sonst: Liste reicht für MVP, Graph später

---

### Milestone 6: Polish & Testing
**Geschätzte Zeit:** 0.5 Session

**Tasks:**
- [ ] Mobile Testing auf echtem Gerät
- [ ] Bug Fixes
- [ ] UX Improvements
- [ ] Keyboard Navigation (optional)
- [ ] Error Handling (z.B. kaputtes JSON)
- [ ] README Update (Setup Instructions)

**Deliverable:**
- Bug-freie Demo
- Auf Mobile getestet
- README mit Getting Started

---

## 📊 Timeline (Geschätzt)

| Milestone | Sessions | Status |
|-----------|----------|--------|
| 1. Setup | 1 | ✅ **Completed** |
| 2. Datenmodell | 0.5 | ⏳ Pending |
| 3. Reader | 1 | ⏳ In Progress (Basis vorhanden) |
| 4. Editor | 1.5 | ⏳ In Progress (Basis vorhanden) |
| 5. Visual Tree (optional) | 1 | ⏳ Pending |
| 6. Polish | 0.5 | ⏳ Pending |

**Total:** 4-5 Sessions (ohne Visual Tree: 3.5 Sessions)

**Live Demo:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/) 🚀

---

## 🧭 Entwicklungs-Reihenfolge

**Warum Reader BEFORE Editor?**
- Reader ist das Herzstück (Spieler-Erlebnis)
- Lesefreundlichkeit ist Priorität #1
- Reader hilft, Datenmodell zu verstehen
- Editor kann danach darauf aufbauen

**Warum Visual Tree optional?**
- Liste reicht für MVP (einfache Stories)
- Visual Tree braucht Zeit & Mobile-Optimierung
- Später hinzufügen ist einfacher
- Fokus: Funktionalität vor Ästhetik

---

## ✅ Acceptance Criteria - MVP Done

### Für Master (Editor):
1. Ich kann eine neue Kampagne starten
2. Ich kann Text-Nodes hinzufügen
3. Ich kann Choices definieren mit Targets
4. Ich kann die Kampagne als JSON exportieren
5. Ich kann eine JSON-Kampagne importieren
6. Das alles funktioniert auf meinem Smartphone

### Für Spieler (Reader):
1. Ich kann eine Kampagne laden
2. Ich kann den Text gut lesen (Kindle-like)
3. Ich kann Choices sehen und anklicken
4. Mein Progress wird gespeichert
5. Ich kann die App installieren (PWA)
6. Das alles funktioniert auf meinem Smartphone

### Technisch:
1. Code ist sauber & dokumentiert
2. Mobile-Responsive (320px+)
3. LocalStorage funktioniert
4. JSON Import/Export funktioniert
5. Keine Console Errors
6. Performance: Fast auf Mobile

---

## 🚫 Scope Creep Warnung

### Wenn du versucht bist, diese Features hinzuzufügen - STOP!

**"Nur schnell noch..."**
- ❌ Rich Text Editor (Fett, Kursiv, etc.)
- ❌ Bilder hochladen
- ❌ Stats System "als Vorbereitung"
- ❌ User Login
- ❌ Backend API
- ❌ Animations
- ❌ Sound Effects
- ❌ Multiplayer-Vorbereitung
- ❌ AI Integration

**Regel:**
Wenn es nicht in der "Definition of Done" steht → JETZT NICHT.

**Ausnahme:**
User fragt explizit danach.

---

## 🔄 Nach MVP - Was dann?

### Phase 2: RPG Basics
- Stats System (optional für Master)
- Simple Conditions (if stat > X)
- Effects (stat ändern, flags setzen)

### Phase 3: Advanced RPG
- Dice Rolls
- Inventory System
- Complex Conditions (AND/OR)

### Phase 4: Backend & Community
- Node.js Backend
- User Auth
- Cloud Storage
- Story Discovery

### Phase 5: Polish & Community
- Visual Tree Editor (optimiert)
- Story Analytics für Master
- Community Features
- Themes & Customization

**Wichtig:** Immer gegen **CORE_PRINCIPLES.md** prüfen!

---

## 📝 Session-Protokoll

### Session 1: [DATUM]
**Status:** Konzeption & Planung ✅
**Completed:**
- Vision, Tech Concept, Core Principles definiert
- README & MVP Roadmap erstellt

**Next:**
- Projekt Setup starten (Milestone 1)

---

## 🎯 Nächster Schritt

**→ Milestone 1: Projekt Setup**

Tasks:
1. `npm create vite@latest frontend -- --template vue`
2. Tailwind CSS installieren & konfigurieren
3. Pinia installieren
4. Basic Routing (Vue Router)
5. Layout Components (Header, Footer, Navigation)

**Bereit zu starten?**
