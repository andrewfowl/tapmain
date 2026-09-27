export const CHAT_RESOURCES = {
  checklist: {
    title: "Audit Readiness Checklist",
    description: "132 readiness checks across 6 areas. Free and printable.",
    href: "/checklist",
  },
  templates: {
    title: "Template Library",
    description: "Accounting memos and policy templates for Web3 teams.",
    href: "/templates",
  },
  services: {
    title: "Our Services",
    description: "Technical accounting, audit readiness, token comp and more.",
    href: "/#services",
  },
  pricing: {
    title: "Pricing & Plans",
    description: "Monthly advisory plans and project-based engagements.",
    href: "/#pricing",
  },
  insights: {
    title: "Insights & News",
    description: "Guidance on digital asset accounting and reporting.",
    href: "/#news",
  },
  contact: {
    title: "Talk to the Team",
    description: "Book time with a Big 4-trained technical accountant.",
    href: "/contact",
  },
} as const

export type ChatResourceId = keyof typeof CHAT_RESOURCES

export const CHAT_RESOURCE_IDS = Object.keys(CHAT_RESOURCES) as [ChatResourceId, ...ChatResourceId[]]

export const CHAT_LIMITS = {
  maxMessageChars: 500,
  maxUserTurns: 20,
} as const
