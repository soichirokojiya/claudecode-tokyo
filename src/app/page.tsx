import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";

export default function Home() {
  const articles = getAllArticles();
  const hero = articles[0];
  const latest = articles.slice(1, 5);
  const rest = articles.slice(5);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section: 3パネル構成 */}
      {hero && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* メイン記事 */}
          <Link
            href={`/articles/${hero.slug}`}
            className="lg:col-span-2 group"
          >
            <div className="relative aspect-[16/9] lg:aspect-[2/1] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-[120px]">
                  {getCategoryMeta(hero.category).emoji}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${getCategoryMeta(hero.category).color}`}
                >
                  {getCategoryMeta(hero.category).name}
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-white mt-2 group-hover:text-orange-200 transition-colors">
                  {hero.title}
                </h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                  {hero.description}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <time>{hero.date}</time>
                  <span>{hero.readingTime}分で読める</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 人気記事ランキング */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Popular
            </h3>
            {articles.slice(0, 5).map((article, i) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex gap-3 items-start py-2.5 border-b border-gray-100 last:border-0 group"
              >
                <span className="text-2xl font-bold text-gray-200 group-hover:text-[#D97757] transition-colors leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#D97757] transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getCategoryMeta(article.category).color}`}
                    >
                      {getCategoryMeta(article.category).name}
                    </span>
                    <time className="text-[10px] text-gray-400">
                      {article.date}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 最新記事 */}
      {latest.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#D97757] rounded-full" />
            最新記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latest.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </section>
      )}

      {/* ニュースレター CTA */}
      <NewsletterCTA />

      {/* その他の記事 */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#D97757] rounded-full" />
            もっと読む
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
