import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';

import { statement, brand, works, SITE_URL } from '../content/studio';

type Meta = { title: string; description: string; indexable: boolean };

const SUFFIX = 'Áureo Estudio Fotográfico';

const metaFor = (pathname: string): Meta => {
  const workMatch = matchPath('/obra/:slug', pathname);

  if (pathname === '/') {
    return {
      title: 'Áureo · Estudio Fotográfico',
      description: `${brand.slogan} ${brand.secondaryPhrase}`,
      indexable: true,
    };
  }

  if (pathname === '/obra') {
    return {
      title: `Obra · ${SUFFIX}`,
      description: 'Fotografías de distintas disciplinas, cada una con su propia luz.',
      indexable: true,
    };
  }

  if (workMatch) {
    const o = works.find(x => x.slug === workMatch.params.slug);

    return o
      ? { title: `${o.title} · Obra · ${SUFFIX}`, description: 'Fotografía de la obra de Áureo.', indexable: true }
      : { title: `Página no encontrada · ${SUFFIX}`, description: brand.slogan, indexable: false };
  }

  if (pathname === '/estudio') {
    return { title: `Estudio · ${SUFFIX}`, description: statement.opening, indexable: true };
  }

  if (pathname === '/disciplinas') {
    return {
      title: `Disciplinas · ${SUFFIX}`,
      description: `${brand.secondaryPhrase} Una misma forma de mirar, llevada a cada encargo.`,
      indexable: true,
    };
  }

  if (pathname === '/contacto') {
    return {
      title: `Agenda una conversación · ${SUFFIX}`,
      description: 'Cuéntanos qué quieres fotografiar.',
      indexable: true,
    };
  }

  if (pathname === '/contacto/enviado') {
    return { title: `Mensaje enviado · ${SUFFIX}`, description: brand.slogan, indexable: false };
  }

  return { title: `Página no encontrada · ${SUFFIX}`, description: brand.slogan, indexable: false };
};

const setHeadTag = (selector: string, create: () => HTMLElement, attribute: string, value: string | null) => {
  let el = document.head.querySelector<HTMLElement>(selector);

  if (value === null) {
    el?.remove();

    return;
  }

  if (!el) {
    el = create();
    document.head.appendChild(el);
  }

  el.setAttribute(attribute, value);
};

/**
 * Title, description, canonical URL (aureostudio.co) and robots for each route.
 * index.html carries the home defaults and the link-sharing tags.
 */
export const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, indexable } = metaFor(pathname);
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });

    document.title = title;
    setHeadTag('meta[name="description"]', meta('description'), 'content', description);
    setHeadTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      indexable ? `${SITE_URL}${pathname === '/' ? '/' : pathname}` : null,
    );
    setHeadTag('meta[name="robots"]', meta('robots'), 'content', indexable ? null : 'noindex');
  }, [pathname]);

  return null;
};
