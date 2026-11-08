import { Button, DatePicker, Input, Textarea, Typography } from 'polpo/components';
import { useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Chip } from '../components/Chip';
import { FotoIluminada } from '../components/FotoIluminada';
import { Navegacion, PiePagina } from '../components/Marco';
import { canales, disciplinas, type Mensaje } from '../content/estudio';

/** Selección múltiple de disciplinas con los chips de Áureo. */
const ChipsDisciplinas = ({ control }: { control: ReturnType<typeof useForm<Mensaje>>['control'] }) => {
  const { field } = useController({ name: 'disciplinas', control });
  const valor: Array<string> = field.value ?? [];
  const alternar = (nombre: string) =>
    field.onChange(valor.includes(nombre) ? valor.filter(v => v !== nombre) : [...valor, nombre]);

  return (
    <fieldset className='m-0 min-w-0 border-0 p-0'>
      <legend className='t-label mb-3.5 p-0 font-medium text-texto-suave'>¿Qué quieres fotografiar?</legend>
      <div className='flex flex-wrap gap-2.5'>
        {disciplinas.map(d => (
          <Chip key={d.slug} activo={valor.includes(d.nombre)} onClick={() => alternar(d.nombre)} onBlur={field.onBlur}>
            {d.nombre}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
};

export const Contacto = () => {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const methods = useForm<Mensaje>({
    defaultValues: { disciplinas: [], nombre: '', correo: '', whatsapp: '', fecha: '', idea: '' },
  });

  const enviar = methods.handleSubmit(async datos => {
    setEnviando(true);
    // Pendiente: conectar con el servicio que reciba los mensajes del estudio.
    await new Promise(r => {
      setTimeout(r, 600);
    });
    navigate('/contacto/enviado', { state: datos });
  });

  return (
    <>
      <Navegacion />
      <main className='px-5 pt-14 pb-20 md:px-24 md:pt-20 md:pb-36'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,45.5rem)_minmax(0,25rem)] lg:justify-between lg:gap-30'>
          <div>
            <Typography variant='hero' as='h1' noPadding className='m-0 max-w-[41.25rem] text-texto-fuerte'>
              Agenda una conversación
            </Typography>
            <Typography noPadding className='voz-serif m-0 mt-4 t-bajada text-texto'>
              Cuéntanos qué quieres fotografiar.
            </Typography>

            <FormProvider {...methods}>
              <form onSubmit={enviar} noValidate className='campo-aureo mt-10 grid gap-9'>
                <ChipsDisciplinas control={methods.control} />

                <div className='grid gap-9 md:grid-cols-2 md:gap-8'>
                  <Input.Controller
                    name='nombre'
                    label='Nombre'
                    placeholder='Tu nombre'
                    autoComplete='name'
                    variant='line'
                    rules={{ required: 'Escribe tu nombre para saber cómo llamarte.' }}
                  />
                  <Input.Controller
                    name='correo'
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
                  <DatePicker.Controller name='fecha' type='month' label='Fecha aproximada' variant='line' />
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
                  <Button type='submit' color='primary' radius='full' isLoading={enviando}>
                    Enviar mensaje
                  </Button>
                  <Typography variant='small' noPadding className='m-0 text-texto-suave'>
                    Usamos tus datos solo para responderte.
                  </Typography>
                </div>
              </form>
            </FormProvider>
          </div>

          <aside aria-labelledby='otros-canales' className='grid content-start gap-5'>
            <FotoIluminada id='mirada' caida={0.45} className='aspect-[4/5] w-full' />
            <Typography id='otros-canales' variant='header2' as='h2' noPadding className='m-0'>
              Otros canales
            </Typography>
            <dl className='m-0 grid gap-5'>
              {canales.map(c => (
                <div key={c.etiqueta} className='border-t border-linea pt-3'>
                  <dt className='t-label font-medium text-texto-suave'>{c.etiqueta}</dt>
                  <dd className='m-0 mt-0.5 text-texto'>{c.valor ?? 'Por definir'}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </main>
      <PiePagina />
    </>
  );
};
