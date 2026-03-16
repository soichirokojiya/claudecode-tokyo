"use client";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const url = `https://claudecode.tokyo/articles/${slug}`;
  const text = encodeURIComponent(`${title} | ClaudeCode.Tokyo`);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">共有:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        ポスト
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        URLコピー
      </button>
    </div>
  );
}
