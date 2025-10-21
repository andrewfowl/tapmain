import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

interface NewsPageProps {
  params: {
    slug: string
  }
}

async function getNewsBySlug(slug: string) {
  const supabase = createClient()

  const { data: news } = await supabase.from("news").select("*").eq("slug", slug).eq("published", true).single()

  return news
}

export default async function NewsPage({ params }: NewsPageProps) {
  const news = await getNewsBySlug(params.slug)

  if (!news) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col pt-20">
      <div className="corporate-container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/#updates">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Updates
            </Link>
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <Badge className="bg-accent2-100 text-accent2-700 hover:bg-accent2-200 mb-4">News</Badge>

            <h1 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-4 text-balance">{news.title}</h1>

            {news.excerpt && <p className="text-xl text-corporate-700 mb-6">{news.excerpt}</p>}

            <div className="flex items-center gap-4 text-sm text-corporate-500">
              <span>Published on {new Date(news.created_at).toLocaleDateString()}</span>
              {news.updated_at !== news.created_at && (
                <span>Updated on {new Date(news.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {news.image_url && (
            <div className="mb-8">
              <img
                src={news.image_url || "/placeholder.svg"}
                alt={news.title}
                className="w-full rounded-lg shadow-elevated border border-corporate-200"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-corporate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          {/* Back to Updates */}
          <div className="mt-12 pt-8 border-t border-corporate-200">
            <Button asChild className="bg-corporate-800 hover:bg-corporate-700 text-white">
              <Link href="/#updates">View All Updates</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
