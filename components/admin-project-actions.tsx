"use client"

import { useState } from "react"
import { updateProjectStatus } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Loader2 } from "lucide-react"

interface AdminProjectActionsProps {
  projectId: string
  currentStatus: string
}

const statuses = [
  { value: "draft", label: "Draft", color: "bg-white/10 text-white/60" },
  { value: "in_progress", label: "In Progress", color: "bg-blue-500/20 text-blue-500" },
  { value: "review", label: "Review", color: "bg-yellow-500/20 text-yellow-500" },
  { value: "completed", label: "Completed", color: "bg-green-500/20 text-green-500" },
]

export function AdminProjectActions({ projectId, currentStatus }: AdminProjectActionsProps) {
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(status: string) {
    setLoading(true)
    await updateProjectStatus(projectId, status)
    setLoading(false)
  }

  const current = statuses.find((s) => s.value === currentStatus)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <span className={`px-2 py-1 rounded text-xs mr-2 ${current?.color}`}>{current?.label}</span>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1a1a1a] border-white/10">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className="text-white hover:bg-white/10 cursor-pointer"
          >
            <span className={`px-2 py-1 rounded text-xs mr-2 ${status.color}`}>{status.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
