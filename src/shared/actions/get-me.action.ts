'use server'
import { TokenUtil } from '@/shared/utils'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'

export type GetMeActionProps = ActionsResponse<{ data: any | null }>

export async function getMeAction(): Promise<GetMeActionProps> {
  const { get } = await cookies()
  const authSession = get('auth.session')

  if (!authSession) {
    return {
      data: null,
      error: 'Sessão expirada.',
    }
  }

  const authenticated = TokenUtil.verify<any>(authSession.value)

  if (dayjs().isAfter(authenticated.exp)) {
    return {
      data: null,
      error: 'Sessão expirada.',
    }
  }

  return {
    data: authenticated,
  }
}
