import { translationConfig } from '@/main/config'
import { cookies } from 'next/headers'

export async function initTranslation() {
  const { get } = await cookies()
  const locale = get('locale')?.value ?? ''

  const messages = translationConfig.getCurrentMessageFromLocale(locale)

  return { messages, locale }
}
