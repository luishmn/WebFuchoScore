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
});

// NUEVO CÓDIGO PARA REPRODUCCIÓN DE VIDEOS DE YOUTUBE AL HOVER
// Función para cargar el API de YouTube IFrame Player
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api"; // URL correcta del API
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Array para almacenar los objetos de los reproductores de YouTube
let players = {};

// Esta función se ejecutará automáticamente cuando el API de YouTube esté listo
function onYouTubeIframeAPIReady() {
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach(container => {
    const videoId = container.dataset.videoId;
    let player = null; // Variable para el reproductor de YouTube

    // Evento al pasar el ratón sobre el contenedor
    container.addEventListener('mouseenter', () => {
      // Si el reproductor no existe, créalo
      if (!player) {
        // Crea un div temporal para el reproductor
        const playerDiv = document.createElement('div');
        playerDiv.id = `player-${videoId}`;
        container.appendChild(playerDiv);

        player = new YT.Player(playerDiv.id, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,      // Reproducir automáticamente
            controls: 0,      // Ocultar controles del reproductor
            showinfo: 0,      // Ocultar título y el logo de YouTube
            modestbranding: 1, // Ocultar el logo de YouTube en la barra de control
            loop: 1,          // Repetir el video
            playlist: videoId, // Necesario para que loop funcione con un solo video
            fs: 0,            // Deshabilitar el botón de pantalla completa
            rel: 0,           // No mostrar videos relacionados al final
            mute: 1           // Silenciar el video por defecto
          },
          events: {
            'onReady': (event) => {
              event.target.playVideo();
              container.classList.add('active'); // Muestra el iframe y oculta la imagen
            },
            'onStateChange': (event) => {
              // Asegura que el video se repita si termina
              if (event.data === YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
              }
            }
          }
        });
        players[videoId] = player; // Guarda el reproductor en el objeto players
      } else {
        // Si el reproductor ya existe, solo asegúrate de que esté reproduciéndose y visible
        player.playVideo();
        container.classList.add('active');
      }
    });

    // Evento al quitar el ratón del contenedor
    container.addEventListener('mouseleave', () => {
      if (player) {
        player.pauseVideo(); // Pausa el video
        container.classList.remove('active'); // Oculta el iframe y muestra la imagen
      }
    });
  });
}

// Carga el API de YouTube cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadYouTubeAPI);