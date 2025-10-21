import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Search, Filter, ChevronDown } from "lucide-react"

export function TemplatesPageSkeleton() {
  return (
    <>
      {/* Hero Section - Shows immediately */}
      <section className="relative bg-corporate-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-radial from-accent1-100 to-transparent opacity-70"></div>

        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-accent1-100 text-accent1-700 hover:bg-accent1-200 mb-4">Template Library</Badge>
            <h1 className="text-balance mb-6">
              Discover Expert-Designed <span className="text-gradient">Finance Templates</span>
            </h1>
            <p className="text-xl text-corporate-600 max-w-2xl">
              Access our comprehensive collection of templates to accelerate your finance transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar - Shows immediately */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-corporate-200 py-4">
        <div className="corporate-container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10 border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                disabled
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select disabled>
                <SelectTrigger className="w-full md:w-[180px] border-corporate-200">
                  <span className="text-corporate-400">Loading categories...</span>
                </SelectTrigger>
              </Select>

              <Button
                variant="outline"
                className="border-corporate-200 text-corporate-400 gap-2 bg-transparent"
                disabled
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Sort by:</span>
                <span>Loading...</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton for Templates Grid */}
      <div className="flex-1 py-12">
        <div className="corporate-container">
          <div className="mb-6">
            <div className="h-5 bg-corporate-100 rounded w-48 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border border-corporate-200">
                <div className="aspect-video w-full bg-corporate-100 animate-pulse"></div>

                <CardHeader className="pb-2">
                  <div className="h-6 bg-corporate-100 rounded animate-pulse"></div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-corporate-100 rounded animate-pulse"></div>
                    <div className="h-4 bg-corporate-100 rounded w-3/4 animate-pulse"></div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-corporate-100 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-corporate-100 rounded w-16 animate-pulse"></div>
                  </div>

                  <div className="h-3 bg-corporate-100 rounded w-20 animate-pulse"></div>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="h-9 bg-corporate-100 rounded w-20 animate-pulse"></div>
                  <div className="h-9 bg-corporate-100 rounded w-24 animate-pulse"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Shows immediately */}
      <section className="bg-corporate-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-accent1-500/20 to-transparent"></div>

        <div className="corporate-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-corporate-200 mb-8">
              Our team of finance experts can create custom templates tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-corporate-800 hover:bg-corporate-100" disabled>
                Request Custom Template
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                disabled
              >
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
