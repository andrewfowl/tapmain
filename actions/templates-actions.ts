"use server"

import { createClient } from "@/lib/supabase/server"

export interface Template {
  id: string
  title: string
  description: string
  category: string
  slug: string
  content: any
  preview_image_url?: string
  file_type?: string
  file_size?: number
  published: boolean
  created_at: string
  updated_at: string
  downloadUrl?: string
}

export async function getTemplateDownloadUrl(slug: string, fileType: string): Promise<string> {
  const baseUrl = "https://github.com/andrewfowl/tap-resources/"

  // Map file types to folder names
  const folderMap: Record<string, string> = {
    pdf: "pdfs",
    xlsx: "spreadsheets",
    xls: "spreadsheets",
    xlsb: "spreadsheets",
  }

  const folder = folderMap[fileType.toLowerCase()] || "pdfs"
  const returnUrl = downloadUrl ||  `${baseUrl}${folder}/${slug}.${fileType}`
  return returnUrl
}

export async function getPublishedTemplates(): Promise<Template[]> {
  console.log("[v0] Starting getPublishedTemplates...")
  const supabase = createClient()

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  console.log("[v0] Templates query result:", { data: data?.length || 0, error })

  if (error) {
    console.error("Error fetching templates:", error)
    return []
  }

  return data || []
}

export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching templates by category:", error)
    return []
  }

  return data || []
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("templates").select("*").eq("slug", slug).eq("published", true).single()

  if (error) {
    console.error("Error fetching template by slug:", error)
    return null
  }

  return data
}

export async function getTemplateCategories(): Promise<string[]> {
  console.log("[v0] Starting getTemplateCategories...")
  const supabase = createClient()

  const { data, error } = await supabase
    .from("templates")
    .select("category")
    .eq("published", true)
    .not("category", "is", null)

  console.log("[v0] Categories query result:", { data: data?.length || 0, error })

  if (error) {
    console.error("Error fetching template categories:", error)
    return []
  }

  // Get unique categories
  const categories = [...new Set(data?.map((item) => item.category).filter(Boolean))]
  console.log("[v0] Unique categories:", categories)
  return categories
}
