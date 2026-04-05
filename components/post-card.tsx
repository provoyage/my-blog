import Image from "next/image";
import Link from "next/link";
import { formatDate, getArticleTypeLabel, type Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  featured?: boolean;
  preload?: boolean;
};

export function PostCard({
  post,
  featured = false,
  preload = false,
}: PostCardProps) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className={`group glass-panel block overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(26,35,45,0.14)] ${
        featured ? "" : "h-full"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[4/5] min-h-[20rem] sm:min-h-[24rem]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
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
          <span className="rounded-full border border-white/25 bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {post.categoryName}
          </span>
          <span className="rounded-full border border-white/25 bg-slate-900/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {getArticleTypeLabel(post.articleType)}
          </span>
        </div>
      </div>

      <article
        className={`flex h-full flex-col ${
          featured ? "p-7 sm:p-8" : "p-6"
        }`}
      >
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
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.targetConcern.slice(0, 2).map((concern) => (
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

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>{post.appealAxis}</span>
          <span className="rounded-full bg-white/85 px-3 py-1 text-slate-700">
            記事を見る
          </span>
        </div>
      </article>
    </Link>
  );
}
