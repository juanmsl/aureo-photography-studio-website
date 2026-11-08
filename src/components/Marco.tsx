import { AsideModal, Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useViewport } from 'polpo/hooks';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { marca, navegacion } from '../content/estudio';

import { Enlace } from './Enlace';

const ANIO = new Date().getFullYear();

/** Logotipo PROVISIONAL tipográfico: el logo de Áureo aún no está diseñado. */
export const Logotipo = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
  <Link
    to='/'
    onClick={onClick}
    aria-label='Áureo, inicio'
    className={cn('font-title t-header4 leading-none font-extrabold tracking-[0.06em] text-texto', className)}
  >
    ÁUREO
  </Link>
);

export const Navegacion = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useViewport();
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <header className={cn('relative z-20 px-5 pt-4 md:px-24 md:pt-10', className)}>
      <nav aria-label='Principal' className='flex min-h-11 items-center justify-between'>
        <Logotipo />
        <ul className='m-0 hidden list-none items-center gap-10 p-0 lg:flex'>
          {navegacion.map(e => (
            <li key={e.a}>
              <Enlace a={e.a} activo={pathname.startsWith(e.a)}>
                {e.etiqueta}
              </Enlace>
            </li>
          ))}
          <li>
            <Enlace a='/contacto' accion>
              Agenda una conversación
            </Enlace>
          </li>
        </ul>
        <button
          type='button'
          onClick={() => setAbierto(true)}
          aria-expanded={abierto}
          className='cursor-pointer bg-transparent p-2 -mr-2 t-label font-medium text-texto-suave hover:text-texto-fuerte lg:hidden'
        >
          Menú
        </button>
      </nav>

      <AsideModal
        isOpen={abierto}
        onClose={cerrar}
        position='right'
        size={width || 390}
        backdrop='opaque'
        noCloseButton
        className='border-0! bg-fondo'
        contentClassName='p-0!'
      >
        <div className='relative flex min-h-dvh flex-col overflow-hidden px-5 pt-4 pb-10'>
          <span
            aria-hidden
            className='pointer-events-none absolute -bottom-24 left-1/2 h-[18.75rem] w-[26rem] -translate-x-1/2 rounded-full bg-acento/15 blur-[90px]'
          />
          <div className='flex min-h-11 items-center justify-between'>
            <Logotipo onClick={cerrar} />
            <button
              type='button'
              onClick={cerrar}
              className='cursor-pointer bg-transparent p-2 -mr-2 t-label font-medium text-texto-suave hover:text-texto-fuerte'
            >
              Cerrar
            </button>
          </div>
          <ul className='m-0 mt-32 grid list-none gap-2.5 p-0'>
            {navegacion.map(e => (
              <li key={e.a}>
                <Link
                  to={e.a}
                  onClick={cerrar}
                  className='font-title text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-texto'
                >
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            color='primary'
            radius='full'
            fullWidth
            className='mt-auto'
            onClick={() => {
              cerrar();
              navigate('/contacto');
            }}
          >
            Agenda una conversación
          </Button>
          <Typography noPadding className='voz-serif m-0 mt-8 t-bajada text-texto-suave'>
            {marca.eslogan}
          </Typography>
        </div>
      </AsideModal>
    </header>
  );
};

export const PiePagina = () => (
  <footer className='flex flex-col gap-6 border-t border-linea px-5 pt-10 pb-12 md:flex-row md:items-start md:justify-between md:px-24 md:pt-14 md:pb-16'>
    <div className='grid gap-2.5'>
      <Logotipo />
      <span className='voz-serif t-bajada text-texto-suave'>{marca.descriptor}</span>
    </div>
    <nav aria-label='Pie de página'>
      <ul className='m-0 flex list-none flex-wrap gap-x-8 gap-y-2 p-0'>
        {navegacion.map(e => (
          <li key={e.a}>
            <Enlace a={e.a}>{e.etiqueta}</Enlace>
          </li>
        ))}
      </ul>
    </nav>
    <Typography variant='small' noPadding className='m-0 text-texto-suave'>
      © {ANIO} Áureo Estudio Fotográfico
    </Typography>
  </footer>
);

/** "Conversemos sobre lo que quieres mostrar." con su luz ámbar detrás. */
export const LlamadoConversar = () => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby='titulo-conversar'
      className='relative overflow-hidden px-5 py-22 md:px-24 md:pt-55 md:pb-60'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 h-[26rem] w-[min(51rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acento/20 blur-[140px]'
      />
      <div className='relative mx-auto grid max-w-[54rem] justify-items-center gap-6 text-center'>
        <Typography id='titulo-conversar' variant='header1' as='h2' noPadding className='m-0 text-texto-fuerte'>
          Conversemos sobre lo que quieres mostrar.
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] text-texto-suave'>
          Cuéntanos qué quieres fotografiar y encontremos juntos la mejor manera de mirarlo.
        </Typography>
        <div className='mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
          <Button color='primary' radius='full' onClick={() => navigate('/contacto')}>
            Agenda una conversación
          </Button>
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            className='border-texto-suave hover:border-acento hover:text-texto-fuerte'
            onClick={() => navigate('/contacto')}
          >
            Escríbenos
          </Button>
        </div>
      </div>
    </section>
  );
};
