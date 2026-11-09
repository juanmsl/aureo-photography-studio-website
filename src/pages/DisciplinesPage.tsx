import { Typography } from 'polpo/components';
import { Link } from 'react-router';

import { ConversationCta, Navigation, Footer } from '../components/Layout';
import { LitPhoto } from '../components/LitPhoto';
import { disciplines, brand, works } from '../content/studio';

export const DisciplinesPage = () => (
  <>
    <Navigation />
    <main>
      <section aria-labelledby='disciplines-title' className='px-5 pt-14 pb-12 md:px-24 md:pt-24 md:pb-20'>
        <Typography id='disciplines-title' variant='hero' as='h1' noPadding className='m-0 text-fg-strong'>
          Disciplinas
        </Typography>
        <Typography noPadding className='serif-voice m-0 mt-3 t-subtitle text-fg'>
          {brand.secondaryPhrase}
        </Typography>
        <Typography noPadding className='m-0 mt-3 text-fg-muted'>
          Una misma forma de mirar, llevada a cada encargo.
        </Typography>
      </section>

      <section aria-label='Lista de disciplinas' className='px-5 pb-20 md:px-24 md:pb-10'>
        <ul className='m-0 list-none border-b border-line p-0'>
          {disciplines.map(d => {
            const hasWork = works.some(o => o.discipline === d.slug);

            return (
              <li key={d.slug} id={d.slug} className='scroll-mt-6 border-t border-line'>
                <article className='grid gap-4 py-6 md:grid-cols-[minmax(0,31.25rem)_minmax(0,25.75rem)_15rem] md:items-center md:justify-between md:gap-12 md:py-7'>
                  <Typography variant='header1' as='h2' noPadding className='m-0'>
                    {d.name}
                  </Typography>
                  <div className='grid gap-3'>
                    <Typography noPadding className='m-0 text-fg-muted'>
                      {d.description}
                    </Typography>
                    {hasWork && (
                      <Link
                        to={`/obra?disciplina=${d.slug}`}
                        className='t-label self-start font-medium text-accent underline decoration-1 underline-offset-[0.4em] hover:text-fg-strong'
                      >
                        Ver obra de {d.name.toLowerCase()}
                      </Link>
                    )}
                  </div>
                  <LitPhoto id={d.photo} falloff={0.4} className='aspect-[3/2] w-full md:w-60' />
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <ConversationCta />
    </main>
    <Footer />
  </>
);
