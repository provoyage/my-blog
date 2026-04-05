import { type MediaCategory } from "@/lib/data/types";
import { categoryMedia } from "@/lib/data/media";

export const categories: MediaCategory[] = [
  {
    slug: "gray-hair-scalp",
    name: "白髪・頭皮",
    heroLabel: "Gray Hair / Scalp",
    description:
      "白髪が目立ち始めた時のセルフケア、頭皮環境を整えるアイテム、染めながら補修できる時短商品を比較します。",
    summary:
      "白髪が気になり始めた40代女性向けに、染めやすさ、続けやすさ、頭皮へのやさしさを軸に選べるカテゴリです。",
    concerns: ["白髪が目立つ", "分け目が気になる", "頭皮の乾燥", "ハリ不足"],
    image: categoryMedia["gray-hair-scalp"].src,
    imageAlt: categoryMedia["gray-hair-scalp"].alt,
  },
  {
    slug: "dry-skin-dullness",
    name: "乾燥肌・くすみ",
    heroLabel: "Dry Skin / Dullness",
    description:
      "乾燥による小じわ感、夕方のくすみ、ツヤ不足に悩む40代向けに、保湿重視で比較しやすい商品をまとめています。",
    summary:
      "うるおい実感、ハリ感、ベタつきにくさを見ながら、毎日続けやすい保湿ケアを選べるカテゴリです。",
    concerns: ["乾燥小じわ", "くすみ印象", "ごわつき", "ツヤ不足"],
    image: categoryMedia["dry-skin-dullness"].src,
    imageAlt: categoryMedia["dry-skin-dullness"].alt,
  },
  {
    slug: "odor-care",
    name: "体臭・口臭",
    heroLabel: "Odor Care",
    description:
      "ニオイの不安を日常ケアで抑えたい人向けに、ボディケア、口臭ケア、清潔感の維持に役立つ商品を比較します。",
    summary:
      "外出前に使いやすいこと、続けやすい価格、清潔感のある使い心地を基準に選びやすくしています。",
    concerns: ["体臭が気になる", "口臭対策", "汗ばむ季節", "清潔感を保ちたい"],
    image: categoryMedia["odor-care"].src,
    imageAlt: categoryMedia["odor-care"].alt,
  },
  {
    slug: "beauty-supplement",
    name: "美容サプリ",
    heroLabel: "Beauty Supplement",
    description:
      "内側からの美容ケアを取り入れたい40代女性向けに、ハリ感、髪の印象、巡りケアを意識したサプリを比較します。",
    summary:
      "続けやすさ、成分のわかりやすさ、毎日の取り入れやすさを重視して選べるカテゴリです。",
    concerns: ["ハリ不足", "髪の元気不足", "めぐりケア", "インナーケアを始めたい"],
    image: categoryMedia["beauty-supplement"].src,
    imageAlt: categoryMedia["beauty-supplement"].alt,
  },
];
