import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

async function main() {
  const me = await client.v2.me();
  const myId = me.data.id;
  console.log("My ID:", myId);

  // RT source tweets from articles
  const tweetIds = [
    "2032507422393164029", // ClaudeCodeLog - 1M context window
    "2017742741636321619", // Boris Cherny - 22 tips
    "2026418433911603668", // Claude AI - remote control
  ];

  for (const id of tweetIds) {
    try {
      await client.v2.retweet(myId, id);
      console.log("Retweeted:", id);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`RT failed (${id}): ${msg}`);
    }
  }
}
main();
