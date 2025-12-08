"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  getAllProjectTypes,
  createProjectType,
  deleteProjectType,
  createProjectTypeItem,
  deleteProjectTypeItem,
} from "@/actions/admin-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2, Loader2, FileText, Settings } from "lucide-react"

export default function ProjectTypesPage() {
  const [projectTypes, setProjectTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [createTypeDialog, setCreateTypeDialog] = useState(false)
  const [createItemDialog, setCreateItemDialog] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadProjectTypes()
  }, [])

  async function loadProjectTypes() {
    const types = await getAllProjectTypes()
    setProjectTypes(types)
    setLoading(false)
  }

  async function handleCreateType(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setActionLoading(true)

    const formData = new FormData(e.currentTarget)
    await createProjectType(formData)
    await loadProjectTypes()

    setActionLoading(false)
    setCreateTypeDialog(false)
  }

  async function handleDeleteType(id: string) {
    if (!confirm("Are you sure? This will delete all items in this project type.")) return

    setActionLoading(true)
    await deleteProjectType(id)
    await loadProjectTypes()
    setActionLoading(false)
  }

  async function handleCreateItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setActionLoading(true)

    const formData = new FormData(e.currentTarget)
    await createProjectTypeItem(formData)
    await loadProjectTypes()

    setActionLoading(false)
    setCreateItemDialog(null)
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return

    setActionLoading(true)
    await deleteProjectTypeItem(id)
    await loadProjectTypes()
    setActionLoading(false)
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Project Types</h1>
            <p className="text-white/60">Configure project types and required items</p>
          </div>
          <Button onClick={() => setCreateTypeDialog(true)} className="bg-white text-black hover:bg-white/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Project Type
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-white/40" />
          </div>
        ) : projectTypes.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-white/10">
            <CardContent className="text-center py-16">
              <Settings className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No project types yet</h2>
              <p className="text-white/60 mb-6">Create your first project type to get started</p>
              <Button onClick={() => setCreateTypeDialog(true)} className="bg-white text-black hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Project Type
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {projectTypes.map((type) => (
              <AccordionItem key={type.id} value={type.id} className="border-none">
                <Card className="bg-[#1a1a1a] border-white/10">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white/60" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{type.name}</h3>
                        <p className="text-sm text-white/60">{type.project_type_items?.length || 0} required items</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {type.description && <p className="text-white/60 mb-4">{type.description}</p>}

                    <div className="space-y-3 mb-4">
                      {type.project_type_items?.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-white">{item.name}</p>
                              {item.is_required && <span className="text-xs text-red-500">Required</span>}
                            </div>
                            {item.description && <p className="text-sm text-white/60 mt-1">{item.description}</p>}
                            {item.why_needed && <p className="text-sm text-white/40 mt-1">Why: {item.why_needed}</p>}
                            {item.what_we_do && (
                              <p className="text-sm text-white/40 mt-1">What we do: {item.what_we_do}</p>
                            )}
                            {item.file_types?.length > 0 && (
                              <p className="text-xs text-white/40 mt-1">Accepts: {item.file_types.join(", ")}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500/60 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setCreateItemDialog(type.id)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteType(type.id)}
                        className="text-red-500/60 hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Type
                      </Button>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Create Project Type Dialog */}
        <Dialog open={createTypeDialog} onOpenChange={setCreateTypeDialog}>
          <DialogContent className="bg-[#1a1a1a] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Create Project Type</DialogTitle>
              <DialogDescription className="text-white/60">
                Add a new project type that customers can select
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateType}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Name *</Label>
                  <Input
                    name="name"
                    placeholder="e.g., Financial Audit"
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Describe this project type..."
                    rows={3}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateTypeDialog(false)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={actionLoading} className="bg-white text-black hover:bg-white/90">
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Item Dialog */}
        <Dialog open={!!createItemDialog} onOpenChange={(open) => !open && setCreateItemDialog(null)}>
          <DialogContent className="bg-[#1a1a1a] border-white/10 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white">Add Required Item</DialogTitle>
              <DialogDescription className="text-white/60">
                Define an item that customers need to upload
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateItem}>
              <input type="hidden" name="projectTypeId" value={createItemDialog || ""} />
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label className="text-white/80">Item Name *</Label>
                  <Input
                    name="name"
                    placeholder="e.g., Bank Statements"
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="What is this item?"
                    rows={2}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Why is this needed?</Label>
                  <Textarea
                    name="whyNeeded"
                    placeholder="Explain why customers need to provide this..."
                    rows={2}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">What will you do with it?</Label>
                  <Textarea
                    name="whatWeDo"
                    placeholder="Explain how you'll use this item..."
                    rows={2}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Accepted file types (comma separated)</Label>
                  <Input
                    name="fileTypes"
                    placeholder="e.g., pdf, xlsx, csv"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="isRequired" name="isRequired" value="true" defaultChecked />
                  <Label htmlFor="isRequired" className="text-white/80">
                    This item is required
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateItemDialog(null)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={actionLoading} className="bg-white text-black hover:bg-white/90">
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Item"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
