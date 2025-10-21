import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export interface UpdateItem {
  id: string
  title: string
  excerpt?: string
  hook?: string
  slug: string
  image_url?: string
  created_at: string
  type: "news" | "insight"
}

export async function getLatestUpdates(limit = 3): Promise<UpdateItem[]> {
  const cookieStore = cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  // Fetch news items
  const { data: newsData } = await supabase
    .from("news")
    .select("id, title, excerpt, slug, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  // Fetch insights items
  const { data: insightsData } = await supabase
    .from("insights")
    .select("id, title, hook, slug, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  // Combine and format the data
  const combinedUpdates: UpdateItem[] = []

  if (newsData) {
    newsData.forEach((item) => {
      combinedUpdates.push({
        ...item,
        excerpt: item.excerpt,
        type: "news",
      })
    })
  }

  if (insightsData) {
    insightsData.forEach((item) => {
      combinedUpdates.push({
        ...item,
        excerpt: item.hook,
        type: "insight",
      })
    })
  }

  // Sort by created_at and return top items
  return combinedUpdates
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}
