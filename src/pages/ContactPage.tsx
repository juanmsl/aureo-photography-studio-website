import { Button, DatePicker, Input, Textarea, Typography } from 'polpo/components';
import { useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Chip } from '../components/Chip';
import { Navigation, Footer } from '../components/Layout';
import { LitPhoto } from '../components/LitPhoto';
import { channels, disciplines, type ContactMessage } from '../content/studio';

/** Multiple selection of disciplines with Áureo chips. */
const DisciplineChips = ({ control }: { control: ReturnType<typeof useForm<ContactMessage>>['control'] }) => {
  const { field } = useController({ name: 'disciplines', control });
  const value: Array<string> = field.value ?? [];
  const toggle = (name: string) =>
    field.onChange(value.includes(name) ? value.filter(v => v !== name) : [...value, name]);

  return (
    <fieldset className='m-0 min-w-0 border-0 p-0'>
      <legend className='t-label mb-3.5 p-0 font-medium text-fg-muted'>¿Qué quieres fotografiar?</legend>
      <div className='flex flex-wrap gap-2.5'>
        {disciplines.map(d => (
          <Chip key={d.slug} active={value.includes(d.name)} onClick={() => toggle(d.name)} onBlur={field.onBlur}>
            {d.name}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
};

export const ContactPage = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const methods = useForm<ContactMessage>({
    defaultValues: { disciplines: [], name: '', email: '', whatsapp: '', date: '', idea: '' },
  });

  const submit = methods.handleSubmit(async data => {
    setSending(true);
    // Pending: connect to a service that receives the studio's messages.
    await new Promise(r => {
      setTimeout(r, 600);
    });
    navigate('/contacto/enviado', { state: data });
  });

  return (
    <>
      <Navigation />
      <main className='px-5 pt-14 pb-20 md:px-24 md:pt-20 md:pb-36'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,45.5rem)_minmax(0,25rem)] lg:justify-between lg:gap-30'>
          <div>
            <Typography variant='hero' as='h1' noPadding className='m-0 max-w-[41.25rem] text-fg-strong'>
              Agenda una conversación
            </Typography>
            <Typography noPadding className='serif-voice m-0 mt-4 t-subtitle text-fg'>
              Cuéntanos qué quieres fotografiar.
            </Typography>

            <FormProvider {...methods}>
              <form onSubmit={submit} noValidate className='line-fields mt-10 grid gap-9'>
                <DisciplineChips control={methods.control} />

                <div className='grid gap-9 md:grid-cols-2 md:gap-8'>
                  <Input.Controller
                    name='name'
                    label='Nombre'
                    placeholder='Tu nombre'
                    autoComplete='name'
                    variant='line'
                    rules={{ required: 'Escribe tu nombre para saber cómo llamarte.' }}
                  />
                  <Input.Controller
                    name='email'
                    type='email'
                    label='Correo electrónico'
                    placeholder='tu@correo.com'
                    autoComplete='email'
                    variant='line'
                    rules={{
                      required: 'Escribe tu correo para poder responderte.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Revisa el correo: falta el dominio, por ejemplo ana@correo.com',
                      },
                    }}
                  />
                </div>

                <div className='grid gap-9 md:grid-cols-2 md:gap-8'>
                  <Input.Controller
                    name='whatsapp'
                    label='WhatsApp (opcional)'
                    placeholder='+57 300 000 0000'
                    autoComplete='tel'
                    variant='line'
                  />
                  <DatePicker.Controller name='date' type='month' label='Fecha aproximada' variant='line' />
                </div>

                <Textarea.Controller
                  name='idea'
                  label='Cuéntanos tu idea'
                  placeholder='Qué quieres fotografiar, para qué y cuándo.'
                  rows={3}
                  variant='line'
                  rules={{ required: 'Cuéntanos un poco de la idea para preparar la conversación.' }}
                />

                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
                  <Button type='submit' color='primary' radius='full' isLoading={sending}>
                    Enviar mensaje
                  </Button>
                  <Typography variant='small' noPadding className='m-0 text-fg-muted'>
                    Usamos tus datos solo para responderte.
                  </Typography>
                </div>
              </form>
            </FormProvider>
          </div>

          <aside aria-labelledby='channels-title' className='grid content-start gap-5'>
            <LitPhoto id='gaze' falloff={0.45} className='aspect-[4/5] w-full' />
            <Typography id='channels-title' variant='header2' as='h2' noPadding className='m-0'>
              Otros canales
            </Typography>
            <dl className='m-0 grid gap-5'>
              {channels.map(c => (
                <div key={c.label} className='border-t border-line pt-3'>
                  <dt className='t-label font-medium text-fg-muted'>{c.label}</dt>
                  <dd className='m-0 mt-0.5 text-fg'>{c.value ?? 'Por definir'}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};
