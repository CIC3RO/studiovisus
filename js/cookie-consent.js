/* ============================================
   STUDIO VISUS — Cookie Consent Manager
   DSGVO / TDDDG konform
   
   Prinzip:
   - Technisch notwendige Cookies: immer aktiv (kein Opt-in nötig)
   - Analyse-Cookies (GA): NUR nach explizitem Opt-in
   - Entscheidung wird in Cookie gespeichert (1 Jahr)
   - Widerruf jederzeit über "Cookie-Einstellungen" im Footer
   ============================================ */

(function() {
  'use strict';

  const CONSENT_KEY = 'sv_consent';
  const CONSENT_DAYS = 365;

  // === Google Analytics Config ===
  // HIER IHRE GA-ID EINTRAGEN:
  const GA_ID = 'G-54DPTBTETS';

  // =============================
  // Cookie-Hilfsfunktionen
  // =============================
  // Secure-Flag nur auf HTTPS — sonst funktioniert das Cookie lokal nicht (file://, http://localhost).
  // Bei live HTTPS wird das Flag automatisch gesetzt.
  const SECURE_FLAG = (location.protocol === 'https:') ? ';Secure' : '';

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(value) +
      ';expires=' + d.toUTCString() +
      ';path=/;SameSite=Lax' + SECURE_FLAG;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax' + SECURE_FLAG;
  }

  // =============================
  // Consent lesen/schreiben
  // =============================
  function getConsent() {
    const raw = getCookie(CONSENT_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch(e) { return null; }
  }

  function saveConsent(analytics) {
    const consent = {
      necessary: true,  // immer true
      analytics: !!analytics,
      timestamp: new Date().toISOString(),
      version: 1
    };
    setCookie(CONSENT_KEY, JSON.stringify(consent), CONSENT_DAYS);
    return consent;
  }

  // =============================
  // Tracking laden / blockieren
  // =============================
  function loadGoogleAnalytics() {
    if (document.getElementById('ga-script')) return; // bereits geladen

    // gtag.js laden
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    // gtag initialisieren
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Lax;Secure'
    });
  }

  function removeGoogleAnalytics() {
    // GA-Script entfernen
    const script = document.getElementById('ga-script');
    if (script) script.remove();

    // GA-Cookies löschen
    const gaCookies = document.cookie.split(';')
      .map(c => c.trim().split('=')[0])
      .filter(n => n.startsWith('_ga') || n.startsWith('_gid') || n.startsWith('_gat'));
    gaCookies.forEach(name => {
      deleteCookie(name);
      // Auch mit Domain-Varianten löschen
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + location.hostname;
    });

    // GA blockieren für diese Session
    window['ga-disable-' + GA_ID] = true;
  }

  function applyConsent(consent) {
    if (consent && consent.analytics) {
      window['ga-disable-' + GA_ID] = false;
      loadGoogleAnalytics();
    } else {
      removeGoogleAnalytics();
    }
  }

  // =============================
  // Banner HTML erzeugen
  // =============================
  function createBanner() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'cc-overlay';
    overlay.id = 'cc-overlay';

    // Banner
    const banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="cc-inner">
        <div class="cc-text">
          <h3>Cookie-<em>Einstellungen</em></h3>
          <p>Diese Website verwendet technisch notwendige Cookies sowie optionale Analyse-Cookies (Google Analytics). Analyse-Cookies werden <strong>nur mit Ihrer Einwilligung</strong> gesetzt und helfen uns, die Website zu verbessern.</p>

          <div class="cc-categories">
            <div class="cc-cat">
              <label class="cc-toggle">
                <input type="checkbox" checked disabled aria-label="Technisch notwendige Cookies (immer aktiv, kann nicht deaktiviert werden)">
                <span class="slider"></span>
              </label>
              <span>Technisch notwendig</span>
              <span class="cc-badge cc-badge-required">Immer aktiv</span>
            </div>
            <div class="cc-cat">
              <label class="cc-toggle">
                <input type="checkbox" id="cc-analytics-toggle" aria-label="Analyse- und Statistik-Cookies aktivieren">
                <span class="slider"></span>
              </label>
              <span>Analyse & Statistik</span>
              <span class="cc-badge cc-badge-optional">Optional</span>
            </div>
          </div>

          <button class="cc-btn-details" id="cc-details-btn" type="button">Details anzeigen</button>

          <div class="cc-details" id="cc-details">
            <div class="cc-detail-group">
              <h4>Technisch notwendig</h4>
              <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich, also Seitennavigation, Sicherheit und Speicherung Ihrer Cookie-Einstellung. Sie können nicht deaktiviert werden.</p>
              <div class="cookie-list">Cookies: sv_consent (Ihre Cookie-Entscheidung, 1 Jahr)</div>
            </div>
            <div class="cc-detail-group">
              <h4>Analyse & Statistik</h4>
              <p>Google Analytics erfasst anonymisierte Nutzungsdaten, also welche Seiten besucht werden, wie lange, von wo. Die IP-Adresse wird anonymisiert. Diese Daten helfen uns, die Website zu verbessern.</p>
              <div class="cookie-list">Cookies: _ga, _gid, _gat (Google Analytics, bis 14 Monate) ·· Datenübertragung in die USA auf Basis von EU-Standardvertragsklauseln und EU-US Data Privacy Framework</div>
            </div>
            <p style="margin-top:12px"><a href="datenschutz.html">Vollst&auml;ndige Datenschutzerkl&auml;rung lesen &rarr;</a></p>
          </div>
        </div>

        <div class="cc-actions">
          <button class="cc-btn cc-btn-accept" id="cc-accept" type="button">Alle akzeptieren</button>
          <button class="cc-btn cc-btn-reject" id="cc-reject" type="button">Nur notwendige</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(banner);
    return { banner, overlay };
  }

  // =============================
  // Banner anzeigen / verstecken
  // =============================
  function showBanner() {
    let banner = document.getElementById('cc-banner');
    let overlay = document.getElementById('cc-overlay');

    if (!banner) {
      const els = createBanner();
      banner = els.banner;
      overlay = els.overlay;
      bindEvents();
    }

    // Analytics-Toggle auf aktuellen Stand setzen
    const current = getConsent();
    const toggle = document.getElementById('cc-analytics-toggle');
    if (toggle && current) {
      toggle.checked = current.analytics;
    }

    requestAnimationFrame(() => {
      banner.classList.add('is-visible');
      overlay.classList.add('is-visible');
    });
  }

  function hideBanner() {
    const banner = document.getElementById('cc-banner');
    const overlay = document.getElementById('cc-overlay');
    if (banner) banner.classList.remove('is-visible');
    if (overlay) overlay.classList.remove('is-visible');
  }

  // =============================
  // Event-Handler
  // =============================
  function bindEvents() {
    // Akzeptieren
    document.getElementById('cc-accept').addEventListener('click', function() {
      const consent = saveConsent(true);
      applyConsent(consent);
      hideBanner();
    });

    // Ablehnen (nur notwendige)
    document.getElementById('cc-reject').addEventListener('click', function() {
      const consent = saveConsent(false);
      applyConsent(consent);
      hideBanner();
    });

    // Details toggle
    document.getElementById('cc-details-btn').addEventListener('click', function() {
      const details = document.getElementById('cc-details');
      const isOpen = details.classList.toggle('is-open');
      this.textContent = isOpen ? 'Details ausblenden' : 'Details anzeigen';
    });
  }

  // Footer-Link "Cookie-Einstellungen" — IMMER aktiv, unabhängig davon, ob das Banner schon
  // gezeigt wurde. Wichtig: dieser Handler muss vor dem Banner-Init registriert sein, weil
  // der User sonst auf den Link klickt, bevor bindEvents() jemals lief.
  function bindFooterTrigger() {
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('[data-cc-open]');
      if (trigger) {
        e.preventDefault();
        showBanner();
      }
    });
  }

  // =============================
  // Initialisierung
  // =============================
  function init() {
    bindFooterTrigger();
    const consent = getConsent();

    if (consent === null) {
      // Noch keine Entscheidung — Banner zeigen, NICHTS laden
      showBanner();
    } else {
      // Entscheidung vorhanden — anwenden (ohne Banner)
      applyConsent(consent);
    }
  }

  // Warten bis DOM bereit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global zugänglich für programmatischen Zugriff
  window.CookieConsent = {
    show: showBanner,
    getConsent: getConsent,
    revokeConsent: function() {
      deleteCookie(CONSENT_KEY);
      removeGoogleAnalytics();
      showBanner();
    }
  };

})();
