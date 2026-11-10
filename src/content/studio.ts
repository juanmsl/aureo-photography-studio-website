/**
 * Áureo content. Brand copy is the version approved in docs/CONTEXT.md
 * (slogan, secondary phrase and statement). Do not change it without asking.
 */

/** Public site domain (Vercel with a custom domain). */
export const SITE_URL = 'https://aureostudio.co';

export const brand = {
  name: 'Áureo',
  descriptor: 'Estudio Fotográfico',
  /** Approved. */
  slogan: 'Lo extraordinario, más allá de lo evidente.',
  /** Allowed secondary phrase. */
  secondaryPhrase: 'Donde cada detalle revela un mundo.',
};

/** Approved brand statement (combined version, November 2026). */
export const statement = {
  opening: 'Creemos que la belleza no siempre se revela a simple vista.',
  paragraphs: [
    'Habita en los detalles que pasan desapercibidos, en la armonía de las formas, en la luz que transforma los espacios y en los instantes que parecen cotidianos hasta que alguien decide mirarlos de otra manera.',
    'Creemos que cada momento, cada forma y cada espacio guardan un valor que trasciende lo que nuestros ojos perciben. Que entre la luz y la sombra, entre lo visible y lo inadvertido, entre aquello que sucede y lo que permanece, existe un universo por descubrir.',
    'A través de la fotografía exploramos ese universo: buscamos nuevas perspectivas, encontramos belleza donde pocas veces nos detenemos a mirar y damos forma a aquello que, de otro modo, podría desvanecerse sin ser visto.',
  ],
};

export type PhotoId =
  | 'door'
  | 'threshold'
  | 'veins'
  | 'gaze'
  | 'ajar'
  | 'eye'
  | 'fern'
  | 'leaf'
  | 'arch'
  | 'backlight'
  | 'iris'
  | 'underside';

/**
 * Moodboard reference photos, PROVISIONAL: they are not the studio's own
 * photographs. Replace them in `public/photos/` before publishing.
 */
export const photos: Record<PhotoId, { file: string; description: string }> = {
  door: { file: 'door.jpg', description: 'Puerta entreabierta con luz dorada que cae sobre el suelo' },
  threshold: { file: 'threshold.jpg', description: 'Arco en un muro claro con luz cálida al fondo' },
  veins: { file: 'veins.jpg', description: 'Nervaduras de una hoja a contraluz' },
  gaze: { file: 'gaze.jpg', description: 'Ojo atravesado por una franja de luz' },
  ajar: { file: 'ajar.jpg', description: 'Pasillo oscuro con un vano iluminado' },
  eye: { file: 'eye.jpg', description: 'Ojo de cerca en penumbra' },
  fern: { file: 'fern.jpg', description: 'Helecho enrollado iluminado' },
  leaf: { file: 'leaf.jpg', description: 'Hoja translúcida a contraluz' },
  arch: { file: 'arch.jpg', description: 'Arco que se abre a un paisaje de montaña' },
  backlight: { file: 'backlight.jpg', description: 'Hoja seca dorada a contraluz' },
  iris: { file: 'iris.jpg', description: 'Ojo verde con pecas y luz cálida' },
  underside: { file: 'underside.jpg', description: 'Envés de una hoja con luz rasante' },
};

export type Discipline = { name: string; slug: string; description: string; photo: PhotoId };

/** The nine disciplines, in the studio's order. None of them dominates. */
export const disciplines: Array<Discipline> = [
  {
    name: 'Naturaleza',
    slug: 'naturaleza',
    description: 'Flora, fauna y los detalles del mundo natural.',
    photo: 'leaf',
  },
  {
    name: 'Paisaje',
    slug: 'paisaje',
    description: 'Lugares abiertos y la luz que los transforma a lo largo del día.',
    photo: 'arch',
  },
  {
    name: 'Macrofotografía',
    slug: 'macrofotografia',
    description: 'Lo muy pequeño, visto de cerca: texturas, nervaduras, gotas.',
    photo: 'veins',
  },
  {
    name: 'Retrato',
    slug: 'retrato',
    description: 'Personas, a solas o en grupo, con luz natural o de estudio.',
    photo: 'gaze',
  },
  {
    name: 'Moda',
    slug: 'moda',
    description: 'Prendas y accesorios para marcas, lookbooks y editoriales.',
    photo: 'iris',
  },
  {
    name: 'Arquitectura',
    slug: 'arquitectura',
    description: 'Edificios, fachadas y las formas que la luz revela en ellos.',
    photo: 'threshold',
  },
  {
    name: 'Interiores',
    slug: 'interiores',
    description: 'Espacios habitados: casas, hoteles, restaurantes y oficinas.',
    photo: 'ajar',
  },
  {
    name: 'Eventos',
    slug: 'eventos',
    description: 'Celebraciones y encuentros contados con discreción.',
    photo: 'backlight',
  },
  {
    name: 'Producto',
    slug: 'producto',
    description: 'Objetos para tienda en línea, catálogo y campañas.',
    photo: 'fern',
  },
];

/** Home page selection (Obra section). */
export const featuredWork: Array<{ slug: string; photo: PhotoId; title: string; discipline: string }> = [
  { slug: 'umbral', photo: 'threshold', title: 'Umbral', discipline: 'Arquitectura' },
  { slug: 'nervaduras', photo: 'veins', title: 'Nervaduras', discipline: 'Macrofotografía' },
  { slug: 'mirada', photo: 'gaze', title: 'Mirada', discipline: 'Retrato' },
  { slug: 'entreabierta', photo: 'ajar', title: 'Entreabierta', discipline: 'Interiores' },
];

export const navigation = [
  { label: 'Obra', a: '/obra' },
  { label: 'Estudio', a: '/estudio' },
  { label: 'Disciplinas', a: '/disciplinas' },
  { label: 'Contacto', a: '/contacto' },
];

export type Work = {
  slug: string;
  title: string;
  discipline: Discipline['slug'];
  photo: PhotoId;
};

/**
 * The studio's work (provisional: moodboard images). The order is the one on
 * the Obra page; the first eight are shown initially.
 */
export const works: Array<Work> = [
  { slug: 'umbral', title: 'Umbral', discipline: 'arquitectura', photo: 'threshold' },
  { slug: 'nervaduras', title: 'Nervaduras', discipline: 'macrofotografia', photo: 'veins' },
  { slug: 'mirada', title: 'Mirada', discipline: 'retrato', photo: 'gaze' },
  { slug: 'entreabierta', title: 'Entreabierta', discipline: 'interiores', photo: 'ajar' },
  { slug: 'contraluz', title: 'Contraluz', discipline: 'naturaleza', photo: 'backlight' },
  { slug: 'iris', title: 'Iris', discipline: 'retrato', photo: 'iris' },
  { slug: 'quietud', title: 'Quietud', discipline: 'interiores', photo: 'door' },
  { slug: 'rendija', title: 'Rendija', discipline: 'arquitectura', photo: 'arch' },
  { slug: 'translucida', title: 'Translúcida', discipline: 'naturaleza', photo: 'leaf' },
  { slug: 'penumbra', title: 'Penumbra', discipline: 'retrato', photo: 'eye' },
  { slug: 'brote', title: 'Brote', discipline: 'naturaleza', photo: 'fern' },
  { slug: 'enves', title: 'Envés', discipline: 'macrofotografia', photo: 'underside' },
];

export const INITIAL_WORK_COUNT = 8;

export const disciplineName = (slug: string) => disciplines.find(d => d.slug === slug)?.name ?? slug;

/** PROPOSED texts for the Studio page, pending approval. */
export const proposedTexts = {
  whyAureo:
    'Lo áureo es lo que tiene valor y merece conservarse. También es armonía: el equilibrio entre las formas. El estudio toma ese nombre como una forma de trabajar: buscar lo valioso en lo que suele pasar inadvertido y darle permanencia.',
  crossingThreshold:
    'Fotografiar es detenerse en el límite entre lo visible y lo inadvertido, entre la luz y la sombra, entre lo que pasa y lo que permanece. Del otro lado está aquello que todavía no hemos aprendido a mirar.',
};

/** Studio channels: TO BE DEFINED. */
export const channels = [
  { label: 'Correo', value: null as string | null },
  { label: 'WhatsApp', value: null as string | null },
  { label: 'Instagram', value: null as string | null },
];

export type ContactMessage = {
  disciplines: Array<string>;
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  idea: string;
};
