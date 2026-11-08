import { Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { Chip } from '../components/Chip';
import { FotoIluminada } from '../components/FotoIluminada';
import { Navegacion, PiePagina } from '../components/Marco';
import { PieDeFoto } from '../components/PieDeFoto';
import { disciplinas, nombreDisciplina, obra, OBRA_INICIAL, type Obra as ObraT } from '../content/estudio';

/**
 * Ritmo de la galería, tomado del diseño: una vertical grande con una
 * horizontal y dos cuadradas al lado, una panorámica, y tres verticales.
 * Se repite si hay más fotos.
 */
const PATRON = [
  'md:col-span-6 md:row-span-2 aspect-[560/760]',
  'md:col-span-6 aspect-[624/380]',
  'md:col-span-3 aspect-square',
  'md:col-span-3 aspect-square',
  'md:col-span-12 aspect-[4/3] md:aspect-[1248/520]',
  'md:col-span-4 aspect-[400/520]',
  'md:col-span-4 aspect-[400/520]',
  'md:col-span-4 aspect-[400/520]',
];

const Pieza = ({ o, i, consulta }: { o: ObraT; i: number; consulta: string }) => {
  const forma = PATRON[i % PATRON.length];

  return (
    <figure
      className={cn(
        'm-0',
        forma
          .split(' ')
          .filter(c => c.includes('span'))
          .join(' '),
      )}
    >
      <Link
        to={`/obra/${o.slug}${consulta}`}
        className='group block'
        aria-label={`${o.titulo}, ${nombreDisciplina(o.disciplina)}. Ver ampliada`}
      >
        <FotoIluminada
          id={o.foto}
          className={cn(
            'w-full transition-[filter] duration-500 group-hover:brightness-110 motion-reduce:transition-none',
            forma
              .split(' ')
              .filter(c => !c.includes('span'))
              .join(' '),
          )}
        />
      </Link>
      <PieDeFoto titulo={o.titulo} disciplina={nombreDisciplina(o.disciplina)} />
    </figure>
  );
};

export const Obra = () => {
  const [params, setParams] = useSearchParams();
  const filtro = params.get('disciplina');
  const [todas, setTodas] = useState(false);

  const filtradas = filtro ? obra.filter(o => o.disciplina === filtro) : obra;
  const visibles = filtro || todas ? filtradas : filtradas.slice(0, OBRA_INICIAL);
  const hayMas = visibles.length < filtradas.length;
  const consulta = filtro ? `?disciplina=${filtro}` : '';

  const elegir = (slug: string | null) => {
    setParams(slug ? { disciplina: slug } : {}, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Navegacion />
      <main>
        <section aria-labelledby='titulo-obra' className='px-5 pt-14 pb-10 md:px-24 md:pt-24 md:pb-20'>
          <Typography id='titulo-obra' variant='hero' as='h1' noPadding className='m-0 text-texto-fuerte'>
            Obra
          </Typography>
          <Typography noPadding className='voz-serif m-0 mt-3 max-w-[35rem] t-bajada text-texto-suave'>
            Fotografías de distintas disciplinas, cada una con su propia luz.
          </Typography>
          <div
            role='group'
            aria-label='Filtrar por disciplina'
            className='-mx-5 mt-10 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-12 md:flex-wrap md:px-0'
          >
            <Chip activo={!filtro} onClick={() => elegir(null)} className='shrink-0'>
              Todas
            </Chip>
            {disciplinas.map(d => (
              <Chip key={d.slug} activo={filtro === d.slug} onClick={() => elegir(d.slug)} className='shrink-0'>
                {d.nombre}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-label='Galería' className='px-5 md:px-24'>
          {visibles.length ? (
            <div className='grid gap-x-16 gap-y-10 md:grid-cols-12 md:gap-y-12'>
              {visibles.map((o, i) => (
                <Pieza key={o.slug} o={o} i={filtro ? 5 + (i % 3) : i} consulta={consulta} />
              ))}
            </div>
          ) : (
            <div className='grid justify-items-start gap-4 border-t border-linea py-16'>
              <Typography noPadding className='voz-serif m-0 t-bajada text-texto'>
                Todavía no hay fotografías de {nombreDisciplina(filtro ?? '').toLowerCase()} en esta selección.
              </Typography>
              <Button
                color='primary'
                variant='outlined'
                radius='full'
                className='border-texto-suave hover:border-acento'
                onClick={() => elegir(null)}
              >
                Ver todas
              </Button>
            </div>
          )}
        </section>

        <div className='grid justify-items-center gap-6 px-5 pt-14 pb-24 md:pt-15 md:pb-28'>
          {hayMas && (
            <Button
              color='primary'
              variant='outlined'
              radius='full'
              className='border-texto-suave hover:border-acento hover:text-texto-fuerte'
              onClick={() => setTodas(true)}
            >
              Cargar más fotografías
            </Button>
          )}
          <Typography variant='small' noPadding className='m-0 text-texto-suave'>
            Fotografías de referencia, provisionales
          </Typography>
        </div>
      </main>
      <PiePagina />
    </>
  );
};
