import { TwitterApi } from "twitter-api-v2";
import fs from "fs";
import path from "path";

const RT_LOG_FILE = path.join(process.cwd(), "scripts/.retweeted-ids.json");
const WATCH_FILE = path.join(process.cwd(), "scripts/watch-accounts.json");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const KEYWORDS = ["claude code", "claudecode", "クロードコード"];

function getRetweetedIds(): string[] {
  if (fs.existsSync(RT_LOG_FILE)) {
    return JSON.parse(fs.readFileSync(RT_LOG_FILE, "utf-8"));
  }
  return [];
}

function saveRetweetedIds(ids: string[]) {
  fs.writeFileSync(RT_LOG_FILE, JSON.stringify(ids, null, 2));
}

function containsKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

async function main() {
  const watchData = JSON.parse(fs.readFileSync(WATCH_FILE, "utf-8"));
  const accounts: { username: string; note: string }[] = watchData.accounts;
  const retweeted = getRetweetedIds();
  const me = await client.v2.me();
  const myId = me.data.id;

  let rtCount = 0;
  const MAX_RT_PER_RUN = 5;

  for (const account of accounts) {
    if (rtCount >= MAX_RT_PER_RUN) break;

    try {
      // Get user ID from username
      const user = await client.v2.userByUsername(account.username);
      if (!user.data) {
        console.log(`User not found: @${account.username}`);
        continue;
      }

      // Get recent tweets (last 5)
      const timeline = await client.v2.userTimeline(user.data.id, {
        max_results: 5,
        "tweet.fields": ["created_at", "text"],
        exclude: ["retweets", "replies"],
      });

      for (const tweet of timeline.data?.data || []) {
        if (rtCount >= MAX_RT_PER_RUN) break;
        if (retweeted.includes(tweet.id)) continue;

        // Check if tweet is about Claude Code
        if (containsKeyword(tweet.text)) {
          try {
            await client.v2.retweet(myId, tweet.id);
            console.log(`RT @${account.username}: "${tweet.text.slice(0, 60)}..." (${tweet.id})`);
            retweeted.push(tweet.id);
            rtCount++;
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            console.log(`RT failed: ${msg}`);
            retweeted.push(tweet.id); // mark to avoid retry
          }
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`Error checking @${account.username}: ${msg}`);
    }
  }

  saveRetweetedIds(retweeted);
  console.log(`Done. ${rtCount} tweets retweeted from watched accounts.`);
}

main();
