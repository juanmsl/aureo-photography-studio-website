import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { v2 as cloudinary } from 'cloudinary';

import { photoPublicId } from '../scripts/cloudinary/config.mjs';
import { photos } from '../src/content/studio';

import type { Plugin, ResolvedConfig } from 'vite';

const VIRTUAL_ID = 'virtual:aureo-photos';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

export type PhotoSize = 'large' | 'medium';

/**
 * Exposes `virtual:aureo-photos`: the signed Cloudinary URL of every photo in
 * each allowed size, or `null` when CLOUDINARY_URL is not set (the site then
 * uses the local files in public/photos).
 *
 * The URLs are signed here, at build time, with the API secret from the
 * environment. Only the finished URLs reach the browser: never the secret and
 * never an URL to the original. Each URL uses a named transformation (reduced
 * size + watermark), so editing it does not give access to anything else.
 */
export const photosPlugin = (cloudinaryUrl?: string): Plugin => {
  let config: ResolvedConfig;

  return {
    name: 'aureo-photos',
    configResolved(resolved) {
      config = resolved;
    },
    /*
     * With Cloudinary the originals in public/photos must not be published:
     * remove the copy Vite makes in the build output.
     */
    async closeBundle() {
      if (cloudinaryUrl && config.command === 'build') {
        await rm(resolve(config.root, config.build.outDir, 'photos'), { recursive: true, force: true });
      }
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;

      if (!cloudinaryUrl) return 'export const photoUrls = null;';

      const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(cloudinaryUrl);
      const urls: Record<string, Record<PhotoSize, string>> = {};

      for (const [id, info] of Object.entries(photos)) {
        const publicId = photoPublicId(info.file.replace(/\.[^.]+$/, ''));
        const url = (name: string) =>
          cloudinary.url(publicId, {
            cloud_name,
            api_key,
            api_secret: decodeURIComponent(api_secret),
            type: 'authenticated',
            sign_url: true,
            secure: true,
            transformation: [{ transformation: name }],
          });

        urls[id] = { large: url('aureo_large'), medium: url('aureo_medium') };
      }

      return `export const photoUrls = ${JSON.stringify(urls)};`;
    },
  };
};
