'use server'

export interface Global {
  id: number
  documentId: string
  siteName: string
  siteDescription: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  favicon: null
  defaultSeo: null
  phoneNumber: number
  address: string
  email: string
  facebook: string | null
  instagram: string | null
  telegram: string | null
  whatsapp: string | null
  banner: Banner
}

export interface Banner {
  id: number
  documentId: string
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
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

export async function getGlobal(): Promise<{
  data: Global
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global?populate=*`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch global data')
  }

  const data = await res.json()

  return data
}
