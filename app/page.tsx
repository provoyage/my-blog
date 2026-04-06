import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostGrid } from "@/components/post-grid";
import { PostCard } from "@/components/post-card";
import { ProductCard } from "@/components/product-card";
import {
  getCategoryWithCounts,
  getFeaturedComparisonPost,
  getFeaturedPost,
  getFeaturedProducts,
  getFeaturedRankingPost,
  getLatestPosts,
  getPopularPosts,
  getPostsByCategory,
  getRankedProductsByCategory,
  getTopRankedProducts,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const featuredPost = await getFeaturedPost();
  const categories = await getCategoryWithCounts();
  const topRankedProducts = getTopRankedProducts(3);
  const featuredComparison = await getFeaturedComparisonPost();
  const featuredRanking = await getFeaturedRankingPost();
  const featuredProducts = getFeaturedProducts(4);
  const latestPosts = await getLatestPosts(4);
  const popularPosts = await getPopularPosts(4);
  const postsByCategory = await Promise.all(
    categories.map(async (category) => ({
      slug: category.slug,
      posts: await getPostsByCategory(category.slug),
    })),
  );
  const postsByCategoryMap = new Map(postsByCategory.map((entry) => [entry.slug, entry.posts]));
  const categoryLandingBlocks = categories.map((category) => {
    const posts = postsByCategoryMap.get(category.slug) ?? [];

    return {
      ...category,
      products: getRankedProductsByCategory(category.slug, 3),
      rankingPost: posts.find((post) => post.articleType === "ranking"),
      comparisonPost: posts.find((post) => post.articleType === "comparison"),
    };
  });

  return (
    <div className="pb-20">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-10 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:pb-14 lg:pt-14 xl:gap-14">
        <div className="space-y-8 lg:pr-10 xl:pr-20">
          <span className="inline-flex rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 backdrop-blur">
            40代女性の見た目悩みに特化した比較メディア
          </span>

          <div className="space-y-7">
            <h1 className="max-w-4xl font-serif text-[3.7rem] leading-[0.94] tracking-[-0.075em] text-slate-950 text-balance sm:text-[4.6rem] lg:text-[5.7rem]">
              その悩み、
              <br />
              選び方で変わる。
            </h1>
            <p className="max-w-xl text-base leading-8 tracking-[0.01em] text-slate-600 sm:text-lg">
              年齢のサインに静かに向き合いながら、品よく整えるための選び方だけを集めました。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#overall-ranking"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              総合ランキングを見る
            </Link>
            <Link
              href="#comparison"
              className="rounded-full border border-slate-300 bg-white/85 px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-500"
            >
              比較導線へ進む
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-panel rounded-[1.5rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-slate-700 shadow-[0_12px_30px_rgba(148,163,184,0.16)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.75 6.75h6.5v6.5h-6.5zM12.75 6.75h6.5v6.5h-6.5zM4.75 14.75h6.5v6.5h-6.5zM12.75 14.75h6.5v6.5h-6.5z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Categories
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.04em] text-slate-950">
                {categories.length}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                4つの悩みカテゴリごとに、ランキングと比較記事を整理しています。
              </p>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-slate-700 shadow-[0_12px_30px_rgba(148,163,184,0.16)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.25 7.25h11.5M8 7.25l.4 10.25a1.5 1.5 0 0 0 1.5 1.44h4.2a1.5 1.5 0 0 0 1.5-1.44L16 7.25M9.5 7.25V6a1.75 1.75 0 0 1 1.75-1.75h1.5A1.75 1.75 0 0 1 14.5 6v1.25"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Products
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.04em] text-slate-950">
                {categoryLandingBlocks.reduce((sum, category) => sum + category.productCount, 0)}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                成分や使い心地まで見比べながら、候補を絞り込める構成です。
              </p>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-slate-700 shadow-[0_12px_30px_rgba(148,163,184,0.16)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.25 5.75h7.5l3 3v9.5a1.5 1.5 0 0 1-1.5 1.5h-9.5a1.5 1.5 0 0 1-1.5-1.5v-11a1.5 1.5 0 0 1 1.5-1.5z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.75 5.75v3h3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12h6.5M8.5 15.5h4.25" />
                </svg>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Articles
              </p>
              <p className="mt-3 font-serif text-4xl tracking-[-0.04em] text-slate-950">
                {categoryLandingBlocks.reduce((sum, category) => sum + category.articleCount, 0)}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                比較、ランキング、読み物を横断して、必要な判断材料を拾えます。
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Featured Guide
          </p>
          <div className="mt-4">
            <PostCard post={featuredPost} featured preload />
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-4 sm:px-8 lg:px-12"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Concern Categories
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
              悩みカテゴリから探す
            </h2>
          </div>
          <p className="hidden max-w-xl text-sm leading-7 text-slate-500 lg:block">
            カテゴリごとにランキング記事と比較記事を用意し、トップからすぐに購入検討へ進める導線にしています。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categoryLandingBlocks.map((category) => (
            <article key={category.slug} className="glass-panel overflow-hidden rounded-[1.75rem]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                    {category.heroLabel}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">{category.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/85">{category.summary}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {category.concerns.map((concern) => (
                    <span
                      key={concern}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {category.rankingPost ? (
                    <Link
                      href={`/articles/${category.rankingPost.slug}`}
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      ランキング
                    </Link>
                  ) : null}
                  {category.comparisonPost ? (
                    <Link
                      href={`/articles/${category.comparisonPost.slug}`}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                    >
                      比較を見る
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="overall-ranking"
        className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-8 sm:px-8 lg:px-12"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Main Ranking
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
              総合人気ランキング
            </h2>
          </div>
          <p className="hidden max-w-xl text-sm leading-7 text-slate-500 lg:block">
            カテゴリ横断で訴求力と選ばれやすさの高い商品をまとめています。
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {topRankedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      </section>

      <section id="articles" className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-6 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Category Rankings
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
            各カテゴリの人気商品ランキング
          </h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {categoryLandingBlocks.map((category) => (
            <article key={category.slug} className="glass-panel overflow-hidden rounded-[2rem]">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
                <div className="absolute inset-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                    {category.name}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl">人気商品ランキング</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-6">
                {category.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="rounded-[1.5rem] border border-slate-200 bg-white/92 p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-[1.1rem]">
                          <Image
                            src={product.image}
                            alt={product.imageAlt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                              {index + 1}位
                            </span>
                            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                              {product.badge}
                            </span>
                          </div>
                          <h4 className="mt-3 font-serif text-2xl text-slate-950">{product.name}</h4>
                          <p className="mt-2 text-sm leading-7 text-slate-600">{product.summary}</p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                        <div className="rounded-[1.2rem] bg-stone-50 px-4 py-3 text-sm text-slate-700">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Score
                          </p>
                          <p className="mt-1 text-lg font-semibold text-slate-950">{product.score}</p>
                        </div>
                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="nofollow sponsored"
                          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          {product.ctaLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {category.rankingPost ? (
                  <Link
                    href={`/articles/${category.rankingPost.slug}`}
                    className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                  >
                    このカテゴリのランキング記事を見る
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="comparison" className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Comparison Funnel
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
              比較・ランキング導線
            </h2>
          </div>
          <p className="hidden max-w-xl text-sm leading-7 text-slate-500 lg:block">
            まずは比較で違いを理解し、その後にランキングやレビューで候補を絞る構成です。
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {featuredComparison ? <PostCard post={featuredComparison} featured /> : null}
          {featuredRanking ? <PostCard post={featuredRanking} featured /> : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Recommended Products
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
            おすすめ商品
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Popular Articles
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
              人気記事
            </h2>
          </div>
        </div>

        <PostGrid
          posts={popularPosts}
          emptyTitle="人気記事を準備中です"
          emptyDescription="Sanity に人気記事が追加されると、ここにカード形式で表示されます。"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              New Articles
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950 sm:text-4xl">
              新着記事
            </h2>
          </div>
          <Link
            href="/articles"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
          >
            記事一覧を見る
          </Link>
        </div>

        <PostGrid
          posts={latestPosts}
          emptyTitle="新着記事を準備中です"
          emptyDescription="最初の記事が公開されると、新着カードが自動でここに並びます。"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Operating Policy
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5">
              <h3 className="font-serif text-2xl text-slate-950">比較軸を明示</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                価格、使う頻度、向いている悩み、続けやすさを軸に、商品選びの基準を見える形で整理します。
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5">
              <h3 className="font-serif text-2xl text-slate-950">広告導線を明確化</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                CTA は公式サイトへの導線として明確に分け、レビュー・比較・ランキングから自然に遷移できる構造にしています。
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5">
              <h3 className="font-serif text-2xl text-slate-950">運用しやすい構造</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                商品データ、順位データ、記事データを分離し、後からの追加や順位変更を管理しやすくしています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
