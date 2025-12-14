"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { deleteDeliverable } from "@/actions/admin-actions"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Download, Trash2, ExternalLink } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Deliverable {
  id: string
  file_name: string
  file_url: string
  file_size: number | null
  notes: string | null
  created_at: string
  project_id: string
  customer_projects: {
    id: string
    name: string
    user_id: string
    profiles: {
      full_name: string | null
      email: string
      company_name: string | null
    } | null
  } | null
}

interface AdminDeliverablesTableProps {
  deliverables: Deliverable[]
}

export function AdminDeliverablesTable({ deliverables }: AdminDeliverablesTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string, projectId: string) => {
    setDeletingId(id)
    await deleteDeliverable(id, projectId)
    setDeletingId(null)
    router.refresh()
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-"
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDescription = (notes: string | null) => {
    if (!notes) return "-"
    return notes.replace("[DELIVERABLE]", "").trim() || "-"
  }

  const columns: ColumnDef<Deliverable>[] = [
    {
      accessorKey: "file_name",
      header: "File Name",
      cell: ({ row }) => <div className="font-medium text-white">{row.original.file_name}</div>,
    },
    {
      accessorKey: "customer_projects.name",
      header: "Project",
      cell: ({ row }) => (
        <Link
          href={`/admin/projects/${row.original.project_id}`}
          className="text-white/80 hover:text-white hover:underline"
        >
          {row.original.customer_projects?.name || "Unknown"}
        </Link>
      ),
    },
    {
      accessorKey: "customer_projects.profiles.full_name",
      header: "Customer",
      cell: ({ row }) => {
        const profiles = row.original.customer_projects?.profiles
        return (
          <div>
            <div className="text-white/80">{profiles?.full_name || profiles?.email || "Unknown"}</div>
            {profiles?.company_name && <div className="text-xs text-white/40">{profiles.company_name}</div>}
          </div>
        )
      },
    },
    {
      accessorKey: "notes",
      header: "Description",
      cell: ({ row }) => <span className="text-white/60">{getDescription(row.original.notes)}</span>,
    },
    {
      accessorKey: "file_size",
      header: "Size",
      cell: ({ row }) => <span className="text-white/60">{formatFileSize(row.original.file_size)}</span>,
    },
    {
      accessorKey: "created_at",
      header: "Uploaded",
      cell: ({ row }) => <span className="text-white/60">{formatDate(row.original.created_at)}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
          >
            <a href={row.original.file_url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
          >
            <Link href={`/admin/projects/${row.original.project_id}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10"
                disabled={deletingId === row.original.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Delete Deliverable</AlertDialogTitle>
                <AlertDialogDescription className="text-white/60">
                  Are you sure you want to delete "{row.original.file_name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10 rounded-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.original.id, row.original.project_id)}
                  className="bg-white text-black hover:bg-white/90 rounded-none"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ]

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No deliverables uploaded yet</p>
      </div>
    )
  }

  return (
    <DataTable columns={columns} data={deliverables} searchKey="file_name" searchPlaceholder="Search deliverables..." />
  )
}
