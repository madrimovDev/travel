'use client'

import { Facebook, Instagram, Send as Telegram } from 'lucide-react'
import { WhatsAppIcon } from '@/app/ui/icons/whatsapp-icon'
import { cn } from '@/lib/utils'
import { SocialLinksProps } from './types'

export const SocialLinks = ({ facebook, instagram, whatsapp, telegram, className }: SocialLinksProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    {facebook && (
      <a
        href={facebook}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-all duration-200 hover:scale-110'>
        <div className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md transition-all duration-200'>
          <Facebook className='h-5 w-5' />
        </div>
      </a>
    )}
    {instagram && (
      <a
        href={instagram}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-transform hover:scale-110'>
        <div className='p-2 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-pink-600 hover:from-purple-200 hover:to-pink-200'>
          <Instagram className='h-5 w-5' />
        </div>
      </a>
    )}
    {whatsapp && (
      <a
        href={`${whatsapp}`}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-transform hover:scale-110'>
        <div className='p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200'>
          <WhatsAppIcon className='h-5 w-5' />
        </div>
      </a>
    )}
    {telegram && (
      <a
        href={telegram}
        target='_blank'
        rel='noopener noreferrer'
        className='transition-transform hover:scale-110'>
        <div className='p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200'>
          <Telegram className='h-5 w-5' />
        </div>
      </a>
    )}
  </div>
)