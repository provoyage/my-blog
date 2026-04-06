"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const primaryNavigation = [
  { href: "/#articles", label: "記事一覧" },
  { href: "/#categories", label: "悩みカテゴリ" },
  { href: "/#overall-ranking", label: "総合ランキング" },
  { href: "/articles", label: "すべての記事" },
] as const;

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <div className="min-h-screen bg-white text-slate-950">{children}</div>;
  }

  return (
    <div className="relative isolate flex min-h-screen min-w-0 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-16rem] z-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(242,202,194,0.52),_transparent_55%),radial-gradient(circle_at_80%_18%,_rgba(206,222,214,0.38),_transparent_30%)]"
      />

      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/76 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-4 px-4 py-4 sm:px-8 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="min-w-0 space-y-1">
            <Link
              href="/"
              className="block break-words text-sm font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:text-slate-950 sm:tracking-[0.34em]"
            >
              {siteConfig.name}
            </Link>
            <p className="text-xs leading-6 text-slate-500 sm:text-sm">
              40代女性の見た目悩みを比較で整える美容アフィリエイトメディア
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600 sm:gap-3 lg:justify-end">
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  index === primaryNavigation.length - 1
                    ? "rounded-full bg-slate-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800 sm:px-4 sm:text-sm"
                    : "rounded-full px-3 py-2 text-xs transition hover:bg-white/75 hover:text-slate-950 sm:text-sm"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 min-w-0 flex-1">{children}</main>

      <footer className="relative z-10 border-t border-white/70 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-8 text-sm text-slate-600 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-12">
          <div className="max-w-xl min-w-0 space-y-2">
            <p className="font-semibold text-slate-900">{siteConfig.name}</p>
            <p className="break-words text-sm leading-7">
              比較記事、ランキング記事、レビュー記事、悩み解決記事を通して、40代女性の見た目悩みに合うセルフケアや商品選びを整えるメディアです。
            </p>
          </div>

          <div className="min-w-0 space-y-4">
            <nav className="flex flex-wrap gap-2 text-sm">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs transition hover:border-slate-400 hover:text-slate-950 sm:px-4 sm:text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/operator"
                className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs transition hover:border-slate-400 hover:text-slate-950 sm:px-4 sm:text-sm"
              >
                運営者情報
              </Link>
            </nav>

            <div className="space-y-2">
              <p className="break-words leading-7">
                比較・検証 / 成分・くすみ / ランキング・比較 / 美容サプリ
              </p>
              <p className="break-words leading-7">
                掲載情報は随時更新していますが、ランキングや商品内容は変更される場合があります。最新情報は公式サイト等でご確認ください。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
