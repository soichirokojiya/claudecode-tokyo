import { getAllArticles, getCategoryMeta } from "@/lib/articles";
import { getArticleVisual } from "@/lib/categoryVisuals";
import { PixelClaude } from "@/components/PixelClaude";
import ArticleVisual from "@/components/ArticleVisual";
import NewsletterCTA from "@/components/NewsletterCTA";
import Link from "next/link";
import Image from "next/image";

// Track used thumbnails to avoid duplicates on the same page
function deduplicateThumbnails<T extends { slug: string; thumbnail?: string; category: string }>(articles: T[]) {
  const used = new Set<string>();
  return articles.map((a) => {
    if (a.thumbnail && !used.has(a.thumbnail)) {
      used.add(a.thumbnail);
      return { ...a, uniqueThumbnail: a.thumbnail };
    }
    return { ...a, uniqueThumbnail: "" };
  });
}

function ColumnRule() {
  return <div className="hidden lg:block w-px bg-parchment-300 self-stretch" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="h-[3px] bg-parchment-900 mb-2" />
      <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-parchment-900">
        {children}
      </h2>
    </div>
  );
}

function ArticleLabel({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "featured" | "analysis" | "opinion" }) {
  const colors = {
    default: "text-accent",
    featured: "bg-accent text-white",
    analysis: "bg-parchment-900 text-white",
    opinion: "bg-parchment-700 text-white",
  };
  if (variant === "default") {
    return <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-accent">{children}</span>;
  }
  return <span className={`text-[10px] font-sans font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 inline-block ${colors[variant]}`}>{children}</span>;
}

function ArticleDate({ date }: { date: string }) {
  return <time className="text-[11px] text-parchment-400 font-sans block mt-1">{date}</time>;
}

function ArticleThumbnail({ slug, category, thumbnail, sizes, priority = false }: { slug: string; category: string; thumbnail: string; sizes: string; priority?: boolean }) {
  if (thumbnail) {
    return (
      <Image
        src={thumbnail}
        alt=""
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={sizes}
        priority={priority}
      />
    );
  }
  const visual = getArticleVisual(slug, category);
  return <ArticleVisual category={category} size="fill" slugVisual={visual} />;
}

export default function Home() {
  const rawArticles = getAllArticles();
  const articles = deduplicateThumbnails(rawArticles);
  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const sidebar = articles.slice(3, 7);
  const gridStories = articles.slice(7, 15);
  const moreStories = articles.slice(15);

  return (
    <>
      {/* Main Content: Newspaper Layout */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Column - Secondary stories */}
          <div className="lg:w-3/12 lg:pr-6 space-y-6">
            <SectionHeading>Latest</SectionHeading>
            {secondary.map((article) => {
              const cat = getCategoryMeta(article.category);
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="group block mb-6">
                  <div className="relative aspect-[4/3] overflow-hidden bg-parchment-100">
                    <ArticleThumbnail slug={article.slug} category={article.category} thumbnail={article.uniqueThumbnail} sizes="(max-width: 1024px) 100vw, 25vw" />
                  </div>
                  <div className="mt-2">
                    <ArticleLabel>{cat.name}</ArticleLabel>
                    <h3 className="text-base font-editorial font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <ArticleDate date={article.date} />
                  </div>
                </Link>
              );
            })}
          </div>

          <ColumnRule />

          {/* Center Column - Hero / Lead Story */}
          <div className="lg:w-6/12 lg:px-6">
            <SectionHeading>Top Story</SectionHeading>
            {featured && (
              <Link href={`/articles/${featured.slug}`} className="group block">
                <div className="mb-3">
                  <ArticleLabel variant="featured">Featured</ArticleLabel>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                  <ArticleThumbnail slug={featured.slug} category={featured.category} thumbnail={featured.uniqueThumbnail} sizes="(max-width: 1024px) 100vw, 50vw" priority />
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-accent">
                    {getCategoryMeta(featured.category).name}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-editorial font-black tracking-tight text-parchment-900 leading-tight mt-1 group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-parchment-500 mt-3 leading-relaxed text-[15px] first-letter:text-4xl first-letter:font-editorial first-letter:font-black first-letter:text-parchment-900 first-letter:float-left first-letter:mr-1.5 first-letter:leading-none">
                    {featured.description}
                  </p>
                  <ArticleDate date={featured.date} />
                </div>
              </Link>
            )}
          </div>

          <ColumnRule />

          {/* Right Column - Trending headlines */}
          <div className="lg:w-3/12 lg:pl-6">
            <SectionHeading>Trending</SectionHeading>
            <div className="space-y-0 divide-y divide-parchment-200">
              {sidebar.map((article, i) => {
                const cat = getCategoryMeta(article.category);
                return (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="group block py-4 first:pt-0">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-editorial font-black text-parchment-200 leading-none shrink-0">{i + 1}</span>
                      <div>
                        <ArticleLabel>{cat.name}</ArticleLabel>
                        <h3 className="text-sm font-editorial font-bold tracking-tight text-parchment-900 leading-snug mt-0.5 group-hover:text-accent transition-colors line-clamp-3">
                          {article.title}
                        </h3>
                        <ArticleDate date={article.date} />
                      </div>
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
        <div className="h-[3px] bg-parchment-900" />
        <div className="h-[2px] bg-parchment-50" />
        <div className="h-px bg-parchment-900" />
      </div>

      {/* 4-Column Grid Stories */}
      {gridStories.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <SectionHeading>More Stories</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {gridStories.map((article, i) => {
              const cat = getCategoryMeta(article.category);
              const labelVariant = i === 0 ? "analysis" : i === 1 ? "opinion" : "default";
              const labelText = i === 0 ? "Analysis" : i === 1 ? "Opinion" : cat.name;
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                    <ArticleThumbnail slug={article.slug} category={article.category} thumbnail={article.uniqueThumbnail} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </div>
                  <div className="mt-3">
                    <ArticleLabel variant={labelVariant}>{labelText}</ArticleLabel>
                    <h3 className="text-base font-editorial font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-parchment-500 text-sm leading-relaxed mt-1 line-clamp-2">
                      {article.description}
                    </p>
                    <ArticleDate date={article.date} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Additional stories section */}
      {moreStories.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-parchment-900" />
          </div>
          <div className="max-w-6xl mx-auto px-4 py-10">
            <SectionHeading>Archives</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {moreStories.map((article) => {
                const cat = getCategoryMeta(article.category);
                return (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="group block py-4 border-b border-parchment-200">
                    <ArticleLabel>{cat.name}</ArticleLabel>
                    <h3 className="text-lg font-editorial font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-parchment-500 text-sm leading-relaxed mt-1 line-clamp-2">
                      {article.description}
                    </p>
                    <ArticleDate date={article.date} />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <NewsletterCTA />
      </div>
    </>
  );
}
