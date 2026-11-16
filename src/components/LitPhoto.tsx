import { cn } from 'polpo/helpers';
import { useInView } from 'polpo/hooks';
import { useEffect, useState, type MouseEvent, type RefObject } from 'react';
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
  /** page: reduced, without watermark (default). view: bigger, with the tiled watermark (enlarged photo). */
  size?: 'page' | 'view';
};

const preventSave = (e: MouseEvent) => e.preventDefault();

/**
 * Loads the photo with fetch and shows it from a `blob:` URL, so "copy image
 * address" and the element inspector do not show the Cloudinary URL. It only
 * starts when the photo gets close to the viewport (or right away with
 * `priority`), and frees the blob when the component unmounts. If the fetch
 * fails (for example CORS), it falls back to the normal URL.
 */
const useBlobSrc = (src: string, start: boolean) => {
  const [blobSrc, setBlobSrc] = useState<string>();

  useEffect(() => {
    if (!start) return undefined;

    const controller = new AbortController();
    let objectUrl: string | undefined;

    fetch(src, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(String(response.status));

        return response.blob();
      })
      .then(blob => {
        objectUrl = URL.createObjectURL(blob);
        setBlobSrc(objectUrl);
      })
      .catch(() => {
        if (!controller.signal.aborted) setBlobSrc(src);
      });

    return () => {
      controller.abort();

      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, start]);

  return blobSrc;
};

/**
 * "Lit" photo: the image emerges from the shadow, as if a beam lit it.
 * With Cloudinary configured it loads a signed version (reduced on the pages,
 * bigger with the tiled watermark in the enlarged view; see
 * build/photos-plugin.ts) through a `blob:` URL. Right click, drag and the iOS
 * long-press menu are disabled as a light deterrent.
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
  const [failed, setFailed] = useState(false);
  const { ref, inView } = useInView({ rootMargin: '400px' });
  const [seen, setSeen] = useState(Boolean(priority));
  const src = photoUrls?.[id]?.[size] ?? `${import.meta.env.BASE_URL}photos/${info.file}`;
  const blobSrc = useBlobSrc(src, seen);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);
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
      {!failed && blobSrc && (
        <img
          src={blobSrc}
          alt={info.description}
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
