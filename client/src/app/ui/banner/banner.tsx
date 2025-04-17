import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface BannerProps {
  bannerUrl: string
  siteName: string
  siteDescription: string
}

export default function Banner({ bannerUrl, siteName, siteDescription }: BannerProps) {
  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ height: `max(100vh - 8rem, 100svh - 8rem)` }}>
      <Image
        src={bannerUrl}
        alt={siteName || 'Banner image'}
        fill
        priority
        quality={90}
        sizes='100vw'
        className='object-cover object-center'
      />
      <div className='absolute inset-0 bg-black/40' />
      <div className='container mx-auto h-full flex flex-col justify-center items-center relative z-10'>
        <Card className='bg-white/10 backdrop-blur-md border-none shadow-xl max-w-2xl w-full mt-24'>
          <CardContent className='flex flex-col items-center gap-6 py-12 px-4 sm:px-8'>
            <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold text-white text-center break-words leading-tight'>
              {siteName}
            </h1>
            <p className='text-base sm:text-lg md:text-xl text-white/90 text-center break-words line-clamp-4'>
              {siteDescription}
            </p>
          </CardContent>
        </Card>
        <div className='absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center z-20'>
          <ArrowDown className='text-white opacity-80 w-7 h-7 animate-bounce' />
        </div>
      </div>
    </section>
  )
}
