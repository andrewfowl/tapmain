"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { getProjectTypes, createProject } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, AlertCircle, FileText, CheckCircle } from "lucide-react"

export default function NewProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [projectTypes, setProjectTypes] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjectTypes() {
      const types = await getProjectTypes()
      setProjectTypes(types)

      const typeParam = searchParams.get("type")
      if (typeParam && types.some((t: any) => t.id === typeParam)) {
        setSelectedType(typeParam)
      }
    }
    loadProjectTypes()
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedType) {
      setError("Please select a project type")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set("projectTypeId", selectedType)

    const result = await createProject(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push(`/dashboard/projects/${result.project?.id}`)
    }
  }

  const selectedTypeData = projectTypes.find((t) => t.id === selectedType)

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Create New Project</h1>

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Project Type */}
          <Card className="bg-[#1a1a1a] border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">1. Select Project Type</CardTitle>
              <CardDescription className="text-white/60">Choose the type of project you want to create</CardDescription>
            </CardHeader>
            <CardContent>
              {projectTypes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/60">No project types available. Please contact support.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        selectedType === type.id
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white">{type.name}</h3>
                            {selectedType === type.id && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-white/60 mt-1">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Project Details */}
          <Card className="bg-[#1a1a1a] border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">2. Project Details</CardTitle>
              <CardDescription className="text-white/60">Provide information about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Project Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Q4 2024 Financial Audit"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/80">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the project..."
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </CardContent>
          </Card>

          {/* Required Items Preview */}
          {selectedTypeData?.project_type_items?.length > 0 && (
            <Card className="bg-[#1a1a1a] border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Required Items</CardTitle>
                <CardDescription className="text-white/60">
                  You'll need to upload these items after creating the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTypeData.project_type_items
                    .sort((a: any, b: any) => a.display_order - b.display_order)
                    .map((item: any) => (
                      <div key={item.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${item.is_required ? "bg-red-500" : "bg-white/40"}`}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">
                              {item.name}
                              {item.is_required && <span className="text-red-500 ml-1">*</span>}
                            </h4>
                            {item.description && <p className="text-sm text-white/60 mt-1">{item.description}</p>}
                            {item.why_needed && (
                              <p className="text-sm text-white/40 mt-2">
                                <strong>Why needed:</strong> {item.why_needed}
                              </p>
                            )}
                            {item.file_types?.length > 0 && (
                              <p className="text-xs text-white/40 mt-2">
                                Accepted: {item.file_types.join(", ").toUpperCase()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4">
            <Link href="/dashboard/projects">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-white text-black hover:bg-white/90"
              disabled={isLoading || !selectedType}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
