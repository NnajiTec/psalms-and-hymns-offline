# Psalms & Hymns + Church Resource Library (Offline PWA & Android APK)

A complete, production-ready Progressive Web App (PWA) and native Android application combining a 500-hymn soft-copy hymnal with an offline digital resource library, daily morning devotions, and an independent bookstore unlock workflow inspired by `thechurchesofGod.info`.

---

## 🏛️ Comprehensive Architecture

```
hymn-app/
├── android/                         # Full native Android Studio & Gradle project
│   ├── app/build/outputs/apk/debug/ # Generated debug APK output
│   └── local.properties            # Configured Android SDK location
├── public/
│   ├── favicon.svg                  # Gold sacred emblem
│   ├── hymns.json                   # 500 Hymns JSON database
│   ├── manifest.webmanifest         # PWA Web App Manifest
│   └── sw.js                        # Cache-first Service Worker
├── src/
│   ├── components/
│   │   ├── BookViewer.tsx           # High-end typography reader for literature & articles
│   │   ├── BookstoreView.tsx        # Side-loaded APK bookstore & direct voucher unlock flow
│   │   ├── BottomNav.tsx            # 5-tab main bar (Hymns, Library, Devotions, Bookstore, Saved)
│   │   ├── BrowseView.tsx           # Hymn category browse
│   │   ├── DevotionsView.tsx        # Daily morning devotions feed with linked hymn trigger
│   │   ├── FavoritesView.tsx        # Saved bookmarks and history
│   │   ├── Header.tsx               # Dynamic header with network status & dial pad
│   │   ├── HymnViewer.tsx           # Hymn reader with pitch drone, A-/A+ font controls
│   │   ├── IndexView.tsx            # A-Z First-line index
│   │   ├── LibraryView.tsx          # Free books, Bible studies, Magazines, Offline manager
│   │   ├── NetworkStatusBanner.tsx  # Live online/offline status bar
│   │   ├── NumberPadModal.tsx       # O(1) numeric dialer (# Jump)
│   │   ├── SearchView.tsx           # Fuzzy lyrics and snippet search
│   │   └── SettingsModal.tsx        # Typography, themes (Sepia, Light, Dark, OLED), wake lock
│   ├── data/
│   │   ├── hymns.json               # Full 500 hymns with metadata
│   │   └── libraryData.ts           # Books, study series, magazine issues, devotions catalog
│   ├── services/
│   │   ├── db.ts                    # IndexedDB offline storage using idb
│   │   ├── network.ts               # Capacitor Network & PWA connection status
│   │   ├── search.ts                # Dual-index search engine
│   │   └── storage.ts               # Local preferences, history, bookmarks
│   ├── types/
│   │   ├── hymn.ts                  # Hymn & settings types
│   │   └── library.ts               # Books, studies, magazines, devotions types
│   ├── App.tsx                      # Root application coordinator
│   ├── index.css                    # Design system, themes & animations
│   └── main.tsx                     # Entrypoint & PWA worker register
├── package.json
└── vite.config.ts
```

---

## 📖 Module Breakdown

### Module 1: The Hymn Book System
- **Dual Lookup Engine**:
  - **Numeric Dial Pad (`# Jump`)**: Instant 1–500 numeric keypad with real-time title preview.
  - **Fuzzy Token Matching**: Sub-millisecond filtering matching numbers, titles, meters, and lyrics lines with snippet highlights.
- **Devotional Typography**:
  - 4 Reading Themes: **Devotional Sepia** (warm reading tone), **Day Clean**, **Night Slate**, and **OLED Black**.
  - Font scaling (`A-` / `A+`) in the floating toolbar, Serif/Sans-serif font stack toggle, line spacing adjustment.
  - **Concert Pitch Drone (A4 / 440 Hz)**: Built-in Web Audio harmonic pitch generator for song leaders.
  - **Screen Wake Lock API**: Keeps device display active while viewing lyrics.

### Module 2: The Resource Library (Scripture & Doctrinal Studies)
- **Free Books**: Doctrinal publications (e.g. *The Fellowship of Scriptural Assemblies*, *The Pattern of Sound Words*, *The House of God*, *The Breaking of the Bread*).
- **Bible Studies**: Multi-part systematic study series with lessons, scripture references, aims, expositions, and discussion questions.
- **Periodicals & Articles**: Issues of *Needed Truth* and *Search and See* with volume/issue numbers and article readers.
- **Daily Morning Devotions**: Pre-cached daily feed ("Morning Manna") with date selector, scripture portion, memory verse, devotional reflection, morning prayer, and a direct **"Sing Hymn #XX"** button.
- **Offline Download Manager**: Saves books and periodicals to local device IndexedDB storage for 100% offline access. Includes a "Downloaded" filter tab and storage cleanup.

### Module 3: Digital Bookstore & Direct Downloads
- **Side-Loaded APK Unlock Workflow**:
  - Independent direct verification (no Google Play Billing dependency).
  - Sample / preview chapter reading mode.
  - **Voucher / License Code Unlock**: Input license keys (e.g. `CHURCH2026`, `TRUTH100`, `FELLOWSHIP`, or custom assembly codes) to unlock complete volumes.
  - Automatic download and persistence into local IndexedDB storage.

### Module 4: APK Readiness (Capacitor Native Android)
- Configured with `@capacitor/core`, `@capacitor/android`, and `@capacitor/network`.
- Generates a standalone, fully offline Android application.

---

## 🚀 Building & Running

### 1. Web / PWA Local Development
```bash
cd "e:\Hymn treatment\hymn-app"
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 2. Building the Native Android APK
```bash
# In hymn-app folder
npm run build
npx cap sync android

# Compile APK
cd android
.\gradlew assembleDebug
```
The compiled APK will be at:
`E:\Hymn treatment\Psalms_and_Hymns_Offline.apk`
