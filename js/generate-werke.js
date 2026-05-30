#!/usr/bin/env node
/**
 * Studio Visus — Werk-Detailseiten-Generator
 * Erzeugt eine HTML-Datei pro Werk mit:
 * - JSON-LD (Product + BreadcrumbList + LocalBusiness)
 * - Open Graph & Twitter Cards
 * - Meta description
 * - Vollständiges Seiten-Template
 */

/** diesen Abschnitt einfügen für ein neues Werk
 * ,{
    slug: "werkname",           // URL: werk-werkname.html
    linie: "evidenz",            // "evidenz" oder "frei"
    warumBeruhigt: "",            // bei heilraum: warum dieses Werk beruhigt (1-2 Sätze, mit Quelle)
    title: "Werkname",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 100,                // in cm
    hoehe: 100,
    jahr: 2026,
    preis: null,                // null = "Auf Anfrage", oder z.B. 1800
    preisLabel: "Auf Anfrage",
    status: null,               // null | "sold" | "diptychon"
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe",
    gewicht: null,
    rahmen: "Keilrahmen, seitlich durchgemalt",
    signatur: "Rückseite, datiert",
    subtitle: "Kurze Beschreibung für Meta-Tags und Schema.",
    beschreibung: [
      "Erster Absatz.",
      "Zweiter Absatz.",
      "Geeignet für..."
    ],
    neuroTitel: "Wirkprinzip",
    neuroText: "Warum dieses Werk beruhigt oder aktiviert.",
    img: "images/werke/mein-neues-werk.jpg",
    imgRatio: "1/1",             // Seitenverhältnis: "1/1", "3/4", "4/3" usw.
    related: ["fenster", "schwarz", "boot"]  // Slugs anderer Werke
  }
 * 
 */

const fs = require('fs');
const path = require('path');

// ===== WERKDATEN — korrekte Werte von studiovisus.de =====
const werke = [
  {
    slug: "fenster",
    linie: "evidenz",
    warumBeruhigt: "Die gedämpften Farben (Olivgrün auf cremefarbenem Grund) und der niedrige Kontrast entlasten das visuelle System (Elliot & Maier 2014). Die organische Impasto-Struktur entspricht der fraktalen Mittelkomplexität, die nach Taylor (2006) Stressreaktionen messbar senkt. Die ruhige Komposition ohne narrative Spannung erlaubt Kaplans »sanfte Faszination« — der Blick findet Halt, ohne gefordert zu werden.",
    title: "Fenster",
    technik: "Acryl auf Leinwand, mehrere Schichten, Impasto-Struktur",
    breite: 140,
    hoehe: 200,
    jahr: 2026,
    preis: 2040,
    status: "diptychon",
    statusLabel: "Diptychon",
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, Impasto",
    gewicht: "Diptychon, zweiteilig",
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "Diptychon, 140 × 200 cm Gesamtmaß, 2025. Acryl mit Impasto-Struktur, mehrere Schichten, plastische Tiefe. Originalgemälde, kein Druck. Hamburg.",
    beschreibung: [
      "Das Werk besteht aus zwei Leinwänden, jede 70 × 100 cm groß. Zusammengehängt ergibt sich eine Gesamtfläche von 140 × 200 cm.",
      "Acryl in mehreren Schichten, mit sichtbarer Impasto-Struktur. Die Oberfläche entwickelt eine haptische Tiefe, die sich je nach Lichteinfall verändert.",
      "Konzipiert, um gezielt mit der menschlichen Wahrnehmung zu interagieren. Das Werk eignet sich nicht nur als ästhetischer Fokuspunkt, sondern fungiert als Ruhepol im Raum."
    ],
    neuroTitel: "Mehrere Wirkprinzipien greifen ineinander",
    neuroText: "Fraktale Fluenz und Biophilie-Effekt, visuelle Sedierung, biomorphe Tessellation, Curvature mit emotionaler Sicherheit, haptische Verankerung. Mehrere neuroästhetische Prinzipien greifen in diesem Werk gleichzeitig.",
    img: "images/werke/fenster/originalgemaelde-fesnter-studiovisus.webp",
    imgDetail: "images/werke/fenster/originalgemaelde-nahaufnahme-schuppen-struktur-studiovisus.webp",
    imgRaum: "images/index/originalgemaelde-fenster-acryl-struktur-arztpraxis-studiovisus.webp",
    imgRatio: "3/4",
    related: ["schwarz", "schneesturm", "sturm"]
  },
  {
    slug: "schneesturm",
    linie: "evidenz",
    warumBeruhigt: "Fast monochrom in Weiß und feinem Grau, sehr niedriger Kontrast, weiche Horizontlinie. Die Reduktion entspricht Kaplans Konzept der restorativen Umgebung: minimale kognitive Last, maximaler Erholungsraum. Die feinen Strukturspuren halten das Auge so leicht, dass es weder sucht noch flieht. Ein Werk, das den Raum öffnet, statt ihn zu füllen.",
    title: "Schneesturm",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 100,
    hoehe: 100,
    jahr: 2024,
    preis: 1200,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "100 × 100 cm, 2024. Weiß auf Weiß mit feinen Schwarz- und Goldakzenten. Ruhige, tiefe Wirkung. Mehrere Acryl-Schichten auf Leinwand. Unikat.",
    beschreibung: [
      "Ein weißes Bild, das bei flüchtigem Betrachten leer erscheint. Bleibt der Blick aber länger, beginnen die leichten Schattierungen zu sprechen. Sie sind überall und nirgends gleichzeitig.",
      "Kein Muster, das sich eindeutig benennen lässt. Kein Motiv, das sich festhalten lässt. Jeder Betrachter sieht etwas anderes: manche Wolken, manche Schnee, manche Gesichter, manche nichts als ein Gefühl.",
      "Besonders geeignet für Räume, in denen Stille, Kontemplation und Offenheit atmosphärisch erwünscht sind. Therapieräume, Meditationsräume, Schlafzimmer und ruhige Wohnräume."
    ],
    neuroTitel: "Visuelle Ambiguität als aktiver Ruhezustand",
    neuroText: "Ein Bild, das keine eindeutige Interpretation erzwingt, lässt das Gehirn in einem Zustand ruhiger Offenheit. Es sucht, ohne zu finden, und findet, ohne zu suchen. Dieser Zustand ist dem meditativen Erleben verwandt. Hinzu kommt die Lichtreflexion: Ein weißes, strukturreiches Werk reflektiert Licht so, dass der Raum heller und größer wirkt.",
    img: "images/werke/schneesturm/originalgemaelde-schneesturm-studiovisus.webp",
    imgRaum: "images/werke/schneesturm/originalgemaelde-schneesturm-im-raum-stuiovisus.webp",
    imgRatio: "1/1",
    related: ["schwarz", "fenster", "flamingo"]
  },
  {
    slug: "boot",
    linie: "frei",
    title: "Boot",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 70,
    hoehe: 100,
    jahr: 2024,
    preis: 1020,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, plastische Schuppenstruktur",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "Acryl auf Leinwand, 70 × 100 cm, 2024. Schuppenstruktur in tiefen Blautönen, dazu Wellenlinien mit japanischem Anklang. Unikat aus dem Atelier in Hamburg.",
    beschreibung: [
      "Die Leinwand ist mit hunderten von handgearbeiteten Schuppen überzogen, die das Licht brechen und dem Werk eine dreidimensionale Oberfläche geben. Die Grundstimmung ist Wasser: verschiedene Blautöne, von hellem Aquamarin bis ins tiefe Nachtblau.",
      "Im Zentrum ein gegossenes Boot aus Orange, Neon und Grün. Leuchtend und direkt, ein Farbakzent, der den Blick zieht und im Bild hält. Um das Boot herum verlaufen Wellenlinien, die an die japanische Maltradition erinnern.",
      "Besonders geeignet für Wartezimmer, Praxen, Empfangsbereiche und Wohnräume, in denen Wasser und Weite als atmosphärische Qualitäten gewünscht sind."
    ],
    neuroTitel: "Fraktale Fluenz und Wasserassoziation",
    neuroText: "Die Schuppenstruktur erzeugt ein sich wiederholendes natürliches Muster, das das Gehirn ohne kognitive Anstrengung verarbeitet. Blautöne aktivieren evolutionär verankerte Assoziationen mit Wasser und Weite, zwei der stärksten Sicherheitssignale in der menschlichen Wahrnehmung. Das leuchtende Boot im Zentrum übernimmt die Funktion eines visuellen Ankers.",
    img: "images/werke/boot/originalgemaelde-boot-studiovisus.webp",
    imgRaum: "images/werke/boot/originalgemaelde-boot-im-raum-studiovisus.webp",
    imgRatio: "5/7",
    related: ["schneewiese", "flamingo", "sommerkleid"]
  },
  {
    slug: "schwarz",
    linie: "frei",
    title: "Schwarz",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 100,
    hoehe: 100,
    jahr: 2024,
    preis: 1200,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, Sandstruktur, Goldakzent",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "100 × 100 cm, 2024. Dunkle Sandstruktur, goldene Linienführung. In der Bewegung erinnert das Werk an einen Zengarten. Acryl auf Leinwand, Unikat.",
    beschreibung: [
      "Auf den ersten Blick zeigt sich eine raue, dunkle Oberfläche aus grober Struktur und Sand. Eine goldene Ecke schneidet hinein, wie ein stiller Lichteinfall in einen dunklen Raum.",
      "Bei längerer Betrachtung taucht ein Halbkreis auf, eingeritzt in die Struktur wie eine Linie im Zengarten. Er ist da, aber er zeigt sich nicht sofort. Diese Spannung zwischen Sehen und Spüren ist das Herzstück des Werks.",
      "Besonders geeignet für Räume, in denen Tiefe, Kontrast und ein leiser intellektueller Reiz erwünscht sind. Büros, Bibliotheken, Empfangsbereiche mit Anspruch."
    ],
    neuroTitel: "Haptische Verankerung und visuelles Geheimnis",
    neuroText: "Die grobe Sandstruktur ist so präsent, dass sie fast physisch erfahren wird. Der verborgene Halbkreis spricht ein tiefes Bedürfnis des Gehirns an: das Entdecken von Muster und Bedeutung. Gold auf Schwarz ist einer der wirkungsvollsten Kontraste in der visuellen Wahrnehmung. Der eingeritzte Halbkreis greift das ästhetische Prinzip japanischer Zengärten auf: maximale Wirkung durch minimale Mittel.",
    img: "images/werke/schwarz/originalgemaelde-schwarz-studiovisus.webp",
    imgRaum: "images/werke/schwarz/originalgemaelde-schwarz-mit-gold-in-einem-raum.webp",
    imgRatio: "1/1",
    related: ["fenster", "schneesturm", "sturm"]
  },
  {
    slug: "schneewiese",
    linie: "evidenz",
    warumBeruhigt: "Der cremefarbene Grund mit den feinen, wiederkehrenden Spurmustern lädt zur sanften Mustererkennung ein — was Reber et al. (2004) als Verarbeitungsflüssigkeit beschreiben: leicht zu verarbeitende Bilder werden als angenehm erlebt. Der dunkle Punkt im Zentrum ist kein Störelement, sondern der Anker, an dem der Blick zur Ruhe kommt.",
    title: "Schneewiese",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 90,
    hoehe: 90,
    jahr: 2024,
    preis: 1080,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, Strukturpaste",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "90 × 90 cm, 2024. Strukturreiche, helle Oberfläche, in die Fußspuren und ein Hauch Farbkreis eingelassen sind. Acryl auf Leinwand, mehrere Schichten.",
    beschreibung: [
      "Die strukturreiche Oberfläche trägt Fußabdrücke, echte, handgemachte Abdrücke, die sich um den Kern des Bildes herum anordnen. Sie erzählen von Bewegung und Wegen, die im Bild eingefroren sind.",
      "Im Zentrum liegt ein gegossener Farbkreis aus Grau und Neon-Orange. Eine Intensität, die mit der strukturierten, zurückhaltenden Oberfläche um sie herum in spannungsvoller Beziehung steht. Surreal und faszinierend zugleich.",
      "Ein Werk für Räume, in denen Kunst eine Entdeckungsreise sein soll. Empfangsbereiche, Wartezimmer und Wohnräume, in denen Besucher und Bewohner immer wieder neu hinschauen sollen."
    ],
    neuroTitel: "Narrative Struktur und visuelle Führung",
    neuroText: "Die Fußabdrücke suggerieren eine Geschichte, ohne sie zu erzählen. Das Gehirn ergänzt aktiv und erlebt dieses Ergänzen als befriedigend. Gleichzeitig übernehmen die Abdrücke die Funktion einer natürlichen Blickführung: Das Auge folgt ihnen und landet im Zentrum. Die Kombination aus Bekanntem (Fußabdrücke) und Unerwartetem (leuchtender Farbkreis) erzeugt eine anziehende kognitive Spannung.",
    img: "images/werke/schneewiese/originalgemaelde-schneewiese-studiovisus.webp",
    imgRaum: "images/werke/schneewiese/originalgemaelde-schneewiese-im-raum-studiovisus.webp",
    imgRatio: "1/1",
    related: ["boot", "sommerkleid", "flamingo"]
  },
  {
    slug: "sturm",
    linie: "frei",
    title: "Sturm",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 100,
    hoehe: 70,
    jahr: 2024,
    preis: 1020,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, Goldakzente",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "100 × 70 cm, 2024. Leuchtendes Dunkelrot, durchsetzt mit goldenen Spritzern. Dichte Bewegung, viel Bildraum. Acryl auf Leinwand, Unikat.",
    beschreibung: [
      "Das gesamte Format ist in einem tiefen, satten Dunkelrot gehalten, das nicht schwer wirkt, sondern leuchtet. Als würde Licht von innen durch das Rot hindurchscheinen. Das Ergebnis mehrerer übereinandergelegter Schichten.",
      "Durch das Bild ziehen goldene Spritzer, zufällig und dennoch präzise, wie Funken, die ein Sturm durch die Luft treibt. Die weißen Linien deuten Bewegung an und versetzen die Komposition in eine ruhige, aber spürbare Dynamik.",
      "Für Räume, die Charakter zeigen sollen. Empfangsbereiche, Besprechungsräume, Wohnräume, in denen Kunst eine Haltung zeigen soll."
    ],
    neuroTitel: "Emotionale Aktivierung durch Farbe",
    neuroText: "Dunkles, leuchtendes Rot aktiviert das autonome Nervensystem stärker als beruhigende Blau- oder Grüntöne. Für Räume, in denen Energie, Entscheidungskraft und Fokus gefragt sind, ist diese Aktivierung eine bewusst eingesetzte Qualität. Die goldenen Spritzer und weißen Linien erzeugen eine Richtungswahrnehmung im Bild und führen das Auge durch eine kontrollierte Bewegung.",
    img: "images/werke/sturm/originalgemaelde-sturm-studiovisus.webp",
    imgRaum: "images/werke/sturm/originalgemaelde-sturm-im-raum-studiovisus.webp",
    imgRatio: "10/7",
    related: ["fenster", "schwarz", "schneesturm"]
  },
  {
    slug: "flamingo",
    linie: "evidenz",
    warumBeruhigt: "Der gedämpfte salbeifarbene Grund mit den feinen, regelmäßigen Pinselstrukturen ist klassische fraktale Mittelkomplexität (Taylor 2006) — die Form, die das Auge mühelos hält. Die Pouring-Übergänge in der Figur sind weich und fließend, keine harten Kanten, keine narrative Spannung. Die kühlen Töne im Vogel — Mint, sanftes Pink, Lavendel — sind nicht die aktivierenden warmen Sättigungen, die Elliot & Maier kritisch sehen. Figurativ, aber abstrakt und interpretationsfrei.",
    title: "Flamingo",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 100,
    hoehe: 100,
    jahr: 2024,
    preis: 1200,
    status: null,
    statusLabel: null,
    kategorie: "Strukturmalerei",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, plastische Schuppenstruktur",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "100 × 100 cm, 2024. Aus der Gusstechnik entstandener Flamingo, abstrakt gehalten, mit fein gemalter Schuppenstruktur. Acryl auf Leinwand, Unikat.",
    beschreibung: [
      "Auf einem Hintergrund aus Olive und Weiß entfaltet sich ein abstrakter Flamingo, der nicht gemalt, sondern gegossen wurde. Aus verschiedenen Farben zusammengeflossen, erkennbar in seiner Form und doch abstrakt in seiner Ausführung.",
      "Die gesamte Leinwand ist mit hunderten von handgearbeiteten Schuppen überzogen. Das Licht bricht sich in jeder einzelnen davon und verleiht dem Werk eine plastische Oberfläche, die je nach Lichtsituation anders aussieht.",
      "Ein Werk, das in Wohnräumen, Empfangsbereichen und Therapiepraxen gleichermaßen funktioniert. Überall dort, wo Wärme und eine ruhige, elegante Bildsprache gefragt sind."
    ],
    neuroTitel: "Biophile Farbwelt und fraktale Fluenz",
    neuroText: "Der olive-weiße Hintergrund greift eine naturnahe Farbwelt auf, die das Gehirn mit Vegetation und organischen Umgebungen assoziiert. Die Schuppenstruktur erzeugt ein sich wiederholendes natürliches Muster, das das Gehirn leicht und entspannt verarbeitet. Der abstrakte Charakter des Flamingos lässt Raum für individuelle Wahrnehmung, ohne das Gehirn zu fordern.",
    img: "images/werke/flamingo/originalgemaelde-flamingo-studiovisus.webp",
    imgRaum: "images/werke/flamingo/originalgemaelde-flamingo-im-raum-studiovisus.webp",
    imgRatio: "1/1",
    related: ["boot", "schneewiese", "sommerkleid"]
  },
  {
    slug: "olive",
    linie: "evidenz",
    warumBeruhigt: "Die mintbeige Palette mit dezenten Goldakzenten entspricht dem biophilen Farbspektrum, das Grinde & Patil (2009) als wohlbefindensförderlich beschreiben. Die zurückhaltend dosierten Goldspuren geben dem Auge Anker, ohne zu reißen. Niedriger Kontrast, weiche Übergänge, organische Materialspuren — alle Marker für visuelle Erholung sind erfüllt.",
    title: "Olive",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 120,
    hoehe: 70,
    jahr: 2024,
    preis: 1140,
    preisLabel: "Verkauft",
    status: "sold",
    statusLabel: "Verkauft",
    kategorie: "Fluid Art",
    material: "Leinwand auf Keilrahmen, Acrylfarbe",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "120 × 70 cm, 2024. Warmes Grün auf ruhigen Beige-Tönen. Strukturreiche Oberfläche mit haptischer Tiefe, gemalt in Schichten. Acryl auf Leinwand.",
    beschreibung: [
      "Die Farbwelt ist eine eigene: Eine Mischung aus satten Goldtönen und tiefem, warmem Olivgrün. Die goldenen Bereiche wirken wie Inseln in einem ruhigen Olivenmeer. Leuchtend, aber nicht aufdringlich.",
      "Es gibt keine harte Grenze zwischen den Farben, nur ein sanftes Ineinanderfließen, das das Auge durch das Bild führt. Was auf den ersten Blick wie ein ruhiges Farbfeld wirkt, offenbart bei längerem Hinsehen eine Komplexität, die sich kaum festhalten lässt.",
      "Dieses Werk ist verkauft. Auf Wunsch entsteht ein ähnliches Werk als Auftragsarbeit. Format, Farbwelt und Stimmung werden dabei individuell auf Ihren Raum abgestimmt."
    ],
    neuroTitel: "Wärmewahrnehmung und biophile Farbwelt",
    neuroText: "Warme Gold- und Ockerfarben aktivieren Assoziationen mit Licht, Wärme und Fülle. Das Gehirn verarbeitet diese Farbtöne als einladend und sicher. Olivgrün gehört zu den naturnahsten Farbtönen überhaupt und assoziiert das Gehirn mit Vegetation, Stabilität und Lebendigkeit. Die fließenden Übergänge erlauben eine leichte Verarbeitung, die als ästhetisches Wohlbefinden erlebt wird.",
    img: "images/werke/olive/originalgemaelde-olive-studiovisus.webp",
    imgRaum: "images/werke/olive/originalgemaelde-olive-im-raum-studiovisus.webp",
    imgRatio: "12/7",
    related: ["schwarz", "sommerkleid", "boot"]
  },
  {
    slug: "sommerkleid",
    linie: "evidenz",
    warumBeruhigt: "Der helle, ungesättigte Gelbton ist warm ohne zu aktivieren — er erinnert an gefiltertes Sonnenlicht, einen biophilen Reiz nach Grinde & Patil (2009). Die verteilten grünen Tupfen erzeugen das, was Reber et al. (2004) als Verarbeitungsflüssigkeit beschreiben: ein wiederkehrendes Muster, das das Gehirn als angenehm und vertraut einstuft. Sommerlich, nicht hektisch.",
    title: "Sommerkleid",
    technik: "Acryl auf Leinwand, mehrere Schichten",
    breite: 120,
    hoehe: 70,
    jahr: 2024,
    preis: 1140,
    status: null,
    statusLabel: null,
    kategorie: "Fluid Art",
    material: "Leinwand auf Keilrahmen, Acrylfarbe, frühe Schuppenstruktur",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "120 × 70 cm, 2024. Eines der frühen Werke aus der Pouring-Reihe von Studio Visus. Acryl auf Leinwand, mehrere Schichten, lichte Farbgebung.",
    beschreibung: [
      "Eines der ersten Werke von Studio Visus. Die Schuppenstruktur, die in späteren Arbeiten zur markanten Signatur wurde, zeigt sich hier in ihren ersten Ansätzen. Noch nicht so dicht, noch nicht so plastisch, aber bereits voller Energie.",
      "Die Farbwelt ist warm. Grün und Beige, sanft ineinandergeflossen, mit einer Leichtigkeit, die an frisches Laub und Sommermorgen erinnert. Kein Grün, das schwer wird, kein Beige, das matt bleibt.",
      "Ein Bild, das nicht auftrumpft. Es ist da, wenn man es braucht. Für Wohnräume, Schlafzimmer, Therapieräume und alle Orte, an denen Wärme und Leichtigkeit gefragt sind."
    ],
    neuroTitel: "Biophile Farbwelt und Wärme",
    neuroText: "Grün und Beige gehören zu den naturnahsten Farbtönen überhaupt. Sie aktivieren das Gehirn mit Assoziationen von Vegetation, Boden und Stabilität, drei Grundelemente von Sicherheitsgefühl in der menschlichen Wahrnehmung. Warme Farbtöne aktivieren zusätzlich Assoziationen mit Wärme, Schutz und sozialer Verbundenheit.",
    img: "images/werke/sommerkleid/originalgemaelde-sommerkleid-studiovisus.webp",
    imgRaum: "images/werke/sommerkleid/originalgemaelde-sommerkleid-im-raum.webp",
    imgRatio: "12/7",
    related: ["flamingo", "schneewiese", "boot"]
  }
  ,{
    slug: "himmelsnetz",           
    linie: "evidenz",
    warumBeruhigt: "Der ruhige graue Grund mit den fraktal-ähnlichen Wirbelstrukturen ist genau die Mittelkomplexität, die Taylor (2006) als optimal für Stressreduktion beschrieben hat. Die gedämpften Ocker- und Brauntöne wirken erdig statt aktivierend (Elliot & Maier). Die diagonal verlaufenden roten Linien führen das Auge sanft, ohne zu reißen — eine sanfte Faszination im Sinne Kaplans.",
    title: "Himmelsnetz",
    technik: "Acryl und Öl auf Leinwand, mehrere Schichten",
    breite: 100,                
    hoehe: 70,
    jahr: 2025,
    preis: 1020,
    status: null,               
    statusLabel: null,
    kategorie: "Figuration",
    material: "Leinwand auf Keilrahmen, Acrylfarbe und ÖL-Farbe",
    gewicht: null,
    rahmen: "Keilrahmen",
    signatur: "Rückseite, datiert",
    subtitle: "100 × 70 cm, 2025. Kombination aus Acryl und Öl, mehrere Schichten. Acrylstruktur als Grund, feine Ölzeichnungen darüber. Aus dem Atelier Hamburg.",
    beschreibung: [
      "Die unterste Ebene ist ein grauer Wirbel, weich und beweglich, wie Wolken, die sich langsam formieren. Darüber verlaufen feine Netzlinien in einem warmen Kaminrot, dünn wie gesponnen und doch präzise gesetzt. Sie überziehen das Bild wie ein zartes Geflecht, das Himmel und Tiefe verbindet.",
      "Und dann, auf der obersten Schicht, in Öl gemalt mit einer eigenen, einzigartigen Technik: Koi-Fische. Anmutig. Schwebend. Als hätten sie gerade die Grenze zwischen Wasser und Luft überschritten.",
      "Himmelsnetz ist besonders geeignet für Räume, in denen Tiefe, Ruhe und ein leiser Hauch von Poesie gefragt sind. Wohnräume, Empfangsbereiche, Therapiepraxen."
    ],
    neuroTitel: "Biophile Farbwelt und Wärme",
    neuroText: "Mehrschichtigkeit und kognitive Tiefe: Das Werk bietet dem Auge verschiedene Verarbeitungsebenen. Das Gehirn kann zwischen naher und ferner Betrachtung wechseln und dabei jedes Mal Neues entdecken, ein Zustand, der als angenehm und bereichernd empfunden wird. Biophile Elemente: Koi-Fische, Wolken und Netzstrukturen greifen natürliche Bildwelten auf, die evolutionär mit Sicherheit und Lebendigkeit verknüpft sind. Bewegung in Stille: Die angedeutete Bewegung der Fische und des Wolkenwirbels erzeugt eine lebendige Dynamik, die gleichzeitig ruhig und fließend bleibt. Kein Schock, keine Anspannung, nur sanfte Bewegung.",
    img: "images/werke/himmelsnetz/originalgemaelde-himmelsnetz-studiovisus.webp",
    imgRaum: "images/index/originalgemaelde-himmelsnetz-acryl-oel-therapiepraxis-studiovisus.webp",
    imgRatio: "10/7",             
    related: ["flamingo", "schwarz", "fenster"] 
  }
];

// ===== HELPER =====
function getWerkBySlug(slug) {
  return werke.find(w => w.slug === slug);
}

function formatPreis(werk) {
  if (werk.preis === null) {
    return werk.preisLabel || 'Auf Anfrage';
  }
  return werk.preis.toLocaleString('de-DE') + ' €';
}

// Skalierung für Größenvergleich (175cm Person = 170px)
function scaleToPixels(cm) {
  return Math.round(cm * (170 / 175));
}

// ===== TEMPLATE =====
function generatePage(werk) {
  const relatedWerke = werk.related.map(getWerkBySlug).filter(Boolean);
  const breiteFormatted = `${werk.breite} cm`;
  const hoeheFormatted = `${werk.hoehe} cm`;
  const dimString = `${werk.breite} × ${werk.hoehe} cm`;
  const url = `https://www.studiovisus.de/werke/${werk.slug}`;
  const isSold = werk.status === 'sold';

  // JSON-LD: Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${werk.title} — Originalgemälde`,
    "description": werk.subtitle,
    "image": `https://www.studiovisus.de/${werk.img}`,
    "url": url,
    "brand": {
      "@type": "Brand",
      "name": "Studio Visus"
    },
    "manufacturer": {
      "@type": "Person",
      "name": "Studio Visus",
      "url": "https://www.studiovisus.de"
    },
    "category": `Originalgemälde > ${werk.kategorie}`,
    "material": werk.material,
    "width": { "@type": "QuantitativeValue", "value": werk.breite, "unitCode": "CMT" },
    "height": { "@type": "QuantitativeValue", "value": werk.hoehe, "unitCode": "CMT" },
    "offers": werk.preis !== null ? {
      "@type": "Offer",
      "price": werk.preis,
      "priceCurrency": "EUR",
      "availability": isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "Studio Visus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lokstedter Höhe 11e",
          "addressLocality": "Hamburg",
          "postalCode": "22529",
          "addressCountry": "DE"
        }
      }
    } : {
      "@type": "Offer",
      "availability": isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "description": "Preis auf Anfrage"
      },
      "seller": {
        "@type": "LocalBusiness",
        "name": "Studio Visus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lokstedter Höhe 11e",
          "addressLocality": "Hamburg",
          "postalCode": "22529",
          "addressCountry": "DE"
        }
      }
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Technik", "value": werk.technik },
      { "@type": "PropertyValue", "name": "Jahr", "value": werk.jahr },
      { "@type": "PropertyValue", "name": "Signatur", "value": werk.signatur },
      { "@type": "PropertyValue", "name": "Rahmen", "value": werk.rahmen }
    ]
  };

  // JSON-LD: Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": "Werke", "item": "https://www.studiovisus.de/werke" },
      { "@type": "ListItem", "position": 3, "name": werk.title, "item": url }
    ]
  };

  // JSON-LD: VisualArtwork
  const artworkSchema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": werk.title,
    "description": werk.subtitle,
    "image": `https://www.studiovisus.de/${werk.img}`,
    "url": url,
    "artMedium": werk.technik,
    "artform": werk.kategorie,
    "width": { "@type": "Distance", "name": breiteFormatted },
    "height": { "@type": "Distance", "name": hoeheFormatted },
    "dateCreated": `${werk.jahr}`,
    "creator": {
      "@type": "Person",
      "name": "Jan-Niclas Bardenhagen",
      "url": "https://www.studiovisus.de",
      "workLocation": {
        "@type": "Place",
        "name": "Atelier Studio Visus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lokstedter Höhe 11e",
          "addressLocality": "Hamburg",
          "postalCode": "22529",
          "addressCountry": "DE"
        }
      }
    }
  };

  const metaDesc = werk.subtitle;

  const werkScaleW = scaleToPixels(werk.breite);
  const werkScaleH = scaleToPixels(werk.hoehe);

  // Badge HTML
  let badgeHtml = '';
  if (werk.status === 'new') badgeHtml = `<span class="badge new">${werk.statusLabel}</span>`;
  if (werk.status === 'sold') badgeHtml = `<span class="badge sold">${werk.statusLabel}</span>`;

  // CTA
  let ctaHtml = '';
  if (isSold) {
    ctaHtml = `
      <a href="/kontakt?art=auftrag" class="btn btn-primary">Ähnliches Werk beauftragen →</a>
      <a href="/werke" class="btn btn-ghost">Alle Werke ansehen</a>`;
  } else {
    ctaHtml = `
      <a href="/kontakt?werk=${encodeURIComponent(werk.title + ' · ' + dimString)}" class="btn btn-primary">Dieses Werk anfragen →</a>
      <a href="/kontakt?art=auftrag" class="btn btn-ghost">Auftragswerk besprechen</a>`;
  }

  // Related
  let relatedHtml = relatedWerke.map(r => `
          <a class="related-card reveal" href="/werke/${r.slug}">
            <div class="frame">
              <img src="/${r.img}" alt="${r.title}">
            </div>
            <h3>${r.title}</h3>
            <div class="specs">${r.technik} · ${r.breite} × ${r.hoehe} cm</div>
            <div class="r-price">${formatPreis(r)}</div>
          </a>`).join('\n');

  // Beschreibung
  let beschreibungHtml = werk.beschreibung.map(p => `      <p>${p}</p>`).join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/svg+xml" href="/images/logo/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#a8482a">
<title>${werk.title}, Originalgemälde ${dimString} | Studio Visus</title>
<meta name="description" content="${metaDesc}">

<!-- Open Graph -->
<meta property="og:type" content="product">
<meta property="og:title" content="${werk.title}, Originalgemälde ${dimString} | Studio Visus">
<meta property="og:description" content="${metaDesc}">
<meta property="og:image" content="https://www.studiovisus.de/${werk.img}">
<meta property="og:image:alt" content="${werk.title}, ${werk.technik}, ${dimString}, ${werk.jahr}. Originalgemälde von Studio Visus.">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">
${werk.preis !== null ? `<meta property="product:price:amount" content="${werk.preis}">
<meta property="product:price:currency" content="EUR">` : ''}
<meta property="product:availability" content="${isSold ? 'out of stock' : 'in stock'}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${werk.title}, Originalgemälde ${dimString} | Studio Visus">
<meta name="twitter:description" content="${metaDesc}">
<meta name="twitter:image" content="https://www.studiovisus.de/${werk.img}">

<!-- Canonical -->
<link rel="canonical" href="${url}">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
${JSON.stringify(productSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(artworkSchema, null, 2)}
</script><link rel="preload" href="/fonts/fraunces-v32-latin-300.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-tight-v7-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/fonts.css">

<link rel="stylesheet" href="/css/style.css">
<link rel="preload" href="/css/cookie-consent.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" href="/css/cookie-consent.css"></noscript>
<link rel="stylesheet" href="/css/werk-detail.css">
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke" class="active">Werke</a>
      <a href="/blog">Blog</a>
      <a href="/ueber">Über</a>
      <a href="/kontakt">Kontakt</a>
      <a href="/faq">FAQ</a>
    </div>
    <a href="/kontakt?art=sonstiges" class="nav-cart">Werk anfragen →</a>
    <button class="nav-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu-backdrop" aria-hidden="true"></div>
<aside class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="mobile-menu-logo">
    <img src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="200" height="50">
  </div>
  <nav class="mobile-menu-links" aria-label="Hauptnavigation mobil">
    <a href="/werke" class="active">Werke</a>
    <a href="/auftragsarbeit">Auftragsarbeit</a>
    <a href="/blog">Blog</a>
    <a href="/ueber">Über</a>
    <a href="/kontakt">Kontakt</a>
    <a href="/faq">FAQ</a>
  </nav>
  <a href="/kontakt?art=sonstiges" class="mobile-menu-cta">Werk anfragen →</a>
  <div class="mobile-menu-foot">
    <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
    <a href="tel:017684737726">0176 84 73 77 26</a>
  </div>
</aside>

<!-- BREADCRUMB -->
<div class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Start</a>
  <span class="sep">›</span>
  <a href="/werke">Werke</a>
  <span class="sep">›</span>
  <span>${werk.title}</span>
</div>

<!-- WERK HERO -->
<section class="werk-hero">

  <!-- Bildbereich -->
  <div class="werk-gallery">
    <div class="werk-main-img" style="--img-ratio:${werk.imgRatio}">
      ${badgeHtml}
      <img src="/${werk.img}" alt="${werk.title}, ${werk.technik}, ${dimString}, ${werk.jahr}. Originalgemälde von Studio Visus.">
    </div>
    <div class="werk-thumbs">
      <div class="werk-thumb active">
        <img src="/${werk.img}" alt="${werk.title}, Gesamtansicht">
      </div>
      ${werk.imgDetail
        ? `<div class="werk-thumb"><img src="/${werk.imgDetail}" alt="${werk.title}, Detailaufnahme"></div>`
        : ``}
      ${werk.imgRaum
        ? `<div class="werk-thumb"><img src="/${werk.imgRaum}" alt="${werk.title}, im Raum"></div>`
        : `<div class="werk-thumb thumb-placeholder">Im Raum</div>`}
      ${werk.imgRueckseite
        ? `<div class="werk-thumb"><img src="/${werk.imgRueckseite}" alt="${werk.title}, Rückseite"></div>`
        : ``}
    </div>
  </div>

  <!-- Info -->
  <div class="werk-info">
    <div class="werk-eyebrow">${werk.kategorie} · ${werk.jahr}</div>
    <div class="werk-chip werk-chip-${werk.linie || 'evidenz'}">
      ${werk.linie === 'frei' ? 'Frei' : 'Evidenzbasiert'}
    </div>
    <h1>${werk.title}</h1>
    <p class="werk-subtitle">${werk.subtitle}</p>

    <!-- Preis -->
    <div class="werk-price-block">
      <div class="werk-price">${formatPreis(werk)}${werk.preis !== null ? ' <span class="currency">EUR</span>' : ''}</div>
      <div class="werk-price-note">${isSold ? 'Dieses Werk ist verkauft. Auftragsarbeit möglich.' : (werk.preis === null ? 'Preis nach Anfrage. Versand deutschlandweit.' : 'Endpreis · Versand deutschlandweit · Gemäß §19 UStG ohne USt-Ausweis')}</div>
    </div>

    <!-- CTA -->
    <div class="werk-cta">${ctaHtml}
    </div>

    <!-- Werkdaten -->
    <div class="werk-data">
      <h2 class="werk-data-title">Werkdaten</h2>
      <div class="werk-data-table">
        <div class="werk-data-row"><span class="k">Titel</span><span class="v">${werk.title}</span></div>
        <div class="werk-data-row"><span class="k">Technik</span><span class="v">${werk.technik}</span></div>
        <div class="werk-data-row"><span class="k">Maße</span><span class="v">${dimString} (B × H)</span></div>
        <div class="werk-data-row"><span class="k">Jahr</span><span class="v">${werk.jahr}</span></div>
        <div class="werk-data-row"><span class="k">Material</span><span class="v">${werk.material}</span></div>
        <div class="werk-data-row"><span class="k">Gewicht</span><span class="v">${werk.gewicht}</span></div>
        <div class="werk-data-row"><span class="k">Rahmen</span><span class="v">${werk.rahmen}</span></div>
        <div class="werk-data-row"><span class="k">Signatur</span><span class="v">${werk.signatur}</span></div>
        <div class="werk-data-row"><span class="k">Status</span><span class="v">${isSold ? 'Reserviert' : 'Verfügbar'}</span></div>
      </div>
    </div>

    <!-- Beschreibung -->
    <div class="werk-beschreibung">
      <h2>Über dieses Werk</h2>
${beschreibungHtml}
    </div>

    <!-- Neuroästhetik -->
    <div class="werk-neuro">
      <div class="ico">α</div>
      <h3>${werk.neuroTitel}</h3>
      <p>${werk.neuroText}</p>
    </div>

    ${werk.linie === 'evidenz' && werk.warumBeruhigt ? `
    <!-- Evidenzbasiert beruhigend -->
    <div class="werk-evidenz">
      <div class="werk-evidenz-head">
        <span class="we-ico">✓</span>
        <h3>Warum dieses Werk beruhigt</h3>
      </div>
      <p>${werk.warumBeruhigt}</p>
      <div class="werk-evidenz-foot">Nach Forschung von Elliot &amp; Maier 2014, Kaplan 1995, Taylor 2006, Reber et al. 2004 und Grinde &amp; Patil 2009.</div>
    </div>
    ` : ''}

    <!-- Trust -->
    <div class="werk-trust">
      <div class="werk-trust-item">
        <span class="t-ico">✦</span>
        <div class="t-text">
          <strong>100% Unikat</strong>
          Handgemalt, kein Druck. Dieses Werk existiert nur einmal.
        </div>
      </div>
      <div class="werk-trust-item">
        <span class="t-ico">→</span>
        <div class="t-text">
          <strong>Versand DE & EU</strong>
          Professionell verpackt, versichert, deutschlandweit.
        </div>
      </div>
      <div class="werk-trust-item">
        <span class="t-ico">↺</span>
        <div class="t-text">
          <strong>14 Tage Rückgabe</strong>
          Gefällt es nicht im Raum? Unkomplizierte Rückgabe.
        </div>
      </div>
      <div class="werk-trust-item">
        <span class="t-ico">◎</span>
        <div class="t-text">
          <strong>Echtheitszertifikat</strong>
          Jedes Werk mit Signatur und Zertifikat.
        </div>
      </div>
    </div>

  </div>
</section>

<!-- GRÖßENVERGLEICH -->
<section class="werk-scale">
  <div class="werk-scale-inner">
    <div class="werk-scale-vis">
      <div class="scale-person"></div>
      <div class="scale-werk" style="width:${werkScaleW}px; height:${werkScaleH}px" data-dims="${dimString}"></div>
    </div>
    <div class="werk-scale-text">
      <h3>${dimString} — <em>im Raumkontext</em></h3>
      <p>Silhouette zeigt das Verhältnis zu einer Person (175 cm). So können Sie abschätzen, wie das Werk an Ihrer Wand wirken wird.</p>
      <p>Auf Wunsch erstelle ich eine fotorealistische Visualisierung Ihres Raums mit dem Werk in Originalmaßen.</p>
      <a href="/kontakt" class="btn btn-ghost">Raumvisualisierung anfragen →</a>
    </div>
  </div>
</section>

<!-- ÄHNLICHE WERKE -->
<section class="werk-related">
  <div class="werk-related-head">
    <h2>Weitere <em>Werke</em></h2>
    <a href="/werke">Alle ansehen →</a>
  </div>
  <div class="werk-related-grid">
${relatedHtml}
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand"><img class="foot-brand-logo" src="/images/logo/studiovisus-logo-footer-thight.svg" alt="Studio Visus" width="200" height="50"></div>
      <div class="foot-tag">Handgemalte Unikate für Räume, in denen Atmosphäre zählt.</div>
    </div>
    <div class="foot-col">
      <h3>Standort</h3>
      <p>Lokstedter Höhe 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h3>Kontakt</h3>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="/kontakt">Kontaktformular →</a>
    </div>
    <div class="foot-col">
      <h3>Info</h3>
      <a href="/impressum">Impressum</a>
      <a href="/widerrufsbelehrung">Widerrufsrecht</a>
      <a href="/datenschutz">Datenschutz</a>
      <a href="/faq">FAQ</a>
      <a href="#" data-cc-open>Cookie-Einstellungen</a>
    </div>
  </div>
  <div class="foot-bottom">
    <span>&copy; 2026 Studio Visus &middot; Hamburg Lokstedt</span>
  </div>
</footer>

<script src="/js/main.js"></script>
<script src="/js/cookie-consent.js"></script>
</body>
</html>`;
}

// ===== GENERATE ALL =====
const outDir = path.join(__dirname);

werke.forEach(werk => {
  const filename = `werk-${werk.slug}.html`;
  const html = generatePage(werk);
  fs.writeFileSync(path.join(outDir, filename), html, 'utf8');
  console.log(`✓ ${filename} (${Math.round(html.length / 1024)} KB)`);
});

console.log(`\n✓ ${werke.length} Werkseiten generiert.`);
