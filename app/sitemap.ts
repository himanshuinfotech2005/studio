import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure this env var is set in production, otherwise fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 1. Static Routes (Based on your app folder structure)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/films`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/photography`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // 2. Dynamic Routes (Fetch from your APIs)
  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    // Helper function to fetch data and map to sitemap format
    const fetchDynamicRoutes = async (endpoint: string, routePrefix: string) => {
      try {
        // Revalidate every hour
        const res = await fetch(`${baseUrl}/api/${endpoint}`, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        
        const data = await res.json()
        // Handle both array response or { items: [...] } response format
        const items = Array.isArray(data) ? data : (data.items || [])

        return items.map((item: any) => ({
          url: `${baseUrl}/${routePrefix}/${item.slug || item.id}`,
          lastModified: new Date(item.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      } catch (error) {
        console.error(`Failed to fetch ${endpoint} for sitemap:`, error)
        return []
      }
    }

    // Fetch all dynamic content in parallel
    const [blogRoutes, photographyRoutes, filmRoutes] = await Promise.all([
      fetchDynamicRoutes('blogs', 'blogs'),
      fetchDynamicRoutes('photography', 'photography'),
      fetchDynamicRoutes('films', 'films'),
    ])

    dynamicRoutes = [...blogRoutes, ...photographyRoutes, ...filmRoutes]

  } catch (error) {
    console.error('Error generating dynamic sitemap:', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}