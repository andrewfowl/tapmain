"use client"

import { useState, useEffect } from "react"
import {
  getAllSubscriptions,
  approveSubscription,
  rejectSubscription,
  reverseSubscriptionApproval,
} from "@/actions/admin-actions"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, CheckCircle, XCircle, Loader2, MoreHorizontal, Undo2 } from "lucide-react"

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [rejectReason, setRejectReason] = useState("")
  const [reverseDialog, setReverseDialog] = useState<{ open: boolean; id: string | null; currentStatus: string }>({
    open: false,
    id: null,
    currentStatus: "",
  })

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

  async function handleReverseApproval() {
    if (!reverseDialog.id) return
    setActionLoading(reverseDialog.id)
    await reverseSubscriptionApproval(reverseDialog.id)
    await loadSubscriptions()
    setActionLoading(null)
    setReverseDialog({ open: false, id: null, currentStatus: "" })
  }

  const pending = subscriptions.filter((s) => s.status === "pending")
  const approved = subscriptions.filter((s) => s.status === "approved")
  const rejected = subscriptions.filter((s) => s.status === "rejected")
  const frozen = subscriptions.filter((s) => s.status === "frozen")

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Subscriptions</h1>
        <p className="text-white/60 mb-8">Manage customer subscription requests</p>

        {/* Pending */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-white/60" />
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
                    className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10"
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
                        className="bg-white text-black hover:bg-white/90 rounded-none"
                      >
                        {actionLoading === sub.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectDialog({ open: true, id: sub.id })}
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent rounded-none"
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
              <CheckCircle className="h-5 w-5 text-white" />
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
                    className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <p className="text-sm text-white/60">{sub.profiles?.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">Approved</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 rounded-none">
                          <DropdownMenuItem
                            onClick={() => setReverseDialog({ open: true, id: sub.id, currentStatus: "approved" })}
                            className="cursor-pointer"
                          >
                            <Undo2 className="h-4 w-4 mr-2" />
                            Reverse to Pending
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {frozen.length > 0 && (
          <Card className="bg-[#1a1a1a] border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-white/60" />
                Frozen ({frozen.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frozen.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <p className="text-sm text-white/60">{sub.profiles?.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/60">Frozen</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 rounded-none">
                          <DropdownMenuItem
                            onClick={() => setReverseDialog({ open: true, id: sub.id, currentStatus: "frozen" })}
                            className="cursor-pointer"
                          >
                            <Undo2 className="h-4 w-4 mr-2" />
                            Reverse to Pending
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rejected */}
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-white/60" />
              Rejected ({rejected.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rejected.length === 0 ? (
              <p className="text-white/60 text-center py-8">No rejected subscriptions</p>
            ) : (
              <div className="space-y-4">
                {rejected.map((sub) => (
                  <div key={sub.id} className="p-4 rounded-none bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{sub.profiles?.full_name || "Unknown"}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">Rejected</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 rounded-none">
                            <DropdownMenuItem
                              onClick={() => setReverseDialog({ open: true, id: sub.id, currentStatus: "rejected" })}
                              className="cursor-pointer"
                            >
                              <Undo2 className="h-4 w-4 mr-2" />
                              Reverse to Pending
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
          <DialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
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
              className="bg-white/5 border-white/10 text-white rounded-none"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectDialog({ open: false, id: null })}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-none"
              >
                Cancel
              </Button>
              <Button onClick={handleReject} className="bg-white text-black hover:bg-white/90 rounded-none">
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={reverseDialog.open}
          onOpenChange={(open) =>
            setReverseDialog({
              open,
              id: open ? reverseDialog.id : null,
              currentStatus: open ? reverseDialog.currentStatus : "",
            })
          }
        >
          <DialogContent className="bg-[#1a1a1a] border-white/10 rounded-none">
            <DialogHeader>
              <DialogTitle className="text-white">Reverse Subscription Status</DialogTitle>
              <DialogDescription className="text-white/60">
                This will set the subscription status back to "pending". The customer will need to be approved again.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReverseDialog({ open: false, id: null, currentStatus: "" })}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReverseApproval}
                disabled={actionLoading === reverseDialog.id}
                className="bg-white text-black hover:bg-white/90 rounded-none"
              >
                {actionLoading === reverseDialog.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Reverse to Pending
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
