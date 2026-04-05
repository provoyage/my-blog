import type { CategorySlug } from "@/lib/data/types";

type MediaAsset = {
  src: string;
  alt: string;
};

export const categoryMedia: Record<CategorySlug, MediaAsset> = {
  "gray-hair-scalp": {
    src: "/media/categories/gray-hair-scalp-card.jpg",
    alt: "自然な艶髪を見せる40代前後のアジア系女性",
  },
  "dry-skin-dullness": {
    src: "/media/categories/dry-skin-dullness-card.jpg",
    alt: "保湿クリームをなじませる40代前後のアジア系女性",
  },
  "odor-care": {
    src: "/media/categories/odor-care-card.jpg",
    alt: "清潔感のある笑顔を見せる40代前後のアジア系女性",
  },
  "beauty-supplement": {
    src: "/media/categories/beauty-supplement-card.jpg",
    alt: "美容サプリと日常感のあるテーブルフォト",
  },
};

export const articleMedia = {
  "gray-hair-care-ranking-2026": {
    src: "/media/articles/gray-hair-care-ranking-2026.jpg",
    alt: "髪の美しさが伝わる40代前後のアジア系女性",
  },
  "gray-hair-scalp-comparison": {
    src: "/media/articles/gray-hair-scalp-comparison.jpg",
    alt: "髪や頭皮のケアを連想できるヘアケアシーン",
  },
  "how-to-choose-gray-hair-care-for-40s": {
    src: "/media/articles/how-to-choose-gray-hair-care-for-40s.jpg",
    alt: "自然なヘアケアを想起させる40代前後の女性",
  },
  "irotsuya-color-treatment-review": {
    src: "/media/articles/irotsuya-color-treatment-review.jpg",
    alt: "ヘアケア商品が整然と並ぶレビュー向け写真",
  },
  "dry-skin-care-ranking-2026": {
    src: "/media/articles/dry-skin-care-ranking-2026.jpg",
    alt: "保湿ケア中の40代前後のアジア系女性",
  },
  "moisture-care-comparison-for-40s": {
    src: "/media/articles/moisture-care-comparison-for-40s.jpg",
    alt: "スキンケア中の女性を写した比較記事向け写真",
  },
  "dullness-care-routine-for-40s": {
    src: "/media/articles/dullness-care-routine-for-40s.jpg",
    alt: "肌のうるおいケアを連想できる女性の写真",
  },
  "odor-care-ranking-2026": {
    src: "/media/articles/odor-care-ranking-2026.jpg",
    alt: "清潔感のある自然な表情のアジア系女性",
  },
  "odor-care-item-comparison": {
    src: "/media/articles/odor-care-item-comparison.jpg",
    alt: "身だしなみの整った清潔感のある女性の写真",
  },
  "how-to-choose-odor-care-for-40s": {
    src: "/media/articles/how-to-choose-odor-care-for-40s.jpg",
    alt: "ナチュラルな笑顔で清潔感を伝える女性",
  },
  "beauty-supplement-ranking-2026": {
    src: "/media/articles/beauty-supplement-ranking-2026.jpg",
    alt: "美容サプリと果物を組み合わせたランキング向け写真",
  },
  "beauty-supplement-comparison-for-40s": {
    src: "/media/articles/beauty-supplement-comparison-for-40s.jpg",
    alt: "サプリの比較を連想できるクリーンなボトル写真",
  },
  "liftinner-collagen-review": {
    src: "/media/articles/liftinner-collagen-review.jpg",
    alt: "水と一緒に置かれた美容サプリのレビュー向け写真",
  },
} as const satisfies Record<string, MediaAsset>;

export const productMedia = {
  "irotsuya-color-treatment": {
    src: "/media/products/irotsuya-color-treatment-card.jpg",
    alt: "白髪ケア向けヘアケア商品が並ぶ写真",
  },
  "rootlift-scalp-serum": {
    src: "/media/products/rootlift-scalp-serum-card.jpg",
    alt: "スポイト美容液を使う頭皮ケアシーン",
  },
  "clearbalance-scalp-shampoo": {
    src: "/media/products/clearbalance-scalp-shampoo-card.jpg",
    alt: "スカルプシャンプーのボトル写真",
  },
  "dewbarrier-serum": {
    src: "/media/products/dewbarrier-serum-card.jpg",
    alt: "保湿美容液のボトルを持つ写真",
  },
  "ceramide-veil-cream": {
    src: "/media/products/ceramide-veil-cream-card.jpg",
    alt: "保湿クリーム容器のクリーンな商品写真",
  },
  "glowreset-oil-essence": {
    src: "/media/products/glowreset-oil-essence-card.jpg",
    alt: "オイルエッセンスのボトル写真",
  },
  "freshbalance-body-wash": {
    src: "/media/products/freshbalance-body-wash-card.jpg",
    alt: "清潔感のあるボディウォッシュのボトル写真",
  },
  "cleartone-deo-soap": {
    src: "/media/products/cleartone-deo-soap-card.jpg",
    alt: "デオドラントソープのボトル写真",
  },
  "breathreset-rinse": {
    src: "/media/products/breathreset-rinse-card.jpg",
    alt: "オーラルケア用品が並ぶ比較向け写真",
  },
  "liftinner-collagen": {
    src: "/media/products/liftinner-collagen-card.jpg",
    alt: "サプリボトルとグラスを並べた写真",
  },
  "hairsupport-biotin": {
    src: "/media/products/hairsupport-biotin-card.jpg",
    alt: "髪悩み向けサプリボトルの写真",
  },
  "wellaging-beauty-support": {
    src: "/media/products/wellaging-beauty-support-card.jpg",
    alt: "美容サプリが並ぶ商品比較向け写真",
  },
} as const satisfies Record<string, MediaAsset>;
