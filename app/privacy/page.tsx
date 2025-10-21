import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LayoutWithScroll } from "@/app/layout-with-scroll"

export default function PrivacyPolicyPage() {
  return (
    <LayoutWithScroll>
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader />

        <div className="flex-1 py-12 md:py-16 lg:py-20">
          <div className="corporate-container">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Button asChild variant="ghost" className="mb-4">
                  <Link href="/" className="flex items-center text-corporate-600 hover:text-corporate-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Privacy Policy</h1>
                <p className="text-corporate-600">Last Updated: March 23, 2025</p>
              </div>

              <div className="prose max-w-none text-corporate-700">
                <p>
                  At Finance Transform, we take your privacy seriously. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, such as when you create an account, subscribe
                  to our newsletter, fill out a form, or otherwise communicate with us. This information may include:
                </p>
                <ul>
                  <li>Personal identifiers such as your name, email address, and phone number</li>
                  <li>Account credentials such as your username and password</li>
                  <li>Professional information such as your job title, company name, and industry</li>
                  <li>Payment information when you purchase our services</li>
                  <li>Communications you send to us</li>
                </ul>

                <p>We also automatically collect certain information when you visit our website, including:</p>
                <ul>
                  <li>
                    Log information such as your IP address, browser type, pages visited, and time spent on our website
                  </li>
                  <li>Device information such as your operating system and device type</li>
                  <li>Location information based on your IP address</li>
                  <li>Usage information such as your interactions with our website and services</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Communicate with you about products, services, offers, and events</li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Personalize and improve your experience with our services</li>
                </ul>

                <h2>How We Share Your Information</h2>
                <p>We may share your information in the following circumstances:</p>
                <ul>
                  <li>
                    With vendors, consultants, and other service providers who need access to such information to carry
                    out work on our behalf
                  </li>
                  <li>
                    In response to a request for information if we believe disclosure is in accordance with, or required
                    by, any applicable law, regulation, or legal process
                  </li>
                  <li>
                    If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                    rights, property, and safety of Finance Transform or others
                  </li>
                  <li>
                    In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                    acquisition of all or a portion of our business by another company
                  </li>
                  <li>With your consent or at your direction</li>
                </ul>

                <h2>Your Choices</h2>
                <p>You have several choices regarding the information we collect and how it is used:</p>
                <ul>
                  <li>
                    <strong>Account Information:</strong> You may update, correct, or delete your account information at
                    any time by logging into your account or contacting us.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually
                    choose to set your browser to remove or reject browser cookies.
                  </li>
                  <li>
                    <strong>Promotional Communications:</strong> You may opt out of receiving promotional emails from us
                    by following the instructions in those emails. If you opt out, we may still send you non-promotional
                    emails, such as those about your account or our ongoing business relations.
                  </li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse,
                  unauthorized access, disclosure, alteration, and destruction. However, no security system is
                  impenetrable, and we cannot guarantee the security of our systems.
                </p>

                <h2>Data Retention</h2>
                <p>
                  We store the information we collect about you for as long as is necessary for the purpose(s) for which
                  we originally collected it. We may retain certain information for legitimate business purposes or as
                  required by law.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                  Our services are not directed to children under 16, and we do not knowingly collect personal
                  information from children under 16. If we learn we have collected personal information from a child
                  under 16, we will delete this information.
                </p>

                <h2>International Data Transfers</h2>
                <p>
                  We are based in the United States and the information we collect is governed by U.S. law. If you are
                  accessing our services from outside the United States, please be aware that information collected
                  through our services may be transferred to, processed, stored, and used in the United States and other
                  jurisdictions.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may change this Privacy Policy from time to time. If we make changes, we will notify you by
                  revising the date at the top of the policy and, in some cases, we may provide you with additional
                  notice (such as adding a statement to our website or sending you a notification).
                </p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>
                  Finance Transform
                  <br />
                  123 Finance Street
                  <br />
                  New York, NY 10001
                  <br />
                  Email: privacy@financetransform.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    </LayoutWithScroll>
  )
}
