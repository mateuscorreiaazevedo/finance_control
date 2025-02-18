import { translationConfig } from '@/main/config'
import { cookies } from 'next/headers'

export async function getTranslations(prefix?: string) {
  const {
    getCurrentMessageFromLocale,
    getValueFromPathMessagesIsArray,
    getValueFromPathWithVariables,
  } = translationConfig
  const { get } = await cookies()

  const locale = get('locale')?.value ?? ''
  const messages = getCurrentMessageFromLocale(locale)

  function translate(path: string, values?: TranslationVariables) {
    const fullPath = prefix ? `${prefix}.${path}` : path

    return getValueFromPathWithVariables({
      path: fullPath,
      messages,
      variables: values,
    })
  }

  function translateArray<K = any>(path: string) {
    const fullPath = prefix ? `${prefix}.${path}` : path

    return getValueFromPathMessagesIsArray<K>(fullPath, messages)
  }

  return {
    translate,
    translateArray,
  }
}
