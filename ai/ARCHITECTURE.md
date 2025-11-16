# Technische Architektur

**Version:** v0.2
**Last Updated:** 2025-11-16
**Maintainer:** Syntax ⚡

## Übersicht

Diese Datei dokumentiert technische Entscheidungen, Patterns und Code-Konventionen für die Interactive Fantasy RPG Literature Engine.

## Tech Stack

### Frontend (PWA)

```
Vue.js 3.5.13
├── Composition API (Standard)
├── TypeScript (geplant)
└── Vite 6.0.1 (Build Tool)

Styling:
├── Tailwind CSS 3.4.17
└── PostCSS (Autoprefixer)

State Management:
└── Pinia 2.3.0

Router:
└── Vue Router 4.5.0

Utilities:
└── VueUse (geplant für Mobile-Features)
```

### Warum dieser Stack?

**Vue.js 3:**
- Sanfte Lernkurve für neue Entwickler
- Composition API für komplexe State Logic
- Excellent Reactivity für Story-Datenmodell
- Native Mobile-Optimierung möglich

**Vite:**
- Extrem schnelle HMR (Hot Module Replacement)
- Optimiertes Production Build
- Native ESM Support
- Kleiner als Webpack

**Tailwind CSS:**
- Mobile-First by default
- Utility-First = schnelles Prototyping
- Excellent Dark Mode Support
- Kleine Production Builds (PurgeCSS)

**Pinia:**
- Offizieller Vuex-Nachfolger
- TypeScript Support
- Modular & Tree-Shakeable
- DevTools Integration

## Projekt-Architektur

### Folder Structure

```
frontend/
├── src/
│   ├── views/              # Page Components
│   │   ├── HomeView.vue          # Landing Page
│   │   ├── LibraryView.vue       # Story Library
│   │   ├── ReaderView.vue        # Story Reader
│   │   └── EditorView.vue        # Story Editor
│   │
│   ├── components/         # Reusable Components
│   │   ├── Navigation.vue        # Global Nav (persistent)
│   │   ├── StoryCard.vue         # Story Preview Card
│   │   ├── ChoiceButton.vue      # Interactive Choice
│   │   └── NodeEditor.vue        # Node Editor (geplant)
│   │
│   ├── stores/             # Pinia Stores
│   │   └── storyStore.js         # Story State Management
│   │
│   ├── router/             # Vue Router
│   │   └── index.js              # Routes Config
│   │
│   ├── assets/             # Static Assets
│   │   └── main.css              # Global Styles
│   │
│   ├── App.vue             # Root Component
│   └── main.js             # Entry Point
│
├── public/                 # Public Assets
│   ├── 404.html                  # SPA Redirect Handler
│   ├── demo-story.json           # Demo Story
│   └── page-dragon-story.json    # Demo Story
│
└── dist/                   # Build Output (für GitHub Pages)
```

### Komponenten-Struktur

**Principle:** Composition API über Options API

```vue
<script setup>
// Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryStore } from '@/stores/storyStore'

// Stores
const storyStore = useStoryStore()

// State
const currentNode = ref(null)

// Computed
const choices = computed(() => currentNode.value?.choices || [])

// Methods
function handleChoice(choiceId) {
  // ...
}

// Lifecycle
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Component-specific styles */
</style>
```

## Datenmodell

### Story JSON Schema

```json
{
  "title": "Story Title",
  "author": "Author Name",
  "version": "1.0",
  "startNode": "node-id-1",
  "nodes": {
    "node-id-1": {
      "id": "node-id-1",
      "title": "Node Title",
      "text": "Node text content...",
      "choices": [
        {
          "id": "choice-1",
          "text": "Choice text",
          "targetNode": "node-id-2",
          "conditions": []
        }
      ],
      "tags": ["intro", "combat"]
    }
  },
  "metadata": {
    "created": "2025-01-15T10:00:00Z",
    "modified": "2025-01-15T12:30:00Z",
    "genre": ["fantasy", "adventure"]
  }
}
```

### Progressive Enhancement

**MVP:** Nur Text + Choices
**Later:** Stats, Conditions, Inventory, etc.

Siehe [TECHNICAL_CONCEPT.md](../TECHNICAL_CONCEPT.md) für Details.

## State Management (Pinia)

### storyStore.js

```javascript
import { defineStore } from 'pinia'

export const useStoryStore = defineStore('story', {
  state: () => ({
    currentStory: null,
    currentNodeId: null,
    stories: [],
    progress: {}
  }),

  getters: {
    currentNode: (state) => {
      if (!state.currentStory || !state.currentNodeId) return null
      return state.currentStory.nodes[state.currentNodeId]
    }
  },

  actions: {
    async loadStory(storyId) {
      // Load from JSON or API
    },

    makeChoice(choiceId) {
      // Update currentNodeId
    },

    saveProgress() {
      // LocalStorage
    }
  }
})
```

**Storage:**
- **MVP:** LocalStorage (JSON serialization)
- **Later:** Backend API + Cloud Sync

## Routing

### Routes Config

```javascript
const routes = [
  { path: '/', component: HomeView },
  { path: '/library', component: LibraryView },
  { path: '/reader/:storyId', component: ReaderView },
  { path: '/editor/:storyId?', component: EditorView }
]
```

**SPA Routing:**
- GitHub Pages: 404.html-Redirect für Direct Access
- Hash Mode Alternative (falls Probleme)

## Styling-Konventionen

### Tailwind Patterns

**Mobile-First:**
```html
<!-- Base = Mobile, dann sm/md/lg -->
<div class="p-4 sm:p-6 md:p-8">
```

**Dark Mode:**
```html
<div class="bg-white dark:bg-gray-900">
```

**Typography:**
```html
<!-- Reader: Serif -->
<p class="font-serif text-lg leading-relaxed">

<!-- Editor/UI: Sans -->
<button class="font-sans font-medium">
```

### Custom CSS (minimal)

Nur für:
- Typography-Feintuning (Line Height, Letter Spacing)
- Complex Animations
- Things Tailwind can't do

**Regel:** Tailwind first, Custom CSS only when necessary.

## Performance

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimierungen

**Code Splitting:**
```javascript
// Lazy Load Views
const EditorView = () => import('@/views/EditorView.vue')
```

**Asset Optimization:**
- Vite Auto-Chunking
- Tree-Shaking (Pinia, VueUse)
- Image Optimization (später)

**LocalStorage Strategy:**
- Lazy Load Stories
- Cache Demo Stories
- Debounce Auto-Save

## Testing (geplant)

### Test Stack
```
Unit Tests:
└── Vitest (Vite's Test Runner)

E2E Tests:
└── Playwright (Multi-Device)

QA:
└── Edge's Manual Device Testing
```

### Test Priorities

1. Story State Management (Pinia Store)
2. Reader Navigation (Choice → Node)
3. Editor Save/Load (JSON)
4. Mobile Device Compatibility (Edge)

## Deployment

### GitHub Pages + GitHub Actions

**Workflow:**
1. Push zu `main` oder `claude/*` Branch
2. GitHub Actions: `npm run build`
3. Deploy zu `docs/` Branch
4. Live auf GitHub Pages

**Build Config:**
```javascript
// vite.config.js
export default {
  base: '/awfa1/',
  build: {
    outDir: 'dist'
  }
}
```

**SPA Routing Fix:**
- `public/404.html` redirectet zu `index.html` mit Path

## Code-Konventionen

### Naming

**Components:** PascalCase (`StoryCard.vue`)
**Files:** camelCase (`storyStore.js`)
**Constants:** UPPER_SNAKE (`MAX_NODE_LENGTH`)
**CSS Classes:** kebab-case (Tailwind)

### Kommentare

**Struktur nach Erik-Standard:**
```javascript
/**
 * SECTION: Story Navigation
 * Handles choice selection and node transitions
 */

// Load target node
const targetNode = story.nodes[choice.targetNode]

// Update state
currentNodeId.value = targetNode.id
```

**Regel:** Kommentare erklären WARUM, nicht WAS.

### Imports Order

```javascript
// 1. Vue Core
import { ref, computed } from 'vue'

// 2. Vue Router / Pinia
import { useRouter } from 'vue-router'
import { useStoryStore } from '@/stores/storyStore'

// 3. Components
import StoryCard from '@/components/StoryCard.vue'

// 4. Utils / Helpers
import { formatDate } from '@/utils/helpers'
```

## Bekannte Tech Decisions

### Warum kein TypeScript (yet)?

**Syntax:** "Wir starten mit JS für schnelles Prototyping. TypeScript kommt nach MVP wenn das Datenmodell stabil ist."

### Warum kein Backend im MVP?

**Dice:** "LocalStorage first! Backend kommt wenn wir User Auth & Cloud Sync brauchen. MVP = keep it simple!"

### Warum Vue statt React?

**Syntax:** "Reactivity Model ist perfekt für Story-Datenmodell. Composition API > React Hooks für unseren Use Case."

**Serif:** "Vue's Template Syntax ist writer-friendlier - falls wir später Visual Editor bauen."

## Security

### MVP (LocalStorage only)

- XSS Prevention: Vue's Template Escaping (default)
- JSON Validation: Schema Check beim Import
- No User Input in `v-html` (niemals!)

### Later (Backend)

- Authentication: JWT
- Authorization: Role-Based (Author, Reader)
- Input Sanitization: Server-Side
- CSRF Protection

## Accessibility (A11y)

### Standards

- WCAG 2.1 Level AA (Minimum)
- Semantic HTML
- ARIA Labels wo nötig
- Keyboard Navigation

### Reader-Specific

```html
<!-- Choices: Keyboard + Screen Reader friendly -->
<button
  @click="makeChoice(choice.id)"
  :aria-label="`Choice: ${choice.text}`"
  class="focus:ring-2 focus:ring-blue-500"
>
  {{ choice.text }}
</button>
```

### Dark Mode

- High Contrast (AMOLED Black)
- Respects `prefers-color-scheme`
- Toggle in Settings

## Monitoring (später)

- Error Tracking: Sentry (geplant)
- Analytics: Privacy-First (Plausible/Fathom)
- Performance: Lighthouse CI

## Offene Tech-Fragen

- [ ] TypeScript Migration Timeline?
- [ ] Backend Framework (Express vs. Fastify)?
- [ ] Database Schema (PostgreSQL Details)?
- [ ] Real-Time Features? (WebSockets für Multi-Author?)

**Dice:** "Nach MVP entscheiden! Jetzt fokussieren!"

---

**Maintainer Notes:**

**Syntax:** Diese Datei wächst mit dem Projekt. Jede wichtige Tech-Decision dokumentieren!

**Edge:** Performance-Metriken nach jedem Release messen und hier tracken.

**Serif:** Typography-Details und Mobile-Optimierungen hier dokumentieren.
