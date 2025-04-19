'use server'

interface BaseEntity {
  id: number | null
  documentId: string | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
}

interface ImageFormat {
  name: string | null
  hash: string | null
  ext: string | null
  mime: string | null
  path: string | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

interface Formats {
  thumbnail: ImageFormat | null
  small: ImageFormat | null
  medium: ImageFormat | null
  large?: ImageFormat | null
}

interface BaseImage extends BaseEntity {
  name: string | null
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Formats | null
  hash: string | null
  ext: string | null
  mime: string | null
  size: number | null
  url: string | null
  previewUrl: string | null
  provider: string | null
  provider_metadata: string | null
}

export interface Response {
  data: Post[] | null
  meta: Meta | null
}

export interface Post extends BaseEntity {
  title: string | null
  description: string | null
  banner: Banner | null
  gallery: Gallery[] | null
  category: Category | null
  details: Detail[] | null
}

export type Banner = BaseImage | null

export interface Gallery extends BaseImage {
  formats: {
    thumbnail: ImageFormat | null
    small: ImageFormat | null
    medium: ImageFormat | null
    large?: ImageFormat | null
  } | null
}

export interface Category extends BaseEntity {
  title: string | null
  description: string | null
  name: string | null
  viewType: string | null
  slug: string | null
  order: number | null
}

export interface Detail {
  id: number | null
  type: string | null
  description: string | null
}

export interface Meta {
  pagination: Pagination | null
}

export interface Pagination {
  page: number | null
  pageSize: number | null
  pageCount: number | null
  total: number | null
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
