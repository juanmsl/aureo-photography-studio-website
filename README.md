# Áureo · Estudio Fotográfico

Sitio de Áureo, la marca de estudio. Es un proyecto independiente del portafolio de Lina Nieto. React 19 +
TypeScript + Vite, con la librería de UI [Polpo](https://ui.juanmsl.com) y Tailwind CSS v4. Gestor de paquetes:
pnpm.

Diseño: archivo de Figma `AtRQGqGP7TBk8lSKPd3WOO` (páginas "Escritorio — Áureo" y "Móvil — Áureo", solo tema
oscuro). Contexto de marca en `docs/CONTEXT.md` y `docs/PRODUCT.md`.

## Comandos

Requiere Node 24 (`.nvmrc`) y pnpm 11.10.0 (`packageManager`; con `corepack enable` se activa sola). `engines` en `package.json` y `engineStrict` en `pnpm-workspace.yaml` hacen que `pnpm install` se niegue a correr con otra versión.

```sh
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # tipos + compilación a dist/
pnpm lint      # ESLint (polpo-eslint-config)
pnpm lint:fix  # ESLint con correcciones automáticas
pnpm preview   # sirve dist/
```

## Despliegue

Cada push a `main` (por ejemplo, al hacer merge de un PR) publica el sitio en GitHub Pages con
`.github/workflows/deploy.yml`: instala con pnpm, corre `pnpm lint`, compila y sube `dist/`. También se puede
lanzar a mano desde la pestaña **Actions** (Run workflow).

- Una sola vez: en el repositorio, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- URL: **https://aureostudio.co** (dominio propio). Configuración, una sola vez:
  - **Settings → Pages → Custom domain:** `aureostudio.co` y, cuando el DNS responda, **Enforce HTTPS**.
  - DNS del dominio: registros **A** de `aureostudio.co` a `185.199.108.153`, `185.199.109.153`,
    `185.199.110.153` y `185.199.111.153` (opcional, **AAAA** a `2606:50c0:8000::153` … `2606:50c0:8003::153`) y
    un **CNAME** de `www` a `juanmsl.github.io`.
  - No hace falta archivo `CNAME`: con despliegue por Actions, GitHub lo ignora y guarda el dominio en Settings.
  - Después de configurar el dominio hay que volver a desplegar (Actions → Run workflow) para que el sitio se
    compile para la raíz.
- La ruta base sale de `actions/configure-pages`: con dominio propio es `/`; sin él sería `/<repositorio>/`.
  `vite.config.ts` la toma de `BASE_PATH` (en local es `/`), el router usa `import.meta.env.BASE_URL` como
  `basename` y las fotos de `public/` se piden con esa misma base.
- Como GitHub Pages no conoce las rutas de la app, el workflow copia `index.html` a `404.html` para que los
  enlaces directos (p. ej. `aureostudio.co/obra`) también abran.

## Buscadores y enlaces compartidos

- `index.html`: descripción, URL canónica y etiquetas Open Graph / X con `public/og.jpg` (1200×630, hecha con una
  foto provisional del moodboard; cambiarla cuando haya fotos y logo propios).
- `src/components/Metadatos.tsx`: título, descripción y URL canónica de cada ruta; marca `noindex` en
  "Mensaje enviado" y en la página 404.
- `public/robots.txt` y `public/sitemap.xml` (rutas principales). Si cambia el dominio, actualizar estos dos
  archivos, `index.html` y `SITIO_URL` en `src/content/estudio.ts`.

## Estructura

```
src/
  content/estudio.ts   Marca (eslogan, declaración aprobada), disciplinas, fotos, navegación
  components/          Enlace, Chip, FotoIluminada (caída de luz), PieDeFoto, Marco (navegación, menú, pie, llamado a conversar), Metadatos (título y URL canónica por ruta)
  pages/               Inicio, Obra, ObraFoto, Estudio, Disciplinas, Contacto, MensajeEnviado, Pendiente (404)
  index.css            Tema de Polpo con la colección "Áureo · Tema"
.claude/skills/polpo   Instrucciones de Polpo para agentes
docs/                  CONTEXT.md (decisiones de marca) y PRODUCT.md (contexto de producto)
```

## Estado

Todas las pantallas del diseño están construidas, en escritorio y móvil:

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/obra` | Obra, con filtro por disciplina (`?disciplina=retrato`) y "Cargar más fotografías" |
| `/obra/:slug` | Obra · Foto (flechas del teclado para pasar fotos, Esc para cerrar) |
| `/estudio` | Estudio |
| `/disciplinas` | Disciplinas (anclas `#naturaleza`, `#retrato`…) |
| `/contacto` | Contacto (formulario) |
| `/contacto/enviado` | Mensaje enviado |

## Pendiente antes de publicar

- **Fotos**: las de `public/fotos/` son las imágenes del moodboard, provisionales; no son fotografías del estudio.
- **Logo**: `ÁUREO` en Bricolage es un logotipo tipográfico provisional; el logo se diseña después.
- **Contacto**: correo, WhatsApp e Instagram del estudio están por definir (`canales` en `src/content/estudio.ts`).
- **Formulario**: el envío está simulado; falta conectarlo a un servicio que reciba los mensajes.
- **Textos propuestos** de Estudio ("Por qué Áureo" y "Cruzar el umbral"): pendientes de aprobación.
- **Obra**: títulos y fotos son de referencia; Paisaje, Moda, Eventos y Producto aún no tienen fotos.
- Los textos de marca (eslogan, frase secundaria, declaración) están aprobados: no cambiarlos sin consultar.
- Al desplegar, el servidor debe redirigir todas las rutas a `index.html`.
