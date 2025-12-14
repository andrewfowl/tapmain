"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable, selectionColumn, statusFilterFn } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Project = {
  id: string
  name: string
  status: string
  profiles?: { full_name?: string; email?: string; company_name?: string }
  project_types?: { name?: string }
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
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <p>{row.original.profiles?.full_name || row.original.profiles?.email}</p>
        <p className="text-sm text-white/40">{row.original.profiles?.company_name || "No company"}</p>
      </div>
    ),
  },
  {
    accessorKey: "project_type",
    header: "Type",
    cell: ({ row }) => row.original.project_types?.name || "-",
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
      <Link href={`/admin/projects/${row.original.id}`}>
        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
          View <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
    size: 100,
  },
]

export function AdminProjectsTable({ projects }: { projects: Project[] }) {
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
    />
  )
}
