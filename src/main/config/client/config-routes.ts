export type SystemRoute = {
  path: string
  whenAuthenticated: 'next' | 'redirect'
}

export const publicRoutes: SystemRoute[] = [
  {
    path: '/signin',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/signup',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/',
    whenAuthenticated: 'next',
  },
]
