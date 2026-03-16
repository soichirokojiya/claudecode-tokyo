import { getArticlesByCategory, CATEGORIES, getCategoryMeta } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} - ClaudeCode.Tokyo`,
    description: `Claude Codeの${cat.name}に関する記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryMeta(slug);
  if (!CATEGORIES.find((c) => c.slug === slug)) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#D97757]">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span>{category.name}</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>{category.emoji}</span>
        {category.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          このカテゴリの記事はまだありません
        </p>
      )}
    </div>
  );
}
