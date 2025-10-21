import type { Template } from "@/actions/templates-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const FileTextIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

interface TemplatesGridProps {
  templates: Template[]
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <FileTextIcon />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
        <p className="text-gray-500">Check back later for new templates.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
          <div className="grid grid-rows-[auto_auto_1fr_auto] h-full">
            {/* Image area - fixed aspect ratio */}
            {template.preview_image_url && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={template.preview_image_url || "/placeholder.svg"}
                  alt={template.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}

            {/* Header area - title and badge */}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">{template.title}</CardTitle>
              </div>
              {template.category && (
                <Badge variant="secondary" className="mt-2 w-fit">
                  {template.category}
                </Badge>
              )}
            </CardHeader>

            {/* Content area - flexible height to absorb differences */}
            <CardContent className="pt-0 pb-4">
              <CardDescription className="line-clamp-3 mb-4">{template.description}</CardDescription>

              {(template.file_type || template.file_size) && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {template.file_type && <span className="uppercase font-medium">{template.file_type}</span>}
                  {template.file_size && (
                    <>
                      <span>•</span>
                      <span>{formatFileSize(template.file_size)}</span>
                    </>
                  )}
                </div>
              )}
            </CardContent>

            {/* Actions area - aligned to bottom */}
            <CardContent className="pt-0 pb-4">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href={`/templates/${template.slug}`}>
                    <EyeIcon />
                    <span className="ml-2">View</span>
                  </Link>
                </Button>
                {template.download_url && (
                  <Button asChild size="sm">
                    <a href={template.download_url} download>
                      <DownloadIcon />
                      <span className="ml-2">Download</span>
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
