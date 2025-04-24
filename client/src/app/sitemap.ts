import { MetadataRoute } from "next"
import { getCategories } from "@/actions/get-categories"
import { getPosts } from "@/actions/get-posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com'
  
  // Get all categories
  const { data: categories } = await getCategories()
  
  // Home page
  const homePage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }
  
  // Category pages
  const categoryPages = categories?.map(category => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []
  
  // Post pages - we need to fetch posts for each category
  let postPages: MetadataRoute.Sitemap = []
  
  if (categories && categories.length > 0) {
    for (const category of categories) {
      if (category.slug) {
        // Get initial posts for this category
        const { data: initialPosts, meta } = await getPosts(category.slug, 1, 10)
        
        let categoryPosts = initialPosts || []
        const totalPages = meta?.pagination?.pageCount || 1
        
        // Fetch remaining pages for this category if needed
        if (totalPages > 1) {
          for (let page = 2; page <= totalPages; page++) {
            const { data: morePosts } = await getPosts(category.slug, page, 10)
            if (morePosts) {
              categoryPosts = [...categoryPosts, ...morePosts]
            }
          }
        }
        
        // Add posts from this category to the sitemap
        const categoryPostPages = categoryPosts.map(post => ({
          url: `${baseUrl}/post/${post.documentId}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
        
        postPages = [...postPages, ...categoryPostPages]
      }
    }
  }
  
  return [
    homePage,
    ...categoryPages,
    ...postPages,
  ]
}