"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { adminCreateProject } from "@/actions/admin-actions"
import { X, FolderPlus } from "lucide-react"

interface ProjectType {
  id: string
  name: string
  description: string | null
  icon: string | null
}

interface AdminCreateProjectFormProps {
  userId: string
  customerName: string
  projectTypes: ProjectType[]
}

export function AdminCreateProjectForm({ userId, customerName, projectTypes }: AdminCreateProjectFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("projectTypeId", selectedType)
    formData.append("name", name)
    formData.append("description", description)

    const result = await adminCreateProject(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setIsOpen(false)
      setSelectedType("")
      setName("")
      setDescription("")
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <FolderPlus className="h-4 w-4" />
        Create Project for Customer
      </Button>
    )
  }

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Create Project for {customerName}</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Project Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  selectedType === type.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="font-medium">{type.name}</div>
                {type.description && <div className="text-sm text-muted-foreground mt-1">{type.description}</div>}
              </button>
            ))}
          </div>
          {projectTypes.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No project types available. Create one in Project Types settings first.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Q4 2024 Audit"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the project..."
            rows={3}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!selectedType || !name || isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}
