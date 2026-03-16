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
}

export default function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  readingTime,
}: Props) {
  const cat = getCategoryMeta(category);

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="rounded-[12px] border border-parchment-200 bg-transparent px-6 py-5 transition-colors hover:border-parchment-300 hover:bg-parchment-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-parchment-500">
            {cat.name}
          </span>
          <span className="text-parchment-300">&middot;</span>
          <time className="text-xs text-parchment-400">{date}</time>
          <span className="text-parchment-300">&middot;</span>
          <span className="text-xs text-parchment-400">{readingTime}分</span>
        </div>
        <h2 className="text-parchment-900 font-medium tracking-tight leading-snug group-hover:text-accent transition-colors">
          {title}
        </h2>
        <p className="text-parchment-500 text-[14px] leading-relaxed mt-1.5 line-clamp-2">
          {description}
        </p>
      </article>
    </Link>
  );
}
