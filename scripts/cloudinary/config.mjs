/**
 * Shared Cloudinary settings for the setup script and the build plugin.
 * Changing a transformation here needs `pnpm cloudinary:setup` to update it in Cloudinary.
 */

/** Public ID of the watermark overlay (an ordinary "upload" asset). */
export const WATERMARK_ID = 'aureo/marca-de-agua';

/** Folder of the photos (stored as "authenticated" assets). */
export const photoPublicId = name => `aureo/obra/${name}`;

const overlay = width =>
  `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,fl_relative,w_${width},o_30/fl_layer_apply,g_center`;

/**
 * Named transformations: the only versions of a photo that can be delivered.
 * Reduced size, compressed, with the watermark in the center (the edges of the
 * photos are darkened by the light falloff on the site, so a corner mark would
 * be hidden there and easy to crop).
 */
export const TRANSFORMATIONS = {
  /** Single photo page and hero: up to 1600 px on the long side. */
  aureo_large: `c_limit,w_1600,h_1600/${overlay(0.22)}/q_auto:good/f_auto`,
  /** Grids and small photos: up to 900 px. */
  aureo_medium: `c_limit,w_900,h_900/${overlay(0.26)}/q_auto:good/f_auto`,
};
