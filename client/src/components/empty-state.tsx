'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  message?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'There are no trips available for this category yet.'
}) => {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50 rounded-lg'>
      <FileText className='w-16 h-16 text-gray-400 mb-4' />
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>{message}</h2>
      <Button
        onClick={handleGoHome}
        className='text-white mt-4'>
        Go to Home Page
      </Button>
    </div>
  )
}

export default EmptyState
