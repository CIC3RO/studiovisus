#!/usr/bin/env node
/**
 * Studio Visus — Zielgruppen-Landingpage-Generator
 * Erzeugt 4 HTML-Seiten mit:
 * - JSON-LD (Service, BreadcrumbList, FAQPage)
 * - Open Graph & Twitter Cards
 * - Meta description
 * - Vollständiges Seiten-Template
 */

const fs = require('fs');
const path = require('path');

// ===== WERKDATEN (für Empfehlungen) =====
const alleWerke = [
  { slug:"fenster", title:"Fenster", technik:"Acryl & Struktur", breite:120, hoehe:160, preis:"2.480 €", img:"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80" },
  { slug:"himmelsnetz", title:"Himmelsnetz", technik:"Acryl & Öl", breite:140, hoehe:100, preis:"1.960 €", img:"https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4?auto=format&fit=crop&w=900&q=80" },
  { slug:"boot", title:"Boot", technik:"Fluid Art", breite:100, hoehe:100, preis:"1.420 €", img:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80" },
  { slug:"schwarz", title:"Schwarz", technik:"Strukturmalerei", breite:80, hoehe:120, preis:"1.680 €", img:"https://images.unsplash.com/photo-1554189097-ffe88e998a2b?auto=format&fit=crop&w=900&q=80" },
  { slug:"schneewiese", title:"Schneewiese", technik:"Acryl Pouring", breite:70, hoehe:90, preis:"980 €", img:"https://images.unsplash.com/photo-1517999349371-c43520457b23?auto=format&fit=crop&w=900&q=80" },
  { slug:"sturm", title:"Sturm", technik:"Mischtechnik", breite:180, hoehe:120, preis:"3.240 €", img:"https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?auto=format&fit=crop&w=900&q=80" },
  { slug:"olive", title:"Olive", technik:"Acryl & Struktur", breite:100, hoehe:100, preis:"1.380 €", img:"https://images.unsplash.com/photo-1579541814924-49fef17c5be5?auto=format&fit=crop&w=900&q=80" },
  { slug:"sommerkleid", title:"Sommerkleid", technik:"Acryl Pouring", breite:90, hoehe:90, preis:"1.180 €", img:"https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=900&q=80" },
  { slug:"flamingo", title:"Flamingo", technik:"Fluid Art", breite:60, hoehe:80, preis:"780 €", img:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80" }
];

function getWerke(slugs) {
  return slugs.map(s => alleWerke.find(w => w.slug === s)).filter(Boolean);
}

// ===== SEITENDATEN =====
const pages = [
  {
    slug: "bilder-arztpraxis",
    navLabel: "01 · Arztpraxis",
    title: "Bilder für Arztpraxen & Kliniken",
    metaTitle: "Bilder für Arztpraxen — Originalgemälde für Wartezimmer · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Arztpraxen und Kliniken. Evidenzbasierte Kunst, die Patienten nachweislich beruhigt. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/bilder-arztpraxis",
    heroEyebrow: "Kunst für Arztpraxen & Kliniken",
    h1: 'Bilder für die <em>Arztpraxis</em> —<br>visuelle <span class="stroke">Sedierung</span><br>statt steriler Wände.',
    heroLead: "Wartezimmer sind Orte der Anspannung. Handgemalte Originalgemälde auf Basis von Neuroästhetik senken den Stresspegel Ihrer Patienten — messbar, spürbar, vom ersten Blick an.",
    heroP1: "Studien belegen: Gezielte Kunst im Wartezimmer reduziert die wahrgenommene Wartezeit, senkt den Cortisolspiegel und stärkt das Vertrauen in die Praxis. Kein Poster, kein Druck — ein echtes Originalgemälde.",
    heroP2: "Studio Visus entwickelt Werke speziell für medizinische Umgebungen: hygienisch realisierbar, farblich auf Ihre Praxis abgestimmt, in Formaten von 60 × 80 cm bis 180 × 120 cm.",
    imgGrad1: "linear-gradient(135deg, #a8482a, #d8c9ad)",
    imgGrad2: "linear-gradient(135deg, #ebe2d2, #c9bfae)",
    problemTitle: 'Das Problem mit <em>leeren Wänden</em> in der Praxis.',
    problemP1: "<strong>Patienten betreten Ihre Praxis mit Sorgen.</strong> Weiße Wände, Neonlicht und der Geruch von Desinfektionsmittel verstärken die Anspannung. Die Wahrnehmung der Praxis beginnt nicht beim Arztkontakt — sie beginnt an der Wand.",
    problemP2: "Studien zeigen, dass die Raumgestaltung eines Wartezimmers einen direkten Einfluss auf die Patientenzufriedenheit, die empfundene Wartezeit und sogar auf die Schmerzwahrnehmung hat. Kunst ist dabei kein Luxus, sondern ein funktionales Werkzeug.",
    points: [
      { ico:"α", title:"Cortisolsenkung", text:"Fraktale Muster und biophile Farben senken den Cortisolspiegel — den wichtigsten Stressmarker — messbar innerhalb weniger Minuten Betrachtungszeit." },
      { ico:"β", title:"Wartezeitverkürzung", text:"Patienten in ästhetisch gestalteten Wartezimmern schätzen ihre Wartezeit bis zu 30% kürzer ein als in funktional eingerichteten Räumen." },
      { ico:"γ", title:"Vertrauensaufbau", text:"Eine Praxis mit Originalkunst wird als professioneller, sorgfältiger und vertrauenswürdiger wahrgenommen. Die Investition in Ästhetik signalisiert Investition in Qualität." }
    ],
    studiesTitle: 'Was die <em>Forschung</em> sagt.',
    studiesIntro: "Die Wirkung von Kunst in medizinischen Umgebungen ist kein Wunschdenken — sie ist wissenschaftlich dokumentiert und repliziert.",
    studies: [
      { year:"Ulrich, 1984", title:"Blick ins Grüne beschleunigt Heilung", text:"Patienten mit natürlichem Ausblick nach Operationen benötigten weniger Schmerzmittel und wurden im Durchschnitt einen Tag früher entlassen.", source:"Science, Vol. 224" },
      { year:"Nanda et al., 2012", title:"Kunst senkt Angst in Notaufnahmen", text:"Naturdarstellungen und abstrakte Werke mit organischen Formen reduzierten die selbstberichtete Angst von Patienten in Notaufnahmen signifikant.", source:"HERD Journal, Vol. 5" },
      { year:"Lankston et al., 2010", title:"Farbwirkung auf Stresserleben", text:"Beruhigende Farbpaletten (Blau, Grün, Sand) senkten den physiologischen Stress bei Patienten deutlich stärker als stimulierende Farben.", source:"Arts & Health, Vol. 2" }
    ],
    empfohleneWerke: ["schneewiese","boot","fenster"],
    werkeTitle: 'Empfohlene Werke für <em>Praxisräume</em>',
    quote: "Ein gutes Wartezimmer beginnt nicht mit dem Magazin auf dem Tisch — es beginnt mit dem, was die Wand erzählt.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Warum ein <em>Original</em> statt eines Drucks?',
    checklistIntro: "In vielen Praxen hängen gedruckte Poster oder lizenzfreie Stockbilder. Das funktioniert — aber es verschenkt Potenzial. Ein handgemaltes Originalgemälde macht einen Unterschied, der sich auszahlt.",
    checklist: [
      "Ein <strong>Unikat</strong> signalisiert Wertschätzung — Ihre Patienten spüren, dass Sie in ihren Aufenthalt investieren.",
      "<strong>Haptische Oberflächen</strong> erzeugen eine andere Tiefe als flache Drucke — das Auge bleibt hängen, der Blick kommt zur Ruhe.",
      "<strong>Hygienisch realisierbar</strong>: Acryl auf Leinwand kann versiegelt und abgewischt werden. Hinter Acrylglas auch für sterile Bereiche geeignet.",
      "Maße, <strong>Farbpalette und Stimmung</strong> werden auf Ihre Praxis und Ihr Corporate Design abgestimmt — kein Kompromiss.",
      "14-Tage-Rückgabe: <strong>Passt es nicht</strong> im Raum, nehme ich das Werk unkompliziert zurück.",
      "Auf Wunsch <strong>persönliche Lieferung und Hängung</strong> in Hamburg und Norddeutschland."
    ],
    ctaTitle: 'Bereit, Ihre Praxis <em>zu verwandeln?</em>',
    ctaText: "Ob ein verfügbares Werk für Ihr Wartezimmer oder ein Auftragsgemälde in Ihren Praxisfarben — ich berate Sie persönlich. Kostenlos und unverbindlich.",
    faqs: [
      { q:"Welche Formate eignen sich für Wartezimmer?", a:"Das hängt von der Wandgröße und der Raumwirkung ab. Für die meisten Wartezimmer empfehle ich Formate zwischen 80 × 100 cm und 120 × 160 cm. Bei einem Beratungsgespräch kann ich Ihnen eine Empfehlung geben." },
      { q:"Sind die Werke hygienisch unbedenklich?", a:"Ja. Acryl auf Leinwand kann mit einem feuchten Tuch abgewischt werden. Für höhere Hygieneanforderungen kann das Werk hinter Acrylglas gerahmt oder mit einer antimikrobiellen Schutzschicht versehen werden." },
      { q:"Kann ich das Werk vorab in meiner Praxis sehen?", a:"Ja — ich erstelle auf Wunsch eine fotorealistische Raumvisualisierung mit dem Werk in Originalmaßen. Bei Hamburger Adressen komme ich für einen Raumcheck gern auch persönlich vorbei." }
    ],
    serviceType: "Originalgemälde für Arztpraxen und Kliniken"
  },
  {
    slug: "kunst-hotel",
    navLabel: "02 · Hotel & Foyer",
    title: "Kunst für Hotels & Foyers",
    metaTitle: "Kunst für Hotels & Foyers — Originalgemälde für den Empfang · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Hotellobbys, Empfangsbereiche und Suiten. Kunst, die Gäste ankommen lässt. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-hotel",
    heroEyebrow: "Kunst für Hotels & Foyers",
    h1: 'Originalgemälde für <em>Hotels</em> —<br>der erste Eindruck<br>als <span class="stroke">Wettbewerbsvorteil.</span>',
    heroLead: "Ein Empfangsbereich mit gezielt gewähltem Originalgemälde signalisiert Qualität — noch bevor der erste Satz gesprochen wird. Ihre Gäste fühlen: Hier hat jemand an alles gedacht.",
    heroP1: "In einer Branche, in der Bewertungen über Auslastung entscheiden, ist die Lobby-Atmosphäre kein Detail — sie ist ein Wettbewerbsfaktor. Studien zeigen, dass die wahrgenommene Raumqualität direkt auf die Gesamtbewertung eines Hotels einzahlt.",
    heroP2: "Studio Visus entwickelt großformatige Originalgemälde für Lobbys, Foyers, Suiten und Konferenzbereiche — abgestimmt auf Ihre Architektur, Ihr Farbkonzept und die Atmosphäre, die Sie schaffen wollen.",
    imgGrad1: "linear-gradient(135deg, #5a6d4a, #c69a4a)",
    imgGrad2: "linear-gradient(135deg, #3a2f24, #8a8175)",
    problemTitle: 'Warum Lobbys mit <em>Massenware</em> nicht funktionieren.',
    problemP1: "<strong>Gäste erkennen Austauschbarkeit sofort.</strong> Gedruckte Bilder aus dem Großhandel, identische Dekoration wie im Hotel nebenan — das sendet eine Botschaft: Hier wird gespart, wo es zählt.",
    problemP2: "Ein handgemaltes Originalgemälde kehrt diese Botschaft um. Es sagt: Hier wurde kuratiert, nicht katalogisiert. Es erzeugt einen Moment des Anhaltens — und genau dieser Moment prägt den Gesamteindruck stärker als jedes Upgrade.",
    points: [
      { ico:"α", title:"Erster Eindruck in 7 Sekunden", text:"Gäste bilden sich innerhalb der ersten 7 Sekunden ein Urteil über die Qualität eines Hotels. Die Lobby-Ästhetik ist dabei der dominierende Faktor." },
      { ico:"β", title:"Bewertungs-Multiplikator", text:"Hotels mit hochwertiger Kunst in öffentlichen Bereichen erhalten durchschnittlich höhere Bewertungen im Bereich 'Atmosphäre' und 'Gesamteindruck'." },
      { ico:"γ", title:"Unverwechselbarkeit", text:"Ein Originalgemälde ist ein Alleinstellungsmerkmal, das kein Konkurrent kopieren kann. Es wird Teil der Identität Ihres Hauses — auf Instagram, in Bewertungen, in der Erinnerung." }
    ],
    studiesTitle: 'Ästhetik als <em>Geschäftsfaktor.</em>',
    studiesIntro: "Die Verbindung zwischen Raumgestaltung und Gästezufriedenheit ist keine Vermutung — sie ist messbar und für die Hotellerie hochrelevant.",
    studies: [
      { year:"Countryman & Jang, 2006", title:"Lobby-Design beeinflusst Gesamteindruck", text:"Die ästhetische Qualität der Lobby hat einen statistisch signifikanten Einfluss auf die Gesamtzufriedenheit und die Weiterempfehlungsbereitschaft von Hotelgästen.", source:"International Journal of Contemporary Hospitality Management" },
      { year:"Bitner, 1992", title:"Servicescape-Theorie", text:"Die physische Umgebung beeinflusst das Verhalten und die emotionale Reaktion von Kunden in Dienstleistungsumgebungen — positiv wie negativ.", source:"Journal of Marketing, Vol. 56" },
      { year:"Jiang & Wang, 2006", title:"Kunst im Hotelkontext", text:"Visuelle Kunst in Hotelbereichen steigert die wahrgenommene Servicequalität und führt zu längerer Verweildauer in öffentlichen Bereichen.", source:"Tourism Management" }
    ],
    empfohleneWerke: ["sturm","himmelsnetz","schwarz"],
    werkeTitle: 'Empfohlene Werke für <em>Hotels & Foyers</em>',
    quote: "Wer in ein Hotel eintritt und sofort ein Bild bemerkt, das ihn berührt, hat in diesem Moment bereits entschieden: Hier bin ich richtig.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Warum Hotels auf <em>Originale</em> setzen sollten.',
    checklistIntro: "Die Investition in handgemalte Kunst rechnet sich — nicht nur ästhetisch, sondern auch wirtschaftlich.",
    checklist: [
      "<strong>Unverwechselbar</strong>: Kein anderes Hotel der Welt hat dasselbe Werk. Das Bild wird zum ikonischen Element Ihres Hauses.",
      "<strong>Instagram-Moment</strong>: Großformatige, auffällige Originalgemälde werden fotografiert und geteilt — kostenlose Reichweite mit Qualitätspositionierung.",
      "<strong>Langlebig</strong>: Acryl auf Leinwand ist lichtecht, robust und über Jahrzehnte haltbar. Kein Austausch, kein Verblassen.",
      "<strong>Skalierbar</strong>: Von der einzelnen Lobby bis zur kompletten Ausstattung aller Etagen — ich arbeite projektbasiert und liefere abgestimmt.",
      "<strong>Corporate Design</strong>: Farbpalette und Stimmung werden auf Ihre Marke abgestimmt. Das Werk verstärkt Ihre Identität, statt ihr zu widersprechen.",
      "<strong>Persönliche Beratung</strong>: Auf Wunsch komme ich für einen Raumcheck vorbei und berate vor Ort zur optimalen Platzierung."
    ],
    ctaTitle: 'Machen Sie Ihre Lobby <em>unvergesslich.</em>',
    ctaText: "Ob einzelnes Statement-Werk oder komplettes Kunstkonzept für Ihr Haus — ich berate Sie persönlich und unverbindlich.",
    faqs: [
      { q:"Können Sie mehrere Werke für verschiedene Bereiche liefern?", a:"Ja, ich arbeite projektbasiert. Lobby, Flure, Suiten, Konferenzräume — alle Werke werden aufeinander und auf Ihr Gesamtkonzept abgestimmt." },
      { q:"Welche Formate empfehlen Sie für Hotellobbys?", a:"Für Lobbys mit Raumhöhen ab 3 Metern empfehle ich Formate ab 140 × 100 cm, idealerweise 180 × 120 cm oder größer. Das Werk muss den Raum besetzen, nicht in ihm verschwinden." },
      { q:"Liefern Sie deutschlandweit?", a:"Ja, deutschlandweit und in alle EU-Länder. Großformate werden professionell verpackt und versichert versendet. Auf Wunsch liefere ich persönlich und hänge das Werk vor Ort." }
    ],
    serviceType: "Originalgemälde für Hotels und Foyers"
  },
  {
    slug: "kunst-therapiepraxis",
    navLabel: "03 · Therapie",
    title: "Wandkunst für Therapiepraxen",
    metaTitle: "Kunst für Therapiepraxen — beruhigende Gemälde für den Therapieraum · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Therapiepraxen und Beratungsräume. Kunst, die innere Offenheit fördert. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-therapiepraxis",
    heroEyebrow: "Kunst für Therapiepraxen",
    h1: 'Wandkunst für die <em>Therapie</em> —<br>Raum als <span class="stroke">therapeutisches</span><br>Instrument.',
    heroLead: "In der Therapie beginnt die Arbeit, bevor das Gespräch startet. Der Raum gibt den Ton an — Offenheit oder Verschlossenheit, Vertrauen oder Distanz. Kunst kann diesen Ton setzen.",
    heroP1: "Beruhigende Farben, organische Formen und fließende Strukturen unterstützen den Zustand innerer Offenheit, den jede gute Therapiesitzung braucht. Nicht als Ablenkung, sondern als visueller Anker.",
    heroP2: "Studio Visus entwickelt Werke für Psychotherapiepraxen, Coaching-Räume, Beratungsstellen und psychiatrische Einrichtungen — mit besonderem Augenmerk auf Farbwirkung und emotionale Neutralität.",
    imgGrad1: "linear-gradient(135deg, #3a4a6b, #8aa5b8)",
    imgGrad2: "linear-gradient(135deg, #5a6d4a, #c9bfae)",
    problemTitle: 'Was der Raum <em>über die Therapie</em> erzählt.',
    problemP1: "<strong>Klienten lesen Räume unbewusst.</strong> Ein kahler, funktionaler Raum signalisiert: Hier geht es um Effizienz, nicht um mich. Ein überladener Raum signalisiert: Hier ist kein Platz für meine Themen.",
    problemP2: "Das richtige Bild schafft eine dritte Option: einen Raum, der offen ist, ohne leer zu sein. Der einlädt, ohne zu drängen. Der Sicherheit vermittelt, ohne zu behaupten. Genau das ist die Aufgabe eines Werks in einem therapeutischen Kontext.",
    points: [
      { ico:"α", title:"Emotionale Neutralität", text:"Die Werke arbeiten bewusst nicht gegenständlich. Kein Motiv, das Assoziationen erzwingt. Stattdessen offene Formen, die jeder Klient anders lesen darf." },
      { ico:"β", title:"Parasympathische Aktivierung", text:"Organische Formen und biophile Farbtöne aktivieren den Parasympathikus — den Teil des Nervensystems, der für Entspannung und Sicherheit zuständig ist." },
      { ico:"γ", title:"Visueller Anker", text:"Ein Werk an der Wand gibt dem Blick einen Haltepunkt in schwierigen Momenten — ein Ort, an dem die Augen ruhen können, ohne dass der Kontakt verloren geht." }
    ],
    studiesTitle: 'Raum und <em>Psyche</em> — was die Forschung zeigt.',
    studiesIntro: "Die Wirkung der räumlichen Umgebung auf den therapeutischen Prozess ist in der Fachliteratur gut dokumentiert.",
    studies: [
      { year:"Pressly & Heesacker, 2001", title:"Raumgestaltung und therapeutische Beziehung", text:"Die physische Umgebung eines Therapieraums hat einen messbaren Einfluss auf die Qualität der therapeutischen Allianz und die Bereitschaft zur Selbstöffnung.", source:"Journal of Counseling Psychology" },
      { year:"Dijkstra et al., 2006", title:"Farbe und Stresserleben", text:"Kühlere, natürliche Farbtöne in Gesundheitsumgebungen reduzierten den selbstberichteten Stress und erhöhten das subjektive Wohlbefinden signifikant.", source:"Building and Environment" },
      { year:"Gross et al., 2004", title:"Kunstbetrachtung als Regulationsstrategie", text:"Ästhetische Erfahrungen aktivieren Hirnareale, die mit emotionaler Regulation und Selbstreflexion assoziiert sind — Fähigkeiten, die im therapeutischen Prozess zentral sind.", source:"NeuroImage" }
    ],
    empfohleneWerke: ["boot","olive","schneewiese"],
    werkeTitle: 'Empfohlene Werke für <em>Therapieräume</em>',
    quote: "Das beste Bild in einem Therapieraum ist eines, das der Klient nach drei Sitzungen immer noch anders sieht als beim ersten Mal.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Was ein Werk im <em>Therapieraum</em> leisten sollte.',
    checklistIntro: "Nicht jedes Bild eignet sich für therapeutische Kontexte. Die folgenden Kriterien sind die Grundlage, nach der Studio Visus Werke für Therapiepraxen entwickelt.",
    checklist: [
      "<strong>Abstrakt, nicht leer</strong>: Das Werk bietet visuelle Anregung, ohne eine bestimmte emotionale Reaktion zu erzwingen.",
      "<strong>Farblich beruhigend</strong>: Keine stimulierenden Rot- oder Gelbtöne. Stattdessen Blau, Grün, Sand und gedeckte Erdtöne.",
      "<strong>Organische Formen</strong>: Keine scharfen Kanten, keine geometrische Strenge. Fließende Linien, die das Nervensystem zur Ruhe bringen.",
      "<strong>Richtige Größe</strong>: Groß genug, um den Raum zu prägen. Klein genug, um nicht zu dominieren. Für die meisten Praxisräume ideal: 80 × 100 cm bis 120 × 160 cm.",
      "<strong>Haptische Oberfläche</strong>: Die Textur eines echten Gemäldes erzeugt eine andere Raumwirkung als ein flacher Druck — subtil, aber spürbar.",
      "<strong>Keine Trigger-Motive</strong>: Bewusster Verzicht auf Darstellungen, die bei vulnerablen Klienten Assoziationen auslösen könnten."
    ],
    ctaTitle: 'Einen Raum schaffen, der <em>Heilung</em> unterstützt.',
    ctaText: "Ob ein einzelnes Werk für Ihren Therapieraum oder die Ausstattung einer ganzen Praxis — ich berate Sie vertraulich und unverbindlich.",
    faqs: [
      { q:"Welche Farben eignen sich für Therapieräume?", a:"Gedeckte Naturtöne: Blau, Grün, Sand, warmes Grau. Rot, Orange und kräftiges Gelb vermeiden — sie aktivieren statt zu beruhigen. Ich stimme die Farbpalette auf Ihren Raum ab." },
      { q:"Sollte das Werk abstrakt sein?", a:"Für therapeutische Kontexte empfehle ich abstrakte Werke, weil sie keine Assoziationen erzwingen. Jeder Klient kann sein eigenes Erleben in das Bild projizieren — oder es einfach als visuellen Ruhepunkt nutzen." },
      { q:"Kann ich ein Auftragswerk für meinen Praxisraum bestellen?", a:"Ja, ich entwickle Werke gezielt für therapeutische Umgebungen. Format, Farbwelt und Stimmung werden auf Ihren Raum und Ihre Arbeit abgestimmt. Das Gespräch ist kostenlos." }
    ],
    serviceType: "Originalgemälde für Therapiepraxen und Beratungsräume"
  },
  {
    slug: "kunst-buero",
    navLabel: "04 · Büro",
    title: "Kunstwerke für Büros & Meeting-Räume",
    metaTitle: "Kunst für Büros & Meeting-Räume — Originalgemälde für Unternehmen · Studio Visus",
    metaDesc: "Handgemalte Originalgemälde für Büros, Besprechungsräume und Empfangsbereiche. Kunst, die beruhigt und Qualität signalisiert. Aus dem Atelier in Hamburg.",
    canonical: "https://www.studiovisus.de/kunst-buero",
    heroEyebrow: "Kunst für Büros & Unternehmen",
    h1: 'Kunst für <em>Büros</em> —<br>angepasst auf Ihr<br><span class="stroke">Corporate Design.</span>',
    heroLead: "Besprechungsräume und Open-Space-Büros profitieren von visueller Entspannung. Ein Originalgemälde beruhigt, ohne einzuschläfern — und signalisiert gleichzeitig Qualität und Haltung.",
    heroP1: "In einer Zeit, in der Unternehmen um Talente konkurrieren, ist die Arbeitsumgebung ein Argument. Studien zeigen: Mitarbeitende in ästhetisch gestalteten Räumen sind produktiver, zufriedener und seltener krank.",
    heroP2: "Studio Visus entwickelt Werke für Empfangsbereiche, Konferenzräume, Open-Space-Büros und Führungsetagen — abgestimmt auf Ihre Marke, Ihre Architektur und die Menschen, die darin arbeiten.",
    imgGrad1: "linear-gradient(135deg, #4a4339, #a8482a)",
    imgGrad2: "linear-gradient(135deg, #6b5840, #c69a4a)",
    problemTitle: 'Warum Büros mehr brauchen als <em>weiße Wände.</em>',
    problemP1: "<strong>Räume prägen Verhalten.</strong> Ein steriler Besprechungsraum fördert sterile Ideen. Ein Raum mit visuellem Ankerpunkt fördert Fokus, Kreativität und konstruktive Gespräche.",
    problemP2: "Die meisten Büros investieren in Technik und Möbel — und vergessen dabei den größten Faktor für Raumwirkung: die Wände. Ein einziges Originalgemälde kann einen Raum grundlegend verändern — von funktional zu inspirierend.",
    points: [
      { ico:"α", title:"Produktivität & Wohlbefinden", text:"Mitarbeitende in ästhetisch gestalteten Büros berichten von höherer Arbeitszufriedenheit und niedrigerem Stresserleben — ein direkter Beitrag zur Mitarbeiterbindung." },
      { ico:"β", title:"Kundenwahrnehmung", text:"Ein Empfangsbereich mit Originalkunst wird als hochwertiger und professioneller wahrgenommen. Der erste Eindruck auf Kunden und Partner beginnt an der Wand." },
      { ico:"γ", title:"Corporate Identity", text:"Ein Auftragswerk kann die Farbpalette, Werte und Haltung Ihres Unternehmens visuell übersetzen — subtiler und dauerhafter als jedes Branding-Element." }
    ],
    studiesTitle: 'Kunst am Arbeitsplatz — die <em>Datenlage.</em>',
    studiesIntro: "Der Einfluss von Raumgestaltung auf Produktivität und Wohlbefinden am Arbeitsplatz ist eines der am besten erforschten Felder der Umweltpsychologie.",
    studies: [
      { year:"Knight & Haslam, 2010", title:"Raumgestaltung und Produktivität", text:"Mitarbeitende in gestalteten Büros waren bis zu 32% produktiver als in funktional-minimalistischen Umgebungen. Der Effekt war am stärksten, wenn sie Einfluss auf die Gestaltung nehmen konnten.", source:"Journal of Experimental Psychology: Applied" },
      { year:"Nieuwenhuis et al., 2014", title:"Pflanzen und Kunst im Büro", text:"Die Anwesenheit von Pflanzen und Kunst im Arbeitsumfeld steigerte die Arbeitszufriedenheit und die kognitive Leistungsfähigkeit signifikant.", source:"Journal of Experimental Psychology: Applied" },
      { year:"Kaplan, 1995", title:"Attention Restoration Theory", text:"Natürliche und naturähnliche visuelle Reize (wie abstrakte Kunst mit organischen Formen) helfen, die gerichtete Aufmerksamkeit zu regenerieren — ideal für Meetingräume zwischen konzentrierten Arbeitsphasen.", source:"Environment and Behavior" }
    ],
    empfohleneWerke: ["schwarz","fenster","sturm"],
    werkeTitle: 'Empfohlene Werke für <em>Büro & Besprechung</em>',
    quote: "Der beste Besprechungsraum ist einer, in dem die Teilnehmer drei Sekunden lang schweigend auf die Wand schauen — und dann anfangen, anders zu denken.",
    quoteAttr: "— Studio Visus, Hamburg",
    checklistTitle: 'Kunst im Büro — <em>mehr als Dekoration.</em>',
    checklistIntro: "Ein Originalgemälde im Unternehmenskontext ist eine Investition, die sich auf mehreren Ebenen auszahlt.",
    checklist: [
      "<strong>Employer Branding</strong>: Ästhetisch gestaltete Büros werden auf Kununu, Glassdoor und in Bewerbungsgesprächen positiv hervorgehoben.",
      "<strong>Kunden-Eindruck</strong>: Ein Original im Empfang signalisiert Qualität, Sorgfalt und Haltung — Werte, die auf Ihr Unternehmen abstrahlen.",
      "<strong>Steuerlich absetzbar</strong>: Kunst im Unternehmen ist als Betriebsausgabe steuerlich absetzbar — die tatsächlichen Kosten liegen oft deutlich unter dem Listenpreis.",
      "<strong>CI-Abstimmung</strong>: Farbpalette, Tonalität und Format werden auf Ihr Corporate Design abgestimmt. Das Werk verstärkt Ihre Marke visuell.",
      "<strong>Projektbasiert</strong>: Von der einzelnen Wand bis zur kompletten Etage — ich plane und liefere auf Ihren Zeitplan abgestimmt.",
      "<strong>Langfristiger Wert</strong>: Ein Originalgemälde verliert nicht an Wert. Anders als Technik oder Möbel ist Kunst eine Investition, die sich über Jahrzehnte trägt."
    ],
    ctaTitle: 'Bereit, Ihre Räume auf <em>Ihr Niveau</em> zu bringen?',
    ctaText: "Ob einzelnes Statement-Werk für den Empfang oder ein Konzept für alle Etagen — ich berate Sie persönlich und unverbindlich.",
    faqs: [
      { q:"Ist Kunst im Unternehmen steuerlich absetzbar?", a:"Ja, Kunstwerke unter 800 € netto können als geringwertige Wirtschaftsgüter sofort abgeschrieben werden. Höhere Beträge werden über die Nutzungsdauer abgeschrieben. Sprechen Sie dazu mit Ihrem Steuerberater." },
      { q:"Können Sie mehrere Werke für verschiedene Räume liefern?", a:"Ja, ich arbeite projektbasiert und stimme alle Werke aufeinander ab — sowohl farblich als auch in Format und Stimmung. Auf Wunsch erstelle ich ein Gesamtkonzept für Ihr Büro." },
      { q:"Wie läuft eine Auftragsarbeit für Unternehmen ab?", a:"Nach einem Erstgespräch (vor Ort oder digital) erstelle ich ein Konzept mit Farbpalette, Formatempfehlung und Preisrahmen. Nach Freigabe beginnt der Entstehungsprozess — in der Regel 6 bis 12 Wochen." }
    ],
    serviceType: "Originalgemälde für Büros und Unternehmen"
  }
];

// ===== TEMPLATE =====
function generatePage(page) {
  const empfWerke = getWerke(page.empfohleneWerke);

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
        <h4>${p.title}</h4>
        <p>${p.text}</p>
      </div>`).join('');

  const studiesHtml = page.studies.map(s => `
        <div class="study-card reveal">
          <div class="s-year">${s.year}</div>
          <h4>${s.title}</h4>
          <p>${s.text}</p>
          <span class="source">${s.source}</span>
        </div>`).join('');

  const werkeHtml = empfWerke.map(w => `
          <a class="lp-werk-card reveal" href="werk-${w.slug}.html">
            <div class="frame">
              <img src="${w.img}" alt="${w.title} — ${w.technik}, ${w.breite} × ${w.hoehe} cm">
            </div>
            <h4>${w.title}</h4>
            <div class="specs">${w.technik} · ${w.breite} × ${w.hoehe} cm</div>
            <div class="r-price">${w.preis}</div>
          </a>`).join('');

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
<title>${page.metaTitle}</title>
<meta name="description" content="${page.metaDesc}">

<meta property="og:type" content="website">
<meta property="og:title" content="${page.metaTitle}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:url" content="${page.canonical}">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.metaTitle}">
<meta name="twitter:description" content="${page.metaDesc}">

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

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600&family=Caveat:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/landingpage.css">
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html"><span class="dot"></span> Studio <em>Visus</em></a>
    <div class="nav-links">
      <a href="werke.html">Werke</a>
      <a href="#">Blog</a>
      <a href="ueber.html">Über</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="#">FAQ</a>
    </div>
    <a href="kontakt.html?art=sonstiges" class="nav-cart">Werk anfragen →</a>
  </div>
</nav>

<!-- HERO -->
<section class="lp-hero">
  <div class="lp-hero-text">
    <div class="lp-eyebrow">${page.heroEyebrow}</div>
    <h1>${page.h1}</h1>
    <p class="lp-hero-lead">${page.heroLead}</p>
    <p>${page.heroP1}</p>
    <p>${page.heroP2}</p>
    <div class="lp-hero-cta">
      <a href="werke.html" class="btn btn-primary">Verfügbare Werke ansehen →</a>
      <a href="kontakt.html" class="btn btn-ghost">Auftragswerk anfragen</a>
    </div>
  </div>
  <div class="lp-hero-img">
    <div class="img-main"><div class="bg" style="background:${page.imgGrad1}"></div></div>
    <div class="img-float"><div class="bg" style="background:${page.imgGrad2}"></div></div>
    <div class="scribble" style="top:20px; right:-30px; z-index:3;">jedes Werk<br>ein Unikat ✦</div>
  </div>
</section>

<!-- PROBLEM / SOLUTION -->
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
      <a href="werke.html">Alle Werke ansehen →</a>
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
      <div class="sec-eyebrow">Warum ein Original?</div>
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
      <a href="kontakt.html" class="btn btn-primary">Jetzt Kontakt aufnehmen →</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand">Studio <em>Visus</em></div>
      <div class="foot-tag">Handgemalte Unikate für Räume, in denen Atmosphäre zählt.</div>
    </div>
    <div class="foot-col">
      <h4>Standort</h4>
      <p>Lokstedter Höhe 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h4>Kontakt</h4>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="kontakt.html">Kontaktformular →</a>
    </div>
    <div class="foot-col">
      <h4>Info</h4>
      <a href="#">Impressum</a>
      <a href="#">Widerrufsrecht</a>
      <a href="#">Datenschutz</a>
      <a href="#">FAQ</a>
    </div>
  </div>
  <div class="foot-bottom">
    <span>&copy; 2026 Studio Visus &middot; Hamburg Lokstedt</span>
    <span>Design-Entwurf &middot; Warm &amp; atelierhaft</span>
  </div>
</footer>

<script src="js/main.js"></script>
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
