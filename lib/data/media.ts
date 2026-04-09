import type { CategorySlug } from "@/lib/data/types";

type MediaAsset = {
  src: string;
  alt: string;
};

export const categoryMedia: Record<CategorySlug, MediaAsset> = {
  "gray-hair-scalp": {
    src: "/media/categories/gray-hair.jpg",
    alt: "長い髪をなびかせる女性のヘアケアイメージ",
  },
  "dry-skin-dullness": {
    src: "/media/categories/kesyousui.png",
    alt: "肌にクリームをなじませる女性のスキンケアイメージ",
  },
  "odor-care": {
    src: "/media/categories/buresu.png",
    alt: "清潔感のある笑顔の女性を使ったエチケットケアイメージ",
  },
  "beauty-supplement": {
    src: "/media/categories/supplement.jpg",
    alt: "美容サプリとインナーケアを連想させるボトルのイメージ",
  },
};

export const articleMedia = {
  "gray-hair-care-ranking-2026": {
    src: "/media/articles/gray-hair-care-ranking-2026.jpg",
    alt: "白髪と頭皮ケアのランキング記事向けビジュアル",
  },
  "gray-hair-scalp-comparison": {
    src: "/media/articles/gray-hair-scalp-comparison.jpg",
    alt: "白髪と頭皮ケアの比較記事向けビジュアル",
  },
  "how-to-choose-gray-hair-care-for-40s": {
    src: "/media/articles/how-to-choose-gray-hair-care-for-40s.jpg",
    alt: "白髪ケアの選び方記事向けビジュアル",
  },
  "irotsuya-color-treatment-review": {
    src: "/media/articles/irotsuya-color-treatment-review.jpg",
    alt: "白髪と頭皮ケアのセット商品レビュー向けビジュアル",
  },
  "dry-skin-care-ranking-2026": {
    src: "/media/articles/kesyousui.png",
    alt: "乾燥肌ケアのランキング記事向けビジュアル",
  },
  "moisture-care-comparison-for-40s": {
    src: "/media/articles/moisture-care-comparison-for-40s.jpg",
    alt: "保湿ケアの比較記事向けビジュアル",
  },
  "dullness-care-routine-for-40s": {
    src: "/media/articles/kesyousui.png",
    alt: "くすみケアのルーティン記事向けビジュアル",
  },
  "odor-care-ranking-2026": {
    src: "/media/articles/buresu.png",
    alt: "体臭と口臭ケアのランキング記事向けビジュアル",
  },
  "odor-care-item-comparison": {
    src: "/media/articles/buresu.png",
    alt: "体臭と口臭ケアの比較記事向けビジュアル",
  },
  "how-to-choose-odor-care-for-40s": {
    src: "/media/articles/buresu.png",
    alt: "ニオイケアの選び方記事向けビジュアル",
  },
  "beauty-supplement-ranking-2026": {
    src: "/media/articles/beauty-supplement-ranking-2026.jpg",
    alt: "美容サプリのランキング記事向けビジュアル",
  },
  "beauty-supplement-comparison-for-40s": {
    src: "/media/articles/beauty-supplement-comparison-for-40s.jpg",
    alt: "美容サプリの比較記事向けビジュアル",
  },
  "liftinner-collagen-review": {
    src: "/media/articles/liftinner-collagen-review.jpg",
    alt: "美容サプリレビュー向けの上質なビジュアル",
  },
} as const satisfies Record<string, MediaAsset>;

export const productMedia = {
  "follics-luxevibe-doctorzero-set": {
    src: "/media/products/haircare-lineup.jpg",
    alt: "白髪と頭皮ケアをまとめて始めやすいセットのイメージ",
  },
  "regrowthlabs-hair-fiber": {
    src: "/media/products/scalp-serum.jpg",
    alt: "分け目やつむじを自然に整えるファイバーのイメージ",
  },
  "vitalme-l-lysine-plus": {
    src: "/media/products/hair-supplement-set.jpg",
    alt: "白髪ケアを内側から支えるサプリのイメージ",
  },
  "perspirex-comfort-rollon": {
    src: "/media/products/body-wash.jpg",
    alt: "汗とニオイの不安に向き合うロールオンのイメージ",
  },
  "opacy-deo-soap": {
    src: "/media/products/cleartone-deo-soap-card.jpg",
    alt: "全身をすっきり洗い上げるデオソープのイメージ",
  },
  "listerine-total-care-sensitive-zero": {
    src: "/media/products/oral-care-set.jpg",
    alt: "低刺激で続けやすいマウスウォッシュのイメージ",
  },
  "bihakuen-premium-sheep-placenta": {
    src: "/media/products/supplement-water.jpg",
    alt: "ハリ感を内側から支える美容サプリのイメージ",
  },
  "invy-empower": {
    src: "/media/products/biotin-bottle.jpg",
    alt: "複数の美容成分をまとめて取り入れるサプリのイメージ",
  },
  "byakuran-shi-birds-nest": {
    src: "/media/articles/supplement-closeup.jpg",
    alt: "ご褒美感のあるツバメの巣ドリンクのイメージ",
  },
  "bihakuen-collagen-soap": {
    src: "/media/products/soap-bottle.jpg",
    alt: "保湿感を残しやすいコラーゲン石鹸のイメージ",
  },
  "gold-swallow-pearl-white-mask": {
    src: "/media/products/moisture-cream.jpg",
    alt: "乾燥とくすみを集中ケアするパックのイメージ",
  },
  "alive-hydroplankton-mask": {
    src: "/media/products/moisture-serum.jpg",
    alt: "みずみずしい集中保湿マスクのイメージ",
  },
} as const satisfies Record<string, MediaAsset>;
