import { createClient, createStaticClient } from "@/lib/supabase/server"

export interface Insight {
  id: string
  title: string
  hook: string
  slug: string
  image_url: string | null
  type: string
  content: string
  published: boolean
  created_at: string
  updated_at: string
  downloadUrl?: string
}

export async function getPublishedInsights(limit = 6): Promise<Insight[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching insights:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching insights:", error)
    return []
  }
}

export async function getFeaturedInsights(limit = 3): Promise<Insight[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured insights:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching featured insights:", error)
    return []
  }
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("insights").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
      console.error("Error fetching insight by slug:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching insight by slug:", error)
    return null
  }
}

export async function getAllInsightSlugs(): Promise<string[]> {
  const supabase = createStaticClient()

  const { data, error } = await supabase.from("insights").select("slug").eq("published", true)

  if (error) {
    console.error("Error fetching insight slugs:", error)
    return []
  }

  return data?.map((item) => item.slug) || []
}
