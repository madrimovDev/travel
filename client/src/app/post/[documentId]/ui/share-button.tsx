'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Share2, Check } from 'lucide-react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Fallback copy to clipboard function for older browsers
  const fallbackCopyToClipboard = (text: string): boolean => {
    const textArea = textAreaRef.current
    if (!textArea) return false

    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      return successful
    } catch (err) {
      console.error('Fallback copy method failed:', err)
      return false
    } finally {
      textArea.style.top = '-9999px'
      textArea.style.left = '-9999px'
      textArea.blur()
    }
  }

  const handleShare = async () => {
    const fullUrl = window.location.toString()

    // Checking Web Share API availability (mobile devices)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post!',
          url: fullUrl
        })
        return
      } catch (error) {
        // User might have cancelled the operation
        const errorObj = error as Error
        if (errorObj && errorObj.name !== 'AbortError') {
          console.error('Error when trying to share:', error)
        }
      }
    }

    // Clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        toast('Link copied!', {
          duration: 2000,
          description: 'Post link copied to clipboard.'
        })
        setTimeout(() => setCopied(false), 2000)
        return
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        // Proceeding to fallback option
      }
    }

    // Fallback copy method for older browsers
    const successful = fallbackCopyToClipboard(fullUrl)
    if (successful) {
      setCopied(true)
      toast('Link copied!', {
        duration: 2000,
        description: 'Post link copied to clipboard.'
      })
      setTimeout(() => setCopied(false), 2000)
    } else {
      toast.error('Failed to copy link. Please copy manually.')
    }
  }

  return (
    <>
      <div className='ml-auto flex gap-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='ghost'
                onClick={handleShare}
                className='rounded-full h-8 w-8'>
                {copied ? <Check size={16} /> : <Share2 size={16} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Hidden text field for fallback copy method */}
      <textarea
        ref={textAreaRef}
        style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}
        aria-hidden="true"
      />
    </>
  )
}
