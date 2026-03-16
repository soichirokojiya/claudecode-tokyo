"use client";

import { useEffect, useRef } from "react";

export default function NewsletterCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Load Twitter embed script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="mb-16">
      {/* Section header - newspaper style */}
      <div className="border-t-4 border-neutral-900 pt-3 mb-6">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-neutral-900">
          Latest from X
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          @claudecodetokyo の最新情報をチェック
        </p>
      </div>

      <div ref={containerRef} className="max-w-lg mx-auto">
        <a
          className="twitter-timeline"
          data-height="500"
          data-theme="light"
          data-chrome="noheader nofooter noborders transparent"
          data-lang="ja"
          href="https://twitter.com/claudecodetokyo"
        >
          @claudecodetokyo のツイート
        </a>
      </div>

      {/* Follow CTA */}
      <div className="text-center mt-6">
        <a
          href="https://x.com/claudecodetokyo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-neutral-700 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          フォローする
        </a>
      </div>
    </section>
  );
}
