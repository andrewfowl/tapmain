"use client"

import type React from "react"

import { useState } from "react"
import { createItemRequest } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"

interface AdminItemRequestFormProps {
  projectId: string
}

export function AdminItemRequestForm({ projectId }: AdminItemRequestFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set("projectId", projectId)

    await createItemRequest(formData)

    setLoading(false)
    setIsOpen(false)
    ;(e.target as HTMLFormElement).reset()
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full bg-white text-black hover:bg-white/90">
        <Plus className="mr-2 h-4 w-4" />
        Request New Item
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="space-y-2">
        <Label className="text-white/80">Title *</Label>
        <Input
          name="title"
          placeholder="e.g., Bank Statement Q4 2024"
          required
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white/80">Description</Label>
        <Textarea
          name="description"
          placeholder="Describe what you need..."
          rows={2}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white/80">Why is this needed?</Label>
        <Textarea
          name="whyNeeded"
          placeholder="Explain why this item is required..."
          rows={2}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white/80">Accepted file types (comma separated)</Label>
        <Input name="fileTypes" placeholder="e.g., pdf, xlsx, csv" className="bg-white/5 border-white/10 text-white" />
      </div>
      <div className="space-y-2">
        <Label className="text-white/80">Due date (optional)</Label>
        <Input name="dueDate" type="date" className="bg-white/5 border-white/10 text-white" />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1 bg-white text-black hover:bg-white/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Request"}
        </Button>
      </div>
    </form>
  )
}
