'use client'

import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import { Button } from '../ui'
import type { useSetThemeModel } from './set-theme.model'

type Props = ReturnType<typeof useSetThemeModel> & {
  Icon: ComponentType<LucideProps>
}

export function SetThemeView({ Icon, label, toggleTheme, isLightTheme }: Props) {
  return (
    <Button variant={'outline'} size={'lg'} onClick={toggleTheme} className="flex gap-2">
      <Icon className={`size-10 ${isLightTheme ? '' : 'fill-foreground'}`} /> {label}
    </Button>
  )
}
