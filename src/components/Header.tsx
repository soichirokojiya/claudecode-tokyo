import Link from "next/link";
import { PixelClaude } from "./PixelClaude";

export default function Header() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <header className="bg-parchment-50">
      {/* Bold triple rule at top */}
      <div className="h-1.5 bg-parchment-900" />
      <div className="h-[2px] bg-parchment-50" />
      <div className="h-[3px] bg-parchment-900" />
      <div className="h-[1px] bg-parchment-50" />
      <div className="h-px bg-parchment-900" />

      {/* Masthead */}
      <div className="py-5 sm:py-7 text-center">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center gap-2 mb-1">
            <PixelClaude size={32} />
          </div>
          <h1 className="text-5xl sm:text-7xl font-masthead font-normal tracking-tight text-parchment-900" style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}>
            ClaudeCode<span className="text-accent">.Tokyo</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-parchment-400 mt-2 font-sans font-medium">
            The Definitive Source for Claude Code &mdash; AI時代のコード新聞
          </p>
        </Link>
      </div>

      {/* Double rule before date + nav */}
      <div className="h-[3px] bg-parchment-900" />
      <div className="h-[2px] bg-parchment-50" />
      <div className="h-px bg-parchment-900" />

      {/* Date bar & Edition label - just above nav */}
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between text-[11px] text-parchment-500">
        <div className="flex items-center gap-4">
          <span className="font-sans font-medium tracking-[0.08em] uppercase">{dateStr}</span>
          <span className="text-parchment-300">|</span>
          <span className="font-sans tracking-[0.15em] uppercase text-parchment-400">Tokyo Edition</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/claudecodetokyo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/soichirokojiya/claudecode-tokyo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Navigation - newspaper section tabs */}
      <div className="sticky top-0 z-50 bg-parchment-50/95 backdrop-blur-sm">
        <div className="h-px bg-parchment-300" />
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-0">
          <Link href="/" className="px-5 py-3 text-[11px] text-parchment-700 hover:text-accent tracking-[0.15em] uppercase font-sans font-semibold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent">
            Home
          </Link>
          <Link href="/category/getting-started" className="px-5 py-3 text-[11px] text-parchment-700 hover:text-accent tracking-[0.15em] uppercase font-sans font-semibold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent">
            ClaudeCode入門
          </Link>
          <Link href="/category/tips" className="px-5 py-3 text-[11px] text-parchment-700 hover:text-accent tracking-[0.15em] uppercase font-sans font-semibold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent">
            Tips
          </Link>
          <Link href="/category/news" className="px-5 py-3 text-[11px] text-parchment-700 hover:text-accent tracking-[0.15em] uppercase font-sans font-semibold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent">
            ニュース
          </Link>
          <Link href="/sns" className="px-5 py-3 text-[11px] text-parchment-700 hover:text-accent tracking-[0.15em] uppercase font-sans font-semibold transition-all whitespace-nowrap border-b-2 border-transparent hover:border-accent">
            SNS
          </Link>
        </nav>
        <div className="h-px bg-parchment-900" />
      </div>
    </header>
  );
}
