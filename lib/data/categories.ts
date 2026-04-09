import { type MediaCategory } from "@/lib/data/types";
import { categoryMedia } from "@/lib/data/media";

export const categories: MediaCategory[] = [
  {
    slug: "gray-hair-scalp",
    name: "白髪・頭皮",
    heroLabel: "Gray Hair / Scalp",
    description:
      "白髪が気になり始めた時のセルフケアと、頭皮環境の立て直しを同時に考えたい人向けのカテゴリです。",
    summary:
      "染めるだけでなく、分け目・ハリ不足・頭皮の乾燥まで含めて整えたい40代向けに、白髪ケア商品を比較しやすく整理しています。",
    concerns: ["白髪が増えてきた", "分け目の印象が気になる", "頭皮の乾燥", "髪のハリ不足"],
    image: categoryMedia["gray-hair-scalp"].src,
    imageAlt: categoryMedia["gray-hair-scalp"].alt,
  },
  {
    slug: "dry-skin-dullness",
    name: "乾燥肌・くすみ",
    heroLabel: "Dry Skin / Dullness",
    description:
      "乾燥によるつっぱり感、くすみ、夕方の疲れ顔が気になる人に向けて、保湿重視のケアを比較するカテゴリです。",
    summary:
      "洗顔・シートマスク・保湿パックまで、うるおいを残しながら続けやすい乾燥対策を選びやすくまとめています。",
    concerns: ["乾燥でつっぱる", "くすみが気になる", "夜までうるおいを保ちたい", "肌印象を明るく見せたい"],
    image: categoryMedia["dry-skin-dullness"].src,
    imageAlt: categoryMedia["dry-skin-dullness"].alt,
  },
  {
    slug: "odor-care",
    name: "体臭・口臭",
    heroLabel: "Odor Care",
    description:
      "汗・体臭・口臭を毎日のケアで整えたい人向けに、使う場面の違う商品を比較するカテゴリです。",
    summary:
      "脇汗対策、全身を洗う石鹸、口臭ケアまで、悩みの出方に合わせて選びやすい導線で整理しています。",
    concerns: ["脇汗が気になる", "体臭を抑えたい", "口臭をケアしたい", "清潔感を保ちたい"],
    image: categoryMedia["odor-care"].src,
    imageAlt: categoryMedia["odor-care"].alt,
  },
  {
    slug: "beauty-supplement",
    name: "美容サプリ",
    heroLabel: "Beauty Supplement",
    description:
      "内側から美容コンディションを支えたい人向けに、成分設計や続けやすさで比較するカテゴリです。",
    summary:
      "プラセンタ、ツバメの巣、美容サポート成分など、目的に合わせて選びやすい美容サプリを比較しています。",
    concerns: ["ハリ不足が気になる", "内側から整えたい", "年齢サインを底上げしたい", "無理なく続けたい"],
    image: categoryMedia["beauty-supplement"].src,
    imageAlt: categoryMedia["beauty-supplement"].alt,
  },
];
