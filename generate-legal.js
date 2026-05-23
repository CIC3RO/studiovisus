#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function wrap(slug, title, metaTitle, metaDesc, canonical, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${metaTitle}</title>
<meta name="description" content="${metaDesc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Studio Visus">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="${canonical}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
    { "@type": "ListItem", "position": 2, "name": "${title}", "item": "${canonical}" }
  ]
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600&family=Caveat:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/legal.css">
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html"><span class="dot"></span> Studio <em>Visus</em></a>
    <div class="nav-links">
      <a href="werke.html">Werke</a>
      <a href="blog.html">Blog</a>
      <a href="ueber.html">&#220;ber</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="faq.html">FAQ</a>
    </div>
    <a href="kontakt.html?art=sonstiges" class="nav-cart">Werk anfragen →</a>
  </div>
</nav>
<section class="legal-head">
  <div class="eyebrow">Rechtliches</div>
  <h1>${title}</h1>
</section>
<section class="legal-body">
  <div class="legal-content">
${bodyHtml}
  </div>
</section>
<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand">Studio <em>Visus</em></div>
      <div class="foot-tag">Handgemalte Unikate f&#252;r R&#228;ume, in denen Atmosph&#228;re z&#228;hlt.</div>
    </div>
    <div class="foot-col"><h4>Standort</h4><p>Lokstedter H&#246;he 11e<br>22529 Hamburg</p></div>
    <div class="foot-col"><h4>Kontakt</h4><a href="mailto:info@studiovisus.de">info@studiovisus.de</a><a href="tel:017684737726">0176 84 73 77 26</a><a href="kontakt.html">Kontaktformular &#8594;</a></div>
    <div class="foot-col"><h4>Info</h4><a href="impressum.html">Impressum</a><a href="widerrufsbelehrung.html">Widerrufsrecht</a><a href="datenschutz.html">Datenschutz</a><a href="faq.html">FAQ</a></div>
  </div>
  <div class="foot-bottom">
    <span>&#169; 2026 Studio Visus &#183; Hamburg Lokstedt</span>
    <span>Design-Entwurf &#183; Warm &#38; atelierhaft</span>
  </div>
</footer>
<script src="js/main.js"></script>
</body>
</html>`;
}

// Read body content from separate files
const impressumBody = fs.readFileSync(path.join(__dirname, '_legal_impressum.html'), 'utf8');
const widerrufBody = fs.readFileSync(path.join(__dirname, '_legal_widerruf.html'), 'utf8');
const datenschutzBody = fs.readFileSync(path.join(__dirname, '_legal_datenschutz.html'), 'utf8');

const pages = [
  {
    slug: 'impressum',
    title: 'Impressum',
    metaTitle: 'Impressum | Jetzt rechtssicher informieren — Studio Visus',
    metaDesc: 'Impressum von Studio Visus in Hamburg. Rechtliche Informationen, Kontaktdaten und Haftungsausschluss.',
    canonical: 'https://www.studiovisus.de/impressum',
    body: impressumBody
  },
  {
    slug: 'widerrufsbelehrung',
    title: 'Widerrufsbelehrung',
    metaTitle: 'Widerrufsbelehrung | Widerrufsrecht verstehen — Studio Visus',
    metaDesc: 'Informieren Sie sich ueber Ihr Widerrufsrecht bei Studio Visus. Klare Anleitungen zur Rueckgabe und Rueckzahlung fuer online gekaufte Werke.',
    canonical: 'https://www.studiovisus.de/widerrufsbelehrung',
    body: widerrufBody
  },
  {
    slug: 'datenschutz',
    title: 'Datenschutzerkl&#228;rung',
    metaTitle: 'Datenschutzerklaerung | Schuetzen Sie Ihre Daten — Studio Visus',
    metaDesc: 'Unsere Datenschutzerklaerung informiert ueber den Umgang mit personenbezogenen Daten, Datenerfassung und Ihre Rechte.',
    canonical: 'https://www.studiovisus.de/datenschutz',
    body: datenschutzBody
  }
];

pages.forEach(p => {
  const html = wrap(p.slug, p.title, p.metaTitle, p.metaDesc, p.canonical, p.body);
  fs.writeFileSync(path.join(__dirname, p.slug + '.html'), html, 'utf8');
  console.log(`OK ${p.slug}.html (${Math.round(html.length/1024)} KB)`);
});
console.log('Done: 3 legal pages');
