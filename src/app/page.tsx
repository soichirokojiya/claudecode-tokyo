import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";
import Image from "next/image";

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
          <span className="text-accent font-bold text-xs tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
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
          <div className="lg:col-span-3 space-y-8">
            {leftCol.map((article) => {
              const cat = getCategoryMeta(article.category);
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-parchment-100">
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-parchment-300 to-parchment-200" />
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
                      {cat.name}
                    </span>
                    <h3 className="text-base font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
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
                <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                  {featured.thumbnail ? (
                    <Image
                      src={featured.thumbnail}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-parchment-400 to-parchment-200" />
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
                    {getCategoryMeta(featured.category).name}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-bold tracking-tight text-parchment-900 leading-tight mt-1.5 group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-parchment-500 mt-3 leading-relaxed text-[15px]">
                    {featured.description}
                  </p>
                  <time className="text-xs text-parchment-400 mt-2 block">{featured.date}</time>
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
                      <h3 className="text-sm font-bold tracking-tight text-parchment-900 leading-snug mt-0.5 group-hover:text-accent transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-parchment-100">
                      {article.thumbnail ? (
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-parchment-300 to-parchment-200" />
                      )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {bottomGrid.map((article) => {
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
                      <div className="w-full h-full bg-gradient-to-br from-parchment-300 to-parchment-200" />
                    )}
                  </div>
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
