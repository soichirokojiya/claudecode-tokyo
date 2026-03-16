import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8">
      <div className="h-px bg-gradient-to-r from-transparent via-parchment-200 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-0 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <Link
              href="/"
              className="text-parchment-900 font-semibold tracking-tight hover:text-accent transition-colors"
            >
              ClaudeCode<span className="text-accent">.Tokyo</span>
            </Link>
            <p className="text-xs text-parchment-400">
              Claude Code 専門メディア
            </p>
          </div>
          <div className="flex items-center gap-5 text-sm text-parchment-400">
            <Link
              href="/about"
              className="hover:text-parchment-900 transition-colors"
            >
              About
            </Link>
            <a
              href="https://x.com/claudecodetokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-parchment-900 transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://code.claude.com/docs/ja/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-parchment-900 transition-colors"
            >
              公式ドキュメント
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-parchment-300 mt-8">
          &copy; {new Date().getFullYear()} ClaudeCode.Tokyo — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
