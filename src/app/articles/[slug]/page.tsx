import {
  getAllArticles,
  getArticleBySlug,
  getCategoryMeta,
} from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
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
      ...(article.lastUpdated && { modifiedTime: article.lastUpdated }),
      ...(article.thumbnail && {
        images: [{ url: article.thumbnail, width: 800, height: 500 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(article.thumbnail && { images: [article.thumbnail] }),
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
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    ...(article.lastUpdated && { dateModified: article.lastUpdated }),
    author: {
      "@type": "Person",
      name: article.author || "ClaudeCode.Tokyo編集部",
      url: "https://claudecode.tokyo/about",
    },
    publisher: {
      "@type": "Organization",
      name: "ClaudeCode.Tokyo",
      url: "https://claudecode.tokyo",
      logo: {
        "@type": "ImageObject",
        url: "https://claudecode.tokyo/og-image.png",
      },
    },
    mainEntityOfPage: `https://claudecode.tokyo/articles/${slug}`,
    ...(article.thumbnail && { image: article.thumbnail }),
    wordCount: article.content.replace(/<[^>]*>/g, "").length,
    inLanguage: "ja",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "トップ",
        item: "https://claudecode.tokyo",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.name,
        item: `https://claudecode.tokyo/category/${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://claudecode.tokyo/articles/${slug}`,
      },
    ],
  };

  const faqSchema =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
        {/* Hero Image */}
        {article.thumbnail && (
          <div className="relative aspect-[2/1] overflow-hidden bg-parchment-100 mb-8">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ring-1 ${cat.badge}`}>
              {cat.name}
            </span>
            <time className="text-xs text-parchment-400">{article.date}</time>
            {article.lastUpdated && (
              <>
                <span className="text-parchment-300">&middot;</span>
                <span className="text-xs text-parchment-400">
                  更新: {article.lastUpdated}
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-parchment-900 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-parchment-500 mt-4 leading-relaxed">
            {article.description}
          </p>
          {/* Author */}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-parchment-800">{article.author || "ClaudeCode.Tokyo編集部"}</p>
              <p className="text-xs text-parchment-400">{article.date} 公開</p>
            </div>
          </div>
          <div className="mt-6">
            <ShareButtons title={article.title} slug={slug} />
          </div>
        </header>

        {/* Summary Box */}
        {article.summary && article.summary.length > 0 && (
          <div className="summary-box mb-10">
            <h2 className="text-sm font-bold text-parchment-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              この記事のポイント
            </h2>
            <ul className="space-y-1.5">
              {article.summary.map((point, i) => (
                <li key={i} className="text-sm text-parchment-600 leading-relaxed flex gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {article.toc && article.toc.length > 3 && (
          <nav className="toc-box mb-10">
            <h2 className="text-sm font-bold text-parchment-900 mb-3">目次</h2>
            <ul className="space-y-1">
              {article.toc.map((item, i) => (
                <li key={i} className={item.level === 3 ? "ml-4" : ""}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-parchment-500 hover:text-accent transition-colors leading-relaxed block py-0.5"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FAQ Section */}
        {article.faq && article.faq.length > 0 && (
          <section className="faq-section mt-12">
            <h2 className="text-xl font-bold tracking-tight text-parchment-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              よくある質問
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, i) => (
                <div key={i} className="faq-item">
                  <h3 className="text-[15px] font-bold text-parchment-900 mb-2">
                    Q. {item.question}
                  </h3>
                  <p className="text-sm text-parchment-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* Author Bio */}
        <div className="mt-10 pt-8 border-t border-parchment-200">
          <div className="flex items-start gap-4 bg-parchment-100 rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-parchment-400 uppercase tracking-wider mb-1">Written by</p>
              <p className="text-base font-bold text-parchment-900">{article.author || "ClaudeCode.Tokyo編集部"}</p>
              <p className="text-sm text-parchment-500 mt-1 leading-relaxed">
                Claude Code専門メディア「ClaudeCode.Tokyo」の編集部です。AI×開発の最新情報を、初心者にもわかりやすくお届けします。
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a href="https://x.com/claudecodetokyo" target="_blank" rel="noopener noreferrer" className="text-parchment-400 hover:text-accent transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://claudecode.tokyo" className="text-xs text-accent hover:underline">claudecode.tokyo</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Share */}
        <div className="mt-8 pt-8 border-t border-parchment-200">
          <ShareButtons title={article.title} slug={slug} />
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-bold tracking-tight text-parchment-900 mb-6">
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
