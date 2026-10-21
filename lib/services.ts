export type Service = {
  slug: string
  title: string
  summary: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    slug: "financial-reporting",
    title: "Financial Reporting",
    summary:
      "We prepare audit-ready annual and interim US GAAP financial statements, footnote disclosures, and management reporting, and set up reporting workflows in Workiva so your close is repeatable.",
    items: [
      "Initial financial reporting workflow setup in Workiva",
      "Preparation of annual and interim financial statements",
      "Preparation of footnote disclosures",
      "Management reporting",
      "Reconciliation of operating performance, cash flows, and non-GAAP KPIs",
    ],
  },
  {
    slug: "accounting-strategy",
    title: "Accounting Strategy",
    summary:
      "We assess the accounting impact of contracts, transactions, and strategic decisions before they happen, from ASC 606 contract structuring to going concern evaluations and first-of-their-kind questions.",
    items: [
      "Customer contract structuring under ASC 606",
      "Going concern evaluation",
      "Assessment of accounting implications for external events and internal initiatives",
      "Unique, first-of-their-kind accounting challenges",
      "Technical accounting peer review services",
    ],
  },
  {
    slug: "technical-accounting",
    title: "Technical Accounting",
    summary:
      "We write the technical accounting memos auditors expect for complex transactions: business combinations, equity and debt issuances, SAFEs, consolidation, derivatives, and software revenue.",
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
    slug: "crypto-accounting",
    title: "Technical Crypto Accounting",
    summary:
      "We apply US GAAP to token-specific transactions: token sales and TGEs, SAFTs and token warrants, token compensation, DAO and foundation consolidation, staking revenue, and digital assets under ASC 350-60.",
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
    slug: "change-management",
    title: "Change Management",
    summary:
      "We lead accounting transitions without disrupting the close: cash-to-accrual and IFRS-to-US GAAP conversions, first-time stock-based compensation, ERP migrations, and new standard adoption.",
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
    slug: "process-governance",
    title: "Process & Governance",
    summary:
      "We design internal controls, process narratives, and risk control matrices that scale with your company and satisfy auditors, investors, and board oversight.",
    items: [
      "Process, internal controls, and guardrails",
      "Process narratives and risk control matrices",
      "Strategic business reviews with board representatives",
      "Management review controls",
      "Intelligent process automation",
    ],
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
