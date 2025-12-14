"use server"

import { createClient } from "@/lib/supabase/server"
import { put, del } from "@vercel/blob"
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

  // Get the file URL before deleting
  const { data: file } = await supabase.from("project_files").select("file_url").eq("id", fileId).single()

  // Delete the database record
  const { error } = await supabase.from("project_files").delete().eq("id", fileId)

  if (error) return { error: error.message }

  // Check if any other records share this blob URL
  if (file?.file_url) {
    const { count } = await supabase
      .from("project_files")
      .select("*", { count: "exact", head: true })
      .eq("file_url", file.file_url)

    // Only delete the blob if no other records reference it
    if (count === 0) {
      try {
        await del(file.file_url)
      } catch (e) {
        // Blob may already be deleted or not exist, continue
        console.log("Blob deletion skipped:", e)
      }
    }
  }

  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true }
}

export async function deleteProject(projectId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  // Get the project and verify ownership and status
  const { data: project, error: fetchError } = await supabase
    .from("customer_projects")
    .select("user_id, status")
    .eq("id", projectId)
    .single()

  if (fetchError || !project) return { error: "Project not found" }

  if (project.user_id !== user.id) return { error: "Unauthorized" }

  if (!["pending", "pending_approval", "declined"].includes(project.status)) {
    return { error: "Only pending or declined projects can be deleted" }
  }

  // Get all files for this project to handle blob cleanup
  const { data: projectFiles } = await supabase.from("project_files").select("id, file_url").eq("project_id", projectId)

  // Delete file records and clean up orphaned blobs
  if (projectFiles?.length) {
    for (const file of projectFiles) {
      await supabase.from("project_files").delete().eq("id", file.id)

      // Check if any other records share this blob URL
      if (file.file_url) {
        const { count } = await supabase
          .from("project_files")
          .select("*", { count: "exact", head: true })
          .eq("file_url", file.file_url)

        // Only delete the blob if no other records reference it
        if (count === 0) {
          try {
            await del(file.file_url)
          } catch (e) {
            console.log("Blob deletion skipped:", e)
          }
        }
      }
    }
  }

  // Delete item requests
  await supabase.from("item_requests").delete().eq("project_id", projectId)

  // Delete the project
  const { error } = await supabase.from("customer_projects").delete().eq("id", projectId)

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/projects")
  return { success: true }
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

export async function getAllUserFiles() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  // Get all projects for this user
  const { data: projects } = await supabase.from("customer_projects").select("id, name").eq("user_id", user.id)

  if (!projects?.length) return []

  const projectIds = projects.map((p) => p.id)

  // Get all non-deliverable files from user's projects
  const { data: files, error } = await supabase
    .from("project_files")
    .select("*")
    .in("project_id", projectIds)
    .eq("uploaded_by", user.id)
    .order("created_at", { ascending: false })

  if (error) return []

  // Filter out deliverables and add project name
  const filesWithProject = files
    .filter((f) => !f.notes?.startsWith("[DELIVERABLE]"))
    .map((file) => ({
      ...file,
      project_name: projects.find((p) => p.id === file.project_id)?.name || "Unknown Project",
    }))

  const uniqueFilesMap = new Map<string, (typeof filesWithProject)[0]>()
  for (const file of filesWithProject) {
    // Keep the first occurrence (most recent due to ordering)
    if (!uniqueFilesMap.has(file.file_url)) {
      uniqueFilesMap.set(file.file_url, file)
    }
  }

  return Array.from(uniqueFilesMap.values())
}

export async function assignExistingFileToRequest(fileId: string, requestId: string, projectId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  // Get the original file
  const { data: originalFile, error: fetchError } = await supabase
    .from("project_files")
    .select("*")
    .eq("id", fileId)
    .single()

  if (fetchError || !originalFile) return { error: "File not found" }

  // Create a new file record linked to the new project/request
  const { data: newFile, error: insertError } = await supabase
    .from("project_files")
    .insert({
      project_id: projectId,
      request_id: requestId,
      file_name: originalFile.file_name,
      file_url: originalFile.file_url,
      file_size: originalFile.file_size,
      file_type: originalFile.file_type,
      uploaded_by: user.id,
      notes: `Reused from another project`,
    })
    .select()
    .single()

  if (insertError) return { error: insertError.message }

  // Update request status to provided
  await supabase
    .from("item_requests")
    .update({ status: "provided", updated_at: new Date().toISOString() })
    .eq("id", requestId)

  revalidatePath(`/dashboard/projects/${projectId}`)
  return { success: true, file: newFile }
}

// Item Requests
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
