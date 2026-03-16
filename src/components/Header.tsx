import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { PixelClaude } from "./PixelClaude";

export default function Header() {
  return (
    <header className="bg-white">
      {/* Top bar - dark like Claude Code terminal */}
      <div className="bg-[#1a1a2e] text-parchment-400">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-[11px]">
              <span className="text-emerald-400">$</span>
              <span className="text-parchment-400/60"> claude</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://x.com/claudecodetokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/soichirokojiya/claudecode-tokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="py-6 text-center border-b border-parchment-200">
        <Link href="/" className="inline-flex items-center gap-3">
          <PixelClaude size={44} />
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-editorial tracking-tight text-parchment-900">
              ClaudeCode<span className="text-accent">.Tokyo</span>
            </h1>
            <p className="text-[10px] tracking-[0.25em] uppercase text-parchment-400 font-mono">
              Claude Code 専門メディア
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-parchment-200">
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-0.5 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className="px-4 py-3 text-[12px] text-parchment-600 hover:text-accent hover:bg-accent/5 tracking-wider uppercase font-bold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent"
          >
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-3 text-[12px] text-parchment-600 hover:text-accent hover:bg-accent/5 tracking-wider uppercase font-bold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            className="px-4 py-3 text-[12px] text-parchment-600 hover:text-accent hover:bg-accent/5 tracking-wider uppercase font-bold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
