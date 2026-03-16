"use client";

export default function NewsletterCTA() {
  return (
    <section className="rounded-[12px] border border-parchment-200 bg-parchment-100/50 px-8 py-8 mb-16 text-center">
      <h2 className="text-lg font-medium tracking-tight text-parchment-900">
        最新情報を受け取る
      </h2>
      <p className="text-parchment-500 text-sm mt-1.5 mb-5">
        Claude Codeの最新Tips・アップデート・海外ニュースを毎週お届け
      </p>
      <form
        className="flex gap-2 max-w-sm mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 px-4 py-2.5 rounded-[8px] bg-white border border-parchment-200 text-parchment-900 placeholder-parchment-400 focus:outline-none focus:border-accent text-sm font-mono"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-parchment-900 text-parchment-50 rounded-[8px] text-sm font-medium hover:bg-parchment-700 transition-colors"
        >
          購読
        </button>
      </form>
    </section>
  );
}
