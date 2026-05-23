#!/usr/bin/env node
/**
 * Studio Visus — Blog Generator
 * Erzeugt blog.html (Übersicht) + einzelne Artikelseiten
 * Mit JSON-LD (BlogPosting, BreadcrumbList), Open Graph, Twitter Cards
 */

const fs = require('fs');
const path = require('path');

const author = {
  name: "Jan-Niclas Bardenhagen",
  bio: "Wirtschaftsingenieur, Wirtschaftsinformatiker und seit einem gluecklichen Zufall auch Maler. Eine ungenutzte Leinwand nach einem Hochzeitsspiel wurde zum Ausgangspunkt. Heute entwickelt er in seinem Studio in Hamburg-Lokstedt evidenzbasierte Originalkunst, die auf Erkenntnissen der Neurooesthetik basiert.",
  url: "https://www.studiovisus.de"
};

const posts = [
  {
    slug: "fluid-art-acryl-pouring-fraktale-muster",
    title: "Fluid Art und Acryl-Pouring: Warum diese Techniken fraktale Muster erzeugen",
    subtitle: "und weshalb das fuer Ihr Wohlbefinden relevant ist",
    category: "Maltechniken & Evidenz",
    date: "2026-05-04",
    dateFormatted: "4. Mai 2026",
    readTime: "12 Min. Lesezeit",
    excerpt: "Manchmal entsteht das Schoenste dort, wo der Mensch loslaesst. Fluid Art und Acryl-Pouring erzeugen fraktale Muster, die das menschliche Gehirn als beruhigend einstuft. Dieser Artikel erklaert die Wissenschaft dahinter.",
    tags: ["Fluid Art", "Acryl-Pouring", "Fraktale Kunst", "Acryl Pouring Hamburg", "Fluid Art Original"],
    imgGrad: "linear-gradient(135deg, #3a2f24 0%, #6b5840 35%, #a8482a 70%, #c69a4a 100%)",
    toc: [
      { id: "was-ist-fluid-art", label: "Was ist Fluid Art?" },
      { id: "fraktale-muster", label: "Fraktale Muster in Fluid Art" },
      { id: "wissenschaft", label: "Warum Fraktale beruhigen" },
      { id: "unikate-kaufen", label: "Worauf es beim Kauf ankommt" },
      { id: "im-privaten-raum", label: "Fluid Art im privaten Raum" },
      { id: "auftragsarbeit", label: "Auftragsarbeit" },
      { id: "fazit", label: "Fazit" }
    ],
    // Article body in HTML segments
    body: `
      <p class="lead">Manchmal entsteht das Schoenste dort, wo der Mensch loslaesst. Fluid Art und Acryl-Pouring sind Maltechniken, bei denen fluessige Farben auf die Leinwand gegossen, gekippt und gelenkt werden. Der Kuenstler steuert, aber er kontrolliert nicht jedes Detail.</p>

      <p>Die Farben fliessen ineinander, schieben sich aneinander vorbei, erzeugen Schichten, Strukturen und Muster, die kein Pinsel replizieren koennte. Das Ergebnis ist immer ein Unikat. Und es ist fast immer etwas, vor dem Menschen stehenbleiben.</p>

      <p>Doch hinter der visuellen Faszination steckt mehr als Aesthetik. Die Muster, die durch Fluid Art entstehen, entsprechen einer tief verankerten Wahrnehmungsgrammatik des menschlichen Gehirns.</p>

      <h2 id="was-ist-fluid-art">Was ist Fluid Art?</h2>

      <p>Fluid Art ist ein Oberbegriff fuer verschiedene Pouring-Techniken in der Acrylmalerei, bei denen Farben in fliessfaehiger Konsistenz auf die Leinwand aufgetragen werden, ohne dass ein Pinsel die Komposition direkt steuert.</p>

      <p><strong>Dirty Pour:</strong> Mehrere Farben werden in einem Behaelter geschichtet und gemeinsam auf die Leinwand gegossen. Beim Kippen der Leinwand verlaufen die Farben ineinander und erzeugen komplexe Strukturen.</p>

      <p><strong>Swipe-Technik:</strong> Eine kontrastierende Farbe wird ueber die noch nasse Grundschicht gezogen. Dabei entstehen Zellen, Schlieren und Uebergaenge, die an natuerliche Strukturen wie Achat, Marmor oder Wolken erinnern.</p>

      <p><strong>Ring-Pour:</strong> Die Farben werden konzentrisch uebereinandergeschichtet und dann durch Neigung der Leinwand in Bewegung versetzt. Das Ergebnis sind oft kreisfoermige, sich wiederholende Muster mit grosser Tiefenwirkung.</p>

      <p><strong>Fluid Bloom und Dutch Pour:</strong> Mithilfe von Luft werden die Farben auf der Leinwand bewegt, wodurch feinere Strukturen und organische Veraestelungen entstehen.</p>

      <p>Allen Techniken gemeinsam ist, dass der Entstehungsprozess physikalischen Gesetzen folgt: Oberflaechenspannung, Viskositaet, Schwerkraft und Stroemungsdynamik bestimmen mit, wie das Werk aussieht. Die Hand des Kuenstlers setzt den Rahmen, aber die Natur schreibt mit.</p>

      <h2 id="fraktale-muster">Was sind fraktale Muster, und warum erzeugt Fluid Art sie?</h2>

      <h3>Das Prinzip der Fraktalitaet</h3>

      <p>Ein Fraktal ist ein Muster, das auf verschiedenen Massstabsebenen eine aehnliche Struktur zeigt. Betrachtet man einen Ast eines Baumes und dann einen einzelnen Zweig davon, sieht der Zweig aus wie ein kleines Abbild des Astes. Zoomt man in eine Kuestenlinie hinein, sieht auch der Ausschnitt wie eine Kuestenlinie aus.</p>

      <p>Fraktale sind in der Natur allgegenwaertig: in Schneeflocken, Flusssystemen, Gebirgen, Wolken, Korallen, Blattadern und Wellen. Das menschliche Gehirn ist evolutionaer auf diese Muster eingestellt.</p>

      <h3>Warum Fluid Art fraktale Strukturen erzeugt</h3>

      <p>Die Physik des Fliessens erzeugt von Natur aus fraktale Muster. Wenn zwei Fluessigkeiten mit unterschiedlicher Viskositaet aufeinandertreffen, entstehen Grenzflaechen, die auf verschiedenen Massstabsebenen aehnliche Strukturen zeigen. Die feinen Veraestelungen an den Raendern einer Farbzelle wiederholen sich in der Gesamtform der Zelle.</p>

      <p>Fluid Art ist damit keine bewusste Imitation von Natur. Sie ist physikalisch analog zu den Prozessen, die in der Natur fraktale Muster erzeugen. Das ist der Grund, warum viele Fluid-Art-Werke an Mineralgestein, Ozeane oder biologische Strukturen erinnern, obwohl kein einziges davon bewusst gemalt wurde.</p>

      <h2 id="wissenschaft">Die Wissenschaft der Wahrnehmung: Warum fraktale Muster beruhigen</h2>

      <h3>Messbare Stressreduktion</h3>

      <p>Der Physiker Richard Taylor von der University of Oregon hat ueber viele Jahre untersucht, wie fraktale Muster auf das menschliche Nervensystem wirken. Seine Erkenntnisse sind eindeutig: <strong>Fraktale im mittleren Komplexitaetsbereich reduzieren physiologischen Stress messbar.</strong></p>

      <p>In kontrollierten Experimenten wurden Probanden verschiedenen Bildern ausgesetzt. Bilder mit fraktalen Mustern im optimalen Komplexitaetsbereich erzeugten eine signifikant niedrigere Stressreaktion. Die Reduktion betrug in einigen Versuchsanordnungen bis zu 60 Prozent.</p>

      <span class="cite">Taylor, R. P. (2006). Reduction of Physiological Stress Using Fractal Art and Architecture. Leonardo, 39(3), 245-251.</span>

      <h3>Das Gehirn erkennt Vertrautes</h3>

      <p>Der Mechanismus dahinter ist evolutionaerer Natur. Das Gehirn ist darauf trainiert, natuerliche Umgebungen als sicher einzustufen. Fraktale Muster sind das visuelle Merkmal natuerlicher Umgebungen. Wenn das Auge sie erkennt, sendet das Nervensystem ein Sicherheitssignal.</p>

      <p>Dieser Prozess laeuft unbewusst ab. Niemand muss wissen, was ein Fraktal ist, um die beruhigende Wirkung zu erleben.</p>

      <h3>Visuelle Fluenz und aesthetisches Wohlbefinden</h3>

      <p>Bilder, die das Gehirn leicht verarbeiten kann, werden als angenehmer empfunden. Fraktale mit natuerlicher Komplexitaet sind leicht zu verarbeiten, weil das Gehirn die Mustergrammatik kennt. Das Ergebnis ist ein Zustand, den Forscher als aesthetisches Wohlbefinden beschreiben: ein leises Gefuehl von Ruhe, Freude und Richtigkeit beim Betrachten des Werkes.</p>

      <span class="cite">Reber, R. et al. (2004). Processing fluency and aesthetic pleasure. Personality and Social Psychology Review, 8(4), 364-382.</span>

      <h2 id="unikate-kaufen">Acryl-Pouring-Unikate kaufen: Worauf es ankommt</h2>

      <h3>Jedes Werk ist wirklich einmalig</h3>

      <p>Das ist beim Acryl-Pouring keine Marketingfloskel, sondern physikalische Tatsache. Die Stroemungsdynamik beim Giessen ist so komplex, dass kein zwei Werke identisch sein koennen. Temperatur, Luftfeuchtigkeit, Konsistenz der Farbe, Neigung der Leinwand, Geschwindigkeit des Gusses: All das erzeugt eine Einmaligkeit, die kein Reproduktionsverfahren kopieren kann.</p>

      <h3>Qualitaetsmerkmale beim Kauf</h3>

      <p><strong>Traegermaterial:</strong> Hochwertige Leinwand auf Keilrahmen ist einfachem Leinenpapier vorzuziehen. Der Keilrahmen bleibt ueber Zeit stabil und ermoeglicht ein spannungsfreies Aufhaengen.</p>

      <p><strong>Farbqualitaet:</strong> Kuenstlerfarben auf Acrylbasis mit Lichtschutz sind langlebiger als Hobbyfarben. Ein Werk mit lichtechten Pigmenten behaelt seine Leuchtkraft ueber Jahrzehnte.</p>

      <p><strong>Signatur und Dokumentation:</strong> Ein serioses Originalwerk ist signiert und wird mit einem Informationsblatt geliefert, das Entstehungsjahr, Technik, Format und Materialien dokumentiert.</p>

      <h2 id="im-privaten-raum">Fluid Art im privaten Raum</h2>

      <p>Fluid-Art-Werke funktionieren in sehr unterschiedlichen Wohnkontexten. Sie verbinden sich mit modernen, minimalistischen Einrichtungen ebenso wie mit waermeren, organischeren Stilen. Die fliessenden Strukturen sind zeitlos genug, um keine Stilepoche zu bedienen, und ausdrucksstark genug, um einem Raum echte Persoenlichkeit zu geben.</p>

      <p>Fuer das <strong>Schlafzimmer</strong> empfehlen sich ruhige, weiche Farbpaletten in Blau, Gruen oder warmen Neutraltoenen. Fuer <strong>Wohnzimmer und Flure</strong> darf mehr Kontrast vorhanden sein. Fuer <strong>Homeoffice-Raeume</strong> sind Werke mit klarer Hauptfarbe und organischer Struktur ideal, weil sie einen ruhigen visuellen Anker bieten.</p>

      <h2 id="auftragsarbeit">Fluid Art als Auftragsarbeit</h2>

      <p>Wer ein Werk moechte, das exakt zu seinem Raum, seiner Farbwelt und seiner Atmosphaere passt, ist mit einer Auftragsarbeit besser beraten. Studio Visus entwickelt individuelle Fluid-Art-Auftragsgemaeide fuer Privatpersonen und gewerbliche Kunden.</p>

      <p>Der Prozess ist unkompliziert: Sie beschreiben den Raum, die Farbwelt, die gewuenschte Stimmung und das Format. Studio Visus entwickelt auf dieser Basis ein Konzept, waehlt die Farbpalette und setzt das Werk handgemalt um.</p>

      <div class="article-cta">
        <p>Studio Visus entwickelt evidenzbasierte Originalkunst in Fluid Art und Acryl-Pouring fuer Privatkunden, Arztpraxen, Kliniken, Hotels und Bueros. Handgemalt, wissenschaftlich fundiert, individuell gefertigt.</p>
        <a href="werke.html" class="btn btn-primary">Werke entdecken &rarr;</a>
      </div>

      <h2 id="fazit">Fazit: Fluid Art ist keine Zufallsmalerei</h2>

      <p>Was wie Zufall aussieht, folgt Gesetzen. Die Gesetze der Physik, der Wahrnehmung und der menschlichen Biologie.</p>

      <p>Fluid Art und Acryl-Pouring erzeugen fraktale Muster, weil die Physik des Fliessens dieselben Prozesse nachahmt, die in der Natur Fraktale erzeugen. Und diese Muster beruhigen, weil das menschliche Gehirn evolutionaer auf sie eingestellt ist.</p>

      <p><strong>Ein Fluid-Art-Unikat ist damit nicht einfach ein schoenes Bild. Es ist ein Stueck geronnene Physik, das mit einer tief verankerten Wahrnehmungsgrammatik kommuniziert. Still. Wirksam. Dauerhaft.</strong></p>
    `
  }
];

// Placeholder posts for grid (coming-soon style)
const upcomingPosts = [
  {
    title: "Welche Farben beruhigen im Wartezimmer? Eine Analyse nach Studienlage",
    category: "Arztpraxis & Klinik",
    date: "Demnachst",
    excerpt: "Blau, Gruen, Sand: Welche Farbtoene senken den Cortisolspiegel Ihrer Patienten messbar? Ein Ueberblick ueber die aktuelle Forschung.",
    grad: "linear-gradient(135deg, #3a4a6b, #8aa5b8)"
  },
  {
    title: "Healing Architecture: Wie Raumgestaltung den Heilungsverlauf beeinflusst",
    category: "Healing Architecture",
    date: "Demnachst",
    excerpt: "Von Roger Ulrichs Fensterstudie bis zum modernen Evidence Based Design. Was Architekten, Aerzte und Kuenstler voneinander lernen koennen.",
    grad: "linear-gradient(135deg, #5a6d4a, #c69a4a)"
  },
  {
    title: "Original vs. Kunstdruck: Was die Textur eines Gemaeldes im Gehirn ausloest",
    category: "Maltechniken & Evidenz",
    date: "Demnachst",
    excerpt: "Freedberg und Gallese haben gezeigt, dass Originale das Spiegelneuronen-System aktivieren. Was bedeutet das fuer die Raumwirkung?",
    grad: "linear-gradient(135deg, #a8482a, #d8c9ad)"
  }
];

// ===== GENERATE BLOG OVERVIEW =====
function generateOverview() {
  const post = posts[0];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Studio Visus Blog",
    "description": "Evidenzbasierte Kunst, Neurooesthetik und Raumgestaltung. Wissen, Hintergrund und Inspiration von Studio Visus Hamburg.",
    "url": "https://www.studiovisus.de/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Studio Visus",
      "url": "https://www.studiovisus.de"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.studiovisus.de/blog" }
    ]
  };

  const upcomingHtml = upcomingPosts.map(p => `
        <div class="blog-card reveal">
          <div class="blog-card-img">
            <div class="bg" style="background:${p.grad}"></div>
          </div>
          <div class="card-cat">${p.category}</div>
          <h3>${p.title}</h3>
          <p class="card-excerpt">${p.excerpt}</p>
          <div class="card-meta">${p.date}</div>
        </div>`).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog &mdash; Evidenzbasierte Kunst & Raumgestaltung &mdash; Studio Visus</title>
<meta name="description" content="Wie Wandbilder in Arztpraxen, Kliniken und Hotels wirken. Warum Fluid Art fraktale Muster erzeugt. Was Healing Architecture mit Wohlbefinden zu tun hat.">

<meta property="og:type" content="website">
<meta property="og:title" content="Blog &mdash; Studio Visus Hamburg">
<meta property="og:description" content="Evidenzbasierte Kunst, Neurooesthetik und Raumgestaltung. Wissen und Inspiration.">
<meta property="og:url" content="https://www.studiovisus.de/blog">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">

<link rel="canonical" href="https://www.studiovisus.de/blog">

<script type="application/ld+json">
${JSON.stringify(blogSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600&family=Caveat:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/blog.css">
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html"><span class="dot"></span> Studio <em>Visus</em></a>
    <div class="nav-links">
      <a href="werke.html">Werke</a>
      <a href="blog.html" class="active">Blog</a>
      <a href="ueber.html">&Uuml;ber</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="faq.html">FAQ</a>
    </div>
    <a href="kontakt.html?art=sonstiges" class="nav-cart">Werk anfragen →</a>
  </div>
</nav>

<section class="blog-hero">
  <div>
    <div class="eyebrow">Wissen &middot; Forschung &middot; Inspiration</div>
    <h1>Evidenzbasierte <em>Kunst.</em><br><span class="stroke">Hintergrund</span><br>und Inspiration.</h1>
    <p class="blog-hero-lead">Hier schreibt Studio Visus &uuml;ber die Schnittstelle von Kunst und Wissenschaft. Fundiert, praxisnah und f&uuml;r alle, die R&auml;ume bewusst gestalten.</p>
  </div>
  <div class="blog-hero-meta">
    <p>Wie Wandbilder in Arztpraxen, Kliniken und Hotels wirken. Warum Fluid Art fraktale Muster erzeugt. Was Healing Architecture mit Wohlbefinden zu tun hat.</p>
  </div>
  <div class="scribble" style="top:80px; right:180px;">fundiert &amp;<br>praxisnah &#x2726;</div>
</section>

<section class="blog-featured">
  <div class="blog-featured-inner reveal">
    <a class="blog-featured-img" href="blog-${post.slug}.html">
      <span class="feat-badge">Neuester Artikel</span>
      <div class="bg" style="background:${post.imgGrad}"></div>
    </a>
    <div class="blog-featured-text">
      <div class="feat-cat">${post.category}</div>
      <h2><a href="blog-${post.slug}.html">${post.title}</a></h2>
      <p class="feat-excerpt">${post.excerpt}</p>
      <div class="feat-meta">
        <span class="author">${author.name}</span>
        <span class="dot"></span>
        <span>${post.dateFormatted}</span>
        <span class="dot"></span>
        <span>${post.readTime}</span>
      </div>
      <a class="read-more" href="blog-${post.slug}.html">Artikel lesen &rarr;</a>
    </div>
  </div>
</section>

<section class="blog-grid-wrap">
  <div class="blog-grid-head">
    <h2>Weitere <em>Artikel</em></h2>
    <span class="count">In Vorbereitung</span>
  </div>
  <div class="blog-grid">
${upcomingHtml}
  </div>
</section>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand">Studio <em>Visus</em></div>
      <div class="foot-tag">Handgemalte Unikate f&uuml;r R&auml;ume, in denen Atmosph&auml;re z&auml;hlt.</div>
    </div>
    <div class="foot-col">
      <h4>Standort</h4>
      <p>Lokstedter H&ouml;he 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h4>Kontakt</h4>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="kontakt.html">Kontaktformular &rarr;</a>
    </div>
    <div class="foot-col">
      <h4>Info</h4>
      <a href="#">Impressum</a>
      <a href="#">Widerrufsrecht</a>
      <a href="#">Datenschutz</a>
      <a href="faq.html">FAQ</a>
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

// ===== GENERATE ARTICLE PAGE =====
function generateArticle(post) {
  const url = "https://www.studiovisus.de/blog/" + post.slug;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": url,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Person", "name": author.name, "url": author.url },
    "publisher": {
      "@type": "Organization",
      "name": "Studio Visus",
      "url": "https://www.studiovisus.de"
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": post.category,
    "wordCount": post.body.replace(/<[^>]+>/g, '').split(/\s+/).length,
    "keywords": post.tags.join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.studiovisus.de/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title.substring(0, 60), "item": url }
    ]
  };

  const tocHtml = post.toc.map(t =>
    `        <a href="#${t.id}">${t.label}</a>`
  ).join('\n');

  const tagsHtml = post.tags.map(t =>
    `      <span class="article-tag">${t}</span>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} &mdash; Studio Visus Blog</title>
<meta name="description" content="${post.excerpt.substring(0, 155)}">

<meta property="og:type" content="article">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.excerpt.substring(0, 155)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">
<meta property="article:published_time" content="${post.date}">
<meta property="article:author" content="${author.name}">
<meta property="article:section" content="${post.category}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${post.title}">
<meta name="twitter:description" content="${post.excerpt.substring(0, 155)}">

<link rel="canonical" href="${url}">

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600&family=Caveat:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/blog.css">
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html"><span class="dot"></span> Studio <em>Visus</em></a>
    <div class="nav-links">
      <a href="werke.html">Werke</a>
      <a href="blog.html" class="active">Blog</a>
      <a href="ueber.html">&Uuml;ber</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="faq.html">FAQ</a>
    </div>
    <a href="kontakt.html?art=sonstiges" class="nav-cart">Werk anfragen →</a>
  </div>
</nav>

<section class="article-head">
  <div class="article-breadcrumb" aria-label="Breadcrumb">
    <a href="index.html">Start</a>
    <span class="sep">&rsaquo;</span>
    <a href="blog.html">Blog</a>
    <span class="sep">&rsaquo;</span>
    <span>${post.title.substring(0, 50)}&hellip;</span>
  </div>

  <div class="article-cat">${post.category}</div>
  <h1>${post.title} <em>${post.subtitle}</em></h1>
  <div class="article-meta-row">
    <span class="author">${author.name}</span>
    <span class="dot"></span>
    <span>${post.dateFormatted}</span>
    <span class="dot"></span>
    <span>${post.readTime}</span>
  </div>
</section>

<div class="article-hero-img">
  <div class="img-wrap">
    <div class="bg" style="background:${post.imgGrad}"></div>
  </div>
</div>

<section class="article-layout">
  <article class="article-body">
${post.body}

    <div class="article-tags">
${tagsHtml}
    </div>

    <div class="article-author">
      <div class="author-name">${author.name}</div>
      <p>${author.bio}</p>
    </div>
  </article>

  <aside class="article-sidebar">
    <div class="sidebar-toc">
      <h4>Inhalt</h4>
${tocHtml}
    </div>

    <div class="sidebar-cta">
      <h4>Werk f&uuml;r Ihren Raum?</h4>
      <p>Handgemalte Originalgemaeide auf Basis von Neurooesthetik. Direkt aus dem Atelier in Hamburg.</p>
      <a href="werke.html" class="btn btn-primary">Werke ansehen &rarr;</a>
    </div>
  </aside>
</section>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand">Studio <em>Visus</em></div>
      <div class="foot-tag">Handgemalte Unikate f&uuml;r R&auml;ume, in denen Atmosph&auml;re z&auml;hlt.</div>
    </div>
    <div class="foot-col">
      <h4>Standort</h4>
      <p>Lokstedter H&ouml;he 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h4>Kontakt</h4>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="kontakt.html">Kontaktformular &rarr;</a>
    </div>
    <div class="foot-col">
      <h4>Info</h4>
      <a href="#">Impressum</a>
      <a href="#">Widerrufsrecht</a>
      <a href="#">Datenschutz</a>
      <a href="faq.html">FAQ</a>
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
fs.writeFileSync(path.join(__dirname, 'blog.html'), generateOverview(), 'utf8');
console.log('blog.html (Overview)');

posts.forEach(post => {
  const filename = `blog-${post.slug}.html`;
  fs.writeFileSync(path.join(__dirname, filename), generateArticle(post), 'utf8');
  console.log(`${filename} (Article)`);
});

console.log(`\nDone: 1 overview + ${posts.length} article(s)`);
