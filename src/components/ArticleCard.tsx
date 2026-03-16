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

const CATEGORY_VISUALS: Record<string, { gradient: string; icon: string }> = {
  "getting-started": {
    gradient: "from-emerald-400 to-teal-500",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  tips: {
    gradient: "from-violet-400 to-purple-500",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  news: {
    gradient: "from-sky-400 to-blue-500",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  comparison: {
    gradient: "from-amber-400 to-orange-500",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  usecase: {
    gradient: "from-rose-400 to-pink-500",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  pricing: {
    gradient: "from-teal-400 to-cyan-500",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

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
      <article className="rounded-xl bg-white ring-1 ring-parchment-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:ring-parchment-300">
        {/* Visual Header */}
        <div className={`relative h-28 bg-gradient-to-br ${visual.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute bottom-3 right-4 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={visual.icon} />
            </svg>
          </div>
          <div className="absolute top-3 left-4">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white/90 bg-white/20 rounded-md backdrop-blur-sm">
              {cat.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          <time className="text-[11px] text-parchment-400 font-medium">{date}</time>
          <h2 className="text-[15px] font-bold tracking-tight text-parchment-900 leading-snug mt-1.5 group-hover:text-accent transition-colors duration-200">
            {title}
          </h2>
          <p className="text-parchment-500 text-[13px] leading-relaxed mt-2 line-clamp-2">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
