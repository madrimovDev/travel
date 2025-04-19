'use server'

export interface PostResponse {
  data: Data | null
}

export interface Data {
  id: number | null
  documentId: string | null
  title: string | null
  description: string | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
  banner: Banner | null
  gallery: Gallery[] | null
  category: Category | null
  details: Detail[] | null
}

export interface Banner {
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

export interface Gallery {
  id: number | null
  documentId: string | null
  name: string | null
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Formats2 | null
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

export interface Formats2 {
  thumbnail: Thumbnail2 | null
  small: Small2 | null
  medium: Medium2 | null
  large?: Large2 | null
}

export interface Thumbnail2 {
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

export interface Small2 {
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

export interface Medium2 {
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

export interface Large2 {
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

export interface Category {
  id: number | null
  documentId: string | null
  title: string | null
  description: string | null
  name: string | null
  viewType: string | null
  createdAt: string | null
  updatedAt: string | null
  publishedAt: string | null
  slug: string | null
  order: number | null
}

export interface Detail {
  id: number | null
  type: string | null
  description: string | null
}

export async function getPost(documentId: string): Promise<PostResponse> {
  const params = new URLSearchParams()

  params.append('populate', '*')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts/${documentId}?${params}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error(`Error fetching post: ${response.statusText}`)
  }

  return response.json()
}
