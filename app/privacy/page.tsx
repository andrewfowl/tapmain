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
                <p className="text-corporate-600"><em>Last Updated: January 22, 2025</em></p>
                </div>
              <div className="prose max-w-none text-corporate-700">
<p>
  Techaccountingpro (“we,” “us,” or “our”) is committed to protecting the confidentiality and 
  privacy of the personal information we obtain via our websites, web-based and mobile 
  applications, in-person and virtual meetings or events, marketing materials, and other 
  related services (collectively, “Activities”). By engaging in these Activities, you acknowledge 
  and agree to our privacy practices as described below.
</p>

<hr />
<br />
<h2><strong>1. Information We Collect</strong></h2>
<p>We collect personal information in various ways:</p>

<ol>
  <li>
    <strong>Personal Information You Provide:</strong> When you sign up for newsletters, download content, 
    register for events, or contact us, we may collect information such as your name, email, phone number, 
    employer, dietary restrictions, or other details you voluntarily provide.
  </li>
  <li>
    <strong>Sensitive Personal Information:</strong> We only collect sensitive information (e.g., race, ethnicity, health data) 
    if you choose to provide it, and we will use it only as permitted by law and with your consent.
  </li>
  <li>
    <strong>Automatically Collected Information:</strong> We (and third-party providers) use cookies, web beacons, and 
    similar technologies to gather details about your device, IP address, browsing activity, and location (if enabled).
  </li>
  <li>
    <strong>Children:</strong> Our Activities are not intended for individuals under 18. We do not knowingly collect 
    personal information from children under 18 without parental consent.
  </li>
</ol>
<br />
<h2><strong>2. How We Use Personal Information</strong></h2>
<p>We use personal information to:</p>
<ul>
  <li>Provide and improve our services, respond to inquiries, and personalize user experiences.</li>
  <li>Perform business operations (e.g., background checks, audits, anti-money laundering and 
    “know-your-client” checks, data analytics, and benchmarking).</li>
  <li>Send marketing communications about our products, services, or events (you may opt out at any time).</li>
  <li>Comply with applicable laws, regulations, or professional standards.</li>
</ul>
<p>
  We may employ <strong>targeted advertising</strong> (i.e., interest-based ads) and share limited data (e.g., IP address, 
  cookie data) with advertising partners or analytics providers. You can opt out of certain online tracking 
  (see Section 4).
</p>
<br />
<h2><strong>3. Disclosure of Personal Information</strong></h2>
<ol>
  <li>
    <strong>Service Providers and Partners:</strong> We may share information with third parties who assist us in delivering 
    services (e.g., hosting, email distribution, advertising).
  </li>
  <li>
    <strong>Legal Requirements:</strong> We may disclose information to government authorities or as otherwise required by law, 
    court order, or professional standards.
  </li>
  <li>
    <strong>Corporate Transactions:</strong> In mergers, acquisitions, or sales of assets, information may be transferred subject 
    to confidentiality obligations.
  </li>
  <li>
    <strong>Cross-Border Transfers:</strong> Your information may be transferred across jurisdictions. We apply appropriate 
    safeguards and comply with relevant data protection laws.
  </li>
</ol>
<br />
<h2><strong>4. Your Choices</strong></h2>
<ul>
  <li><strong>Opt-Out:</strong> You can opt out of email marketing or targeted advertising by following unsubscribe links or 
    adjusting cookie settings in your browser.</li>
  <li><strong>State-Specific Rights:</strong> Depending on your U.S. state of residence (e.g., California, Colorado, Connecticut, 
    Delaware, Iowa, Nebraska, New Hampshire, New Jersey, Montana, Oregon, Texas, Utah, Virginia), you may have the right 
    to request access, correction, or deletion of your personal information, and/or to opt out of targeted advertising 
    or “sales” of personal information (as defined by law).</li>
  <li><strong>Requests:</strong> To exercise these rights or opt out, please submit a request via email to 
    <a href="mailto:info@techaccountingpro.com">info@techaccountingpro.com</a>. We will respond as required by applicable law.
  </li>
</ul>
<br />
<h2><strong>5. Data Security</strong></h2>
<p>
  We maintain reasonable administrative, technical, and physical safeguards to protect personal information from loss, 
  misuse, unauthorized access, disclosure, alteration, and destruction. However, no transmission of data over 
  the internet can be guaranteed to be completely secure.
</p>
<br />
<h2><strong>6. Additional Notices</strong></h2>
<p>
  <strong>Data Privacy Framework:</strong> Where applicable, we adhere to relevant data transfer frameworks (e.g., EU-U.S. 
  and Swiss-U.S. Data Privacy Frameworks) or use standard contractual clauses.
</p>
<p>
  <strong>Non-U.S. Residents:</strong> Our Activities primarily target the U.S., but we may collect and process data from 
  individuals outside the U.S. in accordance with applicable laws.
</p>
<br />
<h2><strong>7. Changes to This Privacy Policy</strong></h2>
<p>
  We may periodically update this Privacy Policy to reflect changes in our practices or applicable laws. We will revise 
  the “Last Updated” date above and encourage you to review this page regularly. Your continued use of our Activities 
  signifies your acceptance of the updated terms.
</p>
<br />
<h2><strong>8. Contact Us</strong></h2>
<p>
  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please email us at 
  <a href="mailto:info@techaccountingpro.com">info@techaccountingpro.com</a>.
</p>
<br />
<p>
  <em>&copy; 2025. All rights reserved by Techaccountingpro.</em>
</p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </LayoutWithScroll>
  )
}
