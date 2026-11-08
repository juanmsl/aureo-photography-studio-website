import { Button, Typography } from 'polpo/components';
import { useLocation, useNavigate } from 'react-router';

import { Navegacion } from '../components/Marco';
import type { Mensaje } from '../content/estudio';

export const MensajeEnviado = () => {
  const navigate = useNavigate();
  const datos = (useLocation().state ?? null) as Mensaje | null;
  const nombre = datos?.nombre.trim().split(/\s+/)[0];

  return (
    <div className='relative isolate flex min-h-dvh flex-col overflow-hidden'>
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[26rem] w-[min(51rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acento/20 blur-[140px]'
      />
      <Navegacion />
      <main className='grid flex-1 place-content-center justify-items-center gap-6 px-5 py-20 text-center'>
        <Typography variant='header1' as='h1' noPadding className='m-0 text-texto-fuerte'>
          Recibimos tu mensaje.
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] text-texto-suave'>
          {nombre ? `Gracias, ${nombre}. ` : 'Gracias. '}
          Te escribiremos al correo que nos dejaste para conversar sobre tu proyecto.
        </Typography>
        <div className='mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
          <Button color='primary' radius='full' onClick={() => navigate('/obra')}>
            Ver la obra
          </Button>
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            className='border-texto-suave hover:border-acento hover:text-texto-fuerte'
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </Button>
        </div>
      </main>
    </div>
  );
};
