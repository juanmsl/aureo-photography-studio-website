import { cn } from 'polpo/helpers';
import { useState } from 'react';

import { photos, type PhotoId } from '../content/studio';

type LitPhotoProps = {
  id: PhotoId;
  className?: string;
  /**
   * Where the light falloff starts (0–1). The photo is sharp in the center and
   * fades into the shadow towards the edges ("Caída de luz" in Figma).
   */
  falloff?: number;
  /** Circular shape (light beam). */
  circle?: boolean;
  priority?: boolean;
  position?: string;
};

/** "Lit" photo: the image emerges from the shadow, as if a beam lit it. */
export const LitPhoto = ({ id, className, falloff = 0.5, circle, priority, position }: LitPhotoProps) => {
  const info = photos[id];
  const [failed, setFailed] = useState(false);
  const start = Math.round(falloff * 100);

  return (
    <div className={cn('relative overflow-hidden bg-surface', circle && 'rounded-full', className)}>
      {!failed && (
        <img
          src={`${import.meta.env.BASE_URL}photos/${info.file}`}
          alt={info.description}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          onError={() => setFailed(true)}
          style={position ? { objectPosition: position } : undefined}
          className='absolute inset-0 size-full object-cover'
        />
      )}
      <span
        aria-hidden
        className='absolute inset-0'
        style={{
          background: circle
            ? `radial-gradient(closest-side, rgb(18 15 13 / 0) ${start}%, rgb(18 15 13 / 1) 100%)`
            : `radial-gradient(farthest-side, rgb(18 15 13 / 0) ${start}%, rgb(18 15 13 / 0.94) 88%, rgb(18 15 13 / 1) 100%)`,
        }}
      />
    </div>
  );
};
