import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Contacto } from './pages/Contacto';
import { Disciplinas } from './pages/Disciplinas';
import { Estudio } from './pages/Estudio';
import { Inicio } from './pages/Inicio';
import { MensajeEnviado } from './pages/MensajeEnviado';
import { Obra } from './pages/Obra';
import { ObraFoto } from './pages/ObraFoto';
import { Pendiente } from './pages/Pendiente';

/** Vuelve arriba al cambiar de página (no al filtrar ni al pasar fotos) y respeta las anclas. */
const Desplazamiento = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else if (!/^\/obra\/.+/.test(pathname)) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const App = () => (
  <>
    <Desplazamiento />
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/obra' element={<Obra />} />
      <Route path='/obra/:slug' element={<ObraFoto />} />
      <Route path='/estudio' element={<Estudio />} />
      <Route path='/disciplinas' element={<Disciplinas />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/contacto/enviado' element={<MensajeEnviado />} />
      <Route path='*' element={<Pendiente />} />
    </Routes>
  </>
);
