import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  content: string;
  readingTime: number;
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
        category: data.category,
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        readingTime: Math.ceil(content.length / 600),
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    content: contentHtml,
    readingTime: Math.ceil(content.length / 600),
  };
}

export function getArticlesByCategory(
  category: string
): Omit<Article, "content">[] {
  return getAllArticles().filter((a) => a.category === category);
}

export const CATEGORIES = [
  { slug: "getting-started", name: "入門", emoji: "🚀", color: "bg-blue-50 text-blue-600" },
  { slug: "tips", name: "Tips", emoji: "💡", color: "bg-green-50 text-green-600" },
  { slug: "news", name: "ニュース", emoji: "📰", color: "bg-purple-50 text-purple-600" },
  { slug: "comparison", name: "比較", emoji: "⚖️", color: "bg-amber-50 text-amber-600" },
  { slug: "usecase", name: "活用事例", emoji: "🎯", color: "bg-teal-50 text-teal-600" },
  { slug: "pricing", name: "料金", emoji: "💰", color: "bg-rose-50 text-rose-600" },
] as const;

export function getCategoryMeta(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
}
