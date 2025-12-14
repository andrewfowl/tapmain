import { ExternalLink, Shield } from "lucide-react"

const policies = [
  {
    name: "Website Terms of Use",
    url: "https://docs.google.com/document/d/1W0KAxXd0rfc_T6GlDcUJWJ0JM6B83VhfzrI-oZfsUMc",
  },
  { name: "Privacy Policy", url: "https://docs.google.com/document/d/1Vp9jKfzCqCzWGPTzsgRg4MYY0-1_mVB2Nwr9eFS4cAg" },
  {
    name: "Anti-spam Policy",
    url: "https://docs.google.com/document/d/1lrIlM3JzNETldqDELz-JauRxXL0T0DU7oOD6MYmqBz8",
  },
  {
    name: "Objectivity Policy",
    url: "https://docs.google.com/document/d/1oaPDRK9O-ANDvPjUqRL5KdUgOjf0Qx4qJUJpmEe_oQI",
  },
  {
    name: "Business Continuity Plan",
    url: "https://docs.google.com/document/d/1XMTZ9dcWnW6gjuADLnmFeTqd7Di0cygMDlGjrCTKLfw",
  },
  {
    name: "Non-disclosure Agreement",
    url: "https://docs.google.com/document/d/1vce9SMB5QESacedI-8T4aPOMhvmo2kGSKsmYCWwVDxk",
  },
  {
    name: "Engagement Letter",
    url: "https://docs.google.com/document/d/1bFMb0ABersS_NdhC9-OPlFJg6jQ6TNPUDEB6f2-uIp8",
  },
  {
    name: "Project Roadmap Template",
    url: "https://docs.google.com/document/d/1C1UfMmMjhONiKOLYPJnaIeKfa6eZfyy-ZXDJoM8pjIo",
  },
  { name: "AML Policy", url: "https://docs.google.com/document/d/1Dtn7LOZKKFKK7xPA04up1XK5-J_fKo80AV1Ye-toeOk" },
  {
    name: "Client Acceptance & Termination",
    url: "https://docs.google.com/document/d/1PEReKP3r7hJ3kAQ-UHEnnFTKaB1f1wGRQI__0qKCMY4",
  },
  {
    name: "Conflict of Interests",
    url: "https://docs.google.com/document/d/1jjuEblxr_hoz2atRHrhX0xtujSA0hI9ZWpsZ-qHgYz0",
  },
  { name: "Confidentiality", url: "https://docs.google.com/document/d/1OVEP2EIJpwPzNWtOz-qaoF1Oa9wKYBLPeEtZtJ-qFT0" },
  { name: "Cybersecurity", url: "https://docs.google.com/document/d/1yOKSEHUhIY__g5WbFK5glZCGMsWHFdrJBlgqiNUz-NE" },
  { name: "Culture", url: "https://docs.google.com/document/d/12KQ9QlPXQ8uRC145DTUz6ItpMmVVU903ikUPH_2Ibec" },
  {
    name: "Record Retention",
    url: "https://docs.google.com/document/d/1Dc6r4O4LTZzOUIn7fkEo-dq_ypu5hPWITXtSdwKSWeQ",
  },
]

export default function TrustCenterPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="h-8 w-8" />
            Trust Center
          </h1>
          <p className="text-white/60">Review our policies and standard documents</p>
        </div>

        <div className="rounded-[var(--radius-card)] bg-[#1a1a1a] border border-white/10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {policies.map((policy) => (
              <a
                key={policy.name}
                href={policy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-[var(--radius-card-inner)] bg-white/5 hover:bg-white/10 transition-colors group border border-white/5 hover:border-white/20"
              >
                <span className="text-sm text-white/80 group-hover:text-white">{policy.name}</span>
                <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-white/60 flex-shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
