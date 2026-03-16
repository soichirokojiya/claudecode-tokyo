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

// Category-based hooks and emojis
const CATEGORY_HOOKS: Record<string, { emoji: string; hooks: string[] }> = {
  news: {
    emoji: "🚀",
    hooks: [
      "【速報】",
      "【最新ニュース】",
      "見逃せない最新動向👇",
      "業界が動いています",
    ],
  },
  tips: {
    emoji: "💡",
    hooks: [
      "知ってると差がつく！",
      "プロはこう使う👇",
      "開発効率が爆上がりする方法",
      "これ知ってましたか？",
    ],
  },
  usecase: {
    emoji: "🛠️",
    hooks: [
      "実際に使ってみた結果…",
      "こんな使い方もできる！",
      "現場で使える実践テク👇",
      "ここまでできるのか…",
    ],
  },
  comparison: {
    emoji: "⚔️",
    hooks: [
      "徹底比較してみました",
      "結局どれが最強？",
      "選び方で迷ってる人へ👇",
      "ガチ比較した結果…",
    ],
  },
  "getting-started": {
    emoji: "🎯",
    hooks: [
      "はじめの一歩はここから",
      "5分で始められます👇",
      "今日から使える入門ガイド",
      "初心者でも大丈夫！",
    ],
  },
  pricing: {
    emoji: "💰",
    hooks: [
      "料金、ちゃんと把握してる？",
      "コスパ最強の使い方とは",
      "無駄に課金してない？👇",
      "お得に使う方法を解説",
    ],
  },
};

// Build hashtags from article tags
function buildHashtags(tags?: string[]): string {
  const base = ["#ClaudeCode"];
  if (tags) {
    for (const tag of tags.slice(0, 3)) {
      const clean = tag.replace(/\s+/g, "").replace(/[^a-zA-Z0-9\u3000-\u9FFF]/g, "");
      if (clean && !base.includes(`#${clean}`)) {
        base.push(`#${clean}`);
      }
    }
  }
  if (base.length < 3) base.push("#AI");
  return base.join(" ");
}

// Pick a random hook for the category
function pickHook(category: string): { emoji: string; hook: string } {
  const cat = CATEGORY_HOOKS[category] || CATEGORY_HOOKS.news;
  const hook = cat.hooks[Math.floor(Math.random() * cat.hooks.length)];
  return { emoji: cat.emoji, hook };
}

// Build tweet text for an article
function buildTweetText(article: {
  title?: string;
  slug: string;
  summary?: string[];
  tags?: string[];
  category?: string;
}): string {
  const title = article.title || article.slug;
  const url = `${SITE_URL}/articles/${article.slug}`;
  const { emoji, hook } = pickHook(article.category || "news");
  const hashtags = buildHashtags(article.tags);

  // Primary format: hook + title + summary + url + tags
  const summary = article.summary?.[0] || "";
  let text = `${emoji} ${hook}\n\n${title}\n\n`;
  if (summary) {
    text += `${summary}\n\n`;
  }
  text += `${url}\n\n${hashtags}`;

  // Fallback: no summary
  if (text.length > 280) {
    text = `${emoji} ${hook}\n\n${title}\n\n${url}\n\n${hashtags}`;
  }
  // Fallback: minimal
  if (text.length > 280) {
    text = `${emoji} ${title}\n\n${url}\n\n${hashtags}`;
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
      const text = buildTweetText(article as { title?: string; slug: string; summary?: string[]; tags?: string[]; category?: string });
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
