import { getAllCustomers } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminCustomersTable } from "@/components/admin-customers-table"
import { AdminCustomerProjectSelector } from "@/components/admin-customer-project-selector"
import { Users } from "lucide-react"

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-white/60">View and manage customer accounts</p>
        </div>

        <AdminCustomerProjectSelector
          customers={customers.map((c) => ({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            company_name: c.company_name,
          }))}
        />

        <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Customers ({customers.length})
            </CardTitle>
            <CardDescription className="text-white/60">Search, filter, and manage customer accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No customers yet</h2>
                <p className="text-white/60">Customers will appear here once they sign up</p>
              </div>
            ) : (
              <AdminCustomersTable customers={customers} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
