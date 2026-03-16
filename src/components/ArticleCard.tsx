import Link from "next/link";
import { getCategoryMeta } from "@/lib/articles";
import { CATEGORY_VISUALS } from "@/lib/categoryVisuals";

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
  const visual = CATEGORY_VISUALS[category] || CATEGORY_VISUALS["news"];

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article>
        <div className={`relative h-44 bg-gradient-to-br ${visual.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={visual.icon} />
            </svg>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-[11px] font-bold tracking-wider uppercase text-accent">
            {cat.name}
          </span>
          <h2 className="text-lg font-bold tracking-tight text-parchment-900 leading-snug mt-1 group-hover:text-accent transition-colors">
            {title}
          </h2>
          <p className="text-parchment-500 text-sm leading-relaxed mt-1.5 line-clamp-2">
            {description}
          </p>
          <time className="text-xs text-parchment-400 mt-2 block">{date}</time>
        </div>
      </article>
    </Link>
  );
}
