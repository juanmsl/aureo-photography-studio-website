import { Button, Typography } from 'polpo/components';
import { useLocation, useNavigate } from 'react-router';

import { Navigation } from '../components/Layout';

import type { ContactMessage } from '../content/studio';

export const MessageSentPage = () => {
  const navigate = useNavigate();
  const data = (useLocation().state ?? null) as ContactMessage | null;
  const name = data?.name.trim().split(/\s+/)[0];

  return (
    <div className='relative isolate flex min-h-dvh flex-col overflow-hidden'>
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[26rem] w-[min(51rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]'
      />
      <Navigation />
      <main className='grid flex-1 place-content-center justify-items-center gap-6 px-5 py-20 text-center'>
        <Typography variant='header1' as='h1' noPadding className='m-0 text-fg-strong'>
          Recibimos tu mensaje.
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] text-fg-muted'>
          {name ? `Gracias, ${name}. ` : 'Gracias. '}
          Te escribiremos al correo que nos dejaste para conversar sobre tu proyecto.
        </Typography>
        <div className='mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
          <Button color='primary' radius='full' onClick={() => navigate('/obra', { viewTransition: true })}>
            Ver la obra
          </Button>
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            className='border-fg-muted hover:border-accent hover:text-fg-strong'
            onClick={() => navigate('/', { viewTransition: true })}
          >
            Volver al inicio
          </Button>
        </div>
      </main>
    </div>
  );
};
