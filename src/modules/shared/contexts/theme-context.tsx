'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type PropsWithChildren, useEffect, useState } from 'react'

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
    }
  }, [])

  if (!mounted) return null

  return (
    <NextThemesProvider
      attribute={'class'}
      defaultTheme={'system'}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
