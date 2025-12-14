"use client"

import { useState, useEffect } from "react"
import { getAllUserFiles, assignExistingFileToRequest } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Loader2, CheckCircle, FolderOpen } from "lucide-react"

interface ExistingFileSelectorProps {
  projectId: string
  requestId: string
  onFileAssigned?: () => void
}

export function ExistingFileSelector({ projectId, requestId, onFileAssigned }: ExistingFileSelectorProps) {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [assigning, setAssigning] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (open) {
      loadFiles()
    }
  }, [open])

  async function loadFiles() {
    setLoading(true)
    const userFiles = await getAllUserFiles()
    setFiles(userFiles)
    setLoading(false)
  }

  async function handleAssign(fileId: string) {
    setAssigning(fileId)
    const result = await assignExistingFileToRequest(fileId, requestId, projectId)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        onFileAssigned?.()
      }, 1000)
    }
    setAssigning(null)
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Use existing file
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select from your files</DialogTitle>
          <DialogDescription className="text-white/60">
            Choose a file you've previously uploaded to any project
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-white mb-4" />
            <p className="text-white">File assigned successfully!</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white/60" />
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No files uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 -mx-6 px-6">
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FileText className="h-5 w-5 text-white/60 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">{file.file_name}</p>
                      <p className="text-white/40 text-xs">
                        {file.project_name} • {formatFileSize(file.file_size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAssign(file.id)}
                    disabled={assigning !== null}
                    className="bg-white text-black hover:bg-white/90 ml-3 flex-shrink-0"
                  >
                    {assigning === file.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Use this"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
