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
  if (!page) {
    return {
      title: 'All Posts',
      description: 'Explore our collection of travel posts and adventures'
    }
  }

  const { data } = await getPosts(page, 1, 20)

  // Базовые значения по умолчанию
  const defaultTitle = 'All Posts'
  const defaultDescription = 'Explore our collection of travel posts and adventures'
  const defaultImage = `/default.jpg`

  let imageUrl = defaultImage
  if (data && data.length > 0) {
    // Берём баннер поста, если есть, иначе баннер категории, иначе дефолт
    imageUrl = data[0]?.banner?.url
      ? data[0].banner.url.startsWith('http')
        ? data[0].banner.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].banner.url}`
      : defaultImage
  }

  if (!data || data.length === 0) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: 'travel, blog, posts, adventures',
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${page}`,
        type: 'website',
        locale: 'en_US',
        siteName: 'Travel Blog',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: defaultTitle
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
        images: [imageUrl]
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${page}`
      },
      robots: {
        index: true,
        follow: true
      }
    }
  }

  const title = data[0]?.category?.title || defaultTitle
  const description = data[0]?.category?.description || defaultDescription
  const categoryKeywords = 'travel, blog, adventures'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${page}`

  return {
    title,
    description,
    keywords: categoryKeywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'en_US',
      siteName: 'Travel Blog',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@travelblog'
    },
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true
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
