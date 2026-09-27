import { createServerClient as createSupabaseServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// cookies() is async in Next.js 15+, so it is awaited lazily inside the cookie
// methods. This keeps createClient() synchronous for its many existing callers.
export function createClient() {
  return createSupabaseServerClient(process.env.SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      async getAll() {
        const cookieStore = await cookies()
        return cookieStore.getAll()
      },
      async setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          const cookieStore = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Components can't set cookies; session refresh happens in middleware/actions.
        }
      },
    },
  })
}

export function createStaticClient() {
  return createSupabaseServerClient(process.env.SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get() {
        return undefined
      },
      set() {
        // No-op during static generation
      },
      remove() {
        // No-op during static generation
      },
    },
  })
}

export const createServerClient = createClient
