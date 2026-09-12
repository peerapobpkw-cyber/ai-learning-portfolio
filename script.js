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




// Final image zoom / lightbox
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('lightbox');
  const bigImage = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  const items = [...document.querySelectorAll('.evidence-images img')];

  if (!box || !bigImage || !items.length) return;

  let index = 0;

  const open = (i) => {
    index = (i + items.length) % items.length;
    const img = items[index];
    bigImage.src = img.src;
    bigImage.alt = img.alt || '';
    caption.textContent = img.alt || '';
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const hide = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    bigImage.src = '';
    document.body.style.overflow = '';
  };

  items.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  close?.addEventListener('click', hide);
  prev?.addEventListener('click', () => open(index - 1));
  next?.addEventListener('click', () => open(index + 1));

  box.addEventListener('click', (e) => {
    if (e.target === box) hide();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') open(index - 1);
    if (e.key === 'ArrowRight') open(index + 1);
  });
});
