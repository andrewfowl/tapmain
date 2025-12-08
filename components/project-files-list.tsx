"use client"

import { useState } from "react"
import { deleteProjectFile } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
} from "@/components/ui/popover"
import { FileText, Download, Trash2, Loader2, Share2, Copy, Mail } from "lucide-react"

interface ProjectFilesListProps {
  files: any[]
  projectId: string
  showItemName?: boolean
}

export function ProjectFilesList({ files, projectId, showItemName }: ProjectFilesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(fileId: string) {
    setDeletingId(fileId)
    await deleteProjectFile(fileId, projectId)
    setDeletingId(null)
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url)
  }

  function shareViaEmail(fileName: string, url: string) {
    const subject = encodeURIComponent(`Shared file: ${fileName}`)
    const body = encodeURIComponent(`Here is the file "${fileName}":\n\n${url}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  return (
    <div className="space-y-2">
      {files.map((file: any) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-white/60" />
            <div>
              <p className="text-sm font-medium text-white">{file.file_name}</p>
              <p className="text-xs text-white/40">
                {formatFileSize(file.file_size || 0)}
                {showItemName && file.item_id && " • For required item"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Download button */}
            <a href={file.file_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                <Download className="h-4 w-4" />
              </Button>
            </a>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                  <Share2 className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <PopoverHeader>
                  <PopoverTitle>Share file</PopoverTitle>
                  <PopoverDescription>Choose how to share</PopoverDescription>
                </PopoverHeader>
                <PopoverBody className="space-y-1 px-1 py-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => copyLink(file.file_url)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => shareViaEmail(file.file_name, file.file_url)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Share via Email
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={deletingId === file.id}
                  className="text-red-500/60 hover:text-red-500 hover:bg-red-500/10"
                >
                  {deletingId === file.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <PopoverHeader>
                  <PopoverTitle className="text-destructive">Delete File</PopoverTitle>
                  <PopoverDescription>This action cannot be undone</PopoverDescription>
                </PopoverHeader>
                <PopoverBody>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to delete <strong>{file.file_name}</strong>?
                    </p>
                    <div className="rounded-md bg-destructive/10 p-3">
                      <p className="text-xs text-destructive">
                        <strong>Warning:</strong> This will permanently remove the file from your project.
                      </p>
                    </div>
                  </div>
                </PopoverBody>
                <PopoverFooter className="grid-cols-2">
                  <PopoverClose asChild>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(file.id)}>
                      Delete
                    </Button>
                  </PopoverClose>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  )
}
