'use client'
import images from '@/assets/images'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gradient-to-t to-zinc-900 from-blue-900">
      <main className="md:container px-2 relative z-10">{children}</main>
      <Image
        alt="wave-down"
        src={images.illustrations.waves.down}
        loading="lazy"
        className="fixed bottom-0 left-0 w-full md:scale-100 scale-[8] transition-all"
      />
      <Image
        alt="wave-up"
        src={images.illustrations.waves.up}
        loading="lazy"
        className="fixed top-0 left-0 w-full md:scale-100 scale-[8] transition-all"
      />
    </div>
  )
}
