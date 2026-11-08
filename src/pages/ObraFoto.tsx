import { Button, Typography } from 'polpo/components';
import { useEventListener } from 'polpo/hooks';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';

import { Enlace } from '../components/Enlace';
import { FotoIluminada } from '../components/FotoIluminada';
import { PieDeFoto } from '../components/PieDeFoto';
import { nombreDisciplina, obra } from '../content/estudio';

import { Pendiente } from './Pendiente';

/** Vista ampliada de una fotografía, sin navegación principal: la foto ocupa la escena. */
export const ObraFoto = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const filtro = params.get('disciplina');
  const consulta = filtro ? `?disciplina=${filtro}` : '';
  const lista = filtro ? obra.filter(o => o.disciplina === filtro) : obra;
  const i = lista.findIndex(o => o.slug === slug);

  const ir = (paso: number) => {
    if (i < 0) return;

    const sig = lista[(i + paso + lista.length) % lista.length];
    navigate(`/obra/${sig.slug}${consulta}`, { replace: true });
  };

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') ir(-1);

    if (e.key === 'ArrowRight') ir(1);

    if (e.key === 'Escape') navigate(`/obra${consulta}`);
  });

  if (i < 0) return <Pendiente />;

  const o = lista[i];

  return (
    <main className='relative isolate flex min-h-dvh flex-col overflow-hidden px-5 pt-4 pb-8 md:px-24 md:pt-10 md:pb-10'>
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[31rem] w-[min(68.75rem,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acento/15 blur-[140px]'
      />
      <div className='flex min-h-11 items-center justify-between gap-4'>
        <Enlace a={`/obra${consulta}`} accion>
          Volver a la obra
        </Enlace>
        <Typography variant='small' noPadding className='m-0 text-texto-suave' aria-live='polite'>
          {i + 1} de {lista.length}
        </Typography>
        <Link to={`/obra${consulta}`} className='t-label font-medium text-texto-suave hover:text-texto-fuerte'>
          Cerrar
        </Link>
      </div>

      <figure className='m-0 mx-auto mt-6 flex w-full max-w-[70rem] flex-1 flex-col justify-center md:mt-11'>
        <FotoIluminada id={o.foto} prioridad caida={0.55} className='aspect-[4/5] w-full sm:aspect-[1120/640]' />
        <div className='mt-6 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between'>
          <PieDeFoto titulo={o.titulo} disciplina={nombreDisciplina(o.disciplina)} className='mt-0' />
          <div className='flex flex-wrap items-center gap-x-8 gap-y-5'>
            <button
              type='button'
              onClick={() => ir(-1)}
              className='t-label cursor-pointer bg-transparent p-0 font-medium text-texto-suave hover:text-texto-fuerte'
            >
              Anterior
            </button>
            <button
              type='button'
              onClick={() => ir(1)}
              className='t-label cursor-pointer bg-transparent p-0 font-medium text-texto-suave hover:text-texto-fuerte'
            >
              Siguiente
            </button>
            <Button
              color='primary'
              variant='outlined'
              radius='full'
              className='border-texto-suave hover:border-acento hover:text-texto-fuerte'
              onClick={() => navigate('/contacto')}
            >
              Agenda una conversación
            </Button>
          </div>
        </div>
      </figure>

      <Typography variant='small' noPadding className='mx-auto mt-10 w-full max-w-[70rem] text-texto-suave'>
        Fotografía de referencia, provisional
      </Typography>
    </main>
  );
};
