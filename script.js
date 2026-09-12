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
