/* ================================================================
   JAVIER RODRÍGUEZ GONZÁLEZ — main.js
   Interactividad: nav, animaciones, screenshots (Microlink API)
   ================================================================ */

'use strict';

/* ── NAV: Efecto scroll + hamburger ──────────────────────────── */
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Backdrop blur al hacer scroll
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

// Hamburger toggle (mobile)
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Cerrar menú al hacer click en un enlace
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Cerrar menú al clickar fuera
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ── ACTIVE NAV LINK ──────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__link[href^="#"]');

function updateActiveLink() {
  let current = '';
  const scrollMid = window.scrollY + window.innerHeight / 2.5;

  sections.forEach(sec => {
    if (sec.offsetTop <= scrollMid) current = sec.id;
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* ── SCROLL ANIMATIONS (IntersectionObserver) ─────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── LANGUAGE BARS: animar al aparecer ───────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Forzar reflow para que la transición CSS sea visible
        entry.target.style.width = entry.target.style.width;
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.lang-card__fill').forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = '0%';
  barObserver.observe(bar);

  // Delay para que el IntersectionObserver la pille en 0 primero
  setTimeout(() => {
    const barEntry = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        bar.style.width = targetWidth;
        barEntry.disconnect();
      }
    }, { threshold: 0.5 });
    barEntry.observe(bar);
  }, 100);
});

/* ── SCREENSHOTS via Microlink API ───────────────────────────── */

/**
 * Carga la captura de pantalla de una URL usando la API gratuita de Microlink.
 * Solo se llama para las tarjetas con data-preview-url (webs públicas).
 */
async function loadScreenshot(card) {
  const url = card.dataset.previewUrl;
  if (!url) return;

  const img         = card.querySelector('.project-card__screenshot');
  const placeholder = card.querySelector('.project-card__placeholder');
  if (!img || !placeholder) return;

  const apiEndpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`;

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) return;

    const data = await response.json();
    const screenshotUrl = data?.data?.screenshot?.url;
    if (!screenshotUrl) return;

    // Precargar imagen antes de mostrarla
    const tempImg = new Image();
    tempImg.src = screenshotUrl;

    tempImg.onload = () => {
      img.src = screenshotUrl;
      img.classList.add('loaded');
      // Desvanecer el placeholder
      placeholder.style.transition = 'opacity .5s ease';
      placeholder.style.opacity = '0';
    };

  } catch (err) {
    // Sin conexión o límite de API: el placeholder se mantiene visible.
    console.info('[Portfolio] Screenshot no disponible para:', url);
  }
}

// Usar IntersectionObserver para cargar screenshots solo cuando sean visibles
const screenshotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadScreenshot(entry.target);
        screenshotObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '200px' } // Precargar un poco antes de ser visible
);

document.querySelectorAll('.project-card[data-preview-url]').forEach(card => {
  screenshotObserver.observe(card);
});

/* ── SMOOTH SCROLL para anchor links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = nav.offsetHeight + 16;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ── CURSOR CUSTOM sutil (solo desktop) ──────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  // Solo añade un micro efecto de escala en tarjetas si quieres
  // (no implementamos custom cursor para mantener accesibilidad)
}

/* ── INIT ─────────────────────────────────────────────────────── */
updateActiveLink();
