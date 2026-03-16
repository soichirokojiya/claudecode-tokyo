import Link from "next/link";
import { PixelClaude } from "./PixelClaude";

export default function Footer() {
  return (
    <footer className="bg-parchment-900 text-parchment-400 mt-12">
      {/* Double rule top */}
      <div className="h-[3px] bg-parchment-900" />
      <div className="h-px bg-parchment-50" />
      <div className="h-px bg-parchment-900" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <PixelClaude size={28} />
              <span className="text-white font-editorial text-xl tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                ClaudeCode<span className="text-accent">.Tokyo</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Claude Code 専門メディア。使い方・Tips・最新ニュースを初心者にもわかりやすくお届けします。
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="text-white text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-4 border-b border-parchment-700 pb-1 inline-block">
              Sections
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/getting-started" className="text-sm hover:text-accent transition-colors">
                  ClaudeCode入門
                </Link>
              </li>
              <li>
                <Link href="/category/tips" className="text-sm hover:text-accent transition-colors">
                  Tips
                </Link>
              </li>
              <li>
                <Link href="/category/news" className="text-sm hover:text-accent transition-colors">
                  ニュース
                </Link>
              </li>
              <li>
                <Link href="/sns" className="text-sm hover:text-accent transition-colors">
                  SNS
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-4 border-b border-parchment-700 pb-1 inline-block">
              Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/claudecodetokyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-accent transition-colors"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-accent transition-colors"
                >
                  Claude.ai
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/soichirokojiya/claudecode-tokyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-parchment-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-sans">
            &copy; {new Date().getFullYear()} ClaudeCode.Tokyo
          </p>
          <p className="text-xs text-parchment-400/60 font-sans">
            運営：<a href="https://commonfuture.co.jp" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Common Future &amp; Co. 株式会社</a>
          </p>
          <p className="text-xs text-parchment-400/40 font-sans">
            Powered by Claude Code
          </p>
        </div>
      </div>
    </footer>
  );
}
