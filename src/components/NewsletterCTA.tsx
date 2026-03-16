"use client";

import { PixelClaude } from "./PixelClaude";

export default function NewsletterCTA() {
  return (
    <section className="relative rounded-xl bg-[#1a1a2e] px-8 py-10 mb-16 text-center overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-4 left-6 flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
      </div>

      <div className="flex justify-center mb-4">
        <PixelClaude size={36} />
      </div>
      <h2 className="text-lg font-bold tracking-tight text-white">
        最新情報を受け取る
      </h2>
      <p className="text-parchment-400 text-sm mt-2 mb-6">
        Claude Codeの最新Tips・アップデート・海外ニュースを毎週お届け
      </p>
      <form
        className="flex gap-2.5 max-w-sm mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 ring-1 ring-white/20 text-white placeholder-parchment-400/60 focus:outline-none focus:ring-2 focus:ring-accent/60 text-sm font-mono transition-shadow"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold shadow-lg shadow-accent/30 hover:bg-accent-dark hover:shadow-accent/40 transition-all duration-200"
        >
          購読
        </button>
      </form>
      <p className="text-parchment-400/40 text-xs font-mono mt-4">
        <span className="text-emerald-400/50">$</span> subscribe --weekly
      </p>
    </section>
  );
}
