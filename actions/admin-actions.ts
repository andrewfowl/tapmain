"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Subscriptions
export async function getPendingSubscriptions() {
  const supabase = createClient()

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  if (error || !subscriptions) return []

  const userIds = subscriptions.map((s) => s.user_id)
  const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds)

  return subscriptions.map((sub) => ({
    ...sub,
    profiles: profiles?.find((p) => p.id === sub.user_id) || null,
  }))
}

export async function getAllSubscriptions() {
  const supabase = createClient()

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false })

  console.log("[v0] getAllSubscriptions - subscriptions:", subscriptions?.length, "error:", error)

  if (error || !subscriptions) return []

  const userIds = subscriptions.map((s) => s.user_id)
  const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds)

  console.log("[v0] getAllSubscriptions - profiles:", profiles?.length)

  return subscriptions.map((sub) => ({
    ...sub,
    profiles: profiles?.find((p) => p.id === sub.user_id) || null,
  }))
}

export async function approveSubscription(subscriptionId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "approved",
      approved_by: user?.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", subscriptionId)

  if (error) return { error: error.message }

  revalidatePath("/admin/subscriptions")
  return { success: true }
}

export async function rejectSubscription(subscriptionId: string, reason: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "rejected",
      rejection_reason: reason,
    })
    .eq("id", subscriptionId)

  if (error) return { error: error.message }

  revalidatePath("/admin/subscriptions")
  return { success: true }
}

// Project Types
export async function getAllProjectTypes() {
  const supabase = createClient()
  const { data, error } = await supabase.from("project_types").select("*, project_type_items(*)").order("display_order")

  if (error) return []
  return data
}

export async function createProjectType(formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string

  const { data, error } = await supabase.from("project_types").insert({ name, description, icon }).select().single()

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true, projectType: data }
}

export async function updateProjectType(id: string, formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const isActive = formData.get("isActive") === "true"

  const { error } = await supabase
    .from("project_types")
    .update({ name, description, icon, is_active: isActive })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true }
}

export async function deleteProjectType(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("project_types").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true }
}

// Project Type Items
export async function createProjectTypeItem(formData: FormData) {
  const supabase = createClient()

  const projectTypeId = formData.get("projectTypeId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const whyNeeded = formData.get("whyNeeded") as string
  const whatWeDo = formData.get("whatWeDo") as string
  const isRequired = formData.get("isRequired") === "true"
  const fileTypesStr = formData.get("fileTypes") as string
  const fileTypes = fileTypesStr ? fileTypesStr.split(",").map((t) => t.trim().toLowerCase()) : []

  const { data, error } = await supabase
    .from("project_type_items")
    .insert({
      project_type_id: projectTypeId,
      name,
      description,
      why_needed: whyNeeded,
      what_we_do: whatWeDo,
      is_required: isRequired,
      file_types: fileTypes,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true, item: data }
}

export async function updateProjectTypeItem(id: string, formData: FormData) {
  const supabase = createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const whyNeeded = formData.get("whyNeeded") as string
  const whatWeDo = formData.get("whatWeDo") as string
  const isRequired = formData.get("isRequired") === "true"
  const fileTypesStr = formData.get("fileTypes") as string
  const fileTypes = fileTypesStr ? fileTypesStr.split(",").map((t) => t.trim().toLowerCase()) : []

  const { error } = await supabase
    .from("project_type_items")
    .update({
      name,
      description,
      why_needed: whyNeeded,
      what_we_do: whatWeDo,
      is_required: isRequired,
      file_types: fileTypes,
    })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true }
}

export async function deleteProjectTypeItem(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("project_type_items").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/project-types")
  return { success: true }
}

// Customers & Projects
export async function getAllCustomers() {
  const supabase = createClient()

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .or("role.neq.admin,role.is.null")
    .order("created_at", { ascending: false })

  if (profilesError || !profiles || profiles.length === 0) {
    return []
  }

  const userIds = profiles.map((p) => p.id)
  const { data: subscriptions } = await supabase.from("subscriptions").select("*").in("user_id", userIds)

  const { data: projectCounts } = await supabase.from("customer_projects").select("user_id").in("user_id", userIds)

  // Combine data manually
  const customersWithData = profiles.map((profile) => {
    const userSubscriptions = subscriptions?.filter((s) => s.user_id === profile.id) || []
    const userProjectCount = projectCounts?.filter((p) => p.user_id === profile.id).length || 0
    return {
      ...profile,
      subscriptions: userSubscriptions,
      customer_projects: [{ count: userProjectCount }],
    }
  })

  return customersWithData
}

export async function getCustomerProjects(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("customer_projects")
    .select("*, project_types(name), project_files(count), item_requests(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) return []
  return data
}

export async function getProjectDetails(projectId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("customer_projects")
    .select(`
      *,
      profiles(*),
      project_types(*, project_type_items(*)),
      project_files(*),
      item_requests(*)
    `)
    .eq("id", projectId)
    .single()

  if (error) return null
  return data
}

export async function updateProjectStatus(projectId: string, status: string) {
  const supabase = createClient()

  const { error } = await supabase.from("customer_projects").update({ status }).eq("id", projectId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/projects/${projectId}`)
  return { success: true }
}

// Item Requests
export async function createItemRequest(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const projectId = formData.get("projectId") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const whyNeeded = formData.get("whyNeeded") as string
  const fileTypesStr = formData.get("fileTypes") as string
  const fileTypes = fileTypesStr ? fileTypesStr.split(",").map((t) => t.trim().toLowerCase()) : []
  const dueDate = formData.get("dueDate") as string

  const { data, error } = await supabase
    .from("item_requests")
    .insert({
      project_id: projectId,
      requested_by: user?.id,
      title,
      description,
      why_needed: whyNeeded,
      file_types: fileTypes,
      due_date: dueDate || null,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath(`/admin/projects/${projectId}`)
  return { success: true, request: data }
}

export async function cancelItemRequest(requestId: string, projectId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("item_requests").update({ status: "cancelled" }).eq("id", requestId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/projects/${projectId}`)
  return { success: true }
}

export async function acceptItemRequest(requestId: string, projectId: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("item_requests")
    .update({
      status: "accepted",
      fulfilled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/projects/${projectId}`)
  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true }
}

export async function rejectItemUpload(requestId: string, projectId: string, reason?: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("item_requests")
    .update({
      status: "pending",
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/projects/${projectId}`)
  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true }
}

// Admin Create Project for Customer
export async function adminCreateProject(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  // Verify admin role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") return { error: "Unauthorized" }

  const userId = formData.get("userId") as string
  const projectTypeId = formData.get("projectTypeId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  const { data: project, error } = await supabase
    .from("customer_projects")
    .insert({
      user_id: userId,
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

  revalidatePath(`/admin/customers/${userId}`)
  return { success: true, project }
}

// Stats
export async function getAdminStats() {
  const supabase = createClient()

  const [
    { count: totalCustomers },
    { count: pendingSubscriptions },
    { count: totalProjects },
    { count: pendingRequests },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).neq("role", "admin"),
    supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("customer_projects").select("*", { count: "exact", head: true }),
    supabase.from("item_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])

  return {
    totalCustomers: totalCustomers || 0,
    pendingSubscriptions: pendingSubscriptions || 0,
    totalProjects: totalProjects || 0,
    pendingRequests: pendingRequests || 0,
  }
}
