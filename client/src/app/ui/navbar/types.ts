import { Category } from '@/actions/get-categories'

export interface NavbarProps {
  categories: Category[]
  phoneNumber: string
  telegram: string | null
  facebook: string | null
  instagram: string | null
  whatsapp: string | null
  email: string | null
}

export interface NavLinkHelperProps {
  isLinkActive: (slug: string) => boolean
}

export interface ContactInfoProps {
  phoneNumber: string
  email: string | null
  className?: string
}

export interface SocialLinksProps {
  facebook: string | null
  instagram: string | null
  whatsapp: string | null
  telegram: string | null
  className?: string
}