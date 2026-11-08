import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { Navegacion, PiePagina } from '../components/Marco';

/**
 * Páginas diseñadas en Figma que aún no están implementadas (Obra, Obra · Foto,
 * Estudio, Disciplinas, Contacto, Mensaje enviado) y rutas inexistentes.
 */
export const Pendiente = ({ titulo }: { titulo?: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <Navegacion />
      <main className='grid min-h-[70dvh] content-center justify-items-center gap-6 px-5 py-24 text-center md:px-24'>
        <Typography variant='header1' as='h1' noPadding className='m-0 text-texto-fuerte'>
          {titulo ?? 'Esta página no existe'}
        </Typography>
        <Typography noPadding className='voz-serif m-0 max-w-[32rem] t-bajada text-texto-suave'>
          {titulo ? 'Esta página todavía se está construyendo.' : 'Puede que el enlace haya cambiado.'}
        </Typography>
        <Button color='primary' radius='full' onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </main>
      <PiePagina />
    </>
  );
};
