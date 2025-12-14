"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable, selectionColumn } from "@/components/ui/data-table"
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
import { MoreHorizontal, Eye, Trash2, Snowflake, CheckCircle, Clock, XCircle, Sun } from "lucide-react"
import { deleteCustomer, freezeSubscription, unfreezeSubscription } from "@/actions/admin-actions"

type Customer = {
  id: string
  full_name?: string
  email: string
  company_name?: string
  subscriptions?: Array<{ id: string; status: string }>
  customer_projects?: Array<{ count: number }>
}

function CustomerActions({ customer }: { customer: Customer }) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFreezing, setIsFreezing] = useState(false)

  const subscription = customer.subscriptions?.[0]
  const isFrozen = subscription?.status === "frozen"

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteCustomer(customer.id)
    setIsDeleting(false)
    setShowDeleteDialog(false)
    if (result.success) {
      router.refresh()
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
          <DropdownMenuItem asChild>
            <Link href={`/admin/customers/${customer.id}`} className="flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" /> View Details
            </Link>
          </DropdownMenuItem>
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
              Are you sure you want to delete {customer.full_name || customer.email}? This will permanently delete all
              their projects, files, and subscription data. This action cannot be undone.
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

const columns: ColumnDef<Customer>[] = [
  selectionColumn,
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.full_name || "Unknown"}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company_name",
    header: "Company",
    cell: ({ row }) => row.original.company_name || "-",
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => row.original.customer_projects?.[0]?.count || 0,
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
    cell: ({ row }) => {
      const status = row.original.subscriptions?.[0]?.status
      if (status === "approved") {
        return (
          <span className="flex items-center gap-1 text-white text-sm">
            <CheckCircle className="h-4 w-4" /> Approved
          </span>
        )
      } else if (status === "pending") {
        return (
          <span className="flex items-center gap-1 text-white/80 text-sm">
            <Clock className="h-4 w-4" /> Pending
          </span>
        )
      } else if (status === "frozen") {
        return (
          <span className="flex items-center gap-1 text-white/60 text-sm">
            <Snowflake className="h-4 w-4" /> Frozen
          </span>
        )
      } else {
        return (
          <span className="flex items-center gap-1 text-white/60 text-sm">
            <XCircle className="h-4 w-4" /> {status || "None"}
          </span>
        )
      }
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <CustomerActions customer={row.original} />,
    size: 50,
  },
]

export function AdminCustomersTable({ customers }: { customers: Customer[] }) {
  const router = useRouter()
  const [bulkDeleteDialog, setBulkDeleteDialog] = useState(false)
  const [bulkFreezeDialog, setBulkFreezeDialog] = useState(false)
  const [selectedForBulk, setSelectedForBulk] = useState<Customer[]>([])
  const [clearSelectionFn, setClearSelectionFn] = useState<(() => void) | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBulkDelete = async () => {
    setIsProcessing(true)
    for (const customer of selectedForBulk) {
      await deleteCustomer(customer.id)
    }
    setIsProcessing(false)
    setBulkDeleteDialog(false)
    clearSelectionFn?.()
    router.refresh()
  }

  const handleBulkFreeze = async () => {
    setIsProcessing(true)
    for (const customer of selectedForBulk) {
      const subscription = customer.subscriptions?.[0]
      if (subscription) {
        await freezeSubscription(subscription.id)
      }
    }
    setIsProcessing(false)
    setBulkFreezeDialog(false)
    clearSelectionFn?.()
    router.refresh()
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={customers}
        searchKey="email"
        searchPlaceholder="Search by email..."
        bulkActions={(selected, clearSelection) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-white/10 bg-white/5"
              onClick={() => {
                setSelectedForBulk(selected as Customer[])
                setClearSelectionFn(() => clearSelection)
                setBulkFreezeDialog(true)
              }}
            >
              <Snowflake className="h-4 w-4 mr-2" />
              Freeze ({selected.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-white/10 bg-white/5"
              onClick={() => {
                setSelectedForBulk(selected as Customer[])
                setClearSelectionFn(() => clearSelection)
                setBulkDeleteDialog(true)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selected.length})
            </Button>
          </div>
        )}
      />

      {/* Bulk Delete Dialog */}
      <AlertDialog open={bulkDeleteDialog} onOpenChange={setBulkDeleteDialog}>
        <AlertDialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete {selectedForBulk.length} Customers</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to delete {selectedForBulk.length} customers? This will permanently delete all their
              projects, files, and subscription data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 text-white border-white/10 hover:bg-white/20 rounded-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isProcessing}
              className="bg-white/20 text-white hover:bg-white/30 rounded-none"
            >
              {isProcessing ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Freeze Dialog */}
      <AlertDialog open={bulkFreezeDialog} onOpenChange={setBulkFreezeDialog}>
        <AlertDialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Freeze {selectedForBulk.length} Subscriptions</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to freeze subscriptions for {selectedForBulk.length} customers? They will not be
              able to create new projects until unfrozen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 text-white border-white/10 hover:bg-white/20 rounded-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkFreeze}
              disabled={isProcessing}
              className="bg-white/20 text-white hover:bg-white/30 rounded-none"
            >
              {isProcessing ? "Freezing..." : "Freeze All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
