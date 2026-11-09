import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

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
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else if (!/^\/obra\/.+/.test(pathname)) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App = () => (
  <>
    <ScrollManager />
    <PageMeta />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/obra' element={<WorkPage />} />
      <Route path='/obra/:slug' element={<WorkPhotoPage />} />
      <Route path='/estudio' element={<StudioPage />} />
      <Route path='/disciplinas' element={<DisciplinesPage />} />
      <Route path='/contacto' element={<ContactPage />} />
      <Route path='/contacto/enviado' element={<MessageSentPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </>
);
