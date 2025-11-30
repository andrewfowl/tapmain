"use client"

import Link from "next/link"
import { NewsletterForm } from "./newsletter-form"

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="22,6 12,13 2,6" />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </svg>
)

export function SiteFooter() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight uppercase">TechAccountingPro</span>
            </Link>
            <p className="text-white/60 mb-8 max-w-lg leading-relaxed">
              Empowering technology startups and crypto accountants with cutting-edge solutions. Big-4 experience at a
              fraction of the price.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/40" />
                <a href="tel:5022860115" className="text-white/70 hover:text-white transition-colors">
                  +1 (502) 286-0115
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/40" />
                <a
                  href="mailto:info@techaccountingpro.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  info@techaccountingpro.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe to Updates</h3>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Get the latest insights in technology accounting and crypto finance.
            </p>
            <NewsletterForm source="footer" placeholder="Your email" buttonText="Subscribe" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              © {new Date().getFullYear()} TechAccountingPro. All rights reserved.
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
