import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { SERVICES } from "@/lib/services"

export function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, index) => (
        <AnimateOnScroll key={service.slug} animation="fade-in-up" delay={index * 50}>
          <div className="bg-white/5 border border-white/10 hover:border-white/25 transition-colors rounded-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-sm font-mono">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              </div>
            </div>
            <ul className="p-6 space-y-2 flex-1">
              {service.items.map((item) => (
                <li key={item} className="text-white/60 text-base flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="px-6 pb-6 text-sm font-medium text-white/80 hover:text-white inline-flex items-center gap-1"
            >
              Learn more<span className="sr-only"> about {service.title}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}
