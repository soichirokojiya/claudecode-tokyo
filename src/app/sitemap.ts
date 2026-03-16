import { MetadataRoute } from "next";
import { getAllArticles, CATEGORIES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `https://claudecode.tokyo/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `https://claudecode.tokyo/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: "https://claudecode.tokyo",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://claudecode.tokyo/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articleUrls,
    ...categoryUrls,
  ];
}
