import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

const STEPS = [
  "Inventory token grants, vesting schedules, and lockups",
  "Set the classification and fair value approach",
  "Deliver the ASC 718 memo, journal entries, and disclosures",
  "Walk the auditor through the position before fieldwork",
]

const DELIVERABLES = ["Technical memo", "Valuation support", "Audit-ready schedules"]

export function EngagementExample() {
  return (
    <article
      aria-labelledby="engagement-example-title"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-white/50">Representative engagement</p>
      <h2 id="engagement-example-title" className="mt-3 text-xl font-semibold text-white text-balance">
        Token compensation for a venture-backed protocol heading into its first audit
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        The team had granted tokens to employees and advisors across several vesting structures, with no accounting
        position documented.
      </p>

      <ol className="mt-6 space-y-3">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm text-white/85">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-brand-charcoal"
            >
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-white/50">Outcome</p>
        <p className="mt-2 flex items-start gap-2 text-sm text-white">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
          An auditor-ready accounting position, documented before fieldwork began.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Deliverables">
          {DELIVERABLES.map((d) => (
            <li key={d} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">
              {d}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/services/crypto-accounting"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white"
      >
        Explore crypto accounting services
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  )
}
