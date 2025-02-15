import messages from '../../messages'

type Messages = typeof messages

type VariablesType = {
  path: string
  messages: Messages
  variables?: Record<string, string | number>
}

/**
 * Obtém o valor de um caminho específico em um objeto de mensagens.
 * @param path - O caminho para o valor desejado.
 * @param messages - O objeto de mensagens onde o valor será procurado.
 * @returns - O valor encontrado no caminho especificado.
 */
const getValueFromPath = (path: string, messages: any) => {
  return path?.split('.').reduce((acc, part) => acc && (acc as any)[part], messages)
}

function getValueFromPathMessages(path: string, messages: any): string {
  const result = getValueFromPath(path, messages)

  return result != null ? String(result) : path
}

export namespace translationHelper {
  /**
   * Retorna as mensagens atuais com base na localidade especificada.
   * @param locale - A localidade para a qual as mensagens devem ser retornadas.
   * @returns - As mensagens atuais para a localidade especificada.
   */
  export function getCurrentMessageFromLocale(locale: string) {
    return messages[locale]
  }

  /**
   * Retorna o valor de um caminho específico em um objeto de mensagens.
   * Se o valor for um array, retorna o array.
   * Caso contrário, retorna o próprio valor.
   * @param path - O caminho para o valor desejado.
   * @param messages - O objeto de mensagens onde o valor será procurado.
   * @returns - O valor encontrado no caminho especificado.
   */
  export function getValueFromPathMessagesIsArray<K = any>(path: string, messages: any): K[] | string {
    const result = getValueFromPath(path, messages)

    return Array.isArray(result) ? result : path
  }

  /**
   * Substitui variáveis em uma string de tradução com os valores fornecidos.
   * Se não houver variáveis, retorna a string de tradução original.
   * @param variables - Um objeto com as variáveis a serem substituídas.
   * @param path - O caminho para a string de tradução.
   * @param messages - O objeto de mensagens onde a string de tradução está localizada.
   * @returns - A string de tradução com as variáveis substituídas.
   */
  export function getValueFromPathWithVariables({ variables, path, messages }: VariablesType) {
    if (!variables) {
      return getValueFromPathMessages(path, messages)
    }
    const translateString = getValueFromPathMessages(path, messages)
    return translateString.replace(/\{(\w+)\}/g, (_, key) => String(variables[key]) || `{${key}}`)
  }
}
