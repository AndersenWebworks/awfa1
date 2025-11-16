# AI / Dokumentation & Versionierung

Zentrale Stelle für Projekt-Management, Versionierung und KI-Kontext.

## Struktur

```
/ai/
├── README.md              # Diese Datei
├── manifest.json          # SSOT für Versionierung
├── CONTEXT.md             # Projekt-Kontext für KI-Sessions
├── ARCHITECTURE.md        # Technische Architektur-Dokumentation
└── CHANGELOG.md           # Ausführliches Changelog
```

## Manifest-Schema

Die Datei [manifest.json](manifest.json) ist die Single Source of Truth für Versionierung:

```json
{
  "site": "andersenwebworks.github.io/awfa1",
  "version": "vX.Y",
  "build": Y,
  "changelog": [
    "vX.Y <feat|fix|merge|copy|style>: Beschreibung"
  ]
}
```

### Versionsregeln

- **Format:** `vMAJOR.MINOR` (ohne Patch)
- **Build:** Inkrementell = Zahl aus Version ohne "v"
- **Changelog:** Einzeiler, neu oben anhängen
- **Typen:**
  - `feat` → MINOR +1 (neue Features)
  - `fix` → MINOR +1 (Bugfixes)
  - `merge` → MINOR +1 (Merges)
  - `copy` → MINOR +1 (Content-Änderungen)
  - `style` → MINOR +1 (Styling)

### Asset-Versionierung

Query-Parameter in HTML-Templates:
```html
<link rel="stylesheet" href="/app.css?v=vX.Y">
<script src="/app.js?v=vX.Y"></script>
```

### Footer-Versionierung

In allen Views muss die Version im Footer sichtbar sein:
```html
<footer>
  <div class="version">v1.12</div>
</footer>
```

## Kontext-Dateien

### CONTEXT.md
Aktueller Projekt-Status, offene Tasks, bekannte Issues - für schnellen KI-Einstieg.

### ARCHITECTURE.md
Technische Entscheidungen, Patterns, Code-Konventionen - zentrale Tech-Dokumentation.

### CHANGELOG.md
Ausführliches Changelog mit Details zu jeder Version - mehr als manifest.json.

## Verwendung

### Neue Version erstellen

1. Änderungen durchführen
2. Type festlegen (feat/fix/merge/copy/style)
3. Manifest aktualisieren:
   - Version: MINOR +1
   - Build: neue Build-Nummer
   - Changelog: Eintrag oben hinzufügen
4. Assets mit neuer Version-Query versehen
5. Footer-Version aktualisieren
6. Commit & Push

### KI-Session starten

1. Lies [CONTEXT.md](CONTEXT.md) für aktuellen Status
2. Prüfe [manifest.json](manifest.json) für Version
3. Bei Tech-Fragen: [ARCHITECTURE.md](ARCHITECTURE.md)
4. Bei History: [CHANGELOG.md](CHANGELOG.md)

## Integration mit Claude Code

Das Manifest wird von Claude Code automatisch gelesen und für Versionierungs-Prompts verwendet.

Siehe [~/.claude/CLAUDE.md](~/.claude/CLAUDE.md) für globale Versionierungs-Regeln.
