/** The longest the loader stays on screen, even if something is still loading. */
const MAX_WAIT = 3000;

const pageLoaded = () =>
  new Promise<void>(resolve => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

/**
 * Fades out the initial loader (#splash in index.html) once the fonts and the
 * eager images (the hero photo) are ready, and then removes it.
 */
export const hideSplash = () => {
  const splash = document.getElementById('splash');

  if (!splash) return;

  const timeout = new Promise<void>(resolve => {
    setTimeout(resolve, MAX_WAIT);
  });

  void Promise.race([Promise.all([document.fonts.ready, pageLoaded()]), timeout]).then(() => {
    splash.classList.add('is-done');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  });
};
