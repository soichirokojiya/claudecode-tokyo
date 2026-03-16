import {
  getArticlesByCategory,
  CATEGORIES,
  getCategoryMeta,
} from "@/lib/articles";
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
    title: `${cat.name}`,
    description: `Claude Codeの${cat.name}に関する記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!CATEGORIES.find((c) => c.slug === slug)) notFound();
  const category = getCategoryMeta(slug);
  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0 py-12">
      <nav className="mb-8 text-sm text-parchment-400 font-medium">
        <Link href="/" className="hover:text-parchment-900 transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-parchment-900">{category.name}</span>
      </nav>

      <h1 className="text-3xl font-medium tracking-tight text-parchment-900 mb-8">
        {category.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-parchment-400 py-20">
          このカテゴリの記事はまだありません
        </p>
      )}
    </div>
  );
}
