import { SITE_URL } from '../src/content/studio';
import { absoluteUrl, indexableRoutes, metaFor, type RouteMeta } from '../src/seo';

import type { Plugin, Rollup } from 'vite';

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Replaces the content of an existing tag, or inserts the tag before </head>. */
const upsert = (html: string, pattern: RegExp, tag: string) =>
  pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);

/** Writes the route's metadata into the head of the built index.html. */
export const renderHead = (html: string, pathname: string, meta: RouteMeta) => {
  const url = absoluteUrl(pathname);
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
  out = upsert(
    out,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
  );
  out = upsert(
    out,
    /<meta\s+name="robots"[^>]*>/,
    `<meta name="robots" content="${meta.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
  );
  out = meta.indexable
    ? upsert(out, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    : out.replace(/\s*<link rel="canonical"[^>]*>/, '');

  const og: Array<[string, string]> = [
    ['og:url', url],
    ['og:title', meta.title],
    ['og:description', meta.description],
    ['og:image', meta.image],
    ['og:image:alt', meta.imageAlt],
  ];

  for (const [property, value] of og) {
    out = upsert(
      out,
      new RegExp(`<meta property="${property}"[^>]*>`),
      `<meta property="${property}" content="${escapeAttr(value)}" />`,
    );
  }

  if (meta.image !== `${SITE_URL}/og.jpg`) {
    // Photo covers do not have the 1200 × 630 size declared for og.jpg.
    out = out.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, '');
  }

  const jsonLd = meta.jsonLd
    .map(data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');

  return jsonLd ? out.replace('</head>', `    ${jsonLd}\n  </head>`) : out;
};

/** File Vercel serves for a route with `cleanUrls` ("/obra" → obra.html), without a redirect. */
const fileFor = (route: string) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

const sitemap = (routes: Array<string>) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>\n    <loc>${absoluteUrl(r)}</loc>\n  </url>`).join('\n')}
</urlset>
`;

/**
 * Build-time SEO: every indexable route gets its own HTML file with its title,
 * description, canonical, Open Graph tags and JSON-LD, so crawlers that do not
 * run JavaScript (and link previews) see the right data. It also writes
 * 404.html (noindex), which vercel.json uses as the app shell for the
 * non-indexable routes, and sitemap.xml.
 */
export const seoPlugin = (): Plugin => ({
  name: 'aureo-seo',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const index = bundle['index.html'] as Rollup.OutputAsset | undefined;

    if (!index) return;

    const template = String(index.source);
    const routes = indexableRoutes();

    for (const route of routes) {
      const html = renderHead(template, route, metaFor(route));

      if (route === '/') index.source = html;
      else this.emitFile({ type: 'asset', fileName: fileFor(route), source: html });
    }

    this.emitFile({ type: 'asset', fileName: '404.html', source: renderHead(template, '/404', metaFor('/404')) });
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: sitemap(routes),
    });
  },
});
