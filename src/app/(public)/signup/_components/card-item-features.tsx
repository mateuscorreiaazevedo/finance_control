import { getTranslations } from '@/modules/shared/functions/server'
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

type Props = {
  icon: ComponentType<LucideProps>
  path: 'creditCard' | 'charts' | 'security' | 'compliance'
}

export async function CardItemFeatures({ icon: Icon, path }: Props) {
  const { translate } = await getTranslations(`pages.signup.features.${path}`)

  return (
    <section className="flex flex-col gap-1 justify-center">
      <Icon className="size-8 fill-purple-600/20 text-purple-400" />
      <h3 className="text-lg font-semibold text-purple-400">{translate('title')}</h3>
      <p className="text-sm font-light text-zinc-300">{translate('description')}</p>
    </section>
  )
}
