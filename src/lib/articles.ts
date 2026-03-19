import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { addIdsToHtml, generateToc, type TocItem } from "./toc";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export interface FAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  summary?: string[];
  faq?: FAQ[];
  author?: string;
  featured?: boolean;
  priority?: number;
  content: string;
  toc?: TocItem[];
  readingTime: number;
}

function calcReadingTime(text: string): number {
  // 日本語は400文字/分、マークダウン記法を除外
  const clean = text.replace(/```[\s\S]*?```/g, "").replace(/[#*`\[\]()|\->/]/g, "");
  return Math.max(3, Math.ceil(clean.length / 400));
}

export function getAllArticles(): Omit<Article, "content">[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        lastUpdated: data.lastUpdated,
        category: data.category,
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        summary: data.summary,
        faq: data.faq,
        author: data.author || "ClaudeCode.Tokyo編集部",
        featured: data.featured || false,
        priority: data.priority || 0,
        readingTime: calcReadingTime(content),
      };
    });

  return articles.sort((a, b) => {
    // featured articles first, then by priority (higher first), then by date
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if ((a.priority || 0) !== (b.priority || 0)) return (b.priority || 0) - (a.priority || 0);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content);
  // Wrap tables in responsive container
  const rawHtml = processedContent.toString().replace(
    /<table>/g,
    '<div class="table-wrapper"><table>'
  ).replace(
    /<\/table>/g,
    '</table></div>'
  );
  const contentHtml = addIdsToHtml(rawHtml);
  const toc = generateToc(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    lastUpdated: data.lastUpdated,
    category: data.category,
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    summary: data.summary,
    faq: data.faq,
    author: data.author || "ClaudeCode.Tokyo編集部",
    content: contentHtml,
    toc,
    readingTime: calcReadingTime(content),
  };
}

export function getArticlesByCategory(
  category: string
): Omit<Article, "content">[] {
  return getAllArticles().filter((a) => a.category === category);
}

export const CATEGORIES = [
  { slug: "getting-started", name: "入門", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200/60" },
  { slug: "tips", name: "Tips", badge: "bg-violet-50 text-violet-700 ring-violet-200/60" },
  { slug: "news", name: "ニュース", badge: "bg-sky-50 text-sky-700 ring-sky-200/60" },
  { slug: "comparison", name: "比較", badge: "bg-amber-50 text-amber-700 ring-amber-200/60" },
  { slug: "usecase", name: "活用事例", badge: "bg-rose-50 text-rose-700 ring-rose-200/60" },
  { slug: "pricing", name: "料金", badge: "bg-teal-50 text-teal-700 ring-teal-200/60" },
] as const;

export function getCategoryMeta(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
}
