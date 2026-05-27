#!/usr/bin/env node
/**
 * Studio Visus — Zielgruppen-Landingpage-Generator
 * Erzeugt 4 HTML-Seiten mit:
 * - JSON-LD (Service, BreadcrumbList, FAQPage)
 * - Open Graph & Twitter Cards (inkl. og:image)
 * - Meta description
 * - Vollständiges Seiten-Template (lokale Fonts, Cookie-Consent, Instagram)
 * - Cross-Verlinkungs-Block zwischen den 4 Landingpages
 */

const fs = require('fs');
const path = require('path');

// ===== WERKDATEN (für Empfehlungen) =====
const alleWerke = [
  { slug:"fenster", title:"Fenster", technik:"Acryl & Struktur", breite:120, hoehe:160, preis:"2.480 €", img:"images/werke/fenster/originalgemaelde-fesnter-studiovisus.jpg" },
  { slug:"himmelsnetz", title:"Himmelsnetz", technik:"Acryl & Öl", breite:140, hoehe:100, preis:"1.960 €", img:"images/werke/himmelsnetz/originalgemaelde-himmelsnetz-studiovisus.webp" },
  { slug:"boot", title:"Boot", technik:"Fluid Art", breite:100, hoehe:100, preis:"1.420 €", img:"images/werke/boot/originalgemaelde-boot-studiovisus.webp" },
  { slug:"schwarz", title:"Schwarz", technik:"Strukturmalerei", breite:80, hoehe:120, preis:"1.680 €", img:"images/werke/schwarz/originalgemaelde-schwarz-studiovisus.jpeg" },
  { slug:"schneewiese", title:"Schneewiese", technik:"Acryl Pouring", breite:70, hoehe:90, preis:"980 €", img:"images/werke/schneewiese/originalgemaelde-schneewiese-studiovisus.jpeg" },
  { slug:"sturm", title:"Sturm", technik:"Mischtechnik", breite:180, hoehe:120, preis:"3.240 €", img:"images/werke/sturm/originalgemaelde-sturm-studiovisus.webp" },
  { slug:"olive", title:"Olive", technik:"Acryl & Struktur", breite:100, hoehe:100, preis:"1.380 €", img:"images/werke/olive/originalgemaelde-olive-studiovisus.webp" },
  { slug:"sommerkleid", title:"Sommerkleid", technik:"Acryl Pouring", breite:90, hoehe:90, preis:"1.180 €", img:"images/werke/sommerkleid/originalgemaelde-sommerkleid-studiovisus.webp" },
  { slug:"flamingo", title:"Flamingo", technik:"Fluid Art", breite:60, hoehe:80, preis:"780 €", img:"images/werke/flamingo/originalgemaelde-flamingo-studiovisus.webp" }
];

function getWerke(slugs) {
  return slugs.map(s => alleWerke.find(w => w.slug === s)).filter(Boolean);
}

// ===== SEITENDATEN =====
const pages = [
  // ============================================================
  // 1. ARZTPRAXIS
  // ============================================================
  {
    slug: "bilder-arztpraxis",
    navLabel: "01 · Arztpraxis",
    title: "Bilder für Arztpraxen & Kliniken",
    metaTitle: "Bilder für Arztpraxen — Originalgemälde für Wartezimmer · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Arztpraxen und Kliniken. Kunst, die Patienten im Wartezimmer beruhigt. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/bilder-arztpraxis",
    ogImage: "https://www.studiovisus.de/images/index/originalgemaelde-himmelsnetz-acryl-oel-therapiepraxis-studiovisus.jpeg",
    ogImageAlt: "Originalgemälde in einer Arztpraxis",
    heroEyebrow: "Kunst für Arztpraxen & Kliniken",
    h1: 'Bilder für die <em>Arztpraxis</em>.<br>Visuelle <span class="stroke">Ruhe</span> statt<br>steriler Wände.',
    heroLead: "Wartezimmer sind Orte, an denen Menschen warten und meistens nicht entspannt sind. Ein handgemaltes Originalgemälde kann die Anspannung im Raum hörbar senken. Nicht laut, nicht aufdringlich, aber spürbar.",
    heroP1: "Studien aus der Umweltpsychologie zeigen, dass die Gestaltung des Wartezimmers messbare Effekte hat. Die wahrgenommene Wartezeit wird kürzer, der Cortisolspiegel sinkt, das Vertrauen in die Praxis steigt. Kein Poster und kein Druck erreicht das auf vergleichbare Weise.",
    heroP2: "Studio Visus entwickelt Werke speziell für medizinische Räume. Hygienisch handhabbar, farblich auf Ihre Praxis abgestimmt und in Formaten von 60 × 80 cm bis 180 × 120 cm verfügbar.",
    imgGrad1: "linear-gradient(135deg, #a8482a, #d8c9ad)",
    imgGrad2: "linear-gradient(135deg, #ebe2d2, #c9bfae)",
    problemTitle: 'Das Problem mit <em>leeren Wänden</em> in der Praxis.',
    problemP1: "<strong>Patienten betreten Ihre Praxis mit Sorgen.</strong> Weiße Wände, Neonlicht und der Geruch von Desinfektionsmittel verstärken die Anspannung. Die Wahrnehmung der Praxis beginnt nicht beim Arztkontakt. Sie beginnt an der Wand.",
    problemP2: "Forschungsergebnisse aus den letzten 40 Jahren zeigen, dass die Raumgestaltung eines Wartezimmers direkten Einfluss auf die Patientenzufriedenheit, die empfundene Wartezeit und sogar auf die Schmerzwahrnehmung hat. Kunst ist hier kein Luxus. Sie ist ein Werkzeug.",
    points: [
      { ico:"α", title:"Weniger Cortisol",  text:"Fraktale Muster und biophile Farbpaletten reduzieren den Cortisolspiegel. Das passiert innerhalb weniger Minuten Betrachtungszeit und lässt sich physiologisch nachweisen." },
      { ico:"β", title:"Kürzere Wartezeit", text:"In ästhetisch gestalteten Wartezimmern schätzen Patienten ihre Wartezeit deutlich kürzer ein als in rein funktional eingerichteten Räumen. Der Effekt ist gut dokumentiert." },
      { ico:"γ", title:"Mehr Vertrauen",    text:"Eine Praxis mit Originalkunst wirkt professioneller und sorgfältiger. Wer in die Ästhetik des Wartezimmers investiert, signalisiert Investition in Qualität insgesamt." }
    ],
    studiesTitle: 'Was die <em>Forschung</em> sagt.',
    studiesIntro: "Die Wirkung von Kunst in medizinischen Umgebungen ist kein Wunschdenken. Sie ist wissenschaftlich dokumentiert und in vielen Studien repliziert worden.",
    studies: [
      { year:"Ulrich, 1984",         title:"Blick ins Grüne beschleunigt Heilung", text:"Patienten mit natürlichem Ausblick nach Operationen benötigten weniger Schmerzmittel und wurden durchschnittlich einen Tag früher entlassen.", source:"Science, Vol. 224" },
      { year:"Nanda et al., 2012",   title:"Kunst senkt Angst in Notaufnahmen",     text:"Naturdarstellungen und abstrakte Werke mit organischen Formen reduzierten die selbstberichtete Angst von Patienten in Notaufnahmen signifikant.", source:"HERD Journal, Vol. 5" },
      { year:"Lankston et al., 2010", title:"Farbwirkung auf das Stresserleben",   text:"Beruhigende Farbpaletten in Blau, Grün und Sand senkten den physiologischen Stress bei Patienten stärker als stimulierende Farbtöne.", source:"Arts & Health, Vol. 2" }
    ],
    empfohleneWerke: ["schneewiese","boot","fenster"],
    werkeTitle: 'Empfohlene Werke für <em>Praxisräume</em>',
    quote: "Ein gutes Wartezimmer beginnt nicht mit dem Magazin auf dem Tisch. Es beginnt mit dem, was die Wand erzählt.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Warum ein <em>Original</em> und kein Druck?',
    checklistIntro: "In vielen Praxen hängen gedruckte Poster oder lizenzfreie Stockmotive. Das funktioniert irgendwie. Aber es verschenkt Potenzial. Ein handgemaltes Originalgemälde macht einen Unterschied, der sich auch wirtschaftlich rechnen kann.",
    checklist: [
      "Ein <strong>Unikat</strong> signalisiert Wertschätzung. Patienten spüren, dass Sie in ihren Aufenthalt investiert haben.",
      "<strong>Haptische Oberflächen</strong> erzeugen eine andere Tiefe als flache Drucke. Das Auge bleibt hängen, der Blick kommt zur Ruhe.",
      "<strong>Hygienisch handhabbar</strong>. Acryl auf Leinwand lässt sich versiegeln und abwischen. Hinter Acrylglas auch für sterile Bereiche geeignet.",
      "Maße, <strong>Farbpalette und Stimmung</strong> werden auf Ihre Praxis und Ihr Corporate Design abgestimmt. Kein Kompromiss.",
      "14 Tage Rückgaberecht. <strong>Passt es nicht</strong> in den Raum, nehme ich das Werk unkompliziert zurück.",
      "Auf Wunsch <strong>persönliche Lieferung und Hängung</strong> in Hamburg und Norddeutschland."
    ],
    ctaTitle: 'Bereit, Ihre Praxis zu <em>verändern?</em>',
    ctaText: "Ein verfügbares Werk für Ihr Wartezimmer oder ein Auftragsgemälde in Ihren Praxisfarben. Ich berate Sie persönlich. Kostenlos und unverbindlich.",
    faqs: [
      { q:"Welche Formate eignen sich für Wartezimmer?",     a:"Das hängt von der Wandgröße und der Raumwirkung ab. Für die meisten Wartezimmer empfehle ich Formate zwischen 80 × 100 cm und 120 × 160 cm. Bei einem Beratungsgespräch kann ich Ihnen eine genaue Empfehlung geben." },
      { q:"Sind die Werke hygienisch unbedenklich?",         a:"Ja. Acryl auf Leinwand lässt sich mit einem feuchten Tuch abwischen. Für höhere Hygieneanforderungen kann das Werk hinter Acrylglas gerahmt oder mit einer antimikrobiellen Schutzschicht versehen werden." },
      { q:"Kann ich das Werk vorab in meiner Praxis sehen?", a:"Ja. Auf Wunsch erstelle ich eine fotorealistische Raumvisualisierung mit dem Werk in Originalmaßen. Bei Hamburger Adressen komme ich für einen Raumcheck auch gern persönlich vorbei." }
    ],
    serviceType: "Originalgemälde für Arztpraxen und Kliniken",
    relatedShort: "Wandkunst, die Patienten im Wartezimmer messbar entspannt. Wissenschaftlich fundiert.",
    relatedLabel: "Bilder für Arztpraxen"
  },

  // ============================================================
  // 2. HOTEL
  // ============================================================
  {
    slug: "kunst-hotel",
    navLabel: "02 · Hotel & Foyer",
    title: "Kunst für Hotels & Foyers",
    metaTitle: "Kunst für Hotels & Foyers — Originalgemälde für den Empfang · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Hotellobbys, Empfangsbereiche und Suiten. Kunst, die Gäste ankommen lässt. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-hotel",
    ogImage: "https://www.studiovisus.de/images/index/originalgemaelde-himmelsnetz-acryl-oel-therapiepraxis-studiovisus.jpeg",
    ogImageAlt: "Originalgemälde in einer Hotellobby",
    heroEyebrow: "Kunst für Hotels & Foyers",
    h1: 'Originalgemälde für <em>Hotels</em>.<br>Der erste Eindruck<br>als <span class="stroke">Wettbewerbsvorteil.</span>',
    heroLead: "Ein Empfangsbereich mit dem richtigen Originalgemälde sagt Ihren Gästen schon vor dem ersten Wort: Hier hat jemand mit Sorgfalt gedacht. Hier sind Sie nicht in einem Hotel wie jedem anderen.",
    heroP1: "In einer Branche, in der Bewertungen über die Auslastung entscheiden, ist die Atmosphäre der Lobby kein Detail. Sie ist ein wirtschaftlicher Faktor. Forschungsergebnisse zeigen, dass die wahrgenommene Raumqualität direkt in die Gesamtbewertung eines Hotels einfließt.",
    heroP2: "Studio Visus entwickelt großformatige Originalgemälde für Lobbys, Foyers, Suiten und Konferenzbereiche. Abgestimmt auf Ihre Architektur, Ihre Farbwelt und die Stimmung, die Sie schaffen möchten.",
    imgGrad1: "linear-gradient(135deg, #5a6d4a, #c69a4a)",
    imgGrad2: "linear-gradient(135deg, #3a2f24, #8a8175)",
    problemTitle: 'Warum Lobbys mit <em>Massenware</em> nicht funktionieren.',
    problemP1: "<strong>Gäste erkennen Austauschbarkeit sofort.</strong> Gedruckte Bilder aus dem Großhandel, identische Dekoration wie im Hotel nebenan. Das sendet eine klare Botschaft: Hier wird dort gespart, wo es zählt.",
    problemP2: "Ein handgemaltes Originalgemälde kehrt diese Botschaft um. Es sagt: Hier wurde kuratiert, nicht katalogisiert. Es erzeugt einen Moment des Innehaltens. Und genau dieser Moment prägt den Gesamteindruck stärker als jedes Zimmerupgrade.",
    points: [
      { ico:"α", title:"Der erste Eindruck",    text:"Gäste bilden sich innerhalb weniger Sekunden ein Urteil über die Qualität eines Hotels. Die Atmosphäre der Lobby ist dabei der dominierende Faktor." },
      { ico:"β", title:"Bessere Bewertungen",   text:"Hotels mit kuratierter Kunst in öffentlichen Bereichen schneiden bei den Kategorien Atmosphäre und Gesamteindruck im Schnitt besser ab als Häuser mit Standarddekoration." },
      { ico:"γ", title:"Unverwechselbarkeit",  text:"Ein Originalgemälde ist ein Alleinstellungsmerkmal, das kein Konkurrent kopieren kann. Es wird Teil der Identität Ihres Hauses. Auf Instagram, in Bewertungen und in der Erinnerung Ihrer Gäste." }
    ],
    studiesTitle: 'Ästhetik als <em>Geschäftsfaktor.</em>',
    studiesIntro: "Die Verbindung zwischen Raumgestaltung und Gästezufriedenheit ist keine Vermutung. Sie ist messbar und für die Hotellerie hochrelevant.",
    studies: [
      { year:"Countryman & Jang, 2006", title:"Lobby-Design beeinflusst Gesamteindruck", text:"Die ästhetische Qualität der Lobby hat einen statistisch signifikanten Einfluss auf die Gesamtzufriedenheit und die Weiterempfehlungsbereitschaft von Hotelgästen.", source:"International Journal of Contemporary Hospitality Management" },
      { year:"Bitner, 1992",            title:"Servicescape-Theorie",                    text:"Die physische Umgebung beeinflusst das Verhalten und die emotionale Reaktion von Kunden in Dienstleistungsumgebungen. Positiv wie negativ.", source:"Journal of Marketing, Vol. 56" },
      { year:"Jiang & Wang, 2006",      title:"Kunst im Hotelkontext",                   text:"Visuelle Kunst in Hotelbereichen steigert die wahrgenommene Servicequalität und führt zu längerer Verweildauer in öffentlichen Bereichen.", source:"Tourism Management" }
    ],
    empfohleneWerke: ["sturm","himmelsnetz","schwarz"],
    werkeTitle: 'Empfohlene Werke für <em>Hotels & Foyers</em>',
    quote: "Wer in ein Hotel eintritt und sofort ein Bild bemerkt, das ihn berührt, hat in diesem Moment bereits entschieden. Hier bin ich richtig.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Warum Hotels auf <em>Originale</em> setzen sollten.',
    checklistIntro: "Die Investition in handgemalte Kunst rechnet sich nicht nur ästhetisch, sondern auch wirtschaftlich. Sechs Gründe, die in der Praxis immer wieder den Unterschied machen.",
    checklist: [
      "<strong>Unverwechselbar</strong>. Kein anderes Hotel der Welt hat dasselbe Werk. Das Bild wird zum ikonischen Element Ihres Hauses.",
      "<strong>Instagram-Moment</strong>. Großformatige, auffällige Originalgemälde werden fotografiert und geteilt. Kostenlose Reichweite mit Qualitätspositionierung.",
      "<strong>Langlebig</strong>. Acryl auf Leinwand ist lichtecht, robust und über Jahrzehnte haltbar. Kein Austausch nötig, kein Verblassen.",
      "<strong>Skalierbar</strong>. Von der einzelnen Lobby bis zur kompletten Ausstattung aller Etagen. Ich arbeite projektbasiert und liefere abgestimmt.",
      "<strong>Corporate Design</strong>. Farbpalette und Stimmung werden auf Ihre Marke abgestimmt. Das Werk verstärkt Ihre Identität, statt ihr zu widersprechen.",
      "<strong>Persönliche Beratung</strong>. Auf Wunsch komme ich für einen Raumcheck vorbei und berate vor Ort zur optimalen Platzierung."
    ],
    ctaTitle: 'Machen Sie Ihre Lobby <em>unvergesslich.</em>',
    ctaText: "Ein einzelnes Statement-Werk oder ein komplettes Kunstkonzept für Ihr Haus. Ich berate Sie persönlich und unverbindlich.",
    faqs: [
      { q:"Können Sie mehrere Werke für verschiedene Bereiche liefern?", a:"Ja. Ich arbeite projektbasiert. Lobby, Flure, Suiten, Konferenzräume. Alle Werke werden aufeinander und auf Ihr Gesamtkonzept abgestimmt." },
      { q:"Welche Formate empfehlen Sie für Hotellobbys?",                a:"Für Lobbys mit Raumhöhen ab 3 Metern empfehle ich Formate ab 140 × 100 cm, idealerweise 180 × 120 cm oder größer. Das Werk muss den Raum besetzen, nicht in ihm verschwinden." },
      { q:"Liefern Sie deutschlandweit?",                                  a:"Ja, deutschlandweit und in alle EU-Länder. Großformate werden professionell verpackt und versichert versendet. Auf Wunsch liefere ich persönlich und hänge das Werk vor Ort." }
    ],
    serviceType: "Originalgemälde für Hotels und Foyers",
    relatedShort: "Großformatige Werke für Foyer, Lobby und Suite. Atmosphäre, die Gäste sofort wahrnehmen.",
    relatedLabel: "Kunst für Hotels"
  },

  // ============================================================
  // 3. THERAPIEPRAXIS
  // ============================================================
  {
    slug: "kunst-therapiepraxis",
    navLabel: "03 · Therapie",
    title: "Wandkunst für Therapiepraxen",
    metaTitle: "Kunst für Therapiepraxen — beruhigende Gemälde für den Therapieraum · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Therapiepraxen und Beratungsräume. Kunst, die innere Offenheit fördert. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-therapiepraxis",
    ogImage: "https://www.studiovisus.de/images/index/originalgemaelde-himmelsnetz-acryl-oel-therapiepraxis-studiovisus.jpeg",
    ogImageAlt: "Originalgemälde in einer Therapiepraxis",
    heroEyebrow: "Kunst für Therapiepraxen",
    h1: 'Wandkunst für die <em>Therapie</em>.<br>Der Raum als <span class="stroke">therapeutisches</span><br>Instrument.',
    heroLead: "In der Therapie beginnt die Arbeit, lange bevor das Gespräch beginnt. Der Raum gibt den Ton an. Offenheit oder Verschlossenheit. Vertrauen oder Distanz. Kunst kann diesen Ton setzen.",
    heroP1: "Beruhigende Farben, organische Formen und fließende Strukturen unterstützen die innere Offenheit, die jede gute Therapiesitzung braucht. Nicht als Ablenkung. Als visueller Anker.",
    heroP2: "Studio Visus entwickelt Werke für Psychotherapiepraxen, Coaching-Räume, Beratungsstellen und psychiatrische Einrichtungen. Mit besonderem Augenmerk auf Farbwirkung und emotionale Neutralität.",
    imgGrad1: "linear-gradient(135deg, #3a4a6b, #8aa5b8)",
    imgGrad2: "linear-gradient(135deg, #5a6d4a, #c9bfae)",
    problemTitle: 'Was der Raum <em>über die Therapie</em> erzählt.',
    problemP1: "<strong>Klienten lesen Räume unbewusst.</strong> Ein kahler, funktionaler Raum signalisiert: Hier geht es um Effizienz, nicht um mich. Ein überladener Raum signalisiert: Hier ist kein Platz für meine Themen.",
    problemP2: "Das richtige Bild schafft eine dritte Option. Einen Raum, der offen ist, ohne leer zu sein. Der einlädt, ohne zu drängen. Der Sicherheit vermittelt, ohne sie zu behaupten. Genau das ist die Aufgabe eines Werks in einem therapeutischen Kontext.",
    points: [
      { ico:"α", title:"Emotionale Neutralität",   text:"Die Werke arbeiten bewusst nicht gegenständlich. Kein Motiv, das Assoziationen erzwingt. Stattdessen offene Formen, die jeder Klient anders lesen darf." },
      { ico:"β", title:"Parasympathische Wirkung", text:"Organische Formen und biophile Farbtöne aktivieren den Parasympathikus. Den Teil des Nervensystems, der für Entspannung und Sicherheit zuständig ist." },
      { ico:"γ", title:"Visueller Anker",           text:"Ein Werk an der Wand gibt dem Blick einen Haltepunkt in schwierigen Momenten. Ein Ort, an dem die Augen ruhen können, ohne dass der Kontakt verloren geht." }
    ],
    studiesTitle: 'Raum und <em>Psyche</em>. Was die Forschung zeigt.',
    studiesIntro: "Die Wirkung der räumlichen Umgebung auf den therapeutischen Prozess ist in der Fachliteratur gut dokumentiert. Drei Studien, die in der Praxis besonders relevant sind.",
    studies: [
      { year:"Pressly & Heesacker, 2001", title:"Raumgestaltung und therapeutische Beziehung", text:"Die physische Umgebung eines Therapieraums hat einen messbaren Einfluss auf die Qualität der therapeutischen Allianz und die Bereitschaft zur Selbstöffnung.", source:"Journal of Counseling Psychology" },
      { year:"Dijkstra et al., 2006",     title:"Farbe und Stresserleben",                      text:"Kühlere, natürliche Farbtöne in Gesundheitsumgebungen reduzierten den selbstberichteten Stress und erhöhten das subjektive Wohlbefinden signifikant.", source:"Building and Environment" },
      { year:"Gross et al., 2004",        title:"Kunstbetrachtung als Regulation",              text:"Ästhetische Erfahrungen aktivieren Hirnareale, die mit emotionaler Regulation und Selbstreflexion assoziiert sind. Fähigkeiten, die im therapeutischen Prozess zentral sind.", source:"NeuroImage" }
    ],
    empfohleneWerke: ["boot","olive","schneewiese"],
    werkeTitle: 'Empfohlene Werke für <em>Therapieräume</em>',
    quote: "Das beste Bild in einem Therapieraum ist eines, das der Klient nach drei Sitzungen immer noch anders sieht als beim ersten Mal.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Was ein Werk im <em>Therapieraum</em> leisten sollte.',
    checklistIntro: "Nicht jedes Bild eignet sich für therapeutische Kontexte. Die folgenden Kriterien bilden die Grundlage, nach der Studio Visus Werke für Therapiepraxen entwickelt.",
    checklist: [
      "<strong>Abstrakt, nicht leer</strong>. Das Werk bietet visuelle Anregung, ohne eine bestimmte emotionale Reaktion zu erzwingen.",
      "<strong>Farblich beruhigend</strong>. Keine stimulierenden Rot- oder Gelbtöne. Stattdessen Blau, Grün, Sand und gedeckte Erdtöne.",
      "<strong>Organische Formen</strong>. Keine scharfen Kanten, keine geometrische Strenge. Fließende Linien, die das Nervensystem zur Ruhe bringen.",
      "<strong>Die richtige Größe</strong>. Groß genug, um den Raum zu prägen. Klein genug, um nicht zu dominieren. Für die meisten Praxisräume ideal: 80 × 100 cm bis 120 × 160 cm.",
      "<strong>Haptische Oberfläche</strong>. Die Textur eines echten Gemäldes erzeugt eine andere Raumwirkung als ein flacher Druck. Subtil, aber spürbar.",
      "<strong>Keine Trigger-Motive</strong>. Bewusster Verzicht auf Darstellungen, die bei vulnerablen Klienten Assoziationen auslösen könnten."
    ],
    ctaTitle: 'Einen Raum schaffen, der <em>Heilung</em> unterstützt.',
    ctaText: "Ein einzelnes Werk für Ihren Therapieraum oder die Ausstattung einer ganzen Praxis. Ich berate Sie vertraulich und unverbindlich.",
    faqs: [
      { q:"Welche Farben eignen sich für Therapieräume?",                a:"Gedeckte Naturtöne wie Blau, Grün, Sand und warmes Grau. Rot, Orange und kräftiges Gelb vermeide ich, weil sie aktivieren statt zu beruhigen. Die genaue Farbpalette stimme ich auf Ihren Raum ab." },
      { q:"Sollte das Werk abstrakt sein?",                              a:"Für therapeutische Kontexte empfehle ich abstrakte Werke, weil sie keine Assoziationen erzwingen. Jeder Klient kann sein eigenes Erleben in das Bild projizieren oder es einfach als visuellen Ruhepunkt nutzen." },
      { q:"Kann ich ein Auftragswerk für meinen Praxisraum bestellen?",  a:"Ja. Ich entwickle Werke gezielt für therapeutische Umgebungen. Format, Farbwelt und Stimmung werden auf Ihren Raum und Ihre Arbeit abgestimmt. Das Vorgespräch ist kostenlos." }
    ],
    serviceType: "Originalgemälde für Therapiepraxen und Beratungsräume",
    relatedShort: "Ruhige Bildwelten, die Sicherheit vermitteln und den therapeutischen Raum stärken.",
    relatedLabel: "Kunst für Therapiepraxen"
  },

  // ============================================================
  // 4. BÜRO
  // ============================================================
  {
    slug: "kunst-buero",
    navLabel: "04 · Büro",
    title: "Kunstwerke für Büros & Meeting-Räume",
    metaTitle: "Kunst für Büros & Meeting-Räume — Originalgemälde für Unternehmen · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Büros, Besprechungsräume und Empfangsbereiche. Kunst, die beruhigt und Qualität signalisiert. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-buero",
    ogImage: "https://www.studiovisus.de/images/index/originalgemaelde-himmelsnetz-acryl-oel-therapiepraxis-studiovisus.jpeg",
    ogImageAlt: "Originalgemälde in einem modernen Büro",
    heroEyebrow: "Kunst für Büros & Unternehmen",
    h1: 'Kunst für <em>Büros</em>.<br>Abgestimmt auf<br>Ihr <span class="stroke">Corporate Design.</span>',
    heroLead: "Besprechungsräume und Open-Space-Büros profitieren von visueller Entspannung. Ein Originalgemälde beruhigt, ohne einzuschläfern. Und es signalisiert gleichzeitig Qualität und Haltung.",
    heroP1: "In einer Zeit, in der Unternehmen um Talente konkurrieren, ist die Arbeitsumgebung ein Argument. Untersuchungen zeigen, dass Mitarbeitende in ästhetisch gestalteten Räumen produktiver sind, zufriedener und seltener krank.",
    heroP2: "Studio Visus entwickelt Werke für Empfangsbereiche, Konferenzräume, Open-Space-Büros und Führungsetagen. Abgestimmt auf Ihre Marke, Ihre Architektur und die Menschen, die darin arbeiten.",
    imgGrad1: "linear-gradient(135deg, #4a4339, #a8482a)",
    imgGrad2: "linear-gradient(135deg, #6b5840, #c69a4a)",
    problemTitle: 'Warum Büros mehr brauchen als <em>weiße Wände.</em>',
    problemP1: "<strong>Räume prägen Verhalten.</strong> Ein steriler Besprechungsraum fördert sterile Ideen. Ein Raum mit einem visuellen Ankerpunkt fördert Fokus, Kreativität und konstruktive Gespräche.",
    problemP2: "Die meisten Büros investieren in Technik und Möbel und vergessen dabei den größten Faktor für die Raumwirkung. Die Wände. Ein einziges Originalgemälde kann einen Raum grundlegend verändern. Von funktional zu inspirierend.",
    points: [
      { ico:"α", title:"Mehr Wohlbefinden",     text:"Mitarbeitende in ästhetisch gestalteten Büros berichten von höherer Arbeitszufriedenheit und niedrigerem Stresserleben. Ein direkter Beitrag zur Mitarbeiterbindung." },
      { ico:"β", title:"Bessere Außenwirkung",  text:"Ein Empfangsbereich mit Originalkunst wird als hochwertiger und professioneller wahrgenommen. Der erste Eindruck auf Kunden und Partner beginnt an der Wand." },
      { ico:"γ", title:"Corporate Identity",    text:"Ein Auftragswerk kann die Farbpalette, die Werte und die Haltung Ihres Unternehmens visuell übersetzen. Subtiler und dauerhafter als jedes Branding-Element." }
    ],
    studiesTitle: 'Kunst am Arbeitsplatz. Die <em>Datenlage.</em>',
    studiesIntro: "Der Einfluss von Raumgestaltung auf Produktivität und Wohlbefinden am Arbeitsplatz ist eines der am besten erforschten Felder der Umweltpsychologie. Drei Studien aus diesem Bereich.",
    studies: [
      { year:"Knight & Haslam, 2010",     title:"Raumgestaltung und Produktivität", text:"Mitarbeitende in gestalteten Büros waren deutlich produktiver als in funktional-minimalistischen Umgebungen. Der Effekt war am stärksten, wenn sie Einfluss auf die Gestaltung nehmen konnten.", source:"Journal of Experimental Psychology: Applied" },
      { year:"Nieuwenhuis et al., 2014",  title:"Pflanzen und Kunst im Büro",       text:"Die Anwesenheit von Pflanzen und Kunst im Arbeitsumfeld steigerte die Arbeitszufriedenheit und die kognitive Leistungsfähigkeit signifikant.", source:"Journal of Experimental Psychology: Applied" },
      { year:"Kaplan, 1995",              title:"Attention Restoration Theory",     text:"Natürliche und naturähnliche visuelle Reize wie abstrakte Kunst mit organischen Formen helfen, die gerichtete Aufmerksamkeit zu regenerieren. Ideal für Meetingräume zwischen konzentrierten Arbeitsphasen.", source:"Environment and Behavior" }
    ],
    empfohleneWerke: ["schwarz","fenster","sturm"],
    werkeTitle: 'Empfohlene Werke für <em>Büro & Besprechung</em>',
    quote: "Der beste Besprechungsraum ist einer, in dem die Teilnehmer drei Sekunden lang schweigend auf die Wand schauen. Und dann anfangen, anders zu denken.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Kunst im Büro. <em>Mehr als Dekoration.</em>',
    checklistIntro: "Ein Originalgemälde im Unternehmenskontext ist eine Investition, die sich auf mehreren Ebenen auszahlt. Sechs Gründe, die in der Beratung immer wieder genannt werden.",
    checklist: [
      "<strong>Employer Branding</strong>. Ästhetisch gestaltete Büros werden auf Kununu, Glassdoor und in Bewerbungsgesprächen positiv hervorgehoben.",
      "<strong>Kundeneindruck</strong>. Ein Original im Empfang signalisiert Qualität, Sorgfalt und Haltung. Werte, die auf Ihr Unternehmen abstrahlen.",
      "<strong>Steuerlich absetzbar</strong>. Kunst im Unternehmen lässt sich als Betriebsausgabe abschreiben. Die tatsächlichen Kosten liegen oft deutlich unter dem Listenpreis.",
      "<strong>CI-Abstimmung</strong>. Farbpalette, Tonalität und Format werden auf Ihr Corporate Design abgestimmt. Das Werk verstärkt Ihre Marke visuell.",
      "<strong>Projektbasiert</strong>. Von der einzelnen Wand bis zur kompletten Etage. Ich plane und liefere auf Ihren Zeitplan abgestimmt.",
      "<strong>Wertstabilität</strong>. Ein Originalgemälde verliert nicht an Wert. Anders als Technik oder Möbel ist Kunst eine Investition, die sich über Jahrzehnte trägt."
    ],
    ctaTitle: 'Bereit, Ihre Räume auf <em>Ihr Niveau</em> zu bringen?',
    ctaText: "Ein einzelnes Statement-Werk für den Empfang oder ein Konzept für alle Etagen. Ich berate Sie persönlich und unverbindlich.",
    faqs: [
      { q:"Ist Kunst im Unternehmen steuerlich absetzbar?",             a:"Ja. Kunstwerke unter 800 € netto lassen sich als geringwertige Wirtschaftsgüter sofort abschreiben. Höhere Beträge werden über die Nutzungsdauer abgeschrieben. Für die genaue Behandlung in Ihrem Fall sprechen Sie bitte mit Ihrem Steuerberater." },
      { q:"Können Sie mehrere Werke für verschiedene Räume liefern?",   a:"Ja. Ich arbeite projektbasiert und stimme alle Werke aufeinander ab. Sowohl farblich als auch in Format und Stimmung. Auf Wunsch erstelle ich ein Gesamtkonzept für Ihr Büro." },
      { q:"Wie läuft eine Auftragsarbeit für Unternehmen ab?",          a:"Nach einem Erstgespräch vor Ort oder digital erstelle ich ein Konzept mit Farbpalette, Formatempfehlung und Preisrahmen. Nach Freigabe beginnt der Entstehungsprozess. Üblicherweise dauert das 6 bis 12 Wochen." }
    ],
    serviceType: "Originalgemälde für Büros und Unternehmen",
    relatedShort: "Originalkunst für Empfang, Meetingraum und Geschäftsführung. Repräsentativ und ruhig.",
    relatedLabel: "Kunst fürs Büro"
  }
];

// ===== TEMPLATE =====
function generatePage(page) {
  const empfWerke = getWerke(page.empfohleneWerke);

  // Cross-Verlinkung: die jeweils anderen drei Landingpages
  const related = pages.filter(p => p.slug !== page.slug);
  const relatedHtml = related.map(p => `      <a class="lp-related-card" href="/${p.slug}">
        <h3>${p.relatedLabel} &rarr;</h3>
        <p>${p.relatedShort}</p>
      </a>`).join('\n');

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.serviceType,
    "description": page.metaDesc,
    "url": page.canonical,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Studio Visus",
      "url": "https://www.studiovisus.de",
      "telephone": "+4917684737726",
      "email": "info@studiovisus.de",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lokstedter Höhe 11e",
        "addressLocality": "Hamburg",
        "postalCode": "22529",
        "addressCountry": "DE"
      }
    },
    "areaServed": { "@type": "Country", "name": "Deutschland" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Verfügbare Originalgemälde",
      "itemListElement": empfWerke.map(w => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": `${w.title} — Originalgemälde`,
          "url": `https://www.studiovisus.de/werke/${w.slug}`
        }
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": page.title, "item": page.canonical }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const pointsHtml = page.points.map(p => `
      <div class="lp-point reveal">
        <div class="ico">${p.ico}</div>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </div>`).join('');

  const studiesHtml = page.studies.map(s => `
        <div class="study-card reveal">
          <div class="s-year">${s.year}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          <span class="source">${s.source}</span>
        </div>`).join('');

  const werkeHtml = empfWerke.map((w, i) => {
    const loading = i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
    return `
          <a class="lp-werk-card reveal" href="/werke/${w.slug}">
            <div class="frame">
              <img decoding="async" ${loading} src="${w.img}" alt="${w.title} — ${w.technik}, ${w.breite} × ${w.hoehe} cm">
            </div>
            <h3>${w.title}</h3>
            <div class="specs">${w.technik} · ${w.breite} × ${w.hoehe} cm</div>
            <div class="r-price">Auf Anfrage</div>
          </a>`;
  }).join('');

  const checklistHtml = page.checklist.map(c => `
        <div class="check-item">
          <span class="c-ico">✦</span>
          <div class="c-text">${c}</div>
        </div>`).join('');

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
<title>${page.metaTitle}</title>
<meta name="description" content="${page.metaDesc}">

<meta property="og:type" content="website">
<meta property="og:title" content="${page.metaTitle}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:url" content="${page.canonical}">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">
<meta property="og:image" content="${page.ogImage}">
<meta property="og:image:alt" content="${page.ogImageAlt}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.metaTitle}">
<meta name="twitter:description" content="${page.metaDesc}">
<meta name="twitter:image" content="${page.ogImage}">

<link rel="canonical" href="${page.canonical}">

<script type="application/ld+json">
${JSON.stringify(serviceSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>

<link rel="stylesheet" href="/css/fonts.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/landingpage.css">
<link rel="preload" href="/css/cookie-consent.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" href="/css/cookie-consent.css"></noscript>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke">Werke</a>
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
    <a href="/werke">Werke</a>
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

<!-- HERO -->
<section class="lp-hero">
  <div class="lp-hero-text">
    <div class="lp-eyebrow">${page.heroEyebrow}</div>
    <h1>${page.h1}</h1>
    <p class="lp-hero-lead">${page.heroLead}</p>
    <p>${page.heroP1}</p>
    <p>${page.heroP2}</p>
    <div class="lp-hero-cta">
      <a href="/werke" class="btn btn-primary">Verfügbare Werke ansehen →</a>
      <a href="/kontakt" class="btn btn-ghost">Auftragswerk anfragen</a>
    </div>
  </div>
  <div class="lp-hero-img">
    <div class="img-main"><div class="bg" style="background:${page.imgGrad1}"></div></div>
    <div class="img-float"><div class="bg" style="background:${page.imgGrad2}"></div></div>
    <div class="scribble" style="top:20px; right:-30px; z-index:3;">jedes Werk<br>ein Unikat ✦</div>
  </div>
</section>

<!-- PROBLEM / LÖSUNG -->
<section class="lp-problem">
  <div class="lp-problem-inner">
    <div class="lp-problem-left">
      <div class="sec-eyebrow">Das Problem</div>
      <h2>${page.problemTitle}</h2>
      <p>${page.problemP1}</p>
      <p>${page.problemP2}</p>
    </div>
    <div class="lp-problem-right">${pointsHtml}
    </div>
  </div>
</section>

<!-- STUDIENLAGE -->
<section class="lp-studies">
  <div class="lp-studies-head">
    <div class="sec-eyebrow">Studienlage</div>
    <h2>${page.studiesTitle}</h2>
    <p>${page.studiesIntro}</p>
  </div>
  <div class="study-cards">${studiesHtml}
  </div>
</section>

<!-- BEISPIELWERKE -->
<section class="lp-werke">
  <div class="lp-werke-inner">
    <div class="lp-werke-head">
      <h2>${page.werkeTitle}</h2>
      <a href="/werke">Alle Werke ansehen →</a>
    </div>
    <div class="lp-werke-grid">${werkeHtml}
    </div>
  </div>
</section>

<!-- QUOTE -->
<section class="lp-quote">
  <div class="lp-quote-inner reveal">
    <div class="lp-quote-mark">"</div>
    <div class="lp-quote-text">
      ${page.quote}
      <span class="attr">${page.quoteAttr}</span>
    </div>
  </div>
</section>

<!-- CHECKLIST -->
<section class="lp-checklist">
  <div class="lp-checklist-inner">
    <div class="lp-checklist-intro">
      <div class="sec-eyebrow">Worauf es ankommt</div>
      <h2>${page.checklistTitle}</h2>
      <p>${page.checklistIntro}</p>
    </div>
    <div class="check-list">${checklistHtml}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="lp-cta">
  <div class="lp-cta-inner reveal">
    <h2>${page.ctaTitle}</h2>
    <div class="lp-cta-right">
      <p>${page.ctaText}</p>
      <a href="/kontakt" class="btn btn-primary">Jetzt Kontakt aufnehmen →</a>
    </div>
  </div>
</section>

<!-- RELATED LANDING PAGES -->
<section class="lp-related">
  <div class="lp-related-inner reveal">
    <h2>Andere <em>Anwendungsbereiche</em></h2>
    <div class="lp-related-grid">
${relatedHtml}
    </div>
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
      <a href="https://www.instagram.com/janniclas.art/" target="_blank" rel="noopener me">Instagram &rarr;</a>
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
const outDir = __dirname;
pages.forEach(page => {
  const filename = `${page.slug}.html`;
  const html = generatePage(page);
  fs.writeFileSync(path.join(outDir, filename), html, 'utf8');
  console.log(`✓ ${filename} (${Math.round(html.length / 1024)} KB)`);
});
console.log(`\n✓ ${pages.length} Landingpages generiert.`);
