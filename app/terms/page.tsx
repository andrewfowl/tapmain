import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LayoutWithScroll } from "@/app/layout-with-scroll"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | TechAccountingPro",
  description:
    "Website Terms of Use for TechAccountingPro, LLC. Read our terms and conditions governing your use of our site and services.",
  openGraph: {
    title: "Terms of Use | TechAccountingPro",
    description: "Website Terms of Use for TechAccountingPro, LLC.",
    type: "website",
  },
}

export default function TermsOfServicePage() {
  return (
    <LayoutWithScroll>
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
        <div className="flex-1 py-12 md:py-16 lg:py-20">
          <div className="corporate-container">
            <article className="max-w-4xl mx-auto">
              <header className="mb-12 pb-8 border-b border-white/10">
                <nav aria-label="Breadcrumb" className="mb-6">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/" className="flex items-center text-white/50 hover:text-white transition-colors">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </nav>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 tracking-tight">
                  Website Terms of Use
                </h1>
                <p className="text-white/50 text-sm">
                  <time dateTime="2025-08-12">Last revised: August 12, 2025</time>
                </p>
              </header>

              <div className="space-y-12 text-white/70 leading-relaxed">
                {/* Introduction */}
                <section aria-labelledby="intro" className="space-y-6">
                  <p className="text-lg text-white/80">
                    The website located at https://techaccountingpro.com (the "Site") is a copyrighted work belonging to
                    TechAccountingPro, LLC ("Company", "us", "our", and "we"). Certain features of the Site may be
                    subject to additional guidelines, terms, or rules, which will be posted on the Site in connection
                    with such features. All such additional terms, guidelines, and rules are incorporated by reference
                    into these Terms.
                  </p>
                  <p>
                    These Terms of Use (these "Terms") set forth the legally binding terms and conditions that govern
                    your use of the Site. By accessing or using the Site, you are accepting these Terms (on behalf of
                    yourself or the entity that you represent), and you represent and warrant that you have the right,
                    authority, and capacity to enter into these Terms (on behalf of yourself or the entity that you
                    represent). You may not access or use the Site or accept the Terms if you are not at least 18 years
                    old. If you do not agree with all of the provisions of these Terms, do not access and/or use the
                    Site.
                  </p>

                  <div className="space-y-4 mt-8">
                    <aside className="bg-white/5 border border-white/10 p-6 rounded-lg" role="note">
                      <p className="text-white/90 font-medium mb-2">Important Notice</p>
                      <p className="text-sm">
                        Please be aware that Section 10.2 contains provisions governing how to resolve disputes between
                        you and Company. Among other things, Section 10.2 includes an agreement to arbitrate which
                        requires, with limited exceptions, that all disputes between you and us shall be resolved by
                        binding and final arbitration. Section 10.2 also contains a class action and jury trial waiver.
                        Please read Section 10.2 carefully.
                      </p>
                    </aside>
                    <aside className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-lg" role="note">
                      <p className="text-amber-200 font-medium mb-2">Arbitration Opt-Out Notice</p>
                      <p className="text-sm text-white/80">
                        Unless you opt out of the agreement to arbitrate within 30 days: (1) you will only be permitted
                        to pursue disputes or claims and seek relief against us on an individual basis, not as a
                        plaintiff or class member in any class or representative action or proceeding and you waive your
                        right to participate in a class action lawsuit or class-wide arbitration; and (2) you are
                        waiving your right to pursue disputes or claims and seek relief in a court of law and to have a
                        jury trial.
                      </p>
                    </aside>
                  </div>
                </section>

                {/* Section 1: Accounts */}
                <section aria-labelledby="accounts" className="space-y-6">
                  <h2 id="accounts" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    1. Accounts
                  </h2>

                  <div className="space-y-6 pl-4 border-l-2 border-white/10">
                    <div>
                      <h3 id="account-creation" className="text-lg font-medium text-white/90 mb-3">
                        1.1 Account Creation
                      </h3>
                      <p>
                        In order to use certain features of the Site, you must register for an account ("Account") and
                        provide certain information about yourself as prompted by the account registration form. You
                        represent and warrant that: (a) all required registration information you submit is truthful and
                        accurate; (b) you will maintain the accuracy of such information. You may delete your Account at
                        any time, for any reason, by following the instructions on the Site. The Company may suspend or
                        terminate your Account in accordance with Section 8.
                      </p>
                    </div>

                    <div>
                      <h3 id="account-responsibilities" className="text-lg font-medium text-white/90 mb-3">
                        1.2 Account Responsibilities
                      </h3>
                      <p>
                        You are responsible for maintaining the confidentiality of your Account login information and
                        are fully responsible for all activities that occur under your Account. You agree to immediately
                        notify Company of any unauthorized use, or suspected unauthorized use of your Account or any
                        other breach of security. The company cannot and will not be liable for any loss or damage
                        arising from your failure to comply with the above requirements.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2: Access to the Site */}
                <section aria-labelledby="access" className="space-y-6">
                  <h2 id="access" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    2. Access to the Site
                  </h2>

                  <div className="space-y-6 pl-4 border-l-2 border-white/10">
                    <div>
                      <h3 id="license" className="text-lg font-medium text-white/90 mb-3">
                        2.1 License
                      </h3>
                      <p>
                        Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited
                        license to use and access the Site solely for your own personal, noncommercial use.
                      </p>
                    </div>

                    <div>
                      <h3 id="restrictions" className="text-lg font-medium text-white/90 mb-3">
                        2.2 Certain Restrictions
                      </h3>
                      <p>
                        The rights granted to you in these Terms are subject to the following restrictions: (a) you
                        shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise
                        commercially exploit the Site, whether in whole or in part, or any content displayed on the
                        Site; (b) you shall not modify, make derivative works of, disassemble, reverse compile or
                        reverse engineer any part of the Site; (c) you shall not access the Site in order to build a
                        similar or competitive website, product, or service; and (d) except as expressly stated herein,
                        no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed,
                        posted or transmitted in any form or by any means. Unless otherwise indicated, any future
                        release, update, or other addition to functionality of the Site shall be subject to these Terms.
                        All copyright and other proprietary notices on the Site (or on any content displayed on the
                        Site) must be retained on all copies thereof.
                      </p>
                    </div>

                    <div>
                      <h3 id="modification" className="text-lg font-medium text-white/90 mb-3">
                        2.3 Modification
                      </h3>
                      <p>
                        The Company reserves the right, at any time, to modify, suspend, or discontinue the Site (in
                        whole or in part) with or without notice to you. You agree that Company will not be liable to
                        you or to any third party for any modification, suspension, or discontinuation of the Site or
                        any part thereof.
                      </p>
                    </div>

                    <div>
                      <h3 id="no-support" className="text-lg font-medium text-white/90 mb-3">
                        2.4 No Support or Maintenance
                      </h3>
                      <p>
                        You acknowledge and agree that Company will have no obligation to provide you with any support
                        or maintenance in connection with the Site.
                      </p>
                    </div>

                    <div>
                      <h3 id="ownership" className="text-lg font-medium text-white/90 mb-3">
                        2.5 Ownership
                      </h3>
                      <p>
                        Excluding any User Content that you may provide (defined below), you acknowledge that all the
                        intellectual property rights, including copyrights, patents, trade marks, and trade secrets, in
                        the Site and its content are owned by Company or Company's suppliers. Neither these Terms nor
                        your access to the Site transfers to you or any third party any rights, title, or interest in or
                        to such intellectual property rights, except for the limited access rights expressly set forth
                        in Section 2.1. The company and its suppliers reserve all rights not granted in these Terms.
                        There are no implied licenses granted under these Terms.
                      </p>
                    </div>

                    <div>
                      <h3 id="feedback" className="text-lg font-medium text-white/90 mb-3">
                        2.6 Feedback
                      </h3>
                      <p>
                        If you provide Company with any feedback or suggestions regarding the Site ("Feedback"), you
                        hereby assign to Company all rights in such Feedback and agree that Company shall have the right
                        to use and fully exploit such Feedback and related information in any manner it deems
                        appropriate. The Company will treat any Feedback you provide to the Company as non-confidential
                        and non-proprietary. You agree that you will not submit to the Company any information or ideas
                        that you consider to be confidential or proprietary.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: User Content */}
                <section aria-labelledby="user-content" className="space-y-6">
                  <h2
                    id="user-content"
                    className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10"
                  >
                    3. User Content
                  </h2>

                  <div className="space-y-6 pl-4 border-l-2 border-white/10">
                    <div>
                      <h3 id="user-content-def" className="text-lg font-medium text-white/90 mb-3">
                        3.1 User Content
                      </h3>
                      <p>
                        "User Content" means any and all information and content that a user submits to, or uses with,
                        the Site (e.g., content in the user's profile or postings). You are solely responsible for your
                        User Content. You assume all risks associated with the use of your User Content, including any
                        reliance on its accuracy, completeness, or usefulness by others, or any disclosure of your User
                        Content that personally identifies you or any third party. You hereby represent and warrant that
                        your User Content does not violate our Acceptable Use Policy (defined in Section 3.3). You may
                        not represent or imply to others that your User Content is in any way provided, sponsored, or
                        endorsed by Company. Since you alone are responsible for your User Content, you may expose
                        yourself to liability if, for example, your User Content violates the Acceptable Use Policy. The
                        company is not obligated to back up any User Content, and your User Content may be deleted at
                        any time without prior notice. You are solely responsible for creating and maintaining your own
                        backup copies of your User Content if you desire.
                      </p>
                    </div>

                    <div>
                      <h3 id="content-license" className="text-lg font-medium text-white/90 mb-3">
                        3.2 License
                      </h3>
                      <p>
                        You hereby grant (and you represent and warrant that you have the right to grant) to Company an
                        irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce,
                        distribute, publicly display and perform, prepare derivative works of, incorporate into other
                        works, and otherwise use and exploit your User Content, and to grant sublicenses of the
                        foregoing rights, solely for the purposes of including your User Content in the Site. You hereby
                        irrevocably waive (and agree to cause to be waived) any claims and assertions of moral rights or
                        attribution with respect to your User Content.
                      </p>
                    </div>

                    <div>
                      <h3 id="acceptable-use" className="text-lg font-medium text-white/90 mb-3">
                        3.3 Acceptable Use Policy
                      </h3>
                      <p className="mb-4">The following terms constitute our "Acceptable Use Policy":</p>
                      <p className="mb-4">
                        (a) You agree not to use the Site to collect, upload, transmit, display, or distribute any User
                        Content (i) that violates any third-party right, including any copyright, trademark, patent,
                        trade secret, moral right, privacy right, right of publicity, or any other intellectual property
                        or proprietary right, (ii) that is unlawful, harassing, abusive, tortious, threatening, harmful,
                        invasive of another's privacy, vulgar, defamatory, false, intentionally misleading, trade
                        libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, hatred, or
                        physical harm of any kind against any group or individual or is otherwise objectionable, (iii)
                        that is harmful to minors in any way, or (iv) that is in violation of any law, regulation, or
                        obligations or restrictions imposed by any third party.
                      </p>
                      <p className="mb-3">(b) In addition, you agree not to:</p>
                      <ul className="list-disc pl-6 space-y-2 text-white/70">
                        <li>
                          upload, transmit, or distribute to or through the Site any computer viruses, worms, or any
                          software intended to damage or alter a computer system or data;
                        </li>
                        <li>
                          send through the Site unsolicited or unauthorized advertising, promotional materials, junk
                          mail, spam, chain letters, pyramid schemes, or any other form of duplicative or unsolicited
                          messages, whether commercial or otherwise;
                        </li>
                        <li>
                          use the Site to harvest, collect, gather, or assemble information or data regarding other
                          users, including e-mail addresses, without their consent;
                        </li>
                        <li>
                          interfere with, disrupt, or create an undue burden on servers or networks connected to the
                          Site, or violate the regulations, policies or procedures of such networks;
                        </li>
                        <li>
                          attempt to gain unauthorized access to the Site (or to other computer systems or networks
                          connected to or used together with the Site), whether through password mining or any other
                          means;
                        </li>
                        <li>harass or interfere with any other user's use and enjoyment of the Site; or</li>
                        <li>
                          use software or automated agents or scripts to produce multiple accounts on the Site, or to
                          generate automated searches, requests, or queries to (or to strip, scrape, or mine data from)
                          the Site.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 id="enforcement" className="text-lg font-medium text-white/90 mb-3">
                        3.4 Enforcement
                      </h3>
                      <p>
                        We reserve the right (but have no obligation) to review, refuse and/or remove any User Content
                        in our sole discretion, and to investigate and/or take appropriate action against you in our
                        sole discretion if you violate the Acceptable Use Policy or any other provision of these Terms
                        or otherwise create liability for us or any other person. Such action may include removing or
                        modifying your User Content, terminating your Account in accordance with Section 8, and/or
                        reporting you to law enforcement authorities.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Indemnification */}
                <section aria-labelledby="indemnification" className="space-y-6">
                  <h2
                    id="indemnification"
                    className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10"
                  >
                    4. Indemnification
                  </h2>
                  <p>
                    You agree to indemnify and hold Company (and its officers, employees, and agents) harmless,
                    including costs and attorneys' fees, from any claim or demand made by any third party due to or
                    arising out of (a) your use of the Site, (b) your violation of these Terms, (c) your violation of
                    applicable laws or regulations or (d) your User Content. The company reserves the right, at your
                    expense, to assume the exclusive defense and control of any matter for which you are required to
                    indemnify us, and you agree to cooperate with our defense of these claims. You agree not to settle
                    any matter without the prior written consent of the Company. The company will use reasonable efforts
                    to notify you of any such claim, action, or proceeding upon becoming aware of it.
                  </p>
                </section>

                {/* Section 5: Third-Party Links & Ads */}
                <section aria-labelledby="third-party" className="space-y-6">
                  <h2 id="third-party" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    5. Third-Party Links & Ads; Other Users
                  </h2>

                  <div className="space-y-6 pl-4 border-l-2 border-white/10">
                    <div>
                      <h3 id="third-party-links" className="text-lg font-medium text-white/90 mb-3">
                        5.1 Third-Party Links & Ads
                      </h3>
                      <p>
                        The Site may contain links to third-party websites and services, and/or display advertisements
                        for third parties (collectively, "Third-Party Links & Ads"). Such Third-Party Links & Ads are
                        not under the control of Company, and Company is not responsible for any Third-Party Links &
                        Ads. The company provides access to these Third-Party Links & Ads only as a convenience to you,
                        and does not review, approve, monitor, endorse, warrant, or make any representations with
                        respect to Third-Party Links & Ads. You use all Third-Party Links & Ads at your own risk, and
                        should apply a suitable level of caution and discretion in doing so. When you click on any of
                        the Third-Party Links & Ads, the applicable third party's terms and policies apply, including
                        the third party's privacy and data gathering practices. You should make whatever investigation
                        you feel necessary or appropriate before proceeding with any transaction in connection with such
                        Third-Party Links & Ads.
                      </p>
                    </div>

                    <div>
                      <h3 id="other-users" className="text-lg font-medium text-white/90 mb-3">
                        5.2 Other Users
                      </h3>
                      <p>
                        Each Site user is solely responsible for any and all of its own User Content. Since we do not
                        control User Content, you acknowledge and agree that we are not responsible for any User
                        Content, whether provided by you or by others. We make no guarantees regarding the accuracy,
                        currency, suitability, appropriateness, or quality of any User Content. Your interactions with
                        other Site users are solely between you and such users. You agree that Company will not be
                        responsible for any loss or damage incurred as the result of any such interactions. If there is
                        a dispute between you and any Site user, we are under no obligation to become involved.
                      </p>
                    </div>

                    <div>
                      <h3 id="release" className="text-lg font-medium text-white/90 mb-3">
                        5.3 Release
                      </h3>
                      <p className="mb-4">
                        You hereby release and forever discharge Company (and our officers, employees, agents,
                        successors, and assigns) from, and hereby waive and relinquish, each and every past, present and
                        future dispute, claim, controversy, demand, right, obligation, liability, action and cause of
                        action of every kind and nature (including personal injuries, death, and property damage), that
                        has arisen or arises directly or indirectly out of, or that relates directly or indirectly to,
                        the Site (including any interactions with, or act or omission of, other Site users or any
                        Third-Party Links & Ads).
                      </p>
                      <aside className="bg-white/5 border border-white/10 p-5 rounded-lg text-sm" role="note">
                        <p className="text-white/90 font-medium mb-2">California Residents</p>
                        <p className="text-white/70">
                          If you are a California resident, you hereby waive California Civil Code Section 1542 in
                          connection with the foregoing, which states: "A general release does not extend to claims
                          which the creditor or releasing party does not know or suspect to exist in his or her favor at
                          the time of executing the release, which if known by him or her must have materially affected
                          his or her settlement with the debtor or released party."
                        </p>
                      </aside>
                    </div>
                  </div>
                </section>

                {/* Section 6: Disclaimers */}
                <section aria-labelledby="disclaimers" className="space-y-6">
                  <h2 id="disclaimers" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    6. Disclaimers
                  </h2>
                  <aside className="bg-white/5 border border-white/10 p-6 rounded-lg" role="note">
                    <p className="text-white/90 font-medium mb-3">Service Disclaimer</p>
                    <p className="text-white/70 text-sm">
                      The Site is provided on an "as-is" and "as available" basis, and Company (and our suppliers)
                      expressly disclaim any and all warranties and conditions of any kind, whether express, implied, or
                      statutory, including all warranties or conditions of merchantability, fitness for a particular
                      purpose, title, quiet enjoyment, accuracy, or non-infringement. We (and our suppliers) make no
                      warranty that the Site will meet your requirements, will be available on an uninterrupted, timely,
                      secure, or error-free basis, or will be accurate, reliable, free of viruses or other harmful code,
                      complete, legal, or safe. If applicable law requires any warranties with respect to the Site, all
                      such warranties are limited in duration to 90 days from the date of first use.
                    </p>
                  </aside>
                  <p className="text-sm text-white/60">
                    Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusion may not
                    apply to you. Some jurisdictions do not allow limitations on how long an implied warranty lasts, so
                    the above limitation may not apply to you.
                  </p>
                </section>

                {/* Section 7: Limitation on Liability */}
                <section aria-labelledby="liability" className="space-y-6">
                  <h2 id="liability" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    7. Limitation on Liability
                  </h2>
                  <div className="space-y-4">
                    <aside className="bg-white/5 border border-white/10 p-6 rounded-lg" role="note">
                      <p className="text-white/90 font-medium mb-3">Liability Limitation</p>
                      <p className="text-white/70 text-sm">
                        To the maximum extent permitted by law, in no event shall Company (or our suppliers) be liable
                        to you or any third party for any lost profits, lost data, costs of procurement of substitute
                        products, or any indirect, consequential, exemplary, incidental, special or punitive damages
                        arising from or relating to these Terms or your use of, or inability to use, the Site, even if
                        Company has been advised of the possibility of such damages. Access to, and use of, the Site is
                        at your own discretion and risk, and you will be solely responsible for any damage to your
                        device or computer system, or loss of data resulting therefrom.
                      </p>
                    </aside>
                    <aside className="bg-white/5 border border-white/10 p-6 rounded-lg" role="note">
                      <p className="text-white/90 font-medium mb-3">Maximum Liability</p>
                      <p className="text-white/70 text-sm">
                        To the maximum extent permitted by law, notwithstanding anything to the contrary contained
                        herein, our liability to you for any damages arising from or related to these Terms (for any
                        cause whatsoever and regardless of the form of the action), will at all times be limited to a
                        maximum of fifty US dollars ($50). The existence of more than one claim will not enlarge this
                        limit. You agree that our suppliers will have no liability of any kind arising from or relating
                        to these Terms.
                      </p>
                    </aside>
                  </div>
                  <p className="text-sm text-white/60">
                    Some jurisdictions do not allow the limitation or exclusion of liability for incidental or
                    consequential damages, so the above limitation or exclusion may not apply to you.
                  </p>
                </section>

                {/* Section 8: Term and Termination */}
                <section aria-labelledby="termination" className="space-y-6">
                  <h2 id="termination" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    8. Term and Termination
                  </h2>
                  <p>
                    Subject to this Section, these Terms will remain in full force and effect while you use the Site. We
                    may suspend or terminate your rights to use the Site (including your Account) at any time for any
                    reason at our sole discretion, including for any use of the Site in violation of these Terms. Upon
                    termination of your rights under these Terms, your Account and right to access and use the Site will
                    terminate immediately. You understand that any termination of your Account may involve deletion of
                    your User Content associated with your Account from our live databases. The Company will not have
                    any liability whatsoever to you for any termination of your rights under these Terms, including for
                    termination of your Account or deletion of your User Content. Even after your rights under these
                    Terms are terminated, the following provisions of these Terms will remain in effect: Sections 2.2
                    through 2.6, Section 3, and Sections 4 through 10.
                  </p>
                </section>

                {/* Section 9: Copyright Policy */}
                <section aria-labelledby="copyright" className="space-y-6">
                  <h2 id="copyright" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    9. Copyright Policy
                  </h2>
                  <p>
                    The Company respects the intellectual property of others and asks that users of our Site do the
                    same. In connection with our Site, we have adopted and implemented a policy respecting copyright law
                    that provides for the removal of any infringing materials and for the termination, in appropriate
                    circumstances, of users of our online Site who are repeat infringers of intellectual property
                    rights, including copyrights. If you believe that one of our users is, through the use of our Site,
                    unlawfully infringing the copyright(s) in a work, and wish to have the allegedly infringing material
                    removed, the following information in the form of a written notification (pursuant to 17 U.S.C. §
                    512(c)) must be provided to us at{" "}
                    <a href="mailto:info@techaccountingpro.com" className="text-white hover:underline">
                      info@techaccountingpro.com
                    </a>
                    :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-white/70 my-4">
                    <li>your physical or electronic signature;</li>
                    <li>identification of the copyrighted work(s) that you claim to have been infringed;</li>
                    <li>
                      identification of the material on our services that you claim is infringing and that you request
                      us to remove;
                    </li>
                    <li>sufficient information to permit us to locate such material;</li>
                    <li>your address, telephone number, and e-mail address;</li>
                    <li>
                      a statement that you have a good faith belief that use of the objectionable material is not
                      authorized by the copyright owner, its agent, or under the law; and
                    </li>
                    <li>
                      a statement that the information in the notification is accurate, and under penalty of perjury,
                      that you are either the owner of the copyright that has allegedly been infringed or that you are
                      authorized to act on behalf of the copyright owner.
                    </li>
                  </ul>
                  <p className="text-sm text-white/60">
                    Please note that, under 17 U.S.C. § 512(f), any misrepresentation of a material fact (falsities) in
                    a written notification automatically subjects the complaining party to liability for any damages,
                    costs, and attorney's fees incurred by us in connection with the written notification and allegation
                    of copyright infringement.
                  </p>
                </section>

                {/* Section 10: General */}
                <section aria-labelledby="general" className="space-y-6">
                  <h2 id="general" className="text-2xl font-semibold text-white pt-8 pb-4 border-b border-white/10">
                    10. General
                  </h2>

                  <div className="space-y-8 pl-4 border-l-2 border-white/10">
                    <div>
                      <h3 id="changes" className="text-lg font-medium text-white/90 mb-3">
                        10.1 Changes
                      </h3>
                      <p>
                        These Terms are subject to occasional revision, and if we make any substantial changes, we may
                        notify you by sending you an e-mail to the last e-mail address you provided to us (if any),
                        and/or by prominently posting notice of the changes on our Site. You are responsible for
                        providing us with your most current e-mail address. In the event that the last e-mail address
                        that you have provided us is not valid, or for any reason is not capable of delivering to you
                        the notice described above, our dispatch of the e-mail containing such notice will nonetheless
                        constitute effective notice of the changes described in the notice. Continued use of our Site
                        following notice of such changes shall indicate your acknowledgement of such changes and
                        agreement to be bound by the terms and conditions of such changes.
                      </p>
                    </div>

                    <div>
                      <h3 id="dispute-resolution" className="text-lg font-medium text-white/90 mb-3">
                        10.2 Dispute Resolution
                      </h3>
                      <p className="mb-4">
                        Please read the following arbitration agreement in this Section (the "Arbitration Agreement")
                        carefully. It requires you to arbitrate disputes with the Company, its parent companies,
                        subsidiaries, affiliates, successors, and assigns, and all of their respective officers,
                        directors, employees, agents, and representatives (collectively, the "Company Parties") and
                        limits the manner in which you can seek relief from the Company Parties.
                      </p>

                      <div className="space-y-4 text-sm">
                        <p>
                          <strong className="text-white/90">(a) Applicability of Arbitration Agreement.</strong> You
                          agree that any dispute between you and any of the Company Parties relating in any way to the
                          Site, the services offered on the Site (the "Services") or these Terms will be resolved by
                          binding arbitration, rather than in court, except that (1) you and the Company Parties may
                          assert individualized claims in small claims court if the claims qualify, remain in such court
                          and advance solely on an individual, non-class basis; and (2) you or the Company Parties may
                          seek equitable relief in court for infringement or other misuse of intellectual property
                          rights (such as trademarks, trade dress, domain names, trade secrets, copyrights, and
                          patents).
                        </p>

                        <p>
                          <strong className="text-white/90">(b) Informal Dispute Resolution.</strong> There might be
                          instances when a Dispute arises between you and the Company. If that occurs, the Company is
                          committed to working with you to reach a reasonable resolution. You and Company agree that
                          good-faith informal efforts to resolve Disputes can result in a prompt, low‐cost, and mutually
                          beneficial outcome. The party initiating a Dispute must give notice to the other party in
                          writing of its intent to initiate an Informal Dispute Resolution Conference ("Notice"), which
                          shall occur within 45 days after the other party receives such Notice. Notice to the Company
                          should be sent by email to:{" "}
                          <a href="mailto:info@techaccountingpro.com" className="text-white hover:underline">
                            info@techaccountingpro.com
                          </a>
                          .
                        </p>

                        <p>
                          <strong className="text-white/90">(c) Arbitration Rules and Forum.</strong> The arbitration
                          will be conducted by JAMS, an established alternative dispute resolution provider. JAMS's
                          rules are available at www.jamsadr.com or by calling JAMS at 800-352-5267. Unless you and
                          Company otherwise agree, the arbitration will be conducted in the county where you reside.
                        </p>

                        <p>
                          <strong className="text-white/90">(d) Authority of Arbitrator.</strong> The arbitrator shall
                          have exclusive authority to (i) determine the scope and enforceability of this Arbitration
                          Agreement and (ii) resolve any dispute related to the interpretation, applicability,
                          enforceability, or formation of this Arbitration Agreement including, but not limited to, any
                          assertion that all or any part of this Arbitration Agreement is void or voidable.
                        </p>

                        <aside className="bg-white/5 border border-white/10 p-5 rounded-lg my-4" role="note">
                          <p className="text-white/90 font-medium mb-2">(e) Waiver of Jury Trial</p>
                          <p className="text-white/70">
                            Except as specified in Section 10.2(a), you and the Company Parties hereby waive any
                            constitutional and statutory rights to sue in court and have a trial in front of a judge or
                            a jury. You and the Company Parties are instead electing that all covered claims and
                            disputes shall be resolved exclusively by arbitration under this Arbitration Agreement.
                          </p>
                        </aside>

                        <aside className="bg-white/5 border border-white/10 p-5 rounded-lg my-4" role="note">
                          <p className="text-white/90 font-medium mb-2">
                            (f) Waiver of Class or Other Non-Individualized Relief
                          </p>
                          <p className="text-white/70">
                            You and Company agree that each of us may bring claims against the other only on an
                            individual basis and not on a class, representative, or collective basis, and the parties
                            hereby waive all rights to have any dispute be brought, heard, administered, resolved, or
                            arbitrated on a class, collective, representative, or mass action basis. Only individual
                            relief is available.
                          </p>
                        </aside>

                        <p>
                          <strong className="text-white/90">(g) Rules of JAMS.</strong> The rules of, and additional
                          information about, JAMS are available on the JAMS website at www.jamsadr.com, as may be
                          updated from time to time. By agreeing to be bound by these Terms, you either (i) acknowledge
                          and agree that you have read and understand the rules of JAMS, or (ii) waive your opportunity
                          to read the rules of JAMS and any claim that the rules of JAMS are unfair or should not apply
                          for any reason.
                        </p>

                        <p>
                          <strong className="text-white/90">(h) Severability of Arbitration Agreement.</strong> If any
                          term, clause, or provision of this Arbitration Agreement is held invalid or unenforceable, it
                          will be so held to the minimum extent required by law, and all other terms, clauses, and
                          provisions of this Arbitration Agreement will remain valid and enforceable.
                        </p>

                        <p>
                          <strong className="text-white/90">(i) 30-Day Right to Opt Out.</strong> You have the right to
                          opt out of the provisions of this Arbitration Agreement by sending a timely written notice of
                          your decision to opt out by email to{" "}
                          <a href="mailto:info@techaccountingpro.com" className="text-white hover:underline">
                            info@techaccountingpro.com
                          </a>
                          , within 30 days after first becoming subject to this Arbitration Agreement.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 id="export" className="text-lg font-medium text-white/90 mb-3">
                        10.3 Export
                      </h3>
                      <p>
                        The Site may be subject to U.S. export control laws and may be subject to export or import
                        regulations in other countries. You agree not to export, reexport, or transfer, directly or
                        indirectly, any U.S. technical data acquired from Company, or any products utilizing such data,
                        in violation of the United States export laws or regulations.
                      </p>
                    </div>

                    <div>
                      <h3 id="disclosures" className="text-lg font-medium text-white/90 mb-3">
                        10.4 Disclosures
                      </h3>
                      <p>
                        The company is located at the address in Section 10.8. If you are a California resident, you may
                        report complaints to the Complaint Assistance Unit of the Division of Consumer Product of the
                        California Department of Consumer Affairs by contacting them in writing at 400 R Street,
                        Sacramento, CA 95814, or by telephone at (800) 952-5210.
                      </p>
                    </div>

                    <div>
                      <h3 id="electronic-communications" className="text-lg font-medium text-white/90 mb-3">
                        10.5 Electronic Communications
                      </h3>
                      <p>
                        The communications between you and Company use electronic means, whether you use the Site or
                        send us emails, or whether Company posts notices on the Site or communicates with you via email.
                        For contractual purposes, you (a) consent to receive communications from Company in an
                        electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures,
                        and other communications that Company provides to you electronically satisfy any legal
                        requirement that such communications would satisfy if they were in hardcopy form.
                      </p>
                    </div>

                    <div>
                      <h3 id="entire-terms" className="text-lg font-medium text-white/90 mb-3">
                        10.6 Entire Terms
                      </h3>
                      <p>
                        These Terms constitute the entire agreement between you and us regarding the use of the Site.
                        Our failure to exercise or enforce any right or provision of these Terms shall not operate as a
                        waiver of such right or provision. The section titles in these Terms are for convenience only
                        and have no legal or contractual effect. The word "including" means "including without
                        limitation". If any provision of these Terms is, for any reason, held to be invalid or
                        unenforceable, the other provisions of these Terms will be unimpaired and the invalid or
                        unenforceable provision will be deemed modified so that it is valid and enforceable to the
                        maximum extent permitted by law.
                      </p>
                    </div>

                    <div>
                      <h3 id="trademark" className="text-lg font-medium text-white/90 mb-3">
                        10.7 Copyright/Trademark Information
                      </h3>
                      <p>
                        Copyright © 2025 TechAccountingPro, LLC. All rights reserved. All trademarks, logos, and service
                        marks ("Marks") displayed on the Site are our property or the property of other third parties.
                        You are not permitted to use these Marks without our prior written consent or the consent of
                        such third party that owns the Marks.
                      </p>
                    </div>

                    <div>
                      <h3 id="contact" className="text-lg font-medium text-white/90 mb-3">
                        10.8 Contact Information
                      </h3>
                      <address className="not-italic bg-white/5 border border-white/10 p-5 rounded-lg">
                        <p className="text-white font-medium mb-2">TechAccountingPro</p>
                        <p className="text-white/70">Louisville, Kentucky 40206</p>
                        <p className="text-white/70 mt-2">
                          Telephone:{" "}
                          <a href="tel:+15022860115" className="text-white hover:underline">
                            (502) 286-0115
                          </a>
                        </p>
                        <p className="text-white/70">
                          Email:{" "}
                          <a href="mailto:info@techaccountingpro.com" className="text-white hover:underline">
                            info@techaccountingpro.com
                          </a>
                        </p>
                      </address>
                    </div>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </div>
    </LayoutWithScroll>
  )
}
