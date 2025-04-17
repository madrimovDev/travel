'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <>
      <div className='mb-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => router.back()}
          className='flex items-center gap-1 w-full'>
          <ChevronLeft size={16} />
          Back
        </Button>
      </div>
    </>
  )
}
