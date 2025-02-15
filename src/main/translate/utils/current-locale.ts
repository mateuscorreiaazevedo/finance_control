import dayjs from 'dayjs'
import { cookies } from 'next/headers'

export async function currentLocale() {
  const cookieStore = await cookies()

  function get() {
    const locale = cookieStore.get('locale')?.value
    return locale ? atob(locale) : ''
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
