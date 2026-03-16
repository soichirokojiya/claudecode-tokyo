import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

interface Props {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export default function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  featured,
}: Props) {
  const categoryName =
    CATEGORIES.find((c) => c.slug === category)?.name || category;

  return (
    <article
      className={`group ${featured ? "col-span-full" : ""}`}
    >
      <Link href={`/articles/${slug}`} className="block">
        <div
          className={`bg-white border border-gray-200 rounded-lg p-5 hover:border-[#D97757] hover:shadow-sm transition-all ${
            featured ? "p-8" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-[#D97757] bg-orange-50 px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <time className="text-xs text-gray-400">{date}</time>
          </div>
          <h2
            className={`font-bold text-gray-900 group-hover:text-[#D97757] transition-colors ${
              featured ? "text-2xl mb-3" : "text-lg mb-2"
            }`}
          >
            {title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          {tags.length > 0 && (
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
