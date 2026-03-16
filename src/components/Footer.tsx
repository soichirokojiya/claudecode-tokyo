import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ブランド */}
          <div>
            <Link href="/" className="font-bold text-lg text-gray-900">
              ClaudeCode<span className="text-[#D97757]">.Tokyo</span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Claude Code専門の日本語メディア。
              <br />
              使い方・Tips・最新ニュースを初心者にもわかりやすく。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              カテゴリ
            </h3>
            <ul className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-[#D97757] transition-colors"
                  >
                    {cat.emoji} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              リンク
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-[#D97757] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/claudecodetokyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-[#D97757] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://code.claude.com/docs/ja/quickstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-[#D97757] transition-colors"
                >
                  Claude Code公式ドキュメント
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ClaudeCode.Tokyo All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
