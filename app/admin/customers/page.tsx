import Link from "next/link"
import { getAllCustomers } from "@/actions/admin-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FolderOpen, CheckCircle, Clock, XCircle } from "lucide-react"

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
        <p className="text-white/60 mb-8">View and manage customer accounts</p>

        {customers.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-white/10">
            <CardContent className="text-center py-16">
              <Users className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No customers yet</h2>
              <p className="text-white/60">Customers will appear here once they sign up</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {customers.map((customer: any) => {
              const subscription = customer.subscriptions?.[0]
              const projectCount = customer.customer_projects?.[0]?.count || 0

              return (
                <Link key={customer.id} href={`/admin/customers/${customer.id}`}>
                  <Card className="bg-[#1a1a1a] border-white/10 hover:border-white/20 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-white/60" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{customer.full_name || "Unknown"}</h3>
                            <p className="text-sm text-white/60">{customer.email}</p>
                            <p className="text-sm text-white/40">{customer.company_name || "No company"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-white/60">
                              <FolderOpen className="h-4 w-4" />
                              <span className="text-sm">{projectCount} projects</span>
                            </div>
                          </div>
                          <div>
                            {subscription?.status === "approved" ? (
                              <span className="flex items-center gap-1 text-green-500 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                Approved
                              </span>
                            ) : subscription?.status === "pending" ? (
                              <span className="flex items-center gap-1 text-yellow-500 text-sm">
                                <Clock className="h-4 w-4" />
                                Pending
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-500 text-sm">
                                <XCircle className="h-4 w-4" />
                                Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
