'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, Mail } from 'lucide-react'
import { Category } from '@/actions/get-categories'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ContactInfo } from './contact-info'
import { SocialLinks } from './social-links'

interface MobileNavigationProps {
  categories: Category[]
  isLinkActive: (slug: string) => boolean
  phoneNumber: string
  email: string | null
  facebook: string | null
  instagram: string | null
  whatsapp: string | null
  telegram: string | null
}

export const MobileNavigation = ({
  categories,
  isLinkActive,
  phoneNumber,
  email,
  facebook,
  instagram,
  whatsapp,
  telegram
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex lg:hidden items-center gap-2'>
      {phoneNumber && (
        <a
          href={`tel:${phoneNumber}`}
          className='flex items-center justify-center p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200'>
          <Phone className='h-4 w-4' />
        </a>
      )}

      {email && (
        <a
          href={`mailto:${email}`}
          className='flex items-center justify-center p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200'>
          <Mail className='h-4 w-4' />
        </a>
      )}

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full hover:bg-accent/80 ml-2'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>
              Menu
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side='right'
          className='border-l border-accent/20 w-full bg-background/95 backdrop-blur-md'>
          <SheetHeader className='mb-6'>
            <SheetTitle className='sr-only'>
              Travel Khiva - Navigation Menu
            </SheetTitle>
            <Link
              href='/'
              className='font-bold text-xl tracking-tight hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}>
              Travel Khiva
            </Link>
          </SheetHeader>

          <div className='flex flex-wrap gap-2 px-2 mb-6'>
            <ContactInfo
              phoneNumber={phoneNumber}
              email={email}
              className='flex-wrap'
            />
          </div>

          <nav className='flex flex-col gap-1 mb-6'>
            {categories.map(link => (
              <SheetClose
                asChild
                key={link.slug}>
                <Link
                  href={{
                    pathname: `/${link.slug}`,
                    query: link.slug !== '/' ? { view: link.viewType } : {}
                  }}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-md text-base transition-all duration-200 relative',
                    'hover:bg-accent/70 hover:shadow-sm',
                    isLinkActive(link.slug ?? '')
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold shadow-md'
                      : 'hover:translate-x-1'
                  )}
                  onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className='px-4 py-4 border-t'>
            <p className='text-sm text-muted-foreground mb-3'>Contact us:</p>
            <SocialLinks
              facebook={facebook}
              instagram={instagram}
              whatsapp={whatsapp}
              telegram={telegram}
              className='flex-wrap'
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
