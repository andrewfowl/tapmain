"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Template } from "@/actions/templates-actions"

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
    />
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
    />
  </svg>
)

const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface TemplatesPageClientProps {
  templates: Template[]
  categories: string[]
}

const getDownloadUrl = (slug: string, fileType: string): string => {
  const baseUrl = "https://github.com/andrewfowl/tap-resources/"
  const folderMap: Record<string, string> = {
    pdf: "pdfs",
    xlsx: "spreadsheets",
    xls: "spreadsheets",
    xlsb: "spreadsheets",
  }
  const folder = folderMap[fileType.toLowerCase()] || "pdfs"
  return `${baseUrl}${folder}/${slug}.${fileType}`
}

export function TemplatesPageClient({ templates, categories }: TemplatesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const allCategories = [{ id: "all", name: "All Categories" }, ...categories.map((cat) => ({ id: cat, name: cat }))]

  const sortTemplates = (templates: Template[]) => {
    switch (sortOption) {
      case "newest":
        return [...templates].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case "title":
        return [...templates].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return templates
    }
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.category && template.category.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const sortedTemplates = sortTemplates(filteredTemplates)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <>
      {/* Hero Section */}
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

      {/* Filter Bar */}
      <div
        className={`sticky top-16 md:top-20 z-30 bg-white border-b border-corporate-200 py-4 transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="corporate-container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <SearchIcon />
              <Input
                placeholder="Search templates..."
                className="pl-10 border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-corporate-200 focus:ring-corporate-500">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-corporate-200 text-corporate-700 gap-2 bg-transparent">
                    <FilterIcon />
                    <span className="hidden sm:inline">Sort by:</span>
                    <span className="font-medium">{sortOption === "newest" ? "Newest" : "Title"}</span>
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("title")}>Title</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 py-12">
        <div className="corporate-container">
          {sortedTemplates.length === 0 ? (
            <div className="text-center py-16 bg-corporate-50 rounded-lg border border-corporate-200">
              <div className="w-16 h-16 bg-corporate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon />
              </div>
              <h3 className="text-xl font-medium mb-2 text-corporate-800">No templates found</h3>
              <p className="text-corporate-600 max-w-md mx-auto mb-6">
                We couldn't find any templates matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button
                variant="outline"
                className="border-corporate-300 text-corporate-800 hover:bg-corporate-100 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-corporate-600">
                Showing {sortedTemplates.length} {sortedTemplates.length === 1 ? "template" : "templates"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="overflow-hidden border border-corporate-200 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                  >
                    <div className="grid grid-rows-[auto_auto_1fr_auto] h-full">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={
                            template.preview_image_url ||
                            "/placeholder.svg?height=200&width=400&query=finance template preview" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={template.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {template.category && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-corporate-100 text-corporate-800">{template.category}</Badge>
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-corporate-800 group-hover:text-corporate-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                          {template.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="pb-4">
                        <p className="text-corporate-600 mb-4 line-clamp-2">{template.description}</p>

                        <div className="flex items-center justify-between text-sm text-corporate-500 mb-2">
                          <div className="flex items-center">
                            <ClockIcon />
                            <span className="ml-1">Updated {formatDate(template.updated_at)}</span>
                          </div>
                          {template.file_size && (
                            <div className="flex items-center">
                              <span>{formatFileSize(template.file_size)}</span>
                            </div>
                          )}
                        </div>

                        {template.file_type && (
                          <div className="text-xs text-corporate-500">{template.file_type.toUpperCase()} file</div>
                        )}
                      </CardContent>

                      <CardContent className="pt-0 pb-4 border-t">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-corporate-200 text-corporate-700 hover:bg-corporate-50 hover:text-corporate-800 bg-transparent"
                          >
                            <Link href={`/templates/${template.slug}`} className="group">
                              Preview
                              <ArrowRightIcon />
                            </Link>
                          </Button>

                          {template.file_type && template.slug ? (
                            <Button size="sm" className="bg-corporate-800 hover:bg-corporate-700 text-white" asChild>
                              <a href={getDownloadUrl(template.slug, template.file_type)} download>
                                <DownloadIcon />
                                <span className="ml-2">Download</span>
                              </a>
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-corporate-800 hover:bg-corporate-700 text-white" asChild>
                              <Link href={`/templates/${template.slug}`}>
                                <DownloadIcon />
                                <span className="ml-2">View</span>
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
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
              <Button asChild size="lg" className="bg-white text-corporate-800 hover:bg-corporate-100">
                <Link href="/contact">Request Custom Template</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
