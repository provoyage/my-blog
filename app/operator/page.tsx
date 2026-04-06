import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "サイト運営者情報、免責事項、広告掲載方針を掲載しています。",
  alternates: {
    canonical: "/operator",
  },
};

const operatorItems = [
  {
    label: "サイト名",
    content: siteConfig.name,
  },
  {
    label: "運営者名または運営会社名",
    content: "QuTech合同会社",
  },
  {
    label: "運営目的",
    content:
      "美容やエイジングケアに関する情報を、比較・ランキング・読み物を通じて整理し、読者が自分に合った選択をしやすくすることを目的として運営しています。",
  },
  {
    label: "問い合わせ先",
    content: "info@qutech.jp",
  },
  {
    label: "アフィリエイト広告について",
    content:
      "当サイトはアフィリエイト広告を利用しています。掲載している商品・サービスへのリンクには広告を含む場合があります。",
  },
  {
    label: "免責事項",
    content:
      "掲載情報はできる限り正確な内容を提供するよう努めていますが、その完全性・正確性・安全性を保証するものではありません。掲載情報に基づいて生じた損害等について、当サイトおよび運営者は一切の責任を負いかねます。商品の購入やサービス利用の最終判断は、ご自身の責任でお願いいたします。",
  },
] as const;

export default function OperatorPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Operator
        </p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[-0.04em] text-slate-950 sm:text-[2.5rem]">
          運営者情報
        </h1>

        <dl className="mt-8 space-y-5 text-sm leading-7 text-slate-700 sm:text-[15px]">
          {operatorItems.map((item) => (
            <div
              key={item.label}
              className="border-b border-white/70 pb-5 last:border-b-0 last:pb-0"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {item.label}
              </dt>
              <dd className="mt-2 text-[15px] text-slate-950 sm:text-base">{item.content}</dd>
            </div>
          ))}

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              プライバシーポリシー
            </dt>
            <dd className="mt-2 text-[15px] text-slate-950 sm:text-base">
              <Link
                href="/privacy-policy"
                className="underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
              >
                プライバシーポリシーはこちら
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
