import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { PixelClaude, PixelStar } from "./PixelClaude";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-parchment-400 mt-12 relative overflow-hidden">
      {/* Pixel stars decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <PixelStar className="absolute top-8 left-[8%] text-white/20" />
        <PixelStar className="absolute top-16 left-[22%] text-white/10" />
        <PixelStar className="absolute top-12 left-[45%] text-white/20" />
        <PixelStar className="absolute top-6 left-[68%] text-white/15" />
        <PixelStar className="absolute top-20 left-[82%] text-white/10" />
        <PixelStar className="absolute top-24 left-[35%] text-white/15" />
        <PixelStar className="absolute top-4 left-[92%] text-white/20" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <PixelClaude size={32} />
              <span className="text-white font-editorial text-xl tracking-tight">
                ClaudeCode<span className="text-accent">.Tokyo</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Claude Code 専門メディア。使い方・Tips・最新ニュースを初心者にもわかりやすく。
            </p>
            <p className="font-mono text-xs text-parchment-400/40 mt-4">
              <span className="text-emerald-400/50">$</span> Let&apos;s get started._
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-4">
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

        {/* Ground line like Claude Code startup */}
        <div className="border-t border-parchment-400/20 mt-10 pt-6 flex items-center justify-between">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} ClaudeCode.Tokyo
          </p>
          <p className="text-xs text-parchment-400/40 font-mono">
            Powered by Claude Code
          </p>
        </div>
      </div>
    </footer>
  );
}
