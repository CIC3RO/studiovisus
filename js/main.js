/* ============================================
   STUDIO VISUS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Mobile Burger Menu ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');

  if (navToggle && mobileMenu) {
    let savedScrollY = 0;

    function openMenu() {
      savedScrollY = window.scrollY;
      mobileMenu.classList.add('is-open');
      if (mobileBackdrop) {
        mobileBackdrop.style.display = 'block';
        // force reflow so transition runs
        void mobileBackdrop.offsetWidth;
        mobileBackdrop.classList.add('is-visible');
      }
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.top = `-${savedScrollY}px`;
      document.body.classList.add('menu-open');
    }
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('is-visible');
        setTimeout(() => { mobileBackdrop.style.display = 'none'; }, 300);
      }
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      window.scrollTo(0, savedScrollY);
    }
    navToggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMenu);
    }
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });
    // Close if window resized above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ===== Werk-Detail Lightbox & Thumbnail Switching ===== */
  const mainImgWrap = document.querySelector('.werk-main-img');
  const thumbs = document.querySelectorAll('.werk-thumb');

  if (mainImgWrap) {
    const mainImg = mainImgWrap.querySelector('img');

    // Thumbs: tausche das Hauptbild beim Klick
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const thumbImg = thumb.querySelector('img');
        if (!thumbImg || !mainImg) return;
        // Active-Klasse umsetzen
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        // Tausch von src und alt
        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;
      });
    });

    // Lightbox bauen (einmalig)
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox && mainImg) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Bildvergrößerung');
      lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Schließen">×</button>
        <img class="lightbox-img" alt="">
      `;
      document.body.appendChild(lightbox);
    }

    if (lightbox && mainImg) {
      const lbImg = lightbox.querySelector('.lightbox-img');
      const lbClose = lightbox.querySelector('.lightbox-close');

      function openLightbox() {
        lbImg.src = mainImg.src;
        lbImg.alt = mainImg.alt;
        lightbox.classList.add('is-open');
        document.body.classList.add('lightbox-open');
      }
      function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('lightbox-open');
      }

      mainImgWrap.addEventListener('click', openLightbox);
      lbClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lbImg) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
      });
    }
  }

  /* ===== Reveal-Animation beim Scrollen ===== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ===== Filter-Buttons (Werke-Seite) =====
     Filtert die Werke anhand der data-Attribute (data-format, data-available,
     data-large). Update der Anzahl im Heading. Soft fade beim Wechsel. */
  const filterButtons = document.querySelectorAll('.filters button[data-filter]');
  const works = document.querySelectorAll('.work[data-format]');

  if (filterButtons.length && works.length) {
    console.log('[Studio Visus] Filter aktiv:', filterButtons.length, 'Buttons,', works.length, 'Werke');
    const countEl = document.querySelector('.gallery-count');

    function pad2(n){ return n < 10 ? '0' + n : String(n); }

    function matches(work, filter) {
      switch (filter) {
        case 'alle':         return true;
        case 'verfuegbar':   return work.dataset.available === 'true';
        case 'grossformat':  return work.dataset.large === 'true';
        case 'quadrat':      return work.dataset.format === 'quadrat';
        case 'hochformat':   return work.dataset.format === 'hochformat';
        case 'querformat':   return work.dataset.format === 'querformat';
        default:             return true;
      }
    }

    function applyFilter(filter) {
      let visible = 0;
      works.forEach(w => {
        const show = matches(w, filter);
        w.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });

      // Leere Gallery-Sections ausblenden (z. B. die zweite Section, wenn dort alle gefiltert sind).
      // Die erste Section bleibt immer sichtbar, weil sie den Filter-Header enthält.
      document.querySelectorAll('.gallery-wrap').forEach(section => {
        const hasHead = section.querySelector('.gallery-head');
        if (hasHead) return;
        const hasVisible = section.querySelector('.work:not(.is-hidden)');
        section.classList.toggle('is-empty', !hasVisible);
      });

      if (countEl) {
        countEl.textContent = visible === 1
          ? '· 01 Unikat'
          : `· ${pad2(visible)} Unikate`;
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });
  } else if (document.querySelector('.filters button')) {
    console.warn('[Studio Visus] Filter-Buttons gefunden, aber keine Werke mit data-format. Bitte HTML prüfen.');
  }

  /* ===== Anfrageformular — bedingte Felder (Kontakt-Seite) ===== */
  const radios = document.querySelectorAll('input[name="art"]');
  const conditionals = document.querySelectorAll('.conditional');

  if (radios.length && conditionals.length) {
    function updateConditionals() {
      const checked = document.querySelector('input[name="art"]:checked');
      if (!checked) return;
      const val = checked.value;
      conditionals.forEach(c => {
        c.classList.toggle('is-active', c.dataset.show === val);
      });
    }
    radios.forEach(r => r.addEventListener('change', updateConditionals));
    updateConditionals();
  }

  /* ===== Vorbefüllung & Auto-Scroll via URL-Parameter (Kontakt-Seite) =====
     Aufruf z.B. von einer Werk-Detailseite:
       kontakt.html?werk=Boot%20%C2%B7%2070%20%C3%97%20100%20cm
       kontakt.html?art=auftrag
     Setzt das passende Radio (Alpha/Beta/…), wählt im Dropdown das richtige
     Werk aus (fuzzy match auf den Werknamen) und scrollt sanft zum Formular. */
  const formSection = document.getElementById('anfrage');
  if (formSection && radios.length) {
    const params = new URLSearchParams(window.location.search);
    const werkParam = params.get('werk');
    const artParam = params.get('art');

    let didPrefill = false;

    // 1) Art wählen — entweder explizit via ?art=…, sonst implizit via ?werk=…
    let targetArt = null;
    if (artParam) {
      const valid = ['werk', 'auftrag', 'beratung', 'sonstiges'];
      if (valid.includes(artParam)) targetArt = artParam;
    } else if (werkParam) {
      targetArt = 'werk';
    }

    if (targetArt) {
      const radio = document.querySelector(`input[name="art"][value="${targetArt}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        didPrefill = true;
      }
    }

    // 2) Werk-Dropdown vorausfüllen (fuzzy match auf den Werknamen)
    if (werkParam) {
      const select = document.getElementById('werk-name');
      if (select) {
        const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
        const param = norm(werkParam);
        // Werkname = alles vor dem ersten "·"
        const paramName = norm(param.split('·')[0] || param);

        let bestMatch = null;
        for (const opt of select.options) {
          const optText = norm(opt.text);
          if (optText === param) { bestMatch = opt; break; } // exakter Match
          const optName = norm(optText.split('·')[0] || optText);
          if (optName && optName === paramName) bestMatch = opt;
        }

        if (bestMatch) {
          select.value = bestMatch.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          // Falls das Werk nicht im Dropdown ist, „Ich bin mir noch nicht sicher" wählen
          // (oder erste Option lassen). Wir geben dem Nutzer einen Hinweis im Feld.
          const fallback = Array.from(select.options).find(o =>
            /noch nicht sicher/i.test(o.text)
          );
          if (fallback) select.value = fallback.value;
        }
        didPrefill = true;
      }
    }

    // 3) Sanft zum Formular scrollen (mit Versatz für die sticky Nav)
    if (didPrefill) {
      const navEl = document.querySelector('.nav');
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;
      // Wenn Anfrageart und Werk schon vorausgewählt sind, scrollen wir direkt
      // bis zu Schritt 02 ("Ihre Nachricht"), damit der Nutzer dort weitermacht.
      const stepNachricht = document.getElementById('step-nachricht');
      const target = stepNachricht || formSection;
      // kleines Timeout, damit der Browser nicht mit eigenem Anker-Scroll kollidiert
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
        // Optional: Fokus aufs Textarea, damit der Nutzer sofort tippen kann
        if (stepNachricht) {
          const textarea = stepNachricht.querySelector('textarea');
          if (textarea) setTimeout(() => textarea.focus({ preventScroll: true }), 600);
        }
      }, 80);
    }
  }

  /* ===== Formular-Absenden via Web3Forms ===== */
  const form = document.getElementById('anfrageform');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Native HTML5-Validierung respektieren
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Submit-Button deaktivieren, damit nicht doppelt gesendet wird
      const btn = form.querySelector('.btn-submit');
      const btnText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Wird gesendet …';
      }

      const data = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          showSuccess();
        } else {
          showError();
        }
      })
      .catch(function () {
        showError();
      });
    });

    function showSuccess(){
      if (!success) return;
      form.hidden = true;
      success.hidden = false;

      const navEl = document.querySelector('.nav');
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;
      setTimeout(() => {
        const top = success.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    }

    function showError(){
      var btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Anfrage absenden →';
      }
      alert('Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@studiovisus.de.');
    }
  }

});
