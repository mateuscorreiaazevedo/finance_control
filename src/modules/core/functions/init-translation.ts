import { translationHelper } from '@/main/translate'
import { currentLocale } from '@/main/translate/utils/current-locale'

export async function initTranslation() {
  const { get } = await currentLocale()
  const locale = get()

  const messages = translationHelper.getCurrentMessageFromLocale(locale)

  return { messages, locale }
}
