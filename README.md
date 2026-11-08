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

## Estructura

```
src/
  content/estudio.ts   Marca (eslogan, declaración aprobada), disciplinas, fotos, navegación
  components/          Enlace, Chip, FotoIluminada (caída de luz), PieDeFoto, Marco (navegación, menú, pie, llamado a conversar)
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
