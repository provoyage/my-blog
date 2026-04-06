import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "個人情報の取扱いについての方針を掲載しています。",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Privacy Policy
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-slate-950 sm:text-5xl">
          プライバシーポリシー
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">個人情報の利用目的</h2>
            <p>
              お問い合わせへの回答、必要なご連絡、サービス改善のために、取得した情報を利用します。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">広告について</h2>
            <p>
              当サイトではアフィリエイト広告を利用しています。広告配信や効果測定のため、外部事業者が Cookie
              等を利用する場合があります。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">アクセス解析について</h2>
            <p>
              利用状況の把握や改善のため、アクセス解析ツールを利用する場合があります。取得される情報は匿名の統計データとして取り扱います。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">免責</h2>
            <p>
              外部リンク先で提供される情報やサービスについて、当サイトは責任を負いません。詳細は運営者情報ページもあわせてご確認ください。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-950">お問い合わせ</h2>
            <p>
              個人情報の取扱いに関するお問い合わせは info@qutech.jp までご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
