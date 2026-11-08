import { Typography } from 'polpo/components';

import { FotoIluminada } from '../components/FotoIluminada';
import { LlamadoConversar, Navegacion, PiePagina } from '../components/Marco';
import { declaracion, marca, textosPropuestos } from '../content/estudio';

const NotaPropuesta = () => (
  <Typography variant='small' noPadding className='m-0 text-texto-suave'>
    Texto propuesto, pendiente de aprobación
  </Typography>
);

export const Estudio = () => (
  <>
    <Navegacion />
    <main>
      <section aria-labelledby='titulo-estudio' className='relative overflow-hidden md:min-h-[51.25rem]'>
        <span
          aria-hidden
          className='pointer-events-none absolute top-[20rem] right-0 h-[16rem] w-[26rem] rounded-full bg-acento/20 blur-[90px] md:top-auto md:bottom-[-7rem] md:h-80 md:w-[50rem] md:blur-[130px]'
        />
        <FotoIluminada
          id='arco'
          caida={0.42}
          prioridad
          className='mt-6 ml-[23%] aspect-[3/4] w-[77%] md:absolute md:top-5 md:right-[6.7%] md:mt-0 md:ml-0 md:aspect-[540/720] md:w-[37.5%] md:max-w-[33.75rem]'
        />
        <div className='relative grid gap-4 px-5 pt-8 pb-16 md:absolute md:top-[14.375rem] md:max-w-[49.5rem] md:px-24 md:pt-0 md:pb-0'>
          <Typography id='titulo-estudio' variant='hero' as='h1' noPadding className='m-0 text-texto-fuerte'>
            Estudio
          </Typography>
          <Typography noPadding className='voz-serif m-0 max-w-[37.5rem] t-cita text-texto'>
            {marca.eslogan}
          </Typography>
        </div>
      </section>

      <section aria-labelledby='declaracion-estudio' className='px-5 py-16 md:px-24 md:pt-20 md:pb-30'>
        <Typography
          id='declaracion-estudio'
          as='h2'
          noPadding
          align='center'
          className='voz-serif m-0 mx-auto max-w-[56.25rem] t-cita text-texto-fuerte'
        >
          {declaracion.apertura}
        </Typography>
        <div className='mx-auto mt-10 grid max-w-[40rem] gap-6 md:mt-16'>
          {declaracion.parrafos.map(p => (
            <Typography key={p.slice(0, 16)} noPadding className='m-0 text-texto'>
              {p}
            </Typography>
          ))}
        </div>
      </section>

      <section aria-labelledby='por-que' className='border-t border-linea px-5 py-16 md:px-24 md:pt-20 md:pb-30'>
        <div className='grid gap-6 md:grid-cols-[minmax(0,28.75rem)_minmax(0,35rem)] md:justify-between'>
          <Typography id='por-que' variant='header1' as='h2' noPadding className='m-0'>
            Por qué Áureo
          </Typography>
          <div className='grid gap-5'>
            <Typography noPadding className='m-0 text-texto'>
              {textosPropuestos.porQueAureo}
            </Typography>
            <NotaPropuesta />
          </div>
        </div>
      </section>

      <section aria-labelledby='umbral' className='px-5 pb-16 md:px-24 md:pt-15 md:pb-30'>
        <div className='grid items-center gap-10 md:grid-cols-[minmax(0,28.75rem)_minmax(0,32.5rem)] md:justify-between'>
          <FotoIluminada id='puerta' caida={0.45} className='aspect-[460/640] w-full' />
          <div className='grid gap-5'>
            <Typography id='umbral' variant='header1' as='h2' noPadding className='m-0'>
              Cruzar el umbral
            </Typography>
            <Typography noPadding className='m-0 text-texto'>
              {textosPropuestos.cruzarUmbral}
            </Typography>
            <NotaPropuesta />
          </div>
        </div>
      </section>

      <LlamadoConversar />
    </main>
    <PiePagina />
  </>
);
