import { translationConfig } from '@/main/config'
import { useMessages } from '../contexts/translation-context'

export function useTranslations(prefix?: string) {
  const { messages } = useMessages()

  const { getValueFromPathWithVariables, getValueFromPathMessagesIsArray } = translationConfig

  function translate(path: string, values?: TranslationVariables): string {
    const fullPath = prefix ? `${prefix}.${path}` : path
    const translatedValue = getValueFromPathWithVariables({ path: fullPath, messages, variables: values })

    return translatedValue
  }

  function translateArray<K = any>(path: string): K[] | string {
    const fullPath = prefix ? `${prefix}.${path}` : path
    const translatedArray = getValueFromPathMessagesIsArray<K>(fullPath, messages)

    return translatedArray
  }

  return { translate, translateArray }
}
