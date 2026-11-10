import { useLayoutEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router';

import { PageMeta } from './components/PageMeta';
import { ContactPage } from './pages/ContactPage';
import { DisciplinesPage } from './pages/DisciplinesPage';
import { HomePage } from './pages/HomePage';
import { MessageSentPage } from './pages/MessageSentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudioPage } from './pages/StudioPage';
import { WorkPage } from './pages/WorkPage';
import { WorkPhotoPage } from './pages/WorkPhotoPage';

/** Scrolls to the top on page change (not when filtering or paging through photos) and honors anchors. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  // Layout effect: the scroll happens before the page transition captures the new view.
  useLayoutEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else if (!/^\/obra\/.+/.test(pathname)) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

/** Shell shared by every page. */
const AppLayout = () => (
  <>
    <ScrollManager />
    <PageMeta />
    <Outlet />
  </>
);

/*
 * Data router: required for `viewTransition` on Link and navigate, which
 * animates the change between pages (see ::view-transition in index.css).
 */
export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/obra', element: <WorkPage /> },
        { path: '/obra/:slug', element: <WorkPhotoPage /> },
        { path: '/estudio', element: <StudioPage /> },
        { path: '/disciplinas', element: <DisciplinesPage /> },
        { path: '/contacto', element: <ContactPage /> },
        { path: '/contacto/enviado', element: <MessageSentPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
