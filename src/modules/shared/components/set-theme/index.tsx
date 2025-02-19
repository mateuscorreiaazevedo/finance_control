'use client'

import { Moon, Sun } from 'lucide-react'
import { useSetThemeModel } from './set-theme.model'
import { SetThemeView } from './set-theme.view'

export function SetTheme() {
  const model = useSetThemeModel()

  return <SetThemeView Icon={model.isLightTheme ? Sun : Moon} {...model} />
}
