/// <reference types="vite/client" />

declare module 'virtual:aureo-photos' {
  /** Signed Cloudinary URLs per photo id and size, or null to use the local files (see build/photos-plugin.ts). */
  export const photoUrls: Record<string, Record<'page' | 'view', string>> | null;
}
