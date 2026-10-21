import type { MetadataRoute } from "next"
import { createStaticClient } from "@/lib/supabase/server"

const baseUrl = "https://techaccountingpro.com"

export const revalidate = 3600

async function getPublished(table: "insights" | "news") {
  const { data } = await createStaticClient().from(table).select("slug, updated_at").eq("published", true)
  return (data ?? []) as { slug: string; updated_at: string }[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, news] = await Promise.all([getPublished("insights"), getPublished("news")])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/checklist`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/templates`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  return [
    ...staticPages,
    ...insights.map((i) => ({
      url: `${baseUrl}/insights/${i.slug}`,
      lastModified: new Date(i.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...news.map((n) => ({
      url: `${baseUrl}/news/${n.slug}`,
      lastModified: new Date(n.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]
}
