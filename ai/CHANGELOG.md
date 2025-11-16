# Changelog

Alle wichtigen Änderungen an diesem Projekt werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [v0.2] - 2025-11-16

### Added
- GitHub Pages Deployment-Konfiguration
- GitHub Actions Workflow für automatisches Deployment
- SPA-Routing Fix mit 404.html-Redirect
- Persistente globale Navigation
- Redirect für direkten Route-Access

### Changed
- Build-Output nach `dist/` statt `docs/`
- Base-URL auf `/awfa1/` gesetzt

### Fixed
- Navigation zurück zur Bibliothek korrigiert
- GitHub Pages SPA-Routing-Problem gelöst

---

## [v0.1] - 2025-11-15

### Added
- Initial MVP Setup
- Vite + Vue 3 Projekt aufgesetzt
- Tailwind CSS konfiguriert
- Pinia State Management implementiert
- Vue Router mit Basis-Views (Home, Library, Reader, Editor)
- Demo Stories (demo-story.json, page-dragon-story.json)
- StoryCard Component
- Basis Reader-Navigation

### Documentation
- CORE_PRINCIPLES.md erstellt
- VISION.md erstellt
- TECHNICAL_CONCEPT.md erstellt
- MVP_ROADMAP.md erstellt
- TEAM.md erstellt (Syntax, Serif, Dice, Page, Edge)
- README.md mit vollständiger Projekt-Übersicht

### Development Setup
- Vite Dev Server konfiguriert
- Tailwind PostCSS Pipeline
- Pinia DevTools Integration
- Hot Module Replacement (HMR)

---

## Legende

- **Added:** Neue Features
- **Changed:** Änderungen an bestehenden Features
- **Deprecated:** Features die bald entfernt werden
- **Removed:** Entfernte Features
- **Fixed:** Bug Fixes
- **Security:** Sicherheits-Fixes

---

**Note:** Siehe [manifest.json](manifest.json) für kurze Version-History.
