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
  description = "気になる商品を横並びで比べて、使う頻度、向いている悩み、続けやすさまでまとめて確認できます。",
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
        <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] text-slate-950">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <div className="overflow-x-auto rounded-[1.8rem] border border-slate-200 bg-white/90">
        <table className="min-w-[900px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-stone-50/80">
              <th className="w-44 px-5 py-4 text-sm font-semibold text-slate-700">比較項目</th>
              {products.map((product, index) => (
                <th key={product.id} className="min-w-64 px-5 py-4 align-top">
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
                      <p className="mt-2 font-serif text-2xl leading-snug text-slate-950">
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
                価格目安
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
                    {product.comparisonPoints.find((point) => point.label === label)?.value ?? "ー"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
