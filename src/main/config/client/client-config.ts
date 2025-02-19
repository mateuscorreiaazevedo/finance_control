import { locales } from '@/main/translate'
import { TokenHelper } from '@/modules/shared/lib'
import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'
import { type SystemRoute, publicRoutes } from './config-routes'

export class ClientConfig {
  private REDIRECT_IF_NOT_AUTHENTICATED = '/signin'
  private REDIRECT_IF_AUTHENTICATED = '/dashboard'

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
        value: locales.includes(lang) ? lang : defaultLang,
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
        value: defaultLang,
        path: '/',
        httpOnly: false,
        domain: process.env.DOMAIN,
        expires: EXPIRES_LOCALE,
      })

      modified = true
    }

    if (modified) {
      const queries = searchParams.toString()
      const redirect = NextResponse.redirect(
        new URL(`${pathname}?${queries}`, this.request.url),
      )

      this.next.cookies.getAll().forEach(cookie => {
        redirect.cookies.set(cookie)
      })

      return redirect
    }
  }

  /**
   * Português: Configura a autenticação do usuário com base nas rotas públicas e privadas.
   * English: Configures user authentication based on public and private routes.
   *
   * @returns Português: Retorna uma resposta de redirecionamento se necessário ou undefined se a autenticação for válida.
   * @returns English: Returns a redirect response if necessary or undefined if the authentication is valid.
   */
  public configAuthentication(): NextResponse | void {
    const path = this.request.nextUrl.pathname
    const cookies = this.request.cookies

    const isPublicRoute = publicRoutes.find(route => route.path === path)
    const token = cookies.get('auth.session')?.value

    const whenUnauthenticated = this.verifyRoutesWhenNotAuthenticated(token, isPublicRoute)

    if (whenUnauthenticated) {
      return NextResponse.redirect(
        new URL(this.REDIRECT_IF_NOT_AUTHENTICATED, this.request.url),
      )
    }

    const userAuthenticated = token ? TokenHelper.decode<AuthSession>(token) : null

    const verifyAuthenticateRoutes = this.verifyRoutesWhenAuthenticated(
      userAuthenticated,
      isPublicRoute,
    )

    if (verifyAuthenticateRoutes instanceof NextResponse) {
      return verifyAuthenticateRoutes
    }
  }

  /**
   * Português: Verifica se o usuário está autenticado e se a rota é pública ou privada.
   * English: Checks if the user is authenticated and if the route is public or private.
   *
   * @param me - Português: O usuário autenticado ou null se não estiver autenticado.
   * @param me - English: The authenticated user or null if not authenticated.
   * @param isPublicRoute - Português: A rota pública ou undefined se não for uma rota pública.
   * @param isPublicRoute - English: The public route or undefined if not a public route.
   * @returns Português: Retorna uma resposta de redirecionamento se necessário ou undefined se a autenticação for válida.
   * @returns English: Returns a redirect response if necessary or undefined if the authentication is valid.
   */
  private verifyRoutesWhenAuthenticated(
    me: AuthSession | null,
    isPublicRoute?: SystemRoute,
  ): NextResponse | void {
    if (me && isPublicRoute && isPublicRoute.whenAuthenticated === 'redirect') {
      return NextResponse.redirect(new URL(this.REDIRECT_IF_AUTHENTICATED, this.request.url))
    }

    if (me && !isPublicRoute) {
      const validateTokenIsExpired = this.validateTokenIsExpired(me)
      if (validateTokenIsExpired instanceof NextResponse) {
        return validateTokenIsExpired
      }

      return this.next
    }
  }

  /**
   * Português: Verifica se o usuário está autenticado e se a rota é pública ou privada.
   * English: Checks if the user is authenticated and if the route is public or private.
   *
   * @param token - Português: O token de autenticação ou undefined se não estiver autenticado.
   * @param token - English: The authentication token or undefined if not authenticated.
   * @param isPublicRoute - Português: A rota pública ou undefined se não for uma rota pública.
   * @param isPublicRoute - English: The public route or undefined if not a public route.
   * @returns Português: Retorna true se o usuário não está autenticado e a rota não é pública, ou false caso contrário.
   * @returns English: Returns true if the user is not authenticated and the route is not public, or false otherwise.
   */
  private verifyRoutesWhenNotAuthenticated(
    token?: string,
    isPublicRoute?: SystemRoute,
  ): boolean {
    if (!token && isPublicRoute) {
      return false
    }

    if (!token && !isPublicRoute) {
      return true
    }

    return false
  }

  /**
   * Português: Verifica se o token do usuário autenticado está expirado.
   * English: Checks if the authenticated user's token is expired.
   *
   * @param userAuthenticated - Português: O usuário autenticado.
   * @param userAuthenticated - English: The authenticated user.
   * @returns Português: Retorna uma resposta de redirecionamento se o token está expirado ou undefined se não está.
   * @returns English: Returns a redirect response if the token is expired or undefined if not.
   */
  private validateTokenIsExpired(userAuthenticated: AuthSession): NextResponse | void {
    if (dayjs().isAfter(userAuthenticated.exp)) {
      return NextResponse.redirect(
        // TODO: Redirecionar para uma implementação de refresh
        new URL(this.REDIRECT_IF_NOT_AUTHENTICATED, this.request.url),
      )
    }
  }
}
