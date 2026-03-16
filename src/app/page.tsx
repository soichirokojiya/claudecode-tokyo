import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Claude Code専門メディア
        </h1>
        <p className="text-gray-600">
          使い方・Tips・最新ニュースを初心者にもわかりやすく
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <ArticleCard key={article.slug} {...article} featured={i === 0} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          記事を準備中です...
        </p>
      )}
    </div>
  );
}
