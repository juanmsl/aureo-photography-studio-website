import { Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Enlace } from '../components/Enlace';
import { FotoIluminada } from '../components/FotoIluminada';
import { LlamadoConversar, Navegacion, PiePagina } from '../components/Marco';
import { PieDeFoto } from '../components/PieDeFoto';
import { declaracion, disciplinas, marca, obraDestacada } from '../content/estudio';

const Portada = () => {
  const navigate = useNavigate();
  return (
    <section aria-labelledby='eslogan' className='relative flex flex-col overflow-hidden md:min-h-[min(100dvh,56.25rem)]'>
      <span
        aria-hidden
        className='pointer-events-none absolute top-[27.5rem] left-[10%] h-[16rem] w-[26rem] rounded-full bg-acento/20 blur-[90px] md:top-auto md:bottom-[-11rem] md:left-[36%] md:h-[23.75rem] md:w-[58.75rem] md:blur-[130px]'
      />
      <Navegacion />
      <FotoIluminada
        id='puerta'
        caida={0.42}
        prioridad
        className='mt-3 ml-[15%] aspect-[330/470] w-[85%] md:absolute md:top-[3.125rem] md:right-[5.5%] md:mt-0 md:ml-0 md:aspect-[540/800] md:w-[37.5%] md:max-w-[33.75rem]'
      />
      <div className='relative grid gap-4 px-5 pt-6 pb-12 md:mt-auto md:mb-auto md:max-w-[57rem] md:gap-0 md:px-24 md:py-0'>
        <Typography id='eslogan' variant='hero' as='h1' noPadding className='m-0 text-texto-fuerte'>
          Lo extraordinario,
          <br />
          más allá de lo evidente.
        </Typography>
        <Typography noPadding className='voz-serif m-0 max-w-[33.75rem] t-bajada text-texto-suave md:mt-7'>
          Estudio fotográfico de naturaleza, paisaje, retrato, moda, arquitectura, interiores, eventos y producto.
        </Typography>
        <div className='mt-2 md:mt-10'>
          <Button color='primary' radius='full' onClick={() => navigate('/obra')}>
            Ver la obra
          </Button>
        </div>
      </div>
    </section>
  );
};

const Declaracion = () => (
  <section aria-labelledby='declaracion' className='px-5 py-18 md:px-24 md:pt-35 md:pb-40'>
    <Typography
      id='declaracion'
      as='h2'
      noPadding
      align='center'
      className='voz-serif m-0 mx-auto max-w-[55rem] t-cita tracking-[-0.01em] text-texto-fuerte'
    >
      {declaracion.apertura}
    </Typography>
    <div className='mx-auto mt-10 grid max-w-[71.25rem] items-center justify-items-center gap-10 md:mt-30 md:grid-cols-[minmax(0,32.5rem)_minmax(0,32.5rem)] md:justify-between md:gap-14'>
      <FotoIluminada id='ojo' circulo caida={0.55} className='aspect-square w-[min(100%,18.75rem)] md:w-full' />
      <div className='grid gap-6 md:max-w-[32.5rem]'>
        {declaracion.parrafos.map(p => (
          <Typography key={p.slice(0, 16)} noPadding className='m-0 text-texto'>
            {p}
          </Typography>
        ))}
        <div className='mt-4'>
          <Enlace a='/estudio' accion>
            Conoce el estudio
          </Enlace>
        </div>
      </div>
    </div>
  </section>
);

const Obra = () => {
  const [umbral, nervaduras, mirada, entreabierta] = obraDestacada;
  return (
    <section aria-labelledby='titulo-obra' className='px-5 py-16 md:px-24 md:pt-30 md:pb-12'>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div className='grid gap-3'>
          <Typography id='titulo-obra' variant='header1' as='h2' noPadding className='m-0'>
            Obra
          </Typography>
          <Typography noPadding className='voz-serif m-0 max-w-[32.5rem] t-bajada text-texto-suave'>
            Una selección de fotografías de distintas disciplinas, cada una con su propia luz.
          </Typography>
        </div>
        <Enlace a='/obra' accion className='hidden md:inline-flex md:mt-6'>
          Ver toda la obra
        </Enlace>
      </div>

      <div className='mt-10 grid gap-10 md:mt-19 md:grid-cols-[560fr_624fr] md:gap-16'>
        <figure className='m-0'>
          <Link to={`/obra/${umbral.foto}`} aria-label={`${umbral.titulo}, ver ampliada`} className='block'>
            <FotoIluminada id={umbral.foto} className='aspect-[560/760] w-full' />
          </Link>
          <PieDeFoto titulo={umbral.titulo} disciplina={umbral.disciplina} />
        </figure>
        <div className='grid content-start gap-10 md:gap-0'>
          <figure className='m-0'>
            <Link to={`/obra/${nervaduras.foto}`} aria-label={`${nervaduras.titulo}, ver ampliada`} className='block'>
            <FotoIluminada id={nervaduras.foto} className='aspect-[624/380] w-full' />
          </Link>
            <PieDeFoto titulo={nervaduras.titulo} disciplina={nervaduras.disciplina} />
          </figure>
          <div className='grid grid-cols-[300fr_280fr] gap-2.5 md:mt-1.5 md:gap-11'>
            {[
              { ...mirada, proporcion: 'aspect-[300/400]' },
              { ...entreabierta, proporcion: 'aspect-[280/400]' },
            ].map(o => (
              <figure key={o.titulo} className='m-0'>
                <Link to={`/obra/${o.foto}`} aria-label={`${o.titulo}, ver ampliada`} className='block'>
            <FotoIluminada id={o.foto} caida={0.45} className={`${o.proporcion} w-full`} />
          </Link>
                <PieDeFoto titulo={o.titulo} disciplina={o.disciplina} />
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-6 md:mt-6'>
        <Enlace a='/obra' accion className='self-start md:hidden'>
          Ver toda la obra
        </Enlace>
        <Typography variant='small' noPadding className='m-0 text-texto-suave'>
          Fotografías de referencia, provisionales
        </Typography>
      </div>
    </section>
  );
};

const Disciplinas = () => {
  const [activa, setActiva] = useState<string | null>(null);
  return (
    <section aria-labelledby='titulo-disciplinas' className='px-5 py-16 md:px-24 md:pt-35 md:pb-28'>
      <div className='grid gap-10 md:grid-cols-[minmax(0,28.75rem)_minmax(0,39rem)] md:justify-between md:gap-16'>
        <div className='grid content-start gap-4'>
          <Typography id='titulo-disciplinas' variant='header1' as='h2' noPadding className='m-0'>
            Una misma forma de mirar
          </Typography>
          <Typography noPadding className='voz-serif m-0 t-bajada text-texto-fuerte'>
            {marca.fraseSecundaria}
          </Typography>
          <Typography noPadding className='m-0 max-w-[27.5rem] text-texto-suave'>
            El sello del estudio no es un género, sino una manera de observar. La misma atención llega a un paisaje, a un
            rostro, a un espacio o a un objeto.
          </Typography>
        </div>
        <ul className='m-0 list-none border-b border-linea p-0' onMouseLeave={() => setActiva(null)}>
          {disciplinas.map(d => {
            const encendida = activa === d.slug;
            return (
              <li key={d.slug} className='border-t border-linea'>
                <Link
                  to={`/disciplinas#${d.slug}`}
                  onMouseEnter={() => setActiva(d.slug)}
                  onFocus={() => setActiva(d.slug)}
                  onBlur={() => setActiva(null)}
                  className='flex items-center justify-between gap-6 py-3.5 md:py-4.5'
                >
                  <span
                    className={cn(
                      'font-title t-header2 font-extrabold transition-colors duration-300',
                      encendida ? 'text-acento' : 'text-texto-suave',
                    )}
                  >
                    {d.nombre}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'hidden overflow-hidden transition-[height,opacity] duration-500 ease-out motion-reduce:transition-none md:block',
                      encendida ? 'h-30 opacity-100' : 'h-0 opacity-0',
                    )}
                  >
                    <FotoIluminada id={d.foto} caida={0.35} className='h-30 w-50' />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export const Inicio = () => (
  <>
    <Portada />
    <main>
      <Declaracion />
      <Obra />
      <Disciplinas />
      <LlamadoConversar />
    </main>
    <PiePagina />
  </>
);
