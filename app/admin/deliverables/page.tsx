import { getAllDeliverables, getProjectsForDeliverableUpload, getAllCustomers } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { AdminDeliverablesTable } from "@/components/admin-deliverables-table"
import { AdminDeliverableUploadWithSelector } from "@/components/admin-deliverable-upload-with-selector"

export default async function AdminDeliverablesPage() {
  const [deliverables, projects, customers] = await Promise.all([
    getAllDeliverables(),
    getProjectsForDeliverableUpload(),
    getAllCustomers(),
  ])

  const customerList = customers.map((c) => ({
    id: c.id,
    full_name: c.full_name,
    email: c.email,
    company_name: c.company_name,
  }))

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Deliverables</h1>
          <p className="text-white/60">Manage deliverables across all customer projects</p>
        </div>

        <Card className="bg-[#1a1a1a] border-white/10 mb-6 rounded-[var(--radius-card)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Upload New Deliverable
            </CardTitle>
            <CardDescription className="text-white/60">
              Select a customer and project, then upload completed work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDeliverableUploadWithSelector projects={projects} customers={customerList} />
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
          <CardHeader>
            <CardTitle className="text-white">All Deliverables ({deliverables.length})</CardTitle>
            <CardDescription className="text-white/60">
              View and manage all deliverables across projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDeliverablesTable deliverables={deliverables} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
