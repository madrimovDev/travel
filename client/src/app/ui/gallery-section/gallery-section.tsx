import { Formats } from '@/actions/get-global'
import Gallery from '../gallery/gallery'
import { Camera } from 'lucide-react'

interface GallerySectionProps {
  gallery: { name: string | null; formats: Formats | null }[]
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <div>
      <div className='mt-20 mb-8 flex items-center gap-3'>
        <Camera className='w-8 h-8 text-primary' />
        <h2 className='text-2xl md:text-4xl font-bold'>Our Travel Gallery</h2>
      </div>
      <p className='text-lg text-muted-foreground mb-8 max-w-3xl'>
      Explore our travel gallery and experience the beauty of Khiva through stunning photos. Get inspired for your next adventure!
      </p>
      <Gallery gallery={gallery} />
    </div>
  )
}
