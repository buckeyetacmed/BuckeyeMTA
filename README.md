# TEMS Medical Threat Assessment — Buckeye TacMed

Tactical Emergency Medical Support pre-planning checklist.  
Deployable as a Progressive Web App via GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main form — the entire app |
| `manifest.json` | PWA install metadata |
| `sw.js` | Service worker — enables offline use |
| `icon-192.png` | App icon (Android / PWA) |
| `icon-512.png` | App icon (splash screen) |

## Deploy to GitHub Pages

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** — name it `mta` (or anything you like)
3. Set visibility to **Public**
4. Click **Create repository**
5. Click **uploading an existing file** and drag all 5 files in
6. Commit with message: `Initial deploy`
7. Go to **Settings → Pages**
8. Under *Source*, select **Deploy from a branch → main → / (root)**
9. Click **Save**
10. Wait ~60 seconds — your URL will appear:  
    `https://YOUR-USERNAME.github.io/mta/`

## Updating the form

1. Open your repository on GitHub
2. Click `index.html` → pencil icon to edit, or drag a new file to replace it
3. Commit — the live site updates automatically within seconds
4. Users get the new version next time they open the app (service worker updates in background)

## How team members install it

**iPhone (Safari)**  
Open the URL → Share button → Add to Home Screen → Add

**Android (Chrome)**  
Open the URL → Chrome will show an "Install app" banner automatically  
Or: three-dot menu → Add to Home Screen

## Features
- Address autocomplete (OpenStreetMap — no API key needed)
- Auto weather fetch by scene coordinates + operation date/time (Open-Meteo API)
- NOAA heat index calculator with risk guidance
- Ohio-restricted hospital search with GPS auto-fill
- LZ coordinates with map view
- Print to PDF → share via iMessage, GroupMe, AirDrop, email
- Works offline after first load (form only — weather/address need connection)
