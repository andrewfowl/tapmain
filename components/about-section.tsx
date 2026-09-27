import { AnimateOnScroll } from "@/components/animate-on-scroll"

const facts = [
  { label: "Founded", value: "March 2022" },
  { label: "Headquarters", value: "Louisville, KY" },
  { label: "Credentials", value: "PhD, CPA, FCCA" },
  { label: "Background", value: "KPMG · Big Four" },
]

const experience = ["KPMG", "Brown-Forman", "Aragon", "Figment"]

const segments = [
  "Token issuers",
  "Protocol developers",
  "Foundations & DAOs",
  "Proof-of-stake validators",
  "Accounting firms",
  "Fractional CFOs",
]

const timelines = [
  { service: "Technical accounting", time: "2–3 days" },
  { service: "Financial reporting", time: "3–7 days" },
  { service: "GAAP conversion", time: "2–3 weeks" },
  { service: "Governance advisory", time: "~5 days" },
  { service: "Audit coordination", time: "Matches audit" },
  { service: "ERP implementation", time: "2–3 months" },
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
    >
      {children}
    </a>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-card py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up">
          <div className="mb-16 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">About us</p>
            <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
              Complex accounting questions, answered with reporting you can explain.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              TechAccountingPro is an independent technical accounting and financial reporting practice for digital
              asset and technology businesses. We connect accounting research with the documentation, calculations, and
              implementation needed to move forward.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-in-up" delay={100}>
          <dl className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 bg-card p-6">
                <dt className="text-xs uppercase tracking-wider text-white/40">{fact.label}</dt>
                <dd className="text-lg font-semibold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <AnimateOnScroll animation="fade-in-up" className="md:col-span-2">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-2xl font-semibold text-white">Andrei Belonogov</p>
                <p className="mt-1 text-white/50">PhD, CPA, FCCA · Founder</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40">Experience</p>
                <ul className="flex flex-wrap gap-2">
                  {experience.map((item) => (
                    <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-white/50">
                Doctorate in accounting and statistics (2016). Author of two books and a technical accounting
                publication.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-up" delay={100} className="md:col-span-3">
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-white/60">
              <p>
                Every engagement is delivered by Andrei directly. You work with the professional researching your
                accounting questions, preparing the deliverables, and explaining the conclusions — no hand-offs to
                junior staff.
              </p>
              <p>
                {"Andrei's"} interest in digital assets began while researching an accounting question whose
                complexity drew him deeper into blockchain and financial reporting. Today he combines that research
                focus with practical support through transactions, reporting deadlines, and audits.
              </p>
              <p className="text-base">
                Connect with <ExternalLink href="https://www.linkedin.com/in/andrewbelonogov">Andrei on LinkedIn</ExternalLink>,
                follow <ExternalLink href="https://www.linkedin.com/company/techaccountingpro">TechAccountingPro</ExternalLink>,
                or read the <ExternalLink href="https://blog.techaccountingpro.com/">technical accounting publication</ExternalLink>.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-16 md:grid-cols-2">
          <AnimateOnScroll animation="fade-in-up">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">Who we work with</h3>
              <p className="mb-6 leading-relaxed text-white/60">
                CFOs, controllers, and finance leaders who need specialized support alongside their team — often ahead
                of an audit, financing, reporting deadline, or new token arrangement.
              </p>
              <ul className="flex flex-wrap gap-2">
                {segments.map((segment) => (
                  <li key={segment} className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-white/70">
                    {segment}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-up" delay={100}>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">Typical turnaround</h3>
              <p className="mb-6 leading-relaxed text-white/60">
                Indicative times for straightforward cases once information is available.
              </p>
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Indicative delivery times by service</caption>
                <tbody>
                  {timelines.map((row) => (
                    <tr key={row.service} className="border-t border-white/10 first:border-t-0">
                      <th scope="row" className="py-3 pr-4 font-normal text-white/70">
                        {row.service}
                      </th>
                      <td className="py-3 text-right font-medium text-white">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
