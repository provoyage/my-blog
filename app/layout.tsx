import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const primaryNavigation = [
  { href: "/#articles", label: "記事一覧" },
  { href: "/#categories", label: "悩みカテゴリ" },
  { href: "/#overall-ranking", label: "総合ランキング" },
  { href: "/articles", label: "すべての記事" },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "40代 女性 美容",
    "比較 メディア",
    "ランキング 記事",
    "白髪 乾燥 ニオイ",
    "美容 アフィリエイト",
  ],
  category: "beauty",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} overview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${shipporiMincho.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-16rem] z-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(242,202,194,0.52),_transparent_55%),radial-gradient(circle_at_80%_18%,_rgba(206,222,214,0.38),_transparent_30%)]"
          />

          <header className="sticky top-0 z-30 border-b border-white/60 bg-white/76 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="text-sm font-semibold uppercase tracking-[0.34em] text-slate-700 transition hover:text-slate-950"
                >
                  {siteConfig.name}
                </Link>
                <p className="text-sm text-slate-500">
                  40代女性の見た目悩みを比較で整える美容アフィリエイトメディア
                </p>
              </div>

              <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                {primaryNavigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      index === primaryNavigation.length - 1
                        ? "rounded-full bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
                        : "rounded-full px-3 py-2 transition hover:bg-white/75 hover:text-slate-950"
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="relative z-10 flex-1">{children}</main>

          <footer className="relative z-10 border-t border-white/70 bg-white/55 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-600 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-12">
              <div className="max-w-xl space-y-2">
                <p className="font-semibold text-slate-900">{siteConfig.name}</p>
                <p>
                  比較記事、ランキング記事、レビュー記事、悩み解決記事を通じて、40代女性の見た目悩みに合うセルフケア商品選びを支えるメディアです。
                </p>
              </div>

              <div className="space-y-4">
                <nav className="flex flex-wrap gap-2 text-sm">
                  {primaryNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 transition hover:border-slate-400 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-2">
                  <p>白髪・頭皮 / 乾燥・くすみ / 口臭・体臭 / 美容サプリ</p>
                  <p>
                    商品情報は随時更新し、比較・ランキング・公式サイト導線を運用しやすい形で管理しています。
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
