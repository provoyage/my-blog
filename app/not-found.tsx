import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-6 py-16 sm:px-8 lg:px-12">
      <div className="glass-panel w-full rounded-[2rem] p-8 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-slate-950 sm:text-5xl">
          ページが見つかりませんでした
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
          URL が変更されたか、ページが公開終了になっている可能性があります。トップページ、
          もしくは記事一覧から見たいカテゴリや比較記事をご確認ください。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            トップへ戻る
          </Link>
          <Link
            href="/articles"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-500"
          >
            記事一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
