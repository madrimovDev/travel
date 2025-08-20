import { Data } from '@/actions/get-post'

export default function PostJsonLd({ post, baseUrl }: { post: Data; baseUrl: string }) {
  const url = `${baseUrl}/post/${post.documentId}`
  const imageUrl = post.banner?.url
    ? (post.banner.url.startsWith('http') ? post.banner.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${post.banner.url}`)
    : `${baseUrl}/default.jpg`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    image: [imageUrl],
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Organization',
      name: 'travelkhiva.uz'
    },
    publisher: {
      '@type': 'Organization',
      name: 'travelkhiva.uz',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/android-chrome-192x192.png`
      }
    },
    description: post.description
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      post.category?.slug && post.category?.name
        ? {
            '@type': 'ListItem',
            position: 2,
            name: post.category.name,
            item: `${baseUrl}/${post.category.slug}`
          }
        : undefined,
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url
      }
    ].filter(Boolean)
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}


