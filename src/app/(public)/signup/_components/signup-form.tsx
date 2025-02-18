'use client'

import { AlertSuccess, Button } from '@/modules/shared/components'
import { useToast, useTranslations } from '@/modules/shared/hooks'
import type { CreateUserRequestDTO } from '@/modules/user/dtos'
import { useState } from 'react'
import type { SignUpActionResponse } from '../_functions/signup.action'

type Props = {
  onSignup: (data: CreateUserRequestDTO) => Promise<SignUpActionResponse>
  onSignout: () => Promise<void>
}
export function SignupForm({ onSignup, onSignout }: Props) {
  const [error, setError] = useState<string | undefined>()

  const { translate } = useTranslations()
  const { setNotification } = useToast()

  const handleSignUp = async () => {
    const response = await onSignup({
      firstName: 'Mateus',
      lastName: 'st',
      email: 'test@example',
      password: 'test123',
      confirmPassword: 'test123',
      birthDate: new Date('1990-01-01'),
    })

    if (response?.error) {
      setError(response.error)
      return
    }

    setNotification({
      component: AlertSuccess,
      props: {
        id: 'signupSuccess',
        title: 'Bem-vindo!',
        isDismissed: true,
        withIcon: true,
      },
    })

    setError(undefined)
  }
  return (
    <div className="flex  flex-col gap-4 items-center justify-center">
      <Button
        variant={error ? 'destructive' : 'default'}
        onClick={handleSignUp}
        className={error ? 'text-destructive-foreground' : ''}
      >
        Crie seu token {error && `Erro: ${translate(error)}`}
      </Button>
      <Button variant={'destructive'} onClick={onSignout}>
        Sair
      </Button>
    </div>
  )
}
