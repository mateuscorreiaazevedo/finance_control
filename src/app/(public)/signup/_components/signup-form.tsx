'use client'

import { Button, Form, Input } from '@/modules/shared/components'
import { useTranslations } from '@/modules/shared/hooks'
import Image from 'next/image'
import { useProvidersList } from '../../_hooks/use-providers-list'

import * as s from 'yup'

const schema = s.object().shape({
  firstName: s.string().required(),
  lastName: s.string().required(),
  birthDate: s.string().required(),
  email: s.string().email().required(),
  password: s.string().min(8).required(),
  confirmPassword: s.string().oneOf([s.ref('password')], 'form.error.passwords.match'),
})

type SignUpType = s.InferType<typeof schema>

export function SignupForm() {
  const { translate } = useTranslations('pages.signup.form')
  const providers = useProvidersList()

  const handleAction = (data: SignUpType) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log({ data })
  }

  return (
    <article className="flex flex-col md:w-2/5 shadow-inner flex-1 md:flex-none bg-gradient-to-tr to-purple-800/20 md:h-fit from-violet-700/20 backdrop-blur-sm p-10 rounded-xl border border-zinc-200/50 md:overflow-y-hidden overflow-y-auto">
      {/* Providers */}
      <section className="flex flex-col justify-center h-fit w-full items-center gap-6">
        <h4 className="text-zinc-50 text-base/3">{translate('providers.label')}</h4>
        <div className="flex flex-row gap-4 items-center">
          {providers.map(provider => (
            <Button
              type="button"
              key={`provider-${provider.key}`}
              variant={'glass'}
              size={'lg'}
            >
              <Image src={provider.icon} alt={provider.key} width={24} height={24} />
              {provider.label}
            </Button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="w-full h-px bg-zinc-200/50" />
          <span className="font-light text-muted-foreground text-xs">
            {translate('credentials.label')}
          </span>
          <div className="w-full h-px bg-zinc-200/50" />
        </div>
      </section>
      <Form action={handleAction} schema={schema} className="w-full mt-8 space-y-4">
        <fieldset className="flex lg:flex-row flex-col lg:gap-6 gap-4">
          <Input
            variant="glass"
            name="firstName"
            placement={'outside'}
            label={translate('credentials.firstName.label')}
            placeholder={translate('credentials.firstName.placeholder')}
          />
          <Input
            variant="glass"
            name="lastName"
            placement={'outside'}
            label={translate('credentials.lastName.label')}
            placeholder={translate('credentials.lastName.placeholder')}
          />
        </fieldset>
        <Input
          variant="glass"
          name="email"
          label={translate('credentials.email.label')}
          placement={'outside'}
          placeholder={translate('credentials.email.placeholder')}
        />
        <Input
          variant="glass"
          name="birthDate"
          placement={'outside'}
          placeholder={translate('credentials.birthDate.placeholder')}
          label={translate('credentials.birthDate.label')}
        />
        <Input
          variant="glass"
          name="password"
          type={'password'}
          label={translate('credentials.password.label')}
          placeholder={translate('credentials.password.placeholder')}
          placement={'outside'}
        />
        <Input
          variant="glass"
          name="confirmPassword"
          type={'password'}
          label={translate('credentials.confirmPassword.label')}
          placeholder={translate('credentials.confirmPassword.placeholder')}
          placement={'outside'}
        />
        <div className="w-full h-px bg-zinc-200/50" />
        <Button type="submit" className="w-full text-zinc-50" size={'lg'} variant={'secondary'}>
          {translate('credentials.button.label')}
        </Button>
      </Form>
    </article>
  )
}
