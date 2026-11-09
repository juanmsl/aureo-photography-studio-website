import { AsideModal, Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useViewport } from 'polpo/hooks';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { brand, navigation } from '../content/studio';

import { TextLink } from './TextLink';

const YEAR = new Date().getFullYear();

/** PROVISIONAL typographic logotype: Áureo's logo has not been designed yet. */
export const Logotype = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
  <Link
    to='/'
    onClick={onClick}
    aria-label='Áureo, inicio'
    className={cn('font-title t-header4 leading-none font-extrabold tracking-[0.06em] text-fg', className)}
  >
    ÁUREO
  </Link>
);

export const Navigation = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useViewport();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={cn('relative z-20 px-5 pt-4 md:px-24 md:pt-10', className)}>
      <nav aria-label='Principal' className='flex min-h-11 items-center justify-between'>
        <Logotype />
        <ul className='m-0 hidden list-none items-center gap-10 p-0 lg:flex'>
          {navigation.map(e => (
            <li key={e.a}>
              <TextLink a={e.a} active={pathname.startsWith(e.a)}>
                {e.label}
              </TextLink>
            </li>
          ))}
          <li>
            <TextLink a='/contacto' action>
              Agenda una conversación
            </TextLink>
          </li>
        </ul>
        <button
          type='button'
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className='cursor-pointer bg-transparent p-2 -mr-2 t-label font-medium text-fg-muted hover:text-fg-strong lg:hidden'
        >
          Menú
        </button>
      </nav>

      <AsideModal
        isOpen={open}
        onClose={close}
        position='right'
        size={width || 390}
        backdrop='opaque'
        noCloseButton
        className='border-0! bg-ground'
        contentClassName='p-0!'
      >
        <div className='relative flex min-h-dvh flex-col overflow-hidden px-5 pt-4 pb-10'>
          <span
            aria-hidden
            className='pointer-events-none absolute -bottom-24 left-1/2 h-[18.75rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[90px]'
          />
          <div className='flex min-h-11 items-center justify-between'>
            <Logotype onClick={close} />
            <button
              type='button'
              onClick={close}
              className='cursor-pointer bg-transparent p-2 -mr-2 t-label font-medium text-fg-muted hover:text-fg-strong'
            >
              Cerrar
            </button>
          </div>
          <ul className='m-0 mt-32 grid list-none gap-2.5 p-0'>
            {navigation.map(e => (
              <li key={e.a}>
                <Link
                  to={e.a}
                  onClick={close}
                  className='font-title text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-fg'
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            color='primary'
            radius='full'
            fullWidth
            className='mt-auto'
            onClick={() => {
              close();
              navigate('/contacto');
            }}
          >
            Agenda una conversación
          </Button>
          <Typography noPadding className='serif-voice m-0 mt-8 t-subtitle text-fg-muted'>
            {brand.slogan}
          </Typography>
        </div>
      </AsideModal>
    </header>
  );
};

export const Footer = () => (
  <footer className='flex flex-col gap-6 border-t border-line px-5 pt-10 pb-12 md:flex-row md:items-start md:justify-between md:px-24 md:pt-14 md:pb-16'>
    <div className='grid gap-2.5'>
      <Logotype />
      <span className='serif-voice t-subtitle text-fg-muted'>{brand.descriptor}</span>
    </div>
    <nav aria-label='Pie de página'>
      <ul className='m-0 flex list-none flex-wrap gap-x-8 gap-y-2 p-0'>
        {navigation.map(e => (
          <li key={e.a}>
            <TextLink a={e.a}>{e.label}</TextLink>
          </li>
        ))}
      </ul>
    </nav>
    <Typography variant='small' noPadding className='m-0 text-fg-muted'>
      © {YEAR} Áureo Estudio Fotográfico
    </Typography>
  </footer>
);

/** "Conversemos sobre lo que quieres mostrar." with its amber glow behind. */
export const ConversationCta = () => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby='conversation-title'
      className='relative overflow-hidden px-5 py-22 md:px-24 md:pt-55 md:pb-60'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-1/2 h-[26rem] w-[min(51rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]'
      />
      <div className='relative mx-auto grid max-w-[54rem] justify-items-center gap-6 text-center'>
        <Typography id='conversation-title' variant='header1' as='h2' noPadding className='m-0 text-fg-strong'>
          Conversemos sobre lo que quieres mostrar.
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] text-fg-muted'>
          Cuéntanos qué quieres fotografiar y encontremos juntos la mejor manera de mirarlo.
        </Typography>
        <div className='mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
          <Button color='primary' radius='full' onClick={() => navigate('/contacto')}>
            Agenda una conversación
          </Button>
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            className='border-fg-muted hover:border-accent hover:text-fg-strong'
            onClick={() => navigate('/contacto')}
          >
            Escríbenos
          </Button>
        </div>
      </div>
    </section>
  );
};
