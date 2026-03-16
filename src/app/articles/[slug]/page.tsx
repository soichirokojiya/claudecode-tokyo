import {
  getAllArticles,
  getArticleBySlug,
  getCategoryMeta,
} from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCategoryMeta(article.category);

  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "ClaudeCode.Tokyo",
      url: "https://claudecode.tokyo",
    },
    publisher: {
      "@type": "Organization",
      name: "ClaudeCode.Tokyo",
      url: "https://claudecode.tokyo",
    },
    mainEntityOfPage: `https://claudecode.tokyo/articles/${slug}`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-parchment-400 font-medium">
        <Link href="/" className="hover:text-parchment-900 transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${article.category}`}
          className="hover:text-parchment-900 transition-colors"
        >
          {cat.name}
        </Link>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-parchment-500">
              {cat.name}
            </span>
            <span className="text-parchment-300">&middot;</span>
            <time className="text-xs text-parchment-400">{article.date}</time>
            <span className="text-parchment-300">&middot;</span>
            <span className="text-xs text-parchment-400">
              {article.readingTime}分で読める
            </span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-parchment-900 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-parchment-500 mt-4 leading-relaxed">
            {article.description}
          </p>
          <div className="mt-6">
            <ShareButtons title={article.title} slug={slug} />
          </div>
        </header>

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex gap-2 mt-12 pt-8 border-t border-parchment-200 flex-wrap">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-parchment-400 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Share */}
        <div className="mt-8 pt-8 border-t border-parchment-200">
          <ShareButtons title={article.title} slug={slug} />
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-medium tracking-tight text-parchment-900 mb-6">
            関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((a) => (
              <ArticleCard key={a.slug} {...a} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link
          href="/"
          className="text-parchment-500 hover:text-parchment-900 text-sm font-medium transition-colors"
        >
          &larr; 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
