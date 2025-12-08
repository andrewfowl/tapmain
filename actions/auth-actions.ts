"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const companyName = formData.get("companyName") as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(".supabase.co", "")}/auth/callback`,
      data: {
        full_name: fullName,
        company_name: companyName,
      },
    },
  })

  if (error) {
    if (error.message.includes("User already registered") || error.code === "user_already_exists") {
      return { error: "An account with this email already exists. Please sign in instead." }
    }
    return { error: error.message }
  }

  return { success: true, message: "Check your email to confirm your account" }
}

export async function signIn(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()
  const email = formData.get("email") as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL?.replace("/auth/callback", "/auth/reset-password") ||
      `${typeof window !== "undefined" ? window.location.origin : ""}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = createClient()
  const password = formData.get("password") as string

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*, subscriptions(*)").eq("id", user.id).single()

  return profile
}

export async function getSubscriptionStatus() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

  return subscription
}
