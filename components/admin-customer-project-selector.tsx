"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCustomerProjects } from "@/actions/admin-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, FolderOpen, ExternalLink, Clock, CheckCircle, XCircle } from "lucide-react"

interface Customer {
  id: string
  full_name: string | null
  email: string
  company_name: string | null
}

interface Project {
  id: string
  name: string
  status: string
  created_at: string
  project_types?: { name: string } | null
}

export function AdminCustomerProjectSelector({ customers }: { customers: Customer[] }) {
  const router = useRouter()
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      if (!selectedCustomerId) {
        setProjects([])
        return
      }

      setLoading(true)
      setError(null)
      console.log("[v0] Fetching projects for customer:", selectedCustomerId)

      try {
        const data = await getCustomerProjects(selectedCustomerId)
        console.log("[v0] Received projects:", data)
        setProjects(data || [])
      } catch (err) {
        console.error("[v0] Error fetching projects:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch projects")
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [selectedCustomerId])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
      case "pending_approval":
        return <Clock className="h-4 w-4" />
      case "declined":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-white/20 text-white"
      case "pending":
      case "pending_approval":
        return "bg-white/10 text-white/80"
      case "declined":
        return "bg-white/5 text-white/60"
      default:
        return "bg-white/10 text-white/80"
    }
  }

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)

  return (
    <Card className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)] mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Quick Project Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Customer Dropdown */}
          <div className="flex-1">
            <label className="text-sm text-white/60 mb-2 block">Select Customer</label>
            <Select
              value={selectedCustomerId}
              onValueChange={(value) => {
                console.log("[v0] Customer selected:", value)
                setSelectedCustomerId(value)
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-[var(--radius-card-inner)]">
                <SelectValue placeholder="Choose a customer..." />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card-inner)]">
                {customers.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={customer.id}
                    className="text-white hover:bg-white/10 focus:bg-white/10 rounded-none"
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-white/40" />
                      <span>{customer.full_name || customer.email}</span>
                      {customer.company_name && (
                        <span className="text-white/40 text-xs">({customer.company_name})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Customer Button */}
          {selectedCustomerId && (
            <div className="flex items-end">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent"
                onClick={() => router.push(`/admin/customers/${selectedCustomerId}`)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Customer
              </Button>
            </div>
          )}
        </div>

        {/* Projects List */}
        {selectedCustomerId && (
          <div className="mt-6">
            <label className="text-sm text-white/60 mb-2 block">
              Projects for {selectedCustomer?.full_name || selectedCustomer?.email}
            </label>

            {loading ? (
              <div className="py-8 text-center text-white/40">Loading projects...</div>
            ) : error ? (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-[var(--radius-card-inner)]">
                <XCircle className="h-8 w-8 text-white/20 mx-auto mb-2" />
                <p className="text-white/40">{error}</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-[var(--radius-card-inner)]">
                <FolderOpen className="h-8 w-8 text-white/20 mx-auto mb-2" />
                <p className="text-white/40">No projects found for this customer</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer rounded-[var(--radius-card-inner)]"
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <p className="text-sm text-white/40">
                        {project.project_types?.name || "Unknown type"} • Created{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${getStatusStyle(project.status)}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status.replace("_", " ")}
                      </span>
                      <ExternalLink className="h-4 w-4 text-white/40" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
