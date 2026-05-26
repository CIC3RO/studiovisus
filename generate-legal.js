#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function wrap(slug, title, metaTitle, metaDesc, canonical, bodyHtml) {
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
</script><link rel="stylesheet" href="/css/fonts.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/legal.css">
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke">Werke</a>
      <a href="/blog">Blog</a>
      <a href="/ueber">&#220;ber</a>
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
      <div class="foot-brand"><img class="foot-brand-logo" src="/images/logo/studiovisus-logo-footer-thight.svg" alt="Studio Visus" width="200" height="50"></div>
      <div class="foot-tag">Handgemalte Unikate f&#252;r R&#228;ume, in denen Atmosph&#228;re z&#228;hlt.</div>
    </div>
    <div class="foot-col"><h4>Standort</h4><p>Lokstedter H&#246;he 11e<br>22529 Hamburg</p></div>
    <div class="foot-col"><h4>Kontakt</h4><a href="mailto:info@studiovisus.de">info@studiovisus.de</a><a href="tel:017684737726">0176 84 73 77 26</a><a href="/kontakt">Kontaktformular &#8594;</a></div>
    <div class="foot-col"><h4>Info</h4><a href="/impressum">Impressum</a><a href="/widerrufsbelehrung">Widerrufsrecht</a><a href="/datenschutz">Datenschutz</a><a href="/faq">FAQ</a></div>
  </div>
  <div class="foot-bottom">
    <span>&#169; 2026 Studio Visus &#183; Hamburg Lokstedt</span>
    <span>Design-Entwurf &#183; Warm &#38; atelierhaft</span>
  </div>
</footer>
<script src="/js/main.js"></script>
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
