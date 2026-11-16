/**
 * Shared Cloudinary settings for the setup script and the build plugin.
 * Changing a transformation here needs `pnpm cloudinary:setup` to update it in Cloudinary.
 */

/** Public ID of the watermark tile (an ordinary "upload" asset). */
export const WATERMARK_ID = 'aureo/marca-de-agua';

/** Folder of the photos (stored as "authenticated" assets). */
export const photoPublicId = name => `aureo/obra/${name}`;

/**
 * Watermark repeated as a grid over the whole photo. The tile
 * (scripts/cloudinary/watermark.svg) holds the mark already rotated -30° with a
 * transparent margin, which sets the gap between repetitions. Its width is 10 %
 * of the photo's (fl_relative), so the mark is the same relative size on every
 * photo (about 6.7 % of the width), at 30 % opacity.
 */
const tiledWatermark = `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,fl_relative,w_0.1/o_30/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Photos on the pages: reduced (up to 1200 px), compressed, without watermark. */
  aureo_page: 'c_limit,w_1200,h_1200/q_auto:good/f_auto',
  /** Enlarged photo (/obra/:slug): bigger (up to 2000 px) with the tiled diagonal watermark. */
  aureo_view: `c_limit,w_2000,h_2000/${tiledWatermark}/q_auto:good/f_auto`,
};

/** Earlier named transformations that the setup script removes. */
export const RETIRED_TRANSFORMATIONS = ['aureo_large', 'aureo_medium'];
