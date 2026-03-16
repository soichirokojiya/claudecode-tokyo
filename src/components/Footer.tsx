import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-parchment-400 flex w-full flex-col items-center justify-center gap-2 px-4 pt-24 pb-8 text-center text-sm">
      <Link
        href="/"
        className="text-parchment-500 font-medium hover:text-parchment-900 transition-colors"
      >
        ClaudeCode<span className="text-accent">.Tokyo</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/about"
          className="hover:text-parchment-900 transition-colors"
        >
          About
        </Link>
        <span className="text-parchment-300">&middot;</span>
        <a
          href="https://x.com/claudecodetokyo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-parchment-900 transition-colors"
        >
          X
        </a>
        <span className="text-parchment-300">&middot;</span>
        <a
          href="https://code.claude.com/docs/ja/quickstart"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-parchment-900 transition-colors"
        >
          公式ドキュメント
        </a>
      </div>
      <p className="text-xs text-parchment-300 mt-2">
        &copy; {new Date().getFullYear()} ClaudeCode.Tokyo
      </p>
    </footer>
  );
}
