import { Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { Chip } from '../components/Chip';
import { Navigation, Footer } from '../components/Layout';
import { LitPhoto } from '../components/LitPhoto';
import { PhotoCaption } from '../components/PhotoCaption';
import { disciplines, disciplineName, works, INITIAL_WORK_COUNT, type Work } from '../content/studio';

/**
 * Gallery rhythm, taken from the design: a large portrait next to a landscape
 * and two squares, a panorama, and three portraits. It repeats when there are
 * more photos.
 */
const LAYOUT_PATTERN = [
  'md:col-span-6 md:row-span-2 aspect-[560/760]',
  'md:col-span-6 aspect-[624/380]',
  'md:col-span-3 aspect-square',
  'md:col-span-3 aspect-square',
  'md:col-span-12 aspect-[4/3] md:aspect-[1248/520]',
  'md:col-span-4 aspect-[400/520]',
  'md:col-span-4 aspect-[400/520]',
  'md:col-span-4 aspect-[400/520]',
];

const WorkItem = ({ o, i, query }: { o: Work; i: number; query: string }) => {
  const shape = LAYOUT_PATTERN[i % LAYOUT_PATTERN.length];

  return (
    <figure
      className={cn(
        'm-0',
        shape
          .split(' ')
          .filter(c => c.includes('span'))
          .join(' '),
      )}
    >
      <Link
        to={`/obra/${o.slug}${query}`}
        className='group block'
        aria-label={`${o.title}, ${disciplineName(o.discipline)}. Ver ampliada`}
      >
        <LitPhoto
          id={o.photo}
          className={cn(
            'w-full transition-[filter] duration-500 group-hover:brightness-110 motion-reduce:transition-none',
            shape
              .split(' ')
              .filter(c => !c.includes('span'))
              .join(' '),
          )}
        />
      </Link>
      <PhotoCaption title={o.title} discipline={disciplineName(o.discipline)} />
    </figure>
  );
};

export const WorkPage = () => {
  const [params, setParams] = useSearchParams();
  const filter = params.get('disciplina');
  const [showAll, setShowAll] = useState(false);

  const filtered = filter ? works.filter(o => o.discipline === filter) : works;
  const visible = filter || showAll ? filtered : filtered.slice(0, INITIAL_WORK_COUNT);
  const hasMore = visible.length < filtered.length;
  const query = filter ? `?disciplina=${filter}` : '';

  const select = (slug: string | null) => {
    setParams(slug ? { discipline: slug } : {}, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Navigation />
      <main>
        <section aria-labelledby='work-title' className='px-5 pt-14 pb-10 md:px-24 md:pt-24 md:pb-20'>
          <Typography id='work-title' variant='hero' as='h1' noPadding className='m-0 text-fg-strong'>
            Obra
          </Typography>
          <Typography noPadding className='serif-voice m-0 mt-3 max-w-[35rem] t-subtitle text-fg-muted'>
            Fotografías de distintas disciplinas, cada una con su propia luz.
          </Typography>
          <div
            role='group'
            aria-label='Filtrar por disciplina'
            className='-mx-5 mt-10 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-12 md:flex-wrap md:px-0'
          >
            <Chip active={!filter} onClick={() => select(null)} className='shrink-0'>
              Todas
            </Chip>
            {disciplines.map(d => (
              <Chip key={d.slug} active={filter === d.slug} onClick={() => select(d.slug)} className='shrink-0'>
                {d.name}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-label='Galería' className='px-5 md:px-24'>
          {visible.length ? (
            <div className='grid gap-x-16 gap-y-10 md:grid-cols-12 md:gap-y-12'>
              {visible.map((o, i) => (
                <WorkItem key={o.slug} o={o} i={filter ? 5 + (i % 3) : i} query={query} />
              ))}
            </div>
          ) : (
            <div className='grid justify-items-start gap-4 border-t border-line py-16'>
              <Typography noPadding className='serif-voice m-0 t-subtitle text-fg'>
                Todavía no hay fotografías de {disciplineName(filter ?? '').toLowerCase()} en esta selección.
              </Typography>
              <Button
                color='primary'
                variant='outlined'
                radius='full'
                className='border-fg-muted hover:border-accent'
                onClick={() => select(null)}
              >
                Ver todas
              </Button>
            </div>
          )}
        </section>

        <div className='grid justify-items-center gap-6 px-5 pt-14 pb-24 md:pt-15 md:pb-28'>
          {hasMore && (
            <Button
              color='primary'
              variant='outlined'
              radius='full'
              className='border-fg-muted hover:border-accent hover:text-fg-strong'
              onClick={() => setShowAll(true)}
            >
              Cargar más fotografías
            </Button>
          )}
          <Typography variant='small' noPadding className='m-0 text-fg-muted'>
            Fotografías de referencia, provisionales
          </Typography>
        </div>
      </main>
      <Footer />
    </>
  );
};
