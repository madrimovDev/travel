import { getPosts } from '@/actions/get-posts'
import SingleLinePosts from './ui/single-line-posts'
import EmptyState from '@/components/empty-state'

interface PageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{ view?: 'single' | 'card' }>
}

export const revalidate = 3600 // 1 hour

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params
  const { page } = resolvedParams
  
  // Базовые значения по умолчанию
  const defaultTitle = 'All Posts'
  const defaultDescription = 'Explore our collection of travel posts, guides and adventures in Khiva, Uzbekistan. Discover historical places, tours, and top attractions.'
  const defaultImage = `/default.jpg`
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://travelkhiva.uz'
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const canonicalUrl = `${baseUrl}/${page || ''}`
  
  // Общие ключевые слова для сайта
  const baseKeywords = [
    'Khiva travel', 'Travel to Khiva', 'Khiva tours', 'Visit Khiva Uzbekistan',
    'Historical places in Khiva', 'Things to do in Khiva', 'Khiva travel guide',
    'Best places to visit in Khiva', 'Khiva tourist attractions', 'TravelKhiva.uz',
    'Uzbekistan cultural tours', 'Khiva walking tours', 'Khiva day trips',
    'UNESCO sites in Uzbekistan', 'Khiva old city', 'Khiva local guide'
  ].join(', ')
  
  // Транспортные ключевые слова
  const transportKeywords = [
    'Khiva transport services', 'Private car to Khiva', 'Khiva airport transfers',
    'Taxi from Urgench to Khiva', 'Khiva to Bukhara by car', 'Uzbekistan private drivers',
    'Rent a car in Khiva', 'Car with driver in Uzbekistan', 'Intercity transport Uzbekistan',
    'TravelKhiva.uz transport', 'Tourist transport in Khiva'
  ].join(', ')

  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: baseKeywords,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: baseUrl,
        type: 'website',
        locale: 'en_US',
        siteName: 'TravelKhiva.uz',
        images: [{ url: `${baseUrl}${defaultImage}`, width: 1200, height: 630, alt: defaultTitle }]
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
        images: [`${baseUrl}${defaultImage}`]
      },
      alternates: { canonical: baseUrl },
      robots: { index: true, follow: true },
      other: {
        'language': 'English',
        'revisit-after': '7 days'
      }
    }
  }

  const { data } = await getPosts(page, 1, 20)

  // Обработка изображений
  let imageUrl = defaultImage
  let fullImageUrl = `${baseUrl}${defaultImage}`
  
  if (data && data.length > 0 && data[0]?.banner?.url) {
    imageUrl = data[0].banner.url
    fullImageUrl = imageUrl.startsWith('http') 
      ? imageUrl 
      : `${strapiUrl}${imageUrl}`
  }

  if (!data || data.length === 0) {
    return {
      title: `${page.charAt(0).toUpperCase() + page.slice(1)}`,
      description: `Explore ${page} in Khiva, Uzbekistan. Find the best travel guides, tips and services.`,
      keywords: `${page}, ${baseKeywords}, ${transportKeywords}`,
      openGraph: {
        title: `${page.charAt(0).toUpperCase() + page.slice(1)} | TravelKhiva.uz`,
        description: `Explore ${page} in Khiva, Uzbekistan. Find the best travel guides, tips and services.`,
        url: canonicalUrl,
        type: 'website',
        locale: 'en_US',
        siteName: 'TravelKhiva.uz',
        images: [{ url: fullImageUrl, width: 1200, height: 630, alt: page }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${page.charAt(0).toUpperCase() + page.slice(1)} | TravelKhiva.uz`,
        description: `Explore ${page} in Khiva, Uzbekistan. Find the best travel guides, tips and services.`,
        images: [fullImageUrl]
      },
      alternates: { canonical: canonicalUrl },
      robots: { index: true, follow: true },
      other: {
        'language': 'English',
        'revisit-after': '7 days'
      },
      // JSON-LD разметка для лучшего понимания поисковыми системами
      verification: {
        'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || ''
      },
    }
  }

  // Данные категории из первого поста
  const categoryTitle = data[0]?.category?.title || `${page.charAt(0).toUpperCase() + page.slice(1)}`
  const categoryDescription = data[0]?.category?.description || 
    `Explore our collection of ${page} posts about Khiva, Uzbekistan. Find guides, tips, and recommendations.`
  
  const specificKeywords = data
    .slice(0, 5)
    .map(post => post.title)
    .filter(Boolean)
    .join(', ')
  
  const categoryKeywords = `${categoryTitle}, ${specificKeywords}, ${baseKeywords}`

  return {
    title: `${categoryTitle}`,
    description: categoryDescription,
    keywords: categoryKeywords,
    openGraph: {
      title: `${categoryTitle} | TravelKhiva.uz`,
      description: categoryDescription,
      url: canonicalUrl,
      type: 'website',
      locale: 'en_US',
      siteName: 'TravelKhiva.uz',
      images: [{ url: fullImageUrl, width: 1200, height: 630, alt: categoryTitle }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryTitle} | TravelKhiva.uz`,
      description: categoryDescription,
      images: [fullImageUrl],
      creator: '@travelblog'
    },
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true
    },
    other: {
      'language': 'English',
      'revisit-after': '7 days'
    }
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const { page } = resolvedParams

  const posts = await getPosts(page, 1, 20)
  const category = posts.data && posts.data[0]?.category

  if (!posts || !posts.data || posts.data.length === 0) {
    return <EmptyState />
  }

  return (
    <main className='min-h-screen py-8'>
      <div className='container max-w-6xl mx-auto px-4'>
        <h1>
          {category && category.title ? (
            <span className='text-2xl font-bold'>{category.title}</span>
          ) : (
            <span className='text-2xl font-bold'>All Posts</span>
          )}
        </h1>
        <p>{category?.description}</p>
      </div>

      <SingleLinePosts
        posts={posts}
        categorySlug={page}
      />
    </main>
  )
}
