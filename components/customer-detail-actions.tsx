"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Trash2, Snowflake, Sun } from "lucide-react"
import { deleteCustomer, freezeSubscription, unfreezeSubscription } from "@/actions/admin-actions"

type Props = {
  customerId: string
  customerName: string
  subscription?: { id: string; status: string } | null
}

export function CustomerDetailActions({ customerId, customerName, subscription }: Props) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFreezing, setIsFreezing] = useState(false)

  const isFrozen = subscription?.status === "frozen"

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteCustomer(customerId)
    setIsDeleting(false)
    if (result.success) {
      router.push("/admin/customers")
    }
  }

  const handleFreeze = async () => {
    if (!subscription) return
    setIsFreezing(true)
    if (isFrozen) {
      await unfreezeSubscription(subscription.id)
    } else {
      await freezeSubscription(subscription.id)
    }
    setIsFreezing(false)
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
          {subscription && (
            <DropdownMenuItem
              onClick={handleFreeze}
              disabled={isFreezing}
              className="flex items-center gap-2 cursor-pointer"
            >
              {isFrozen ? (
                <>
                  <Sun className="h-4 w-4" /> Unfreeze Subscription
                </>
              ) : (
                <>
                  <Snowflake className="h-4 w-4" /> Freeze Subscription
                </>
              )}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white"
          >
            <Trash2 className="h-4 w-4" /> Delete Customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#1a1a1a] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Customer</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to delete {customerName}? This will permanently delete all their projects, files,
              and subscription data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 text-white border-white/10 hover:bg-white/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
