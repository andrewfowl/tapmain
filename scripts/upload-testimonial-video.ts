import { put } from "@vercel/blob"

async function uploadTestimonialVideo() {
  // Instructions for user to use this script:
  // 1. Place your video file in the project root and name it 'testimonial-video.mp4'
  // 2. Run: node --loader ts-node/esm scripts/upload-testimonial-video.ts

  const fs = await import("fs")
  const path = await import("path")

  const videoPath = path.join(process.cwd(), "testimonial-video.mp4")

  if (!fs.existsSync(videoPath)) {
    console.error("❌ Error: testimonial-video.mp4 not found in project root")
    console.log('📝 Please place your video file in the project root and name it "testimonial-video.mp4"')
    return
  }

  console.log("📤 Uploading video to Vercel Blob...")

  const fileBuffer = fs.readFileSync(videoPath)
  const blob = new Blob([fileBuffer], { type: "video/mp4" })

  const { url } = await put("testimonials/video-testimonial.mp4", blob, {
    access: "public",
    addRandomSuffix: false,
  })

  console.log("✅ Video uploaded successfully!")
  console.log("🔗 Video URL:", url)
  console.log("\n📋 Copy this URL and add it to your testimonial object in components/wall-of-love.tsx")
  console.log("Example:")
  console.log(`{
  id: 10,
  name: "Customer Name",
  role: "Role",
  company: "Company",
  content: "This is an optional text fallback for the video testimonial.",
  videoUrl: "${url}"
}`)
}

uploadTestimonialVideo().catch(console.error)
