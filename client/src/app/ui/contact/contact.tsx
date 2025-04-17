import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

interface Props {
  phoneNumber: string | number
  email: string
  address: string
}

export default function Contact({ address, email, phoneNumber }: Props) {
  return (
    <div className='p-4 md:p-8 bg-black/5 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4'>
      <Link
        href={`mailto:${email}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Send email to ${email}`}
        className='flex flex-col gap-2 items-center p-5 rounded-md transition-all duration-300 hover:bg-black/10 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500'>
        <Mail className='size-8 md:size-12 text-blue-600 mb-2' />
        <p className='text-base md:text-lg text-center break-words w-full hover:text-blue-600'>{email}</p>
      </Link>
      
      <Link
        href={`https://maps.google.com?q=${encodeURIComponent(address)}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`View location at ${address} on Google Maps`}
        className='flex flex-col gap-2 items-center p-5 rounded-md transition-all duration-300 hover:bg-black/10 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500'>
        <MapPin className='size-8 md:size-12 text-blue-600 mb-2' />
        <p className='text-base md:text-lg text-center break-words w-full hover:text-blue-600'>{address}</p>
      </Link>

      <Link
        href={`tel:${phoneNumber}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Call phone number ${phoneNumber}`}
        className='flex flex-col gap-2 items-center p-5 rounded-md transition-all duration-300 hover:bg-black/10 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500'>
        <Phone className='size-8 md:size-12 text-blue-600 mb-2' />
        <p className='text-base md:text-lg text-center break-words w-full hover:text-blue-600'>{phoneNumber}</p>
      </Link>
    </div>
  )
}
