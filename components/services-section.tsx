"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"

const services = [
  {
    title: "Financial Reporting",
    items: [
      "Initial financial reporting workflow setup in Workiva",
      "Preparation of annual and interim financial statements",
      "Preparation of footnote disclosures",
      "Management reporting",
      "Reconciliation of operating performance, cash flows, and non-GAAP KPIs",
    ],
  },
  {
    title: "Accounting Strategy",
    items: [
      "Customer contract structuring under ASC 606",
      "Going concern evaluation",
      "Assessment of accounting implications for external events and internal initiatives",
      "Unique, first-of-their-kind accounting challenges",
      "Technical accounting peer review services",
    ],
  },
  {
    title: "Technical Accounting",
    items: [
      "Business combinations, asset acquisitions, and acqui-hires",
      "Issuance of equity, debt, or SAFEs",
      "Software development cost capitalization and amortization",
      "Consolidation: VIE, equity method investments",
      "Derivatives",
      "Pricing vendor valuation methodology review",
      "Debt modification",
      "Software revenue",
    ],
  },
  {
    title: "Technical Crypto Accounting",
    items: [
      "ICO, TGE, private and public token sale, and airdrops",
      "Funding received via token grants, SAFTs, and warrants",
      "Consolidation analysis: private foundations, community pools, DAO Treasury, SPV",
      "Token compensation",
      "Market making, including valuation of call options",
      "Real-world assets",
      "Digital asset lending",
      "Mining, staking, and delegating revenue",
    ],
  },
  {
    title: "Change Management",
    items: [
      "First-time recognition of stock-based compensation expense",
      "Cash to accrual conversion",
      "Conversion from IFRS to US GAAP",
      "Functional currency change",
      "ERP system conversions (NetSuite, SAP, QBO)",
      "Acceleration of month-end close",
      "New accounting standards",
    ],
  },
  {
    title: "Process & Governance",
    items: [
      "Process, internal controls, and guardrails",
      "Process narratives and risk control matrices",
      "Strategic business reviews with board representatives",
      "Management review controls",
      "Intelligent process automation",
    ],
  },
]

export function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <AnimateOnScroll key={service.title} animation="fade-in-up" delay={index * 50}>
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-sm font-mono">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              </div>
            </div>
            <ul className="p-6 space-y-2 flex-1">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-white/60 text-sm flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}
