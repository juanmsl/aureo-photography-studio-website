import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';

import { declaracion, marca, obra, SITIO_URL } from '../content/estudio';

type Meta = { titulo: string; descripcion: string; indexable: boolean };

const SUFIJO = 'Áureo Estudio Fotográfico';

const metaDe = (pathname: string): Meta => {
  const pieza = matchPath('/obra/:slug', pathname);

  if (pathname === '/') {
    return {
      titulo: 'Áureo · Estudio Fotográfico',
      descripcion: `${marca.eslogan} ${marca.fraseSecundaria}`,
      indexable: true,
    };
  }

  if (pathname === '/obra') {
    return {
      titulo: `Obra · ${SUFIJO}`,
      descripcion: 'Fotografías de distintas disciplinas, cada una con su propia luz.',
      indexable: true,
    };
  }

  if (pieza) {
    const o = obra.find(x => x.slug === pieza.params.slug);

    return o
      ? { titulo: `${o.titulo} · Obra · ${SUFIJO}`, descripcion: 'Fotografía de la obra de Áureo.', indexable: true }
      : { titulo: `Página no encontrada · ${SUFIJO}`, descripcion: marca.eslogan, indexable: false };
  }

  if (pathname === '/estudio') {
    return { titulo: `Estudio · ${SUFIJO}`, descripcion: declaracion.apertura, indexable: true };
  }

  if (pathname === '/disciplinas') {
    return {
      titulo: `Disciplinas · ${SUFIJO}`,
      descripcion: `${marca.fraseSecundaria} Una misma forma de mirar, llevada a cada encargo.`,
      indexable: true,
    };
  }

  if (pathname === '/contacto') {
    return {
      titulo: `Agenda una conversación · ${SUFIJO}`,
      descripcion: 'Cuéntanos qué quieres fotografiar.',
      indexable: true,
    };
  }

  if (pathname === '/contacto/enviado') {
    return { titulo: `Mensaje enviado · ${SUFIJO}`, descripcion: marca.eslogan, indexable: false };
  }

  return { titulo: `Página no encontrada · ${SUFIJO}`, descripcion: marca.eslogan, indexable: false };
};

const fijar = (selector: string, crear: () => HTMLElement, atributo: string, valor: string | null) => {
  let el = document.head.querySelector<HTMLElement>(selector);

  if (valor === null) {
    el?.remove();

    return;
  }

  if (!el) {
    el = crear();
    document.head.appendChild(el);
  }

  el.setAttribute(atributo, valor);
};

/**
 * Título, descripción, URL canónica (aureostudio.co) y robots de cada ruta.
 * index.html trae los de Inicio y las etiquetas para compartir el enlace.
 */
export const Metadatos = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { titulo, descripcion, indexable } = metaDe(pathname);
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });

    document.title = titulo;
    fijar('meta[name="description"]', meta('description'), 'content', descripcion);
    fijar(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      indexable ? `${SITIO_URL}${pathname === '/' ? '/' : pathname}` : null,
    );
    fijar('meta[name="robots"]', meta('robots'), 'content', indexable ? null : 'noindex');
  }, [pathname]);

  return null;
};
