'use client'

import Link from 'next/link'
import { Category } from '@/actions/get-categories'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface DesktopNavigationProps {
  categories: Category[]
  isLinkActive: (slug: string) => boolean
}

export const DesktopNavigation = ({ categories, isLinkActive }: DesktopNavigationProps) => {
  return (
    <NavigationMenu className='hidden md:flex'>
      <NavigationMenuList className='gap-1'>
        {categories.map(link => (
          <NavigationMenuItem key={link.slug}>
            <Link
              passHref
              legacyBehavior
              href={{
                pathname: `/${link.slug}`,
                query: link.slug !== '/' ? { view: link.viewType } : {}
              }}>
              <NavigationMenuLink
                className={cn(
                  'px-4 py-2 rounded-md transition-all duration-200 relative overflow-hidden group',
                  'hover:bg-accent/70 hover:text-accent-foreground hover:shadow-sm ',
                  isLinkActive(link.slug)
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white focus:text-white hover:text-white font-semibold shadow-md'
                    : 'hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary/50 after:transition-all after:duration-300 '
                )}>
                {link.name}
                {isLinkActive(link.slug) && (
                  <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70'></span>
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
