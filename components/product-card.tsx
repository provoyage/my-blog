import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/posts";

type ProductCardProps = {
  product: Product;
  rank?: number;
};

export function ProductCard({ product, rank }: ProductCardProps) {
  return (
    <article className="glass-panel flex h-full flex-col overflow-hidden rounded-[1.9rem]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {typeof rank === "number" ? (
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
              {rank}位
            </span>
          ) : null}
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-slate-800">
            {product.badge}
          </span>
        </div>
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {product.brand}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-snug tracking-[-0.03em] text-slate-950">
              {product.name}
            </h3>
          </div>
          <div className="rounded-[1.2rem] bg-stone-50 px-3 py-2 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Score
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{product.score}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            評価 {product.rating.toFixed(1)}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
            口コミ {product.reviewCount.toLocaleString()}件
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
            {product.priceLabel}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-600">{product.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.featureLabels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-stone-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            注目ポイント
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
            {product.strengths.map((strength) => (
              <li key={strength} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-5 space-y-3 text-sm text-slate-600">
          <div>
            <dt className="font-semibold text-slate-900">こんな人に向いています</dt>
            <dd className="mt-1 leading-7">{product.bestFor}</dd>
          </div>
        </dl>

        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
          {product.caution}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {product.reviewArticleSlug ? (
            <Link
              href={`/articles/${product.reviewArticleSlug}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
            >
              レビューを見る
            </Link>
          ) : null}
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
    </article>
  );
}
