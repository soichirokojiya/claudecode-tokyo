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
}: Props) {
  const cat = getCategoryMeta(category);

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="rounded-xl bg-white ring-1 ring-parchment-200/60 shadow-sm px-6 py-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:ring-parchment-300">
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ring-1 ${cat.badge}`}>
            {cat.name}
          </span>
          <time className="text-xs text-parchment-400">{date}</time>
        </div>
        <h2 className="text-[15px] font-bold tracking-tight text-parchment-900 leading-snug group-hover:text-accent transition-colors duration-200">
          {title}
        </h2>
        <p className="text-parchment-500 text-[13px] leading-relaxed mt-2 line-clamp-2">
          {description}
        </p>
      </article>
    </Link>
  );
}
