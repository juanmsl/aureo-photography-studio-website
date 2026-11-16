import { cn } from 'polpo/helpers';
import { useState, type MouseEvent } from 'react';
import { photoUrls } from 'virtual:aureo-photos';

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
  /** large (up to 1600 px) for the single photo and the hero; medium (up to 900 px) elsewhere. */
  size?: 'large' | 'medium';
};

const preventSave = (e: MouseEvent) => e.preventDefault();

/**
 * "Lit" photo: the image emerges from the shadow, as if a beam lit it.
 * With Cloudinary configured it loads a signed, reduced and watermarked version
 * (see build/photos-plugin.ts); right click, drag and the iOS long-press menu
 * are disabled as a light deterrent.
 */
export const LitPhoto = ({
  id,
  className,
  falloff = 0.5,
  circle,
  priority,
  position,
  size = 'medium',
}: LitPhotoProps) => {
  const info = photos[id];
  const [failed, setFailed] = useState(false);
  const start = Math.round(falloff * 100);

  return (
    <div
      onContextMenu={preventSave}
      className={cn(
        'relative overflow-hidden bg-surface select-none [-webkit-touch-callout:none]',
        circle && 'rounded-full',
        className,
      )}
    >
      {!failed && (
        <img
          src={photoUrls?.[id]?.[size] ?? `${import.meta.env.BASE_URL}photos/${info.file}`}
          alt={info.description}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          draggable={false}
          onDragStart={preventSave}
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
