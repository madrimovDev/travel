import { MagicCard } from '@/components/magicui/magic-card'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Category } from '@/actions/get-categories'
import { Button } from '@/components/ui/button'

interface CategoriesProps {
  categoriesData: Category[]
  imageUrl: string
}

export default function Categories({ categoriesData, imageUrl }: CategoriesProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {categoriesData
        .sort((a, b) => (a.order ?? 1) - (b.order ?? 1))
        .map(category => {
          if (category.order === 0) {
            return null
          }
          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className='group'>
              <Card className='flex flex-col gap-4 p-0 h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20'>
                <MagicCard
                  className='p-5 h-full'
                  gradientColor='#D9D9D970'>
                  <div className='flex flex-col h-full w-full'>
                    <CardHeader className='p-0'>
                      <div className='overflow-hidden rounded-xl'>
                        {category.image && (
                          <Image
                            src={`${imageUrl}${category.image?.formats?.small?.url}`}
                            alt={category.name ?? ''}
                            width={500}
                            height={200}
                            className='rounded-md h-[220px] object-cover object-center transition-transform duration-300 group-hover:scale-110'
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className='px-0 mt-5 h-full space-y-3'>
                      <h3 className='text-xl font-bold text-foreground/90'>{category.name}</h3>
                      <p className='text-sm text-muted-foreground'>{category.description}</p>
                    </CardContent>
                    <CardFooter className='px-0 mt-4 w-full'>
                      <Button className='w-full cursor-pointer rounded-lg group-hover:bg-primary/90 transition-all'>
                        Explore <MapPin className='ml-2 h-4 w-4' />
                      </Button>
                    </CardFooter>
                  </div>
                </MagicCard>
              </Card>
            </Link>
          )
        })}
    </div>
  )
}
