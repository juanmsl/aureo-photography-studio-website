# SEO and indexing

How aureostudio.co is prepared for search engines, how to register it in Google Search Console and what is still
pending.

## What the site already does

| Piece                                                                                                                                                                                                                          | Where                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| Unique title and description per page, in Spanish, from the approved brand copy                                                                                                                                                | `src/seo.ts`                          |
| Canonical URL without a trailing slash or filters (`https://aureostudio.co/obra`)                                                                                                                                              | `src/seo.ts`, build plugin            |
| `robots`: `index, follow, max-image-preview:large`, or `noindex, follow` on pages that should not rank                                                                                                                         | `src/seo.ts`                          |
| One static HTML file per indexable page (HTTP 200 and the right head without running JavaScript)                                                                                                                               | `build/seo-plugin.ts`                 |
| `sitemap.xml` generated on every build with only the indexable pages                                                                                                                                                           | `build/seo-plugin.ts`                 |
| `robots.txt` pointing to the sitemap                                                                                                                                                                                           | `public/robots.txt`                   |
| Structured data (schema.org JSON-LD): `WebSite` and `Organization` (name, slogan, disciplines) on the home page; `CollectionPage`, `AboutPage`, `ContactPage`, the list of disciplines and `BreadcrumbList` on the inner pages | `src/seo.ts`                          |
| Open Graph and X cards (`og.jpg`, 1200×630)                                                                                                                                                                                    | `index.html`, `src/seo.ts`            |
| `lang="es-CO"`, `og:locale es_CO`, descriptive `alt` on every photo                                                                                                                                                            | `index.html`, `src/content/studio.ts` |

Pages left out on purpose (`noindex, follow`): the single photos (`/obra/umbral`…; thin pages, and today they are
moodboard references), "Mensaje enviado" and the 404 page.

The structured data has no city, address, contact details, logo or founder: none of them is defined yet, and the
brand rules say not to invent them.

## Google Search Console

1. Open https://search.google.com/search-console and choose **Add property → Domain**: `aureostudio.co`.
2. Add the `TXT` record Google shows (`google-site-verification=…`) in the DNS of the domain, wait a few minutes and
   press **Verify**. Keep the record.
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL inspection** → inspect `https://aureostudio.co/` and **Request indexing**. Repeat for `/obra`, `/estudio`,
   `/disciplinas` and `/contacto`.
5. After a few days check **Pages**, **Enhancements → Breadcrumbs** and **Core Web Vitals**.

Structured data can be checked at https://search.google.com/test/rich-results and link previews at
https://www.opengraph.xyz.

## Bing (and DuckDuckGo, Ecosia, ChatGPT search)

https://www.bing.com/webmasters → **Import from Google Search Console**.

## Pending before launch

- **Own photographs** instead of the moodboard references, with descriptive file names and specific `alt` texts.
  Then the single photos can become indexable (`/obra/:slug` in `src/seo.ts`) and a new `og.jpg` can be made.
- **Logo**: once it exists, add it as `logo` in the `Organization` data of `src/seo.ts` (a square PNG of at least
  112 px) and update the favicon.
- **Contact details and profiles** (`channels` in `src/content/studio.ts`): when they are real, add the profiles to
  `sameAs` and the email or phone to `contactPoint` in the `Organization` data.
- **Location**: if the studio defines its city or service area, add `areaServed` and `address` and create a Google
  Business Profile with the same name and details. It is the strongest signal for local searches.
- **Relationship with Lina Nieto**: when it is decided, link both sites to each other (and, if it applies, add
  `founder` to the studio pointing to Lina's `Person` on linanieto.com).
- **Text**: the proposed texts of Estudio and the discipline descriptions, once approved, give Google more to read.

## Later, if it is worth it

- Full prerender of the content at build time, if engines other than Google lag behind.
- Image sitemap once the own photographs are in.
