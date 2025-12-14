"use client"

import { useState } from "react"
import { deleteProject } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
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
import { Trash2, Loader2 } from "lucide-react"

interface DeleteProjectButtonProps {
  projectId: string
  projectName: string
}

export function DeleteProjectButton({ projectId, projectName }: DeleteProjectButtonProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const result = await deleteProject(projectId)
    setLoading(false)

    if (result.error) {
      alert(result.error)
    } else {
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-white/10 text-white/60 hover:text-white hover:bg-white/10 bg-transparent rounded-none"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
          <AlertDialogDescription className="text-white/60">
            Are you sure you want to delete "{projectName}"? This action cannot be undone and will remove all associated
            files and requests.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-white text-black hover:bg-white/90 rounded-none"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
