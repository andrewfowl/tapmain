import type { Metadata } from "next"
import Link from "next/link"
import { getPublishedInsights } from "@/actions/insights-actions"

export const metadata: Metadata = {
  title: "Crypto & Technical Accounting Insights",
  description:
    "Practical guidance on US GAAP for digital assets: token compensation, ASC 350-60, revenue recognition, audit readiness, and more.",
  alternates: { canonical: "/insights" },
}

export default async function InsightsPage() {
  const insights = await getPublishedInsights(100)

  return (
    <div className="bg-black pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insights</h1>
        <p className="text-white/60 max-w-2xl mb-16">
          Practical guidance on technical accounting for crypto and digital asset companies.
        </p>

        {insights.length === 0 ? (
          <p className="text-white/50">No insights published yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <li key={insight.id}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="flex flex-col h-full p-6 bg-white/5 border border-white/10 hover:border-white/30 rounded-lg transition-colors"
                >
                  <span className="text-xs text-white/40 mb-2">
                    {new Date(insight.created_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </span>
                  <h2 className="text-lg font-semibold text-white mb-3">{insight.title}</h2>
                  <p className="text-sm text-white/60 line-clamp-3">{insight.hook}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
