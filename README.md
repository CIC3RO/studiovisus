# Studio Visus — Website

Statische Website für Studio Visus (Jan-Niclas Bardenhagen), Künstleratelier in Hamburg-Lokstedt. Handgemalte Originalgemälde auf Basis von Neuroästhetik.

**Domain:** https://www.studiovisus.de


## Projektstruktur

```
StudioVisus/
│
├── index.html                    Startseite
├── werke.html                    Werke-Übersicht / Galerie mit Filterleiste
├── kontakt.html                  Kontakt- & Anfrageformular
├── ueber.html                    Über-Seite (Künstler, Atelier)
├── auftragsarbeit.html           Auftragsarbeit-Seite
│
├── werk-fenster.html             ┐
├── werk-himmelsnetz.html         │
├── werk-boot.html                │
├── werk-schwarz.html             │  10 Werk-Detailseiten
├── werk-schneewiese.html         │  (generiert von generate-werke.js)
├── werk-schneesturm.html         │
├── werk-sturm.html               │
├── werk-flamingo.html            │
├── werk-olive.html               │
├── werk-sommerkleid.html         ┘
│
├── blog.html                     Blog-Übersicht
├── blog-fluid-art-…html          ┐
├── blog-bilder-arztpraxis-…html  │  5 Blog-Artikel
├── blog-farbpsychologie-…html    │  (2 generiert, 3 manuell erstellt)
├── blog-healing-…html            │
├── blog-original-vs-…html        ┘
│
├── bilder-arztpraxis.html        ┐
├── kunst-hotel.html              │  4 Zielgruppen-Landingpages
├── kunst-therapiepraxis.html     │  (generiert von generate-landingpages.js)
├── kunst-buero.html              ┘
│
├── faq.html                      FAQ-Seite (generiert von generate-faq.js)
├── impressum.html                ┐
├── datenschutz.html              │  3 Rechtstexte
├── widerrufsbelehrung.html       ┘  (generiert von generate-legal.js)
│
├── css/
│   ├── fonts.css                 @font-face-Deklarationen (lokale Fonts)
│   ├── style.css                 Globale Styles (alle Seiten)
│   ├── index.css                 Nur Startseite
│   ├── blog.css                  Blog-Übersicht + Artikelseiten
│   ├── werk-detail.css           Werk-Detailseiten
│   ├── landingpage.css           Zielgruppen-Landingpages
│   ├── faq-page.css              FAQ
│   ├── about.css                 Über-Seite
│   ├── auftragsarbeit.css        Auftragsarbeit
│   ├── legal.css                 Impressum, Datenschutz, Widerruf
│   └── cookie-consent.css        Cookie-Banner
│
├── js/
│   ├── main.js                   Navigation, Filter, Formular, Scroll-FX
│   └── cookie-consent.js         Cookie-Consent-Logik
│
├── fonts/
│   ├── ANLEITUNG.md              Anleitung zum Font-Download
│   └── *.woff2                   Font-Dateien (müssen manuell hinzugefügt werden)
│
├── images/                       Alle Bilder (Werke, Blog-Teaser, etc.)
│
├── generate-werke.js             Generator: Werk-Detailseiten
├── generate-blog.js              Generator: Blog-Übersicht + Fluid-Art-Artikel
├── generate-landingpages.js      Generator: Zielgruppen-Landingpages
├── generate-faq.js               Generator: FAQ-Seite
├── generate-legal.js             Generator: Impressum, Datenschutz, Widerruf
│
├── sitemap.xml                   XML-Sitemap für Suchmaschinen
├── robots.txt                    Crawler-Regeln
└── llms.txt                      KI-Crawler-Datei (Anthropic, Perplexity etc.)
```


## Lokal testen

1. VS Code installieren (https://code.visualstudio.com)
2. Extension **Live Server** installieren
3. Diesen Ordner in VS Code öffnen
4. Rechtsklick auf `index.html` → **Open with Live Server**


## Fonts einrichten (einmalig)

Die Website nutzt lokale Fonts statt Google Fonts (DSGVO-konform). Die Font-Dateien sind nicht im Repo enthalten und müssen einmal heruntergeladen werden.

→ Siehe `fonts/ANLEITUNG.md` für die Schritt-für-Schritt-Anleitung.

Kurz: Auf https://gwfh.mranftl.com/fonts die Fonts **Fraunces**, **Inter Tight** und **Caveat** als WOFF2 herunterladen und in den Ordner `fonts/` legen. Falls sich die Versionsnummern in den Dateinamen geändert haben (z. B. `v33` statt `v32`), entweder die Dateien umbenennen oder die Pfade in `css/fonts.css` anpassen.


## Farben anpassen

Alle Farben stehen in `css/style.css` im `:root`-Block ganz oben. Eine Änderung dort wirkt sich auf alle Seiten aus.


---

## Die Generatoren

Fünf Node.js-Skripte erzeugen HTML-Seiten aus Daten-Arrays. Jedes Skript enthält alle Inhalte direkt im Code (kein CMS, keine Datenbank) und schreibt fertige HTML-Dateien ins Projektverzeichnis.

**Voraussetzung:** Node.js muss installiert sein (https://nodejs.org). Dann im Terminal:

```bash
node generate-werke.js
```

### Was alle Generatoren gemeinsam haben

- Jede generierte Seite enthält: vollständiges `<head>` mit Meta-Tags, JSON-LD, OG/Twitter, Canonical-URL
- Navigation, Footer, Cookie-Consent werden mitgeneriert
- Die Dateien werden direkt im Projektordner überschrieben
- **Wichtig:** Generatoren überschreiben nur die Dateien, die sie selbst erzeugen. Manuelle Änderungen an diesen Dateien gehen beim nächsten Generatorlauf verloren.

---

### generate-werke.js — Werk-Detailseiten

**Erzeugt:** `werk-fenster.html`, `werk-schwarz.html`, … (eine HTML-Datei pro Werk)

**Datenstruktur:** Oben im Skript steht das Array `werke`. Jedes Objekt beschreibt ein Werk:

```javascript
{
  slug: "fenster",              // Dateiname → werk-fenster.html
  title: "Fenster",             // Werkname
  technik: "Acryl auf Leinwand, mehrere Schichten, Impasto-Struktur",
  breite: 140,                  // in cm
  hoehe: 200,                   // in cm
  jahr: 2026,
  preis: null,                  // Zahl in Euro oder null
  preisLabel: "Auf Anfrage",    // Wird angezeigt wenn preis null ist
  status: "diptychon",          // "available" | "sold" | "diptychon"
  statusLabel: "Diptychon",     // Freitext für Anzeige
  kategorie: "Strukturmalerei", // z. B. "Fluid Art", "Ölmalerei"
  material: "Leinwand auf Keilrahmen, Acrylfarbe, Impasto",
  gewicht: "Diptychon, zweiteilig",
  rahmen: "Keilrahmen",
  signatur: "Rückseite, datiert",
  subtitle: "...",              // Kurzbeschreibung unter dem Titel
  beschreibung: [               // Array von Absätzen (HTML erlaubt)
    "Absatz 1 ...",
    "Absatz 2 ..."
  ],
  neuroTitel: "...",            // Überschrift für Neuroästhetik-Block
  neuroText: "...",             // Fließtext Neuroästhetik
  img: "images/werke/fenster/originalgemaelde-fenster-studiovisus.jpg",
  imgRatio: "3/4",             // CSS aspect-ratio für Bildcontainer
  related: ["schwarz", "schneesturm", "sturm"]  // Slugs verwandter Werke
}
```

**Neues Werk hinzufügen:**

1. `generate-werke.js` öffnen
2. Neues Objekt ins `werke`-Array einfügen (nach dem Muster oben)
3. Bilder in `images/werke/<slug>/` ablegen
4. Terminal: `node generate-werke.js`
5. Neue Datei `werk-<slug>.html` erscheint
6. **Manuell:** `werke.html` aktualisieren (Galerie-Karte mit data-Attributen hinzufügen)
7. **Manuell:** `kontakt.html` Dropdown-Option im Werkauswahl-Select ergänzen
8. **Manuell:** `sitemap.xml` URL hinzufügen

---

### generate-blog.js — Blog-Übersicht und Artikelseiten

**Erzeugt:** `blog.html` (Übersicht) + eine HTML-Datei pro Artikel (z. B. `blog-fluid-art-acryl-pouring-fraktale-muster.html`)

**Datenstruktur:** Zwei Arrays:

- `posts` → Veröffentlichte Artikel mit vollem HTML-Body
- `upcomingPosts` → Platzhalter-Karten (nur Titel, Excerpt, Gradient)

```javascript
// Veröffentlichter Artikel
{
  slug: "fluid-art-acryl-pouring-fraktale-muster",
  title: "Fluid Art und Acryl-Pouring: Warum ...",
  subtitle: "und weshalb das fuer Ihr Wohlbefinden relevant ist",
  category: "Maltechniken & Evidenz",
  date: "2026-05-04",
  dateFormatted: "4. Mai 2026",
  lesezeit: "12 Min. Lesezeit",
  excerpt: "Manchmal entsteht ...",
  heroGrad: "linear-gradient(135deg, #3a2f24 0%, ...)",
  body: `<p class="lead">...</p> <h2 id="...">...</h2> ...`,
  tocItems: [
    { id: "was-sind-fraktale", label: "Was sind fraktale Muster?" },
    ...
  ],
  sidebarCTA: { h4: "...", p: "...", href: "...", label: "..." },
  related: [
    { href: "...", grad: "...", h3: "...", excerpt: "..." },
    ...
  ]
}
```

**Neuen Blog-Artikel hinzufügen:**

Der Generator erzeugt aktuell nur die Blog-Übersicht und den Fluid-Art-Artikel. Die übrigen Artikel (Farbpsychologie, Arztpraxis, Healing Architecture, Original vs. Kunstdruck) wurden manuell als HTML erstellt.

Für einen neuen Artikel gibt es zwei Wege:

**Weg A — Über den Generator (empfohlen für technisch ähnliche Artikel):**

1. `generate-blog.js` öffnen
2. Neues Objekt ins `posts`-Array einfügen (mit `body` als HTML-String)
3. Platzhalter aus `upcomingPosts` entfernen falls vorhanden
4. Terminal: `node generate-blog.js`
5. Neue Dateien `blog.html` + `blog-<slug>.html` erscheinen
6. **Manuell:** `sitemap.xml` URL hinzufügen
7. **Manuell:** `llms.txt` Eintrag ergänzen

**Weg B — Manuell (wie bei den letzten 4 Artikeln):**

1. Bestehende Blog-Datei kopieren (z. B. `blog-healing-architecture-raumgestaltung-heilung.html`)
2. Alle Inhalte ersetzen: Title, Meta, JSON-LD, Breadcrumb, Body, TOC, Related
3. `blog.html` manuell anpassen: Karte im Grid ergänzen, Zähler hochsetzen
4. **Manuell:** `sitemap.xml`, `llms.txt` ergänzen

**Achtung:** Wenn du sowohl generierte als auch manuelle Blog-Artikel hast, überschreibt `node generate-blog.js` die `blog.html` und kennt die manuellen Artikel nicht. In dem Fall entweder alle Artikel in den Generator überführen oder die Blog-Übersicht nur noch manuell pflegen.

---

### generate-landingpages.js — Zielgruppen-Landingpages

**Erzeugt:** `bilder-arztpraxis.html`, `kunst-hotel.html`, `kunst-therapiepraxis.html`, `kunst-buero.html`

**Datenstruktur:** Array `pages` mit umfangreichen Objekten pro Seite:

```javascript
{
  slug: "bilder-arztpraxis",
  title: "Bilder für Arztpraxen & Kliniken",
  metaTitle: "Bilder für Arztpraxen — ...",
  metaDesc: "Handgemalte Originalgemälde ...",
  canonical: "https://www.studiovisus.de/bilder-arztpraxis",
  heroEyebrow: "Kunst für Arztpraxen & Kliniken",
  h1: "Bilder für die <em>Arztpraxis</em> ...",
  heroLead: "...",
  heroP1: "...",
  heroP2: "...",
  problemTitle: "...",
  problemP1: "...",
  problemP2: "...",
  points: [
    { ico: "α", title: "Cortisolsenkung", text: "..." },
    ...
  ],
  studies: [
    { year: "Ulrich, 1984", title: "...", text: "...", source: "..." },
    ...
  ],
  faq: [
    { q: "Welche Bildgrößen ...", a: "..." },
    ...
  ],
  relatedShort: "...",       // Text für Cross-Verlinkungsblock
  relatedLabel: "Bilder für Arztpraxen"
}
```

**Neue Landingpage hinzufügen:**

1. `generate-landingpages.js` öffnen
2. Neues Objekt ins `pages`-Array einfügen (alle Felder ausfüllen)
3. Terminal: `node generate-landingpages.js`
4. Neue Datei `<slug>.html` erscheint
5. **Manuell:** Navigation in allen Seiten ergänzen (falls Landingpage in Nav soll)
6. **Manuell:** `sitemap.xml` URL hinzufügen

---

### generate-faq.js — FAQ-Seite

**Erzeugt:** `faq.html`

**Datenstruktur:** Array `categories`, jede Kategorie hat FAQ-Items:

```javascript
{
  id: "grundlagen",
  num: "01",
  title: "Grundlagen und <em>Studio Visus</em>",
  navLabel: "Grundlagen",
  items: [
    {
      q: "Was ist Studio Visus?",
      a: `<p>Ein Atelier in Hamburg ...</p>`
    },
    ...
  ]
}
```

**Neue FAQ hinzufügen:**

1. `generate-faq.js` öffnen
2. Neues Item ins `items`-Array der passenden Kategorie einfügen (oder neue Kategorie anlegen)
3. Terminal: `node generate-faq.js`
4. `faq.html` wird überschrieben

---

### generate-legal.js — Rechtstexte

**Erzeugt:** `impressum.html`, `datenschutz.html`, `widerrufsbelehrung.html`

**Datenstruktur:** Array `pages` mit Slug, Titel, Meta-Daten und HTML-Body:

```javascript
{
  slug: "impressum",
  title: "Impressum",
  metaTitle: "Impressum — Studio Visus",
  metaDesc: "...",
  canonical: "https://www.studiovisus.de/impressum",
  body: `<h2>Angaben gemäß § 5 TMG</h2> ...`
}
```

**Rechtstext ändern:**

1. `generate-legal.js` öffnen
2. HTML im `body`-Feld anpassen
3. Terminal: `node generate-legal.js`
4. HTML-Datei wird überschrieben


---

## Seiten, die NICHT generiert werden

Diese Seiten werden manuell gepflegt und von keinem Generator überschrieben:

| Seite | Beschreibung |
|-------|-------------|
| `index.html` | Startseite |
| `werke.html` | Werke-Übersicht mit Filterleiste |
| `kontakt.html` | Kontaktformular |
| `ueber.html` | Über-Seite |
| `auftragsarbeit.html` | Auftragsarbeit |
| `blog-bilder-arztpraxis-…html` | Blog-Artikel (manuell) |
| `blog-farbpsychologie-…html` | Blog-Artikel (manuell) |
| `blog-healing-…html` | Blog-Artikel (manuell) |
| `blog-original-vs-…html` | Blog-Artikel (manuell) |


---

## SEO-Checkliste bei Änderungen

Bei jeder neuen Seite oder größeren Änderung:

- [ ] `sitemap.xml` — URL mit `<lastmod>` hinzufügen / aktualisieren
- [ ] `llms.txt` — Eintrag ergänzen (für KI-Crawler)
- [ ] JSON-LD prüfen — Jede Seite braucht mindestens BreadcrumbList
- [ ] OG-Tags prüfen — `og:title`, `og:description`, `og:image` (absolute URL)
- [ ] Canonical-URL setzen
- [ ] Bilder: `loading="lazy"` + `decoding="async"`, Hero-Bilder: `loading="eager"` + `fetchpriority="high"`


## Kontaktformular

Das Kontaktformular ist aktuell eine clientseitige Demo (zeigt Erfolgsmeldung, sendet aber nichts). Für echten Versand einen Dienst wie Formspree oder Basin einbinden:

```html
<form id="anfrageform" action="https://formspree.io/f/IHRE_ID" method="POST">
```

Im `js/main.js` ist die Stelle mit `// TODO: Backend` markiert.
