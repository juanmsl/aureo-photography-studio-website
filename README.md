# Áureo · Estudio Fotográfico

Website for Áureo, the studio brand. It is a project independent from Lina Nieto's portfolio. React 19 +
TypeScript + Vite, with the [Polpo](https://ui.juanmsl.com) UI library and Tailwind CSS v4. Package manager: pnpm.

Design: Figma file `AtRQGqGP7TBk8lSKPd3WOO` ("Escritorio — Áureo" and "Móvil — Áureo" pages, dark theme only).
Brand context in `docs/CONTEXT.md` (kept in Spanish) and `docs/PRODUCT.md`.

**Language convention:** code, file names, comments and docs are in English; everything the visitor sees
(copy, URLs, aria labels, alt text) is in Spanish.

## Commands

Requires Node 24 (`.nvmrc`) and pnpm 11.10.0 (`packageManager`; `corepack enable` activates it). `engines` in
`package.json` plus `engineStrict` in `pnpm-workspace.yaml` make `pnpm install` refuse to run on other versions.

```sh
pnpm install
pnpm dev       # dev server
pnpm build     # type check + build to dist/
pnpm lint      # ESLint (polpo-eslint-config)
pnpm lint:fix  # ESLint with automatic fixes
pnpm preview   # serve dist/
```

## Deployment

Every push to `main` (for example, merging a PR) publishes the site to GitHub Pages through
`.github/workflows/deploy.yml`: it installs with pnpm, runs `pnpm lint`, builds and uploads `dist/`. It can also be
run manually from the **Actions** tab (Run workflow).

- Once: in the repository, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- URL: **https://aureostudio.co** (custom domain). One-time setup:
  - **Settings → Pages → Custom domain:** `aureostudio.co` and, once DNS resolves, **Enforce HTTPS**.
  - DNS: **A** records for `aureostudio.co` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
    `185.199.111.153` (optionally **AAAA** to `2606:50c0:8000::153` … `2606:50c0:8003::153`) and a **CNAME** from
    `www` to `juanmsl.github.io`.
  - No `CNAME` file is needed: with Actions deployments GitHub ignores it and stores the domain in Settings.
  - After setting the domain, redeploy (Actions → Run workflow) so the site is built for the root path.
- The base path comes from `actions/configure-pages`: `/` with a custom domain, `/<repository>/` without one.
  `vite.config.ts` reads it from `BASE_PATH` (`/` locally), the router uses `import.meta.env.BASE_URL` as its
  `basename`, and photos in `public/` are requested with the same base.
- GitHub Pages does not know the app's routes, so the workflow copies `index.html` to `404.html` and direct links
  (e.g. `aureostudio.co/obra`) still open.

## Loader and page transitions

- **Initial loader:** `#splash` in `index.html` (inline CSS, so it shows before the JS arrives): a slit of amber
  light, like a door left ajar, with the glow it casts on the floor, breathing on the shadow background. It has no
  logo on purpose (the logo is not designed yet). `src/splash.ts` fades it out once the fonts and the first images are
  ready (3 s at most) and removes it.
- **Transitions between pages:** the router is a data router (`createBrowserRouter` in `src/App.tsx`) so `Link` and
  `navigate` can use `viewTransition`. The animation lives in `src/index.css` (`::view-transition-*`): the old page
  dims out, the new one emerges from the dark, and the header stays still. Browsers without the View Transitions API
  change the page without animation. Every new link or `navigate` call should pass `viewTransition`.
- Both respect `prefers-reduced-motion`.

## Search engines and link previews

- `src/seo.ts`: title, description, robots, canonical, link-preview image and structured data (JSON-LD) for every
  route, built only from approved copy. It is the single source: `PageMeta` applies it while navigating, and the
  build writes it into the HTML.
- `build/seo-plugin.ts` (Vite plugin): writes one HTML file per indexable route (`obra.html`, `estudio.html`…) with
  its own head, plus `404.html` (`noindex`) and `sitemap.xml`. GitHub Pages then answers 200 with the right tags for
  every page, even for crawlers and link previews that do not run JavaScript.
- Not indexed (`noindex, follow`, out of the sitemap): single photos (`/obra/:slug`), "Mensaje enviado" and the
  404 page.
- `public/og.jpg` (1200×630) is made from a provisional moodboard photo; replace it once there are own photos and a
  logo. `public/robots.txt` points to the sitemap. If the domain changes, update `SITE_URL` in
  `src/content/studio.ts`, `index.html` and `robots.txt`.

Search Console setup and next steps: `docs/SEO.md`.

## Structure

```
src/
  content/studio.ts    Brand (slogan, approved statement), disciplines, photos, works, navigation
  components/          TextLink, Chip, LitPhoto (light falloff), PhotoCaption, Layout (navigation, menu, footer, conversation CTA), PageMeta (title and canonical URL per route)
  pages/               HomePage, WorkPage, WorkPhotoPage, StudioPage, DisciplinesPage, ContactPage, MessageSentPage, NotFoundPage
  index.css            Polpo theme with the "Áureo · Tema" collection
.claude/skills/polpo   Polpo instructions for agents
docs/                  CONTEXT.md (brand decisions, in Spanish), PRODUCT.md (product context) and SEO.md
```

## Theme

`src/index.css` maps the Figma variables to Tailwind tokens: `ground` #120F0D, `surface` #1C1714, `line` #2A231E,
`line-strong` #3A312A, `fg` #E9E1D6, `fg-strong` #F3DEC0, `fg-muted` #9A8F84, `accent` (amber) #E8A75B and `error`
#D9735E. `primary` is the amber accent (filled primary button, pale light on hover). Typefaces: Bricolage
Grotesque ExtraBold, Instrument Serif italic (`serif-voice`, `t-quote`, `t-subtitle`) and Hanken Grotesk.

## Status

Every screen in the design is built, for desktop and mobile. Routes stay in Spanish because visitors see them:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/obra` | Work, with a discipline filter (`?disciplina=retrato`) and "Cargar más fotografías" |
| `/obra/:slug` | Work photo (arrow keys to move between photos, Esc to close) |
| `/estudio` | Studio |
| `/disciplinas` | Disciplines (anchors `#naturaleza`, `#retrato`…) |
| `/contacto` | Contact (form) |
| `/contacto/enviado` | Message sent |

## Pending before launch

- **Photos**: the ones in `public/photos/` are provisional moodboard images, not the studio's own photographs.
- **Logo**: `ÁUREO` in Bricolage is a provisional typographic logotype; the logo will be designed later.
- **Contact**: the studio's email, WhatsApp and Instagram are still to be defined (`channels` in
  `src/content/studio.ts`).
- **Form**: submission is simulated; it still needs a service that receives the messages.
- **Proposed texts** on the Studio page ("Por qué Áureo" and "Cruzar el umbral"): pending approval.
- **Work**: titles and photos are references; Paisaje, Moda, Eventos and Producto have no photos yet.
- Brand copy (slogan, secondary phrase, statement) is approved: do not change it without asking.
