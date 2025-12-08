"use client"

import { useState, useEffect } from "react"
import { getAllSubscriptions, approveSubscription, rejectSubscription } from "@/actions/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    loadSubscriptions()
  }, [])

  async function loadSubscriptions() {
    const data = await getAllSubscriptions()
    setSubscriptions(data)
    setLoading(false)
  }

  async function handleApprove(id: string) {
    setActionLoading(id)
    await approveSubscription(id)
    await loadSubscriptions()
    setActionLoading(null)
  }

  async function handleReject() {
    if (!rejectDialog.id) return
    setActionLoading(rejectDialog.id)
    await rejectSubscription(rejectDialog.id, rejectReason)
    await loadSubscriptions()
    setActionLoading(null)
    setRejectDialog({ open: false, id: null })
    setRejectReason("")
  }

  const pending = subscriptions.filter((s) => s.status === "pending")
  const approved = subscriptions.filter((s) => s.status === "approved")
  const rejected = subscriptions.filter((s) => s.status === "rejected")

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Subscriptions</h1>
        <p className="text-white/60 mb-8">Manage customer subscription requests</p>

        {/* Pending */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Pending Approval ({pending.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-white/40" />
              </div>
            ) : pending.length === 0 ? (
              <p className="text-white/60 text-center py-8">No pending subscriptions</p>
            ) : (
              <div className="space-y-4">
                {pending.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <p className="text-sm text-white/60">{sub.profiles?.email}</p>
                      <p className="text-sm text-white/40">{sub.profiles?.company_name || "No company"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(sub.id)}
                        disabled={actionLoading === sub.id}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {actionLoading === sub.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectDialog({ open: true, id: sub.id })}
                        className="border-red-500/50 text-red-500 hover:bg-red-500/10 bg-transparent"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approved */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Approved ({approved.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {approved.length === 0 ? (
              <p className="text-white/60 text-center py-8">No approved subscriptions</p>
            ) : (
              <div className="space-y-4">
                {approved.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <p className="text-sm text-white/60">{sub.profiles?.email}</p>
                    </div>
                    <span className="text-sm text-green-500">Approved</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rejected */}
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Rejected ({rejected.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rejected.length === 0 ? (
              <p className="text-white/60 text-center py-8">No rejected subscriptions</p>
            ) : (
              <div className="space-y-4">
                {rejected.map((sub) => (
                  <div key={sub.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <span className="text-sm text-red-500">Rejected</span>
                    </div>
                    <p className="text-sm text-white/60">{sub.profiles?.email}</p>
                    {sub.rejection_reason && (
                      <p className="text-sm text-white/40 mt-2">Reason: {sub.rejection_reason}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reject Dialog */}
        <Dialog
          open={rejectDialog.open}
          onOpenChange={(open) => setRejectDialog({ open, id: open ? rejectDialog.id : null })}
        >
          <DialogContent className="bg-[#1a1a1a] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Reject Subscription</DialogTitle>
              <DialogDescription className="text-white/60">
                Provide a reason for rejecting this subscription request.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectDialog({ open: false, id: null })}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleReject} className="bg-red-500 hover:bg-red-600">
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
