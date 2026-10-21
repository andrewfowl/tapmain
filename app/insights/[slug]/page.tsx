import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FOUNDER, JsonLd, SITE_URL } from "@/lib/structured-data"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getInsightBySlug, getAllInsightSlugs } from "@/actions/insights-actions"

interface InsightPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllInsightSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = await getInsightBySlug(slug)
  if (!insight) return {}
  return {
    title: insight.title,
    description: insight.hook,
    alternates: { canonical: `/insights/${slug}` },
    authors: [{ name: FOUNDER.name, url: FOUNDER.url }],
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.hook,
      publishedTime: insight.created_at,
      modifiedTime: insight.updated_at,
      ...(insight.image_url && { images: [insight.image_url] }),
    },
  }
}

export default async function InsightPage({ params }: InsightPageProps) {
  const insight = await getInsightBySlug(params.slug)

  if (!insight) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.hook,
          datePublished: insight.created_at,
          dateModified: insight.updated_at,
          author: FOUNDER,
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: `${SITE_URL}/insights/${insight.slug}`,
          ...(insight.image_url && { image: insight.image_url }),
        }}
      />
      {/* Back Navigation */}
      <section className="bg-white border-b border-corporate-100 pt-20">
        <div className="corporate-container py-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center text-corporate-700 hover:text-corporate-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="corporate-container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-corporate-100 text-corporate-700 hover:bg-corporate-200 mb-4">
                {insight.type || "Insight"}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-6 text-balance">{insight.title}</h1>
              {insight.hook && <p className="text-xl text-corporate-600 mb-8 leading-relaxed">{insight.hook}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-corporate-500 mb-8">
              <span>
                By{" "}
                <Link href="/#about" className="font-medium text-corporate-800 hover:underline">
                  {FOUNDER.name}
                </Link>
                , {FOUNDER.honorificSuffix}
              </span>
              <span>
                Last reviewed{" "}
                {new Date(insight.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date(insight.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>5 min read</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {insight.image_url && (
              <div className="mb-12 rounded-lg overflow-hidden border border-corporate-200 shadow-subtle">
                <img
                  src={insight.image_url || "/placeholder.svg"}
                  alt={insight.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-12">
        <div className="corporate-container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-corporate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: insight.content }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-corporate-50 py-16">
        <div className="corporate-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-corporate-900 mb-4">
              Ready to Transform Your Accounting Practice?
            </h2>
            <p className="text-xl text-corporate-600 mb-8">
              Explore our solutions and templates to accelerate your finance transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-corporate-800 hover:bg-corporate-700 text-white">
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-corporate-300 text-corporate-800 hover:bg-corporate-100 bg-transparent"
              >
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
