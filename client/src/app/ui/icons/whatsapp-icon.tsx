import React from 'react'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const WhatsAppIcon = ({ 
  size = 20, 
  className, 
  ...props 
}: WhatsAppIconProps) => {
  return (
    <div className={cn(
      'flex items-center justify-center',
      className
    )}>
      <div className="flex items-center justify-center rounded-full bg-[#25D366] p-1">
        <Phone 
          size={size * 0.6} 
          color="white" 
          className="transform rotate-[30deg]" 
          {...props} 
        />
      </div>
    </div>
  )
}
