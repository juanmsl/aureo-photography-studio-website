import { photoUrls } from 'virtual:aureo-photos';

import { photos, type PhotoId } from './content/studio';

/**
 * page / pageSmall: no watermark, up to 1600 / 900 px (banner, sections).
 * thumb / thumbSmall: the same with the watermark (photos that open the
 * enlarged view). view: the enlarged photo. `LitPhoto` picks the small one
 * from the box's width.
 */
export type PhotoSize = 'page' | 'pageSmall' | 'thumb' | 'thumbSmall' | 'view';

/** Widest box, in device pixels, served with a small version. */
const SMALL_MAX_WIDTH = 900;

/** URL of a photo in a size: the signed Cloudinary URL, or the local file when Cloudinary is not configured. */
export const photoSrc = (id: PhotoId, size: PhotoSize) =>
  photoUrls?.[id]?.[size] ?? `${import.meta.env.BASE_URL}photos/${photos[id].file}`;

/** The version of `size` that is sharp enough for a box this wide (CSS px) on this screen. */
export const sizeForWidth = (size: 'page' | 'thumb' | 'view', cssWidth: number): PhotoSize => {
  if (size === 'view' || cssWidth * (window.devicePixelRatio || 1) > SMALL_MAX_WIDTH) return size;

  return size === 'page' ? 'pageSmall' : 'thumbSmall';
};

const loaded = new Map<string, string>();
const loading = new Map<string, Promise<string>>();

/** `blob:` URL of a photo that was already downloaded during this visit, if any. */
export const loadedPhoto = (src: string) => loaded.get(src);

/**
 * Downloads a photo once per visit and resolves to a `blob:` URL, so "copy
 * image address" and the element inspector do not show the Cloudinary URL.
 * Simultaneous and later calls for the same URL share the download, and the
 * blob is kept for the whole visit (never revoked): a photo seen before, or
 * preloaded, shows instantly. If the download fails it resolves to the plain
 * URL and is not cached, so a later call tries again.
 */
export const loadPhoto = (src: string): Promise<string> => {
  const done = loaded.get(src);

  if (done) return Promise.resolve(done);

  const current = loading.get(src);

  if (current) return current;

  const promise = fetch(src)
    .then(response => {
      if (!response.ok) throw new Error(String(response.status));

      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);

      loaded.set(src, url);

      return url;
    })
    .catch(() => src)
    .finally(() => loading.delete(src));

  loading.set(src, promise);

  return promise;
};

/** Starts downloading a photo in the background (the viewer's neighbors, a grid photo on hover). */
export const preloadPhoto = (id: PhotoId, size: PhotoSize) => {
  void loadPhoto(photoSrc(id, size));
};

/** Link props that preload a photo's enlarged version as soon as the pointer or the focus reaches it. */
export const preloadOnHover = (id: PhotoId) => ({
  onPointerEnter: () => preloadPhoto(id, 'view'),
  onFocus: () => preloadPhoto(id, 'view'),
});
