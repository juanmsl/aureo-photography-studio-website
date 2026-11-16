/**
 * Shared Cloudinary settings for the setup script and the build plugin.
 * Changing a transformation here needs `pnpm cloudinary:setup` to update it in Cloudinary.
 */

/** Public ID of the watermark tile (an ordinary "upload" asset). */
export const WATERMARK_ID = 'aureo/marca-de-agua';

/** Folder of the photos (stored as "authenticated" assets). */
export const photoPublicId = name => `aureo/obra/${name}`;

/**
 * Watermark repeated over the whole photo: the camera drawing, small, rotated
 * 30° and tiled. The tile (scripts/cloudinary/watermark.svg) carries its own
 * transparent margin, which sets the spacing between repetitions.
 */
const tiledWatermark = `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,w_260/a_-30/o_22/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Photos on the pages: reduced (up to 1200 px), compressed, without watermark. */
  aureo_page: 'c_limit,w_1200,h_1200/q_auto:good/f_auto',
  /** Enlarged photo (/obra/:slug): bigger (up to 2000 px) with the tiled diagonal watermark. */
  aureo_view: `c_limit,w_2000,h_2000/${tiledWatermark}/q_auto:good/f_auto`,
};

/** Earlier named transformations that the setup script removes. */
export const RETIRED_TRANSFORMATIONS = ['aureo_large', 'aureo_medium'];
