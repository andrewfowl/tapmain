"use client"

import type React from "react"
import { useState, useRef } from "react"
import { uploadDeliverable } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, CheckCircle, Package } from "lucide-react"

interface AdminDeliverableUploadProps {
  projectId: string
}

export function AdminDeliverableUpload({ projectId }: AdminDeliverableUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    formData.set("projectId", projectId)

    const result = await uploadDeliverable(formData)

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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
        <Package className="h-4 w-4" />
        <span>Upload completed work for customer download</span>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="file"
          name="file"
          required
          className="bg-white/5 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:mr-3 file:px-3 file:py-1 rounded-none"
        />
        <Input
          type="text"
          name="notes"
          placeholder="Description (optional)"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-none"
        />
        <Button
          type="submit"
          disabled={isUploading}
          className={`w-full rounded-none ${success ? "bg-green-500 hover:bg-green-600" : "bg-white text-black hover:bg-white/90"}`}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading Deliverable...
            </>
          ) : success ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Uploaded Successfully
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Deliverable
            </>
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}
