import { cn } from 'polpo/helpers';
import type { ButtonHTMLAttributes } from 'react';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { activo?: boolean };

/**
 * Chip de Áureo (Inactivo: contorno línea fuerte; Activo: relleno ámbar).
 * Polpo no trae un chip seleccionable con este aspecto; es un botón nativo con aria-pressed.
 */
export const Chip = ({ activo, className, children, ...props }: ChipProps) => (
  <button
    type='button'
    aria-pressed={activo}
    {...props}
    className={cn(
      't-label cursor-pointer rounded-full border px-4.5 py-2.5 font-medium transition-colors duration-200',
      activo
        ? 'border-acento bg-acento text-fondo'
        : 'border-linea-fuerte bg-transparent text-texto-suave hover:border-texto-suave hover:text-texto-fuerte',
      className,
    )}
  >
    {children}
  </button>
);
