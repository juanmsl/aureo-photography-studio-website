import { cn } from 'polpo/helpers';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

type EnlaceProps = {
  a: string;
  children: ReactNode;
  /** `accion`: ámbar con subrayado, para llamados a la acción en texto. */
  accion?: boolean;
  activo?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * Enlace de Áureo (componente "Enlace" de Figma): gris cálido en reposo,
 * luz pálida con subrayado ámbar al pasar el cursor, ámbar subrayado en acción.
 */
export const Enlace = ({ a, children, accion, activo, className, onClick }: EnlaceProps) => (
  <Link
    to={a}
    onClick={onClick}
    aria-current={activo ? 'page' : undefined}
    className={cn(
      'group relative inline-flex flex-col gap-1.5 t-label font-medium transition-colors duration-200',
      accion ? 'text-acento' : activo ? 'text-texto-fuerte' : 'text-texto-suave hover:text-texto-fuerte',
      className,
    )}
  >
    {children}
    <span
      aria-hidden
      className={cn(
        'h-px bg-acento transition-[width] duration-300 ease-out motion-reduce:transition-none',
        accion || activo ? 'w-full' : 'w-0 group-hover:w-full group-focus-visible:w-full',
      )}
    />
  </Link>
);
