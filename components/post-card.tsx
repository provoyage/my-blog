import Image from "next/image";
import Link from "next/link";
import { formatDate, getArticleTypeLabel, type Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  featured?: boolean;
  preload?: boolean;
};

function CrownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 17.25h14.5l-1-8.5-4.25 3.25L12 6.75 9.75 12 5.75 8.75l-1 8.5Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.25 19.75h9.5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 7.75h6.5v6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 16 8.25-8.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.25 13.5v4a1.75 1.75 0 0 1-1.75 1.75h-8a1.75 1.75 0 0 1-1.75-1.75v-8A1.75 1.75 0 0 1 6.5 7.75h4"
      />
    </svg>
  );
}

export function PostCard({
  post,
  featured = false,
  preload = false,
}: PostCardProps) {
  const articleHref = post.slug ? `/articles/${post.slug}` : "/articles";
  const imageSrc = post.image || "/media/categories/gray-hair.jpg";
  const summary = post.excerpt?.trim() || post.description?.trim() || "記事を準備中です。";
  const concernTags =
    post.targetConcern.length > 0 ? post.targetConcern.slice(0, 2) : [post.categoryName];

  return (
    <article
      className={`group glass-panel flex h-full flex-col overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(26,35,45,0.14)]`}
    >
      <Link href={articleHref} className="block">
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[4/5] min-h-[20rem] sm:min-h-[24rem]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={imageSrc}
            alt={post.imageAlt || post.title}
            fill
            preload={preload}
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 42vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            }
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/18 to-transparent" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {typeof post.rankingRank === "number" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/60 bg-amber-50/95 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">
                <CrownIcon />
                Rank {post.rankingRank}
              </span>
            ) : null}
            <span className="rounded-full border border-white/25 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {post.categoryName}
            </span>
            <span className="rounded-full border border-white/25 bg-slate-900/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {getArticleTypeLabel(post.articleType)}
            </span>
          </div>
        </div>

        <div className={`flex h-full flex-col ${featured ? "p-7 sm:p-8" : "p-6"}`}>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span>{post.readTime}</span>
          </div>

          <h3
            className={`mt-4 font-serif tracking-[-0.03em] text-slate-950 transition group-hover:text-slate-700 ${
              featured
                ? "text-3xl leading-[1.08] tracking-[-0.04em] sm:text-[2.55rem]"
                : "text-2xl leading-snug"
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`mt-4 text-slate-600 ${
              featured ? "text-base leading-8" : "text-sm leading-7"
            }`}
          >
            {summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {concernTags.map((concern) => (
              <span
                key={concern}
                className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700"
              >
                {concern}
              </span>
            ))}
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {post.targetAge}
            </span>
          </div>
        </div>
      </Link>

      <div className={`${featured ? "px-7 pb-7 sm:px-8 sm:pb-8" : "px-6 pb-6"} mt-auto`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/60 pt-5 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            {typeof post.rankingRank === "number" ? <CrownIcon /> : null}
            {post.appealAxis}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {post.affiliateUrl ? (
              <a
                href={post.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <ExternalLinkIcon />
                {post.affiliateLabel ?? "公式サイトを見る"}
              </a>
            ) : null}

            <Link
              href={articleHref}
              className="rounded-full bg-white/85 px-3 py-1 text-slate-700 transition hover:bg-white"
            >
              記事を読む
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
