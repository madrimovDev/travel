'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

export default function NavigateTop() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [showButton, setShowButton] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div
        className={cn('fixed transition-all bottom-22 right-4 z-50', {
          'visible opacity-100': showButton,
          'invisible opacity-0': !showButton
        })}>
        <Button
          ref={buttonRef}
          onClick={handleTop}
          size='icon'
          className='rounded-full size-14 bg-primary p-3 shadow-lg hover:bg-primary/80 transition-all duration-300 ease-in-out'>
          <ArrowUp />
        </Button>
      </div>
    </>
  )
}
