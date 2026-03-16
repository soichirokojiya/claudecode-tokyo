import { TwitterApi } from "twitter-api-v2";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://claudecode.tokyo";
const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");
const POSTED_FILE = path.join(process.cwd(), "scripts/.posted-articles.json");

// Twitter client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// Load already-posted article slugs
function getPostedSlugs(): string[] {
  if (fs.existsSync(POSTED_FILE)) {
    return JSON.parse(fs.readFileSync(POSTED_FILE, "utf-8"));
  }
  return [];
}

function savePostedSlugs(slugs: string[]) {
  fs.writeFileSync(POSTED_FILE, JSON.stringify(slugs, null, 2));
}

// Get all articles sorted by date (newest first)
function getArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const { data } = matter(content);
    return { slug, ...data };
  });
}

// Extract X/Twitter tweet IDs from article content for RT
function extractTweetIds(slug: string): string[] {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");
  const regex = /https:\/\/(?:x|twitter)\.com\/\w+\/status\/(\d+)/g;
  const ids: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!ids.includes(match[1])) {
      ids.push(match[1]);
    }
  }
  return ids;
}

// Build tweet text for an article
function buildTweetText(article: { title?: string; slug: string; summary?: string[]; tags?: string[] }): string {
  const title = article.title || article.slug;
  const url = `${SITE_URL}/articles/${article.slug}`;
  const summary = article.summary?.[0] || "";
  const tags = "#ClaudeCode #AI #プログラミング";

  let text = `📝 ${title}\n\n`;
  if (summary) {
    text += `${summary}\n\n`;
  }
  text += `${url}\n\n${tags}`;

  // Twitter limit: 280 chars
  if (text.length > 280) {
    text = `📝 ${title}\n\n${url}\n\n${tags}`;
  }
  if (text.length > 280) {
    text = `${title}\n${url}\n${tags}`;
  }
  return text;
}

async function main() {
  const posted = getPostedSlugs();
  const articles = getArticles();

  // Find unposted articles
  const newArticles = articles.filter((a) => !posted.includes(a.slug));

  if (newArticles.length === 0) {
    console.log("No new articles to tweet.");
    return;
  }

  // Post up to 3 new articles per run
  const toPost = newArticles.slice(0, 3);

  for (const article of toPost) {
    try {
      // 1. Tweet the article
      const text = buildTweetText(article as { title?: string; slug: string; summary?: string[]; tags?: string[] });
      const { data } = await client.v2.tweet(text);
      console.log(`Tweeted: ${article.slug} (id: ${data.id})`);

      // 2. RT quoted tweets from the article
      const tweetIds = extractTweetIds(article.slug);
      for (const tweetId of tweetIds.slice(0, 3)) {
        try {
          await client.v2.retweet(data.id, tweetId);
          console.log(`  Retweeted: ${tweetId}`);
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          console.log(`  RT failed (${tweetId}): ${msg}`);
        }
      }

      posted.push(article.slug);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`Failed to tweet ${article.slug}: ${msg}`);
    }
  }

  savePostedSlugs(posted);
  console.log(`Done. ${toPost.length} articles tweeted.`);
}

main();
