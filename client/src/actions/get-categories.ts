'use server'

export interface Category {
  id: string | number | null
  title: string | null
  name: string | null
  description: string | null
  slug: string | null
  viewType: string | null
  order: number | null
  image: {
    formats: Formats | null
  } | null
}

export interface Formats {
  thumbnail: Thumbnail | null
  small: Small | null
  medium: Medium | null
  large: Large | null
}

export interface Thumbnail {
  name: string | null
  hash: string | null
  ext: string | null
  mime: string | null
  path: null | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

export interface Small {
  name: string | null
  hash: string | null
  ext: string | null
  mime: string | null
  path: null | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

export interface Medium {
  name: string | null
  hash: string | null
  ext: string | null
  mime: string | null
  path: null | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

export interface Large {
  name: string | null
  hash: string | null
  ext: string | null
  mime: string | null
  path: null | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

export async function getCategories(): Promise<{
  data: Category[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?populate=*`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  return res.json()
}
