"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package, ClipboardList, Files } from "lucide-react"
import { ProjectFilesList } from "@/components/project-files-list"
import { DeliverablesList } from "@/components/deliverables-list"
import { RequiredItemsTable } from "@/components/required-items-table"

interface ProjectDetailTabsProps {
  projectId: string
  requestsWithFiles: any[]
  deliverables: any[]
  customerFiles: any[]
  uploadedFiles: any[]
  pendingCount: number
  providedCount: number
  acceptedCount: number
}

export function ProjectDetailTabs({
  projectId,
  requestsWithFiles,
  deliverables,
  customerFiles,
  uploadedFiles,
  pendingCount,
  providedCount,
  acceptedCount,
}: ProjectDetailTabsProps) {
  return (
    <Tabs defaultValue="support" className="w-full">
      <TabsList className="w-full justify-start bg-[#1a1a1a] border border-white/10 rounded-full h-12 p-1">
        <TabsTrigger
          value="support"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 rounded-full px-6 gap-2"
        >
          <ClipboardList className="h-4 w-4" />
          Required Support
          <span className="ml-1 px-2 py-0.5 text-xs bg-white/10 rounded-full">{requestsWithFiles.length}</span>
        </TabsTrigger>
        <TabsTrigger
          value="deliverables"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 rounded-full px-6 gap-2"
        >
          <Package className="h-4 w-4" />
          Deliverables
          {deliverables.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">{deliverables.length}</span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="files"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 rounded-full px-6 gap-2"
        >
          <Files className="h-4 w-4" />
          All Files
          {customerFiles.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-white/10 rounded-full">{customerFiles.length}</span>
          )}
        </TabsTrigger>
      </TabsList>

      {/* Required Support Tab */}
      <TabsContent value="support" className="mt-6">
        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#1a1a1a] border-white/10 rounded-[45px]">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{pendingCount}</p>
              <p className="text-sm text-white/60">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/20 rounded-[45px]">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{providedCount}</p>
              <p className="text-sm text-white/80">Awaiting Review</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/30 rounded-[45px]">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{acceptedCount}</p>
              <p className="text-sm text-white/80">Accepted</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-white/10 rounded-[45px]">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Required Items</CardTitle>
                <CardDescription className="text-white/60">
                  Upload documents and information needed for your project
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/60">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                  <span className="text-white/60">In Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-white/60">Accepted</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {requestsWithFiles.length === 0 ? (
              <p className="text-white/60 text-center py-8">No required items for this project</p>
            ) : (
              <RequiredItemsTable requests={requestsWithFiles} projectId={projectId} />
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Deliverables Tab */}
      <TabsContent value="deliverables" className="mt-6">
        <Card className="bg-[#1a1a1a] border-white/10 rounded-[45px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your Deliverables
            </CardTitle>
            <CardDescription className="text-white/60">
              Download your completed project files from our team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {deliverables.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-2">No deliverables yet</p>
                <p className="text-white/40 text-sm">
                  Deliverables will appear here once our team completes work on your project
                </p>
              </div>
            ) : (
              <DeliverablesList files={uploadedFiles} projectId={projectId} />
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* All Files Tab */}
      <TabsContent value="files" className="mt-6">
        <Card className="bg-[#1a1a1a] border-white/10 rounded-[45px]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Files className="h-5 w-5" />
              All Uploaded Files
            </CardTitle>
            <CardDescription className="text-white/60">
              View and manage all files you've uploaded to this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            {customerFiles.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-2">No files uploaded yet</p>
                <p className="text-white/40 text-sm">Upload files through the Required Support tab</p>
              </div>
            ) : (
              <ProjectFilesList files={customerFiles} projectId={projectId} showItemName />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
