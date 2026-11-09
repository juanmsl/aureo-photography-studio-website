import { Button, Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { ConversationCta, Navigation, Footer } from '../components/Layout';
import { LitPhoto } from '../components/LitPhoto';
import { PhotoCaption } from '../components/PhotoCaption';
import { TextLink } from '../components/TextLink';
import { statement, disciplines, brand, featuredWork } from '../content/studio';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby='slogan'
      className='relative flex flex-col overflow-hidden md:min-h-[min(100dvh,56.25rem)]'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute top-[27.5rem] left-[10%] h-[16rem] w-[26rem] rounded-full bg-accent/20 blur-[90px] md:top-auto md:bottom-[-11rem] md:left-[36%] md:h-[23.75rem] md:w-[58.75rem] md:blur-[130px]'
      />
      <Navigation />
      <LitPhoto
        id='door'
        falloff={0.42}
        priority
        className='mt-3 ml-[15%] aspect-[330/470] w-[85%] md:absolute md:top-[3.125rem] md:right-[5.5%] md:mt-0 md:ml-0 md:aspect-[540/800] md:w-[37.5%] md:max-w-[33.75rem]'
      />
      <div className='relative grid gap-4 px-5 pt-6 pb-12 md:mt-auto md:mb-auto md:max-w-[57rem] md:gap-0 md:px-24 md:py-0'>
        <Typography id='slogan' variant='hero' as='h1' noPadding className='m-0 text-fg-strong'>
          Lo extraordinario,
          <br />
          más allá de lo evidente.
        </Typography>
        <Typography noPadding className='serif-voice m-0 max-w-[33.75rem] t-subtitle text-fg-muted md:mt-7'>
          Estudio fotográfico de naturaleza, paisaje, retrato, moda, arquitectura, interiores, eventos y producto.
        </Typography>
        <div className='mt-2 md:mt-10'>
          <Button color='primary' radius='full' onClick={() => navigate('/obra')}>
            Ver la obra
          </Button>
        </div>
      </div>
    </section>
  );
};

const StatementSection = () => (
  <section aria-labelledby='statement-title' className='px-5 py-18 md:px-24 md:pt-35 md:pb-40'>
    <Typography
      id='statement-title'
      as='h2'
      noPadding
      align='center'
      className='serif-voice m-0 mx-auto max-w-[55rem] t-quote tracking-[-0.01em] text-fg-strong'
    >
      {statement.opening}
    </Typography>
    <div className='mx-auto mt-10 grid max-w-[71.25rem] items-center justify-items-center gap-10 md:mt-30 md:grid-cols-[minmax(0,32.5rem)_minmax(0,32.5rem)] md:justify-between md:gap-14'>
      <LitPhoto id='eye' circle falloff={0.55} className='aspect-square w-[min(100%,18.75rem)] md:w-full' />
      <div className='grid gap-6 md:max-w-[32.5rem]'>
        {statement.paragraphs.map(p => (
          <Typography key={p.slice(0, 16)} noPadding className='m-0 text-fg'>
            {p}
          </Typography>
        ))}
        <div className='mt-4'>
          <TextLink a='/estudio' action>
            Conoce el estudio
          </TextLink>
        </div>
      </div>
    </div>
  </section>
);

const WorkPage = () => {
  const [tall, wide, pairLeft, pairRight] = featuredWork;

  return (
    <section aria-labelledby='work-title' className='px-5 py-16 md:px-24 md:pt-30 md:pb-12'>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div className='grid gap-3'>
          <Typography id='work-title' variant='header1' as='h2' noPadding className='m-0'>
            Obra
          </Typography>
          <Typography noPadding className='serif-voice m-0 max-w-[32.5rem] t-subtitle text-fg-muted'>
            Una selección de fotografías de distintas disciplinas, cada una con su propia luz.
          </Typography>
        </div>
        <TextLink a='/obra' action className='hidden md:inline-flex md:mt-6'>
          Ver toda la obra
        </TextLink>
      </div>

      <div className='mt-10 grid gap-10 md:mt-19 md:grid-cols-[560fr_624fr] md:gap-16'>
        <figure className='m-0'>
          <Link to={`/obra/${tall.slug}`} aria-label={`${tall.title}, ver ampliada`} className='block'>
            <LitPhoto id={tall.photo} className='aspect-[560/760] w-full' />
          </Link>
          <PhotoCaption title={tall.title} discipline={tall.discipline} />
        </figure>
        <div className='grid content-start gap-10 md:gap-0'>
          <figure className='m-0'>
            <Link to={`/obra/${wide.slug}`} aria-label={`${wide.title}, ver ampliada`} className='block'>
              <LitPhoto id={wide.photo} className='aspect-[624/380] w-full' />
            </Link>
            <PhotoCaption title={wide.title} discipline={wide.discipline} />
          </figure>
          <div className='grid grid-cols-[300fr_280fr] gap-2.5 md:mt-1.5 md:gap-11'>
            {[
              { ...pairLeft, ratio: 'aspect-[300/400]' },
              { ...pairRight, ratio: 'aspect-[280/400]' },
            ].map(o => (
              <figure key={o.title} className='m-0'>
                <Link to={`/obra/${o.slug}`} aria-label={`${o.title}, ver ampliada`} className='block'>
                  <LitPhoto id={o.photo} falloff={0.45} className={`${o.ratio} w-full`} />
                </Link>
                <PhotoCaption title={o.title} discipline={o.discipline} />
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-6 md:mt-6'>
        <TextLink a='/obra' action className='self-start md:hidden'>
          Ver toda la obra
        </TextLink>
        <Typography variant='small' noPadding className='m-0 text-fg-muted'>
          Fotografías de referencia, provisionales
        </Typography>
      </div>
    </section>
  );
};

const DisciplinesPage = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section aria-labelledby='disciplines-title' className='px-5 py-16 md:px-24 md:pt-35 md:pb-28'>
      <div className='grid gap-10 md:grid-cols-[minmax(0,28.75rem)_minmax(0,39rem)] md:justify-between md:gap-16'>
        <div className='grid content-start gap-4'>
          <Typography id='disciplines-title' variant='header1' as='h2' noPadding className='m-0'>
            Una misma forma de mirar
          </Typography>
          <Typography noPadding className='serif-voice m-0 t-subtitle text-fg-strong'>
            {brand.secondaryPhrase}
          </Typography>
          <Typography noPadding className='m-0 max-w-[27.5rem] text-fg-muted'>
            El sello del estudio no es un género, sino una manera de observar. La misma atención llega a un paisaje, a
            un rostro, a un espacio o a un objeto.
          </Typography>
        </div>
        <ul className='m-0 list-none border-b border-line p-0' onMouseLeave={() => setActiveSlug(null)}>
          {disciplines.map(d => {
            const lit = activeSlug === d.slug;

            return (
              <li key={d.slug} className='border-t border-line'>
                <Link
                  to={`/disciplinas#${d.slug}`}
                  onMouseEnter={() => setActiveSlug(d.slug)}
                  onFocus={() => setActiveSlug(d.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className='flex items-center justify-between gap-6 py-3.5 md:py-4.5'
                >
                  <span
                    className={cn(
                      'font-title t-header2 font-extrabold transition-colors duration-300',
                      lit ? 'text-accent' : 'text-fg-muted',
                    )}
                  >
                    {d.name}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'hidden overflow-hidden transition-[height,opacity] duration-500 ease-out motion-reduce:transition-none md:block',
                      lit ? 'h-30 opacity-100' : 'h-0 opacity-0',
                    )}
                  >
                    <LitPhoto id={d.photo} falloff={0.35} className='h-30 w-50' />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export const HomePage = () => (
  <>
    <Hero />
    <main>
      <StatementSection />
      <WorkPage />
      <DisciplinesPage />
      <ConversationCta />
    </main>
    <Footer />
  </>
);
