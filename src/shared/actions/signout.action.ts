'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('auth.session')

  redirect('/signin')
}
