export const siteConfig = {
  name: "美巡コンパス",
  title: "美巡コンパス | 40代女性の見た目悩みを比較で整える美容メディア",
  description:
    "40代女性の白髪・頭皮、乾燥肌・くすみ、体臭・口臭、美容サプリを比較して選べる美容アフィリエイトメディア。ランキング、比較、レビュー、悩み解決記事から公式サイトへ導線設計しています。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ja_JP",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
