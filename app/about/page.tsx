import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export const metadata: Metadata = {
  title: "About Us | TechAccountingPro",
  description:
    "TechAccountingPro is an independent technical accounting and financial reporting practice for digital asset and technology businesses, founded by Andrei Belonogov, PhD, CPA, FCCA.",
}

const services = [
  {
    title: "Technical accounting and transaction advisory",
    body: "Resolve accounting questions involving revenue, financing, acquisitions, consolidation, leases, and compensation. We document the analysis and conclusions in technical memoranda, with supporting calculations and proposed adjustments that help your team apply the accounting treatment.",
  },
  {
    title: "Digital asset accounting",
    body: "Understand the reporting implications of token issuances, SAFTs, token warrants, market-making arrangements, staking, mining, and token grants. We examine the underlying agreements and transaction activity to develop accounting positions that reflect how your business operates.",
  },
  {
    title: "Financial reporting and GAAP conversion",
    body: "Prepare financial statements, disclosures, and supporting schedules for investor reporting and regulatory filings. We also help businesses move from cash or tax accounting to US GAAP and address differences between IFRS and US GAAP.",
  },
  {
    title: "Audit preparation and coordination",
    body: "Identify accounting and documentation gaps, reconcile historical records, and prepare supporting information before and during an audit. We work with management and external auditors to address questions and keep outstanding accounting matters moving toward resolution.",
  },
  {
    title: "Accounting systems and reporting automation",
    body: "Connect your accounting requirements with the systems and data needed to support them. Our work includes reporting workflows, crypto subledger implementation, custom reporting, and automation designed to reduce repetitive work and improve traceability.",
  },
  {
    title: "Finance processes and governance",
    body: "Strengthen the processes behind your numbers through accounting policies, internal control documentation, training, and finance advisory. We help management understand reporting risks and establish practical responsibilities for addressing them.",
  },
]

const differentiators = [
  {
    title: "Work directly with the founder",
    body: "Every engagement is delivered by Andrei Belonogov, PhD, CPA, FCCA. You work directly with the professional researching your accounting questions, preparing the deliverables, and explaining the conclusions.",
  },
  {
    title: "Expertise in accounting ambiguity",
    body: "We focus on transactions where the accounting answer requires careful interpretation. Our work connects the relevant guidance with contractual terms, business substance, and the evidence needed to support a conclusion.",
  },
  {
    title: "Big Four and operating-company experience",
    body: "Andrei brings experience from KPMG and corporate finance roles, alongside a doctorate in accounting and statistics. That background informs both the technical analysis and how it can be applied within a working finance team.",
  },
  {
    title: "Understanding of digital asset operations",
    body: "Our specialty extends to the mechanics behind token transactions, staking activity, and blockchain records. Understanding how those activities work helps us identify the information needed for accurate accounting and reporting.",
  },
  {
    title: "Practical follow-through",
    body: "Our work can extend from research and memoranda to reconciliations, calculations, entries, disclosures, and auditor discussions. This gives your team a clearer path from identifying an issue to implementing the solution.",
  },
  {
    title: "Research shared with the profession",
    body: "Andrei publishes technical accounting research and discusses digital asset accounting through industry interviews and educational content. Clients benefit from an approach built around investigating difficult questions and explaining the reasoning clearly.",
  },
]

const steps = [
  {
    title: "Start with your accounting challenge",
    body: "Share the issue, the intended deliverable, who will review it, and your deadline. Andrei reviews the available information with you and identifies the records, agreements, and supporting schedules needed.",
  },
  {
    title: "Agree on scope, fees, and timing",
    body: "Before work begins, the engagement establishes the deliverables, responsibilities, fees, and expected timeline. You can engage TechAccountingPro for a specific project or ongoing support.",
  },
  {
    title: "Stay connected throughout the work",
    body: "You communicate directly with Andrei through email, Slack, and scheduled calls, as agreed for your engagement. Updates focus on progress, outstanding information, and decisions needed from your team.",
  },
  {
    title: "Plan around the complexity of your project",
    body: "Straightforward engagements can often be completed within the indicative timeframes below once the necessary information is available. More complex assignments require a tailored schedule.",
  },
  {
    title: "Understand and apply the results",
    body: "Andrei walks you through the conclusions, supporting calculations, and proposed adjustments. Implementation assistance and responses to auditor questions are included where agreed in the engagement scope.",
  },
]

const timelines = [
  { service: "Technical accounting", time: "2–3 days for straightforward cases" },
  { service: "Financial reporting", time: "3–7 days for straightforward cases" },
  { service: "Audit coordination", time: "Aligned with the duration of the external audit" },
  { service: "GAAP conversion", time: "2–3 weeks for straightforward cases" },
  { service: "Governance advisory", time: "Approximately 5 days for a focused assignment" },
  { service: "ERP implementation support", time: "Approximately 2–3 months, depending on scope" },
]

const keyFacts: { label: string; value: React.ReactNode }[] = [
  { label: "Company name", value: "TechAccountingPro, LLC" },
  { label: "Founded", value: "March 24, 2022" },
  { label: "Founder", value: "Andrei Belonogov, PhD, CPA, FCCA" },
  { label: "HQ", value: "Louisville, Kentucky, USA" },
  {
    label: "Website",
    value: (
      <a href="https://www.techaccountingpro.com/" className="underline underline-offset-4 hover:text-white">
        techaccountingpro.com
      </a>
    ),
  },
  {
    label: "Core offering",
    value: "Technical accounting and financial reporting, with specialization in digital asset businesses",
  },
  {
    label: "Pricing",
    value:
      "Published monthly plans: Starter $2,500, Growth $7,000, and Scale $15,000. Individual project pricing is agreed separately.",
  },
  {
    label: "Contract terms",
    value:
      "Ongoing and project engagements available. Scope, billing, and termination provisions follow the applicable engagement agreement.",
  },
  {
    label: "Services",
    value:
      "Technical accounting, digital asset accounting, financial reporting, GAAP conversion, audit preparation, systems implementation, automation, and finance process advisory",
  },
  { label: "Communication", value: "Email, Slack, and scheduled calls, according to the engagement" },
  {
    label: "Notable clients",
    value: "Publicly featured client relationships include Overclock Labs/Akash, Litrivis CPA, and The Ready.",
  },
  {
    label: "Projects delivered",
    value:
      "Examples include historical financial reporting conversion, technical accounting memoranda, crypto reconciliations, and reporting automation.",
  },
  {
    label: "Competitors",
    value:
      "Firms with overlapping offerings include The Network Firm and BPM’s blockchain and digital asset practice.",
  },
  {
    label: "Socials",
    value: (
      <span className="flex flex-wrap gap-x-4 gap-y-1">
        <ExternalLink href="https://www.linkedin.com/company/techaccountingpro">Company LinkedIn</ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/andrewbelonogov">Founder LinkedIn</ExternalLink>
        <ExternalLink href="https://blog.techaccountingpro.com/">Technical accounting publication</ExternalLink>
      </span>
    ),
  },
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
    >
      {children}
    </a>
  )
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">{title}</h2>
    </div>
  )
}

function ItemGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
      {items.map((item, index) => (
        <AnimateOnScroll key={item.title} animation="fade-in-up" delay={(index % 2) * 100}>
          <div className="h-full bg-black p-8">
            <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="leading-relaxed text-white/60">{item.body}</p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[110vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,180,255,0.14),transparent_70%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/40">About us</p>
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Complex accounting questions, answered with reporting you can explain.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            TechAccountingPro helps finance teams resolve complex accounting questions and prepare financial reporting
            they can confidently explain to auditors, investors, and management.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            We specialize in the accounting challenges of digital asset and technology businesses. From an unfamiliar
            transaction to a reporting deadline, we connect accounting research with the documentation, calculations,
            and implementation needed to move forward.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="The founder" title="The founder behind TechAccountingPro" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="text-2xl font-semibold text-white">Andrei Belonogov</p>
              <p className="mt-1 text-white/50">PhD, CPA, FCCA · Founder</p>
              <dl className="mt-8 flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-white/40">Experience</dt>
                  <dd className="text-white/80">KPMG · Brown-Forman · Aragon · Figment</dd>
                </div>
                <div>
                  <dt className="text-white/40">Education</dt>
                  <dd className="text-white/80">Doctorate in accounting and statistics (2016)</dd>
                </div>
                <div>
                  <dt className="text-white/40">Based in</dt>
                  <dd className="text-white/80">Louisville, Kentucky</dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-white/60 md:col-span-3">
              <p>
                TechAccountingPro is an independent practice founded by Andrei Belonogov in Louisville, Kentucky, in
                March 2022. His background spans KPMG, corporate accounting at Brown-Forman, and digital asset
                experience with Aragon and Figment. He has authored two books alongside his technical accounting
                publication.
              </p>
              <p>
                {"Andrei's"} interest in digital assets began while researching an accounting question whose complexity
                drew him deeper into blockchain and financial reporting. Today, he combines that research focus with
                practical support for companies navigating complex transactions, reporting requirements, and audits.
              </p>
              <p>
                Connect with <ExternalLink href="https://www.linkedin.com/in/andrewbelonogov">Andrei on LinkedIn</ExternalLink>,
                follow <ExternalLink href="https://www.linkedin.com/company/techaccountingpro">TechAccountingPro</ExternalLink>,
                or explore his <ExternalLink href="https://blog.techaccountingpro.com/">technical accounting research</ExternalLink>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="What we do" title="Core services" />
          <ItemGrid items={services} />
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Why us" title="What makes us different" />
          <ItemGrid items={differentiators} />
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Clients" title="Who uses TechAccountingPro" />
          <div className="flex max-w-3xl flex-col gap-5 text-lg leading-relaxed text-white/60">
            <p>
              We work with CFOs, controllers, and finance leaders at digital asset and technology companies that need
              specialized accounting support alongside their existing team.
            </p>
            <p>
              Our core digital asset segments include token issuers, protocol developers, foundations, DAOs, and
              proof-of-stake validators. Common engagement triggers include an upcoming audit, financing transaction,
              public reporting deadline, new token arrangement, or a backlog of accounting issues.
            </p>
            <p>
              We also support accounting firms and fractional finance leaders whose clients require technical research,
              financial reporting, or digital asset expertise.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Process" title="How TechAccountingPro works" />
          <ol className="flex flex-col">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-6 border-t border-white/10 py-8 first:border-t-0 first:pt-0">
                <span className="w-8 shrink-0 font-mono text-sm text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="max-w-2xl leading-relaxed text-white/60">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Indicative delivery times by service</caption>
              <thead className="bg-white/5 text-white/50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Service</th>
                  <th scope="col" className="px-6 py-4 font-medium">Indicative delivery time</th>
                </tr>
              </thead>
              <tbody>
                {timelines.map((row) => (
                  <tr key={row.service} className="border-t border-white/10">
                    <td className="px-6 py-4 font-medium text-white">{row.service}</td>
                    <td className="px-6 py-4 text-white/60">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/40">
            Timing depends on the scope, completeness of information, and coordination with management, auditors, and
            other providers. Your engagement schedule sets the expected delivery dates.
          </p>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="At a glance" title="Key facts" />
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Key facts about TechAccountingPro</caption>
              <tbody>
                {keyFacts.map((fact) => (
                  <tr key={fact.label} className="border-t border-white/10 first:border-t-0">
                    <th scope="row" className="w-1/3 bg-white/5 px-6 py-4 align-top font-medium text-white/50">
                      {fact.label}
                    </th>
                    <td className="px-6 py-4 leading-relaxed text-white/80">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-8">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">Tell us what you need to resolve.</h2>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Share the issue, who will review it, and your deadline. We will help you define the next steps.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-white px-6 text-black hover:bg-white/90">
              <a href="https://cal.com/andrew-belonogov/30min" target="_blank" rel="noopener noreferrer">
                Book a call <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link href="/#pricing">See plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
