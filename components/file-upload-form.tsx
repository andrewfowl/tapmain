"use client"

import type React from "react"

import { useState, useRef } from "react"
import { uploadProjectFile } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, CheckCircle } from "lucide-react"
import { ExistingFileSelector } from "@/components/existing-file-selector"

interface FileUploadFormProps {
  projectId: string
  itemId?: string
  requestId?: string
  acceptedTypes?: string[]
  label?: string
  showExistingFiles?: boolean
  inline?: boolean
}

export function FileUploadForm({
  projectId,
  itemId,
  requestId,
  acceptedTypes,
  label = "Upload",
  showExistingFiles = true,
  inline = false,
}: FileUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const acceptString = acceptedTypes?.length ? acceptedTypes.map((t) => `.${t}`).join(",") : undefined

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    formData.set("projectId", projectId)
    if (itemId) formData.set("itemId", itemId)
    if (requestId) formData.set("requestId", requestId)

    const result = await uploadProjectFile(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      formRef.current?.reset()
      setTimeout(() => setSuccess(false), 3000)
    }

    setIsUploading(false)
  }

  function handleFileAssigned() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  if (inline) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="file"
            name="file"
            accept={acceptString}
            required
            className="bg-white/5 border-white/10 text-white text-sm h-8 w-auto max-w-[200px] file:bg-white/10 file:text-white file:border-0 file:mr-2 file:px-2 file:py-0.5 file:text-xs file:rounded"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isUploading}
            className={`h-8 px-3 rounded-none ${success ? "bg-white/20 text-white" : "bg-white text-black hover:bg-white/90"}`}
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : success ? (
              <CheckCircle className="h-3.5 w-3.5" />
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 mr-1" />
                {label}
              </>
            )}
          </Button>
        </form>
        {showExistingFiles && requestId && (
          <>
            <span className="text-white/40 text-xs">or</span>
            <ExistingFileSelector projectId={projectId} requestId={requestId} onFileAssigned={handleFileAssigned} />
          </>
        )}
        {error && <span className="text-xs text-white/60">{error}</span>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          type="file"
          name="file"
          accept={acceptString}
          required
          className="bg-white/5 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:mr-3 file:px-3 file:py-1 file:rounded"
        />
        <Button
          type="submit"
          size="sm"
          disabled={isUploading}
          className={success ? "bg-white/20 text-white" : "bg-white text-black hover:bg-white/90"}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : success ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Done
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {label}
            </>
          )}
        </Button>
      </form>
      {showExistingFiles && requestId && (
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">or</span>
          <ExistingFileSelector projectId={projectId} requestId={requestId} onFileAssigned={handleFileAssigned} />
        </div>
      )}
      {error && <span className="text-sm text-white/60">{error}</span>}
    </div>
  )
}
