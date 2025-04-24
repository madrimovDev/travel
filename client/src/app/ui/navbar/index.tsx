'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppProgressProvider } from '@bprogress/next'
import { NavbarProps } from './types'
import { ContactInfo } from './contact-info'
import { SocialLinks } from './social-links'
import { DesktopNavigation } from './desktop-navigation'
import { MobileNavigation } from './mobile-navigation'

export default function Navbar({
  categories,
  phoneNumber,
  telegram,
  facebook,
  instagram,
  whatsapp,
  email
}: NavbarProps) {
  const pathname = usePathname()

  // Улучшенная проверка активных ссылок
  const isLinkActive = (slug: string) => {
    if (slug === '/') return pathname === '/'
    return pathname.startsWith(`/${slug}`)
  }

  return (
    <header
      className='sticky top-0 z-40 w-full border-b border-white/20 bg-white/60 dark:bg-[#18181b]/60 backdrop-blur-lg transition-all shadow-xl'
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.75) 60%, rgba(59,130,246,0.10) 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        borderBottom: '1.5px solid rgba(255,255,255,0.18)'
      }}>
      <div className='container  px-4 md:px-6 mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link
            href='/'
            className='font-bold text-xl tracking-tight text-primary/90 hover:text-primary transition-colors'>
            Travel Khiva
          </Link>
        </div>

        <DesktopNavigation
          categories={categories}
          isLinkActive={isLinkActive}
        />

        <div className='hidden lg:flex items-center gap-3'>
          <ContactInfo
            phoneNumber={phoneNumber}
            email={email}
          />
          <div className='h-6 w-px mx-1 bg-muted'></div>
          <SocialLinks
            facebook={facebook}
            instagram={instagram}
            whatsapp={whatsapp}
            telegram={telegram}
          />
        </div>

        <MobileNavigation
          categories={categories}
          isLinkActive={isLinkActive}
          phoneNumber={phoneNumber}
          email={email}
          facebook={facebook}
          instagram={instagram}
          whatsapp={whatsapp}
          telegram={telegram}
        />
      </div>
      <AppProgressProvider
        shallowRouting
        color='#3b82f6'
        height='2px'
        options={{ showSpinner: false, trickle: true, trickleSpeed: 1000, minimum: 0.1 }}
      />
    </header>
  )
}