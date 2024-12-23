'use client'

import Image from 'next/image'
import Link from 'next/link'

export const HeaderComponent = () => {
  return (
    <header className="container mx-auto py-4 px-2 bg-white">
      <Link href="/">
        <Image
          src="/creditas_logo.svg"
          alt="Creditas logomark"
          width={120}
          height={26}
        />
      </Link>
    </header>
  )
}
