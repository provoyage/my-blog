import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import {
  articleTypeLabels,
  getCategoryWithCounts,
  getPostsByCategory,
  getPostsByType,
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "比較、ランキング、レビュー、悩み解決の4タイプで、40代女性の見た目悩みに合う美容商品を探せる記事ハブです。",
  alternates: {
    canonical: "/articles",
  },
};

const orderedTypes = ["comparison", "ranking", "review", "concern"] as const;

export default function ArticlesPage() {
  const categories = getCategoryWithCounts();

  return (
    <div className="pb-20">
      <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-8 sm:px-8 lg:px-12 lg:pb-10 lg:pt-10">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Article Hub
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">
                比較とランキングで探しやすい
                <br />
                記事ハブ
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                記事を書き足していく運用を前提に、カテゴリと記事タイプで迷わず辿れる一覧構造にしています。
                比較記事、ランキング記事、レビュー記事、悩み解決記事を横断して確認できます。
              </p>
              <div className="flex flex-wrap gap-3">
                {orderedTypes.map((articleType) => (
                  <a
                    key={articleType}
                    href={`#${articleType}`}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                  >
                    {articleTypeLabels[articleType]}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/85"
                >
                  <div className="relative h-36">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                        {category.heroLabel}
                      </p>
                      <p className="mt-1 font-serif text-2xl">{category.name}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-serif text-4xl text-slate-950">{category.articleCount}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {category.productCount}商品を軸にランキングと比較を展開しています。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-2 sm:px-8 lg:px-12">
        <div className="grid gap-6 xl:grid-cols-2">
          {categories.map((category) => {
            const categoryPosts = getPostsByCategory(category.slug);
            const rankingPost = categoryPosts.find((post) => post.articleType === "ranking");
            const comparisonPost = categoryPosts.find(
              (post) => post.articleType === "comparison",
            );

            return (
              <article key={category.slug} className="glass-panel rounded-[2rem] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                      {category.name}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                      カテゴリ導線
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{category.summary}</p>
                  </div>
                  <Link
                    href="/"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                  >
                    トップへ戻る
                  </Link>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {rankingPost ? <PostCard post={rankingPost} /> : null}
                  {comparisonPost ? <PostCard post={comparisonPost} /> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        {orderedTypes.map((articleType) => {
          const posts = getPostsByType(articleType);

          if (posts.length === 0) {
            return null;
          }

          return (
            <div key={articleType} id={articleType} className="py-6">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {articleTypeLabels[articleType]}
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                  {articleTypeLabels[articleType]}記事
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
