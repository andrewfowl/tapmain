import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"
import { getPublishedNews } from "@/actions/news-actions"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  image_url: string | null
  featured: boolean
  slug: string
  created_at: string
  updated_at: string
}

export default async function NewsSection() {
  const result = await getPublishedNews(6)

  if (!result.success || !result.data) {
    return null
  }

  const news = result.data as NewsItem[]

  if (news.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Company News & Updates</h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed about our latest developments, insights, and industry updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-rows-[auto_auto_1fr] h-full">
                
                {(
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={"/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
             
          

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                    {item.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <CardTitle className="line-clamp-2 min-h-[3.5rem]">{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
