import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES, getService } from "@/lib/services"
import { JsonLd, SITE_URL } from "@/lib/structured-data"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) return {}
  return {
    title: `${service.title} Services for Crypto & Tech Companies`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug)
  if (!service) notFound()

  const others = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <div className="bg-black pt-32 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "Worldwide",
        }}
      />
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link href="/#services" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-10">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All services
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance">{service.title}</h1>
        <p className="text-lg text-white/70 leading-relaxed mb-12">{service.summary}</p>

        <h2 className="text-xl font-semibold text-white mb-6">What&apos;s included</h2>
        <ul className="space-y-4 mb-14">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-white/70">
              <Check className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8">
            <a href="https://cal.com/andrew-belonogov/30min" target="_blank" rel="noopener noreferrer">
              Book a 30-min call
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
          >
            <Link href="/#pricing">See plans</Link>
          </Button>
        </div>

        <nav aria-label="Other services" className="border-t border-white/10 pt-10">
          <h2 className="text-sm text-white/40 mb-4">Other services</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/30 rounded-full text-sm text-white/70 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </div>
  )
}
