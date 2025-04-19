'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CarsResponse, getCars } from '@/actions/get-cars'
import { Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CarsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [carsData, setCarsData] = useState<CarsResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCars().then(({ data }) => {
      setCarsData(data)
      setLoading(false)
    })
  }, [])

  const carsByType = carsData.reduce((acc, item) => {
    const typeKey = item.type ?? 'unknown'
    if (!acc[typeKey]) acc[typeKey] = []
    acc[typeKey].push(...(item.car as []))
    return acc
  }, {} as Record<string, (typeof carsData)[0]['car']>)
  const carTypes = Object.keys(carsByType)
  const defaultType = carTypes.length > 0 ? carTypes[0] : 'all'

  const typeParam = searchParams.get('type') ?? undefined
  const [currentType, setCurrentType] = useState(
    typeParam && carTypes.includes(typeParam) ? typeParam : defaultType
  )

  useEffect(() => {
    if (typeParam && carTypes.includes(typeParam)) setCurrentType(typeParam)
    else setCurrentType(defaultType)
  }, [typeParam, carTypes, defaultType])

  const handleTabChange = (type: string) => {
    setCurrentType(type)
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('type', type)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-2'>Loading Cars...</span>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-10 px-4'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold mb-2'>Our Cars</h1>
      </div>
      <Tabs
        value={currentType}
        onValueChange={handleTabChange}
        className='w-full'>
        <TabsList className='mb-8 h-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
          {carTypes.map(type => (
            <TabsTrigger
              key={type}
              value={type}
              className='capitalize px-4 py-2 text-sm sm:text-base'>
              {type}
              <Badge
                variant='secondary'
                className='ml-2'>
                {carsByType[type]?.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        {carTypes.map(type => (
          <TabsContent
            key={type}
            value={type}
            className='mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-6 w-full'>
              {carsByType[type]?.map(car => {
                const imageUrl =
                  process.env.NEXT_PUBLIC_STRAPI_URL && car.formats?.large?.url
                    ? process.env.NEXT_PUBLIC_STRAPI_URL + car.formats.large.url
                    : undefined
                const altText = car.alternativeText || car.name || 'Car Image'
                return (
                  <Card
                    key={`${type}-${car.id}`}
                    className='overflow-hidden transition-all hover:shadow-lg p-0 rounded-lg bg-white'>
                    <div className='aspect-square relative overflow-hidden'>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={altText}
                          fill
                          className='object-cover'
                          sizes='100vw'
                          loading='lazy'
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className='flex items-center justify-center w-full h-full bg-gray-100 text-gray-400'>
                          No image
                        </div>
                      )}
                      <Badge className='absolute top-2 right-2 capitalize text-xs sm:text-sm'>
                        {type ? type : 'No type'}
                      </Badge>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
