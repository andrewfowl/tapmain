"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { acceptItemRequest, rejectItemUpload } from "@/actions/admin-actions"
import { Check, X, Loader2 } from "lucide-react"

interface AdminRequestActionsProps {
  requestId: string
  projectId: string
  status: string
}

export function AdminRequestActions({ requestId, projectId, status }: AdminRequestActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAccept = async () => {
    setIsLoading("accept")
    await acceptItemRequest(requestId, projectId)
    setIsLoading(null)
  }

  const handleReject = async () => {
    setIsLoading("reject")
    await rejectItemUpload(requestId, projectId)
    setIsLoading(null)
  }

  if (status === "pending") {
    return null // No actions for pending items (waiting for user upload)
  }

  if (status === "provided") {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10"
          onClick={handleAccept}
          disabled={isLoading !== null}
        >
          {isLoading === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          <span className="ml-1">Accept</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10"
          onClick={handleReject}
          disabled={isLoading !== null}
        >
          {isLoading === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          <span className="ml-1">Request Re-upload</span>
        </Button>
      </div>
    )
  }

  return null
}
