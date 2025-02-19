import images from '@/assets/images'
import { SphereBlur } from '@/modules/shared/components'
import { getTranslations } from '@/modules/shared/functions/server'
import type { Metadata } from 'next'
import Image from 'next/image'
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
    <section className="flex flex-1 h-screen py-10">
      <aside className="md:flex flex-1 hidden justify-end pr-10">teste</aside>
      <SignupForm />

      <Image
        alt={translate('image.alt')}
        title={`${translate('image.alt').slice(0, 30)}...`}
        src={images.illustrations.savings}
        className="scale-75 md:scale-100 transition-all absolute -z-10 md:left-10 md:translate-x-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:dark:opacity-80"
      />
      <SphereBlur position={'right-bottom'} color={'green'} />
    </section>
  )
}
