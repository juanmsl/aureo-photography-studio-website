import { Typography } from 'polpo/components';
import { Link } from 'react-router';

import { FotoIluminada } from '../components/FotoIluminada';
import { LlamadoConversar, Navegacion, PiePagina } from '../components/Marco';
import { disciplinas, marca, obra } from '../content/estudio';

export const Disciplinas = () => (
  <>
    <Navegacion />
    <main>
      <section aria-labelledby='titulo-disciplinas' className='px-5 pt-14 pb-12 md:px-24 md:pt-24 md:pb-20'>
        <Typography id='titulo-disciplinas' variant='hero' as='h1' noPadding className='m-0 text-texto-fuerte'>
          Disciplinas
        </Typography>
        <Typography noPadding className='voz-serif m-0 mt-3 t-bajada text-texto'>
          {marca.fraseSecundaria}
        </Typography>
        <Typography noPadding className='m-0 mt-3 text-texto-suave'>
          Una misma forma de mirar, llevada a cada encargo.
        </Typography>
      </section>

      <section aria-label='Lista de disciplinas' className='px-5 pb-20 md:px-24 md:pb-10'>
        <ul className='m-0 list-none border-b border-linea p-0'>
          {disciplinas.map(d => {
            const hayObra = obra.some(o => o.disciplina === d.slug);
            return (
              <li key={d.slug} id={d.slug} className='scroll-mt-6 border-t border-linea'>
                <article className='grid gap-4 py-6 md:grid-cols-[minmax(0,31.25rem)_minmax(0,25.75rem)_15rem] md:items-center md:justify-between md:gap-12 md:py-7'>
                  <Typography variant='header1' as='h2' noPadding className='m-0'>
                    {d.nombre}
                  </Typography>
                  <div className='grid gap-3'>
                    <Typography noPadding className='m-0 text-texto-suave'>
                      {d.descripcion}
                    </Typography>
                    {hayObra && (
                      <Link to={`/obra?disciplina=${d.slug}`} className='t-label self-start font-medium text-acento underline decoration-1 underline-offset-[0.4em] hover:text-texto-fuerte'>
                        Ver obra de {d.nombre.toLowerCase()}
                      </Link>
                    )}
                  </div>
                  <FotoIluminada id={d.foto} caida={0.4} className='aspect-[3/2] w-full md:w-60' />
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <LlamadoConversar />
    </main>
    <PiePagina />
  </>
);
