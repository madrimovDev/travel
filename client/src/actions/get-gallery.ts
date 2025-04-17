'use server'

import { Formats } from './get-global'

interface Gallery {
  id: number
  documentId: string
  name: string
  image: {
    formats: Formats
  }
}
export async function getGallery(): Promise<{
  data: Gallery[]
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } }
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/galleries?populate=*`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }
  const data = await res.json()
  return data
}
