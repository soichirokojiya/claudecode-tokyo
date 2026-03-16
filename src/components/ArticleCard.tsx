import Link from "next/link";
import Image from "next/image";
import { getCategoryMeta } from "@/lib/articles";

interface Props {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  thumbnail?: string;
}

export default function ArticleCard({
  slug,
  title,
  description,
  date,
  category,
  thumbnail,
}: Props) {
  const cat = getCategoryMeta(category);

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-parchment-300 to-parchment-200" />
          )}
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
