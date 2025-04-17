import { Formats } from '@/actions/get-global'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

interface Props {
  gallery: {
    formats: Formats
    name: string
  }[]
}

export default function Gallery({ gallery }: Props) {
  if (!gallery || gallery.length === 0) {
    return <div className='text-center py-10'>Нет доступных изображений</div>
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {gallery.map((item, index) => {
          const imageUrl =
            item.formats.medium?.url ||
            item.formats.small?.url ||
            item.formats.thumbnail?.url ||
            item.formats.large?.url

          if (!imageUrl) return null

          return (
            <div
              key={index}
              className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-[2px]'>
              <ShineBorder borderWidth={2} shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
              <div className='aspect-square relative '>
                <Image
                  src={apiUrl + imageUrl}
                  alt={item.name || `Gallery image ${index + 1}`}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover rounded-md transition-all duration-300 group-hover:scale-105'
                  priority={index < 4} // Приоритетная загрузка для первых 4 изображений
                />
                <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <div className='absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <h3 className='font-medium text-sm truncate'>{item.name}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
