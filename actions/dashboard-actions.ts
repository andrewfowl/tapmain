"use server"

import { createClient } from "@/lib/supabase/server"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Project Types
export async function getProjectTypes() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("project_types")
    .select("*, project_type_items(*)")
    .eq("is_active", true)
    .order("display_order")

  if (error) return []
  return data
}

// Customer Projects
export async function getCustomerProjects() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("customer_projects")
    .select("*, project_types(name, icon), project_files(count)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) return []
  return data
}

export async function getProjectById(projectId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("customer_projects")
    .select(
      `
      *,
      project_types(*, project_type_items(*)),
      project_files(*),
      item_requests(*)
    `,
    )
    .eq("id", projectId)
    .single()

  if (error) return null
  return data
}

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  // Check subscription status
  const { data: subscription } = await supabase.from("subscriptions").select("status").eq("user_id", user.id).single()

  if (subscription?.status !== "approved") {
    return { error: "Your subscription must be approved before creating projects" }
  }

  const projectTypeId = formData.get("projectTypeId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  // Create the project
  const { data: project, error } = await supabase
    .from("customer_projects")
    .insert({
      user_id: user.id,
      project_type_id: projectTypeId,
      name,
      description,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  const { data: projectTypeItems } = await supabase
    .from("project_type_items")
    .select("*")
    .eq("project_type_id", projectTypeId)
    .order("display_order")

  if (projectTypeItems && projectTypeItems.length > 0) {
    const itemRequests = projectTypeItems.map((item) => ({
      project_id: project.id,
      title: item.name,
      description: item.description,
      why_needed: item.why_needed,
      file_types: item.file_types,
      status: "pending",
      requested_by: user.id,
    }))

    await supabase.from("item_requests").insert(itemRequests)
  }

  revalidatePath("/dashboard")
  return { success: true, project }
}

export async function uploadProjectFile(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const projectId = formData.get("projectId") as string
  const itemId = formData.get("itemId") as string | null
  const requestId = formData.get("requestId") as string | null
  const notes = formData.get("notes") as string
  const file = formData.get("file") as File

  if (!file) return { error: "No file provided" }

  // Upload to Vercel Blob
  const blob = await put(`projects/${projectId}/${file.name}`, file, {
    access: "public",
  })

  // Save file record to database
  const { data, error } = await supabase
    .from("project_files")
    .insert({
      project_id: projectId,
      item_id: itemId || null,
      request_id: requestId || null,
      file_name: file.name,
      file_url: blob.url,
      file_size: file.size,
      file_type: file.type,
      uploaded_by: user.id,
      notes,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  if (requestId) {
    await supabase
      .from("item_requests")
      .update({ status: "provided", updated_at: new Date().toISOString() })
      .eq("id", requestId)
  }

  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true, file: data }
}

export async function deleteProjectFile(fileId: string, projectId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("project_files").delete().eq("id", fileId)

  if (error) return { error: error.message }

  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true }
}

export async function getItemRequests(projectId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("item_requests")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })

  if (error) return []
  return data
}

export async function getPendingRequestsCount() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return 0

  const { data: projects } = await supabase.from("customer_projects").select("id").eq("user_id", user.id)

  if (!projects?.length) return 0

  const projectIds = projects.map((p) => p.id)
  const { count } = await supabase
    .from("item_requests")
    .select("*", { count: "exact", head: true })
    .in("project_id", projectIds)
    .eq("status", "pending")

  return count || 0
}

// Profile Editing
export async function updateProfile(data: {
  full_name: string
  company_name: string
  phone: string
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.full_name,
      company_name: data.company_name,
      phone: data.phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/profile")
  return { success: true }
}
