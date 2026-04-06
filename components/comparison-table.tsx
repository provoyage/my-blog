import Image from "next/image";
import { type Product } from "@/lib/posts";

type ComparisonTableProps = {
  products: Product[];
  title?: string;
  description?: string;
};

export function ComparisonTable({
  products,
  title = "比較表",
  description = "気になる項目を並べて比較できるように、使いやすさや価格、向いている悩みを一覧で整理しています。",
}: ComparisonTableProps) {
  const rowLabels = Array.from(
    new Set(products.flatMap((product) => product.comparisonPoints.map((point) => point.label))),
  );

  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Comparison Table
        </p>
        <h2 className="mt-2 font-serif text-2xl tracking-[-0.03em] text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <div className="-mx-1 overflow-x-auto px-1">
        <div className="min-w-full rounded-[1.8rem] border border-slate-200 bg-white/90">
          <table className="w-max min-w-[720px] border-collapse text-left md:min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-stone-50/80">
                <th className="w-36 px-4 py-4 text-sm font-semibold text-slate-700 md:w-44 md:px-5">
                  比較項目
                </th>
                {products.map((product, index) => (
                  <th key={product.id} className="min-w-52 px-4 py-4 align-top md:min-w-64 md:px-5">
                    <div className="space-y-3">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="320px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                          {index + 1}位
                        </span>
                        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                          {product.badge}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {product.brand}
                        </p>
                        <p className="mt-2 break-words font-serif text-xl leading-snug text-slate-950 md:text-2xl">
                          {product.name}
                        </p>
                      </div>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        {product.ctaLabel}
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <th className="bg-stone-50/70 px-5 py-4 text-sm font-semibold text-slate-700">
                  総合スコア
                </th>
                {products.map((product) => (
                  <td key={`${product.id}-score`} className="px-5 py-4 text-sm leading-7 text-slate-600">
                    {product.score} / 100
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-200">
                <th className="bg-stone-50/70 px-5 py-4 text-sm font-semibold text-slate-700">
                  価格帯
                </th>
                {products.map((product) => (
                  <td key={`${product.id}-price`} className="px-5 py-4 text-sm leading-7 text-slate-600">
                    {product.priceLabel}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-200">
                <th className="bg-stone-50/70 px-5 py-4 text-sm font-semibold text-slate-700">
                  向いている人
                </th>
                {products.map((product) => (
                  <td key={`${product.id}-best`} className="px-5 py-4 text-sm leading-7 text-slate-600">
                    {product.bestFor}
                  </td>
                ))}
              </tr>
              {rowLabels.map((label, index) => (
                <tr
                  key={label}
                  className={index < rowLabels.length - 1 ? "border-b border-slate-200" : ""}
                >
                  <th className="bg-stone-50/70 px-5 py-4 text-sm font-semibold text-slate-700">
                    {label}
                  </th>
                  {products.map((product) => (
                    <td
                      key={`${product.id}-${label}`}
                      className="px-5 py-4 text-sm leading-7 text-slate-600"
                    >
                      {product.comparisonPoints.find((point) => point.label === label)?.value ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
