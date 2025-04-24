import { getCategories } from '@/actions/get-categories'
import { getGallery } from '@/actions/get-gallery'
import { getGlobal } from '@/actions/get-global'
import { Compass } from 'lucide-react'
import Banner from './ui/banner/banner'
import Categories from './ui/categories/categories'
import GallerySection from './ui/gallery-section/gallery-section'
import ContactSection from './ui/contact-section/contact-section'

export const revalidate = 3600 // 1 hour

export const metadata = async () => {
  const { data } = await getGlobal()
  return {
    title: {
      default: data.siteName,
      template: `%s | ${data.siteName}`
    },
    description: data.siteDescription,
    openGraph: {
      title: data.siteName,
      description: data.siteDescription,
      url: process.env.NEXT_PUBLIC_STRAPI_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${
            data.banner?.formats?.large?.url ?? data.banner?.formats?.medium?.url
          }`,
          width: 800,
          height: 600
        }
      ]
    }
  }
}

export default async function Home() {
  const { data } = await getGlobal()
  const imageUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://192.168.3.33:1337'
  const bannerUrl =
    data.banner?.formats?.large?.url ?? data.banner?.formats?.medium?.url
      ? `${imageUrl}${data.banner?.formats?.large?.url ?? data.banner?.formats?.medium?.url}`
      : '/default.jpg'
  const { data: categoriesData } = await getCategories()
  const { data: gallery } = await getGallery()

  return (
    <div className='overflow-hidden'>
      <Banner
        bannerUrl={bannerUrl}
        siteName={data.siteName ?? 'Travel Blog'}
        siteDescription={data.siteDescription ?? ''}
      />
      <div className='container px-4 md:px-6 mx-auto lg:max-w-6xl py-16'>
        <div className='flex items-center gap-3 mb-8'>
          <Compass className='w-8 h-8 text-primary' />
          <h2 className='text-2xl md:text-4xl font-bold'>Our Travel Categories</h2>
        </div>
        <p className='text-lg text-muted-foreground mb-8 max-w-3xl'>
          Discover our carefully curated travel experiences designed to create unforgettable
          memories. Select a category to begin your journey.
        </p>
        <Categories
          categoriesData={categoriesData}
          imageUrl={imageUrl}
        />
        <GallerySection
          gallery={gallery?.map(g => ({
            name: g.name,
            formats: g.image?.formats || null
          }))}
        />
        <ContactSection
          phoneNumber={data.phoneNumber}
          email={data.email}
          address={data.address}
        />
      </div>
    </div>
  )
}
