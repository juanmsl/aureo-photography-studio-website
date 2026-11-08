import { cn } from 'polpo/helpers';
import { useState } from 'react';

import { fotos, type FotoId } from '../content/estudio';

type FotoIluminadaProps = {
  id: FotoId;
  className?: string;
  /**
   * Dónde empieza la caída de luz (0–1). La foto se ve nítida en el centro y
   * se funde en la penumbra hacia los bordes ("Caída de luz" en Figma).
   */
  caida?: number;
  /** Forma circular (haz de luz). */
  circulo?: boolean;
  prioridad?: boolean;
  posicion?: string;
};

/** Foto "iluminada": la imagen nace de la penumbra, como si la alumbrara un haz. */
export const FotoIluminada = ({ id, className, caida = 0.5, circulo, prioridad, posicion }: FotoIluminadaProps) => {
  const info = fotos[id];
  const [fallo, setFallo] = useState(false);
  const inicio = Math.round(caida * 100);

  return (
    <div className={cn('relative overflow-hidden bg-plano', circulo && 'rounded-full', className)}>
      {!fallo && (
        <img
          src={`/fotos/${info.archivo}`}
          alt={info.descripcion}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding='async'
          onError={() => setFallo(true)}
          style={posicion ? { objectPosition: posicion } : undefined}
          className='absolute inset-0 size-full object-cover'
        />
      )}
      <span
        aria-hidden
        className='absolute inset-0'
        style={{
          background: circulo
            ? `radial-gradient(closest-side, rgb(18 15 13 / 0) ${inicio}%, rgb(18 15 13 / 1) 100%)`
            : `radial-gradient(farthest-side, rgb(18 15 13 / 0) ${inicio}%, rgb(18 15 13 / 0.94) 88%, rgb(18 15 13 / 1) 100%)`,
        }}
      />
    </div>
  );
};
