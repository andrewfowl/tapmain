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
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-sm font-mono">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                </div>
                <p className="mt-3 text-base font-medium leading-snug text-white text-pretty">{service.lead}</p>
              </div>
              <ul className="p-6 space-y-2.5 flex-1">
                {visible.map((item) => (
                  <li key={item} className="text-white/80 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
                {remaining > 0 && <li className="text-white/60 text-sm pl-3">{`+${remaining} more`}</li>}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="px-6 pb-6 text-sm font-medium text-white hover:text-brand inline-flex items-center gap-1 transition-colors"
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
