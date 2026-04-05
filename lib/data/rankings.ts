import { type CategorySlug, type RankingKey } from "@/lib/data/types";

/**
 * 順位を変える時はこのファイルだけを編集します。
 * 商品データや記事データに順位は持たせません。
 */
export const rankingOrders: Record<RankingKey, string[]> = {
  overall: [
    "dewbarrier-serum",
    "irotsuya-color-treatment",
    "freshbalance-body-wash",
    "liftinner-collagen",
    "rootlift-scalp-serum",
    "ceramide-veil-cream",
  ],
  "gray-hair-scalp": [
    "irotsuya-color-treatment",
    "rootlift-scalp-serum",
    "clearbalance-scalp-shampoo",
  ],
  "dry-skin-dullness": [
    "dewbarrier-serum",
    "ceramide-veil-cream",
    "glowreset-oil-essence",
  ],
  "odor-care": [
    "freshbalance-body-wash",
    "cleartone-deo-soap",
    "breathreset-rinse",
  ],
  "beauty-supplement": [
    "liftinner-collagen",
    "hairsupport-biotin",
    "wellaging-beauty-support",
  ],
};

export const categoryOrder: CategorySlug[] = [
  "gray-hair-scalp",
  "dry-skin-dullness",
  "odor-care",
  "beauty-supplement",
];
