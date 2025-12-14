"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { uploadDeliverable } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Loader2 } from "lucide-react"

interface Project {
  id: string
  name: string
  status: string
  user_id: string
  profiles: {
    full_name: string | null
    email: string
    company_name: string | null
  } | null
}

interface Customer {
  id: string
  full_name: string | null
  email: string
  company_name: string | null
}

interface AdminDeliverableUploadWithSelectorProps {
  projects: Project[]
  customers: Customer[]
}

export function AdminDeliverableUploadWithSelector({ projects, customers }: AdminDeliverableUploadWithSelectorProps) {
  const router = useRouter()
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  console.log(
    "[v0] Projects received:",
    projects.length,
    projects.map((p) => ({ id: p.id, name: p.name, user_id: p.user_id })),
  )
  console.log(
    "[v0] Customers received:",
    customers.length,
    customers.map((c) => ({ id: c.id, email: c.email })),
  )
  console.log("[v0] Selected customer ID:", selectedCustomerId)

  const filteredProjects = useMemo(() => {
    if (!selectedCustomerId) return []
    const filtered = projects.filter((p) => p.user_id === selectedCustomerId)
    console.log(
      "[v0] Filtered projects for customer",
      selectedCustomerId,
      ":",
      filtered.length,
      filtered.map((p) => ({ id: p.id, name: p.name, user_id: p.user_id })),
    )
    return filtered
  }, [selectedCustomerId, projects])

  const handleCustomerChange = (customerId: string) => {
    setSelectedCustomerId(customerId)
    setSelectedProjectId("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !selectedProjectId) return

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("projectId", selectedProjectId)
    formData.append("file", file)
    formData.append("notes", notes)

    const result = await uploadDeliverable(formData)

    if (result.error) {
      setError(result.error)
      setIsUploading(false)
    } else {
      setFile(null)
      setNotes("")
      setSelectedProjectId("")
      setSelectedCustomerId("")
      setIsUploading(false)
      router.refresh()
    }
  }

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const selectedProject = projects.find((p) => p.id === selectedProjectId)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer" className="text-white/80">
            Select Customer
          </Label>
          <Select value={selectedCustomerId} onValueChange={handleCustomerChange}>
            <SelectTrigger className="bg-black/20 border-white/10 text-white rounded-[var(--radius-card)]">
              <SelectValue placeholder="Choose a customer..." />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id} className="text-white hover:bg-white/10 rounded-none">
                  <div className="flex flex-col items-start">
                    <span>{customer.full_name || customer.email}</span>
                    {customer.company_name && <span className="text-xs text-white/40">{customer.company_name}</span>}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project" className="text-white/80">
            Select Project
          </Label>
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId} disabled={!selectedCustomerId}>
            <SelectTrigger className="bg-black/20 border-white/10 text-white rounded-[var(--radius-card)] disabled:opacity-50">
              <SelectValue placeholder={selectedCustomerId ? "Choose a project..." : "Select customer first"} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
              {filteredProjects.length === 0 ? (
                <div className="px-4 py-2 text-white/40 text-sm">No projects for this customer</div>
              ) : (
                filteredProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="text-white hover:bg-white/10 rounded-none">
                    <div className="flex flex-col items-start">
                      <span>{project.name}</span>
                      <span className="text-xs text-white/40">{project.status}</span>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-white/80">
            Description (optional)
          </Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Final tax return 2024"
            className="bg-black/20 border-white/10 text-white placeholder:text-white/40 rounded-[var(--radius-card)]"
          />
        </div>
      </div>

      {selectedProject && (
        <div className="p-3 bg-white/5 border border-white/10 rounded-[var(--radius-card)]">
          <p className="text-sm text-white/60">
            Uploading to: <span className="text-white font-medium">{selectedProject.name}</span>
          </p>
          <p className="text-xs text-white/40">
            Customer: {selectedCustomer?.full_name || selectedCustomer?.email}
            {selectedCustomer?.company_name && ` (${selectedCustomer.company_name})`}
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="bg-black/20 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:mr-4 file:px-4 file:py-2 rounded-[var(--radius-card)]"
            disabled={!selectedProjectId}
          />
        </div>
        <Button
          type="submit"
          disabled={!file || !selectedProjectId || isUploading}
          className="bg-white text-black hover:bg-white/90 rounded-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Deliverable
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-white/60 bg-white/5 p-2 border border-white/10 rounded-[var(--radius-card)]">
          {error}
        </p>
      )}
    </form>
  )
}
