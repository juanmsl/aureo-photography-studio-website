/**
 * Contenido de Áureo. Los textos de marca son los aprobados en docs/CONTEXT.md
 * (eslogan, frase secundaria y declaración). No cambiarlos sin consultar.
 */

export const marca = {
  nombre: 'Áureo',
  descriptor: 'Estudio Fotográfico',
  /** Aprobado. */
  eslogan: 'Lo extraordinario, más allá de lo evidente.',
  /** Frase secundaria permitida. */
  fraseSecundaria: 'Donde cada detalle revela un mundo.',
};

/** Declaración de marca aprobada (versión combinada, noviembre 2026). */
export const declaracion = {
  apertura: 'Creemos que la belleza no siempre se revela a simple vista.',
  parrafos: [
    'Habita en los detalles que pasan desapercibidos, en la armonía de las formas, en la luz que transforma los espacios y en los instantes que parecen cotidianos hasta que alguien decide mirarlos de otra manera.',
    'Creemos que cada momento, cada forma y cada espacio guardan un valor que trasciende lo que nuestros ojos perciben. Que entre la luz y la sombra, entre lo visible y lo inadvertido, entre aquello que sucede y lo que permanece, existe un universo por descubrir.',
    'A través de la fotografía exploramos ese universo: buscamos nuevas perspectivas, encontramos belleza donde pocas veces nos detenemos a mirar y damos forma a aquello que, de otro modo, podría desvanecerse sin ser visto.',
  ],
};

export type FotoId =
  | 'puerta'
  | 'umbral'
  | 'nervaduras'
  | 'mirada'
  | 'entreabierta'
  | 'ojo'
  | 'helecho'
  | 'hoja'
  | 'arco'
  | 'contraluz'
  | 'iris'
  | 'enves';

/**
 * Fotos de referencia del moodboard, PROVISIONALES: no son fotografías del
 * estudio. Reemplazarlas en `public/fotos/` antes de publicar.
 */
export const fotos: Record<FotoId, { archivo: string; descripcion: string }> = {
  puerta: { archivo: 'puerta.jpg', descripcion: 'Puerta entreabierta con luz dorada que cae sobre el suelo' },
  umbral: { archivo: 'umbral.jpg', descripcion: 'Arco en un muro claro con luz cálida al fondo' },
  nervaduras: { archivo: 'nervaduras.jpg', descripcion: 'Nervaduras de una hoja a contraluz' },
  mirada: { archivo: 'mirada.jpg', descripcion: 'Ojo atravesado por una franja de luz' },
  entreabierta: { archivo: 'entreabierta.jpg', descripcion: 'Pasillo oscuro con un vano iluminado' },
  ojo: { archivo: 'ojo.jpg', descripcion: 'Ojo de cerca en penumbra' },
  helecho: { archivo: 'helecho.jpg', descripcion: 'Helecho enrollado iluminado' },
  hoja: { archivo: 'hoja.jpg', descripcion: 'Hoja translúcida a contraluz' },
  arco: { archivo: 'arco.jpg', descripcion: 'Arco que se abre a un paisaje de montaña' },
  contraluz: { archivo: 'contraluz.jpg', descripcion: 'Hoja seca dorada a contraluz' },
  iris: { archivo: 'iris.jpg', descripcion: 'Ojo verde con pecas y luz cálida' },
  enves: { archivo: 'enves.jpg', descripcion: 'Envés de una hoja con luz rasante' },
};

export type Disciplina = { nombre: string; slug: string; descripcion: string; foto: FotoId };

/** Las nueve disciplinas, en el orden del estudio. Ninguna domina. */
export const disciplinas: Disciplina[] = [
  { nombre: 'Naturaleza', slug: 'naturaleza', descripcion: 'Flora, fauna y los detalles del mundo natural.', foto: 'hoja' },
  { nombre: 'Paisaje', slug: 'paisaje', descripcion: 'Lugares abiertos y la luz que los transforma a lo largo del día.', foto: 'arco' },
  { nombre: 'Macrofotografía', slug: 'macrofotografia', descripcion: 'Lo muy pequeño, visto de cerca: texturas, nervaduras, gotas.', foto: 'nervaduras' },
  { nombre: 'Retrato', slug: 'retrato', descripcion: 'Personas, a solas o en grupo, con luz natural o de estudio.', foto: 'mirada' },
  { nombre: 'Moda', slug: 'moda', descripcion: 'Prendas y accesorios para marcas, lookbooks y editoriales.', foto: 'iris' },
  { nombre: 'Arquitectura', slug: 'arquitectura', descripcion: 'Edificios, fachadas y las formas que la luz revela en ellos.', foto: 'umbral' },
  { nombre: 'Interiores', slug: 'interiores', descripcion: 'Espacios habitados: casas, hoteles, restaurantes y oficinas.', foto: 'entreabierta' },
  { nombre: 'Eventos', slug: 'eventos', descripcion: 'Celebraciones y encuentros contados con discreción.', foto: 'contraluz' },
  { nombre: 'Producto', slug: 'producto', descripcion: 'Objetos para tienda en línea, catálogo y campañas.', foto: 'helecho' },
];

/** Selección de la portada (sección Obra de Inicio). */
export const obraDestacada: { foto: FotoId; titulo: string; disciplina: string }[] = [
  { foto: 'umbral', titulo: 'Umbral', disciplina: 'Arquitectura' },
  { foto: 'nervaduras', titulo: 'Nervaduras', disciplina: 'Macrofotografía' },
  { foto: 'mirada', titulo: 'Mirada', disciplina: 'Retrato' },
  { foto: 'entreabierta', titulo: 'Entreabierta', disciplina: 'Interiores' },
];

export const navegacion = [
  { etiqueta: 'Obra', a: '/obra' },
  { etiqueta: 'Estudio', a: '/estudio' },
  { etiqueta: 'Disciplinas', a: '/disciplinas' },
  { etiqueta: 'Contacto', a: '/contacto' },
];

export type Obra = {
  slug: string;
  titulo: string;
  disciplina: Disciplina['slug'];
  foto: FotoId;
};

/**
 * Obra del estudio (provisional: imágenes del moodboard). El orden es el de la
 * página Obra; las primeras ocho se muestran de entrada.
 */
export const obra: Obra[] = [
  { slug: 'umbral', titulo: 'Umbral', disciplina: 'arquitectura', foto: 'umbral' },
  { slug: 'nervaduras', titulo: 'Nervaduras', disciplina: 'macrofotografia', foto: 'nervaduras' },
  { slug: 'mirada', titulo: 'Mirada', disciplina: 'retrato', foto: 'mirada' },
  { slug: 'entreabierta', titulo: 'Entreabierta', disciplina: 'interiores', foto: 'entreabierta' },
  { slug: 'contraluz', titulo: 'Contraluz', disciplina: 'naturaleza', foto: 'contraluz' },
  { slug: 'iris', titulo: 'Iris', disciplina: 'retrato', foto: 'iris' },
  { slug: 'quietud', titulo: 'Quietud', disciplina: 'interiores', foto: 'puerta' },
  { slug: 'rendija', titulo: 'Rendija', disciplina: 'arquitectura', foto: 'arco' },
  { slug: 'translucida', titulo: 'Translúcida', disciplina: 'naturaleza', foto: 'hoja' },
  { slug: 'penumbra', titulo: 'Penumbra', disciplina: 'retrato', foto: 'ojo' },
  { slug: 'brote', titulo: 'Brote', disciplina: 'naturaleza', foto: 'helecho' },
  { slug: 'enves', titulo: 'Envés', disciplina: 'macrofotografia', foto: 'enves' },
];

export const OBRA_INICIAL = 8;

export const nombreDisciplina = (slug: string) => disciplinas.find(d => d.slug === slug)?.nombre ?? slug;

/** Textos PROPUESTOS para Estudio, pendientes de aprobación. */
export const textosPropuestos = {
  porQueAureo:
    'Lo áureo es lo que tiene valor y merece conservarse. También es armonía: el equilibrio entre las formas. El estudio toma ese nombre como una forma de trabajar: buscar lo valioso en lo que suele pasar inadvertido y darle permanencia.',
  cruzarUmbral:
    'Fotografiar es detenerse en el límite entre lo visible y lo inadvertido, entre la luz y la sombra, entre lo que pasa y lo que permanece. Del otro lado está aquello que todavía no hemos aprendido a mirar.',
};

/** Canales del estudio: POR DEFINIR. */
export const canales = [
  { etiqueta: 'Correo', valor: null as string | null },
  { etiqueta: 'WhatsApp', valor: null as string | null },
  { etiqueta: 'Instagram', valor: null as string | null },
];

export type Mensaje = {
  disciplinas: string[];
  nombre: string;
  correo: string;
  whatsapp: string;
  fecha: string;
  idea: string;
};
