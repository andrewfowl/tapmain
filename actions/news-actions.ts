"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function getPublishedNews(limit?: number) {
  const supabase = createServerClient()

  try {
    let query = supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching news:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching news:", error)
    return { success: false, error: "Failed to fetch news" }
  }
}

export async function getFeaturedNews() {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3)

    if (error) {
      console.error("Error fetching featured news:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching featured news:", error)
    return { success: false, error: "Failed to fetch featured news" }
  }
}
