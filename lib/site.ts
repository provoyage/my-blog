export const siteConfig = {
  name: "美巡コンパス",
  title: "美巡コンパス | 40代女性の見た目悩みを比較で整える美容アフィリエイトメディア",
  description:
    "40代女性の白髪・乾燥・くすみ・たるみなどの見た目悩みに寄り添い、比較・ランキング・レビューを通して選びやすく整理する美容アフィリエイトメディアです。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ja_JP",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
