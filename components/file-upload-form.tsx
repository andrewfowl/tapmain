"use client"

import type React from "react"

import { useState, useRef } from "react"
import { uploadProjectFile } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, CheckCircle } from "lucide-react"

interface FileUploadFormProps {
  projectId: string
  itemId?: string
  requestId?: string
  acceptedTypes?: string[]
  label?: string
}

export function FileUploadForm({
  projectId,
  itemId,
  requestId,
  acceptedTypes,
  label = "Upload file",
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

  return (
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
        className={success ? "bg-green-500 hover:bg-green-600" : "bg-white text-black hover:bg-white/90"}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Uploaded
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            {label}
          </>
        )}
      </Button>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </form>
  )
}
