import Link from "next/link";
import { getCategoryMeta } from "@/lib/articles";

interface Props {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export default function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  readingTime,
  featured,
}: Props) {
  const cat = getCategoryMeta(category);

  return (
    <article className="group">
      <Link href={`/articles/${slug}`} className="block h-full">
        <div
          className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#D97757]/50 hover:shadow-md transform hover:scale-[1.01] transition-all duration-200 h-full flex flex-col ${
            featured ? "" : ""
          }`}
        >
          {/* カテゴリ別ビジュアルヘッダー */}
          <div className="h-2 bg-gradient-to-r from-[#D97757] to-[#D97757]/60" />

          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${cat.color}`}
              >
                {cat.emoji} {cat.name}
              </span>
              <time className="text-xs text-gray-400">{date}</time>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs text-gray-400">
                {readingTime}分
              </span>
            </div>
            <h2 className="font-bold text-gray-900 group-hover:text-[#D97757] transition-colors text-base mb-2 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 flex-1">
              {description}
            </p>
            {tags.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
