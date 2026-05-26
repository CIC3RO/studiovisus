/* ============================================================
   Digitale Galerie — Studio Visus
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const stage = document.querySelector('.galerie-stage');
    if (!stage) return;

    const scrollEl = stage.querySelector('.galerie-scroll');
    const wand = stage.querySelector('.galerie-wand');
    const progressBar = stage.querySelector('.progress-bar');
    const btnPrev = stage.querySelector('.btn-prev');
    const btnNext = stage.querySelector('.btn-next');
    const werke = Array.from(stage.querySelectorAll('.galerie-werk'));

    let scrollX = 0;
    let maxScroll = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let velocity = 0;
    let lastDragX = 0;
    let lastDragTime = 0;
    let animFrame = null;

    function recalculate() {
      const stageWidth = stage.clientWidth;
      const scrollWidth = scrollEl.scrollWidth;
      maxScroll = Math.max(0, scrollWidth - stageWidth);
      scrollX = Math.min(scrollX, maxScroll);
      applyScroll();
    }

    function applyScroll() {
      scrollEl.style.transform = `translateX(${-scrollX}px)`;
      const pct = maxScroll > 0 ? (scrollX / maxScroll) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + '%';
      if (btnPrev) btnPrev.disabled = scrollX <= 1;
      if (btnNext) btnNext.disabled = scrollX >= maxScroll - 1;
    }

    function setScroll(x, smooth) {
      x = Math.max(0, Math.min(maxScroll, x));
      if (smooth) {
        scrollEl.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        scrollX = x;
        applyScroll();
        setTimeout(() => {
          scrollEl.style.transition = '';
        }, 500);
      } else {
        scrollX = x;
        applyScroll();
      }
    }

    function stepScroll(direction) {
      // Springe zum nächsten / vorigen Werk
      const stageMid = scrollX + stage.clientWidth / 2;
      const positions = werke.map(w => {
        const left = parseFloat(w.style.left);
        const wandWidth = wand.clientWidth;
        return (left / 100) * wandWidth;
      }).sort((a, b) => a - b);

      let target;
      if (direction > 0) {
        target = positions.find(p => p > stageMid + 50);
        if (target === undefined) target = maxScroll + stage.clientWidth / 2;
      } else {
        const reverse = positions.slice().reverse();
        target = reverse.find(p => p < stageMid - 50);
        if (target === undefined) target = stage.clientWidth / 2;
      }
      setScroll(target - stage.clientWidth / 2, true);
    }

    // === Drag mit Maus ===
    stage.addEventListener('mousedown', function (e) {
      if (e.target.closest('.galerie-werk') ||
          e.target.closest('.galerie-controls')) return;
      isDragging = true;
      dragStartX = e.clientX;
      lastDragX = e.clientX;
      lastDragTime = performance.now();
      dragStartScroll = scrollX;
      velocity = 0;
      stage.classList.add('is-dragging');
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      const now = performance.now();
      const dx = e.clientX - lastDragX;
      const dt = now - lastDragTime;
      if (dt > 0) velocity = dx / dt;
      lastDragX = e.clientX;
      lastDragTime = now;
      scrollX = dragStartScroll - (e.clientX - dragStartX);
      scrollX = Math.max(0, Math.min(maxScroll, scrollX));
      applyScroll();
    });

    document.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      // Trägheits-Effekt
      if (Math.abs(velocity) > 0.3) {
        applyMomentum();
      }
    });

    function applyMomentum() {
      const friction = 0.94;
      function tick() {
        velocity *= friction;
        scrollX -= velocity * 16;
        scrollX = Math.max(0, Math.min(maxScroll, scrollX));
        applyScroll();
        if (Math.abs(velocity) > 0.05) {
          animFrame = requestAnimationFrame(tick);
        }
      }
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(tick);
    }

    // === Touch ===
    let touchStartX = 0;
    let touchStartScroll = 0;
    let touchLastX = 0;
    let touchLastTime = 0;
    let touchVelocity = 0;
    let isTouching = false;

    stage.addEventListener('touchstart', function (e) {
      if (e.target.closest('.galerie-controls')) return;
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchLastX = t.clientX;
      touchLastTime = performance.now();
      touchStartScroll = scrollX;
      isTouching = true;
      cancelAnimationFrame(animFrame);
    }, { passive: true });

    stage.addEventListener('touchmove', function (e) {
      if (!isTouching) return;
      const t = e.touches[0];
      const now = performance.now();
      const dx = t.clientX - touchLastX;
      const dt = now - touchLastTime;
      if (dt > 0) touchVelocity = dx / dt;
      touchLastX = t.clientX;
      touchLastTime = now;
      scrollX = touchStartScroll - (t.clientX - touchStartX);
      scrollX = Math.max(0, Math.min(maxScroll, scrollX));
      applyScroll();
    }, { passive: true });

    stage.addEventListener('touchend', function () {
      if (!isTouching) return;
      isTouching = false;
      if (Math.abs(touchVelocity) > 0.3) {
        velocity = touchVelocity;
        applyMomentum();
      }
    });

    // === Mausrad horizontal ===
    stage.addEventListener('wheel', function (e) {
      // Akzeptiere sowohl horizontales (deltaX) als auch vertikales (deltaY) Scrollen
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 1) {
        e.preventDefault();
        scrollX += delta;
        scrollX = Math.max(0, Math.min(maxScroll, scrollX));
        applyScroll();
      }
    }, { passive: false });

    // === Tastatur ===
    stage.setAttribute('tabindex', '0');
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepScroll(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepScroll(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setScroll(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        setScroll(maxScroll, true);
      }
    });

    // === Buttons ===
    if (btnPrev) btnPrev.addEventListener('click', () => stepScroll(-1));
    if (btnNext) btnNext.addEventListener('click', () => stepScroll(1));

    // === Click auf Werk → Modal ===
    const modal = document.querySelector('.werk-modal');
    const modalImg = modal ? modal.querySelector('.werk-modal-img img') : null;
    const modalTitle = modal ? modal.querySelector('.werk-modal-title') : null;
    const modalSpecs = modal ? modal.querySelector('.werk-modal-specs') : null;
    const modalCta = modal ? modal.querySelector('.werk-modal-cta') : null;
    const modalClose = modal ? modal.querySelector('.werk-modal-close') : null;

    function openModal(werkEl) {
      if (!modal) return;
      modalImg.src = werkEl.dataset.img;
      modalImg.alt = werkEl.dataset.title + ', Originalgemälde';
      modalTitle.textContent = werkEl.dataset.title;
      const specs = [
        werkEl.dataset.technik,
        werkEl.dataset.dimension,
        werkEl.dataset.jahr,
      ].filter(Boolean).join(' · ');
      const soldNote = werkEl.dataset.sold === 'true'
        ? '<br><strong>Dieses Werk ist verkauft.</strong> Auftragsarbeit möglich.'
        : '';
      modalSpecs.innerHTML = specs + soldNote;
      modalCta.href = werkEl.dataset.url;
      modalCta.textContent = werkEl.dataset.sold === 'true' ? 'Zum Werk →' : 'Zum Werk →';
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }

    werke.forEach(function (w) {
      w.addEventListener('click', function (e) {
        // Wenn gerade gedraggt wurde, kein Klick auslösen
        if (Math.abs(scrollX - dragStartScroll) > 5 && (isDragging || performance.now() - lastDragTime < 100)) {
          return;
        }
        e.preventDefault();
        openModal(w);
      });
      // Tastatur-Aktivierung
      w.setAttribute('tabindex', '0');
      w.setAttribute('role', 'button');
      w.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(w);
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // === Init ===
    // Wir warten, bis das Wand-Bild geladen ist, damit clientWidth korrekt ist
    const wandImg = new Image();
    wandImg.onload = function () {
      recalculate();
    };
    wandImg.src = 'images/galerie/galeriewand.png';

    // Fallback falls onload nicht feuert
    requestAnimationFrame(function () {
      setTimeout(recalculate, 100);
      setTimeout(recalculate, 500);
    });

    window.addEventListener('resize', recalculate);
  });
})();
