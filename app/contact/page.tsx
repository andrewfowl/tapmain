import type { Metadata } from "next"
import { Mail, Phone, CalendarDays, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { BOOKING_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact a Crypto Technical Accountant",
  description:
    "Talk to TechAccountingPro about US GAAP reporting, audit readiness, token compensation or a technical accounting memo. Replies within one business day.",
  alternates: { canonical: "/contact" },
}

const CHANNELS = [
  {
    icon: CalendarDays,
    title: "Book a consultation",
    detail: "30-minute call to scope your accounting question",
    href: BOOKING_URL,
    label: "Pick a time",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    detail: "Replies within one business day",
    href: "mailto:info@techaccountingpro.com",
    label: "info@techaccountingpro.com",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "Monday to Friday, 9am to 6pm ET",
    href: "tel:+15022860115",
    label: "+1 (502) 286-0115",
  },
]

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-32 pb-12 md:pt-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-sm font-mono uppercase tracking-wider text-white/50">Contact</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-balance">
            Talk to a crypto technical accountant
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl text-pretty">
            US GAAP reporting, audit readiness, token compensation or a technical memo. Tell us what you are working
            on and we will reply within one business day.
          </p>
        </div>
      </section>

      <section aria-label="Ways to reach us" className="pb-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHANNELS.map(({ icon: Icon, title, detail, href, label, external }) => (
              <li key={title} className="rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="text-sm text-white/60">{detail}</p>
                </div>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-auto text-base font-medium text-white underline-offset-4 hover:text-brand hover:underline break-all"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/50">
            <Clock className="h-4 w-4" aria-hidden="true" />
            We work with clients remotely across the US and internationally.
          </p>
        </div>
      </section>

      <section id="contact-form" className="pb-32 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
