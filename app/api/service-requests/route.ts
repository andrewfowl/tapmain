import { type NextRequest, NextResponse } from "next/server"
import { submitServiceRequest } from "@/actions/solutions-actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await submitServiceRequest(body)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
