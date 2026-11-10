import { Button, Typography } from 'polpo/components';
import { useEventListener } from 'polpo/hooks';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';

import { LitPhoto } from '../components/LitPhoto';
import { PhotoCaption } from '../components/PhotoCaption';
import { TextLink } from '../components/TextLink';
import { disciplineName, works } from '../content/studio';

import { NotFoundPage } from './NotFoundPage';

/** Enlarged view of a photograph, without the main navigation: the photo takes the stage. */
export const WorkPhotoPage = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const filter = params.get('disciplina');
  const query = filter ? `?disciplina=${filter}` : '';
  const list = filter ? works.filter(o => o.discipline === filter) : works;
  const i = list.findIndex(o => o.slug === slug);

  const goTo = (step: number) => {
    if (i < 0) return;

    const next = list[(i + step + list.length) % list.length];
    navigate(`/obra/${next.slug}${query}`, { replace: true, viewTransition: true });
  };

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(-1);

    if (e.key === 'ArrowRight') goTo(1);

    if (e.key === 'Escape') navigate(`/obra${query}`, { viewTransition: true });
  });

  if (i < 0) return <NotFoundPage />;

  const o = list[i];

  return (
    <main className='relative isolate flex min-h-dvh flex-col overflow-hidden px-5 pt-4 pb-8 md:px-24 md:pt-10 md:pb-10'>
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[31rem] w-[min(68.75rem,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]'
      />
      <div className='flex min-h-11 items-center justify-between gap-4'>
        <TextLink a={`/obra${query}`} action>
          Volver a la obra
        </TextLink>
        <Typography variant='small' noPadding className='m-0 text-fg-muted' aria-live='polite'>
          {i + 1} de {list.length}
        </Typography>
        <Link viewTransition to={`/obra${query}`} className='t-label font-medium text-fg-muted hover:text-fg-strong'>
          Cerrar
        </Link>
      </div>

      <figure className='m-0 mx-auto mt-6 flex w-full max-w-[70rem] flex-1 flex-col justify-center md:mt-11'>
        <LitPhoto id={o.photo} priority falloff={0.55} className='aspect-[4/5] w-full sm:aspect-[1120/640]' />
        <div className='mt-6 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between'>
          <PhotoCaption title={o.title} discipline={disciplineName(o.discipline)} className='mt-0' />
          <div className='flex flex-wrap items-center gap-x-8 gap-y-5'>
            <button
              type='button'
              onClick={() => goTo(-1)}
              className='t-label cursor-pointer bg-transparent p-0 font-medium text-fg-muted hover:text-fg-strong'
            >
              Anterior
            </button>
            <button
              type='button'
              onClick={() => goTo(1)}
              className='t-label cursor-pointer bg-transparent p-0 font-medium text-fg-muted hover:text-fg-strong'
            >
              Siguiente
            </button>
            <Button
              color='primary'
              variant='outlined'
              radius='full'
              className='border-fg-muted hover:border-accent hover:text-fg-strong'
              onClick={() => navigate('/contacto', { viewTransition: true })}
            >
              Agenda una conversación
            </Button>
          </div>
        </div>
      </figure>

      <Typography variant='small' noPadding className='mx-auto mt-10 w-full max-w-[70rem] text-fg-muted'>
        Fotografía de referencia, provisional
      </Typography>
    </main>
  );
};
