"use client";

export default function NewsletterCTA() {
  return (
    <section className="relative rounded-xl bg-white ring-1 ring-parchment-200/60 shadow-sm px-8 py-10 mb-16 text-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 via-accent to-accent/80" />
      <h2 className="text-lg font-bold tracking-tight text-parchment-900">
        最新情報を受け取る
      </h2>
      <p className="text-parchment-500 text-sm mt-2 mb-6">
        Claude Codeの最新Tips・アップデート・海外ニュースを毎週お届け
      </p>
      <form
        className="flex gap-2.5 max-w-sm mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 px-4 py-2.5 rounded-lg bg-parchment-50 ring-1 ring-parchment-200 text-parchment-900 placeholder-parchment-400 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm font-mono transition-shadow"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold shadow-md shadow-accent/25 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 transition-all duration-200"
        >
          購読
        </button>
      </form>
    </section>
  );
}
