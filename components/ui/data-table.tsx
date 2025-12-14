"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table"
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
  CircleX,
  Columns3,
  Trash,
  CircleAlert,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  filterKey?: string
  filterOptions?: { label: string; value: string }[]
  onDelete?: (rows: TData[]) => void
  bulkActions?: (selectedRows: TData[], clearSelection: () => void) => React.ReactNode
  actions?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  filterKey,
  filterOptions,
  onDelete,
  bulkActions,
  actions,
}: DataTableProps<TData, TValue>) {
  const id = React.useId()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const inputRef = React.useRef<HTMLInputElement>(null)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const searchValue = searchKey ? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? "") : ""

  const handleDeleteSelected = () => {
    if (onDelete) {
      onDelete(selectedRows.map((row) => row.original))
      table.resetRowSelection()
    }
  }

  const clearSelection = () => table.resetRowSelection()

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Search */}
          {searchKey && (
            <div className="relative">
              <Input
                ref={inputRef}
                className={cn("min-w-60 ps-9 bg-white/5 border-white/10 rounded-none", searchValue && "pe-9")}
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-white/40">
                <ListFilter size={16} />
              </div>
              {searchValue && (
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-white/40 hover:text-white"
                  onClick={() => {
                    table.getColumn(searchKey)?.setFilterValue("")
                    inputRef.current?.focus()
                  }}
                >
                  <CircleX size={16} />
                </button>
              )}
            </div>
          )}

          {/* Status Filter */}
          {filterKey && filterOptions && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-none border-white/10 bg-white/5">
                  <ListFilter className="-ms-1 me-2 opacity-60" size={16} />
                  Status
                  {(table.getColumn(filterKey)?.getFilterValue() as string[])?.length > 0 && (
                    <span className="-me-1 ms-3 inline-flex h-5 items-center rounded-none border border-white/10 bg-white/5 px-1 text-[0.625rem] font-medium text-white/60">
                      {(table.getColumn(filterKey)?.getFilterValue() as string[]).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-36 p-3 rounded-none bg-zinc-900 border-white/10" align="start">
                <div className="space-y-3">
                  <div className="text-xs font-medium text-white/40">Filter by status</div>
                  <div className="space-y-3">
                    {filterOptions.map((option, i) => {
                      const filterValue = (table.getColumn(filterKey)?.getFilterValue() as string[]) || []
                      const isChecked = filterValue.includes(option.value)
                      return (
                        <div key={option.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`${id}-filter-${i}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...filterValue, option.value]
                                : filterValue.filter((v) => v !== option.value)
                              table.getColumn(filterKey)?.setFilterValue(newValue.length ? newValue : undefined)
                            }}
                            className="rounded-none"
                          />
                          <Label htmlFor={`${id}-filter-${i}`} className="text-sm font-normal text-white/80">
                            {option.label}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none border-white/10 bg-white/5">
                <Columns3 className="-ms-1 me-2 opacity-60" size={16} />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none bg-zinc-900 border-white/10">
              <DropdownMenuLabel className="text-white/60">Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          {bulkActions &&
            selectedRows.length > 0 &&
            bulkActions(
              selectedRows.map((row) => row.original),
              clearSelection,
            )}

          {/* Bulk Delete */}
          {onDelete && selectedRows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="rounded-none border-white/10 bg-white/5">
                  <Trash className="-ms-1 me-2 opacity-60" size={16} />
                  Delete
                  <span className="-me-1 ms-3 inline-flex h-5 items-center rounded-none border border-white/10 bg-white/5 px-1 text-[0.625rem] font-medium text-white/60">
                    {selectedRows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-none bg-zinc-900 border-white/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-none border border-white/10">
                    <CircleAlert className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {selectedRows.length} selected{" "}
                      {selectedRows.length === 1 ? "item" : "items"}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteSelected} className="rounded-none">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Custom Actions */}
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-white/10 bg-white/5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/10 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 text-white/60"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        className="flex items-center gap-2 hover:text-white"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp size={14} />,
                          desc: <ChevronDown size={14} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-white/10 hover:bg-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-white/80">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-white/40">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-white/40">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/40">Rows per page</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px] rounded-none border-white/10 bg-white/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-zinc-900 border-white/10">
                {[10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-white/40">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-white/10 bg-white/5"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-white/10 bg-white/5"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-white/10 bg-white/5"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-white/10 bg-white/5"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper components for column definitions
export function DataTableColumnHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return <span className="font-medium">{children}</span>
}

export function DataTableRowActions({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex items-center gap-2">{children}</div>
}

// Selection column helper
export const selectionColumn: ColumnDef<any, any> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="rounded-none"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="rounded-none"
    />
  ),
  size: 40,
  enableSorting: false,
  enableHiding: false,
}

// Status filter function
export const statusFilterFn: FilterFn<any> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId) as string
  return filterValue.includes(status)
}
