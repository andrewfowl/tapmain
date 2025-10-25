import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LayoutWithScroll } from "@/app/layout-with-scroll"

export default function TermsOfServicePage() {
  return (
    
    <LayoutWithScroll>
      <div className="min-h-screen bg-white flex flex-col">

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
                <h1 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Terms of Service</h1>
                <p className="text-corporate-600">Last Updated: March 23, 2025</p>
              </div>

              <div className="prose max-w-none text-corporate-700">
                <p>
                  Welcome to Finance Transform. Please read these Terms of Service ("Terms") carefully as they contain
                  important information about your legal rights, remedies, and obligations. By accessing or using the
                  Finance Transform platform, you agree to comply with and be bound by these Terms.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If
                  you do not agree to these Terms, you may not access or use our services.
                </p>

                <h2>2. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. If we make changes, we will provide notice by revising the date
                  at the top of these Terms and, in some cases, we may provide additional notice. Your continued use of
                  our services after any such changes constitutes your acceptance of the new Terms.
                </p>

                <h2>3. Account Registration</h2>
                <p>
                  To access certain features of our platform, you may need to register for an account. When you
                  register, you agree to provide accurate, current, and complete information and to update such
                  information to keep it accurate, current, and complete. You are responsible for safeguarding your
                  account credentials and for all activities that occur under your account.
                </p>

                <h2>4. Subscription and Payment</h2>
                <p>
                  Some of our services require payment of fees. When you subscribe to a paid service, you agree to pay
                  all fees in accordance with the fees, charges, and billing terms in effect at the time. You also agree
                  to pay all applicable taxes. Payment obligations are non-cancelable, and fees paid are non-refundable
                  except as expressly provided in these Terms.
                </p>

                <h2>5. License to Use Our Services</h2>
                <p>
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license
                  to access and use our services for your internal business purposes. This license does not include the
                  right to scrape, data mine, or otherwise extract data from our services using automated means.
                </p>

                <h2>6. Intellectual Property Rights</h2>
                <p>
                  Our platform and its entire contents, features, and functionality (including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof), are owned by Finance Transform, its licensors, or other providers of such
                  material and are protected by copyright, trademark, patent, trade secret, and other intellectual
                  property or proprietary rights laws.
                </p>

                <h2>7. User Content</h2>
                <p>
                  You retain all rights in any content that you submit, post, or display on or through our services
                  ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free
                  license to use, reproduce, modify, adapt, publish, translate, create derivative works from,
                  distribute, and display such User Content in connection with providing and promoting our services.
                </p>

                <h2>8. Prohibited Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use our services in any way that violates any applicable law or regulation</li>
                  <li>
                    Use our services for the purpose of exploiting, harming, or attempting to exploit or harm minors
                  </li>
                  <li>Attempt to gain unauthorized access to our services, other accounts, or computer systems</li>
                  <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our services</li>
                  <li>Use our services to send spam or other unsolicited communications</li>
                  <li>
                    Impersonate or attempt to impersonate Finance Transform, an employee, another user, or any other
                    person
                  </li>
                  <li>Engage in any other conduct that could damage, disable, overburden, or impair our services</li>
                </ul>

                <h2>9. Termination</h2>
                <p>
                  We may terminate or suspend your access to all or part of our services, with or without notice, for
                  any conduct that we, in our sole discretion, believe violates these Terms or is harmful to other
                  users, us, or third parties, or for any other reason.
                </p>

                <h2>10. Disclaimer of Warranties</h2>
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>

                <h2>11. Limitation of Liability</h2>
                <p>
                  IN NO EVENT WILL FINANCE TRANSFORM, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES,
                  AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT
                  OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICES, INCLUDING ANY DIRECT, INDIRECT,
                  SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>

                <h2>12. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Finance Transform, its affiliates, licensors, and
                  service providers, and its and their respective officers, directors, employees, contractors, agents,
                  licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages,
                  judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out
                  of or relating to your violation of these Terms or your use of our services.
                </p>

                <h2>13. Governing Law and Jurisdiction</h2>
                <p>
                  These Terms and your use of our services will be governed by and construed in accordance with the laws
                  of the State of New York, without giving effect to any choice or conflict of law provision or rule.
                  Any legal suit, action, or proceeding arising out of, or related to, these Terms or our services shall
                  be instituted exclusively in the federal courts of the United States or the courts of the State of New
                  York.
                </p>

                <h2>14. Waiver and Severability</h2>
                <p>
                  No waiver by Finance Transform of any term or condition set out in these Terms shall be deemed a
                  further or continuing waiver of such term or condition or a waiver of any other term or condition, and
                  any failure of Finance Transform to assert a right or provision under these Terms shall not constitute
                  a waiver of such right or provision.
                </p>

                <h2>15. Entire Agreement</h2>
                <p>
                  These Terms, our Privacy Policy, and any other agreements expressly incorporated by reference herein
                  constitute the sole and entire agreement between you and Finance Transform regarding our services and
                  supersede all prior and contemporaneous understandings, agreements, representations, and warranties,
                  both written and oral.
                </p>

                <h2>16. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <p>
                  Finance Transform
                  <br />
                  123 Finance Street
                  <br />
                  New York, NY 10001
                  <br />
                  Email: legal@financetransform.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithScroll>
  )
}
