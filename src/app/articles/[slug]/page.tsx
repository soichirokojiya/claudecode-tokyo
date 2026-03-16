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
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
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

  // 関連記事: 同カテゴリから最大3件
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#D97757]">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${article.category}`}
          className="hover:text-[#D97757]"
        >
          {cat.name}
        </Link>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${cat.color}`}>
              {cat.emoji} {cat.name}
            </span>
            <time className="text-xs text-gray-400">{article.date}</time>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400">
              {article.readingTime}分で読める
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{article.description}</p>
          <ShareButtons title={article.title} slug={slug} />
        </header>

        <div
          className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-[#D97757] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags.length > 0 && (
          <div className="flex gap-2 mt-8 pt-6 border-t border-gray-200 flex-wrap">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 記事下部のシェア */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <ShareButtons title={article.title} slug={slug} />
        </div>
      </article>

      {/* 関連記事 */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#D97757] rounded-full" />
            関連記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} {...a} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link
          href="/"
          className="text-[#D97757] hover:underline text-sm font-medium"
        >
          &larr; 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
