import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { absoluteUrl, metaFor } from '../seo';

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

const meta = (key: 'name' | 'property', value: string) => () => {
  const el = document.createElement('meta');

  el.setAttribute(key, value);

  return el;
};

/**
 * Keeps the head in sync while navigating inside the app: title, description,
 * robots, canonical, Open Graph and JSON-LD. The same data (src/seo.ts) is
 * written into each route's HTML file at build time.
 */
export const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = metaFor(pathname);

    document.title = m.title;
    setHeadTag('meta[name="description"]', meta('name', 'description'), 'content', m.description);
    setHeadTag(
      'meta[name="robots"]',
      meta('name', 'robots'),
      'content',
      m.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    );
    setHeadTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      m.indexable ? absoluteUrl(pathname) : null,
    );
    setHeadTag('meta[property="og:url"]', meta('property', 'og:url'), 'content', absoluteUrl(pathname));
    setHeadTag('meta[property="og:title"]', meta('property', 'og:title'), 'content', m.title);
    setHeadTag('meta[property="og:description"]', meta('property', 'og:description'), 'content', m.description);
    setHeadTag('meta[property="og:image"]', meta('property', 'og:image'), 'content', m.image);
    setHeadTag('meta[property="og:image:alt"]', meta('property', 'og:image:alt'), 'content', m.imageAlt);

    document.head.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    for (const data of m.jsonLd) {
      const script = document.createElement('script');

      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};
