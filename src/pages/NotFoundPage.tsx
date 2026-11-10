import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { Navigation, Footer } from '../components/Layout';

/**
 * Not-found page; with `title` it also works as an under-construction page.
 */
export const NotFoundPage = ({ title }: { title?: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <main className='grid min-h-[70dvh] content-center justify-items-center gap-6 px-5 py-24 text-center md:px-24'>
        <Typography variant='header1' as='h1' noPadding className='m-0 text-fg-strong'>
          {title ?? 'Esta página no existe'}
        </Typography>
        <Typography noPadding className='serif-voice m-0 max-w-[32rem] t-subtitle text-fg-muted'>
          {title ? 'Esta página todavía se está construyendo.' : 'Puede que el enlace haya cambiado.'}
        </Typography>
        <Button color='primary' radius='full' onClick={() => navigate('/', { viewTransition: true })}>
          Volver al inicio
        </Button>
      </main>
      <Footer />
    </>
  );
};
