/* ============================================
   STUDIO VISUS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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

  /* ===== Filter-Buttons & Tags (Werke-Seite) ===== */
  document.querySelectorAll('.filters button, .tag').forEach(b => {
    b.addEventListener('click', () => {
      const group = b.parentElement;
      group.querySelectorAll('button, .tag').forEach(x => {
        x.classList.remove('active', 'is-active');
      });
      b.classList.add(b.tagName === 'BUTTON' ? 'active' : 'is-active');
    });
  });

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
      // kleines Timeout, damit der Browser nicht mit eigenem Anker-Scroll kollidiert
      setTimeout(() => {
        const top = formSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 80);
    }
  }

  /* ===== Formular-Absenden mit Erfolgs-Feedback ===== */
  const form = document.getElementById('anfrageform');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Native HTML5-Validierung respektieren (required, type=email …)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // TODO: Hier später echten Versand einbauen (fetch zu Backend / Form-Service).
      // Beispiel:
      //   const data = new FormData(form);
      //   fetch('/api/anfrage', { method:'POST', body:data })
      //     .then(r => r.ok ? showSuccess() : showError())
      //     .catch(showError);
      // Aktuell: Demo — direkt Erfolgsmeldung anzeigen.

      showSuccess();
    });

    function showSuccess(){
      if (!success) return;
      // Formular ausblenden, Erfolgsmeldung einblenden
      form.hidden = true;
      success.hidden = false;

      // Sanft zur Erfolgsmeldung scrollen (mit Versatz für die sticky Nav)
      const navEl = document.querySelector('.nav');
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;
      setTimeout(() => {
        const top = success.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    }
  }

});
