import { getAllArticles, getArticleBySlug, CATEGORIES } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

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

  const categoryName =
    CATEGORIES.find((c) => c.slug === article.category)?.name ||
    article.category;

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
          {categoryName}
        </Link>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-[#D97757] bg-orange-50 px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <time className="text-xs text-gray-400">{article.date}</time>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600">{article.description}</p>
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
      </article>

      <div className="mt-12 pt-6 border-t border-gray-200">
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
