import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SNS — Developer Voices",
  description: "Claude Codeに関するSNS・コミュニティの声、開発者の反応をまとめてお届けします。",
};

export default function SNSPage() {
  const allArticles = getAllArticles();

  // Filter articles related to SNS/community: news category or articles with SNS-related tags
  const snsArticles = allArticles.filter(
    (a) =>
      a.category === "news" ||
      a.tags.some((t) =>
        ["sns", "twitter", "x", "community", "コミュニティ", "reaction", "反応"].includes(
          t.toLowerCase()
        )
      )
  );

  // Also show some general articles if we don't have enough SNS-specific ones
  const otherArticles = allArticles.filter(
    (a) => !snsArticles.includes(a)
  );

  const displayArticles = snsArticles.length >= 4 ? snsArticles : [...snsArticles, ...otherArticles].slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-parchment-400 font-medium">
        <Link href="/" className="hover:text-parchment-900 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-parchment-900">SNS</span>
      </nav>

      {/* Page header */}
      <div className="mb-10">
        <div className="h-[3px] bg-parchment-900 mb-3" />
        <h1 className="text-4xl sm:text-5xl font-editorial font-black tracking-tight text-parchment-900">
          SNS Voices
        </h1>
        <p className="text-parchment-500 mt-3 text-lg max-w-2xl">
          Claude Codeに関するSNS・コミュニティの声、開発者の反応をまとめてお届けします。
        </p>
        <div className="h-px bg-parchment-200 mt-6" />
      </div>

      {/* Developer Voices section */}
      <div className="mb-10">
        <div className="h-[3px] bg-parchment-900 mb-2" />
        <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-parchment-900 mb-6">
          Developer Voices
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {displayArticles.map((article) => {
            const cat = getCategoryMeta(article.category);
            return (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                  {article.thumbnail ? (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-parchment-200 to-parchment-100" />
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-accent">
                    {cat.name}
                  </span>
                  <h3 className="text-lg font-editorial font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-parchment-500 text-sm leading-relaxed mt-1 line-clamp-2">
                    {article.description}
                  </p>
                  <time className="text-[11px] text-parchment-400 font-sans block mt-1">
                    {article.date}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {displayArticles.length === 0 && (
        <p className="text-center text-parchment-400 py-20">
          SNS関連の記事はまだありません
        </p>
      )}
    </div>
  );
}
