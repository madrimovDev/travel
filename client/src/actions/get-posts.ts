'use server'

interface BaseEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

interface Formats {
  thumbnail: ImageFormat
  small: ImageFormat
  medium: ImageFormat
  large?: ImageFormat
}

interface BaseImage extends BaseEntity {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
}

export interface Response {
  data: Post[]
  meta: Meta
}

export interface Post extends BaseEntity {
  title: string
  description: string
  banner: Banner
  gallery: Gallery[]
  category: Category
  details: Detail[]
}

export type Banner = BaseImage

export interface Gallery extends BaseImage {
  formats: {
    thumbnail: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    large?: ImageFormat
  }
}

export interface Category extends BaseEntity {
  title: string
  description: string | null
  name: string
  viewType: string
  slug: string
  order: number
}

export interface Detail {
  id: number
  type: string
  description: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export async function getPosts(
  categorySlug?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Response> {
  const params = new URLSearchParams()

  params.append('pagination[page]', page.toString())
  params.append('pagination[pageSize]', pageSize.toString())

  params.append('populate', '*')

  if (categorySlug) {
    params.append('filters[category][slug][$eq]', categorySlug)
  }

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?${params.toString()}`

  const res = await fetch(url, {
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return data
}
