import Link from "next/link"
import { getAdminStats, getPendingSubscriptions } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FolderOpen, Clock, Bell, ArrowRight } from "lucide-react"

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()
  const pendingSubscriptions = await getPendingSubscriptions()

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Overview of your platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/60">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-white/40" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCustomers}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/60">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-white/40" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingSubscriptions}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/60">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-white/40" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/60">Pending Requests</CardTitle>
              <Bell className="h-4 w-4 text-white/40" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingRequests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Subscriptions */}
        {pendingSubscriptions.length > 0 && (
          <Card className="bg-[#1a1a1a] border-white/10 mb-8 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Pending Subscription Approvals</CardTitle>
                <CardDescription className="text-white/60">Review and approve customer subscriptions</CardDescription>
              </div>
              <Link href="/admin/subscriptions">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-none"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSubscriptions.slice(0, 5).map((sub: any) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{sub.profiles?.full_name || sub.profiles?.email}</p>
                      <p className="text-sm text-white/60">{sub.profiles?.company_name || "No company"}</p>
                    </div>
                    <Link href="/admin/subscriptions">
                      <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-none">
                        Review
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/subscriptions">
            <Card className="bg-[#1a1a1a] border-white/10 hover:border-white/20 transition-colors cursor-pointer rounded-none">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-white/60 mb-4" />
                <h3 className="font-semibold text-white mb-2">Manage Subscriptions</h3>
                <p className="text-sm text-white/60">Approve or reject customer subscriptions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/customers">
            <Card className="bg-[#1a1a1a] border-white/10 hover:border-white/20 transition-colors cursor-pointer rounded-none">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-white/60 mb-4" />
                <h3 className="font-semibold text-white mb-2">View Customers</h3>
                <p className="text-sm text-white/60">Browse customers and their projects</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/project-types">
            <Card className="bg-[#1a1a1a] border-white/10 hover:border-white/20 transition-colors cursor-pointer rounded-none">
              <CardContent className="p-6">
                <FolderOpen className="h-8 w-8 text-white/60 mb-4" />
                <h3 className="font-semibold text-white mb-2">Project Types</h3>
                <p className="text-sm text-white/60">Configure project types and required items</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
