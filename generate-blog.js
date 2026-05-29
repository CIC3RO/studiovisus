#!/usr/bin/env node
/**
 * Studio Visus — Blog Generator (v2)
 * ----------------------------------
 * Liest alle Artikel aus blog-posts-data.js (Single Source of Truth)
 * und erzeugt:
 *   - blog.html (Uebersicht: Featured + Grid)
 *   - blog-<slug>.html (Artikelseiten) mit JSON-LD, Open Graph, Twitter Cards
 *
 * VEROEFFENTLICHUNGS-STEUERUNG:
 *   Jeder Artikel hat ein Feld publishDate ("YYYY-MM-DD").
 *   - Ist publishDate <= heute  -> Artikel ist "live": erscheint in der
 *     Uebersicht (Featured/Grid) und wird normal verlinkt.
 *   - Ist publishDate >  heute  -> Artikel ist "geplant": Detailseite wird
 *     trotzdem erzeugt (Direktlink-Vorschau), erscheint aber NICHT in der
 *     Uebersicht und wird nicht verlinkt. So koennen alle Artikel vorab
 *     committed werden und erscheinen automatisch am Stichtag.
 *
 *   Optional kann ein fixes Datum gesetzt werden ueber Umgebungsvariable:
 *     BLOG_TODAY=2026-07-20 node generate-blog.js
 *   (nuetzlich zum Testen, was an einem bestimmten Tag sichtbar waere.)
 */

const fs = require('fs');
const path = require('path');

const here = __dirname;
const posts = require('./blog-posts-data.js');

const author = {
  name: "Jan-Niclas Bardenhagen",
  url: "https://www.studiovisus.de",
  instagram: "https://www.instagram.com/janniclas.art/"
};

// ---- "Heute" bestimmen (UTC-Datum, optional via ENV ueberschreibbar) ----
function todayISO() {
  if (process.env.BLOG_TODAY) return process.env.BLOG_TODAY;
  return new Date().toISOString().slice(0, 10);
}
const TODAY = todayISO();

function isLive(post) {
  // Live, wenn publishDate vorhanden und <= heute
  if (!post.publishDate) return true;
  return post.publishDate <= TODAY;
}

// Volltitel (H1) aus Main + Em zusammensetzen
function fullTitle(post) {
  return post.titleEm ? `${post.titleMain} ${post.titleEm}` : post.titleMain;
}
// Reiner Titel ohne Entities (fuer JSON-LD headline nutzen wir ldHeadline)
function plainTitle(post) {
  return fullTitle(post);
}

// ===== UEBERSICHT =====
function generateOverview(livePosts) {
  // Sortierung: neueste zuerst (nach publishDate absteigend)
  const sorted = [...livePosts].sort((a, b) => {
    if (a.publishDate === b.publishDate) return 0; // Gleichstand: Array-Reihenfolge beibehalten (stabiler Sort)
    return a.publishDate < b.publishDate ? 1 : -1;
  });
  // Featured: manuell via featured:true, sonst der neueste
  const manualFeatured = sorted.find(p => p.featured);
  const featured = manualFeatured || sorted[0];
  const gridPosts = sorted.filter(p => p.slug !== featured.slug);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Studio Visus Blog",
    "description": "Evidenzbasierte Kunst, Neuroaesthetik und Raumgestaltung. Wissen, Hintergrund und Inspiration von Studio Visus Hamburg.",
    "url": "https://www.studiovisus.de/blog",
    "publisher": { "@type": "Organization", "name": "Studio Visus", "url": "https://www.studiovisus.de" }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.studiovisus.de/blog" }
    ]
  };

  const featuredImgStyle = featured.teaserObjPos ? ` style="object-position: ${featured.teaserObjPos};"` : '';
  const featuredHtml = `
<section class="blog-featured">
  <div class="blog-featured-inner reveal">
    <a class="blog-featured-img" href="/blog/${featured.slug}">
      <span class="feat-badge">Neuester Artikel</span>
      <div class="bg">
        <img decoding="async" loading="eager" fetchpriority="high"${featuredImgStyle}  src="${featured.teaserImg}" alt="${featured.teaserAlt}">
      </div>
    </a>
    <div class="blog-featured-text">
      <div class="feat-cat">${featured.category}</div>
      <h2><a href="/blog/${featured.slug}">${featured.titleMain}</a></h2>
      <p class="feat-excerpt">${featured.excerpt}</p>
      <div class="feat-meta">
        <span class="author">${author.name}</span>
        <span class="dot"></span>
        <span>${featured.dateFormatted}</span>
        <span class="dot"></span>
        <span>${featured.readTime}</span>
      </div>
      <a class="read-more" href="/blog/${featured.slug}">Artikel lesen &rarr;</a>
    </div>
  </div>
</section>`;

  const gridCards = gridPosts.map(p => {
    const objStyle = p.teaserObjPos ? ` style="object-position: ${p.teaserObjPos};"` : '';
    return `        <a class="blog-card reveal" href="/blog/${p.slug}">
          <div class="blog-card-img">
            <div class="bg">
              <img decoding="async" loading="lazy"${objStyle}  src="${p.teaserImg}" alt="${p.teaserAlt}">
            </div>
          </div>
          <div class="card-cat">${p.category}</div>
          <h3>${p.cardTitle || p.titleMain}</h3>
          <p class="card-excerpt">${p.excerpt}</p>
          <div class="card-meta">${p.dateFormatted} &middot; ${p.readTime}</div>
        </a>`;
  }).join('\n\n');

  const countLabel = `${String(gridPosts.length).padStart(2, '0')} Beitr&auml;ge`;

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
<title>Blog zu Kunst, Raumwirkung, Neuroästhetik | Studio Visus</title>
<meta name="description" content="Wie Wandbilder in Praxen, Kliniken und Hotels wirken. Fluid Art, Healing Architecture, Farbpsychologie. Beiträge aus dem Atelier Hamburg.">

<meta property="og:type" content="website">
<meta property="og:title" content="Blog zu Kunst, Raumwirkung, Neuroästhetik | Studio Visus">
<meta property="og:description" content="Wie Wandbilder in Praxen, Kliniken und Hotels wirken. Fluid Art, Healing Architecture, Farbpsychologie. Beiträge aus dem Atelier Hamburg.">
<meta property="og:url" content="https://www.studiovisus.de/blog">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">
<meta property="og:image" content="https://www.studiovisus.de/images/index/originalgemaelde-fenster-acryl-struktur-studiovisus.jpg">

<link rel="canonical" href="https://www.studiovisus.de/blog">

<script type="application/ld+json">
${JSON.stringify(blogSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script><link rel="stylesheet" href="/css/fonts.css">

<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/blog.css">
<link rel="preload" href="/css/cookie-consent.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/cookie-consent.css"></noscript>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke">Werke</a>
      <a href="/blog" class="active">Blog</a>
      <a href="/ueber">&Uuml;ber</a>
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
    <a href="/blog" class="active">Blog</a>
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
${featuredHtml}

<!-- INTRO -->
<section class="werke-intro">
  <div class="werke-intro-inner">
    <p>Studio Visus ist nicht nur ein Atelier, sondern auch ein Beobachtungsposten. Was vor der Staffelei entsteht, hat fast immer einen Hintergrund in Forschung. Wie wirken Farben auf den Puls? Warum entspannt das Auge an fraktalen Mustern? Was unterscheidet ein Original im Raum von einem Druck? Hier sammeln sich Antworten und offene Fragen.</p>
    <p>Die Beiträge richten sich an alle, die <a href="/bilder-arztpraxis">Bilder für die Arztpraxis</a> auswählen, <a href="/kunst-hotel">Hotelräume gestalten</a> oder einfach verstehen wollen, wie ein Werk im Alltag funktioniert. Wir verlinken Studien, Quellen und eigene Erfahrungen. Wer tiefer einsteigen möchte, findet im Bereich <a href="/auftragsarbeit">Auftragsarbeit</a> die Brücke von der Theorie zum konkreten Werk.</p>
  </div>
</section>

<section class="blog-grid-wrap">
  <div class="blog-grid-head">
    <h2>Weitere <em>Artikel</em></h2>
    <span class="count">${countLabel}</span>
  </div>
  <div class="blog-grid">

${gridCards}

  </div>
</section>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand"><img class="foot-brand-logo" src="/images/logo/studiovisus-logo-footer-thight.svg" alt="Studio Visus" width="200" height="50"></div>
      <div class="foot-tag">Handgemalte Unikate f&uuml;r R&auml;ume, in denen Atmosph&auml;re z&auml;hlt.</div>
    </div>
    <div class="foot-col">
      <h3>Standort</h3>
      <p>Lokstedter H&ouml;he 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h3>Kontakt</h3>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="/kontakt">Kontaktformular &rarr;</a>
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

// ===== ARTIKELSEITE =====
function generateArticle(post, allPosts) {
  const url = "https://www.studiovisus.de/blog/" + post.slug;
  const wordCount = post.body.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.ldHeadline || plainTitle(post),
    "description": post.ldDesc || post.metaDesc,
    "image": post.ldImage || post.ogImage,
    "url": url,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url,
      "sameAs": [author.instagram]
    },
    "publisher": { "@type": "Organization", "name": "Studio Visus", "url": "https://www.studiovisus.de" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": post.category,
    "wordCount": wordCount,
    "keywords": post.tags.join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.studiovisus.de" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.studiovisus.de/blog" },
      { "@type": "ListItem", "position": 3, "name": post.bcName || plainTitle(post).substring(0, 60), "item": url }
    ]
  };

  const tocHtml = post.toc.map(t => `        <a href="#${t.id}">${t.label}</a>`).join('\n');

  const heroStyle = post.heroObjPos ? ` style="object-position: ${post.heroObjPos};"` : '';

  // Related: explizit kuratierte Liste aus den Daten. Karte nutzt Bild ODER Gradient.
  const relatedHtml = (post.related || []).map(r => {
    let bg;
    if (r.img) {
      const objStyle = r.objpos ? ` style="object-position: ${r.objpos};"` : '';
      bg = `<div class="bg">
            <img decoding="async" loading="lazy"${objStyle}  src="${r.img}" alt="${r.alt || ''}">
          </div>`;
    } else {
      bg = `<div class="bg" style="background:${r.grad}"></div>`;
    }
    return `      <a class="blog-card reveal" href="/blog/${r.slug}">
        <div class="blog-card-img">
          ${bg}
        </div>
        <h3>${r.h3}</h3>
        <p class="card-excerpt">${r.excerpt}</p>
      </a>`;
  }).join('\n');

  // Geplante (zukuenftige) Artikel bekommen noindex, damit sie nicht vorzeitig in den Index geraten
  const robotsMeta = isLive(post) ? '' : '\n<meta name="robots" content="noindex, nofollow">';

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
<meta name="theme-color" content="#a8482a">${robotsMeta}
<title>${post.seoTitle}</title>
<meta name="description" content="${post.metaDesc}">

<meta property="og:type" content="article">
<meta property="og:title" content="${post.seoTitle}">
<meta property="og:description" content="${post.metaDesc}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Studio Visus">
<meta property="og:locale" content="de_DE">
<meta property="og:image" content="${post.ogImage}">
<meta property="og:image:alt" content="${post.ogImageAlt || post.heroAlt || ''}">
<meta property="article:published_time" content="${post.date}">
<meta property="article:author" content="${author.name}">
<meta property="article:section" content="${post.category}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${post.seoTitle}">
<meta name="twitter:description" content="${post.metaDesc}">
<meta name="twitter:image" content="${post.ogImage}">

<link rel="canonical" href="${url}">

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script><link rel="stylesheet" href="/css/fonts.css">

<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/blog.css">
<link rel="preload" href="/css/cookie-consent.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/cookie-consent.css"></noscript>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Studio Visus"><img class="brand-logo" src="/images/logo/studiovisus-logo-horizontal-thight.svg" alt="Studio Visus" width="180" height="48"></a>
    <div class="nav-links">
      <a href="/werke">Werke</a>
      <a href="/blog" class="active">Blog</a>
      <a href="/ueber">&Uuml;ber</a>
      <a href="/kontakt">Kontakt</a>
      <a href="/faq">FAQ</a>
    </div>
    <a href="/kontakt?art=sonstiges" class="nav-cart">Werk anfragen &rarr;</a>
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
    <a href="/blog" class="active">Blog</a>
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

<section class="article-head">
  <div class="article-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Start</a>
    <span class="sep">&rsaquo;</span>
    <a href="/blog">Blog</a>
    <span class="sep">&rsaquo;</span>
    <span>${post.breadcrumb}</span>
  </div>

  <div class="article-cat">${post.category}</div>
  <h1>${post.titleMain}${post.titleEm ? ` <em>${post.titleEm}</em>` : ''}</h1>
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
    <div class="bg">
      <img decoding="async" loading="eager" fetchpriority="high"${heroStyle}  src="${post.heroImg}" alt="${post.heroAlt}">
    </div>
  </div>
</div>

<section class="article-layout">
  <article class="article-body">
${post.body}
  </article>

  <aside class="article-sidebar">
    <div class="sidebar-toc">
      <h4>Inhalt</h4>
${tocHtml}
    </div>

    <div class="sidebar-cta">
      <h4>${post.ctaTitle || 'Werk f&uuml;r Ihren Raum?'}</h4>
      <p>${post.ctaText || 'Evidenzbasierte Originalkunst aus Hamburg. F&uuml;r Praxen, Kliniken und Therapier&auml;ume.'}</p>
      <a href="/werke" class="btn btn-primary">Werke ansehen &rarr;</a>
    </div>
  </aside>
</section>

<section class="blog-related">
  <div class="blog-related-inner reveal">
    <h2>Weitere <em>Artikel</em></h2>
    <div class="blog-related-grid">
${relatedHtml}
    </div>
  </div>
</section>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-brand"><img class="foot-brand-logo" src="/images/logo/studiovisus-logo-footer-thight.svg" alt="Studio Visus" width="200" height="50"></div>
      <div class="foot-tag">Handgemalte Unikate f&uuml;r R&auml;ume, in denen Atmosph&auml;re z&auml;hlt.</div>
    </div>
    <div class="foot-col">
      <h3>Standort</h3>
      <p>Lokstedter H&ouml;he 11e<br>22529 Hamburg</p>
    </div>
    <div class="foot-col">
      <h3>Kontakt</h3>
      <a href="mailto:info@studiovisus.de">info@studiovisus.de</a>
      <a href="tel:017684737726">0176 84 73 77 26</a>
      <a href="/kontakt">Kontaktformular &rarr;</a>
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

// ===== MAIN =====
function main() {
  const livePosts = posts.filter(isLive);
  const plannedPosts = posts.filter(p => !isLive(p));

  // Uebersicht
  fs.writeFileSync(path.join(here, 'blog.html'), generateOverview(livePosts), 'utf-8');
  console.log('blog.html (Overview) —', livePosts.length, 'live article(s)');

  // Alle Artikelseiten (live + geplant). Geplante bekommen noindex.
  posts.forEach(p => {
    const html = generateArticle(p, posts);
    fs.writeFileSync(path.join(here, `blog-${p.slug}.html`), html, 'utf-8');
    const tag = isLive(p) ? 'live' : `geplant ${p.publishDate} (noindex)`;
    console.log(`blog-${p.slug}.html — ${tag}`);
  });

  // Blog-Sitemap (NUR live geschaltete Artikel) als separate Datei.
  // Haupt-sitemap.xml bleibt unberuehrt; diese kann zusaetzlich eingereicht
  // oder via Sitemap-Index referenziert werden.
  const sorted = [...livePosts].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
  const blogUrls = [
    `  <url><loc>https://www.studiovisus.de/blog</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    ...sorted.map(p =>
      `  <url><loc>https://www.studiovisus.de/blog/${p.slug}</loc><lastmod>${p.date}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>`
    )
  ].join('\n');
  const sitemapBlog = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blogUrls}\n</urlset>\n`;
  fs.writeFileSync(path.join(here, 'sitemap-blog.xml'), sitemapBlog, 'utf-8');
  console.log(`sitemap-blog.xml — ${sorted.length} live URL(s)`);

  console.log(`\nFertig: 1 Uebersicht + ${posts.length} Artikelseite(n). Heute = ${TODAY}.`);
  if (plannedPosts.length) {
    console.log(`Geplant (noch nicht in Uebersicht): ${plannedPosts.map(p => p.slug + ' @ ' + p.publishDate).join(', ')}`);
  }
}

main();
