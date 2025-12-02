"use server"

import { createClient } from "@/lib/supabase/server"

export interface Resource {
  id: string
  title: string
  slug: string
  description: string
  category?: string
  type: "template" | "policy" | "framework"
  content?: any
  preview_image_url?: string
  file_type?: string
  file_size?: number
  downloadUrl?: string
  published: boolean
  created_at: string
  updated_at: string
  created_by?: string
}

export async function getPublishedResources(): Promise<Resource[]> {
  console.log("[v0] Fetching published resources from database")

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching resources:", error)
      if (
        error.message.includes("does not exist") ||
        error.message.includes("schema cache") ||
        error.code === "42P01"
      ) {
        console.log("[v0] Resources table not found, returning fallback data")
        return getFallbackResources()
      }
      return getFallbackResources()
    }

    console.log("[v0] Found resources:", data?.length || 0)
    return data || getFallbackResources()
  } catch (error) {
    console.error("[v0] Unexpected error fetching resources:", error)
    return getFallbackResources()
  }
}

export async function getResourcesByType(type: "template" | "policy" | "framework"): Promise<Resource[]> {
  console.log("[v0] Fetching resources by type:", type)

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .eq("type", type)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching resources by type:", error)
      return getFallbackResources().filter((r) => r.type === type)
    }

    return data || []
  } catch (error) {
    console.error("[v0] Unexpected error fetching resources by type:", error)
    return getFallbackResources().filter((r) => r.type === type)
  }
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  console.log("[v0] Fetching resource by slug:", slug)

  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("resources").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
      console.error("[v0] Error fetching resource:", error)
      const fallbackResources = getFallbackResources()
      return fallbackResources.find((r) => r.slug === slug) || null
    }

    return data
  } catch (error) {
    console.error("[v0] Unexpected error fetching resource:", error)
    const fallbackResources = getFallbackResources()
    return fallbackResources.find((r) => r.slug === slug) || null
  }
}

export async function getResourceCategories(): Promise<string[]> {
  console.log("[v0] Fetching resource categories")

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("resources")
      .select("category")
      .eq("published", true)
      .not("category", "is", null)

    if (error) {
      console.error("[v0] Error fetching resource categories:", error)
      return ["Financial Reporting", "Revenue Recognition", "Asset Management", "Compliance"]
    }

    const categories = [...new Set(data?.map((item) => item.category).filter(Boolean))]
    return categories.length > 0
      ? categories
      : ["Financial Reporting", "Revenue Recognition", "Asset Management", "Compliance"]
  } catch (error) {
    console.error("[v0] Unexpected error fetching resource categories:", error)
    return ["Financial Reporting", "Revenue Recognition", "Asset Management", "Compliance"]
  }
}

function getFallbackResources(): Resource[] {
  return [
    {
      id: "1",
      title: "Revenue Recognition Policy",
      slug: "revenue-recognition-policy",
      description: "Comprehensive policy template for revenue recognition under ASC 606 and IFRS 15 standards.",
      category: "Revenue Recognition",
      type: "policy",
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Financial Statement Template",
      slug: "financial-statement-template",
      description: "Complete financial statement template for quarterly and annual reporting.",
      category: "Financial Reporting",
      type: "template",
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "SOX Compliance Framework",
      slug: "sox-compliance-framework",
      description: "Comprehensive framework for Sarbanes-Oxley compliance and documentation requirements.",
      category: "Compliance",
      type: "framework",
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Fixed Asset Management Policy",
      slug: "fixed-asset-management-policy",
      description: "Complete policy framework for managing fixed assets, depreciation, and disposal procedures.",
      category: "Asset Management",
      type: "policy",
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}
