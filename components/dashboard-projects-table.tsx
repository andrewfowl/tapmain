"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable, selectionColumn, statusFilterFn } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { deleteProject } from "@/actions/dashboard-actions"
import { ArrowRight, Plus } from "lucide-react"

type Project = {
  id: string
  name: string
  status: string
  project_types?: { name?: string }
  project_files?: Array<{ count: number }>
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-white/25 text-white"
    case "in_progress":
      return "bg-white/15 text-white/80"
    case "approved":
      return "bg-white/20 text-white"
    case "declined":
      return "bg-white/5 text-white/40"
    default:
      return "bg-white/10 text-white/60"
  }
}

const columns: ColumnDef<Project>[] = [
  selectionColumn,
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => row.original.project_types?.name || "-",
  },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => row.original.project_files?.[0]?.count || 0,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`px-3 py-1 text-xs rounded-none ${getStatusBadge(row.original.status)}`}>
        {row.original.status?.replace("_", " ")}
      </span>
    ),
    filterFn: statusFilterFn,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/dashboard/projects/${row.original.id}`}>
        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
          View <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
    size: 100,
  },
]

export function DashboardProjectsTable({
  projects,
  isApproved,
}: {
  projects: Project[]
  isApproved: boolean
}) {
  const router = useRouter()

  const handleDelete = async (rows: Project[]) => {
    for (const row of rows) {
      if (["pending", "pending_approval", "declined"].includes(row.status)) {
        await deleteProject(row.id)
      }
    }
    router.refresh()
  }

  const deletableProjects = projects.filter((p) => ["pending", "pending_approval", "declined"].includes(p.status))

  return (
    <DataTable
      columns={columns}
      data={projects}
      searchKey="name"
      searchPlaceholder="Search projects..."
      filterKey="status"
      filterOptions={[
        { label: "Pending", value: "pending" },
        { label: "Pending Approval", value: "pending_approval" },
        { label: "Approved", value: "approved" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
        { label: "Declined", value: "declined" },
      ]}
      onDelete={deletableProjects.length > 0 ? handleDelete : undefined}
      actions={
        isApproved ? (
          <Link href="/dashboard/projects/new">
            <Button className="bg-white text-black hover:bg-white/90 rounded-none">
              <Plus className="-ms-1 me-2" size={16} />
              New Project
            </Button>
          </Link>
        ) : null
      }
    />
  )
}
