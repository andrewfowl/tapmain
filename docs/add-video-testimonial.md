# Adding a Video Testimonial to Wall of Love

## Option 1: Upload via Script (Recommended for large files)

1. **Place your video file** in the project root directory and name it `testimonial-video.mp4`

2. **Run the upload script:**
   \`\`\`bash
   npx tsx scripts/upload-testimonial-video.ts
   \`\`\`

3. **Copy the generated URL** from the console output

4. **Add to testimonials array** in `components/wall-of-love.tsx`:
   \`\`\`typescript
   {
     id: 10,
     name: "Jane Doe",
     role: "CFO",
     company: "Crypto Startup",
     content: "Optional fallback text if video fails to load",
     videoUrl: "https://your-blob-url-here.mp4"
   }
   \`\`\`

## Option 2: Manual Blob Upload

1. Go to your Vercel dashboard → Storage → Blob
2. Upload your video file
3. Copy the public URL
4. Add to the testimonials array as shown above

## Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Max size**: No hard limit with Blob storage, but keep under 50MB for best performance
- **Aspect ratio**: 16:9 recommended
- **Resolution**: 720p or 1080p

## How It Works

- Video shows a thumbnail with play button overlay
- Clicking play starts the video with native controls
- If video fails to load, automatically falls back to text testimonial
- Videos are lazy-loaded for performance
- Supports `preload="metadata"` to show first frame as thumbnail

## Performance Optimization

The component includes:
- Lazy loading (only loads when thumbnail visible)
- Error fallback to text testimonial
- Metadata preload for instant thumbnails
- Native browser video controls
