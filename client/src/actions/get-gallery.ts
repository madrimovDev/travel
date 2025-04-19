'use server'

import { Formats } from './get-global'

export interface IGallery {
  id: number | null
  documentId: string | null
  name: string | null
  image: {
    formats: Formats | null
  } | null
}
export async function getGallery(): Promise<{
  data: IGallery[]
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
