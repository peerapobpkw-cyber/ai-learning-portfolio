const nav = document.getElementById("nav");
const menuToggle = document.querySelector(".menu-toggle");
const toTop = document.getElementById("toTop");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
});

toTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));


// Evidence image lightbox
(() => {
  const box = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  const images = Array.from(document.querySelectorAll('.evidence-images img'));
  let current = 0;

  function show(index) {
    if (!images.length) return;
    current = (index + images.length) % images.length;
    const item = images[current];
    image.src = item.src;
    image.alt = item.alt || '';
    caption.textContent = item.alt || '';
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    image.src = '';
    document.body.style.overflow = '';
  }

  images.forEach((item, index) => {
    item.addEventListener('click', () => show(index));
  });
  close.addEventListener('click', hide);
  prev.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  next.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });

  box.addEventListener('click', (e) => {
    if (e.target === box) hide();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
