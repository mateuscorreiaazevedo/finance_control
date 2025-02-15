'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from '../hooks/use-translations'
import { Button } from './ui'

export function SetTheme() {
  const { theme, setTheme } = useTheme()
  const { translate } = useTranslations()

  const isLight = theme === 'light'

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <Button onClick={toggleTheme}>
      {isLight ? <Sun /> : <Moon />} {translate('common.theme', { theme })}
    </Button>
  )
}
