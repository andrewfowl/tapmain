import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InteractiveAssessmentButton() {
  const calLink = "https://cal.com/andrew-belonogov/30min"

  return (
    <Button
      variant="outline"
      size="lg"
      className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-8 py-6 text-base font-medium transition-all"
      asChild
    >
      <Link href={calLink} target="_blank" rel="noopener noreferrer">
        Book a Meeting
      </Link>
    </Button>
  )
}
