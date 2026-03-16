import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="bg-parchment-900 text-parchment-400 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white font-editorial text-2xl tracking-tight">
              ClaudeCode<span className="text-accent">.Tokyo</span>
            </Link>
            <p className="text-sm mt-2 leading-relaxed">
              Claude Code 専門メディア。使い方・Tips・最新ニュースを初心者にもわかりやすく。
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
                    className="text-sm hover:text-white transition-colors"
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
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/claudecodetokyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://code.claude.com/docs/ja/quickstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Claude Code 公式ドキュメント
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/soichirokojiya/claudecode-tokyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-parchment-700 mt-10 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} ClaudeCode.Tokyo — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
