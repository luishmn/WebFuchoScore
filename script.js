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

  // --- CÓDIGO para el hover del video sin el API de YouTube ---
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach(container => {
    const iframe = container.querySelector('.youtube-iframe');
    // Guardamos el src original del iframe.
    // Esto es importante para reiniciar el video cuando el mouse sale.
    const originalSrc = iframe.src; 

    // Cuando el mouse entra al contenedor:
    container.addEventListener('mouseenter', () => {
      container.classList.add('active'); // Activa los estilos CSS para mostrar el video
      // Añadimos '?autoplay=1' o '&autoplay=1' al src para que el video inicie automáticamente
      // Solo si no se ha añadido ya, para evitar recargas innecesarias.
      if (!iframe.src.includes('autoplay=1')) {
          iframe.src = originalSrc + '?autoplay=1&mute=1'; // Añadimos 'mute=1' para mayor compatibilidad con autoplay
      }
    });

    // Cuando el mouse sale del contenedor:
    container.addEventListener('mouseleave', () => {
      container.classList.remove('active'); // Desactiva los estilos CSS para ocultar el video
      // Reiniciamos el src del iframe a su valor original.
      // Esto detiene el video y lo devuelve al inicio.
      iframe.src = originalSrc;
    });
  });
});