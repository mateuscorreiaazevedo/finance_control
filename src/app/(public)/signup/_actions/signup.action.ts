'use server'

import { randomUUID } from 'node:crypto'
import { RoleUser, User } from '@domain/user'
import { TokenUtil } from '@shared/utils'
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

    const createdToken = TokenUtil.create({
      id: randomUUID(),
      fullName: user.fullName,
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
