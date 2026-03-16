import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="font-bold text-lg text-gray-900">
              ClaudeCode<span className="text-[#D97757]">.Tokyo</span>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Claude Code専門の日本語メディア
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900">
              About
            </Link>
            <a
              href="https://x.com/claudecodetokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              X (Twitter)
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} ClaudeCode.Tokyo All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
