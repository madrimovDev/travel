import Contact from '../contact/contact'
import { Globe } from 'lucide-react'

interface ContactSectionProps {
  phoneNumber: string | number | null
  email: string | null
  address: string | null
}

export default function ContactSection({ phoneNumber, email, address }: ContactSectionProps) {
  return (
    <div>
      <div className='flex items-center gap-3 my-8'>
        <Globe className='w-8 h-8 text-primary' />
        <h2 className='text-2xl md:text-4xl font-bold'>Our Contact</h2>
      </div>
      <p className='text-lg text-muted-foreground mb-8 max-w-3xl'>
      Have questions or need assistance? Get in touch with us — we&apos;re here to help you plan your perfect Khiva experience!
      </p>
      {phoneNumber && email && address ? (
        <Contact
          phoneNumber={phoneNumber}
          email={email}
          address={address}
        />
      ) : (
        <p className='text-lg text-muted-foreground mb-8 max-w-3xl'>
          Contact information is not available.
        </p>
      )}
    </div>
  )
}
