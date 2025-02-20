'use client'
import { useTranslations } from '@/modules/shared/hooks'
import Image from 'next/image'
import { useProvidersList } from '../../_hooks/use-providers-list'

export function SignupForm() {
  const { translate } = useTranslations('pages.signup.form')

  const providers = useProvidersList()

  return (
    <article className="flex flex-col md:w-2/5 w-full bg-zinc-200/30 backdrop-blur-sm p-10 rounded-xl border border-zinc-200/50 shadow">
      {/* Providers */}
      <section className="flex flex-col justify-center h-fit w-full items-center gap-6">
        <h4 className="text-accent-foreground text-base/3">{translate('providers.label')}</h4>
        <div className="flex flex-row gap-4 items-center">
          {providers.map(provider => (
            <button
              type="button"
              key={`provider-${provider.key}`}
              className="bg-primary-foreground/30 backdrop-blur-md border-primary/20 flex items-center hover:bg-primary-foreground/50 hover:border-primary/30"
            >
              <Image src={provider.icon} alt={provider.key} width={24} height={24} />
              {provider.label}
            </button>
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
      <section className="flex flex-col">
        <p>s</p>
      </section>
    </article>
  )
}
