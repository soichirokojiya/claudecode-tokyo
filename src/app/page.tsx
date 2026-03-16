import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import { CATEGORY_VISUALS } from "@/lib/categoryVisuals";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";

function ArticleVisual({ category, size = "md" }: { category: string; size?: "sm" | "md" | "lg" }) {
  const visual = CATEGORY_VISUALS[category] || CATEGORY_VISUALS["news"];
  const heights = { sm: "h-20", md: "h-44", lg: "h-72 sm:h-96" };

  return (
    <div className={`relative ${heights[size]} bg-gradient-to-br ${visual.gradient} overflow-hidden`}>
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={visual.icon} />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const leftCol = articles.slice(1, 3);
  const rightCol = articles.slice(3, 7);
  const bottomGrid = articles.slice(7);

  return (
    <>
      {/* Trending Bar */}
      <div className="border-b border-parchment-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-4 overflow-hidden">
          <span className="text-accent font-bold text-xs tracking-wider uppercase whitespace-nowrap flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.56 21.56a1.5 1.5 0 01-2.12 0L12 18.12l-3.44 3.44a1.5 1.5 0 11-2.12-2.12L9.88 16l-3.44-3.44a1.5 1.5 0 112.12-2.12L12 13.88l3.44-3.44a1.5 1.5 0 112.12 2.12L14.12 16l3.44 3.44a1.5 1.5 0 010 2.12zM12 2a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-3 0v-8A1.5 1.5 0 0112 2z" />
            </svg>
            Trending
          </span>
          <div className="flex items-center gap-4 text-sm text-parchment-600 overflow-hidden">
            {articles.slice(0, 4).map((a, i) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="hover:text-accent transition-colors whitespace-nowrap truncate max-w-[250px] hidden sm:inline-flex items-center gap-2"
              >
                {i > 0 && <span className="text-parchment-300">|</span>}
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: 3-Column Layout */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {leftCol.map((article) => {
              const cat = getCategoryMeta(article.category);
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
                  <ArticleVisual category={article.category} size="md" />
                  <div className="mt-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
                      {cat.name}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <time className="text-xs text-parchment-400 mt-1.5 block">{article.date}</time>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Center Column - Featured */}
          <div className="lg:col-span-6">
            {featured && (
              <Link href={`/articles/${featured.slug}`} className="group block">
                <ArticleVisual category={featured.category} size="lg" />
                <div className="mt-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
                    {getCategoryMeta(featured.category).name}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-bold tracking-tight text-parchment-900 leading-tight mt-1 group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-parchment-500 mt-3 leading-relaxed">
                    {featured.description}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-0 divide-y divide-parchment-200">
              {rightCol.map((article) => {
                const cat = getCategoryMeta(article.category);
                return (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex gap-3 py-4 first:pt-0">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                        {cat.name}
                      </span>
                      <h3 className="text-sm font-bold tracking-tight text-parchment-900 leading-snug mt-0.5 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                      <ArticleVisual category={article.category} size="sm" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-parchment-900" />
      </div>

      {/* More Articles Grid */}
      {bottomGrid.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-editorial font-bold tracking-tight text-parchment-900 mb-8">
            More Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bottomGrid.map((article) => {
              const cat = getCategoryMeta(article.category);
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
                  <ArticleVisual category={article.category} size="md" />
                  <div className="mt-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
                      {cat.name}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-parchment-500 text-sm leading-relaxed mt-1.5 line-clamp-2">
                      {article.description}
                    </p>
                    <time className="text-xs text-parchment-400 mt-2 block">{article.date}</time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-4">
        <NewsletterCTA />
      </div>
    </>
  );
}
