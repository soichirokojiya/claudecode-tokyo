import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-parchment-900 via-parchment-900 to-parchment-700" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/5" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
          <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-accent bg-accent/10 rounded-full mb-5">
            Claude Code 専門メディア
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            ClaudeCode<span className="text-accent">.Tokyo</span>
          </h1>
          <p className="text-parchment-400 mt-4 text-lg leading-relaxed max-w-xl">
            使い方・Tips・最新ニュースを初心者にもわかりやすく。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        {/* Featured Article */}
        {featured && (
          <section className="mt-12 mb-16">
            <Link href={`/articles/${featured.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-parchment-900 to-parchment-700 px-8 py-10 sm:px-10 sm:py-12 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-transparent" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase text-accent bg-accent/15 rounded-full">
                      Featured
                    </span>
                    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ring-1 ${getCategoryMeta(featured.category).badge}`}>
                      {getCategoryMeta(featured.category).name}
                    </span>
                    <time className="text-xs text-parchment-400">
                      {featured.date}
                    </time>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug group-hover:text-accent transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-parchment-300 mt-3 leading-relaxed max-w-lg">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-accent group-hover:gap-2 transition-all duration-300">
                    記事を読む
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Latest Articles */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-bold tracking-tight text-parchment-900 whitespace-nowrap">
              最新の記事
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-parchment-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterCTA />
      </div>
    </>
  );
}
