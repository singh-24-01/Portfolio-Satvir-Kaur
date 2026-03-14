/* =========================================================
   AOS INIT
   ========================================================= */
AOS.init({
  duration: 750,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  once: true,
  offset: 70,
});

/* =========================================================
   NAVBAR — scroll shadow + active link
   ========================================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Active nav link via IntersectionObserver
const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-lnk');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(lnk => {
        lnk.classList.toggle(
          'active-lnk',
          lnk.getAttribute('href') === '#' + e.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

allSections.forEach(s => sectionObserver.observe(s));

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    // close mobile menu if open
    mobileMenu.classList.add('hidden');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* =========================================================
   MOBILE BURGER
   ========================================================= */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

/* =========================================================
   CUSTOM CURSOR
   ========================================================= */
const ring = document.getElementById('cur-ring');
const dot  = document.getElementById('cur-dot');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .glass-card, .sbadge, .ach-badge, .cta-btn').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* =========================================================
   STAT COUNTER ANIMATION
   ========================================================= */
const counters  = document.querySelectorAll('.stat-num');
let hasCounted  = false;

function runCounters() {
  counters.forEach(el => {
    const target   = +el.dataset.target;
    const duration = 1800;
    const isLarge  = target >= 1000;
    const step     = target / (duration / 16);
    let current    = 0;

    const tick = () => {
      current += step;
      if (current < target) {
        el.textContent = isLarge
          ? Math.floor(current).toLocaleString('fr-FR')
          : Math.floor(current);
        requestAnimationFrame(tick);
      } else {
        el.textContent = isLarge
          ? target.toLocaleString('fr-FR')
          : target;
      }
    };
    tick();
  });
}

const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !hasCounted) {
    hasCounted = true;
    // slight delay so hero animations settle
    setTimeout(runCounters, 1350);
  }
}, { threshold: 0.4 });

const heroEl = document.getElementById('hero');
if (heroEl) heroObs.observe(heroEl);

/* =========================================================
   CV DOWNLOAD PLACEHOLDER
   ========================================================= */
document.getElementById('cv-btn')?.addEventListener('click', e => {
  e.preventDefault();
  alert('Lien vers le CV PDF à configurer.');
});
