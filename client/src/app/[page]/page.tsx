import { getPosts } from '@/actions/get-posts'
import SingleLinePosts from './ui/single-line-posts'
import EmptyState from '@/components/empty-state'

interface PageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{ view?: 'sinle' | 'card' }>
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params
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

  if (!data || data.length === 0) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: 'travel, blog, posts, adventures',
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/${page}`,
        type: 'website',
        locale: 'en_US',
        siteName: 'Travel Blog',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/default-og.jpg`,
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
        images: [`${process.env.NEXT_PUBLIC_STRAPI_URL}/default-og.jpg`]
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_STRAPI_URL}/${page}`
      },
      robots: {
        index: true,
        follow: true
      }
    }
  }

  const title = data[0]?.category.title || defaultTitle
  const description = data[0]?.category.description || defaultDescription
  const categoryKeywords = 'travel, blog, adventures'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${page}`

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
      siteName: 'Travel Blog'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

export default async function Page({ params, searchParams }: PageProps) {
  const { page } = await params
  const { view } = await searchParams

  const posts = await getPosts(page, 1, 20)
  const category = posts.data[0]?.category

  if (!posts || posts.data.length === 0) {
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
        <p>{category.description}</p>
      </div>

      {view === 'sinle' ? (
        <SingleLinePosts
          posts={posts}
          categorySlug={page}
        />
      ) : (
        <SingleLinePosts
          posts={posts}
          categorySlug={page}
        />
      )}
    </main>
  )
}
