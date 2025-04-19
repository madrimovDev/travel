export interface CarsResponse {
  id: number | null
  documentId: string | null
  type: string | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
  car: Car[] | null
}

export interface Car {
  id: number | null
  documentId: string | null
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
  path: string | null
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
  path: string | null
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
  path: string | null
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
  path: string | null
  width: number | null
  height: number | null
  size: number | null
  sizeInBytes: number | null
  url: string | null
}

export async function getCars(): Promise<{
  data: CarsResponse[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}> {
  const params = new URLSearchParams()

  params.append('populate', '*')
  params.append('pagination[page]', '1')
  params.append('pagination[pageSize]', '100')

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cars?${params.toString()}`, {
    cache: 'no-store'
  })
  console.log(res.ok)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  console.log(data)
  return data
}
