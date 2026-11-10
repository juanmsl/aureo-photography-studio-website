/**
 * SEO for every route: title, description, canonical, robots and structured
 * data (JSON-LD). It is plain data with no DOM access, so it is shared by
 * `PageMeta` (in the browser) and by the build step in `build/seo-plugin.ts`,
 * which writes one HTML file per indexable route and the sitemap.
 *
 * Copy comes from the approved brand texts (docs/CONTEXT.md): slogan,
 * secondary phrase and statement. City, address, contact details and logo are
 * not defined yet, so they are left out of the structured data.
 */
import { brand, disciplineName, disciplines, SITE_URL, statement, works } from './content/studio';

export type RouteMeta = {
  title: string;
  description: string;
  /** false → `noindex, follow`, no canonical and left out of the sitemap. */
  indexable: boolean;
  /** Absolute image URL for link previews. */
  image: string;
  imageAlt: string;
  /** JSON-LD objects for this route. */
  jsonLd: Array<Record<string, unknown>>;
};

const SITE_NAME = `${brand.name} ${brand.descriptor}`;
const HOME_DESCRIPTION = `${SITE_NAME}. ${brand.slogan} Naturaleza, paisaje, retrato, moda, arquitectura, interiores, eventos y producto.`;
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const OG_IMAGE_ALT = 'Puerta entreabierta con luz dorada y el eslogan de Áureo';

export const absoluteUrl = (pathname: string) => (pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`);

/** The studio, referenced from every page by its @id. */
const studio = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#studio`,
  name: SITE_NAME,
  alternateName: brand.name,
  url: `${SITE_URL}/`,
  slogan: brand.slogan,
  description: statement.opening,
  knowsAbout: ['Fotografía', ...disciplines.map(d => d.name)],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-CO',
  publisher: { '@id': studio['@id'] },
};

const graph = (...nodes: Array<Record<string, unknown>>) => [{ '@context': 'https://schema.org', '@graph': nodes }];

const breadcrumbs = (items: Array<[name: string, pathname: string]>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, pathname], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(pathname),
  })),
});

const page = (path: string, name: string, description: string, type = 'WebPage') => ({
  '@type': type,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: 'es-CO',
  isPartOf: { '@id': website['@id'] },
  about: { '@id': studio['@id'] },
});

const base = (title: string, description: string): RouteMeta => ({
  title,
  description,
  indexable: true,
  image: OG_IMAGE,
  imageAlt: OG_IMAGE_ALT,
  jsonLd: [],
});

const notFound: RouteMeta = { ...base(`Página no encontrada · ${SITE_NAME}`, brand.slogan), indexable: false };

/** Metadata for a pathname (without the base path). */
export const metaFor = (pathname: string): RouteMeta => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (path === '/') {
    return {
      ...base(`${brand.name} · ${brand.descriptor}`, HOME_DESCRIPTION),
      jsonLd: graph(website, studio),
    };
  }

  if (path === '/obra') {
    const description = 'Fotografías de distintas disciplinas, cada una con su propia luz.';

    return {
      ...base(`Obra · ${SITE_NAME}`, description),
      jsonLd: graph(
        page(path, 'Obra', description, 'CollectionPage'),
        breadcrumbs([
          ['Inicio', '/'],
          ['Obra', path],
        ]),
      ),
    };
  }

  const work = /^\/obra\/([^/]+)$/.exec(path);

  if (work) {
    const o = works.find(x => x.slug === work[1]);

    // Single photos are thin pages (and the current ones are moodboard references): not indexed.
    return o
      ? {
          ...base(`${o.title} · ${disciplineName(o.discipline)} · Obra · ${SITE_NAME}`, brand.secondaryPhrase),
          indexable: false,
        }
      : notFound;
  }

  if (path === '/estudio') {
    return {
      ...base(`Estudio · ${SITE_NAME}`, statement.opening),
      jsonLd: graph(
        page(path, 'Estudio', statement.opening, 'AboutPage'),
        breadcrumbs([
          ['Inicio', '/'],
          ['Estudio', path],
        ]),
      ),
    };
  }

  if (path === '/disciplinas') {
    const description = `${brand.secondaryPhrase} Una misma forma de mirar, llevada a cada encargo.`;

    return {
      ...base(`Disciplinas · ${SITE_NAME}`, description),
      jsonLd: graph(
        page(path, 'Disciplinas', description),
        {
          '@type': 'ItemList',
          name: 'Disciplinas',
          itemListElement: disciplines.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.name })),
        },
        breadcrumbs([
          ['Inicio', '/'],
          ['Disciplinas', path],
        ]),
      ),
    };
  }

  if (path === '/contacto') {
    const description = 'Cuéntanos qué quieres fotografiar.';

    return {
      ...base(`Agenda una conversación · ${SITE_NAME}`, description),
      jsonLd: graph(
        page(path, 'Agenda una conversación', description, 'ContactPage'),
        breadcrumbs([
          ['Inicio', '/'],
          ['Contacto', path],
        ]),
      ),
    };
  }

  if (path === '/contacto/enviado')
    return { ...base(`Mensaje enviado · ${SITE_NAME}`, brand.slogan), indexable: false };

  return notFound;
};

/** Every indexable route: they get their own HTML file and go into the sitemap. */
export const indexableRoutes = (): Array<string> =>
  ['/', '/obra', '/estudio', '/disciplinas', '/contacto'].filter(r => metaFor(r).indexable);
