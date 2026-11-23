/* eslint-disable no-console -- CLI script: progress goes to the terminal. */
/**
 * One-time (and repeatable) Cloudinary setup for Áureo's photos.
 *
 *   pnpm cloudinary:setup            new photos only; existing ones are kept
 *   pnpm cloudinary:setup --force    re-upload every photo and the watermark
 *
 * Reads CLOUDINARY_URL (cloudinary://<api_key>:<api_secret>@<cloud_name>) from
 * .env.local. It never prints the secret. It:
 *   1. Uploads the watermark tile (scripts/cloudinary/watermark.svg) as
 *      aureo/marca-de-agua, if it is missing (or with --force).
 *   2. Creates or updates the named transformations (scripts/cloudinary/config.mjs),
 *      allowed under "Strict transformations", and deletes the retired ones.
 *   3. Uploads every new photo in public/photos/ as an *authenticated* asset
 *      (aureo/obra/<name>): the original has no public URL; only signed URLs with
 *      one of the named transformations can be delivered.
 *   4. Generates every version of every photo now (eager), so visitors never
 *      wait for Cloudinary to create one on their first request.
 *
 * Use --force after changing a photo file, the watermark or a transformation:
 * it replaces the photos, purges their cached versions and generates them again.
 */
import { readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

import { v2 as cloudinary } from 'cloudinary';

import { RETIRED_TRANSFORMATIONS, TRANSFORMATIONS, WATERMARK_ID, photoPublicId } from './cloudinary/config.mjs';

if (!process.env.CLOUDINARY_URL) {
  console.error('Missing CLOUDINARY_URL. Add it to .env.local (see README → Photos on Cloudinary).');
  process.exit(1);
}

cloudinary.config({ secure: true });
const { cloud_name: cloudName } = cloudinary.config();

console.log(`Cloudinary cloud: ${cloudName}`);

const force = process.argv.includes('--force');

/** Whether an asset already exists in Cloudinary. */
const exists = async (publicId, type) => {
  try {
    await cloudinary.api.resource(publicId, { type });

    return true;
  } catch (error) {
    if (error?.error?.http_code === 404) return false;

    throw error;
  }
};

if (force || !(await exists(WATERMARK_ID, 'upload'))) {
  await cloudinary.uploader.upload('scripts/cloudinary/watermark.svg', {
    public_id: WATERMARK_ID,
    asset_folder: 'aureo',
    type: 'upload',
    overwrite: true,
    invalidate: true,
  });
  console.log(`✓ Watermark uploaded as ${WATERMARK_ID}`);
} else {
  console.log(`· Watermark ${WATERMARK_ID} already uploaded`);
}

for (const [name, transformation] of Object.entries(TRANSFORMATIONS)) {
  try {
    await cloudinary.api.create_transformation(name, transformation, { allowed_for_strict: true });
    console.log(`✓ Named transformation ${name} created`);
  } catch (error) {
    if (error?.error?.http_code !== 409) throw error;

    await cloudinary.api.update_transformation(name, { unsafe_update: transformation, allowed_for_strict: true });
    console.log(`✓ Named transformation ${name} updated`);
  }
}

for (const name of RETIRED_TRANSFORMATIONS) {
  try {
    await cloudinary.api.delete_transformation(name);
    console.log(`✓ Retired transformation ${name} deleted`);
  } catch (error) {
    if (error?.error?.http_code !== 404) throw error;
  }
}

const dir = 'public/photos';
const files = (await readdir(dir)).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));

/** Every named version, generated right away instead of on the first visit. */
const eager = Object.keys(TRANSFORMATIONS).map(name => ({ transformation: name }));

for (const file of files) {
  const publicId = photoPublicId(basename(file, extname(file)));

  if (!force && (await exists(publicId, 'authenticated'))) {
    await cloudinary.uploader.explicit(publicId, { type: 'authenticated', eager });
    console.log(`· ${file}: already uploaded, versions generated`);

    continue;
  }

  await cloudinary.uploader.upload(join(dir, file), {
    public_id: publicId,
    asset_folder: 'aureo/obra',
    type: 'authenticated',
    overwrite: true,
    invalidate: true,
    eager,
  });
  console.log(`✓ ${file} → ${publicId} (authenticated, versions generated)`);
}

console.log(`\nDone: ${files.length} photos. Remember to turn on Settings → Security → Strict transformations.`);
