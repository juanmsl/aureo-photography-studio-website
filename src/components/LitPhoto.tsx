import { cn } from 'polpo/helpers';
import { useInView } from 'polpo/hooks';
import { useEffect, useState, type MouseEvent, type RefObject } from 'react';

import { photos, type PhotoId } from '../content/studio';
import { loadedPhoto, loadPhoto, photoSrc, sizeForWidth, type PhotoSize } from '../photoLoader';

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
  /**
   * page: without watermark, for photos that cannot be enlarged (default).
   * thumb: with the tiled watermark, for photos that link to the enlarged view.
   * Both use their 900 px version when the box is small.
   * view: the enlarged photo, bigger and watermarked.
   */
  size?: 'page' | 'thumb' | 'view';
};

const preventSave = (e: MouseEvent) => e.preventDefault();

/**
 * The `blob:` URL of `src` (see `loadPhoto`): right away when it was already
 * downloaded in this visit, otherwise once the download ends.
 */
const useLoadedPhoto = (src?: string) => {
  const [result, setResult] = useState<{ src: string; url: string }>();

  useEffect(() => {
    if (!src || loadedPhoto(src)) return undefined;

    let active = true;

    void loadPhoto(src).then(url => {
      if (active) setResult({ src, url });
    });

    return () => {
      active = false;
    };
  }, [src]);

  if (!src) return undefined;

  return loadedPhoto(src) ?? (result?.src === src ? result.url : undefined);
};

/**
 * "Lit" photo: the image emerges from the shadow, as if a beam lit it.
 * With Cloudinary configured it loads a signed version (watermarked when the
 * photo can be enlarged or is the enlarged one; see build/photos-plugin.ts)
 * through a `blob:` URL, once the photo gets close to the viewport (right away
 * with `priority`). Photos are downloaded once per visit (src/photoLoader.ts).
 * The enlarged view first shows the grid version if it was already loaded, then
 * swaps to the big one. Right click, drag and the iOS long-press menu are
 * disabled as a light deterrent.
 */
export const LitPhoto = ({
  id,
  className,
  falloff = 0.5,
  circle,
  priority,
  position,
  size = 'page',
}: LitPhotoProps) => {
  const info = photos[id];
  const { ref, inView } = useInView({ rootMargin: '400px' });
  const [version, setVersion] = useState<PhotoSize>();
  const [failedSrc, setFailedSrc] = useState<string>();

  // Pick the version when the photo is about to be seen, by the box's width.
  useEffect(() => {
    if (version || !(priority || inView)) return;

    const width = (ref as RefObject<HTMLElement>).current?.getBoundingClientRect().width ?? Infinity;

    setVersion(sizeForWidth(size, width));
  }, [version, priority, inView, ref, size]);

  const src = version && photoSrc(id, version);
  const loaded = useLoadedPhoto(src);
  // While the enlarged photo downloads, show the grid version if it is already here.
  const preview =
    size === 'view' && !loaded
      ? (loadedPhoto(photoSrc(id, 'thumb')) ?? loadedPhoto(photoSrc(id, 'thumbSmall')))
      : undefined;
  const shown = loaded ?? preview;
  const failed = shown !== undefined && shown === failedSrc;
  const start = Math.round(falloff * 100);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      onContextMenu={preventSave}
      className={cn(
        'relative overflow-hidden bg-surface select-none [-webkit-touch-callout:none]',
        circle && 'rounded-full',
        className,
      )}
    >
      {!failed && shown && (
        <img
          src={shown}
          alt={info.description}
          decoding='async'
          draggable={false}
          onDragStart={preventSave}
          onError={() => setFailedSrc(shown)}
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
