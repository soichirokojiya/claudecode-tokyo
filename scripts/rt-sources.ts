import { TwitterApi } from "twitter-api-v2";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");
const RT_LOG_FILE = path.join(process.cwd(), "scripts/.retweeted-ids.json");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// Load already-retweeted IDs
function getRetweetedIds(): string[] {
  if (fs.existsSync(RT_LOG_FILE)) {
    return JSON.parse(fs.readFileSync(RT_LOG_FILE, "utf-8"));
  }
  return [];
}

function saveRetweetedIds(ids: string[]) {
  fs.writeFileSync(RT_LOG_FILE, JSON.stringify(ids, null, 2));
}

// Extract all tweet IDs from all articles
function getAllTweetIds(): { tweetId: string; slug: string }[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  const results: { tweetId: string; slug: string }[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const regex = /https:\/\/(?:x|twitter)\.com\/\w+\/status\/(\d+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (!seen.has(match[1])) {
        seen.add(match[1]);
        results.push({ tweetId: match[1], slug });
      }
    }
  }
  return results;
}

async function main() {
  const retweeted = getRetweetedIds();
  const allTweets = getAllTweetIds();

  // Find un-retweeted sources
  const toRT = allTweets.filter((t) => !retweeted.includes(t.tweetId));

  if (toRT.length === 0) {
    console.log("No new source tweets to retweet.");
    return;
  }

  // Get our user ID
  const me = await client.v2.me();
  const myId = me.data.id;

  // RT up to 5 per run to stay within limits
  let count = 0;
  for (const { tweetId, slug } of toRT.slice(0, 5)) {
    try {
      await client.v2.retweet(myId, tweetId);
      console.log(`Retweeted ${tweetId} (from: ${slug})`);
      retweeted.push(tweetId);
      count++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`RT failed ${tweetId}: ${msg}`);
      // Still mark as attempted to avoid retry loops
      retweeted.push(tweetId);
    }
  }

  saveRetweetedIds(retweeted);
  console.log(`Done. ${count} tweets retweeted.`);
}

main();
