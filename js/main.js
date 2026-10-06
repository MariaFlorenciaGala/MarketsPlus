/* =========================================================
   MarketsPlus — página principal
   Se carga en el <head>: marca que hay JS (para las animaciones)
   y el resto corre cuando la página terminó de cargar.
   ========================================================= */

// Links de descarga: completalos cuando los tengas.
// Si un link está vacío, ese botón no se muestra.
const LINKS = {
  play: '', // Google Play, ej: https://play.google.com/store/apps/details?id=com.marketsplus.app
  apk: '',  // descarga del APK
  app: '',  // dirección de la app web
};

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  iniciarLinksDeDescarga();
  iniciarMenu();
  iniciarAnimaciones();
  iniciarContadores();
  iniciarPrecios();
});

/** Muestra solo los botones de descarga que tienen link. */
function iniciarLinksDeDescarga() {
  let hayLink = false;
  document.querySelectorAll('[data-link]').forEach((boton) => {
    const url = LINKS[boton.dataset.link];
    if (url) {
      boton.href = url;
      hayLink = true;
    } else {
      boton.classList.add('oculto');
    }
  });
  if (!hayLink) document.getElementById('dl-pronto').classList.remove('oculto');
}

/** Barra fija con fondo al bajar y menú hamburguesa en el celular. */
function iniciarMenu() {
  const nav = document.getElementById('navbar');
  const boton = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const abrir = (abierto) => {
    document.body.classList.toggle('nav-abierto', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
  };
  boton.addEventListener('click', () => abrir(!document.body.classList.contains('nav-abierto')));
  document.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => abrir(false)));
}

/** Hace aparecer los bloques a medida que entran en pantalla. */
function iniciarAnimaciones() {
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
}

/** Los números de la sección de datos cuentan desde 0. */
function iniciarContadores() {
  const contar = (el, hasta, duracion = 1500) => {
    const inicio = performance.now();
    const paso = (ahora) => {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = Math.round((1 - Math.pow(1 - avance, 3)) * hasta);
      if (avance < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      contar(e.target, Number(e.target.dataset.target));
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach((el) => observer.observe(el));
}

/** Botón Mensual / Anual de los precios. */
function iniciarPrecios() {
  const seccion = document.getElementById('pricing');
  const botones = document.querySelectorAll('[data-plan]');

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const anual = boton.dataset.plan === 'annual';
      seccion.classList.toggle('is-annual', anual);
      botones.forEach((b) => {
        const activo = b === boton;
        b.classList.toggle('active', activo);
        b.setAttribute('aria-pressed', String(activo));
      });
    });
  });
}
