'use server'

import { randomUUID } from 'node:crypto'
import { TokenHelper } from '@/modules/shared/lib'
import { RoleUser, User } from '@/modules/user/entities'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'

export type SignUpActionResponse = ActionsResponse | void

export async function signupAction(): Promise<SignUpActionResponse> {
  const cookieStore = await cookies()
  try {
    const user = new User({
      firstName: 'Mateus',
      lastName: 'Azevedo',
      email: 'mateusazevedo@example.com',
      password: 'Xkipi34.',
      role: RoleUser.USER,
      birthDate: dayjs('1999-05-20').startOf('day').toDate(),
    })

    const expiresIn = dayjs().add(7, 'day').toDate()

    const createdToken = TokenHelper.create({
      id: randomUUID(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userRole: user.userRole,
      exp: expiresIn.getTime(),
    })

    cookieStore.set({
      name: 'auth.session',
      value: createdToken,
      domain: process.env.DOMAIN,
      path: '/',
      expires: expiresIn,
    })

    return
  } catch (e) {
    return {
      error: (e as Error).message,
    }
  }
}
