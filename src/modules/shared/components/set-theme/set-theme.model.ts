import { useTheme } from 'next-themes'
import { useTranslations } from '../../hooks'

export function useSetThemeModel() {
  const { setTheme, theme } = useTheme()
  const { translate } = useTranslations()

  const isLightTheme = theme === 'light'

  function toggleTheme() {
    setTheme(isLightTheme ? 'dark' : 'light')
  }

  const label = translate('common.theme', { theme })

  return {
    isLightTheme,
    toggleTheme,
    label,
  }
}
