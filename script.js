/* =========================================================
   AOS
   ========================================================= */
AOS.init({
  duration: 700,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  once: true,
  offset: 60,
});

/* =========================================================
   NAVBAR — glass au scroll + active link
   ========================================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 55);
}, { passive: true });

const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-lnk');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(lnk => {
        lnk.classList.toggle('active-lnk', lnk.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.35 });

allSections.forEach(s => sectionObs.observe(s));

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
   STAT COUNTERS
   ========================================================= */
const counters = document.querySelectorAll('.stat-num');
let counted    = false;

function runCounters() {
  counters.forEach(el => {
    const target   = +el.dataset.target;
    const isLarge  = target >= 1000;
    const duration = 1800;
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
        el.textContent = isLarge ? target.toLocaleString('fr-FR') : target;
      }
    };
    tick();
  });
}

const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    setTimeout(runCounters, 1300);
  }
}, { threshold: 0.4 });

const heroEl = document.getElementById('hero');
if (heroEl) heroObs.observe(heroEl);

/* =========================================================
   CV DOWNLOAD — placeholder
   ========================================================= */
document.getElementById('cv-btn')?.addEventListener('click', e => {
  e.preventDefault();
  alert('Lien vers le CV PDF à configurer.');
});
