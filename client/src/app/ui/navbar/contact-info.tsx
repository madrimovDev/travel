'use client'

import { Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ContactInfoProps } from './types'

export const ContactInfo = ({ phoneNumber, email, className }: ContactInfoProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    {phoneNumber && (
      <a
        href={`tel:${phoneNumber}`}
        className='flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'>
        <Phone className='h-4 w-4 text-blue-500' />
        <span className='font-medium text-sm'>{phoneNumber}</span>
      </a>
    )}
    {email && (
      <a
        href={`mailto:${email}`}
        className='hidden md:flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:shadow-sm'>
        <Mail className='h-4 w-4 text-red-500' />
        <span className='font-medium text-sm'>{email}</span>
      </a>
    )}
  </div>
)