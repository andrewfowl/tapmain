import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'TechAccountingPro | Expert Technical Accounting Services Tailored to Your Business Needs.',
  description: 'Solve complex crypto accounting questions with TechAccountingPro. Access expert insights, actionable templates, and proven methodologies to modernize your accounting practices with cutting-edge technology. ',
  openGraph: {
    url: 'https://techaccountingpro.com/',
    title: 'TechAccountingPro | Your Technical Accounting Expert.',
    description: 'Solve complex crypto accounting questions with TechAccountingPro.',
    images: ['/placeholder-logo.png'],
    siteName: 'TechAccountingPro',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tech_accounting',
    creator: '@tech_accounting',
    title: 'TechAccountingPro | Expert Technical Accounting Services Tailored to Your Business Needs.',
    description: 'Unlock Complex Accounting Solutions with TechAccountingPro.',
    images: ['/placeholder-logo.png']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
