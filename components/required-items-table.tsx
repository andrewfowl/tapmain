"use client"

import { useState } from "react"
import { CheckCircle, Clock, AlertCircle, Upload, ChevronDown, ChevronRight, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileUploadForm } from "@/components/file-upload-form"
import { ProjectFilesList } from "@/components/project-files-list"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

interface RequiredItemsTableProps {
  requests: any[]
  projectId: string
}

export function RequiredItemsTable({ requests, projectId }: RequiredItemsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "provided":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-white/20 text-white border-white/30"
      case "provided":
        return "bg-white/10 text-white/80 border-white/20"
      default:
        return "bg-white/5 text-white/60 border-white/10"
    }
  }

  const getRowStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-white/[0.03]"
      case "provided":
        return "bg-white/[0.02]"
      default:
        return ""
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10 hover:bg-transparent">
          <TableHead className="w-[40px] text-white/60"></TableHead>
          <TableHead className="text-white/60 font-medium">Item</TableHead>
          <TableHead className="text-white/60 font-medium w-[120px]">Status</TableHead>
          <TableHead className="text-white/60 font-medium w-[100px] text-center">Files</TableHead>
          <TableHead className="text-white/60 font-medium w-[140px] text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => {
          const isExpanded = expandedRows.has(request.id)
          const hasFiles = request.files && request.files.length > 0
          const canUpload = request.status !== "accepted"
          const hasInfo = request.why_needed || request.what_we_do

          return (
            <Collapsible key={request.id} open={isExpanded} onOpenChange={() => toggleRow(request.id)} asChild>
              <>
                <TableRow
                  className={cn(
                    "border-white/10 transition-colors cursor-pointer",
                    getRowStyles(request.status),
                    isExpanded && "border-b-0",
                  )}
                  onClick={() => toggleRow(request.id)}
                >
                  <TableCell className="py-4">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/10">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-white/60" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-white/60" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-white">{request.title}</p>
                        {request.description && (
                          <p className="text-sm text-white/50 mt-0.5 line-clamp-1">{request.description}</p>
                        )}
                      </div>
                      {hasInfo && (
                        <HoverCard>
                          <HoverCardTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-white/10 flex-shrink-0">
                              <Info className="h-3.5 w-3.5 text-white/40 hover:text-white/60" />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent
                            className="w-80 bg-zinc-900 border-white/10 text-white p-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {request.why_needed && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
                                  Why We Need It
                                </p>
                                <p className="text-sm text-white/80">{request.why_needed}</p>
                              </div>
                            )}
                            {request.what_we_do && (
                              <div>
                                <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
                                  What We Do With It
                                </p>
                                <p className="text-sm text-white/80">{request.what_we_do}</p>
                              </div>
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-none",
                        getStatusStyles(request.status),
                      )}
                    >
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FileText className="h-4 w-4 text-white/40" />
                      <span className="text-white/60">{request.files?.length || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    {canUpload && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 rounded-none border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isExpanded) toggleRow(request.id)
                        }}
                      >
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Upload
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <CollapsibleContent asChild>
                  <tr className={cn("border-white/10", getRowStyles(request.status))}>
                    <td colSpan={5} className="p-0">
                      <div className="px-6 py-4 bg-black/20 border-t border-white/5">
                        {/* Uploaded Files */}
                        {hasFiles && (
                          <div className="mb-4">
                            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                              Uploaded Files
                            </p>
                            <ProjectFilesList files={request.files} projectId={projectId} />
                          </div>
                        )}

                        {canUpload && (
                          <div>
                            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                              {hasFiles ? "Upload Additional File" : "Upload File"}
                            </p>
                            <FileUploadForm
                              projectId={projectId}
                              requestId={request.id}
                              acceptedTypes={request.file_types}
                              inline={true}
                            />
                          </div>
                        )}

                        {/* Accepted State */}
                        {request.status === "accepted" && !hasFiles && (
                          <div className="text-center py-2">
                            <p className="text-sm text-white/60">This item has been accepted</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </CollapsibleContent>
              </>
            </Collapsible>
          )
        })}
      </TableBody>
    </Table>
  )
}
