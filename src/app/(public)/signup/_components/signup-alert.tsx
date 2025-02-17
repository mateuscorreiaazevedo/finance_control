'use client'

import { useSaveEffect } from '@/shared/hooks'
import toast from 'react-hot-toast'

type Props = {
  error?: string
}
export function SignupAlert({ error }: Props) {
  useSaveEffect(() => {
    if (!!error) {
      toast.error(error)
    }
  }, [error])

  return null
}
