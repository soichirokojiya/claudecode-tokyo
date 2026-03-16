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
}

export function getAllArticles(): Omit<Article, "content">[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        thumbnail: data.thumbnail,
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
  };
}

export function getArticlesByCategory(
  category: string
): Omit<Article, "content">[] {
  return getAllArticles().filter((a) => a.category === category);
}

export const CATEGORIES = [
  { slug: "getting-started", name: "入門" },
  { slug: "tips", name: "Tips" },
  { slug: "news", name: "ニュース" },
  { slug: "comparison", name: "比較" },
  { slug: "usecase", name: "活用事例" },
  { slug: "pricing", name: "料金" },
] as const;
