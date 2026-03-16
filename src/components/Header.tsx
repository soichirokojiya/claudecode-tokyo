import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-parchment-50/90 backdrop-blur-md border-b border-parchment-200/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-parchment-900 font-bold tracking-tight text-lg hover:text-accent transition-colors"
          >
            ClaudeCode<span className="text-accent">.Tokyo</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/claudecodetokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment-400 hover:text-parchment-900 text-sm font-medium transition-colors"
            >
              X
            </a>
            <a
              href="https://github.com/soichirokojiya/claudecode-tokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment-400 hover:text-parchment-900 text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-3 -mb-px scrollbar-none">
          <Link
            href="/"
            className="px-3 py-1.5 text-[13px] text-parchment-500 hover:text-parchment-900 hover:bg-parchment-100 rounded-md transition-colors whitespace-nowrap font-semibold"
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-[13px] text-parchment-500 hover:text-parchment-900 hover:bg-parchment-100 rounded-md transition-colors whitespace-nowrap font-semibold"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
