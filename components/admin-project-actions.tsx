"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateProjectStatus } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Loader2, Check, X, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminProjectActionsProps {
  projectId: string
  currentStatus: string
}

const approvalStatuses = [
  { value: "pending_approval", label: "Pending Approval", color: "bg-white/10 text-white/60" },
  { value: "approved", label: "Approved", color: "bg-white/20 text-white" },
  { value: "declined", label: "Declined", color: "bg-white/5 text-white/40" },
]

const workStatuses = [
  { value: "draft", label: "Draft", color: "bg-white/10 text-white/60" },
  { value: "in_progress", label: "In Progress", color: "bg-white/15 text-white/80" },
  { value: "review", label: "Review", color: "bg-white/20 text-white/90" },
  { value: "completed", label: "Completed", color: "bg-white/25 text-white" },
]

const allStatuses = [...approvalStatuses, ...workStatuses]

const allowedTransitions: Record<string, { allowed: string[]; reason: string }> = {
  draft: {
    allowed: ["pending_approval"],
    reason: "Draft projects can only be submitted for approval",
  },
  pending_approval: {
    allowed: ["approved", "declined", "draft"],
    reason: "Pending projects can be approved, declined, or returned to draft",
  },
  approved: {
    allowed: ["in_progress", "declined"],
    reason: "Approved projects can start work or be declined if needed",
  },
  declined: {
    allowed: ["pending_approval", "draft"],
    reason: "Declined projects can be resubmitted or returned to draft",
  },
  in_progress: {
    allowed: ["review", "approved"],
    reason: "In progress projects can be sent for review or paused",
  },
  review: {
    allowed: ["in_progress", "completed"],
    reason: "Projects in review can be returned for more work or completed",
  },
  completed: {
    allowed: ["review"],
    reason: "Completed projects can only be reopened for review",
  },
}

export function AdminProjectActions({ projectId, currentStatus }: AdminProjectActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  function canTransitionTo(targetStatus: string): boolean {
    const transitions = allowedTransitions[currentStatus]
    if (!transitions) return true // Allow if no rules defined
    return transitions.allowed.includes(targetStatus)
  }

  function getTransitionReason(): string {
    return allowedTransitions[currentStatus]?.reason || "Status change allowed"
  }

  async function handleStatusChange(status: string) {
    if (!canTransitionTo(status)) {
      toast({
        title: "Status change not allowed",
        description: getTransitionReason(),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    const result = await updateProjectStatus(projectId, status)
    setLoading(false)

    if (result.error) {
      toast({
        title: "Error updating status",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Status updated",
        description: `Project status changed to ${allStatuses.find((s) => s.value === status)?.label}`,
      })
      router.refresh()
    }
  }

  async function handleApprove() {
    setLoading(true)
    const result = await updateProjectStatus(projectId, "approved")
    setLoading(false)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Project Approved",
        description: "The project has been approved and the customer has been notified.",
      })
      router.refresh()
    }
  }

  async function handleDecline() {
    setLoading(true)
    const result = await updateProjectStatus(projectId, "declined")
    setLoading(false)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Project Declined",
        description: "The project has been declined.",
      })
      router.refresh()
    }
  }

  const statusLabel = currentStatus.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const isPending = currentStatus === "pending" || currentStatus === "pending_approval"
  const isApproved = currentStatus === "approved"
  const isDeclined = currentStatus === "declined"

  return (
    <div className="flex items-center gap-3">
      {/* Status Badge */}
      <span
        className={`px-4 py-2 text-sm rounded-full ${
          isApproved ? "bg-white/20 text-white" : isDeclined ? "bg-white/5 text-white/40" : "bg-white/10 text-white/60"
        }`}
      >
        {statusLabel}
      </span>

      {/* Action Buttons - only show for pending projects */}
      {isPending && (
        <>
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="bg-white text-black hover:bg-white/90 rounded-full"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
            Approve
          </Button>
          <Button
            variant="outline"
            onClick={handleDecline}
            disabled={loading}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full"
          >
            <X className="h-4 w-4 mr-2" />
            Decline
          </Button>
        </>
      )}

      {/* Allow re-approval of declined projects */}
      {isDeclined && (
        <Button
          onClick={handleApprove}
          disabled={loading}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
          Re-approve
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-none"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <span
                className={`px-2 py-1 rounded-none text-xs mr-2 ${allStatuses.find((s) => s.value === currentStatus)?.color}`}
              >
                {allStatuses.find((s) => s.value === currentStatus)?.label}
              </span>
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 rounded-none min-w-[200px]">
          <DropdownMenuLabel className="text-white/40 text-xs font-normal">Approval Workflow</DropdownMenuLabel>
          {approvalStatuses.map((status) => {
            const isAllowed = canTransitionTo(status.value)
            const isCurrent = status.value === currentStatus
            return (
              <DropdownMenuItem
                key={status.value}
                onClick={() => !isCurrent && handleStatusChange(status.value)}
                className={`text-white rounded-none ${
                  isCurrent
                    ? "bg-white/10 cursor-default"
                    : isAllowed
                      ? "hover:bg-white/10 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                }`}
                disabled={!isAllowed || isCurrent}
              >
                <span className={`px-2 py-1 rounded-none text-xs mr-2 ${status.color}`}>{status.label}</span>
                {isCurrent && <Check className="h-3 w-3 ml-auto" />}
                {!isAllowed && !isCurrent && <AlertCircle className="h-3 w-3 ml-auto text-white/30" />}
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuLabel className="text-white/40 text-xs font-normal">Project Progress</DropdownMenuLabel>
          {workStatuses.map((status) => {
            const isAllowed = canTransitionTo(status.value)
            const isCurrent = status.value === currentStatus
            return (
              <DropdownMenuItem
                key={status.value}
                onClick={() => !isCurrent && handleStatusChange(status.value)}
                className={`text-white rounded-none ${
                  isCurrent
                    ? "bg-white/10 cursor-default"
                    : isAllowed
                      ? "hover:bg-white/10 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                }`}
                disabled={!isAllowed || isCurrent}
              >
                <span className={`px-2 py-1 rounded-none text-xs mr-2 ${status.color}`}>{status.label}</span>
                {isCurrent && <Check className="h-3 w-3 ml-auto" />}
                {!isAllowed && !isCurrent && <AlertCircle className="h-3 w-3 ml-auto text-white/30" />}
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator className="bg-white/10" />
          <div className="px-2 py-2 text-xs text-white/40">{getTransitionReason()}</div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
