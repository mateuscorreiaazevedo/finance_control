import { Fintrol } from '@/modules/shared/components'
import { getTranslations } from '@/modules/shared/functions/server'
import { BadgeCheck, ChartPie, CreditCard, Info, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { CardItemFeatures } from './_components/card-item-features'
import { SignupForm } from './_components/signup-form'

export async function generateMetadata(): Promise<Metadata> {
  const { translate } = await getTranslations('pages.signup.meta')

  return {
    title: translate('title'),
    description: translate('description'),
    applicationName: 'Fintrol',
  }
}

export default async function SignUpPage() {
  const { translate } = await getTranslations('pages.signup')

  return (
    <section className="flex flex-1 h-screen py-10 gap-10">
      <aside className="md:flex flex-1 flex-col hidden mt-20 gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold font-montserrat text-purple-100 flex gap-2 items-end">
            <Fintrol className="size-9" withoutBars />
            {translate('title')}
          </h1>
          <h2 className="text-xl font-normal text-zinc-100">{translate('description')}</h2>
          <span className="flex gap-x-1.5 text-zinc-400 text-sm items-center">
            <Info className="size-5" />
            {translate('information')}
          </span>
        </header>
        <div className="flex flex-col gap-4">
          <CardItemFeatures icon={CreditCard} path="creditCard" />
          <CardItemFeatures icon={BadgeCheck} path="compliance" />
          <CardItemFeatures icon={ChartPie} path="charts" />
          <CardItemFeatures icon={ShieldCheck} path="security" />
        </div>
      </aside>
      <SignupForm />
    </section>
  )
}
