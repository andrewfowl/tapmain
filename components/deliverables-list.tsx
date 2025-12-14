"use client"

import { useState } from "react"
import { deleteDeliverable } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { FileText, Download, Trash2, Loader2, Package } from "lucide-react"

interface DeliverablesListProps {
  files: any[]
  projectId: string
  isAdmin?: boolean
}

export function DeliverablesList({ files, projectId, isAdmin = false }: DeliverablesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Filter only deliverables
  const deliverables = files.filter((f) => f.notes?.startsWith("[DELIVERABLE]"))

  async function handleDelete(fileId: string) {
    setDeletingId(fileId)
    await deleteDeliverable(fileId, projectId)
    setDeletingId(null)
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function getDescription(notes: string) {
    if (!notes) return null
    const desc = notes.replace("[DELIVERABLE]", "").trim()
    return desc || null
  }

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/60">No deliverables uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {deliverables.map((file: any) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white/60" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{file.file_name}</p>
              <p className="text-xs text-white/40">
                {formatFileSize(file.file_size || 0)}
                {getDescription(file.notes) && ` • ${getDescription(file.notes)}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={file.file_url} target="_blank" rel="noopener noreferrer" download>
              <Button size="sm" className="rounded-none bg-white text-black hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
            {isAdmin && (
              <Button
                size="sm"
                variant="ghost"
                disabled={deletingId === file.id}
                onClick={() => handleDelete(file.id)}
                className="rounded-none text-red-500/60 hover:text-red-500 hover:bg-red-500/10"
              >
                {deletingId === file.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
