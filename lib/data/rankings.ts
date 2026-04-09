import { type CategorySlug, type RankingKey } from "@/lib/data/types";

export const rankingOrders: Record<RankingKey, string[]> = {
  overall: [
    "bihakuen-collagen-soap",
    "perspirex-comfort-rollon",
    "follics-luxevibe-doctorzero-set",
    "bihakuen-premium-sheep-placenta",
    "gold-swallow-pearl-white-mask",
    "opacy-deo-soap",
  ],
  "gray-hair-scalp": [
    "follics-luxevibe-doctorzero-set",
    "regrowthlabs-hair-fiber",
    "vitalme-l-lysine-plus",
  ],
  "dry-skin-dullness": [
    "bihakuen-collagen-soap",
    "gold-swallow-pearl-white-mask",
    "alive-hydroplankton-mask",
  ],
  "odor-care": [
    "perspirex-comfort-rollon",
    "opacy-deo-soap",
    "listerine-total-care-sensitive-zero",
  ],
  "beauty-supplement": [
    "bihakuen-premium-sheep-placenta",
    "invy-empower",
    "byakuran-shi-birds-nest",
  ],
};

export const categoryOrder: CategorySlug[] = [
  "gray-hair-scalp",
  "dry-skin-dullness",
  "odor-care",
  "beauty-supplement",
];
