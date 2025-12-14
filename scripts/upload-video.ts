import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"

async function uploadVideo() {
  console.log("[v0] Starting video upload...")

  const videoPath = path.join(process.cwd(), "testimonial-video.mp4")

  if (!fs.existsSync(videoPath)) {
    console.error("[v0] ❌ Error: testimonial-video.mp4 not found in project root")
    process.exit(1)
  }

  const fileStats = fs.statSync(videoPath)
  console.log(`[v0] 📁 File size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`)

  const fileBuffer = fs.readFileSync(videoPath)

  console.log("[v0] 📤 Uploading to Vercel Blob...")

  const { url } = await put("testimonials/customer-testimonial.mp4", fileBuffer, {
    access: "public",
    contentType: "video/mp4",
  })

  console.log("[v0] ✅ Upload successful!")
  console.log("[v0] 🔗 Video URL:", url)
  console.log("\n[v0] Add this to your testimonial in wall-of-love.tsx:")
  console.log(`videoUrl: "${url}"`)

  return url
}

uploadVideo()
  .then((url) => {
    console.log("[v0] Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("[v0] ❌ Upload failed:", error)
    process.exit(1)
  })
