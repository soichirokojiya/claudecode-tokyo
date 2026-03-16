import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Header() {
  return (
    <header className="bg-white">
      {/* Top bar */}
      <div className="border-b border-parchment-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-4 text-xs text-parchment-400">
            <a
              href="https://x.com/claudecodetokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-parchment-900 transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/soichirokojiya/claudecode-tokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-parchment-900 transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-xs text-parchment-400">
            Claude Code 専門メディア
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="py-6 text-center border-b border-parchment-900">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl sm:text-5xl font-editorial tracking-tight text-parchment-900">
            ClaudeCode<span className="text-accent">.Tokyo</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b border-parchment-200">
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-1 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className="px-4 py-3 text-[13px] text-parchment-700 hover:text-accent tracking-wide uppercase font-semibold transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-3 text-[13px] text-parchment-700 hover:text-accent tracking-wide uppercase font-semibold transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            className="px-4 py-3 text-[13px] text-parchment-700 hover:text-accent tracking-wide uppercase font-semibold transition-colors whitespace-nowrap"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
