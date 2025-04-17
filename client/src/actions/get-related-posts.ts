export async function getRelatedPosts(categoryId: string, excludeId: string, limit: number = 3) {
  try {
    const params = new URLSearchParams()
    params.append('populate', '*')
    params.append('pagination[limit]', limit.toString())
    params.append('filters[category][documentId][$eq]', categoryId)
    params.append('filters[documentId][$ne]', excludeId)

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: { revalidate: 60 }
      }
    )

    if (!result.ok) {
      throw new Error('Failed to fetch related posts')
    }
    const data = await result.json()
    return data.data
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}
