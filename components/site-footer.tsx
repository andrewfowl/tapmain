"use client"

import Link from "next/link"
import { NewsletterForm } from "./newsletter-form"

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 17 10-10M17 7H7v10" />
  </svg>
)

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
    <footer className="bg-white text-black pt-16 pb-8 border-t border-corporate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-corporate-800 rounded flex items-center justify-center text-white font-bold text-lg">
                TAP
              </div>
              <span className="text-xl font-semibold tracking-tight text-corporate-900">TechAccountingPro</span>
            </Link>
            <p className="text-corporate-600 mb-6 max-w-lg leading-relaxed">
              Empowering technology startups and crypto accountants with cutting-edge solutions. Our platform provides
              expert insights, actionable templates, and proven methodologies for modern accounting practices in the
              digital economy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-corporate-600 mr-3 flex-shrink-0" />
                <a
                  href="tel:5022860115"
                  className="text-corporate-700 text-sm hover:text-corporate-900 transition-colors"
                >
                  +1 (502) 286-0115
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-corporate-600 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@techaccountingpro.com"
                  className="text-corporate-700 text-sm hover:text-corporate-900 transition-colors"
                >
                  info@techaccountingpro.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-corporate-900">Subscribe to Our Newsletter</h3>
            <p className="text-corporate-600 mb-4 text-sm leading-relaxed">
              Get the latest insights and trends in technology accounting and crypto finance delivered to your inbox
              monthly.
            </p>
            <NewsletterForm source="footer" placeholder="Your email address" buttonText="Subscribe" />
            <p className="text-xs text-corporate-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        <div className="border-t border-corporate-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-corporate-600 text-sm">
              © {new Date().getFullYear()} TechAccountingPro. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-corporate-600 hover:text-corporate-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-corporate-600 hover:text-corporate-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
