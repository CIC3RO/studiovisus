# Lokale Fonts einrichten — Anleitung

Die Website nutzt jetzt lokale Fonts statt Google Fonts CDN (DSGVO-konform).
Du musst nur einmal die Font-Dateien herunterladen und in den Ordner /fonts/ legen.

## Schritt 1: Fonts herunterladen

Gehe auf https://gwfh.mranftl.com/fonts (google-webfonts-helper).

### Fraunces
1. Suche: "Fraunces"
2. Charsets: "latin"
3. Styles: 300, regular, 500, 600, italic, 500italic
4. Format: "Modern Browsers" (nur WOFF2)
5. Download + entpacken → in /fonts/

### Inter Tight
1. Suche: "Inter Tight"
2. Charsets: "latin"
3. Styles: 300, regular, 500, 600
4. Format: WOFF2
5. Download + entpacken → in /fonts/

### Caveat
1. Suche: "Caveat"
2. Charsets: "latin"
3. Styles: regular, 500
4. Format: WOFF2
5. Download + entpacken → in /fonts/

## Schritt 2: Dateinamen prüfen

Die Dateien sollten so heißen:

  fraunces-v32-latin-300.woff2
  fraunces-v32-latin-regular.woff2
  fraunces-v32-latin-500.woff2
  fraunces-v32-latin-600.woff2
  fraunces-v32-latin-italic.woff2
  fraunces-v32-latin-500italic.woff2
  inter-tight-v7-latin-300.woff2
  inter-tight-v7-latin-regular.woff2
  inter-tight-v7-latin-500.woff2
  inter-tight-v7-latin-600.woff2
  caveat-v18-latin-regular.woff2
  caveat-v18-latin-500.woff2

HINWEIS: Die Versionsnummern (v32, v7, v18) können sich ändern.
Falls die Dateien andere Versionsnummern haben,
umbenennen ODER die Pfade in css/fonts.css anpassen.

## Schritt 3: Testen

In den Browser-DevTools (F12 → Network → Filter "font") prüfen,
dass alle Fonts von localhost kommen und keine Anfrage an
fonts.googleapis.com oder fonts.gstatic.com geht.
