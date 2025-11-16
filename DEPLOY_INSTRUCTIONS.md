# 🚀 Deployment Instructions - GitHub Pages

## ✅ Live Demo

**URL:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)

Die App ist **live** und wird automatisch bei jedem Push deployed!

---

## 🔄 Automatisches Deployment (GitHub Actions)

### Wie es funktioniert:

1. **Push zu `main` Branch** (oder `claude/*` Branches)
2. **GitHub Actions startet automatisch** den Build-Workflow
3. **Build:** Vue App wird gebaut (`npm run build` in `frontend/`)
4. **Deploy:** `frontend/dist` wird zu GitHub Pages deployed
5. **Live in ~2-3 Minuten**

### Workflow-Datei:
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

---

## 📱 GitHub Pages Setup (Einmalig - bereits erledigt ✅)

Falls du es nochmal konfigurieren musst:

### **Schritt 1: Gehe zu Settings → Pages**
```
https://github.com/AndersenWebworks/awfa1/settings/pages
```

### **Schritt 2: Source einstellen**
- **Source:** Wähle **"GitHub Actions"** (NICHT "Deploy from a branch")
- **Save**

### **FERTIG!** 🎉

---

## 🛠️ Lokales Development

### Setup:
```bash
cd frontend
npm install
npm run dev
```

Öffne: `http://localhost:5173/`

### Production Build testen:
```bash
cd frontend
npm run build
npm run preview
```

---

## 🚀 Manueller Deploy

Falls du den Workflow manuell triggern willst:

1. Gehe zu: `https://github.com/AndersenWebworks/awfa1/actions`
2. Workflow: **"Deploy to GitHub Pages"**
3. **"Run workflow"** → Branch wählen → **"Run workflow"**

---

## 📦 Was wird deployed:

- **Source:** `frontend/dist/` (gebaut von Vite)
- **Base Path:** `/awfa1/` (konfiguriert in `vite.config.js`)
- **Assets:** Mit Cache-Busting Hashes
- **Size:** ~49 kB gzipped (sehr performant!)

---

## 🌐 Live URL

**Production:** [https://andersenwebworks.github.io/awfa1/](https://andersenwebworks.github.io/awfa1/)

**Mobil optimiert** - teste auf dem Handy! 📱

---

## 🎮 WAS KANNST DU DANN TUN:

### **Als Spieler:**
1. Öffne die URL aufm Handy
2. Klick auf "📖 Play a Story (Reader)"
3. Die Demo-Story ist schon drin - einfach importieren!
4. **SPIELEN!**

### **Als Master:**
1. Öffne die URL aufm Handy
2. Klick auf "✏️ Create a Story (Editor)"
3. Erstelle deine Story
4. Exportiere als JSON
5. **TEILEN!**

---

## 🎯 Alternative: Vercel (noch einfacher!)

Wenn GitHub Pages zu kompliziert ist:

1. Gehe zu **https://vercel.com**
2. **"Sign up with GitHub"**
3. **Import Project** → Wähle dieses Repo
4. **Deploy!**

Vercel gibt dir automatisch eine URL wie:
```
https://awfa1.vercel.app
```

---

## 💡 Team Empfehlung:

**Dice:** "GitHub Pages ist kostenlos und bleibt für immer!"
**Syntax:** "Vercel ist schneller und einfacher!"
**Serif:** "Beide sind mobile-optimiert! 📱"
**Page:** "ICH WILL SPIELEN! Egal welches!" 📖

---

## 🆘 Brauchst du Hilfe?

Sag dem Team Bescheid! Wir helfen dir!

**Das MVP ist FERTIG - es braucht nur noch 3 Klicks! 🚀**
