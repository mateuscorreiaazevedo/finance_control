import { translationConfig } from '@/main/config'
import { currentLocale } from '@/main/translate/utils/current-locale'

export async function initTranslation() {
  const { get } = await currentLocale()
  const locale = get()

  const messages = translationConfig.getCurrentMessageFromLocale(locale)

  return { messages, locale }
}
