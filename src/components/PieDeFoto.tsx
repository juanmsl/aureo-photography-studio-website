import { cn } from 'polpo/helpers';

/** Pie de foto: título en Instrument Serif y disciplina en Hanken. */
export const PieDeFoto = ({ titulo, disciplina, className }: { titulo: string; disciplina: string; className?: string }) => (
  <figcaption className={cn('mt-4 grid gap-1', className)}>
    <span className='voz-serif text-[clamp(1.3125rem,1.8vw,1.625rem)] leading-[1.2] text-texto'>{titulo}</span>
    <span className='t-label font-medium text-texto-suave'>{disciplina}</span>
  </figcaption>
);
