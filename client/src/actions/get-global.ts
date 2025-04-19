'use server'

export interface Global {
  id: number | null
  documentId: string | null
  siteName: string | null
  siteDescription: string | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
  favicon: null | null
  defaultSeo: null | null
  phoneNumber: number | null
  address: string | null
  email: string | null
  facebook: string | null
  instagram: string | null
  telegram: string | null
  whatsapp: string | null
  banner: Banner | null
}

export interface Banner {
  id: number | null
  documentId: string | null
  name: string | null
  alternativeText: null | null
  caption: null | null
  width: number | null
  height: number | null
  formats: Formats | null
  hash: string | null
  ext: string | null
  mime: string | null
  size: number | null
  url: string | null
  previewUrl: null | null
  provider: string | null
  provider_metadata: null | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
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
