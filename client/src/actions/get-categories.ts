'use server'

export interface Category {
  id: string | number
  title: string
  name: string
  description: string
  slug: string
  viewType: string
  order: number
  image: {
    formats: Formats
  }
}

export interface Formats {
  thumbnail: Thumbnail
  small: Small
  medium: Medium
  large: Large
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
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
