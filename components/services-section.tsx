import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { SERVICES } from "@/lib/services"

const VISIBLE_ITEMS = 3

export function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, index) => {
        const visible = service.items.slice(0, VISIBLE_ITEMS)
        const remaining = service.items.length - visible.length
        return (
          <AnimateOnScroll key={service.slug} animation="fade-in-up" delay={index * 50}>
            <div className="bg-white/5 border border-white/10 hover:border-white/25 transition-colors rounded-lg overflow-hidden h-full flex flex-col">
              <div className="p-7 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-base font-mono">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white text-balance">{service.title}</h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-white/90 text-pretty">{service.summary}</p>
              </div>
              <ul className="p-7 space-y-3 flex-1">
                {visible.map((item) => (
                  <li key={item} className="text-white/80 text-base leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2.5 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
                {remaining > 0 && <li className="text-white/60 text-base pl-4">{`+${remaining} more`}</li>}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="px-7 pb-7 text-base font-medium text-white hover:text-brand inline-flex items-center gap-1.5 transition-colors"
              >
                {remaining > 0 ? "See full scope" : "Learn more"}
                <span className="sr-only"> of {service.title}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimateOnScroll>
        )
      })}
    </div>
  )
}
