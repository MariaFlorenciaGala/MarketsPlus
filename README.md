# MarketsPlus — página web

Página de presentación de MarketsPlus y sus páginas legales. Es HTML, CSS y JavaScript
sin dependencias: se puede publicar tal cual en GitHub Pages, Netlify o cualquier hosting.

## Estructura

```
webMarketsPlus/
├── index.html              Página principal
├── terminos.html           Términos y condiciones
├── privacidad.html         Política de privacidad
├── arrepentimiento.html    Botón de arrepentimiento
├── eliminar-cuenta.html    Eliminar cuenta / botón de baja
├── css/
│   ├── estilos.css         Estilos de la página principal
│   └── legales.css         Estilos de las páginas legales
├── js/
│   └── main.js             Menú, animaciones, precios y links de descarga
└── assets/
    ├── img/                Logo e imagen para compartir en redes
    └── icons/              Favicon e ícono para la pantalla del celular
```

## Links de descarga

Arriba de `js/main.js` está `LINKS`. Completá cada link cuando lo tengas; los
botones con link vacío no se muestran:

```js
const LINKS = {
  play: '', // Google Play
  apk: '',  // descarga del APK
  app: '',  // app web
};
```

## Imagen para redes

Cuando tengas dominio, en `index.html` cambiá `og:image` por la dirección completa,
por ejemplo `https://tudominio.com/assets/img/og-marketsplus.jpg`, para que se vea
la imagen al compartir el link por WhatsApp.

Las páginas legales están en la raíz a propósito: sus direcciones
(`/privacidad.html`, `/eliminar-cuenta.html`) se cargan en Google Play y en Google Cloud.

Diseñado y programado por [Flor Gala](https://mariaflorenciagala.netlify.app/).
