import { getPublishedTemplates, getTemplateCategories } from "@/actions/templates-actions"
import { TemplatesPageClient } from "@/components/templates-page-client"

export async function TemplatesPageContent() {
  console.log("[v0] Fetching templates and categories...")
  const [templates, categories] = await Promise.all([getPublishedTemplates(), getTemplateCategories()])

  console.log("[v0] Templates fetched:", templates?.length || 0, "items")
  console.log("[v0] Categories fetched:", categories?.length || 0, "items")
  console.log("[v0] First template:", templates?.[0])

  return <TemplatesPageClient templates={templates} categories={categories} />
}
