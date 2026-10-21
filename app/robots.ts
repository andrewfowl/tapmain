import type { MetadataRoute } from "next"

const PRIVATE_PATHS = ["/admin", "/dashboard", "/auth", "/api", "/thank-you"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: "https://techaccountingpro.com/sitemap.xml",
  }
}
