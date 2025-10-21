"use server"

import { createClient } from "@/lib/supabase/server"

export interface Policy {
  id: string
  title: string
  slug: string
  description: string
  category: string
  content: any
  published: boolean
  created_at: string
  updated_at: string
  created_by: string
}

export async function getPublishedPolicies(): Promise<Policy[]> {
  console.log("[v0] Fetching published policies from database")

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("policies")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching policies:", error)
      if (
        error.message.includes("does not exist") ||
        error.message.includes("schema cache") ||
        error.code === "42P01"
      ) {
        console.log("[v0] Policies table not found, returning fallback data")
        return getFallbackPolicies()
      }
      return getFallbackPolicies()
    }

    console.log("[v0] Found policies:", data?.length || 0)
    return data || getFallbackPolicies()
  } catch (error) {
    console.error("[v0] Unexpected error fetching policies:", error)
    return getFallbackPolicies()
  }
}

export async function getPolicyBySlug(slug: string): Promise<Policy | null> {
  console.log("[v0] Fetching policy by slug:", slug)

  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("policies").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
      console.error("[v0] Error fetching policy:", error)
      if (
        error.message.includes("does not exist") ||
        error.message.includes("schema cache") ||
        error.code === "42P01"
      ) {
        console.log("[v0] Policies table not found, checking fallback data")
        const fallbackPolicies = getFallbackPolicies()
        return fallbackPolicies.find((p) => p.slug === slug) || null
      }
      return null
    }

    console.log("[v0] Found policy:", data?.title)
    return data
  } catch (error) {
    console.error("[v0] Unexpected error fetching policy:", error)
    const fallbackPolicies = getFallbackPolicies()
    return fallbackPolicies.find((p) => p.slug === slug) || null
  }
}

export async function getPolicyCategories(): Promise<string[]> {
  console.log("[v0] Fetching policy categories")

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("policies")
      .select("category")
      .eq("published", true)
      .not("category", "is", null)

    if (error) {
      console.error("[v0] Error fetching policy categories:", error)
      return ["Revenue Recognition", "Asset Management", "Financial Reporting", "Compliance"]
    }

    const categories = [...new Set(data?.map((item) => item.category).filter(Boolean))]
    return categories.length > 0
      ? categories
      : ["Revenue Recognition", "Asset Management", "Financial Reporting", "Compliance"]
  } catch (error) {
    console.error("[v0] Unexpected error fetching policy categories:", error)
    return ["Revenue Recognition", "Asset Management", "Financial Reporting", "Compliance"]
  }
}

function getFallbackPolicies(): Policy[] {
  return [
    {
      id: "1",
      title: "Revenue Recognition Policy",
      slug: "revenue-recognition-policy",
      description: "Comprehensive policy template for revenue recognition under ASC 606 and IFRS 15 standards.",
      category: "Revenue Recognition",
      content: {},
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "system",
    },
    {
      id: "2",
      title: "Fixed Asset Management Policy",
      slug: "fixed-asset-management-policy",
      description: "Complete policy framework for managing fixed assets, depreciation, and disposal procedures.",
      category: "Asset Management",
      content: {},
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "system",
    },
    {
      id: "3",
      title: "Financial Reporting Controls",
      slug: "financial-reporting-controls",
      description: "Internal controls and procedures for accurate and timely financial reporting.",
      category: "Financial Reporting",
      content: {},
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "system",
    },
    {
      id: "4",
      title: "SOX Compliance Framework",
      slug: "sox-compliance-framework",
      description: "Comprehensive framework for Sarbanes-Oxley compliance and documentation requirements.",
      category: "Compliance",
      content: {},
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "system",
    },
  ]
}
