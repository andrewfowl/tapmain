import { createClient } from "@/lib/supabase/server"

export interface Solution {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  benefits: Array<{ title: string; description: string }>
  features: Array<{ title: string; description: string }>
  pricing_info?: string
  related_template_id?: string
  image_url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface ServiceRequest {
  solution_id: string
  full_name: string
  email: string
  company?: string
  phone?: string
  message?: string
}

export async function getPublishedSolutions(): Promise<Solution[]> {
  console.log("[v0] Fetching published solutions from database")

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching solutions:", error)
      if (
        error.message.includes("does not exist") ||
        error.message.includes("schema cache") ||
        error.code === "42P01"
      ) {
        console.log("[v0] Solutions table not found, returning fallback data")
        return getFallbackSolutions()
      }
      return getFallbackSolutions()
    }

    console.log("[v0] Found solutions:", data?.length || 0)
    return data || getFallbackSolutions()
  } catch (error) {
    console.error("[v0] Unexpected error fetching solutions:", error)
    return getFallbackSolutions()
  }
}

export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  console.log("[v0] Fetching solution by slug:", slug)

  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("solutions").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
      console.error("[v0] Error fetching solution:", error)
      if (
        error.message.includes("does not exist") ||
        error.message.includes("schema cache") ||
        error.code === "42P01"
      ) {
        console.log("[v0] Solutions table not found, checking fallback data")
        const fallbackSolutions = getFallbackSolutions()
        return fallbackSolutions.find((s) => s.slug === slug) || null
      }
      return null
    }

    console.log("[v0] Found solution:", data?.title)
    return data
  } catch (error) {
    console.error("[v0] Unexpected error fetching solution:", error)
    const fallbackSolutions = getFallbackSolutions()
    return fallbackSolutions.find((s) => s.slug === slug) || null
  }
}

export async function submitServiceRequest(request: ServiceRequest): Promise<{ success: boolean; error?: string }> {
  console.log("[v0] Submitting service request for solution:", request.solution_id)

  const supabase = createClient()

  const { error } = await supabase.from("service_requests").insert([request])

  if (error) {
    console.error("[v0] Error submitting service request:", error)
    if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
      return { success: false, error: "Service is temporarily unavailable. Please try again later." }
    }
    return { success: false, error: error.message }
  }

  console.log("[v0] Service request submitted successfully")
  return { success: true }
}

function getFallbackSolutions(): Solution[] {
  return [
    {
      id: "1",
      title: "Finance Transformation",
      slug: "finance-transformation",
      description:
        "Transform your finance function with our comprehensive approach to modernizing processes, systems, and capabilities.",
      short_description: "Modernize your finance operations for the digital age",
      benefits: [
        { title: "Improved Efficiency", description: "Streamline processes and reduce manual work by up to 60%" },
        { title: "Better Decision Making", description: "Real-time insights and analytics for strategic planning" },
        { title: "Cost Reduction", description: "Optimize costs through process automation and optimization" },
      ],
      features: [
        { title: "Process Optimization", description: "Redesign and automate key finance processes" },
        { title: "Technology Integration", description: "Implement modern finance systems and tools" },
        { title: "Change Management", description: "Support your team through the transformation" },
      ],
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Process Automation",
      slug: "process-automation",
      description: "Automate repetitive finance tasks and workflows to increase efficiency and reduce errors.",
      short_description: "Intelligent automation for finance operations",
      benefits: [
        { title: "Time Savings", description: "Free up 50+ hours per month for strategic work" },
        { title: "Error Reduction", description: "Eliminate manual errors in routine processes" },
        { title: "Scalability", description: "Handle increased volume without adding headcount" },
      ],
      features: [
        { title: "Workflow Automation", description: "Automate approval processes and routine tasks" },
        { title: "Data Integration", description: "Connect systems for seamless data flow" },
        { title: "Exception Handling", description: "Smart routing for items requiring attention" },
      ],
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}
