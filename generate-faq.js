#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const categories = [
  {
    id: "grundlagen",
    num: "01",
    title: "Grundlagen und <em>Studio Visus</em>",
    navLabel: "Grundlagen",
    items: [
      {
        q: "Was ist Studio Visus?",
        a: `<p>Ein Atelier in Hamburg Lokstedt. Hier entstehen handgemalte Originalgemälde, deren Gestaltung auf Erkenntnissen der Neuroästhetik und Wahrnehmungspsychologie beruht. Die Werke sind für Räume gedacht, in denen Menschen warten, ankommen oder zur Ruhe kommen sollen: Arztpraxen, Kliniken, Therapieräume, Hotelfoyers, Empfangsbereiche, Büros, private Wohnräume.</p><p>Jedes Bild ist ein Unikat. Acryl Pouring, Fluid Art, klassische Ölmalerei, Strukturpasten. Verbunden werden die Werke nicht durch eine Technik, sondern durch eine Haltung: Jeder Pinselstrich hat einen Grund. Und dieser Grund liegt in der Forschung darüber, wie das menschliche Gehirn visuelle Reize verarbeitet.</p>`
      },
      {
        q: "Was bedeutet evidenzbasierte Kunst?",
        a: `<p>Evidenzbasierte Kunst orientiert sich an empirischer Forschung. Es geht darum, welche visuellen Reize beim Betrachter messbar Stress senken, den Parasympathikus aktivieren oder Cortisol reduzieren. Farbe, Form, Komposition und Oberflächentextur werden gezielt so gewählt, dass eine neurologisch nachweisbare Reaktion eintritt.</p><p>Drei Forschungsfelder bilden die Grundlage: die <strong>Neuroästhetik</strong> (wie das Gehirn auf ästhetische Reize reagiert), die <strong>Umweltpsychologie</strong> (das Verhältnis von Raum und Wohlbefinden) und das <strong>Evidence Based Design</strong> (Planungsentscheidungen auf Basis von Studienlage statt Intuition).</p>`
      },
      {
        q: "Wer steht hinter Studio Visus?",
        a: `<p>Studio Visus wird von Jan-Niclas Bardenhagen geführt. Er hat Wirtschaftsingenieurwesen und Wirtschaftsinformatik studiert, denkt in Systemen und findet seinen tiefsten Ausgleich im Wald. Zur Malerei kam er durch einen Zufall: Eine Leinwand, für ein Hochzeitsspiel besorgt und nie benutzt, stand lange in seiner Wohnung. Aus Neugier griff er zum Spachtel. Aus dem ersten Versuch wurden viele. Aus dem Hobby wurde Studio Visus.</p>`
      },
      {
        q: "Wo befindet sich das Atelier?",
        a: `<p>Lokstedter Höhe 11e, 22529 Hamburg. Das Atelier liegt in Hamburg Lokstedt, nahe Eimsbüttel und Stellingen. Wer ein Werk vor dem Kauf im Original sehen will, kann nach Absprache vorbeikommen.</p>`
      },
      {
        q: "Liefert Studio Visus deutschlandweit?",
        a: `<p>Ja. Versand erfolgt bundesweit. In Hamburg und Umgebung wird auf Wunsch persönlich angeliefert und montiert. Größere Werke gehen per Spedition, kleinere Formate per Versanddienstleister mit Sonderhandling.</p>`
      }
    ]
  },
  {
    id: "wirkung",
    num: "02",
    title: "Wirkung und <em>Wissenschaft</em>",
    navLabel: "Wissenschaft",
    items: [
      {
        q: "Beruhigt Kunst wirklich? Was sagt die Forschung?",
        a: `<p>Die Studienlage dazu reicht vier Jahrzehnte zurück. Die wegweisende Arbeit stammt von Roger Ulrich (1984): Patienten mit Parkblick nach Operationen benötigten weniger Schmerzmittel und wurden im Schnitt einen Tag früher entlassen als Patienten mit Blick auf eine Betonmauer.</p><p>Spätere Forschung hat verfeinert, welche visuellen Reize konkret wirken: fraktale Muster mittlerer Komplexität, biophile Farbpaletten, kurvige Formen, texturierte Oberflächen.</p><span class="cite">Ulrich, R. S. (1984). View through a window may influence recovery from surgery. Science, 224(4647).</span>`
      },
      {
        q: "Was ist Neuroästhetik?",
        a: `<p>Ein Forschungsfeld an der Schnittstelle von Neurowissenschaft, Psychologie und Kunstgeschichte. Untersucht wird, wie das menschliche Gehirn auf ästhetische Reize reagiert. Die zentrale Annahme: Diese Reaktionen sind nicht zufällig, sondern folgen universellen Mustern.</p><p>Für Studio Visus ist die Neuroästhetik kein theoretischer Überbau. Sie ist das Werkzeug, mit dem die Werke entstehen. Welche Form löst welche Reaktion aus? Welche Farbe beruhigt, welche aktiviert? Welche Textur bindet den Blick?</p><span class="cite">Leder, H. et al. (2004). A model of aesthetic appreciation and aesthetic judgments. British Journal of Psychology.</span>`
      },
      {
        q: "Was sind Fraktale, und warum wirken sie beruhigend?",
        a: `<p>Fraktale sind Muster, in denen sich Strukturen auf unterschiedlichen Größenebenen wiederholen. In der Natur begegnen sie uns überall: Baumverästelung, Küstenlinien, Wolkenformen, Korallen, Blattadern, Wellen. Das menschliche Gehirn ist evolutionär auf diese Muster eingestellt.</p><p>Richard Taylor hat nachgewiesen, dass das Betrachten fraktaler Muster mittlerer Komplexität den physiologischen Stress um bis zu 60 Prozent senken kann. Acryl Pouring und Fluid Art erzeugen solche Strukturen direkt aus dem Fließverhalten der Farben. Genau das macht sie für stressbelastete Räume so wirksam.</p><span class="cite">Taylor, R. P. (2006). Reduction of Physiological Stress Using Fractal Art and Architecture. Leonardo, 39(3).</span>`
      },
      {
        q: "Welche Farben beruhigen am stärksten?",
        a: `<p>Farben aus dem kühlen Spektrum. Vor allem Blau, Petrol und gedämpftes Grün, dazu sandige Erdtöne. Diese Töne aktivieren den Parasympathikus, also den Teil des Nervensystems, der Erregung herunterreguliert.</p><p>Studio Visus arbeitet selten mit reinen Farben. Stattdessen kommen Gradienten und Mischpaletten zum Einsatz, in denen Blau, Salbei, Sand und Petrol ineinanderfließen.</p><span class="cite">Elliot, A. J. & Maier, M. A. (2014). Color Psychology. Annual Review of Psychology.</span>`
      },
      {
        q: "Was ist Healing Architecture?",
        a: `<p>Ein Planungsansatz, der davon ausgeht, dass die gebaute Umgebung den Heilungsverlauf von Patienten messbar beeinflusst. Licht, Akustik, Material, Farbe und Kunst werden dabei nicht als Beiwerk verstanden, sondern als medizinisch wirksame Faktoren.</p><p>Im deutschsprachigen Raum gewinnt der Ansatz in Kliniken und größeren Praxen zunehmend an Boden. Die wirtschaftlichen Effekte sind dokumentiert: kürzere Verweildauern, weniger Medikamentenbedarf, höhere Patientenzufriedenheit.</p>`
      },
      {
        q: "Was ist Evidence Based Design?",
        a: `<p>Evidence Based Design überträgt das Prinzip der evidenzbasierten Medizin auf die Architektur. Statt ein Wartezimmer nach Geschmack einzurichten, werden Entscheidungen über Material, Farbe und Bildauswahl auf Basis publizierter Studien getroffen.</p><p>Bei Studio Visus entsteht ein Werk für ein Wartezimmer nicht aus der Frage „Was gefällt mir gerade?", sondern aus der Frage „Was ist in dieser Situation für diese Räumlichkeit nachweislich wirksam?".</p>`
      },
      {
        q: "Was ist biophiles Design?",
        a: `<p>Ein Gestaltungsprinzip, das die menschliche Verbundenheit mit Natur in Innenräume zurückträgt. Pflanzen, natürliche Materialien, Tageslicht und Bilder mit naturanalogen Mustern spielen dabei zusammen.</p><p>Wandkunst gehört zu den kostengünstigsten und wirkungsvollsten Maßnahmen biophilen Designs. Eine Pflanze braucht Pflege. Ein Werk auf Leinwand hängt über Jahrzehnte und wirkt vom ersten Tag an.</p><span class="cite">Salingaros, N. A. (2006). A Theory of Architecture.</span>`
      },
      {
        q: "Was bedeutet visuelle Sedierung?",
        a: `<p>Damit ist gemeint, dass gezielt gewählte Bildwelten die psychische und physische Erregung eines Betrachters reduzieren können, ganz ohne pharmakologische Wirkstoffe. Noch bevor ein Patient den Behandlungsraum betritt, soll der Wartebereich Spannung senken.</p><p>Die Werke von Studio Visus werden explizit für diesen Effekt entwickelt: niedrige visuelle Reizdichte, gedämpfte Paletten, kurvige Konturen, mittlere Komplexität.</p>`
      },
      {
        q: "Warum wirken kurvige Formen sicherer als eckige?",
        a: `<p>Das Gehirn bewertet visuelle Reize innerhalb von Millisekunden auf potenzielle Bedrohung. Spitze Winkel und scharfe Ecken lösen eine stärkere Aktivierung der Amygdala aus, also der Hirnregion für Angstreaktionen. Runde Formen dagegen werden als Sicherheitssignal verarbeitet.</p><p>Deshalb verzichten die Werke aus dem Atelier auf harte Geometrien. Stattdessen dominieren fließende, organische Konturen.</p><span class="cite">Bar, M. & Neta, M. (2006). Humans prefer curved visual objects. Psychological Science, 17(8).</span>`
      },
      {
        q: "Was hat Textur mit Wirkung zu tun?",
        a: `<p>Bilder mit sichtbarer Pinselführung und Reliefstrukturen aktivieren beim Betrachten dieselben neuronalen Netzwerke, die beim tatsächlichen Berühren einer Oberfläche feuern würden. In der Forschung spricht man von <strong>verkörperter Simulation</strong>.</p><p>Ein Druck kann diesen Effekt nicht auslösen. Nur ein Original mit tatsächlicher Oberflächenstruktur erzeugt diese Spiegelaktivität. Das ist einer der zentralen Gründe, warum Studio Visus ausschließlich Originale herstellt.</p><span class="cite">Freedberg, D. & Gallese, V. (2007). Motion, emotion and empathy in esthetic experience. Trends in Cognitive Sciences, 11(5).</span>`
      },
      {
        q: "Was ist Processing Fluency?",
        a: `<p>Processing Fluency beschreibt, wie leicht das Gehirn eine visuelle Information verarbeiten kann. Je flüssiger die Verarbeitung, desto positiver fällt die emotionale Bewertung aus. Wir mögen, was unser Gehirn ohne Anstrengung lesen kann.</p><p>Organische Wiederholungen, etwa wie in Tannenzapfen oder Wabenstrukturen, sind vorhersehbar genug, um Sicherheit zu signalisieren. Gleichzeitig variieren sie ausreichend, um nicht zu langweilen. Genau diese Balance suchen viele Werke aus dem Atelier.</p><span class="cite">Reber, R. et al. (2004). Processing fluency and aesthetic pleasure. Personality and Social Psychology Review, 8(4).</span>`
      }
    ]
  },
  {
    id: "arztpraxis",
    num: "03",
    title: "Für <em>Arztpraxen</em>, Zahnärzte, Kliniken",
    navLabel: "Arztpraxen",
    items: [
      {
        q: "Welche Bilder eignen sich wirklich für ein Wartezimmer?",
        a: `<p>Geeignet sind Werke mit beruhigender Farbpalette (Blau, Salbei, Sand, Petrol), mit organischen oder fraktalen Strukturen und mittlerer visueller Komplexität. Nicht geeignet: kontraststarke Werke mit aggressiver Farbgebung, politische oder religiöse Motive und alles, was Unsicherheit auslösen könnte.</p><p>Originalgemälde werden in Praxen anders wahrgenommen als Drucke. Sie signalisieren, dass die Praxis ihren Räumen Bedeutung beimisst.</p>`
      },
      {
        q: "Wie viele Bilder gehören in ein Wartezimmer?",
        a: `<p><strong>Faustregel:</strong> Ein großformatiges Hauptwerk (mindestens 100 x 80 cm) als visueller Anker. Dazu, wenn die Wandfläche es hergibt, ein bis zwei kleinere Werke. Mehr ist meistens weniger. Überfüllte Wände erzeugen visuelle Reizdichte, und genau die soll ja gesenkt werden.</p><p><strong>Hängehöhe:</strong> Die Bildmitte sollte auch im Sitzen gut sichtbar bleiben. Bei stehendem Publikum 145 bis 155 cm über dem Boden. Im Wartezimmer darf die Mitte 5 bis 10 cm tiefer liegen.</p>`
      },
      {
        q: "Welche Bilder eignen sich für eine Zahnarztpraxis?",
        a: `<p>Zahnarztpatienten zeigen vor und während der Behandlung erhöhte Stressmarker (Dental Anxiety). Hilfreich sind Werke mit weiten, ruhigen Kompositionen: angedeutete Horizonte, Wasseroberflächen, geschwungene Formen in kühlen Tönen.</p><p>Vermeiden sollte man Werke mit visueller Unruhe, kräftigen Rotflächen und harten Kontrasten. Rot aktiviert. Im Behandlungsstuhl ist Aktivierung das Gegenteil dessen, was Patienten brauchen.</p>`
      },
      {
        q: "Welche Bilder eignen sich für eine Kinderarztpraxis?",
        a: `<p>Die Bilder müssen Kinder ansprechen, dürfen aber nicht kindisch wirken, weil Eltern länger im Raum sitzen. Figurative Andeutungen funktionieren gut: Tiere, Pflanzen, Himmelsmotive, Wolken. Warme, aber nicht knallige Farben.</p><p>Klassische Cartoon-Motive aus Mainstream-Franchises wirken kurzfristig freundlich. Langfristig schaffen sie den Eindruck einer Praxis, die ihre Patienten nicht ganz ernst nimmt.</p>`
      },
      {
        q: "Welche Bilder passen in eine Psychotherapie-Praxis?",
        a: `<p>Geeignet sind Werke, die innere Ruhe und Offenheit unterstützen, ohne zu deuten oder zu dominieren. Abstrakte Kompositionen mit organischen Strukturen und gedämpfter Farbgebung funktionieren am besten.</p><p>Vermieden werden sollten Werke mit klar lesbarer narrativer Botschaft. Ein Bild mit eindeutiger Symbolik wirkt im Therapiegespräch wie ein dritter Gesprächspartner. Studio Visus entwickelt für Therapieräume bewusst zurückhaltende, atmende Werke.</p>`
      },
      {
        q: "Welche Bilder eignen sich für eine Klinik oder ein Krankenhaus?",
        a: `<p>Im Klinikkontext kommen mehrere Anforderungen zusammen. Die Werke müssen über Jahre auf ein heterogenes Publikum wirken, Brandschutzklassen erfüllen (häufig B1 oder B2), hygienisch reinigbar und kulturell anschlussfähig sein.</p><p>Bewährt haben sich naturanaloge Werke mit fraktalen Strukturen, biophilen Farben und mittlerer Komplexität. Studio Visus arbeitet hier eng mit Architekten, Innenplanern und Hygienebeauftragten zusammen.</p>`
      },
      {
        q: "Was kostet ein Originalgemälde für eine Arztpraxis?",
        a: `<p>Grobe Orientierung: Kleinere Formate (ca. 60 x 80 cm) ab etwa 800 Euro. Mittlere Formate (ca. 120 x 90 cm) zwischen 1.500 und 3.500 Euro. Großformatige Werke (ab 150 x 120 cm) ab rund 3.500 Euro, nach oben offen.</p><p>Auftragsarbeiten werden individuell kalkuliert. Konkrete Preise gibt es immer erst nach Erstgespräch und Briefing.</p>`
      },
      {
        q: "Sind Originalgemälde steuerlich absetzbar?",
        a: `<p>In den meisten Fällen ja, wenn die Werke nachweislich in den Praxisräumen hängen und der Praxisausstattung dienen. Üblich ist die Abschreibung über die Nutzungsdauer (steuerlich meist 15 Jahre).</p><p>Die Frage gehört allerdings auf den Schreibtisch des eigenen Steuerberaters. Studio Visus stellt eine ordnungsgemäße Rechnung mit allen steuerlich relevanten Angaben aus.</p>`
      },
      {
        q: "Wie unterscheidet sich ein Original von einem Druck im Praxisalltag?",
        a: `<p>Drucke sind Massenware. Manche Motive hängen in Hunderten Praxen gleichzeitig. Patienten registrieren das, ob bewusst oder unbewusst. Ein Originalgemälde signalisiert Sorgfalt und Anspruch. Dieser Eindruck überträgt sich auf die wahrgenommene medizinische Leistung.</p><p>Hinzu kommt der Textureffekt: Originale aktivieren das Spiegelneuronen-System. Bei Reproduktionen bleibt dieser Effekt aus.</p>`
      },
      {
        q: "Kann ein Werk auf das Corporate Design der Praxis abgestimmt werden?",
        a: `<p>Ja. Das ist einer der häufigsten Auftragstypen. Farbpalette, Format, Bildsprache und Stimmung werden auf das visuelle Erscheinungsbild der Praxis abgestimmt. Vom Logo über Wand- und Möbelfarben bis zum Praxisleitbild.</p><p>Studio Visus arbeitet dabei mit Raumfotos, Materialproben und idealerweise einem Besuch vor Ort.</p>`
      }
    ]
  },
  {
    id: "hotel",
    num: "04",
    title: "Für <em>Hotels</em>, Foyers, Lobbys",
    navLabel: "Hotels",
    items: [
      {
        q: "Welche Kunst eignet sich für ein Hotelfoyer?",
        a: `<p>Großformatige Werke mit erkennbarer künstlerischer Handschrift, in ruhiger Farbgebung. Wichtig ist, dass sie aus mehreren Metern Entfernung wirken. Bei Premiumhotels sind Originale die naheliegende Wahl, weil sie ein Versprechen einlösen, das Massendrucke nicht einlösen können: Das Haus hat eine eigene Geschichte und ist keine Filiale.</p>`
      },
      {
        q: "Wie wählt man Kunst für ein Hotelzimmer?",
        a: `<p>Hotelzimmer brauchen Werke, die beruhigen, ohne zu langweilen. Gäste sehen sie über Stunden, manchmal Tage. Ruhige abstrakte Werke mit weicher Farbgebung sind empfehlenswert. Direkt im Sichtfeld vom Bett sollte man auf starke Provokation und harte Kontraste verzichten.</p><p>Originalgemälde in Hotelzimmern sind ein klares Premiumsignal. In Boutique- und Designhotels werden sie zunehmend bewusst eingesetzt.</p>`
      },
      {
        q: "Lohnt sich Originalkunst in einem Boutique Hotel?",
        a: `<p>Gerade dort. Boutique Hotels positionieren sich über Authentizität, Stil und Charakter. Genau das, was Kettenkonzepte nicht nachbauen können. Originale erhöhen den wahrgenommenen Wert, tauchen in Gästebewertungen auf und generieren Social-Media-Reichweite.</p><p>Über höhere Belegungsraten und Premiumpreise amortisiert sich die Investition oft schneller als erwartet.</p>`
      },
      {
        q: "Kann eine Hotelkette mehrere Werke in einer Serie beauftragen?",
        a: `<p>Ja. Studio Visus entwickelt Werkserien für Häuser mit mehreren Zimmern oder Standorten. Denkbar sind durchgehende Farbpaletten bei variierten Motiven oder vollständig individuelle Werke pro Raum mit einem gemeinsamen konzeptionellen Faden. Bei Bedarf mit Künstlersignatur und Echtheitszertifikat pro Werk.</p>`
      }
    ]
  },
  {
    id: "buero",
    num: "05",
    title: "Für <em>Büros</em>, Kanzleien, Unternehmen",
    navLabel: "Büros",
    items: [
      {
        q: "Welche Kunst für ein Büro oder einen Besprechungsraum?",
        a: `<p>Im Bürokontext muss Kunst zwei Aufgaben gleichzeitig erfüllen: Konzentration unterstützen (also nicht ablenken) und Repräsentation signalisieren (besonders in Räumen mit Kundenkontakt).</p><p>Was gut funktioniert: dezent strukturierte abstrakte Werke in gedämpften Farben. Sie ermüden das Auge nicht, geben Video-Calls einen ruhigen Hintergrund und kommunizieren bei Besuch eine Haltung.</p>`
      },
      {
        q: "Lohnt sich Originalkunst im Büro?",
        a: `<p>Aus zwei Gründen: <strong>Erstens</strong> zeigen Studien, dass Kunst die wahrgenommene Wertschätzung von Mitarbeitenden erhöht und Stressmarker reduziert. <strong>Zweitens</strong> ist ein Original im Empfangsbereich ein nonverbales Qualitätssignal, das durch kein Marketingmaterial ersetzt werden kann.</p><p>Beide Effekte zahlen sich aus. Über Mitarbeiterbindung, Bewerberanziehung und Abschlussquoten.</p>`
      },
      {
        q: "Kann ein Werk auf unsere Corporate Identity abgestimmt werden?",
        a: `<p>Ja. Farbpalette, Format, Bildsprache und Werkbenennung lassen sich an die CI anpassen. Unternehmen mit mehreren Standorten können eine kohärente Werkserie beauftragen: Jedes Haus bekommt ein eigenes Werk, und doch bleibt ein gemeinsamer roter Faden erkennbar.</p>`
      }
    ]
  },
  {
    id: "privat",
    num: "06",
    title: "Für <em>Privatpersonen</em>",
    navLabel: "Privat",
    items: [
      {
        q: "Lohnt sich ein Originalgemälde für zuhause?",
        a: `<p>Wenn Wohnatmosphäre eine Rolle spielt: absolut. Ein Original ist ein Einzelstück mit Pinselführung, Textur und Geschichte. Es altert nicht wie Polstermöbel und bleibt über Jahrzehnte Teil des Raumes. Viele Käufer berichten, dass das erste Originalgemälde der Beginn einer kleinen, persönlichen Sammlung war.</p>`
      },
      {
        q: "Wie wähle ich das richtige Bild für das Wohnzimmer?",
        a: `<p>Drei Schritte helfen: <strong>Erstens</strong> den Ort identifizieren, meist die größte freie Wand, idealerweise gut beleuchtet. <strong>Zweitens</strong> die Hauptfarbe der Umgebung bestimmen (Möbel, Boden, Wandton). <strong>Drittens</strong> das Format an die Wand anpassen. Ein Werk über einem Möbelstück sollte 60 bis 75 Prozent der Möbelbreite einnehmen.</p><p>Studio Visus berät kostenlos zur Auswahl. Einfach ein Raumfoto schicken, der Rest ergibt sich im Gespräch.</p>`
      },
      {
        q: "Welche Bilder beruhigen im Schlafzimmer?",
        a: `<p>Werke mit gedämpfter Farbpalette, weichen Formen und mittlerer Komplexität. Vermeiden sollte man alles Kontraststarke und Aktivierende, besonders direkt im Sichtfeld vom Bett. Auch klar lesbare Symbolik kann störend wirken.</p><p>Ruhige Pouring-Arbeiten in Blau, Sand oder Salbeigrün sind eine sichere Wahl.</p>`
      },
      {
        q: "Wie groß sollte ein Wandbild im Wohnzimmer sein?",
        a: `<p>60 bis 75 Prozent der Breite des darunterliegenden Möbelstücks. Bei freistehenden Wänden ohne Möbel lieber etwas größer als kleiner planen. Ein zu kleines Werk an einer großen Wand verliert seine Präsenz und wirkt schnell verloren.</p>`
      },
      {
        q: "Wie hängt man ein großformatiges Gemälde richtig auf?",
        a: `<p>Bildmitte auf 145 bis 155 cm Höhe (durchschnittliche Augenhöhe im Stehen). Über Sofas oder Sideboards 20 bis 25 cm Abstand zwischen Möbelkante und Bildunterkante einplanen.</p><p>Schwere Werke brauchen passende Aufhängungen: Stahlnägel oder Schwerlastdübel, je nach Wand und Gewicht. Studio Visus liefert auf Wunsch passende Befestigungssysteme mit.</p>`
      },
      {
        q: "Wie pflege ich ein Originalgemälde?",
        a: `<p>Acrylgemälde sind pflegeleicht. Trocken abstauben mit einem weichen Pinsel oder Mikrofasertuch genügt. Keine Glasreiniger verwenden, keine feuchten Tücher direkt aufs Bild. Direkte Sonneneinstrahlung über Jahre möglichst vermeiden. Eine Schutzfirnis bietet zusätzlichen Schutz gegen Staub und Vergilbung.</p>`
      },
      {
        q: "Sind Originalgemälde eine gute Wertanlage?",
        a: `<p>Originalgemälde etablierter Künstler können im Wert steigen. Primär aber ist ein Gemälde ein ästhetisches und emotionales Investment. Wer Kunst rein als Geldanlage betrachtet, arbeitet besser mit Galerien und Auktionshäusern. Wer ein einzigartiges Werk für das eigene Zuhause möchte, ist beim Atelier direkt am besten aufgehoben: faire Preise, direkter Bezug, persönliche Geschichte zum Werk.</p>`
      }
    ]
  },
  {
    id: "auftrag",
    num: "07",
    title: "<em>Auftragsarbeiten</em>",
    navLabel: "Aufträge",
    items: [
      {
        q: "Wie läuft eine Auftragsarbeit bei Studio Visus ab?",
        a: `<p>Fünf Schritte: <strong>1.</strong> Erstgespräch (telefonisch, per Video oder vor Ort). <strong>2.</strong> Konzept und Skizze mit Farbproben. <strong>3.</strong> Verbindliches Angebot. <strong>4.</strong> Umsetzung im Atelier, auf Wunsch mit Zwischenstand. <strong>5.</strong> Auslieferung, optional mit Montage vor Ort.</p><p>Üblicher Zeitrahmen: 4 bis 10 Wochen, abhängig von Format und Komplexität.</p>`
      },
      {
        q: "Was kostet eine Auftragsarbeit?",
        a: `<p>Richtwerte: Kleinere Werke (ab 80 x 60 cm) ab rund 1.200 Euro. Mittlere Formate (ca. 120 x 90 cm) ab etwa 2.500 Euro. Großformatige Werke (ab 180 x 120 cm) ab rund 4.500 Euro. Komplexe Mehrteiler werden gesondert kalkuliert.</p><p>Nach dem Erstgespräch gibt es ein verbindliches, transparentes Angebot.</p>`
      },
      {
        q: "Wie lange dauert ein Auftragswerk?",
        a: `<p>Meist zwischen 4 und 8 Wochen. Bei großen Formaten oder Serien können 10 bis 14 Wochen anfallen, vor allem wegen Trocknungszeiten. Wer ein zeitkritisches Projekt hat (Praxiseröffnung, Hotelumbau), sollte möglichst früh anfragen.</p>`
      },
      {
        q: "Kann ich Farben oder das Motiv genau vorgeben?",
        a: `<p>Farbpalette, Stimmung, Format und ungefähre Komposition werden vorab gemeinsam festgelegt. Die exakte Gestaltung, also Pinselführung, Mikrostruktur und fraktale Verteilung, bleibt Teil des künstlerischen Prozesses. Genau das macht das Werk am Ende zum Original.</p><p>Eine Auftragsarbeit ist kein konfektioniertes Druckprodukt. Sie ist ein Entstehungsprozess mit definiertem Rahmen und offenem Inneren.</p>`
      },
      {
        q: "Was passiert, wenn mir das fertige Werk nicht gefällt?",
        a: `<p>Studio Visus arbeitet mit Zwischenfreigaben: Nach Skizze und erster Bildstufe gibt es Gelegenheit für Feedback. Größere Richtungswechsel sind in dieser Phase möglich. Sollte ein Ergebnis grob vom Briefing abweichen, findet sich eine faire Lösung.</p>`
      },
      {
        q: "Bekomme ich ein Echtheitszertifikat?",
        a: `<p>Ja. Jedes Werk, ob Galeriewerk oder Auftragsarbeit, wird mit einem nummerierten, signierten Echtheitszertifikat ausgeliefert. Es dokumentiert Titel, Maße, Technik, Entstehungsjahr und Signatur. Relevant für Versicherung, eventuellen Wiederverkauf und steuerliche Nachweise.</p>`
      }
    ]
  },
  {
    id: "praktisches",
    num: "08",
    title: "Praktisches: <em>Versand, Bezahlung, Service</em>",
    navLabel: "Versand & Service",
    items: [
      {
        q: "Wie wird ein Gemälde verpackt und versendet?",
        a: `<p>In stabiler Spezialkartonage oder Holzverpackung mit Eckenschutz, Folierung und Polsterung. Werke bis ca. 120 x 90 cm gehen per Versanddienstleister mit Sonderhandling, größere per Spedition. In Hamburg auf Wunsch auch persönliche Lieferung. Versand innerhalb Deutschlands ist in der Regel im Preis enthalten.</p>`
      },
      {
        q: "Wie lange dauert der Versand?",
        a: `<p>Verfügbare Werke werden innerhalb von 3 bis 7 Werktagen versendet. Auftragsarbeiten je nach Fertigstellung, dann gleicher Versandzeitrahmen. EU-Ausland nach Absprache, außerhalb der EU auf Anfrage.</p>`
      },
      {
        q: "Welche Bezahlmethoden werden akzeptiert?",
        a: `<p>Banküberweisung. Auf Wunsch Rechnung mit Zahlungsziel für gewerbliche Kunden. Bei Auftragsarbeiten ist eine Anzahlung von 30 bis 50 Prozent üblich, der Restbetrag bei Auslieferung. Ratenzahlungen bei größeren Aufträgen nach Absprache möglich.</p>`
      },
      {
        q: "Gibt es ein Rückgaberecht?",
        a: `<p>Für verfügbare Werke gilt das gesetzliche 14-tägige Widerrufsrecht für Verbraucher. Für Auftragsarbeiten ist das Widerrufsrecht gesetzlich ausgeschlossen, da das Werk speziell nach individuellen Vorgaben angefertigt wurde. Details stehen in der Widerrufsbelehrung auf der Website.</p>`
      },
      {
        q: "Können Bilder zur Ansicht auf Probe geliefert werden?",
        a: `<p>Bei verfügbaren Werken ab einem bestimmten Preisniveau: ja. Studio Visus liefert das Werk dann für 7 bis 14 Tage zur Wandprobe. Besonders sinnvoll für gewerbliche Großprojekte und bei XXL-Formaten.</p>`
      },
      {
        q: "Werden auch Bilderrahmen angeboten?",
        a: `<p>Die meisten Werke werden auf hochwertigen Keilrahmen geliefert. Die Seiten sind sauber durchgemalt, das Werk hängt sofort. Auf Wunsch werden Schattenfugenrahmen ergänzt (Eiche, Schwarz, Weiß oder Walnuss).</p>`
      }
    ]
  },
  {
    id: "vergleiche",
    num: "09",
    title: "Vergleiche und <em>häufige Bedenken</em>",
    navLabel: "Vergleiche",
    items: [
      {
        q: "Originalgemälde oder Kunstdruck: was lohnt sich wirklich?",
        a: `<p>Kunstdrucke kosten 50 bis 300 Euro und sind Massenprodukt ohne Textur, ohne Wertbeständigkeit, ohne Künstlerbezug. Originale liegen typischerweise zwischen 800 und 6.000 Euro und bieten Pinselführung, dreidimensionale Textur, Einzigartigkeit und Wertbeständigkeit über Jahrzehnte.</p><p>Für Praxen und Hotels mit Repräsentationsanspruch sind Originale die deutlich bessere Wahl.</p>`
      },
      {
        q: "Lohnt sich ein Original gegenüber einem Print auf Acrylglas?",
        a: `<p>Auch hochwertige Prints auf Acrylglas oder Alu-Dibond bleiben Reproduktionen. Ohne Textur, ohne Pinselführung. Der entscheidende Unterschied: Originale aktivieren das Spiegelneuronen-System, Prints nicht. Wer die volle Wirkung evidenzbasierter Kunst nutzen will, kommt am Original nicht vorbei.</p>`
      },
      {
        q: "Was unterscheidet Studio Visus von anderen Künstlern?",
        a: `<p><strong>Erstens:</strong> Jedes Werk basiert auf konkreten Erkenntnissen der Neuroästhetik, nicht nur auf ästhetischer Schönheit. <strong>Zweitens:</strong> Spezialisierung auf Räume, in denen Beruhigung essenziell ist (Praxen, Therapieräume, Hotels). <strong>Drittens:</strong> Persönliche Beratung direkt durch den Künstler. Kein Galeriezwischenhandel, faire Direktpreise, transparenter Prozess.</p>`
      },
      {
        q: "Macht Kunst wirklich einen wirtschaftlichen Unterschied in einer Praxis?",
        a: `<p>Ja. Praxen mit hochwertiger Innenausstattung erhalten bessere Bewertungen, verzeichnen niedrigere No-Show-Quoten und binden Patienten länger. Bei Hotels lässt sich der Effekt direkt in Belegungsraten und durchschnittlichem Zimmerpreis ablesen.</p><p>Originalgemälde sind keine Kostenstelle, sondern eine Investition mit Renditecharakter. Ideell und ökonomisch.</p>`
      },
      {
        q: "Kommt das nicht zu hochpreisig rüber für meine Patienten?",
        a: `<p>Die Erfahrung weist in die andere Richtung. Hochwertige Kunst signalisiert Sorgfalt. Und dieses Signal überträgt sich auf die wahrgenommene medizinische Leistung. Das schafft Vertrauen, nicht Distanz.</p><p>Wichtig ist die richtige Bildauswahl. Ein zugängliches, beruhigendes Werk wirkt nahbar. Ein elitäres, schwer lesbares Werk wirkt verschlossen. Genau dieser Unterschied ist Teil der Beratung.</p>`
      },
      {
        q: "Wann ist der beste Zeitpunkt, in Praxiskunst zu investieren?",
        a: `<p>Zwei Zeitpunkte sind besonders sinnvoll: bei <strong>Praxisgründung oder größerem Umbau</strong> (direkt ins Gesamtkonzept einplanen) und nach <strong>8 bis 12 Jahren</strong>, wenn andere Einrichtungselemente erneuert werden. Die Kunst bleibt dann als wertbeständiger Anker bestehen.</p><p>Wer eine bestehende Praxis hat, beginnt am besten mit einem einzelnen Hauptwerk im Wartezimmer und baut schrittweise aus.</p>`
      }
    ]
  }
];

const totalQuestions = categories.reduce((sum, cat) => sum + cat.items.length, 0);

const topFaqs = [];
categories.forEach(cat => {
  cat.items.slice(0, 3).forEach(item => topFaqs.push(item));
});
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": topFaqs.slice(0, 25).map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.studiovisus.de/faq" }
  ]
};

const catNavHtml = categories.map(c =>
  `      <a class="cat-link" href="#${c.id}">${c.navLabel}</a>`
).join('\n');

const sectionsHtml = categories.map(cat => {
  const itemsHtml = cat.items.map(item => `
    <details class="faq-item">
      <summary>${item.q}</summary>
      <div class="faq-answer">${item.a}</div>
    </details>`).join('');

  return `
  <div class="faq-section" id="${cat.id}">
    <div class="faq-section-head">
      <span class="faq-section-num">${cat.num}.</span>
      <h2 class="faq-section-title">${cat.title}</h2>
      <span class="faq-section-count">${cat.items.length} Fragen</span>
    </div>
    ${itemsHtml}
  </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/svg+xml" href="images/logo/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="images/logo/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/logo/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/logo/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta name="theme-color" content="#a8482a">
<title>Häufige Fragen zu Wandkunst für Praxis und Hotel | Studio Visus</title>
<meta name="description" content="Welche Bilder beruhigen im Wartezimmer? Was kostet ein Auftragswerk? Über ${totalQuestions} Antworten zu Originalgemälden, Neuroästhetik und Healing Architecture.">

<meta property="og:type" content="website">
<meta property="og:title" content="FAQ | Studio Visus Hamburg">
<meta property="og:description" content="Über ${totalQuestions} Antworten zu Originalgemälden, Neuroästhetik und Healing Architecture.">
<meta property="og:url" content="https://www.studiovisus.de/faq">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">

<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="FAQ | Studio Visus Hamburg">
<meta name="twitter:description" content="Über ${totalQuestions} Antworten zu evidenzbasierter Kunst für Arztpraxen, Hotels und mehr.">

<link rel="canonical" href="https://www.studiovisus.de/faq">

<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script><link rel="stylesheet" href="css/fonts.css">

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/faq-page.css">
<link rel="stylesheet" href="css/cookie-consent.css">
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke">Werke</a>
      <a href="/blog">Blog</a>
      <a href="/ueber">Über</a>
      <a href="/kontakt">Kontakt</a>
      <a href="/faq" class="active">FAQ</a>
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
    <img src="images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="200" height="50">
  </div>
  <nav class="mobile-menu-links" aria-label="Hauptnavigation mobil">
    <a href="/werke">Werke</a>
    <a href="/auftragsarbeit">Auftragsarbeit</a>
    <a href="/blog">Blog</a>
    <a href="/ueber">Über</a>
    <a href="/kontakt">Kontakt</a>
    <a href="/faq" class="active">FAQ</a>
  </nav>
  <a href="/kontakt?art=sonstiges" class="mobile-menu-cta">Werk anfragen →</a>
  <div class="mobile-menu-foot">
    <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
    <a href="tel:017684737726">0176 84 73 77 26</a>
  </div>
</aside>

<section class="faq-hero">
  <div>
    <div class="eyebrow">Wissen · Forschung · Praxis</div>
    <h1>
      Häufige <em>Fragen</em><br>
      zu evidenzbasierter<br>
      <span class="stroke">Wandkunst.</span>
    </h1>
    <p class="faq-hero-lead">Alles, was Sie über Originalgemälde für Praxen, Hotels, Therapieräume, Büros und private Wohnräume wissen sollten. Mit Quellenangaben.</p>
  </div>
  <div class="faq-hero-meta">
    <p>Von Neuroästhetik über Auftragsarbeiten bis Versand und Pflege. Alle Antworten beziehen sich auf die Arbeit von Studio Visus in Hamburg.</p>
    <div class="faq-stat-row">
      <div class="faq-stat">
        <span class="num">${totalQuestions}+</span>
        <span class="label">Antworten</span>
      </div>
      <div class="faq-stat">
        <span class="num">${categories.length}</span>
        <span class="label">Kategorien</span>
      </div>
      <div class="faq-stat">
        <span class="num">9+</span>
        <span class="label">Studien zitiert</span>
      </div>
    </div>
  </div>
  <div class="scribble" style="top:80px; right:160px;">mit Quellenangaben ✦</div>
</section>

<div class="faq-cat-nav">
  <div class="faq-cat-nav-inner">
${catNavHtml}
  </div>
</div>

<div class="faq-sections">
${sectionsHtml}
</div>

<section class="faq-sources">
  <div class="faq-sources-inner">
    <h2>Zitierte <em>Quellen</em></h2>
    <div class="source-list">
      <p>Bar, M. & Neta, M. (2006). Humans prefer curved visual objects. <em>Psychological Science</em>, 17(8), 645-648.</p>
      <p>Elliot, A. J. & Maier, M. A. (2014). Color Psychology: Effects of Perceiving Color on Psychological Functioning in Humans. <em>Annual Review of Psychology</em>.</p>
      <p>Freedberg, D. & Gallese, V. (2007). Motion, emotion and empathy in esthetic experience. <em>Trends in Cognitive Sciences</em>, 11(5), 197-203.</p>
      <p>Hagerhall, C. M. et al. (2015). Human physiological benefits of viewing nature: EEG responses to fractal patterns. <em>Journal of Environmental Psychology</em>.</p>
      <p>Leder, H. et al. (2004). A model of aesthetic appreciation and aesthetic judgments. <em>British Journal of Psychology</em>.</p>
      <p>Reber, R., Schwarz, N. & Winkielman, P. (2004). Processing fluency and aesthetic pleasure. <em>Personality and Social Psychology Review</em>, 8(4), 364-382.</p>
      <p>Salingaros, N. A. (2006). <em>A Theory of Architecture</em>.</p>
      <p>Taylor, R. P. (2006). Reduction of Physiological Stress Using Fractal Art and Architecture. <em>Leonardo</em>, 39(3), 245-251.</p>
      <p>Ulrich, R. S. (1984). View through a window may influence recovery from surgery. <em>Science</em>, 224(4647), 420-421.</p>
    </div>
  </div>
</section>

<section class="faq-cta">
  <div class="faq-cta-inner reveal">
    <h2>Ihre Frage war <em>nicht dabei?</em></h2>
    <div class="faq-cta-right">
      <p>Schreiben Sie mir. Ich antworte persönlich, meist am gleichen Tag. Kein Sekretariat, kein Callcenter.</p>
      <a href="/kontakt" class="btn btn-primary">Frage stellen →</a>
    </div>
  </div>
</section>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand"><img class="foot-brand-logo" src="images/logo/studiovisus-logo-footer-thight.svg" alt="Studio Visus" width="200" height="50"></div>
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
      <a href="/kontakt">Kontaktformular →</a>
    </div>
    <div class="foot-col">
      <h4>Info</h4>
      <a href="/impressum">Impressum</a>
      <a href="/widerrufsbelehrung">Widerrufsrecht</a>
      <a href="/datenschutz">Datenschutz</a>
      <a href="/faq">FAQ</a>
      <a href="#" data-cc-open>Cookie-Einstellungen</a>
    </div>
  </div>
  <div class="foot-bottom">
    <span>© 2026 Studio Visus · Hamburg Lokstedt</span>
  </div>
</footer>

<script src="js/main.js"></script>
<script src="js/cookie-consent.js"></script>
<script>
const sections = document.querySelectorAll('.faq-section');
const catLinks = document.querySelectorAll('.cat-link');
if (sections.length && catLinks.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        catLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector('.cat-link[href="#' + e.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0, rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => obs.observe(s));
}
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'faq.html'), html, 'utf8');
console.log(`OK faq.html (${Math.round(html.length / 1024)} KB) | ${totalQuestions} Fragen in ${categories.length} Kategorien`);