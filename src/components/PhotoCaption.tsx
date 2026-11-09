import { cn } from 'polpo/helpers';

/** Photo caption: title in Instrument Serif and discipline in Hanken. */
export const PhotoCaption = ({
  title,
  discipline,
  className,
}: {
  title: string;
  discipline: string;
  className?: string;
}) => (
  <figcaption className={cn('mt-4 grid gap-1', className)}>
    <span className='serif-voice text-[clamp(1.3125rem,1.8vw,1.625rem)] leading-[1.2] text-fg'>{title}</span>
    <span className='t-label font-medium text-fg-muted'>{discipline}</span>
  </figcaption>
);
