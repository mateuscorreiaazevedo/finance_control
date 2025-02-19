'use server'
import { TokenHelper } from '@/modules/shared/lib'
import type { CreateUserRequestDTO } from '@/modules/user/dtos'
import {} from '@/modules/user/entities'
import { createUserFactory } from '@/modules/user/factories'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'

export type SignUpActionResponse = ActionsResponse | void

export async function signupAction(data: CreateUserRequestDTO): Promise<SignUpActionResponse> {
  const cookieStore = await cookies()
  try {
    const createdUser = await createUserFactory(data)

    const expiresIn = dayjs().add(7, 'day').toDate()

    const createdToken = TokenHelper.create({
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      userRole: createdUser.userRole,
      exp: expiresIn.getTime(),
    })

    cookieStore.set({
      name: 'auth.session',
      value: createdToken,
      domain: process.env.DOMAIN,
      path: '/',
      httpOnly: true,
      expires: expiresIn,
    })

    return
  } catch (e) {
    return {
      error: (e as Error).message,
    }
  }
}
