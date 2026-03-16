"use client";

export default function NewsletterCTA() {
  return (
    <section className="bg-gray-900 rounded-xl p-8 text-center my-12">
      <h2 className="text-xl font-bold text-white mb-2">
        Claude Codeの最新情報を毎週お届け
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        Tips・アップデート・海外ニュースの翻訳をまとめて受信
      </p>
      <form
        className="flex gap-2 max-w-md mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="メールアドレス"
          className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D97757] text-sm"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#D97757] text-white rounded-lg font-medium hover:bg-[#c4643f] transition-colors text-sm"
        >
          購読する
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-3">
        無料・いつでも解除可能
      </p>
    </section>
  );
}
