import { locales } from '@main/translate'
import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'

export class ClientConfig {
  private next: NextResponse
  constructor(private readonly request: NextRequest) {
    this.next = NextResponse.next()
  }

  /**
   * Configura o locale do usuário com base nos parâmetros de busca ou nos cookies.
   * Se o parâmetro 'lang' for encontrado na URL, define o locale nos cookies.
   * Se não houver parâmetro 'lang' e o locale não estiver definido nos cookies, define o locale como 'pt-BR'.
   * Redireciona o usuário para a mesma URL sem o parâmetro 'lang' se houver modificações.
   *
   * @returns {NextResponse} A resposta HTTP com as configurações de locale.
   */
  public configLocale(): NextResponse | void {
    const { search, pathname } = this.request.nextUrl
    const defaultLang = this.request.headers.get('accept-language')?.split(',')[0] ?? 'en'

    const searchParams = new URLSearchParams(search)
    const lang = searchParams.get('lang')
    const locale = this.request.cookies.get('locale')
    let modified = false

    const EXPIRES_LOCALE = dayjs().add(1, 'year').toDate()

    if (lang) {
      this.next.cookies.set({
        name: 'locale',
        value: locales.includes(lang) ? btoa(lang) : btoa(defaultLang),
        path: '/',
        httpOnly: false,
        domain: process.env.DOMAIN,
        expires: EXPIRES_LOCALE,
      })

      searchParams.delete('lang')
      modified = true
    }

    if (!lang && !locale) {
      this.next.cookies.set({
        name: 'locale',
        value: btoa(defaultLang),
        path: '/',
        httpOnly: false,
        domain: process.env.DOMAIN,
        expires: EXPIRES_LOCALE,
      })

      modified = true
    }

    if (modified) {
      const redirect = NextResponse.redirect(new URL(pathname, this.request.url))

      this.next.cookies.getAll().forEach(cookie => {
        redirect.cookies.set(cookie)
      })

      return redirect
    }
  }
}
