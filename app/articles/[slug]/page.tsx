import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleToc } from "@/components/article-toc";
import { ComparisonTable } from "@/components/comparison-table";
import { PortableTextContent } from "@/components/portable-text-content";
import { PostGrid } from "@/components/post-grid";
import { ProductCard } from "@/components/product-card";
import {
  formatDate,
  getAllPosts,
  getArticleTypeLabel,
  getPostBodyText,
  getPostBySlug,
  getPostMetaDescription,
  getProductsByIds,
  getRelatedPosts,
  type ArticleType,
} from "@/lib/posts";
import { getPortableTextHeadings } from "@/lib/portable-text";
import { absoluteUrl, siteConfig } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const ctaCopy = {
  comparison: {
    eyebrow: "比較から次の一歩へ",
    title: "違いを整理したら、公式サイトで条件まで確認する",
    description:
      "比較表で違いをつかんだ後は、価格、使い方、定期条件まで公式サイトで確認すると判断が早くなります。",
  },
  ranking: {
    eyebrow: "ランキング上位から確認",
    title: "迷ったら上位商品から順にチェックする",
    description:
      "ランキング記事は候補を絞るための入口です。購入前には公式サイトで内容量や定期条件も確認しておくと安心です。",
  },
  review: {
    eyebrow: "レビューから購入判断へ",
    title: "レビューで不安が減ったら、最後は公式情報を確認する",
    description:
      "レビューは向いている人と注意点を整理するためのページです。最後は公式サイトで自分に合う条件かを見て判断します。",
  },
  concern: {
    eyebrow: "悩み整理から候補選びへ",
    title: "悩みの整理ができたら、比較とランキングへ進む",
    description:
      "悩み解決記事で方向性が固まったら、比較記事とランキング記事で候補を絞り、公式サイトへ進む流れが自然です。",
  },
} satisfies Record<
  ArticleType,
  { eyebrow: string; title: string; description: string }
>;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  const metaDescription = getPostMetaDescription(post);

  return {
    title: post.title,
    description: metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/articles/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: `/articles/${post.slug}`,
      title: post.title,
      description: metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: `/articles/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      images: [`/articles/${post.slug}/opengraph-image`],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);
  const products = getProductsByIds(post.productIds);
  const primaryProduct = products[0];
  const articleCta = ctaCopy[post.articleType];
  const metaDescription = getPostMetaDescription(post);
  const articleHeadings =
    post.body && post.body.length > 0
      ? getPortableTextHeadings(post.body)
      : post.sections.map((section, index) => ({
          id: section.id,
          title: section.heading,
          level: 2 as const,
          order: index,
        }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "ja-JP",
    articleSection: post.categoryName,
    keywords: post.keywords.join(", "),
    image: [absoluteUrl(`/articles/${post.slug}/opengraph-image`)],
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/articles/${post.slug}`),
    articleBody: getPostBodyText(post),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(typeof post.rankingRank === "number" ? { position: post.rankingRank } : {}),
    ...(post.affiliateUrl
      ? {
          potentialAction: {
            "@type": "ViewAction",
            target: post.affiliateUrl,
          },
        }
      : {}),
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="glass-panel overflow-hidden rounded-[2.25rem] lg:overflow-visible">
          <div className="relative aspect-[16/9] min-h-[20rem] overflow-hidden rounded-t-[2.25rem]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 84vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-white/85">
                <span>{post.categoryName}</span>
                <span className="h-1 w-1 rounded-full bg-white/70" />
                <span>{getArticleTypeLabel(post.articleType)}</span>
                <span className="h-1 w-1 rounded-full bg-white/70" />
                <span>{formatDate(post.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-white/70" />
                <span>{post.readTime}</span>
              </div>
              <h1 className="max-w-4xl font-serif text-4xl leading-tight tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
                {post.excerpt}
              </p>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <nav className="mb-6 text-sm text-slate-500">
                <Link href="/" className="transition hover:text-slate-950">
                  トップ
                </Link>
                <span className="px-2">/</span>
                <Link href="/articles" className="transition hover:text-slate-950">
                  記事一覧
                </Link>
                <span className="px-2">/</span>
                <span>{post.categoryName}</span>
              </nav>

              <div className="grid gap-4 md:grid-cols-3">
                {post.summaryPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5"
                  >
                    <p className="text-sm leading-7 text-slate-700">{point}</p>
                  </div>
                ))}
              </div>

              {primaryProduct ? (
                <section className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      {articleCta.eyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.03em]">
                      {articleCta.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/80">{articleCta.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {primaryProduct.featureLabels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={primaryProduct.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-stone-100"
                      >
                        {post.ctaText}
                      </a>
                      {primaryProduct.reviewArticleSlug ? (
                        <Link
                          href={`/articles/${primaryProduct.reviewArticleSlug}`}
                          className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
                        >
                          レビューを見る
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Lead Product
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-slate-950">
                      {primaryProduct.name}
                    </h3>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600">
                      <div className="rounded-[1.25rem] bg-stone-50 px-4 py-3">
                        <p className="font-semibold text-slate-900">総合スコア</p>
                        <p className="mt-1 leading-7">{primaryProduct.score} / 100</p>
                      </div>
                      <div className="rounded-[1.25rem] bg-stone-50 px-4 py-3">
                        <p className="font-semibold text-slate-900">価格目安</p>
                        <p className="mt-1 leading-7">{primaryProduct.priceLabel}</p>
                      </div>
                      <div className="rounded-[1.25rem] bg-stone-50 px-4 py-3">
                        <p className="font-semibold text-slate-900">向いている人</p>
                        <p className="mt-1 leading-7">{primaryProduct.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              {products.length > 1 ? (
                <ComparisonTable
                  products={products}
                  title={`${post.categoryName}の比較表`}
                  description="この記事で取り上げている商品を、使う頻度、向いている悩み、続けやすさまで横並びで比較できます。"
                />
              ) : null}

              {products.length > 0 ? (
                <section className="mt-8">
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Featured Products
                    </p>
                    <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                      記事内で触れている商品
                    </h2>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-2">
                    {products.map((product, index) => (
                      <ProductCard key={product.id} product={product} rank={products.length > 1 ? index + 1 : undefined} />
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="article-content mt-10">
                {post.body && post.body.length > 0 ? (
                  <PortableTextContent value={post.body} />
                ) : (
                  post.sections.map((section, index) => (
                    <section key={section.id} id={section.id}>
                    <h2>{section.heading}</h2>
                    <p>{section.body}</p>

                    {index === 0 && primaryProduct ? (
                      <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white/90 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Mid CTA
                        </p>
                        <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                          候補が見えてきたら、公式サイトで条件を確認する
                        </h3>
                        <p className="mt-4 text-sm leading-8 text-slate-600">
                          比較と悩み整理ができた段階で、価格、使用方法、定期条件まで確認しておくと判断が速くなります。
                          あわせて関連記事も読むと、他の候補との違いがさらに見えやすくなります。
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={primaryProduct.affiliateUrl}
                            target="_blank"
                            rel="nofollow sponsored"
                            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                          >
                            {primaryProduct.ctaLabel}
                          </a>
                          <Link
                            href="/articles"
                            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                          >
                            記事一覧へ戻る
                          </Link>
                        </div>
                      </div>
                    ) : null}
                    </section>
                  ))
                )}
              </div>

              {primaryProduct ? (
                <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white/90 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Final CTA
                  </p>
                  <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] text-slate-950">
                    最後にもう一度、公式サイトで詳細を見る
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-slate-600">
                    比較軸や向いている人が整理できたら、最後は公式サイトで価格や使用条件を確認してください。
                    読んだ内容と自分の悩みが一致しているかを確認してから進むと、離脱しにくくなります。
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={primaryProduct.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      {primaryProduct.ctaLabel}
                    </a>
                    <Link
                      href="/articles"
                      className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-500"
                    >
                      関連記事を探す
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:self-start">
              <ArticleToc items={articleHeadings} />
              <div className="glass-panel rounded-[1.6rem] p-5 lg:flex-none">
                <div className="rounded-[1.3rem] bg-stone-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Article Data
                  </p>
                  <dl className="mt-3 space-y-3 text-sm text-slate-600">
                    <div>
                      <dt className="font-semibold text-slate-900">カテゴリ</dt>
                      <dd className="mt-1">{post.categoryName}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">記事タイプ</dt>
                      <dd className="mt-1">{getArticleTypeLabel(post.articleType)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900">訴求軸</dt>
                      <dd className="mt-1">{post.appealAxis}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-2 sm:px-8 lg:px-12">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Related Articles
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950">
              関連記事
            </h2>
          </div>
          <PostGrid
            posts={relatedPosts}
            gridClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            emptyTitle="関連記事を準備中です"
            emptyDescription="同カテゴリや同タイプの記事が追加されると、ここに自動で表示されます。"
          />
        </section>
      ) : null}
    </div>
  );
}
