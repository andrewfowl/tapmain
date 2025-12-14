"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { acceptItemRequest, rejectItemUpload, cancelItemRequest } from "@/actions/admin-actions"
import { Check, X, Loader2, Download, Ban } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface FileInfo {
  id: string
  file_name: string
  file_url: string
  file_size?: number
}

interface AdminRequestActionsProps {
  requestId: string
  projectId: string
  status: string
  files?: FileInfo[]
}

export function AdminRequestActions({ requestId, projectId, status, files = [] }: AdminRequestActionsProps) {
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

  const handleCancel = async () => {
    setIsLoading("cancel")
    await cancelItemRequest(requestId, projectId)
    setIsLoading(null)
  }

  const handleDownloadAll = () => {
    files.forEach((file) => {
      window.open(file.file_url, "_blank")
    })
  }

  // For accepted or cancelled status, only show download if files exist
  if (status === "accepted" || status === "cancelled") {
    if (files.length === 0) return null
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
          {files.map((file) => (
            <DropdownMenuItem key={file.id} asChild>
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer"
              >
                <Download className="h-4 w-4" />
                {file.file_name}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // For provided status - show accept/reject and downloads
  if (status === "provided") {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-white hover:text-white hover:bg-white/10"
          onClick={handleAccept}
          disabled={isLoading !== null}
        >
          {isLoading === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          <span className="ml-1">Accept</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-white/60 hover:text-white hover:bg-white/10"
          onClick={handleReject}
          disabled={isLoading !== null}
        >
          {isLoading === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          <span className="ml-1">Re-upload</span>
        </Button>
        {files.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-white/60 hover:text-white hover:bg-white/10">
                <Download className="h-4 w-4" />
                <span className="ml-1">{files.length}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
              {files.length > 1 && (
                <>
                  <DropdownMenuItem
                    onClick={handleDownloadAll}
                    className="text-white/80 hover:text-white cursor-pointer"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                </>
              )}
              {files.map((file) => (
                <DropdownMenuItem key={file.id} asChild>
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    {file.file_name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    )
  }

  // For pending status - show cancel option
  if (status === "pending") {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="h-8 px-2 text-white/40 hover:text-white hover:bg-white/10"
        onClick={handleCancel}
        disabled={isLoading !== null}
      >
        {isLoading === "cancel" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
        <span className="ml-1">Cancel</span>
      </Button>
    )
  }

  return null
}
