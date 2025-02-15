import dayjs from 'dayjs'
import { cookies } from 'next/headers'

export async function currentLocale() {
  const cookieStore = await cookies()

  function get() {
    return cookieStore.get('locale')?.value ?? ''
  }

  function set(locale: string) {
    cookieStore.set({
      name: 'locale',
      value: locale,
      httpOnly: false,
      path: '/',
      expires: dayjs().add(1, 'year').toDate(),
    })
  }
  return { get, set }
}
