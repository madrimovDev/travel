'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Facebook, Instagram, PhoneCall, Send as Telegram } from 'lucide-react'
import { WhatsAppIcon } from '@/app/ui/icons/whatsapp-icon'
import { cn } from '@/lib/utils'

export interface SocialLink {
  name: string
  icon: React.ReactNode
  href: string | null
  color: string
}

export interface FloatButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  socialLinks?: SocialLink[]
}

const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    icon: <Facebook size={20} />,
    href: 'https://facebook.com',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    icon: <Instagram size={20} />,
    href: 'https://instagram.com',
    color: '#E4405F'
  },
  {
    name: 'Telegram',
    icon: <Telegram size={20} />,
    href: 'https://telegram.org',
    color: '#26A5E4'
  },
  {
    name: 'Whatsapp',
    icon: <WhatsAppIcon size={24} />,
    href: 'https://wa.me/1234567890', // Лучший формат для WhatsApp ссылки
    color: '#25D366'
  },
  {
    name: 'Call',
    icon: <PhoneCall size={20} />,
    href: 'tel:+1234567890',
    color: '#34b7f1'
  }
]

const positionStyles = {
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'top-right': 'fixed top-4 right-4',
  'top-left': 'fixed top-4 left-4'
}

const socialListStyles = {
  'bottom-right': 'absolute bottom-18 right-0 flex flex-col-reverse items-end gap-3',
  'bottom-left': 'absolute bottom-20 left-0 flex flex-col-reverse items-start gap-3',
  'top-right': 'absolute top-20 right-0 flex flex-col items-end gap-3',
  'top-left': 'absolute top-20 left-0 flex flex-col items-start gap-3'
}

export default function FloatButton({
  position = 'bottom-right',
  socialLinks = defaultSocialLinks
}: FloatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => setIsOpen(!isOpen)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={positionStyles[position]}
      style={{ zIndex: 50 }}>
      {/* Social links container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={socialListStyles[position]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {socialLinks.map((link, index) => {
              if (!link.href) return null // Skip if href is null
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  }}>
                  <a
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.name}>
                    <Button
                      variant='outline'
                      className={cn(
                        'rounded-full hover:scale-105 transition-transform',
                        'sm:text-sm text-base font-medium',
                        'flex items-center gap-2 px-3 py-2 h-auto w-full',
                        ' w-42 justify-between', // Унифицированная ширина
                        position.includes('right') ? 'flex-row-reverse' : 'flex-row'
                      )}
                      style={{
                        backgroundColor: link.color,
                        color: 'white',
                        border: 'none'
                      }}>
                      <span
                        className={cn(
                          'flex items-center justify-center',
                          'sm:h-8 sm:w-8 h-10 w-10',
                          link.name === 'Whatsapp' ? '' : 'rounded-full'
                        )}>
                        {link.icon}
                      </span>
                      <span
                        className={cn(
                          'whitespace-nowrap flex-1 text-center',
                          position.includes('right') ? 'text-right' : 'text-left'
                        )}>
                        {link.name}
                      </span>
                    </Button>
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button - with ripple effect */}
      <div className="relative">
        {/* Ripple animation effect - упрощенная и исправленная версия */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.5],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
              style={{
                backgroundColor: '#3b82f6',
                zIndex: -1
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.5],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.75
              }}
              style={{
                backgroundColor: '#3b82f6',
                zIndex: -1
              }}
            />
          </>
        )}
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Button
            size='icon'
            onClick={toggleOpen}
            className='sm:h-14 sm:w-14 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all relative z-10'
            style={{
              backgroundColor: isOpen ? '#f43f5e' : '#3b82f6',
              color: 'white'
            }}>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}>
              {isOpen ? <X size={isOpen ? 28 : 24} /> : <PhoneCall size={isOpen ? 28 : 24} />}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
