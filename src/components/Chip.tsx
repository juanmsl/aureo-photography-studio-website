import type { ButtonHTMLAttributes } from 'react';

import { cn } from 'polpo/helpers';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean };

/**
 * Áureo chip (Inactive: strong-line outline; Active: amber fill).
 * Polpo has no selectable chip with this look; it is a native button with aria-pressed.
 */
export const Chip = ({ active, className, children, ...props }: ChipProps) => (
  <button
    type='button'
    aria-pressed={active}
    {...props}
    className={cn(
      't-label cursor-pointer rounded-full border px-4.5 py-2.5 font-medium transition-colors duration-200',
      active
        ? 'border-accent bg-accent text-ground'
        : 'border-line-strong bg-transparent text-fg-muted hover:border-fg-muted hover:text-fg-strong',
      className,
    )}
  >
    {children}
  </button>
);
