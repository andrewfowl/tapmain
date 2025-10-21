import { createClient as supabaseCreateClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return supabaseCreateClient(supabaseUrl, supabaseAnonKey)
}
