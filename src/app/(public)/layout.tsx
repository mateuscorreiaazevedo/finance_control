import type { PropsWithChildren } from 'react'

export default function PublicLayout({ children }: PropsWithChildren) {
  return <main className="md:container px-2 relative">{children}</main>
}
