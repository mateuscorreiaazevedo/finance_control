import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import '../assets/styles/globals.scss'
import { ThemeProvider, TranslationProvider } from '@/shared/contexts'
import { getTranslations, initTranslation } from '@/shared/functions/server'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { translate } = await getTranslations()

  return {
    title: translate('common.hello'),
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const { locale, messages } = await initTranslation()

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased font-montserrat bg-background text-foreground`}
      >
        <ThemeProvider>
          <TranslationProvider locale={locale} messages={messages}>
            {children}
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
