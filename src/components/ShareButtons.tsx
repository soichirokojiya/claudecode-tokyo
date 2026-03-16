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
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-parchment-500 hover:text-parchment-900 rounded-[8px] border border-parchment-200 hover:border-parchment-300 transition-colors font-medium"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        ポスト
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-parchment-500 hover:text-parchment-900 rounded-[8px] border border-parchment-200 hover:border-parchment-300 transition-colors font-medium"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l-1.757 1.757a4.5 4.5 0 010 6.364l-4.5 4.5"
          />
        </svg>
        リンク
      </button>
    </div>
  );
}
