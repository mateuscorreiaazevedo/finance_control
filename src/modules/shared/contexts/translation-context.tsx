'use client'

import { type PropsWithChildren, createContext, useContext, useMemo } from 'react'

type TranslationType = {
  messages: Record<string, any>
  locale: string
}

const TranslationContext = createContext<TranslationType | null>(null)

export function TranslationProvider(props: PropsWithChildren<TranslationType>) {
  const { locale, messages, children } = props

  const cacheMessages = useMemo(() => {
    if (!locale) {
      return null
    }

    return { locale, messages }
  }, [locale, messages])

  return (
    <TranslationContext.Provider value={cacheMessages}>{children}</TranslationContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(TranslationContext)

  if (!context) {
    throw new Error('useMessages must be used within a TranslationProvider')
  }

  return { ...context }
}
