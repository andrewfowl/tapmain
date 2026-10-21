import { cookies } from "next/headers"

export async function getAttribution(): Promise<string> {
  const raw = (await cookies()).get("tap_attr")?.value
  if (!raw) return ""
  try {
    const { source, medium, campaign, landing } = JSON.parse(decodeURIComponent(raw))
    return [source, medium, campaign, landing]
      .map((v) => String(v ?? "").slice(0, 80))
      .filter(Boolean)
      .join(" / ")
  } catch {
    return ""
  }
}
