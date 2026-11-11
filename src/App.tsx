import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLayoutEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation, useParams } from 'react-router';

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

/**
 * Route pattern of the current page (for example "/proyectos/:slug"), so Speed
 * Insights groups every project or photo under one route.
 */
const useRoutePattern = () => {
  const { pathname } = useLocation();
  const params = useParams();

  return Object.entries(params).reduce(
    (route, [name, value]) => (value && name !== '*' ? route.replace(`/${value}`, `/:${name}`) : route),
    pathname,
  );
};

/** Shell shared by every page. Vercel Web Analytics and Speed Insights only send data in production on Vercel. */
const AppLayout = () => {
  const route = useRoutePattern();

  return (
    <>
      <ScrollManager />
      <PageMeta />
      <Outlet />
      <Analytics />
      <SpeedInsights route={route} />
    </>
  );
};

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
