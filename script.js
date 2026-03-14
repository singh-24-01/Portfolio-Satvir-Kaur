/* =========================================================
   NAVBAR — active link + scrolled shadow
   ========================================================= */
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  const scrollY = window.scrollY;

  // scrolled class
  navbar.classList.toggle('scrolled', scrollY > 20);

  // active link based on current section in viewport
  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* =========================================================
   SMOOTH SCROLL — anchor links
   ========================================================= */
document.querySelectorAll('a[href^="#"], .scroll-to').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    // Close mobile menu if open
    navLinksEl.classList.remove('open');

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* =========================================================
   MOBILE BURGER MENU
   ========================================================= */
const burger      = document.getElementById('burger');
const navLinksEl  = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close on nav-link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});

/* =========================================================
   INTERSECTION OBSERVER — fade-in on scroll
   ========================================================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in').forEach((el, i) => {
  // Stagger children within the same parent
  el.style.transitionDelay = `${(i % 4) * 0.12}s`;
  observer.observe(el);
});

/* =========================================================
   HERO — instant visibility (above the fold)
   ========================================================= */
document.querySelectorAll('.hero .fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.18 + 0.25}s`;
  el.classList.add('visible');
});
