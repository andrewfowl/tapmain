"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/actions/dashboard-actions"
import { Check, Loader2 } from "lucide-react"

interface ProfileEditFormProps {
  profile: {
    id: string
    full_name: string | null
    company_name: string | null
    phone: string | null
  } | null
  email: string
}

export function ProfileEditForm({ profile, email }: ProfileEditFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [companyName, setCompanyName] = useState(profile?.company_name || "")
  const [phone, setPhone] = useState(profile?.phone || "")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const result = await updateProfile({
      full_name: fullName,
      company_name: companyName,
      phone: phone,
    })

    setIsLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setIsEditing(false)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  function handleCancel() {
    setFullName(profile?.full_name || "")
    setCompanyName(profile?.company_name || "")
    setPhone(profile?.phone || "")
    setIsEditing(false)
    setError(null)
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-none p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Personal Information</h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="border-white/20 text-white hover:bg-white/10 rounded-none"
          >
            Edit
          </Button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-3 bg-white/10 border border-white/20 rounded-none flex items-center gap-2 text-white text-sm">
          <Check className="h-4 w-4" />
          Profile updated successfully
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-none text-white/60 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-white/60">
            Full Name
          </Label>
          {isEditing ? (
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white/5 border-white/10 text-white mt-1 rounded-none"
              placeholder="Enter your full name"
            />
          ) : (
            <p className="text-white mt-1">{fullName || <span className="text-white/40">Not set</span>}</p>
          )}
        </div>

        <div>
          <Label htmlFor="companyName" className="text-white/60">
            Company Name
          </Label>
          {isEditing ? (
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-white/5 border-white/10 text-white mt-1 rounded-none"
              placeholder="Enter your company name"
            />
          ) : (
            <p className="text-white mt-1">{companyName || <span className="text-white/40">Not set</span>}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-white/60">
            Phone Number
          </Label>
          {isEditing ? (
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white/5 border-white/10 text-white mt-1 rounded-none"
              placeholder="Enter your phone number"
            />
          ) : (
            <p className="text-white mt-1">{phone || <span className="text-white/40">Not set</span>}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading} className="bg-white text-black hover:bg-white/90 rounded-none">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-none"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
