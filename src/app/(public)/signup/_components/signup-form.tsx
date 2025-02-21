'use client'

import { Button } from '@/modules/shared/components'
import { useTranslations } from '@/modules/shared/hooks'
import Image from 'next/image'
import { useProvidersList } from '../../_hooks/use-providers-list'

export function SignupForm() {
  const { translate } = useTranslations('pages.signup.form')
  const providers = useProvidersList()

  return (
    <article className="flex flex-col md:w-2/5 shadow-inner flex-1 md:flex-none md:self-center bg-gradient-to-tr to-purple-800/20 md:h-fit from-violet-700/20 backdrop-blur-sm p-10 rounded-xl border border-zinc-200/50">
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
    </article>
  )
}
