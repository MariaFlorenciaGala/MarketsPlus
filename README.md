<div align="center">

<img src="assets/img/logo-marketplus.webp" alt="MarketsPlus" width="320">

### Gestión comercial simple, completa y desde el celular

**Ventas · Stock · Caja · Fiado · Empleados · Estadísticas**

![Flutter](https://img.shields.io/badge/Flutter-3.47-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-3-0175C2?style=for-the-badge&logo=dart&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Android](https://img.shields.io/badge/Android-6.0+-3DDC84?style=for-the-badge&logo=android&logoColor=white)

![Estado](https://img.shields.io/badge/estado-pre--lanzamiento-f59e0b?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-propietaria-ef4444?style=flat-square)
![Hecho en](https://img.shields.io/badge/hecho%20en-Argentina-74acdf?style=flat-square)

</div>

---

## Sobre el proyecto

Soy **Flor Gala**, Técnica Universitaria en Tecnologías de Programación, y **MarketsPlus**
es el producto que diseñé y desarrollé de punta a punta: la aplicación móvil, la base de
datos, la lógica de servidor, el sistema de cobros y la página de presentación.

Nació de una necesidad concreta que observé en los comercios de barrio: kioscos,
almacenes y pequeños locales que todavía administran su negocio con un cuaderno, o que
no pueden costear un sistema de gestión tradicional ni una computadora en el mostrador.
Mi objetivo fue construir una herramienta **profesional, confiable y accesible**, que
funcione completa desde el celular, con letra grande y una interfaz pensada para personas
que no son expertas en tecnología.

MarketsPlus se adapta al rubro de cada comercio. Hoy incluye **más de 45 rubros**
(kioscos, almacenes, librerías, vinotecas, importados, entre otros), cada uno con sus
categorías y herramientas propias.

> **MarketsPlus saldrá a la venta bajo un modelo de membresía.** Este repositorio contiene
> la página de presentación del producto. El código de la aplicación se mantiene en un
> repositorio privado. Todos los derechos están reservados (ver [Licencia](#licencia)).

---

## Funcionalidades

| | Función | Descripción |
|:-:|---|---|
| 🛒 | **Punto de venta** | Ventas con escáner de código de barras desde la cámara del celular, varios carritos en simultáneo y cálculo de vuelto. |
| 📦 | **Inventario** | Stock en tiempo real, alertas de faltantes y catálogo compartido: al escanear un producto conocido, sus datos se completan solos. |
| 💰 | **Caja con arqueo** | Apertura y cierre de caja con el efectivo esperado calculado automáticamente, separado de transferencias y fiado. |
| 🤝 | **Fiado y clientes** | Cuentas corrientes por cliente, registro de deudas y cobros. |
| 👥 | **Empleados** | Cuentas para el personal con permisos acotados y registro de quién vendió o anuló cada operación. |
| 📊 | **Estadísticas y ganancias** | Ventas por día y por mes, y ganancia real calculada como precio de venta menos costo. |
| 📴 | **Funciona sin internet** | Si se corta la conexión, las ventas quedan guardadas en el dispositivo y se sincronizan solas, sin duplicarse. |
| 📄 | **Reportes** | Exportación a PDF y Excel. |

---

## Modelo de negocio

MarketsPlus se comercializa mediante una **membresía PRO de pago único por período**:
el cliente elige un mes o un año, paga una sola vez y **no existen débitos automáticos**.
Al vencer, la aplicación avisa con anticipación para que renueve.

| Etapa | Duración | Qué incluye |
|---|---|---|
| **Prueba PRO** | 15 días | Todas las funciones, sin costo y sin tarjeta. |
| **Prueba limitada** | 10 días más | Hasta 30 productos y 50 ventas, sin estadísticas ni empleados. |
| **Membresía PRO** | 1 mes o 1 año | Todo sin límites. |

| Canal | Medio de pago | Precio |
|---|---|---|
| Aplicación descargada desde la web | Mercado Pago | $19.990 por mes · $180.000 por año (ARS) |
| Google Play | Facturación de Google Play | US$ 9,99 por mes · US$ 89,99 por año, en la moneda de cada país |

La prueba gratuita es **una sola por persona**: el sistema la reconoce aunque se intente
repetir con otro email, el mismo número de WhatsApp o el mismo dispositivo.

---

## Arquitectura y tecnologías

```
┌────────────────────────────┐        ┌───────────────────────────────────┐
│  App móvil (Flutter/Dart)  │        │            Supabase               │
│  · Provider (estado)       │  HTTPS │  · PostgreSQL + Row Level Security│
│  · Hive (modo sin conexión)│ ─────► │  · Funciones RPC transaccionales  │
│  · Escáner, PDF, Excel     │        │  · Auth (email y Google)          │
└────────────────────────────┘        │  · Edge Functions (Deno/TS)       │
                                      └──────────────┬────────────────────┘
                                                     │
                                  ┌──────────────────┴──────────────────┐
                                  │   Mercado Pago  ·  Google Play       │
                                  │   (pagos verificados en el servidor) │
                                  └──────────────────────────────────────┘
```

| Capa | Tecnologías |
|---|---|
| **Aplicación** | Flutter, Dart, Provider, Hive, flutter_secure_storage, mobile_scanner, pdf, excel |
| **Backend** | Supabase: PostgreSQL, Row Level Security, funciones RPC en PL/pgSQL, Storage |
| **Servidor** | Supabase Edge Functions en Deno y TypeScript |
| **Autenticación** | Email y contraseña, Google Sign-In (OAuth con PKCE) |
| **Pagos** | Mercado Pago Checkout Pro con webhook firmado · Google Play Billing con verificación en servidor |
| **Web** | HTML, CSS y JavaScript sin dependencias |

---

## Calidad y seguridad

Diseñé el sistema para que la información del comercio sea **correcta y segura**, aun
con varios dispositivos vendiendo al mismo tiempo o con la conexión intermitente.

- **Operaciones atómicas.** Venta, descuento de stock y deuda del fiado se registran en
  una única transacción en el servidor: se guarda todo o no se guarda nada.
- **Sin duplicados.** Cada venta lleva un identificador generado en el dispositivo, por lo
  que un reintento nunca la registra dos veces.
- **Las ventas no se borran.** Solo se anulan, con registro de quién lo hizo y por qué, y
  la anulación devuelve el stock automáticamente.
- **Aislamiento de datos.** Políticas de Row Level Security: cada comercio accede solo a
  su propia información.
- **Límites del plan en el servidor.** Las reglas de la prueba y de la membresía se
  validan en la base de datos, no solo en la aplicación.
- **Pagos verificados.** Cada pago se confirma con Mercado Pago o Google Play antes de
  activar la membresía, y los reembolsos la revierten automáticamente.
- **Credenciales fuera del código.** Las claves se inyectan al compilar y nunca se
  versionan.
- **Pruebas automáticas** sobre la lógica de ventas, montos, planes y modelos de datos.

---

## Estructura del repositorio

Este repositorio contiene la página de presentación de MarketsPlus, desarrollada con
HTML, CSS y JavaScript, sin dependencias externas.

```
webMarketsPlus/
├── index.html              Página principal
├── terminos.html           Términos y condiciones
├── privacidad.html         Política de privacidad
├── arrepentimiento.html    Botón de arrepentimiento (Ley 24.240)
├── eliminar-cuenta.html    Baja y eliminación de cuenta
├── css/                    Estilos de la página y de las páginas legales
├── js/                     Menú, animaciones, precios y enlaces de descarga
└── assets/                 Logo, íconos e imágenes
```

Los enlaces de descarga se configuran al principio de `js/main.js`; los botones sin
enlace no se muestran.

---

## Estado del proyecto

- [x] Aplicación completa: ventas, stock, caja, fiado, empleados y estadísticas
- [x] Funcionamiento sin conexión con sincronización automática
- [x] Inicio de sesión con email y con Google
- [x] Cobros con Mercado Pago y Google Play
- [x] Prueba gratuita con control de uso único por persona
- [x] Página de presentación y documentación legal
- [ ] Publicación en Google Play
- [ ] Lanzamiento comercial

---

## Licencia

**© 2026 Flor Gala. Todos los derechos reservados.**

MarketsPlus es software propietario. El código se exhibe únicamente con fines de
portfolio. No está permitido copiarlo, modificarlo, distribuirlo, publicarlo ni
utilizarlo con fines comerciales, total o parcialmente, sin autorización previa y por
escrito de la autora.

---

<div align="center">

### Contacto

Si te interesa MarketsPlus para tu comercio, o querés conversar sobre el proyecto,
podés encontrarme en:

[![Portfolio](https://img.shields.io/badge/Portfolio-mariaflorenciagala.netlify.app-0ea5e9?style=for-the-badge&logo=netlify&logoColor=white)](https://mariaflorenciagala.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Flor%20Gala-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mariflor)
[![GitHub](https://img.shields.io/badge/GitHub-MariaFlorenciaGala-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MariaFlorenciaGala)

<sub>Diseñado y programado con ♥ por <b>Flor Gala</b> · Hecho en Argentina</sub>

</div>
