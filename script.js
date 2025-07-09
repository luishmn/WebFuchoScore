// Animación de entrada para secciones
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
  });

  // Ya no se necesita código para controlar videos de YouTube con hover
  // porque ahora son videos locales autoplay/loop.
});