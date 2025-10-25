import Link from "next/link"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  const faqs = [
    {
      question: "How quickly can I implement your finance transformation templates?",
      answer:
        "Most of our templates can be implemented within 2-4 weeks, depending on the complexity of your finance function and the level of customization required. Our implementation specialists can provide a more accurate timeline based on your specific needs.",
    },
    {
      question: "Do you offer custom finance transformation solutions?",
      answer:
        "Yes, we offer custom finance transformation solutions tailored to your organization's specific needs. Our team of finance experts will work with you to understand your requirements and develop a customized solution that addresses your unique challenges.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We have expertise across multiple industries including technology, healthcare, manufacturing, financial services, retail, and professional services. Our templates and methodologies are designed to be adaptable to various industry contexts.",
    },
    {
      question: "Do you provide support after implementation?",
      answer:
        "Yes, we offer ongoing support packages to ensure your finance transformation initiative continues to deliver value. Our support includes regular check-ins, troubleshooting, optimization recommendations, and access to our knowledge base.",
    },
    {
      question: "How do you measure the success of a finance transformation?",
      answer:
        "We measure success through a combination of quantitative metrics (cost reduction, time savings, accuracy improvements) and qualitative outcomes (improved decision-making, stakeholder satisfaction). We work with you to establish KPIs at the beginning of the engagement.",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Hero Section */}
      <section className="relative bg-corporate-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-radial from-accent1-100 to-transparent opacity-70"></div>

        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-accent1-100 text-accent1-700 hover:bg-accent1-200 mb-4">Contact Us</Badge>
            <h1 className="text-balance mb-6">
              Let's Start Your <span className="text-gradient">Finance Transformation</span> Journey
            </h1>
            <p className="text-xl text-corporate-600 max-w-2xl">
              Our team of finance experts is ready to help you transform your finance function. Reach out to us to
              discuss your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="corporate-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif text-corporate-900 mb-8">Get in Touch</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-corporate-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-corporate-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-corporate-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-corporate-700">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-corporate-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-corporate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-corporate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-corporate-500"
                    placeholder="Tell us about your finance transformation needs"
                  ></textarea>
                </div>

                <Button className="w-full md:w-auto bg-corporate-800 hover:bg-corporate-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-serif text-corporate-900 mb-8">Contact Information</h2>

              <div className="space-y-8">
                <Card className="border border-corporate-200">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-corporate-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-corporate-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-corporate-900 mb-1">Email Us</h3>
                      <p className="text-corporate-600 mb-2">Our team will respond within 24 hours</p>
                      <a href="mailto:info@financetransform.com" className="text-corporate-800 hover:underline">
                        info@financetransform.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-corporate-200">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-corporate-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-corporate-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-corporate-900 mb-1">Call Us</h3>
                      <p className="text-corporate-600 mb-2">Monday to Friday, 9am-6pm EST</p>
                      <a href="tel:5022860115" className="text-corporate-800 hover:underline">
                        502 286 0115
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-corporate-200">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-corporate-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-corporate-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-corporate-900 mb-1">Visit Us</h3>
                      <p className="text-corporate-600 mb-2">Our headquarters</p>
                      <address className="not-italic text-corporate-800">
                        123 Finance Street
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </address>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-corporate-200">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-corporate-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-corporate-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-corporate-900 mb-1">Business Hours</h3>
                      <p className="text-corporate-600 mb-2">When we're available</p>
                      <div className="text-corporate-800">
                        <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>9:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span>Closed</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-corporate-50">
        <div className="corporate-container">
          <h2 className="text-3xl font-serif text-corporate-900 mb-8 text-center">Our Location</h2>
          <div className="h-96 bg-corporate-200 rounded-lg overflow-hidden">
            {/* This would be replaced with an actual map component */}
            <div className="w-full h-full flex items-center justify-center bg-corporate-100">
              <p className="text-corporate-600">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="corporate-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-corporate-900 mb-8 text-center">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-corporate-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-corporate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-corporate-600 mb-4">Don't see your question here? Reach out to our team directly.</p>
              <Button asChild className="bg-corporate-800 hover:bg-corporate-700 text-white">
                <Link href="#contact-form">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-corporate-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-accent1-500/20 to-transparent"></div>

        <div className="corporate-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Ready to Transform Your Finance Function?
            </h2>
            <p className="text-xl text-corporate-200 mb-8">
              Schedule a free consultation with one of our finance transformation experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-corporate-800 hover:bg-corporate-100">
                <Link href="#contact-form">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
