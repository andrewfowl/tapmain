export const SITE_URL = "https://techaccountingpro.com"

export const FOUNDER = {
  "@type": "Person",
  "@id": `${SITE_URL}/#founder`,
  name: "Andrei Belonogov",
  jobTitle: "Founder",
  honorificSuffix: "PhD, CPA, FCCA",
  url: `${SITE_URL}/#about`,
  sameAs: ["https://www.linkedin.com/in/andrewbelonogov"],
  alumniOf: { "@type": "Organization", name: "KPMG" },
}

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "TechAccountingPro",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/tap-logo.png`,
  email: "info@techaccountingpro.com",
  foundingDate: "2022-03",
  address: { "@type": "PostalAddress", addressLocality: "Louisville", addressRegion: "KY", addressCountry: "US" },
  areaServed: "Worldwide",
  founder: FOUNDER,
  sameAs: ["https://www.linkedin.com/company/techaccountingpro", "https://x.com/tech_accounting"],
  knowsAbout: [
    "Crypto accounting",
    "Digital asset accounting (ASC 350-60)",
    "US GAAP technical accounting",
    "Token compensation accounting",
    "Revenue recognition (ASC 606)",
    "Audit readiness",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technical accounting services",
    itemListElement: [
      "Financial Reporting",
      "Technical Accounting",
      "Transaction Support",
      "Technical Crypto Accounting",
      "Change Management",
      "Process & Governance",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" so it can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
