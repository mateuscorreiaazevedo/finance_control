import { ClientConfig } from '@main/config'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const clientConfig = new ClientConfig(req)

  const localeConfig = clientConfig.configLocale()
  if (localeConfig instanceof NextResponse) {
    return localeConfig
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
