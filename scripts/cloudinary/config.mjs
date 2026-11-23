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
 * transparent margin, which sets the gap between repetitions. `width` is the
 * tile's width relative to the photo's (fl_relative), so the mark keeps the same
 * relative size on every photo. 45 % opacity, because the line is thin.
 */
const tiledWatermark = width =>
  `l_${WATERMARK_ID.replace(/\//g, ':')}/c_scale,fl_relative,w_${width}/o_45/fl_layer_apply,fl_tiled`;

/** The only versions of a photo that can be delivered (Settings → Security → Strict transformations). */
export const TRANSFORMATIONS = {
  /** Photos that cannot be enlarged (hero, sections): up to 1600 px, without watermark. */
  aureo_page: 'c_limit,w_1600,h_1600/q_auto:good/f_auto',
  /** The same, up to 900 px, for those shown small (LitPhoto picks it from the box's width). */
  aureo_page_small: 'c_limit,w_900,h_900/q_auto:good/f_auto',
  /**
   * Photos that open the enlarged view (home and Obra grids): up to 1600 px with
   * the watermark. They are shown small, so the tile is bigger (16 % of the
   * width) for the cameras to stay recognizable.
   */
  aureo_thumb: `c_limit,w_1600,h_1600/${tiledWatermark(0.16)}/q_auto:good/f_auto`,
  /** The same, up to 900 px, for those shown small. */
  aureo_thumb_small: `c_limit,w_900,h_900/${tiledWatermark(0.16)}/q_auto:good/f_auto`,
  /** Enlarged photo (/obra/:slug): up to 2560 px with the watermark (tile 10 % of the width). */
  aureo_view: `c_limit,w_2560,h_2560/${tiledWatermark(0.1)}/q_auto:good/f_auto`,
};

/** Earlier named transformations that the setup script removes. */
export const RETIRED_TRANSFORMATIONS = ['aureo_large', 'aureo_medium'];
