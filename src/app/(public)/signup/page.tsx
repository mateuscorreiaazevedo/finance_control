import { getTranslations } from '@/modules/shared/functions/server'
import type { Metadata } from 'next'
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
    <section className="flex flex-1 h-screen py-10 items-center">
      <aside className="md:flex flex-1 hidden justify-end pr-10">teste</aside>
      <SignupForm />
    </section>
  )
}
