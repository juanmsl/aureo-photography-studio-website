import type { ReactNode } from 'react';

import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

type TextLinkProps = {
  a: string;
  children: ReactNode;
  /** `action`: amber with underline, for text calls to action. */
  action?: boolean;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * Áureo text link ("Enlace" component in Figma): warm gray at rest, pale light
 * with an amber underline on hover, underlined amber for actions.
 */
export const TextLink = ({ a, children, action, active, className, onClick }: TextLinkProps) => (
  <Link
    viewTransition
    to={a}
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={cn(
      'group relative inline-flex flex-col gap-1.5 t-label font-medium transition-colors duration-200',
      action ? 'text-accent' : active ? 'text-fg-strong' : 'text-fg-muted hover:text-fg-strong',
      className,
    )}
  >
    {children}
    <span
      aria-hidden
      className={cn(
        'h-px bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none',
        action || active ? 'w-full' : 'w-0 group-hover:w-full group-focus-visible:w-full',
      )}
    />
  </Link>
);
