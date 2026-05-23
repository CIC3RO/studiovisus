# Studio Visus — Website Design-Entwurf

Warm & atelierhaftes Design für handgemalte Originalgemälde.

## Projektstruktur

```
studio-visus-website/
├── index.html              ← Startseite
├── werke.html              ← Werke-Übersicht / Galerie
├── kontakt.html            ← Kontakt- & Anfrageformular
├── werk-fenster.html       ← Werk-Detailseite
├── werk-himmelsnetz.html
├── werk-boot.html
├── werk-schwarz.html
├── werk-schneewiese.html
├── werk-sturm.html
├── werk-flamingo.html
├── werk-olive.html
├── werk-sommerkleid.html
├── generate-werke.js       ← Generator-Script für Werkseiten
├── css/
│   ├── style.css           ← Gemeinsame Styles (alle Seiten)
│   ├── index.css           ← Nur Index-Seite
│   └── werk-detail.css     ← Nur Werk-Detailseiten
├── js/
│   └── main.js             ← Gemeinsames JavaScript
└── images/
    └── werke/              ← Hier eigene Bilder ablegen
```

## Lokal testen

1. VS Code installieren (https://code.visualstudio.com)
2. Extension "Live Server" installieren
3. Diesen Ordner in VS Code öffnen
4. Rechtsklick auf `index.html` → "Open with Live Server"

## Werkseiten bearbeiten

Die 9 Werk-Detailseiten werden aus `generate-werke.js` generiert.
Dort liegen alle Werkdaten (Titel, Technik, Maße, Preis, Beschreibung,
Neuroästhetik-Text, SEO-Daten) als ein Array von Objekten.

So aktualisieren Sie Werke:
1. `generate-werke.js` in VS Code öffnen
2. Werkdaten im `werke`-Array anpassen (oder neues Werk hinzufügen)
3. Im Terminal ausführen: `node generate-werke.js`
4. Alle HTML-Dateien werden neu geschrieben

## SEO-Markup pro Werkseite

Jede generierte Werkseite enthält:
- JSON-LD: Product (Preis, Verfügbarkeit, Versand)
- JSON-LD: VisualArtwork (Technik, Maße, Künstler)
- JSON-LD: BreadcrumbList (Start > Werke > Werk)
- Open Graph Tags (og:type=product, og:image, og:price)
- Twitter Card (summary_large_image)
- Meta description (max 155 Zeichen)
- Canonical URL

## Farben anpassen

Alle Farben stehen in `css/style.css` ganz oben im `:root`-Block.
Eine Änderung dort wirkt sich auf alle Seiten aus.

## Formular aktivieren

Das Kontaktformular ist aktuell eine Demo. Für echten Versand
z. B. Formspree (https://formspree.io) einbinden:
`<form id="anfrageform" action="https://formspree.io/f/IHRE_ID" method="POST">`
