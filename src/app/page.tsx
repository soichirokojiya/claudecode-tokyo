import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      {/* Hero */}
      <section className="pt-12 pb-16">
        <h1 className="text-3xl font-medium tracking-tight text-parchment-900">
          ClaudeCode.Tokyo
        </h1>
        <p className="text-parchment-600 mt-3 text-lg">
          Claude Code専門の日本語メディア。使い方・Tips・最新ニュースを初心者にもわかりやすく。
        </p>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mb-16">
          <Link href={`/articles/${featured.slug}`} className="group block">
            <div className="rounded-[12px] border border-parchment-200 bg-parchment-100/50 px-8 py-7 transition-colors hover:border-parchment-300 hover:bg-parchment-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Featured
                </span>
                <span className="text-parchment-300">&middot;</span>
                <time className="text-xs text-parchment-400">
                  {featured.date}
                </time>
                <span className="text-parchment-300">&middot;</span>
                <span className="text-xs text-parchment-400">
                  {featured.readingTime}分
                </span>
              </div>
              <h2 className="text-xl font-medium tracking-tight text-parchment-900 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="text-parchment-500 mt-2 leading-relaxed">
                {featured.description}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="mb-16">
        <h2 className="text-lg font-medium tracking-tight text-parchment-900 mb-6">
          最新の記事
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA />
    </div>
  );
}
